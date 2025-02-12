import React, { useState, useEffect } from "react";
import axios from "axios";
import "./styles.css"; // Ensure you have a styles.css file in the same directory

const App = () => {
    const [progress, setProgress] = useState(0);
    const [progressStatus, setProgressStatus] = useState("Waiting for file upload...");
    const [transcription, setTranscription] = useState("");
    const [updates, setUpdates] = useState("");
    const [pdfUrl, setPdfUrl] = useState("");

    useEffect(() => {
        const eventSource = new EventSource("http://localhost:5000/progress");
        eventSource.onmessage = (event) => {
            setUpdates((prev) => prev + "\n" + event.data);
        };

        return () => {
            eventSource.close();
        };
    }, []);

    const handleFileUpload = async (event) => {
        event.preventDefault();
        const file = event.target.elements["audio-file"].files[0];
        if (!file) return;

        setProgressStatus("Uploading...");
        setProgress(10);
        setPdfUrl("");

        const formData = new FormData();
        formData.append("file", file);

        try {
            const response = await axios.post("http://localhost:5000/upload", formData, {
                headers: { "Content-Type": "multipart/form-data" },
                onUploadProgress: (progressEvent) => {
                    let percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
                    setProgress(percentCompleted);
                },
            });

            setProgress(100);
            setProgressStatus("Processing complete!");
            setTranscription(response.data.transcription);
            setPdfUrl(`http://localhost:5000/download/${response.data.pdf_filename}`);
        } catch (error) {
            setProgressStatus("Error uploading file.");
            console.error("Upload Error:", error);
        }
    };

    return (
        <div className="container">
            <h1>Audio Transcription</h1>
            <form id="upload-form" onSubmit={handleFileUpload}>
                <input type="file" id="audio-file" name="file" accept="audio/*" required />
                <button type="submit">Upload</button>
            </form>
            <div id="progress-container">
                <progress id="upload-progress" value={progress} max="100"></progress>
                <p id="progress-status">{progressStatus}</p>
            </div>
            <div id="transcription-box">
                <h2>Process Updates:</h2>
                <pre id="process-updates">{updates}</pre>
            </div>
            <div id="result-box">
                <h2>Transcription Result:</h2>
                <pre id="transcription-result">{transcription}</pre>
            </div>
            {pdfUrl && (
                <div id="pdf-download">
                    <h2>Download Transcription</h2>
                    <a href={pdfUrl} download className="download-button">Download PDF</a>
                </div>
            )}
        </div>
    );
};

export default App;
