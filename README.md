
---

## ⚙️ Installation  

### 1️⃣ Clone the Repository  
```bash
git clone https://github.com/your-username/construction-management-system.git
cd construction-management-system

# 🏗️ Construction Management System  

A full-stack **Construction Management System** built with **Laravel (Backend)** and **React (Frontend)**.  
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
| 🔑 Auth     | Laravel Sanctum / JWT |
| ☁️ Deploy   | Vercel (React) + Render/Heroku (Laravel) |
---

## 📂 Project Structure
construction-management-system/
│── backend/ (Laravel API)
│ ├── app/
│ ├── database/
│ ├── routes/
│ └── ...
│
│── frontend/ (React Dashboard)
│ ├── src/
│ ├── public/
│ └── ...
│
└── README.md 

<p align="center"><a href="https://laravel.com" target="_blank"><img src="https://raw.githubusercontent.com/laravel/art/master/logo-lockup/5%20SVG/2%20CMYK/1%20Full%20Color/laravel-logolockup-cmyk-red.svg" width="400" alt="Laravel Logo"></a></p>
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






