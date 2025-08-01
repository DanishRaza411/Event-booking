# 🎉 Event Booking Platform

A full-featured Event Booking Web App where users can explore and book tickets for events. The platform supports multiple roles (Admin, Organizer, Customer) with dynamic dashboards, QR code ticketing, and more.

---

## 🚀 Tech Stack

- **Frontend:** React.js, TailwindCSS, Axios
- **Backend:** Node.js, Express.js
- **Database:** MongoDB
- **Authentication:** JWT
- **Others:** QR Code Generation, Role-Based Access

---

## 🔑 User Roles

### 👤 Customer
- Register/Login
- Browse and view event details
- Book tickets with "Book Now" button
- View all bookings with downloadable QR codes

### 🎤 Organizer
- Submit and manage events
- View bookings related to their events

### 🛠️ Admin
- Manage all users
- Approve submitted events
- View all bookings
- Delete or edit users and events

---

## ✨ Key Features

- 🔐 JWT-based Authentication with role handling
- 📅 Event creation & management
- 🎟️ Ticket booking with real-time QR code generation
- 📥 View My Bookings & scan QR tickets
- 📊 Admin & Organizer Dashboards
- 🌐 Hero Home Page with featured events & contact section

---

## 📂 Folder Structure

```bash
event-booking-app/
├── client/                  # React Frontend
│   └── src/
│       ├── components/
│       ├── pages/
│       └── App.jsx
├── server/                  # Node.js Backend
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   └── server.js
└── README.md


