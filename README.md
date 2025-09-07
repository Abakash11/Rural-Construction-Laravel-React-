
---

## ⚙️ Installation  

### 1️⃣ Clone the Repository  
```

# 🏗️ Construction Project 

A full-stack **Construction Project** built with **Laravel (Backend)** and **React (Frontend)**.  
This system allows construction companies to **manage projects, employees, tasks, budgets, and progress tracking** from a centralized dashboard.  

---

## 🚀 Features  

✅ Dynamic full-stack project
✅ File & image uploads (Project documents, blueprints, etc.)  
✅ Modern React dashboard with charts & analytics  
✅ REST API with Laravel backend  

---

## 🛠️ Tech Stack  

| Layer       | Technology |
|-------------|------------|
| 🎨 Frontend | React, TailwindCSS, Axios, Recharts |
| ⚙️ Backend  | Laravel 10 (REST API) |
| 🗄️ Database | MySQL / MariaDB |
| 🔑 Auth     | Laravel Sanctum  |
| ☁️ Deploy   | Vercel (React) + Sevalla (Laravel + MySql) |
---

## 📂 Project Structure
construction-management-system/
│── backend/ (Laravel API)
│ ├── app/
│ ├── database/
│ └── routes/api.php
│
│── frontend/ (React Dashboard)
│ ├── src/
│ └──  public/
└── README.md 


cd backend
cp .env.example .env
composer install
php artisan key:generate
php artisan migrate
php artisan migrate --seed
php artisan serve


cd frontend
npm install
npm start






