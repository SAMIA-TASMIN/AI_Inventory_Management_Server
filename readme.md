# 🤖 AI Model Inventory Management System

A comprehensive web application for managing, discovering, and purchasing AI/ML models. Built with React, Node.js, Express, and MongoDB.

---

## 📋 Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Installation](#installation)
- [Environment Variables](#environment-variables)
- [Usage](#usage)
- [API Endpoints](#api-endpoints)
- [Project Structure](#project-structure)
- [Key Features Implementation](#key-features-implementation)
- [Contributing](#contributing)
- [License](#license)

---

## ✨ Features

### 🔍 Core Functionality
- **Search Models**: Real-time search functionality to find AI models by name using MongoDB regex
- **Filter by Framework**: Filter models by popular frameworks (TensorFlow, PyTorch, Keras, Scikit-learn)
- **Model Purchase**: Track model purchases with real-time counter updates using MongoDB $inc operator
- **CRUD Operations**: Create, Read, Update, and Delete AI models with full database integration
- **User Authentication**: Secure authentication using Firebase Admin SDK
- **Personalized Dashboard**: View your uploaded models and purchased models separately

### 🎨 User Experience
- **Responsive Design**: Fully responsive UI that works seamlessly on all devices
- **Modern UI/UX**: Beautiful gradient backgrounds with glassmorphism effects
- **Real-time Updates**: Instant UI updates without page refresh using React state management
- **Toast Notifications**: User-friendly success/error messages with React Toastify
- **Auto-clear Search**: Search input automatically clears after successful search

### 🛡️ Security
- **Firebase Authentication**: Secure user authentication with Firebase Admin
- **Protected Routes**: Role-based access control for model management
- **Environment Variables**: Secure credential management with dotenv
- **User-based Permissions**: Users can only edit/delete their own models

---

## 🛠️ Tech Stack

### Frontend
- **React 18** - Modern UI library with hooks
- **React Router** - Client-side routing and navigation
- **Axios** - Promise-based HTTP client
- **Tailwind CSS** - Utility-first CSS framework
- **React Toastify** - Toast notification system

### Backend
- **Node.js** - JavaScript runtime environment
- **Express.js** - Minimal web application framework
- **MongoDB** - NoSQL database with flexible schema
- **Firebase Admin SDK** - Server-side authentication
- **CORS** - Cross-Origin Resource Sharing

### Database
- **MongoDB Atlas** - Cloud-hosted MongoDB database
- **MongoDB Driver** - Official Node.js driver for MongoDB

---

## 📦 Installation

### Prerequisites
```
Node.js (v18 or higher)
npm or yarn package manager
MongoDB Atlas account
Firebase project with Admin SDK
```

### Clone the Repository
```bash
git clone https://github.com/SAMIA-TASMIN/AI_Inventory_Client
cd ai-model-inventory
```

### Backend Setup
```bash
cd server
npm install


touch .env
npm start

```

### Frontend Setup
```bash

cd client
npm install
npm run dev
# Application will open on http://localhost:5173
```

---

### Backend (.env)
Create a `.env` file in the server directory:
```env
PORT=3000
DB_USER=your_mongodb_username
DB_PASS=your_mongodb_password
```


### Frontend (.env.local)
Create a `.env.local` file in the frontend directory:
```env
VITE_FIREBASE_API_KEY=your_firebase_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_auth_domain
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_storage_bucket
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id
```

## 🙏 Acknowledgments

Special thanks to the following technologies and communities:

- **React Team** - For the amazing React library
- **MongoDB** - For the flexible NoSQL database
- **Firebase** - For authentication services
- **Express.js** - For the minimal web framework
- **Tailwind CSS** - For the utility-first CSS framework
- **Vite** - For the lightning-fast build tool
- **Stack Overflow Community** - For problem-solving help
- **GitHub** - For version control and collaboration

---


### Feature Requests
```
We welcome feature suggestions!
Please provide:
1. Clear description of the feature
2. Use case / Why it's needed
3. Proposed implementation (if any)
```

---

## 🚀 Future Enhancements

Planned features for future releases:

```
✅ Completed:
- Search functionality
- Framework filter
- Purchase counter
- User authentication

🔄 In Progress:
- Advanced filtering (multiple filters)
- Sorting options (by name, date, popularity)

📋 Planned:
- User reviews and ratings
- Model comparison feature
- Advanced search with multiple fields
- Export model data
- Admin dashboard
- Email notifications
- Model versioning
- API documentation with Swagger
- Unit and integration tests
- Docker containerization
- CI/CD pipeline
```

