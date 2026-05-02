# 📋 Team Task Manager

A full-stack web application where teams can manage projects and tasks with role-based access control.

## 🌐 Live Demo

[view live](https://taskmanager-production-b831.up.railway.app)

## 🚀 Features

- **Authentication** - Signup/Login with session management
- **Role Based Access** - Admin and Member roles
- **Project Management** - Create and manage projects
- **Task Management** - Create, assign and track tasks
- **Task Status** - Todo, In Progress, Done
- **Member Management** - Add members to projects

## 🛠️ Tech Stack

- **Frontend** - HTML, CSS, EJS
- **Backend** - Node.js, Express.js
- **Database** - MongoDB (Atlas)
- **Authentication** - Express Session, Bcryptjs

## ⚙️ Installation

1. Clone the repository
```bash
   git clone https://github.com/Parthverma12/team-task-manager.git
```

2. Install dependencies
```bash
   npm install
```

3. Create `.env` file in root
   
4. Run the app
```bash
   npm run dev
```
5. Open browser and go to
   http://localhost:3000/
   
## 👥 Roles

| Feature | Admin | Member |
|---------|-------|--------|
| Create Project | ✅ | ❌ |
| Delete Project | ✅ | ❌ |
| Add Members | ✅ | ❌ |
| Create Task | ✅ | ❌ |
| Delete Task | ✅ | ❌ |
| Update Task Status | ✅ | ✅ |
| View Projects | ✅ | ✅ |

## 👨‍💻 Author

Made with ❤️ by **Parth Verma**
