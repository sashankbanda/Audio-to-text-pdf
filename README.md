```
# 🎤 Audio Transcription App

Seamlessly convert audio files into text using this powerful, AI-driven transcription tool. This project leverages a **Flask (Python)** backend and a **React.js** frontend in a monolithic structure to provide real-time transcription with a smooth and intuitive user experience.



---

## 📚 Table of Contents
- [✨ Features](#-features)
- [🛠️ Tech Stack](#-tech-stack)
- [📂 Project Structure](#-project-structure)
- [🚀 Getting Started](#-getting-started)
  - [Prerequisites](#prerequisites)
  - [Setup Instructions](#setup-instructions)
- [▶️ How to Run](#-how-to-run)
- [📡 API Endpoints](#-api-endpoints)
- [🖼️ Screenshots](#-screenshots)
- [🤔 Troubleshooting](#-troubleshooting)
- [📝 License](#-license)

---

## ✨ Features
- ✅ **Versatile Uploads:** Process various audio formats like MP3, WAV, M4A, and more.
- ✅ **AI-Powered Transcription:** Utilizes **OpenAI's Whisper model** for high-accuracy speech-to-text conversion.
- ✅ **Live Progress Updates:** Track transcription progress in real-time with **Server-Sent Events (SSE)**.
- ✅ **Visual Upload Tracking:** Monitor file upload status with a sleek progress bar.
- ✅ **PDF Export:** Automatically generate and download a **PDF** of the final transcription.
- ✅ **Responsive UI:** A clean and modern user interface built with React.
- ✅ **Robust Error Handling:** Clear feedback on upload and processing status.

---

## 🛠️ Tech Stack
- **Backend:** Flask, Transformers, librosa, pydub, FPDF, Flask-CORS
- **Frontend:** React.js, Axios, HTML5, CSS3
- **AI Model:** `openai/whisper-small`
- **Communication:** REST API, Server-Sent Events (SSE)

---

## 📂 Project Structure
```

audio-transcription-app/ (Project Root)
│
├── public/                 \# React public assets (index.html, etc.)
├── src/                    \# React source code
│   ├── App.js              \# Main React component
│   └── ...
│
├── uploads/                \# Stores uploaded audio files (created by Flask)
├── pdfs/                   \# Stores generated PDFs (created by Flask)
│
├── app.py                  \# Main Flask backend application
├── package.json            \# Frontend (React) dependencies and scripts
├── requirements.txt        \# Backend (Python) dependencies
├── .gitignore              \# Git ignore file
└── README.md               \# Project Documentation

````

---

## 🚀 Getting Started

Follow these steps to set up and run the project locally from the root directory.

### Prerequisites
Make sure you have the following software installed on your machine:
- **Python** (3.8 or higher)
- **Node.js** (14.x or higher) and **npm**

### Setup Instructions
All commands should be run from the project's root directory.

1.  **Install Backend Dependencies:**
    - Create and activate a Python virtual environment (recommended):
    ```sh
    # For Windows
    python -m venv venv
    venv\Scripts\activate

    # For macOS/Linux
    python3 -m venv venv
    source venv/bin/activate
    ```
    - Install the required packages:
    ```sh
    pip install -r requirements.txt
    pip install fpdf flask-cors
    ```

2.  **Install Frontend Dependencies:**
    ```sh
    npm install
    ```

---

## ▶️ How to Run

You will need **two separate terminals** running in the project's root directory.

1.  **Terminal 1: Start the Flask Backend**
    - Make sure your Python virtual environment is activated.
    - Run the Flask app:
    ```sh
    python app.py
    ```
    - The backend will be running at `http://localhost:5000`.

2.  **Terminal 2: Start the React Frontend**
    - Open a new terminal in the same root directory.
    - Run the React app:
    ```sh
    npm start
    ```
    - The frontend will open automatically in your browser at `http://localhost:3000`.

3.  **Use the App:**
    - Open `http://localhost:3000` in your web browser.
    - Upload an audio file and see the transcription process in real-time.

---

## 📡 API Endpoints
| Method | Endpoint               | Description                                |
| :----- | :--------------------- | :----------------------------------------- |
| `POST` | `/upload`              | Uploads an audio file for transcription.   |
| `GET`  | `/progress`            | Streams real-time progress updates via SSE.|
| `GET`  | `/download/<filename>` | Downloads the final transcription as a PDF.|

---

## 🖼️ Screenshots

*Replace these placeholders with actual screenshots of your application.*

**1. Main Upload Interface:**
![Initial UI Screenshot](https://via.placeholder.com/600x400.png?text=Main+Upload+Interface)

**2. Transcription in Progress:**
![Progress UI Screenshot](https://via.placeholder.com/600x400.png?text=Transcription+In+Progress)

**3. Final Transcription with PDF Download:**
![Final Result Screenshot](https://via.placeholder.com/600x400.png?text=Final+Transcription+Result)

---

## 🤔 Troubleshooting

- **CORS Errors:** Ensure `flask-cors` is installed (`pip install flask-cors`) and correctly initialized in `app.py`. The provided code already handles this.
- **Flask Server Not Starting:** Make sure all dependencies in `requirements.txt` are installed in your active virtual environment.
- **React App Fails to Start:** Delete the `node_modules` folder and `package-lock.json` file, then run `npm install` again from the root directory.
- **Large File Issues:** The Whisper model may take a long time to process very large audio files. For production, consider a more robust setup with background workers (e.g., Celery).

---

## 📝 License
This project is licensed under the **MIT License**.

---

Made with ❤️ by **Sashank Banda**
````