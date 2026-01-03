# Luồng Dữ Liệu & Tóm Tắt Deploy

## 🔄 Luồng Dữ Liệu Hiện Tại

### REST API Flow
```
Client Browser (HTML/JS)
  ↓
  fetch('http://localhost:8080/api/...')
  ↓
Express Server (backend/server.js)
  ↓
Route Handler (routes/*.js)
  ↓
Service Layer (services/*.js)
  ↓
Database (MySQL - 103.97.126.78:3306)
  ↓
Response JSON
  ↓
Client Browser
```

### Socket.IO Flow
```
Client Browser
  ↓
Socket.IO Connection (ws://localhost:8080)
  ↓
Socket.IO Server (integrated in server.js)
  ↓
Event Handler ('private_message', 'identify')
  ↓
Chat Service (services/chatService.js)
  ↓
File Service (services/fileService.js) → uploads/ directory
  ↓
Database (MySQL - chat_history table)
  ↓
Emit to target socket
  ↓
Client Browser (receiver)
```

### File Upload Flow
```
Client (Base64 file data)
  ↓
Socket.IO 'private_message' event
  ↓
fileService.saveChatFile()
  ↓
Local Filesystem: uploads/chat/images/ hoặc uploads/chat/files/
  ↓
Return file path
  ↓
Save to database (chat_history.file_path)
```

### VNPay Payment Flow
```
Client → POST /api/member/renewal/vnpay/create
  ↓
vnpayService.createPaymentUrl()
  ↓
Tunnel Service (localtunnel) → Public URL
  ↓
VNPay Gateway (sandbox.vnpayment.vn)
  ↓
Callback → /payment-callback.html
  ↓
IPN → /api/payment/vnpay/ipn
  ↓
Update payment status in database
```

## 📊 Tóm Tắt Architecture

### Components
1. **Frontend**: Static HTML/CSS/JS files
2. **Backend API**: Express REST API
3. **Socket.IO**: Real-time chat
4. **Database**: MySQL (external)
5. **File Storage**: Local filesystem (uploads/)
6. **External Services**: VNPay, Email (SMTP), SMS (Twilio)

### Dependencies
- **Runtime**: Node.js
- **Framework**: Express.js
- **Real-time**: Socket.IO
- **Database**: MySQL2
- **Auth**: JWT
- **Tunnel**: localtunnel (development only)

## 🚀 Luồng Deploy (Heroku)

### Pre-Deploy
```
Code Changes
  ↓
Fix API URL (js/api.js)
  ↓
Remove hardcoded credentials
  ↓
Setup file storage (S3/Cloudinary)
  ↓
Update fileService.js
  ↓
Create Procfile
  ↓
Test locally
```

### Deploy Process
```
Git Repository
  ↓
Heroku CLI: heroku create
  ↓
Set Environment Variables
  ↓
git push heroku main
  ↓
Heroku Build Process
  ↓
npm install
  ↓
Start: node server.js
  ↓
App Running on Heroku URL
```

### Post-Deploy
```
Update VNPAY_RETURN_URL
  ↓
Test API endpoints
  ↓
Test Socket.IO connection
  ↓
Test file uploads
  ↓
Test payment flow
  ↓
Monitor logs
```

## ⚠️ Vấn Đề Cần Giải Quyết

### Critical Issues
1. **API URL Hardcoded** → Fix: Dynamic URL
2. **File Storage Local** → Fix: Cloud Storage
3. **Tunnel Service** → Fix: Use platform URL
4. **Hardcoded Credentials** → Fix: Environment Variables

### Medium Priority
1. **CORS Wildcard** → Fix: Specific origins
2. **Error Messages** → Fix: Production-safe errors
3. **Database Access** → Fix: Whitelist IPs

## 📝 Environment Variables Checklist

```env
# Database
DB_HOST=
DB_PORT=3306
DB_USER=
DB_PASSWORD=
DB_NAME=

# JWT
JWT_SECRET=
JWT_EXPIRES_IN=24h

# Server
PORT=8080
ENABLE_TUNNEL=false

# VNPay
VNPAY_TMN_CODE=
VNPAY_HASH_SECRET=
VNPAY_URL=
VNPAY_RETURN_URL=

# Email
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=
SMTP_PASS=

# SMS
TWILIO_ACCOUNT_SID=
TWILIO_AUTH_TOKEN=
TWILIO_PHONE_NUMBER=

# File Storage (if using S3)
AWS_ACCESS_KEY_ID=
AWS_SECRET_ACCESS_KEY=
AWS_REGION=
S3_BUCKET_NAME=
```

## 🎯 Next Steps Summary

**A → B → C → D**

1. **A: Code Preparation**
   - Fix API URL
   - Remove hardcoded values
   - Setup env vars structure

2. **B: File Storage Migration**
   - Choose provider (S3/Cloudinary)
   - Update fileService.js
   - Test uploads

3. **C: Platform Setup**
   - Create Heroku/Railway account
   - Setup database access
   - Configure env vars

4. **D: Deploy & Test**
   - Deploy to platform
   - Test all features
   - Monitor and fix issues


