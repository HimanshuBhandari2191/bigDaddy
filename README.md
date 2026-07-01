
# 🛒 BigDaddy – Full Stack E-commerce Platform (MERN)

A full-stack E-commerce web application built using the MERN stack (MongoDB, Express, React, Node.js) with OTP-based authentication, secure APIs, and real-time product & order management.

---

## 🚀 Live Demo

🌐 Deployed App: https://bigdaddy-yd7y.onrender.com

---

## 📌 Features

### 🔐 Authentication
- Email-based OTP verification
- User registration & login
- role based login (admin/user)
- JWT-based authentication
- Secure password handling

### 🛍️ E-commerce Functionality
- Browse & filter products
- Add to cart
- Place orders
- Order tracking

### 📊 Analytics
- Basic sales insights
- Order statistics
- Backend analytics APIs

### ⚙️ Backend
- RESTful API architecture
- Modular routing
- Middleware-based authentication
- MongoDB integration

---

## 🏗️ Tech Stack

### Frontend
- React.js
- React Router
- CSS

### Backend
- Node.js
- Express.js

### Database
- MongoDB

### Tools & Services
- Nodemailer (OTP email)
- JWT (Authentication)
- Render (Deployment)

---

## 📂 Project Structure

```

bigDaddy/
│
├── client/                # React Frontend
│   ├── src/
│   └── public/
│
├── server/                # Node.js Backend
│   ├── config/            # DB config
│   ├── routes/            # API routes
│   ├── controllers/       # Logic handlers
│   ├── utils/             # Email / helpers
│   └── index.js           # Entry point
│
├── package.json
└── README.md

````

---

## ⚙️ Installation & Setup

### 1️⃣ Clone Repository

```bash
git clone https://github.com/HimanshuBhandari2191/bigDaddy.git
cd bigDaddy
````

---

### 2️⃣ Install Dependencies

```bash
npm run install-all
```

---

### 3️⃣ Setup Environment Variables

Create a `.env` file inside the `server/` directory:

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret

EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_app_password
```

---

### 4️⃣ Run Locally

```bash
npm run dev
```

---

### 5️⃣ Production Build

```bash
npm run build
npm start
```

---

## 🔌 API Endpoints (Sample)

| Method | Endpoint                | Description           |
| ------ | ----------------------- | --------------------- |
| POST   | `/api/auth/send-otp`    | Send OTP to email     |
| POST   | `/api/auth/verify-user` | Verify OTP            |
| POST   | `/api/auth/register`    | Complete registration |
| GET    | `/api/products`         | Get all products      |
| POST   | `/api/orders`           | Place order           |

---

## 📧 OTP Email System

* Uses Nodemailer with Gmail SMTP

⚠️ **Important Note:**
Gmail SMTP may not work reliably in production (Render/cloud environments) due to:

* Connection timeouts
* IPv6 routing issues
* Gmail security restrictions

👉 Recommended upgrade:

* Resend API
* SendGrid
* Mailgun

---

## 🚧 Known Issues

* OTP email may fail in deployed version due to Gmail SMTP limitations
* Requires switching to production email service for stability

---

## 🔮 Future Enhancements

* Integrate Resend/SendGrid for email
* Add payment gateway (Stripe / Razorpay)
* Admin dashboard
* Product reviews & ratings
* Performance optimization

---

## 🤝 Contributing

Contributions are welcome!

1. Fork the repo
2. Create a new branch
3. Make changes
4. Submit a Pull Request

---

## 👨‍💻 Author

**Himanshu Bhandari**

📧 Email: [himanshubhandari2191@gmail.com](mailto:himanshubhandari2191@gmail.com)
🔗 GitHub: [https://github.com/HimanshuBhandari2191](https://github.com/HimanshuBhandari2191)

---

## ⭐ Show Your Support

If you like this project:

👉 Give it a ⭐ on GitHub
👉 Share it with others

---

## 📜 License

This project is licensed under the ISC License.

```

