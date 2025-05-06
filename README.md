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

event_in_react/
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

## 📦 Installation

### 1. Clone the Repo

```bash
git clone https://github.com/your-username/event-management-app.git
cd event-management-app
2. Frontend Setup
bash
Always show details

Copy
cd frontend
npm install
npm run dev
3. Backend Setup
bash
Always show details

Copy
cd ../backend1
npm install

# Create a .env file and add your MongoDB URI
echo "MONGO_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/eventDB" > .env

node server.js
🚀 Deployment
Frontend on Vercel
Go to vercel.com

Import your GitHub repository

Set frontend as the root directory

Vercel will auto-detect Vite and deploy

Backend Hosting Options
Render

Railway

Vercel Serverless Functions used in this project

Heroku (deprecated free tier)

Make sure your MongoDB URI uses MongoDB Atlas and includes your IP whitelist.

📄 Environment Variables
Create a .env file in the backend/ directory:

env
Always show details

Copy
MONGO_URI=your-mongodb-connection-string
PORT=5000
📌 To-Do / Enhancements
Authentication (JWT, OAuth)

Admin dashboard

File/image upload for events

Pagination and search
