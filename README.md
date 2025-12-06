# MERN Authentication System with Logical Automation

A complete full-stack authentication system built with React, Node.js, Express, and MongoDB. Features JWT authentication, password hashing, and automated welcome email system.

## 📁 Project Structure

```
login_Signup_Test/
├── backend/
│   ├── src/
│   │   ├── config/
│   │   │   └── db.js
│   │   ├── models/
│   │   │   ├── User.js
│   │   │   ├── AutomationEvent.js
│   │   │   └── EmailList.js
│   │   ├── controllers/
│   │   │   └── authController.js
│   │   ├── routes/
│   │   │   └── authRoutes.js
│   │   ├── middleware/
│   │   │   └── authMiddleware.js
│   │   ├── services/
│   │   │   └── automationService.js
│   │   ├── utils/
│   │   │   └── generateToken.js
│   │   └── server.js
│   ├── .env
│   └── package.json
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Input.jsx
│   │   │   ├── Button.jsx
│   │   │   └── Navbar.jsx
│   │   ├── pages/
│   │   │   ├── Signup.jsx
│   │   │   ├── Login.jsx
│   │   │   └── Dashboard.jsx
│   │   ├── context/
│   │   │   └── AuthContext.jsx
│   │   ├── api/
│   │   │   └── auth.js
│   │   ├── styles/
│   │   │   └── auth.css
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── .env
│   ├── index.html
│   ├── vite.config.js
│   └── package.json
│
└── README.md
```

## 🚀 Features

- **User Authentication**: Sign up, login, and protected routes
- **JWT Tokens**: Secure token-based authentication
- **Password Security**: Bcryptjs hashing with salt rounds
- **MongoDB Integration**: Persistent data storage
- **Logical Automation**: Welcome email system on signup
- **Client-side Validation**: Form validation with error messages
- **Protected Routes**: Dashboard accessible only to authenticated users
- **Modern UI**: Clean, responsive design with Tailwind-inspired styling

## 📋 Prerequisites

- Node.js (v14 or higher)
- MongoDB (local or cloud instance)
- npm or yarn

## 🔧 Installation

### Backend Setup

1. Navigate to backend directory:
```bash
cd backend
```

2. Install dependencies:
```bash
npm install
```

3. Create `.env` file with:
```
PORT=5000
MONGODB_URI=mongodb://localhost:27017/mern-auth
JWT_SECRET=your_jwt_secret_key_change_this_in_production
NODE_ENV=development
```

4. Start the server:
```bash
npm run dev
```

The backend will run on `http://localhost:5000`

### Frontend Setup

1. Navigate to frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Create `.env` file with:
```
VITE_API_URL=http://localhost:5000
```

4. Start the development server:
```bash
npm run dev
```

The frontend will run on `http://localhost:5173`

## 📚 API Endpoints

### Authentication Routes

- **POST** `/api/auth/signup` - Register new user
  - Body: `{ name, email, password, passwordConfirm }`
  - Returns: `{ token, user }`

- **POST** `/api/auth/login` - Login user
  - Body: `{ email, password }`
  - Returns: `{ token, user }`

- **GET** `/api/auth/me` - Get current user (Protected)
  - Headers: `Authorization: Bearer <token>`
  - Returns: `{ user }`

## 🤖 Logical Automation

When a user signs up, the automation service:

1. **Stores Event**: Creates an `AutomationEvent` record in MongoDB
2. **Console Welcome**: Logs a formatted welcome message
3. **Email List**: Adds user email to `EmailList` collection

### Automation Service Flow

```javascript
runAutomation({
  userId,
  name,
  email,
  timestamp
})
```

This triggers:
- Database event logging
- Console-based welcome message
- Email list storage

## 🔐 Security Features

- **Password Hashing**: Bcryptjs with 10 salt rounds
- **JWT Authentication**: 7-day token expiration
- **Protected Routes**: Middleware-based route protection
- **CORS Enabled**: Cross-origin requests allowed
- **Input Validation**: Client and server-side validation

## 🎨 Frontend Pages

### Sign Up Page
- Name, email, password fields
- Client-side validation
- Password confirmation
- Redirect to dashboard on success

### Login Page
- Email and password fields
- Form validation
- Token storage in localStorage
- Redirect to dashboard on success

### Dashboard Page
- Welcome message with user name
- User information display
- Protected route (requires authentication)
- Logout functionality

## 📦 Deployment

### Deploy Backend to Render

1. Push your code to GitHub
2. Go to [Render.com](https://render.com)
3. Create new Web Service
4. Connect your GitHub repository
5. Set environment variables:
   - `MONGODB_URI`: Your MongoDB connection string
   - `JWT_SECRET`: Your secret key
   - `NODE_ENV`: production
6. Deploy

### Deploy Frontend to Vercel

1. Push your code to GitHub
2. Go to [Vercel.com](https://vercel.com)
3. Import your project
4. Set environment variables:
   - `VITE_API_URL`: Your Render backend URL
5. Deploy

### Alternative: Deploy to Netlify

1. Build the frontend:
```bash
npm run build
```

2. Deploy the `dist` folder to Netlify

## 🧪 Testing

### Test Sign Up
```bash
curl -X POST http://localhost:5000/api/auth/signup \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Doe",
    "email": "john@example.com",
    "password": "password123",
    "passwordConfirm": "password123"
  }'
```

### Test Login
```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "john@example.com",
    "password": "password123"
  }'
```

### Test Protected Route
```bash
curl -X GET http://localhost:5000/api/auth/me \
  -H "Authorization: Bearer <your_token>"
```

## 🐛 Troubleshooting

**MongoDB Connection Error**
- Ensure MongoDB is running
- Check connection string in `.env`
- Verify network access if using MongoDB Atlas

**CORS Error**
- Ensure backend has CORS enabled
- Check frontend API URL matches backend

**Token Expiration**
- Tokens expire after 7 days
- User needs to login again
- Token is stored in localStorage

## 📝 Environment Variables

### Backend (.env)
```
PORT=5000
MONGODB_URI=mongodb://localhost:27017/mern-auth
JWT_SECRET=your_secret_key_here
NODE_ENV=development
```

### Frontend (.env)
```
VITE_API_URL=http://localhost:5000
```

## 🤝 Contributing

Feel free to fork and submit pull requests for any improvements.

## 📄 License

MIT License - feel free to use this project for personal or commercial purposes.

## 🎯 Next Steps

- Add email verification
- Implement password reset
- Add user profile update
- Implement refresh tokens
- Add two-factor authentication
- Create admin dashboard

---

Built with ❤️ using MERN Stack
