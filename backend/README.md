# 🎓 Backend - Student Registration Dashboard

Express.js backend server for the Student Registration Dashboard application.

## 📋 Prerequisites

- Node.js (v14 or higher)
- MongoDB (local or cloud)
- npm or yarn

## 🚀 Installation & Setup

### 1. Install Dependencies
```bash
npm install
```

### 2. Create Environment File
Create a `.env` file in the root directory:

```env
# Database
MONGODB_URI=mongodb://localhost:27017/student-dashboard

# Server
PORT=5000

# JWT
JWT_SECRET=your_super_secret_jwt_key_change_in_production
JWT_EXPIRE=7d

# Email Service (Gmail)
EMAIL_USER=your_email@gmail.com
EMAIL_PASSWORD=your_app_password_not_regular_password

# Frontend URL
FRONTEND_URL=http://localhost:3000
```

**⚠️ Important:** For Gmail, use an [App Password](https://myaccount.google.com/apppasswords) instead of your regular password.

### 3. Start MongoDB
```bash
# If using MongoDB locally
mongod
```

### 4. Run Development Server
```bash
npm run dev
```

The server will start on `http://localhost:5000`

## 📁 Folder Structure

```
backend/
├── models/              # Database schemas
│   ├── User.js         # User model
│   └── OTP.js          # OTP model
├── routes/             # API routes
│   ├── auth.js         # Authentication routes
│   └── students.js     # Student routes
├── controllers/        # Business logic
│   ├── authController.js
│   └── studentController.js
├── middleware/         # Custom middleware
│   └── auth.js        # Authentication middleware
├── utils/             # Utility functions
│   └── emailService.js # Email sending service
├── server.js          # Main server file
├── .env               # Environment variables
├── .gitignore         # Git ignore file
└── package.json       # Dependencies
```

## 🔌 API Endpoints

### Authentication

**Register User**
```
POST /api/auth/register
Content-Type: application/json

{
  "name": "John Doe",
  "rollNumber": "CSE001",
  "email": "john@example.com",
  "password": "password123",
  "confirmPassword": "password123"
}

Response: 201 Created
{
  "success": true,
  "message": "User registered. Please verify your email with OTP",
  "userId": "user_id"
}
```

**Verify OTP**
```
POST /api/auth/verify-otp
Content-Type: application/json

{
  "userId": "user_id",
  "otp": "123456"
}

Response: 200 OK
{
  "success": true,
  "message": "Email verified successfully",
  "token": "jwt_token",
  "user": {
    "id": "user_id",
    "name": "John Doe",
    "email": "john@example.com",
    "rollNumber": "CSE001"
  }
}
```

**Resend OTP**
```
POST /api/auth/resend-otp
Content-Type: application/json

{
  "userId": "user_id"
}

Response: 200 OK
{
  "success": true,
  "message": "OTP sent successfully"
}
```

**Login**
```
POST /api/auth/login
Content-Type: application/json

{
  "identifier": "john@example.com",  // or "CSE001"
  "password": "password123"
}

Response: 200 OK
{
  "success": true,
  "message": "Login successful",
  "token": "jwt_token",
  "user": {
    "id": "user_id",
    "name": "John Doe",
    "email": "john@example.com",
    "rollNumber": "CSE001",
    "role": "student"
  }
}
```

**Forgot Password**
```
POST /api/auth/forgot-password
Content-Type: application/json

{
  "email": "john@example.com"
}

Response: 200 OK
{
  "success": true,
  "message": "Password reset OTP sent",
  "userId": "user_id"
}
```

**Reset Password**
```
POST /api/auth/reset-password
Content-Type: application/json

{
  "userId": "user_id",
  "otp": "123456",
  "newPassword": "newpassword123",
  "confirmPassword": "newpassword123"
}

Response: 200 OK
{
  "success": true,
  "message": "Password reset successfully"
}
```

**Get Current User**
```
GET /api/auth/me
Authorization: Bearer jwt_token

Response: 200 OK
{
  "success": true,
  "user": {
    "_id": "user_id",
    "name": "John Doe",
    "rollNumber": "CSE001",
    "email": "john@example.com",
    "isVerified": true,
    "role": "student",
    "createdAt": "2026-02-22T...",
    "updatedAt": "2026-02-22T..."
  }
}
```

**Update Profile**
```
PUT /api/auth/update-profile
Authorization: Bearer jwt_token
Content-Type: application/json

{
  "name": "John Updated",
  "branch": "CSE",
  "semester": 4
}

Response: 200 OK
{
  "success": true,
  "message": "Profile updated successfully",
  "user": { ... }
}
```

**Change Password**
```
PUT /api/auth/change-password
Authorization: Bearer jwt_token
Content-Type: application/json

{
  "currentPassword": "password123",
  "newPassword": "newpassword123",
  "confirmPassword": "newpassword123"
}

Response: 200 OK
{
  "success": true,
  "message": "Password changed successfully"
}
```

### Students

**Get All Students**
```
GET /api/students?page=1&limit=10&search=john&branch=CSE
Authorization: Bearer jwt_token

Response: 200 OK
{
  "success": true,
  "count": 1,
  "total": 10,
  "pages": 1,
  "currentPage": 1,
  "students": [
    {
      "_id": "student_id",
      "name": "John Doe",
      "rollNumber": "CSE001",
      "email": "john@example.com",
      "isVerified": true,
      "role": "student",
      "branch": "CSE",
      "semester": 4
    }
  ]
}
```

**Get Single Student**
```
GET /api/students/:id
Authorization: Bearer jwt_token

Response: 200 OK
{
  "success": true,
  "student": { ... }
}
```

**Update Student**
```
PUT /api/students/:id
Authorization: Bearer jwt_token
Content-Type: application/json

{
  "name": "Updated Name",
  "branch": "CSE",
  "semester": 5
}

Response: 200 OK
{
  "success": true,
  "message": "Student updated successfully",
  "student": { ... }
}
```

**Delete Student**
```
DELETE /api/students/:id
Authorization: Bearer jwt_token

Response: 200 OK
{
  "success": true,
  "message": "Student deleted successfully"
}
```

**Get Dashboard Stats**
```
GET /api/students/stats/dashboard
Authorization: Bearer jwt_token

Response: 200 OK
{
  "success": true,
  "stats": {
    "totalStudents": 100,
    "verifiedStudents": 95,
    "completionPercentage": 75
  }
}
```

## 🔐 Authentication

All protected routes require a JWT token in the Authorization header:

```
Authorization: Bearer <your_jwt_token>
```

## 🗄️ Database Models

### User Model
```javascript
{
  name: String (required),
  rollNumber: String (unique, required),
  email: String (unique, required),
  password: String (required, hashed),
  isVerified: Boolean (default: false),
  role: String (enum: ['student', 'admin'], default: 'student'),
  avatar: String,
  branch: String,
  semester: Number,
  createdAt: Date,
  updatedAt: Date
}
```

### OTP Model
```javascript
{
  userId: ObjectId (ref: User),
  otp: String (required),
  purpose: String (enum: ['verification', 'password-reset']),
  expiresAt: Date (default: +10 minutes),
  isUsed: Boolean (default: false),
  createdAt: Date,
  updatedAt: Date
}
```

## ⚙️ Configuration

### CORS
CORS is enabled for `FRONTEND_URL` specified in `.env`

### Middleware
- `express.json()` - Parse JSON requests
- `express.urlencoded()` - Parse URL-encoded requests
- `cors()` - Enable CORS
- Custom auth middleware for protected routes

### Error Handling
- Try-catch blocks in all async operations
- Custom error responses
- Proper HTTP status codes

## 🧪 Testing

### Test Registration
```bash
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test User",
    "rollNumber": "TEST001",
    "email": "test@example.com",
    "password": "password123",
    "confirmPassword": "password123"
  }'
```

### Test Login
```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "identifier": "test@example.com",
    "password": "password123"
  }'
```

## 🚀 Production Deployment

### Render.com
1. Push code to GitHub
2. Create new Web Service on Render
3. Connect to repository
4. Set environment variables
5. Deploy

### Environment Variables (Production)
Make sure to set secure values for:
- `JWT_SECRET` - Long random string
- `EMAIL_USER` & `EMAIL_PASSWORD` - Gmail app password
- `MONGODB_URI` - Production MongoDB connection string

## 📝 Scripts

```json
{
  "start": "node server.js",
  "dev": "nodemon server.js"
}
```

- `npm start` - Run production server
- `npm run dev` - Run development server with auto-reload

## 🐛 Common Issues

### Port Already in Use
```bash
# Change in .env
PORT=5001
```

### MongoDB Connection Failed
- Check MongoDB is running
- Check connection string in .env
- Check network access if using MongoDB Atlas

### Email Not Sending
- Use [Gmail App Password](https://myaccount.google.com/apppasswords)
- Not your regular Gmail password
- Check credentials in .env

## 📞 Support

For issues and questions, please create an issue on the GitHub repository.

