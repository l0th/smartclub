# SmartClub Web Application

SmartClub là ứng dụng web quản lý thành viên với các tính năng:
- Đăng nhập bằng mã thẻ hoặc tài khoản
- Quản lý thông tin thành viên
- Lịch sử truy cập
- Gia hạn gói dịch vụ
- Chat real-time với Socket.IO
- Quên thẻ/mật khẩu
- Hệ thống điểm thưởng
- Thanh toán VNPay

## 🚀 Quick Start

### Local Development

1. **Clone repository:**
```bash
git clone https://github.com/l0th/smartclub.git
cd smartclub
```

2. **Install dependencies:**
```bash
cd backend
npm install
```

3. **Setup environment variables:**
```bash
# Copy .env.example to .env
cp ../.env.example ../.env

# Edit .env with your credentials
# Required: DB_HOST, DB_USER, DB_PASSWORD, DB_NAME, JWT_SECRET
```

4. **Start server:**
```bash
npm start
# or for development with auto-reload
npm run dev
```

5. **Open browser:**
```
http://localhost:8080
```

## 📋 Environment Variables

Xem `.env.example` để biết tất cả các biến môi trường cần thiết.

**Required:**
- `DB_HOST` - Database host
- `DB_USER` - Database user
- `DB_PASSWORD` - Database password
- `DB_NAME` - Database name
- `JWT_SECRET` - Secret key for JWT tokens (minimum 32 characters)

**Optional:**
- `SMTP_USER`, `SMTP_PASS` - For email functionality
- `TWILIO_ACCOUNT_SID`, `TWILIO_AUTH_TOKEN` - For SMS functionality
- `VNPAY_TMN_CODE`, `VNPAY_HASH_SECRET` - For payment functionality

## 🚂 Deploy to Railway

### Method 1: Deploy from GitHub (Recommended)

1. **Push code to GitHub:**
```bash
git add .
git commit -m "Prepare for Railway deployment"
git push origin main
```

2. **Setup Railway:**
   - Đăng ký tại [Railway.app](https://railway.app)
   - Tạo New Project
   - Chọn "Deploy from GitHub repo"
   - Chọn repository `l0th/smartclub`

3. **Configure Railway:**
   - **Root Directory:** `backend`
   - **Start Command:** `node server.js`
   - **Build Command:** `npm install`

4. **Set Environment Variables:**
   - Vào Railway Dashboard → Project → Service → Variables
   - Add tất cả variables từ `.env.example`
   - **QUAN TRỌNG:** Set `VNPAY_RETURN_URL` sau khi có Railway URL:
     ```
     VNPAY_RETURN_URL=https://your-app.railway.app
     ```

5. **Deploy:**
   - Railway tự động deploy khi push code lên GitHub
   - Hoặc click "Deploy" trong Railway dashboard

### Method 2: Deploy using Railway CLI

1. **Install Railway CLI:**
```bash
npm i -g @railway/cli
```

2. **Login:**
```bash
railway login
```

3. **Initialize project:**
```bash
railway init
```

4. **Link to existing project:**
```bash
railway link
```

5. **Set environment variables:**
```bash
railway variables set DB_HOST=your_host
railway variables set DB_USER=your_user
# ... set all other variables
```

6. **Deploy:**
```bash
railway up
```

## 📁 Project Structure

```
smartclub/
├── backend/              # Node.js/Express backend
│   ├── config/          # Database & JWT configuration
│   ├── routes/          # API routes
│   ├── services/        # Business logic services
│   ├── server.js        # Main server file
│   └── package.json     # Dependencies
├── js/                  # Frontend JavaScript
├── css/                 # Frontend styles
├── *.html              # Frontend pages
├── .env.example        # Environment variables template
├── .gitignore          # Git ignore rules
├── railway.json        # Railway deployment config
└── README.md           # This file
```

## 🔧 API Endpoints

### Authentication
- `POST /api/auth/login` - Login with card code or username/password
- `POST /api/auth/logout` - Logout
- `GET /api/auth/me` - Get current user info

### Member
- `GET /api/member/profile` - Get member profile
- `GET /api/member/card` - Get card information
- `GET /api/member/package` - Get package information
- `GET /api/member/points` - Get member points
- `GET /api/member/points/history` - Get points history

### History
- `GET /api/member/history` - Get access history with pagination

### Renewal
- `GET /api/member/renewal/plans` - Get all available plans
- `POST /api/member/renewal/request` - Submit renewal request
- `POST /api/member/renewal/vnpay/create` - Create VNPay payment

### Chat
- `GET /api/chat/messages` - Get chat history
- `POST /api/chat/messages` - Save message
- `GET /api/chat/receptionist` - Get receptionist username

### Payment
- `GET /api/payment/vnpay/config` - Get VNPay configuration
- `GET /api/payment/vnpay/status/:paymentId` - Check payment status
- `POST /api/payment/vnpay/confirm` - Confirm VNPay payment

### Health Check
- `GET /api/health` - Server health check

## 🔌 Socket.IO Events

### Client → Server
- `identify` - Register user with username
- `private_message` - Send private message

### Server → Client
- `private_message` - Receive private message
- `message_sent` - Confirm message sent
- `message_error` - Error sending message

## 🛡️ Security Notes

- **Never commit `.env` file** - Use `.env.example` as template
- **Rotate credentials** after deployment
- **Use strong JWT_SECRET** - Minimum 32 characters, random
- **Keep database credentials secure**
- **Use HTTPS in production**

## 📝 License

ISC

## 👥 Contributors

- l0th

## 🔗 Links

- GitHub: https://github.com/l0th/smartclub
- Railway: https://railway.app

