# 🎤 Audio Transcription App  
Seamlessly convert audio files into text using AI-powered transcription.  

This project leverages **Flask (Python) as the backend** and **React.js as the frontend** to provide real-time transcription of audio files with an intuitive user experience.  

---

## 📚 Table of Contents  
- [🔹 Features](#-features)  
- [🚀 Tech Stack](#-tech-stack)  
- [📂 Project Structure](#-project-structure)  
- [💻 Installation](#-installation)  
- [▶️ How to Execute (Step-by-Step)](#-how-to-execute-step-by-step)  
- [🛠 API Endpoints](#-api-endpoints)  
- [🖼️ Screenshots (Optional)](#-screenshots-optional)  
- [❌ Troubleshooting](#-troubleshooting)  
- [📝 License](#-license)  

---

## 🔹 Features  
✅ Upload and process various audio formats (MP3, WAV, etc.)  
✅ Converts **speech to text** using **OpenAI Whisper**  
✅ Displays **real-time transcription progress with SSE**  
✅ **Enhanced upload progress tracking with a visual progress bar**  
✅ **Responsive UI with improved error handling**  
✅ **Automatic PDF generation for transcription results**  
✅ Supports **multiple languages and accents**  
✅ Uses **Server-Sent Events (SSE) for live updates**  

---

## 🚀 Tech Stack  
- **Frontend:** React.js, HTML, CSS, JavaScript  
- **Backend:** Flask (Python)  
- **AI Model:** OpenAI Whisper  
- **Communication:** Server-Sent Events (SSE), XMLHttpRequest (XHR)  

---

## 📂 Project Structure  
```
audio-transcription-app/  
│── backend/                # Flask Backend  
│   ├── app.py              # Main Flask App  
│   ├── uploads/            # Stores uploaded audio files  
│   ├── requirements.txt    # Backend dependencies  
│   ├── static/             # Stores generated PDFs  
│── frontend/               # React Frontend  
│   ├── src/  
│   │   ├── App.js          # React UI  
│   │   ├── styles.css      # Styling  
│   │   ├── script.js       # Handles file upload & SSE  
│── README.md               # Project Documentation  
│── .gitignore              # Ignore unnecessary files  
│── package.json            # React dependencies  
│── requirements.txt        # Python dependencies  
```

---

## 💻 Installation  

### 🔹 1️⃣ Clone the Repository  
```sh
git clone https://github.com/your-username/audio-transcription-app.git
cd audio-transcription-app
```

### 🔹 2️⃣ Backend Setup (Flask)  
📌 Install Python dependencies (Ensure Python 3.x is installed):  
```sh
cd backend
pip install -r requirements.txt
```
📌 Run Flask server:  
```sh
python app.py
```
By default, the server runs at:  
📍 **http://localhost:5000**  

### 🔹 3️⃣ Frontend Setup (React)  
📌 Install Node.js dependencies:  
```sh
cd frontend
npm install
```
📌 Start React app:  
```sh
npm start
```
By default, the React app runs at:  
📍 **http://localhost:3000**  

---

## ▶️ How to Execute (Step-by-Step)  
1️⃣ Start the Flask backend:  
```sh
cd backend
python app.py
```
2️⃣ Start the React frontend:  
```sh
cd frontend
npm start
```
3️⃣ Open **http://localhost:3000** in your browser.  
4️⃣ Upload an audio file and watch real-time transcription.  
5️⃣ Download the transcription as a **PDF file** when processing is complete.  

---

## 🛠 API Endpoints  
| Method | Endpoint       | Description                        |  
|--------|---------------|----------------------------------|  
| POST   | `/upload`     | Uploads an audio file           |  
| GET    | `/progress`   | Fetches real-time progress updates via SSE |  
| GET    | `/download/<filename>` | Downloads the transcription as a PDF |  

---

## 🖼️ Screenshots (Optional)  
_Relevant screenshots here to showcase the UI and functionality._  
1. Inital
![alt text](image.png)

2. In the Process
![alt text](image-1.png)

3. Final Pdf
![alt text](image-2.png)
---

## ❌ Troubleshooting  
💡 **Issue:** Flask API not starting  
✔️ Ensure Python is installed and dependencies are installed via `pip install -r requirements.txt`  

💡 **Issue:** React app fails to start  
✔️ Run `npm install` before executing `npm start`  

💡 **Issue:** Upload progress bar not updating  
✔️ Ensure you are using the latest browser version and JavaScript is enabled  

💡 **Issue:** PDF download link not working  
✔️ Check that Flask is serving the static directory correctly  

---

## 📝 License  
This project is licensed under the [MIT License](LICENSE).  

---

This guide ensures clarity on the **enhanced upload progress tracking**, **PDF generation**, and **improved error handling** while keeping it beginner-friendly yet detailed for advanced users. 🚀🔥  

Made with ❤️ by **Sashank Banda**

