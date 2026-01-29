# Agent Protocol | Nathan Mendis Portfolio ⚡

> "Systems Operational. Agent Ready."

A high-performance, **Valorant-themed** personal portfolio and blog built with a decoupled architecture. It features a React frontend with advanced animations and a Django backend for content management.

![Valorant Theme Portfolio](https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&q=80&w=1000)

## 🛠 Tech Stack

### Frontend (Client)
*   **Framework**: React (Vite)
*   **Styling**: Tailwind CSS v3 (Custom Valorant Config)
*   **Animations**: Framer Motion (3D cards, Glitch effects, Parallax)
*   **Routing**: React Router DOM
*   **HTTP**: Axios

### Backend (Server)
*   **Framework**: Django DRF (Django Rest Framework)
*   **Database**: SQLite (Dev) / PostgreSQL (Prod)
*   **Authentication**: OAuth2 (Google Gmail API for contact form)
*   **Environment**: Python Dotenv

---

## 🚀 Key Features

*   **Valorant Aesthetic**: Custom HUD elements, "Teko" & "Oswald" typography, and responsive "glassmorphism" UI.
*   **Interactive Hero**: Parallax mouse-movement effects and 3D floating cards.
*   **Secure Contact Form**: Designed as a "Secure Encrypted Channel", integrated with Gmail API via OAuth2 (no less-secure apps).
*   **Dynamic Blog**: Fetches articles from the Django REST API.
*   **Project Carousel**: Smooth horizontal scroll for showcasing work.

---

## 📂 Project Structure

This is a monorepo containing both client and server:

```bash
/
├── frontend/           # React Application
│   ├── src/
│   ├── tailwind.config.js
│   └── ...
└── personal_blog/      # Django Backend
    ├── personal_blog/  # Core Settings & APIs
    ├── manage.py
    └── ...
```

---

## ⚡ Quick Start

### 1. Backend Setup

 Navigate to the backend folder:
```bash
cd personal_blog
```

Create virtual environment & install dependencies:
```bash
python -m venv .venv
# Windows
.venv\Scripts\activate
# Mac/Linux
source .venv/bin/activate

pip install -r requirements.txt
```

Configure Environment Variables (`.env`) in `personal_blog/personal_blog/`:
```env
SECRET_KEY=your_django_secret
DEBUG=True
GMAIL_CLIENT_ID=your_oauth_client_id
GMAIL_CLIENT_SECRET=your_oauth_client_secret
GMAIL_REFRESH_TOKEN=your_refresh_token
GMAIL_SENDER_EMAIL=your_email@gmail.com
GMAIL_RECEIVER_EMAIL=your_email@gmail.com
```

Run Migrations & Server:
```bash
python manage.py migrate
python manage.py runserver
```
*Backend runs at `http://127.0.0.1:8000`*

### 2. Frontend Setup

Navigate to frontend folder:
```bash
cd frontend
```

Install & Start:
```bash
npm install
npm run dev
```
*Frontend runs at `http://localhost:5173`*

---

## 🔐 Google OAuth Token Automation

This project uses a custom script to handle Google OAuth tokens preventing expiry in development.

If your email function fails due to token expiry:
1.  Run the helper script in the backend folder:
    ```bash
    .\refresh_token.bat
    ```
2.  Follow the browser prompt to re-authenticate.
3.  Your `.env` file will be automatically updated.

---

## 📄 License

[MIT](LICENSE) © Nathan Mendis
