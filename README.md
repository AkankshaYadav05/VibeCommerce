# 🛍️ VibeCommerce

**VibeCommerce** is a modern, full-stack e-commerce web application built using the **MERN stack (MongoDB, Express.js, React.js, Node.js)**.  
It allows users to browse products, add them to a cart, and proceed to checkout — all through a clean, intuitive interface styled with **Tailwind CSS**.

---

## 🧩 Features

✅ Browse products dynamically fetched from MongoDB  
✅ Add or remove items from your cart  
✅ Automatic total calculation and checkout  
✅ Smooth UX with React Hooks and Context  
✅ RESTful backend APIs with Express and Mongoose  
✅ Fully responsive UI using Tailwind CSS  

---

## 🧠 Tech Stack

| Layer | Technology |
|-------|-------------|
| **Frontend** | React.js + Vite + Tailwind CSS |
| **Backend** | Node.js + Express.js |
| **Database** | MongoDB Atlas |
| **State Management** | React Hooks |
| **Deployment** | Vercel (Frontend) + Render (Backend) |

---

## ⚙️ Installation & Setup

### 🗂 Folder Structure

VibeCommerce/
│
├── backend/
│ ├── models/
│ ├── routes/
│ ├── server.js
│ ├── seed.js
│ └── .env
│
├── frontend/
│ ├── src/
│ │ ├── components/
│ │ ├── pages/
│ │ └── App.jsx
│ ├── vite.config.js
│ └── .env
│
└── README.md


---

## 🧰 Backend Setup

```bash
cd backend
npm install
```

Create a .env file inside /backend

```bash
PORT=5000
MONGODB_URI=mongodb://localhost:27017/vibecommerce
```

Run MongoDB locally or connect via MongoDB Atlas

If local:
```bash
node seed.js
```

Start the backend server
```bash
node server.js
```

💻 Frontend Setup
```bash
cd frontend
npm install
```

Create a .env file inside /frontend
```bash
VITE_API_URL=http://localhost:5000
```

Run the frontend
```bash
npm run dev
```

✅ The app will run at:
http://localhost:5173

## Some screenshots 
<img width="1598" height="902" alt="image" src="https://github.com/user-attachments/assets/7d64cb5d-1c94-44ca-b350-0128152a66ff" />
<img width="1722" height="876" alt="image" src="https://github.com/user-attachments/assets/00a8e3f6-b829-486f-8d11-3ba37ed7c4b1" />
<img width="560" height="392" alt="image" src="https://github.com/user-attachments/assets/d804260c-eac6-4f17-9fde-da775191380c" />
<img width="558" height="792" alt="image" src="https://github.com/user-attachments/assets/bfc56f69-094a-4271-8d68-a77970bd8452" />




