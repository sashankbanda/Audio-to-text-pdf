from flask import Flask, request, jsonify, Response, send_file
import os
import time
from pydub import AudioSegment
from transformers import pipeline
from librosa import load
import numpy as np
from flask_cors import CORS
from fpdf import FPDF

app = Flask(__name__)
CORS(app)

UPLOAD_FOLDER = 'uploads'
PDF_FOLDER = 'pdfs'
os.makedirs(UPLOAD_FOLDER, exist_ok=True)
os.makedirs(PDF_FOLDER, exist_ok=True)

transcriber = pipeline(
    model="openai/whisper-small",
    task="automatic-speech-recognition",
    device="cpu"
)

progress = []

def convert_to_wav(input_path, output_path):
    try:
        progress.append("Converting to WAV...")
        audio = AudioSegment.from_file(input_path)
        audio.export(output_path, format="wav")
        progress.append("Conversion to WAV complete")
    except Exception as e:
        raise RuntimeError(f"Failed to convert to WAV: {e}")

def split_audio_with_overlap(audio, sr, max_duration=30, overlap=5):
    max_samples = int(max_duration * sr)
    overlap_samples = int(overlap * sr)
    start = 0
    chunks = []
    while start < len(audio):
        end = start + max_samples
        chunks.append(audio[start:end])
        start = end - overlap_samples
        if end > len(audio):
            break
    return chunks

def transcribe_audio(audio_path):
    try:
        progress.append("Loading audio for transcription...")
        audio, sr = load(audio_path, sr=16000)
        if len(audio.shape) > 1:
            audio = np.mean(audio, axis=0)

        progress.append("Splitting audio into chunks...")
        audio_chunks = split_audio_with_overlap(audio, sr)

        full_transcription = []
        for i, chunk in enumerate(audio_chunks):
            progress.append(f"Transcribing chunk {i + 1}/{len(audio_chunks)}...")
            result = transcriber(chunk)
            if isinstance(result, dict) and "text" in result:
                full_transcription.append(result["text"])

        progress.append("Transcription complete")
        return " ".join(full_transcription).strip()
    except Exception as e:
        raise RuntimeError(f"Failed to transcribe audio: {e}")

def generate_pdf(text, filename):
    pdf = FPDF()
    pdf.set_auto_page_break(auto=True, margin=15)
    pdf.add_page()
    pdf.set_font("Arial", size=12)
    pdf.multi_cell(0, 10, text)
    pdf_path = os.path.join(PDF_FOLDER, filename)
    pdf.output(pdf_path)
    return pdf_path

@app.route("/")
def index():
    return jsonify({"message": "Flask backend is running"}), 200

@app.route("/upload", methods=["POST"])
def upload_file():
    if "file" not in request.files:
        return jsonify({"error": "No file part"}), 400

    file = request.files["file"]
    if file.filename == "":
        return jsonify({"error": "No selected file"}), 400

    filename = os.path.join(UPLOAD_FOLDER, file.filename)
    file.save(filename)

    wav_file = os.path.join(UPLOAD_FOLDER, "converted.wav")
    convert_to_wav(filename, wav_file)

    transcription = transcribe_audio(wav_file)

    pdf_filename = f"{os.path.splitext(file.filename)[0]}.pdf"
    pdf_path = generate_pdf(transcription, pdf_filename)

    return jsonify({"transcription": transcription, "pdf_filename": pdf_filename})  # Fixed key name

@app.route("/download/<filename>")
def download_pdf(filename):
    pdf_path = os.path.join(PDF_FOLDER, filename)
    if os.path.exists(pdf_path):
        return send_file(pdf_path, as_attachment=True)
    else:
        return jsonify({"error": "File not found"}), 404

@app.route("/progress")
def progress_stream():
    def generate():
        while True:
            if progress:
                yield f"data: {progress.pop(0)}\n\n"
            time.sleep(1)
    return Response(generate(), content_type="text/event-stream")

if __name__ == "__main__":
    app.run(debug=True, port=5000)
