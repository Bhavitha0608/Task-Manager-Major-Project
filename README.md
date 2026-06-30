# 📋 Task Manager - Full Stack MERN Application

A complete task management web application built with the MERN stack (MongoDB, Express.js, React.js, Node.js). This project demonstrates full-stack development with authentication, authorization, and complete CRUD operations.

## 🚀 Live Demo

- **Frontend:** [https://task-manager-frontend.vercel.app](https://task-manager-frontend.vercel.app)
- **Backend API:** [https://task-manager-major-project.onrender.com](https://task-manager-major-project.onrender.com)
- **Health Check:** [https://task-manager-major-project.onrender.com/health](https://task-manager-major-project.onrender.com/health)

## ✨ Features

### 🔐 Authentication & Authorization
- User Registration with Name, Email, Password
- Secure Login with JWT Token Authentication
- Password Hashing using bcrypt
- Protected Routes & Private Workspace
- Users can only access their own data

### ✅ Task Management (CRUD)
- Create Tasks with Title, Description, Priority, Due Date
- View All Tasks in Organized List
- Update Task Details
- Delete Single Tasks
- Delete All Completed Tasks
- Mark Tasks as Complete/Pending

### 🔍 Filtering, Searching & Sorting
- Filter by: All / Pending / Completed
- Search Tasks by Title or Description
- Sort by: Newest / Oldest / Priority / Due Date

### 📊 Task Statistics Dashboard
- Total Tasks Count
- Completed Tasks Count
- Pending Tasks Count
- Completion Rate Percentage
- Priority Breakdown (High/Medium/Low)

## 🛠️ Tech Stack

### Backend
| Technology | Purpose |
|------------|---------|
| Node.js | JavaScript runtime |
| Express.js | Web framework |
| MongoDB Atlas | Cloud database |
| Mongoose | ODM for MongoDB |
| JWT | Authentication tokens |
| bcryptjs | Password hashing |
| CORS | Cross-origin resource sharing |
| dotenv | Environment variables |

### Frontend
| Technology | Purpose |
|------------|---------|
| React.js | UI library |
| Vite | Build tool |
| Tailwind CSS | Styling |
| React Router DOM | Navigation |
| Axios | HTTP client |
| React Hot Toast | Notifications |

### Deployment
| Service | Purpose |
|---------|---------|
| Render | Backend hosting |
| Vercel | Frontend hosting |
| MongoDB Atlas | Database hosting |

## 📁 Project Structure
task-manager/
├── backend/
│ ├── api/
│ │ └── index.js
│ ├── src/
│ │ ├── config/
│ │ ├── models/
│ │ ├── middleware/
│ │ ├── controllers/
│ │ ├── routes/
│ │ └── index.js
│ ├── .env
│ └── package.json
├── frontend/
│ ├── src/
│ │ ├── components/
│ │ ├── context/
│ │ ├── utils/
│ │ ├── App.jsx
│ │ └── main.jsx
│ ├── .env
│ └── package.json
└── README.md


## 🔗 API Documentation

### Authentication Endpoints

| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| POST | `/api/auth/register` | Register new user | No |
| POST | `/api/auth/login` | Login user | No |
| GET | `/api/auth/me` | Get current user | Yes |

### Task Endpoints

| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| GET | `/api/tasks` | Get all tasks | Yes |
| POST | `/api/tasks` | Create task | Yes |
| GET | `/api/tasks/stats` | Get statistics | Yes |
| GET | `/api/tasks/:id` | Get single task | Yes |
| PUT | `/api/tasks/:id` | Update task | Yes |
| DELETE | `/api/tasks/:id` | Delete task | Yes |
| PATCH | `/api/tasks/:id/toggle` | Toggle status | Yes |
| DELETE | `/api/tasks/completed` | Delete completed | Yes |

## 🚀 Setup Instructions

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn
- MongoDB (local or Atlas)

### Clone Repository
```bash
git clone https://github.com/Bhavitha0608/Task-Manager-Major-Project.git
cd Task-Manager-Major-Project
Backend Setup

cd backend
npm install
cp .env.example .env
# Update .env with your MongoDB URI and JWT secret
npm run dev
Frontend Setup

cd frontend
npm install
cp .env.example .env
# Update .env with your backend API URL
npm run dev
Environment Variables
Backend (.env)

PORT=5000
MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/taskmanager
JWT_SECRET=your_jwt_secret_key
JWT_EXPIRE=7d
Frontend (.env)

VITE_API_URL=http://localhost:5000/api
🔒 Security Features
✅ Password Hashing with bcrypt

✅ JWT Token Authentication

✅ Authorization (Users access only their data)

✅ Input Validation

✅ Environment Variables for sensitive data

✅ CORS Configuration

👨‍💻 Author
Bhavitha Jampani

GitHub: @Bhavitha0608
