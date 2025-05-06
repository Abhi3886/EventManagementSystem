# 🎉 Full-Stack Event Management Website

A modern web application that enables users to browse, register for, and manage events with a seamless user experience. Built with React + Vite on the frontend, Node.js and Express on the backend, and MongoDB for data persistence.

## 🌐 Live Demo

Hosted on Vercel: http://plan-it-all-eventmanagementsystem.vercel.app   


---

## 🚀 Features

- View a list of all upcoming events
- Add new events by organiser approved by admin
- Register or RSVP to events 
- Full CRUD operations (Create, Read, Update, Delete)
- Responsive design

---

## 🧱 Tech Stack

### Frontend
- React Framwork
- Custom Hooks Creation
- React router dom for routing purpose
- CSS

### Backend
- Node.js + Express.js
- MongoDB as DB
- RESTful API design
- CORS + dotenv configuration

### Deployment
- Vercel for website deployment
- Run locally on server

---

## 📁 Project Structure

EventManagemnet/
│

├── frontend/ # React + Vite frontend

│ ├── src/ # React components & logic

│ ├── public/

│ ├── index.html

│ ├── package.json

│ └── vite.config.js
│

├── backend/ # Node.js + Express backend

│ ├── models/ # Mongoose schemas

│ ├── routes/ # Express routes

│ ├── controllers/ # API logic

│ ├── .env # MongoDB URI & config

│ └── server.js # App entry point

│
└── .git/ # Git metadata

yaml
Always show details

Copy

---

## ⚙️ Getting Started

### Prerequisites

- Node.js and npm
- MongoDB Atlas account

---

Here is the **beautified and properly formatted** version of the installation, deployment, and environment setup section for your `README.md` file:

---

## 📦 Installation

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/event-management-app.git
cd event-management-app
```

---

### 2. Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

> This will start the React + Vite development server at `http://localhost:5173`.

---

### 3. Backend Setup

```bash
cd ../backend1
npm install
```

Then create a `.env` file in the `backend1/` directory and add your MongoDB URI:

```env
MONGO_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/eventDB
PORT=5000
```

Start the backend server:

```bash
node server.js
```

> Your backend server should now be running on `http://localhost:5000`.

---

## 🚀 Deployment

### 🌐 Frontend on Vercel

1. Visit [vercel.com](https://vercel.com)
2. Import your GitHub repository
3. Set the project root to `/frontend`
4. Vercel will auto-detect Vite and handle the deployment

> ✅ No need to configure build settings — Vercel takes care of it!

---

### 🖥️ Backend Hosting Options

This project supports multiple options for backend deployment:

* [Render](https://render.com)
* [Railway](https://railway.app)
* [Vercel Serverless Functions](https://vercel.com/docs/functions) ✅ *Used in this project*
* [Heroku](https://heroku.com) *(deprecated free tier)*

Make sure:

* Your backend MongoDB is hosted on **MongoDB Atlas**
* Your IP address is whitelisted in Atlas for access

---

## 📄 Environment Variables

Create a `.env` file in the `/backend1` directory with the following:

```env
MONGO_URI=your-mongodb-connection-string
PORT=5000
```

> 🔐 Keep this file private — never push it to GitHub!

---

## 📌 To-Do / Enhancements

* 🖼️ File/image uploads for event flyers
* 🔍 Pagination and search features
* 🌙 Dark mode UI toggle

---

