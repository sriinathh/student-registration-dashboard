# 🎓 Student Registration Dashboard

A modern, full-stack MERN application for managing student registrations with secure authentication, real-time data processing, and beautiful UI.

## 🌟 Features

### 🔐 Authentication System
- **User Registration** with email validation
- **Email Verification** using OTP
- **Login** with Email or Roll Number
- **Password Reset** with OTP verification
- **JWT Token Management** for secure sessions
- **Protected Routes** and role-based access

### 👥 Student Management
- **Dashboard** with real-time statistics
- **Student Directory** with search and filter
- **Profile Management** with edit capabilities
- **Responsive Design** for all devices
- **Data Table** with pagination

### 🎨 UI/UX
- **Material UI v5** components
- **Dark/Light Mode** toggle
- **Smooth Animations** and transitions
- **Mobile-Optimized** layout
- **Professional Styling** with gradients

### 🔧 Backend
- **Express.js** REST API
- **MongoDB** with Mongoose ORM
- **Email Service** with Nodemailer
- **Bcrypt** password hashing
- **JWT** authentication tokens
- **Error Handling** middleware

## 📋 Project Structure

```
student-registration-dashboard/
├── backend/
│   ├── models/
│   │   ├── User.js
│   │   └── OTP.js
│   ├── routes/
│   │   ├── auth.js
│   │   └── students.js
│   ├── controllers/
│   │   ├── authController.js
│   │   └── studentController.js
│   ├── middleware/
│   │   └── auth.js
│   ├── utils/
│   │   └── emailService.js
│   ├── server.js
│   ├── .env
│   └── package.json
│
└── frontend/
    ├── src/
    │   ├── pages/
    │   │   ├── Landing.jsx
    │   │   ├── Register.jsx
    │   │   ├── Login.jsx
    │   │   ├── VerifyOTP.jsx
    │   │   ├── ForgotPassword.jsx
    │   │   ├── ResetPassword.jsx
    │   │   ├── Dashboard.jsx
    │   │   └── Profile.jsx
    │   ├── components/
    │   │   ├── Navbar.jsx
    │   │   ├── Sidebar.jsx
    │   │   ├── PrivateRoute.jsx
    │   │   ├── LoadingSpinner.jsx
    │   │   └── Snackbar.jsx
    │   ├── context/
    │   │   ├── AuthContext.jsx
    │   │   └── ThemeContext.jsx
    │   ├── services/
    │   │   └── api.js
    │   ├── theme/
    │   │   └── theme.js
    │   ├── App.jsx
    │   ├── index.jsx
    │   ├── index.css
    │   └── package.json
    └── public/
        └── index.html
```

## 🚀 Getting Started

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (local or cloud)
- npm or yarn

### Backend Setup

1. **Navigate to backend directory:**
   ```bash
   cd backend
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Create `.env` file:**
   ```env
   MONGODB_URI=mongodb://localhost:27017/student-dashboard
   PORT=5000
   JWT_SECRET=your_jwt_secret_key_change_in_production
   JWT_EXPIRE=7d
   
   # Email Configuration (Use Gmail App Password)
   EMAIL_USER=your_email@gmail.com
   EMAIL_PASSWORD=your_app_password
   
   # Frontend URL
   FRONTEND_URL=http://localhost:3000
   ```

4. **Start MongoDB:**
   ```bash
   # If using local MongoDB
   mongod
   ```

5. **Run backend server:**
   ```bash
   npm run dev
   ```
   Server will run on `http://localhost:5000`

### Frontend Setup

1. **Navigate to frontend directory:**
   ```bash
   cd frontend
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Create `.env` file:**
   ```env
   REACT_APP_API_URL=http://localhost:5000/api
   ```

4. **Start development server:**
   ```bash
   npm start
   ```
   App will open on `http://localhost:3000`

## 📚 API Endpoints

### Authentication Routes
```
POST   /api/auth/register           - Register new user
POST   /api/auth/verify-otp         - Verify email OTP
POST   /api/auth/resend-otp         - Resend OTP
POST   /api/auth/login              - Login user
POST   /api/auth/forgot-password    - Request password reset
POST   /api/auth/reset-password     - Reset password with OTP
GET    /api/auth/me                 - Get current user (Protected)
PUT    /api/auth/update-profile     - Update profile (Protected)
PUT    /api/auth/change-password    - Change password (Protected)
```

### Student Routes
```
GET    /api/students                - Get all students (Protected)
GET    /api/students/:id            - Get single student (Protected)
POST   /api/students                - Create student (Protected/Admin)
PUT    /api/students/:id            - Update student (Protected)
DELETE /api/students/:id            - Delete student (Protected/Admin)
GET    /api/students/stats/dashboard - Get dashboard stats (Protected)
```

## 🎯 Usage

### Register New Account
1. Click "Register" on landing page
2. Fill in Name, Roll Number, Email, Password
3. Verify email with OTP sent to your inbox
4. Login with your credentials

### Login
1. Enter Email or Roll Number
2. Enter Password
3. Redirect to Dashboard

### Update Profile
1. Go to Profile page
2. Click "Edit" button
3. Update your information
4. Click "Save Changes"

### Reset Password
1. Click "Forgot Password" on login page
2. Enter your email
3. Check email for OTP
4. Enter OTP and new password
5. Password will be reset

## 🛡️ Security Features

- ✅ Password hashing with bcrypt
- ✅ JWT token-based authentication
- ✅ Protected routes with middleware
- ✅ OTP email verification
- ✅ CORS enabled for secure requests
- ✅ Environment variables for secrets
- ✅ Input validation on frontend and backend

## 🌈 Theming

The app supports both Light and Dark modes:
- **Toggle button** in navbar
- **Persistent preference** saved in localStorage
- **Beautiful gradients** in both themes
- **Smooth transitions** between themes

**Color Scheme:**
- Primary: `#667eea` (Purple)
- Secondary: `#764ba2` (Dark Purple)
- Success: `#66bb6a` (Green)
- Warning: `#ffa726` (Orange)
- Error: `#ef5350` (Red)

## 📦 Dependencies

### Backend
- `express` - Web framework
- `mongoose` - MongoDB ORM
- `bcryptjs` - Password hashing
- `jsonwebtoken` - JWT tokens
- `nodemailer` - Email service
- `cors` - CORS middleware
- `dotenv` - Environment variables

### Frontend
- `react` - UI library
- `react-router-dom` - Routing
- `@mui/material` - UI components
- `@emotion/react` - Styling
- `axios` - HTTP client

## 🚀 Deployment

### Backend (Render)
1. Push code to GitHub
2. Create new Web Service on Render
3. Connect GitHub repository
4. Set environment variables
5. Deploy

### Frontend (Vercel)
1. Push code to GitHub
2. Import project to Vercel
3. Set `REACT_APP_API_URL` environment variable
4. Deploy

## 🐛 Troubleshooting

### MongoDB Connection Error
- Make sure MongoDB is running
- Check MONGODB_URI in .env

### Email Not Sending
- Use Gmail App Password (not regular password)
- Enable "Less secure app access" or use App Password
- Check EMAIL_USER and EMAIL_PASSWORD in .env

### CORS Error
- Check FRONTEND_URL in backend .env
- Make sure frontend and backend servers are running

### Port Already in Use
- Change PORT in backend .env
- Change port in frontend package.json scripts

## 📄 License

This project is open source and available under the MIT License.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📞 Support

For support, email your-email@example.com or open an issue on GitHub.

---

**Made with ❤️ by the Development Team**

