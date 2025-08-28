import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import "./styles.css";
import { jsPDF } from "jspdf";

const App = () => {
    const [progress, setProgress] = useState(0);
    const [progressStatus, setProgressStatus] = useState("Waiting for file upload...");
    const [transcription, setTranscription] = useState("");
    const [pdfUrl, setPdfUrl] = useState("");
    const [isProcessing, setIsProcessing] = useState(false);

    // Use a ref to hold the interval ID
    const intervalRef = useRef(null);

    // This useEffect hook will manage the dynamic status messages
    useEffect(() => {
        if (isProcessing) {
            const messages = [
                "Warming up the model...",
                "Analyzing audio...",
                "Transcription in progress...",
                "This can take a moment for long files...",
                "Finalizing the text...",
            ];
            let messageIndex = 0;

            // Clear any existing interval before starting a new one
            if (intervalRef.current) {
                clearInterval(intervalRef.current);
            }

            intervalRef.current = setInterval(() => {
                messageIndex = (messageIndex + 1) % messages.length;
                setProgressStatus(messages[messageIndex]);
            }, 2500); // Change message every 2.5 seconds
        } else {
            // If processing is finished, clear the interval
            if (intervalRef.current) {
                clearInterval(intervalRef.current);
                intervalRef.current = null;
            }
        }

        // Cleanup function to clear interval when the component unmounts
        return () => {
            if (intervalRef.current) {
                clearInterval(intervalRef.current);
            }
        };
    }, [isProcessing]);


    const handleFileUpload = async (event) => {
        event.preventDefault();
        const file = event.target.elements["audio-file"].files[0];
        if (!file) return;

        setProgressStatus("Uploading file...");
        setIsProcessing(true);
        setProgress(0);
        setTranscription("");
        setPdfUrl("");

        const API_KEY = process.env.REACT_APP_HUGGINGFACE_API_KEY;
        const API_URL = "https://api-inference.huggingface.co/models/openai/whisper-large-v3";

        try {
            const response = await axios.post(API_URL, file, {
                headers: {
                    Authorization: `Bearer ${API_KEY}`,
                },
                onUploadProgress: (progressEvent) => {
                    let percent = Math.round((progressEvent.loaded * 100) / progressEvent.total);
                    setProgress(percent);
                    if (percent === 100) {
                        setProgressStatus("Upload complete. Starting transcription...");
                    }
                },
            });

            const resultText = response.data.text;
            setTranscription(resultText);

            const doc = new jsPDF();
            const splitText = doc.splitTextToSize(resultText, 180);
            doc.text(splitText, 10, 10);
            const pdfBlob = doc.output('blob');
            const pdfObjectURL = URL.createObjectURL(pdfBlob);
            setPdfUrl(pdfObjectURL);

            setProgressStatus("Processing complete!");

        } catch (error) {
            setProgressStatus("Error during transcription. Please try again.");
            console.error("API Error:", error);
        } finally {
            // Stop the message cycling once the process is done
            setIsProcessing(false);
        }
    };

    return (
        <div className="container">
            <h1>Audio Transcription</h1>
            <form id="upload-form" onSubmit={handleFileUpload}>
                <input type="file" id="audio-file" name="file" accept="audio/*" required />
                <button type="submit" disabled={isProcessing}>
                    {isProcessing ? 'Processing...' : 'Upload and Transcribe'}
                </button>
            </form>
            <div id="progress-container">
                <progress id="upload-progress" value={progress} max="100"></progress>
                <p id="progress-status">{progressStatus}</p>
            </div>

            <div id="result-box">
                <h2>Transcription Result:</h2>
                <pre id="transcription-result">{transcription}</pre>
            </div>

            {pdfUrl && !isProcessing && (
                <div id="pdf-download">
                    <h2>Download Transcription</h2>
                    <a href={pdfUrl} download="transcription.pdf" className="download-button">Download PDF</a>
                </div>
            )}
        </div>
    );
};

export default App;
