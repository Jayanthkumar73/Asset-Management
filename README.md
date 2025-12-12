# 🏢 Asset Management System

A full-stack web application for managing organizational assets, dealers, warehouses, and service records. Built with React (Vite) frontend and Node.js/Express backend with MongoDB database.

## 🌐 Live Demo

- **Frontend:** [https://asset-management-azure-two.vercel.app](https://asset-management-azure-two.vercel.app)
- **Backend API:** [https://asset-management-1-0mj8.onrender.com](https://asset-management-1-0mj8.onrender.com)

## ✨ Features

- 📦 **Asset Management** - Track and manage all organizational assets
- 🏪 **Dealer Management** - Maintain dealer information and relationships
- 🏭 **Warehouse Management** - Monitor warehouse inventory and locations
- 🔧 **Service Tracking** - Record and track asset service history
- 📅 **Upcoming Assets** - Plan and track incoming assets
- 📊 **Dashboard** - Visual overview of all asset metrics
- 📧 **Contact System** - Built-in contact functionality with email notifications

## 🛠️ Tech Stack

### Frontend
- **React** - UI Library
- **Vite** - Build tool and development server
- **ESLint** - Code linting

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MongoDB** - NoSQL database
- **Mongoose** - MongoDB ODM
- **Nodemailer** - Email functionality
- **CORS** - Cross-origin resource sharing

## 📁 Project Structure

```
Asset-Management/
├── backend/
│   ├── models/           # MongoDB schemas
│   │   ├── Asset.js
│   │   ├── Asset-service.js
│   │   ├── Contact.js
│   │   ├── Dealers.js
│   │   ├── Upcoming.js
│   │   └── warehouse.js
│   ├── routes/           # API endpoints
│   │   ├── assets.js
│   │   ├── assetservice.js
│   │   ├── contact.js
│   │   ├── dashboard.js
│   │   ├── dealers.js
│   │   ├── Service.js
│   │   ├── upcoming.js
│   │   └── ware.js
│   ├── services/         # Business logic
│   ├── db.js             # Database configuration
│   ├── server.js         # Express server setup
│   └── package.json
│
├── frontend/
│   └── asset-management/
│       ├── src/          # React source code
│       ├── public/       # Static assets
│       ├── index.html
│       ├── vite.config.js
│       └── package.json
│
└── README.md
```

## 🚀 Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- MongoDB database (local or cloud like MongoDB Atlas)

### Backend Setup

1. Navigate to the backend directory:
   ```bash
   cd backend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file with the following variables:
   ```env
   MONGO_URI=your_mongodb_connection_string
   PORT=5000
   ```

4. Start the development server:
   ```bash
   npm run dev
   ```
   
   Or for production:
   ```bash
   npm start
   ```

The backend server will run on `http://localhost:5000`

### Frontend Setup

1. Navigate to the frontend directory:
   ```bash
   cd frontend/asset-management
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

The frontend will run on `http://localhost:5173`

## 📡 API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET/POST | `/api/assets` | Manage assets |
| GET/POST | `/api/dealers` | Manage dealers |
| GET/POST | `/api/assetservice` | Asset service records |
| GET/POST | `/warehouse` | Warehouse management |
| GET/POST | `/upcomingassets` | Upcoming assets |
| GET | `/` | Dashboard data |
| POST | `/contacts` | Contact form submission |

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the ISC License.

## 👤 Author

**Jayanthkumar73**

---

⭐ Star this repo if you find it helpful!