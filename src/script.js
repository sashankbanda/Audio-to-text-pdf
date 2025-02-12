const form = document.getElementById('upload-form');
const audioFileInput = document.getElementById('audio-file');
const progressBar = document.getElementById('upload-progress');
const progressStatus = document.getElementById('progress-status');
const processUpdates = document.getElementById('process-updates');
const transcriptionResult = document.getElementById('transcription-result');
const pdfDownloadContainer = document.getElementById('pdf-download');
const pdfDownloadLink = document.getElementById('pdf-link');

// Handle form submission
form.addEventListener('submit', (event) => {
    event.preventDefault();
    const file = audioFileInput.files[0];

    if (!file) {
        alert("Please select an audio file.");
        return;
    }

    const formData = new FormData();
    formData.append('file', file);

    // Reset progress and result
    progressBar.value = 0;
    progressBar.style.backgroundColor = 'blue';
    progressStatus.innerText = "Uploading file...";
    processUpdates.innerHTML = "";
    transcriptionResult.innerHTML = "";
    pdfDownloadContainer.style.display = "none";

    // Create XMLHttpRequest for progress tracking
    const xhr = new XMLHttpRequest();
    xhr.open('POST', '/upload', true);

    // Update progress bar during upload
    xhr.upload.onprogress = (event) => {
        if (event.lengthComputable) {
            const percentComplete = Math.round((event.loaded / event.total) * 100);
            progressBar.value = percentComplete;
            progressStatus.innerText = `Uploading file... (${percentComplete}%)`;
        }
    };

    // Handle upload completion
    xhr.onload = () => {
        if (xhr.status === 200) {
            const response = JSON.parse(xhr.responseText);
            progressStatus.innerText = "Processing complete!";
            progressBar.style.backgroundColor = 'blue';

            if (response.transcription) {
                transcriptionResult.innerHTML = `<p>${response.transcription}</p>`;
            } else if (response.error) {
                transcriptionResult.innerHTML = `<p>Error: ${response.error}</p>`;
            }

            if (response.pdf_filename) {
                const pdfUrl = `/download/${encodeURIComponent(response.pdf_filename)}`;
                pdfDownloadContainer.style.display = "block";
                pdfDownloadLink.href = pdfUrl;
                pdfDownloadLink.innerText = "Download PDF";
            }
        } else {
            transcriptionResult.innerHTML = `<p>Error: Failed to upload file.</p>`;
        }
    };

    // Handle errors
    xhr.onerror = () => {
        transcriptionResult.innerHTML = `<p>Error: Network error occurred.</p>`;
        progressStatus.innerText = "Error during upload.";
        progressBar.style.backgroundColor = 'red';
    };

    // Send the form data
    xhr.send(formData);
});

// Listen for real-time progress updates via SSE
const eventSource = new EventSource('/progress');
eventSource.onmessage = (event) => {
    const message = event.data;
    const newMessage = document.createElement('p');
    newMessage.innerText = message;
    processUpdates.appendChild(newMessage);
    processUpdates.scrollTop = processUpdates.scrollHeight;
};

// Handle SSE connection errors
eventSource.onerror = () => {
    progressStatus.innerText = "Lost connection to the server for real-time updates.";
    eventSource.close();
};
