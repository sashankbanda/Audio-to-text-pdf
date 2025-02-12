# 🎤 Audio Transcription App  
Convert audio files to text using AI-powered transcription.  

This project uses **Flask (Python) as the backend** and **React.js as the frontend** to provide real-time transcription of audio files.  

---

## 📖 Table of Contents  
- [🔹 Features](#-features)  
- [🚀 Tech Stack](#-tech-stack)  
- [📂 Project Structure](#-project-structure)  
- [💻 Installation](#-installation)  
- [▶️ How to Execute (Step-by-Step)](#-how-to-execute-step-by-step)  
- [🛠 API Endpoints](#-api-endpoints)  
- [📷 Screenshots (Optional)](#-screenshots-optional)  
- [❌ Troubleshooting](#-troubleshooting)  
- [📜 License](#-license)  

---

## 🔹 Features  
✅ Upload and process audio files (MP3, WAV, etc.)  
✅ Converts **speech to text** using **OpenAI Whisper**  
✅ Displays **real-time progress updates**  
✅ **Responsive UI** built with **React.js**  
✅ Supports **various audio formats**  

---

## 🚀 Tech Stack  
- **Frontend:** React.js, HTML, CSS  
- **Backend:** Flask (Python)  
- **AI Model:** OpenAI Whisper  
- **Communication:** Server-Sent Events (SSE)  

---

## 📂 Project Structure  
audio-transcription-app/ │── backend/ # Flask Backend │ ├── app.py # Main Flask App │ ├── uploads/ # Stores uploaded audio files │ ├── requirements.txt # Backend dependencies │── frontend/ # React Frontend │ ├── src/ │ │ ├── App.js # React UI │ │ ├── styles.css # Styling │ │ ├── index.js # React Root Component │── README.md # Project Documentation │── .gitignore # Ignore unnecessary files │── package.json # React dependencies │── requirements.txt # Python dependencies


---

## 💻 Installation  

### 🔹 1️⃣ Clone the Repository  
```sh
git clone https://github.com/your-username/audio-transcription-app.git
cd audio-transcription-app
```
🔹 2️⃣ Backend Setup (Flask)
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
📍 http://localhost:5000

🔹 3️⃣ Frontend Setup (React)
📌 Install Node.js dependencies:
```sh
cd frontend
npm install
```
📌 Start React app:
```sh
npm start
```
Frontend will be available at:
📍 http://localhost:3000

▶️ How to Execute (Step-by-Step)
✅ For Absolute Beginners
🔵 Step 1: Install Python and Node.js

Install Python 3.x from python.org
Install Node.js from nodejs.org
🔵 Step 2: Open Terminal/Command Prompt
Navigate to the project folder:
```sh
cd audio-transcription-app
```
🔵 Step 3: Start the Backend (Flask)
```sh
cd backend
pip install -r requirements.txt
python app.py
```
👉 You should see "Running on http://127.0.0.1:5000/"

🔵 Step 4: Start the Frontend (React)
```sh
cd frontend
npm install
npm start
```
👉 You should see the React app running in your browser.

🔵 Step 5: Upload an audio file and check the transcription result!

🛠 API Endpoints
Endpoint	Method	Description
/upload	POST	Uploads an audio file for transcription
/progress	GET	Fetches real-time progress updates

📷 Screenshots (Optional)

(Replace with actual screenshots of your app in action!)

❌ Troubleshooting
🔹 Backend Issues
Error: ModuleNotFoundError: No module named 'flask'
✅ Run: pip install -r requirements.txt
Port Already in Use (5000)?
✅ Run: kill -9 $(lsof -t -i:5000) (Linux/Mac)
✅ Run: taskkill /F /IM python.exe (Windows)
🔹 Frontend Issues
npm start Fails?
✅ Run: npm install again
CORS Error?
✅ Ensure Flask server is running before React
📜 License
🔓 Open-source project under MIT License


This guide makes it **super beginner-friendly** while still detailed for advanced users. 🚀🔥
Made with ❤️ by **Sashank Banda**
