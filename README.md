<div align="center">

![Project Banner](assets/project_banner.png)

# 🚀 Fast-E-COM

**Developed by: Dhanush M**

<img src="assets/project_icon.png" width="100" height="100" alt="Fast-E-COM Icon" />

---

### 🛍️ Experience Modern E-Commerce at Warp Speed

Fast-E-COM is a high-performance, full-stack e-commerce solution designed for visual excellence and seamless performance. Combining a robust FastAPI backend with a lightning-fast React frontend, it offers a premium shopping experience with features like Cash on Delivery (COD), specialized Admin Dashboards, and more.

[Explore Features](#-key-features) • [Tech Stack](#-tech-stack) • [Setup Guide](#-getting-started) • [Project Structure](#-project-structure)

</div>

---

## ✨ Key Features

-   **💎 Premium UI/UX:** Built with Tailwind CSS for a modern, responsive, and glassmorphic aesthetic.
-   **🔐 Secure Authentication:** Powered by Supabase for reliable user management.
-   **🛠️ Admin Dashboard:** Full control over products and orders to manage your store effortlessly.
-   **🛒 Advanced Cart System:** Manage shopping items with real-time updates.
-   **💵 Cash on Delivery (COD):** Integrated payment flow for diverse customer needs.
-   **⚡ High Performance:** Optimized for speed using Vite and FastAPI.

---

## 💻 Tech Stack

### Frontend
-   **React (+ Hooks):** Modern UI development.
-   **Vite:** Ultra-fast build tool and dev server.
-   **Tailwind CSS:** Utility-first CSS for premium styling.
-   **Lucide React:** Beautiful, consistent iconography.

### Backend
-   **FastAPI:** High-performance Python web framework.
-   **Supabase:** PostgreSQL database and authentication.
-   **Uvicorn:** ASGI server for production-ready performance.
-   **Python 3.10+:** Robust and scalable logic.

---

## 📂 Project Structure

```text
Fast-E-COM/
├── store/
│   ├── backend/           # FastAPI Backend API
│   │   ├── routers/       # API Route Handlers
│   │   ├── models.py      # Database Models
│   │   ├── main.py        # Entry Point
│   │   └── .env.example   # Configuration Template
│   └── frontend/          # React + Vite Frontend
│       ├── src/
│       │   ├── components/# Reusable UI Components
│       │   ├── pages/     # Full Page Components
│       │   ├── context/   # Global State Management
│       │   └── index.css  # Global Tailwind Styles
├── assets/                # README Media & Brand Assets
└── README.md              # Project Documentation
```

---

## 🚀 Getting Started

Follow these steps to get your local development environment up and running.

### 1. Prerequisites
-   **Node.js** (v18+)
-   **Python** (v3.10+)
-   **Supabase Project** (URL & Service Key)

### 2. Backend Setup
```bash
# Navigate to backend
cd store/backend

# Virtual Environment
python -m venv venv
.\venv\Scripts\Activate.ps1  # Windows

# Install Dependencies
pip install -r requirements.txt

# Configure Environment
# Rename .env.example to .env and add your Supabase credentials

# Start Server
uvicorn main:app --reload
```
*API running at: `http://127.0.0.1:8000`*

### 3. Frontend Setup
```bash
# Navigate to frontend
cd store/frontend

# Install Packages
npm install

# Start Dev Server
npm run dev
```
*App running at: `http://localhost:5173`*

---

<div align="center">

**Created by Dhanush M**

[![LinkedIn](https://img.shields.io/badge/LinkedIn-0077B5?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/dhanush-m/)
[![GitHub](https://img.shields.io/badge/GitHub-100000?style=for-the-badge&logo=github&logoColor=white)](https://github.com/Dhanush-M-1)

</div>
