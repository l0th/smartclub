# Hướng Dẫn Deploy Heroku - Các Bước Tiếp Theo

## ✅ Bước 1: Đã Hoàn Thành
- [x] Login Heroku CLI thành công (`ducnha1554@gmail.com`)

## 📋 Các Bước Tiếp Theo

### Bước 2: Tạo Heroku App

Chạy lệnh sau trong terminal (đang ở thư mục `C:\Users\Admin\Desktop\UI`):

```bash
heroku create smartclub-app
```

**Lưu ý:**
- Tên app phải unique (có thể thử: `smartclub-app`, `smartclub-web`, `smartclub-api`, etc.)
- Heroku sẽ tự động tạo Git remote
- Bạn sẽ nhận được URL: `https://smartclub-app.herokuapp.com`

**Nếu tên đã tồn tại, thử tên khác:**
```bash
heroku create smartclub-2024
# hoặc
heroku create your-unique-app-name
```

---

### Bước 3: Kiểm Tra Git Repository

Kiểm tra xem đã có Git repository chưa:

```bash
git status
```

**Nếu chưa có Git:**
```bash
git init
git add .
git commit -m "Initial commit for Heroku deployment"
```

**Nếu đã có Git:**
- Đảm bảo đã commit tất cả thay đổi
- Kiểm tra `.gitignore` đã có (để không commit `.env` files)

---

### Bước 4: Tạo Procfile

Tạo file `Procfile` (không có extension) ở thư mục **root** của project (`C:\Users\Admin\Desktop\UI\Procfile`):

**Nội dung Procfile:**
```
web: cd backend && node server.js
```

**Hoặc nếu muốn chạy từ root:**
```
web: node backend/server.js
```

**Lưu ý:**
- Heroku sẽ tự động detect `package.json` trong `backend/` folder
- Cần đảm bảo `package.json` có script `"start": "node server.js"`

---

### Bước 5: Tạo/Update .gitignore

Tạo file `.gitignore` ở **root** của project (nếu chưa có):

```
# Environment variables
.env
.env.local
.env.production
.env.development
heroku-env.txt

# Node modules
node_modules/
backend/node_modules/
smartclub-socket/node_modules/

# Logs
*.log
npm-debug.log*

# Uploads (files sẽ mất trên Heroku vì ephemeral filesystem)
uploads/
backend/uploads/

# OS files
.DS_Store
Thumbs.db

# IDE
.vscode/
.idea/
*.swp
*.swo

# Heroku
.heroku/
```

---

### Bước 6: Set Environment Variables

Set tất cả environment variables trên Heroku. **QUAN TRỌNG:** Thay các giá trị sau bằng giá trị thực của bạn:

```bash
# Database
heroku config:set DB_HOST=103.97.126.78
heroku config:set DB_PORT=3306
heroku config:set DB_USER=eproject_2
heroku config:set DB_PASSWORD=your_database_password
heroku config:set DB_NAME=eproject_2

# JWT
heroku config:set JWT_SECRET=your-secure-random-secret-key-here
heroku config:set JWT_EXPIRES_IN=24h

# VNPay
heroku config:set VNPAY_TMN_CODE=SO3GSJQG
heroku config:set VNPAY_HASH_SECRET=ZKUNPZCP7S0FPKZRLF30ZA7WA4CZ15UP
heroku config:set VNPAY_URL=https://sandbox.vnpayment.vn/paymentv2/vpcpay.html
# Lưu ý: Set VNPAY_RETURN_URL sau khi biết Heroku app URL
heroku config:set VNPAY_RETURN_URL=https://smartclub-app.herokuapp.com

# Email
heroku config:set SMTP_HOST=smtp.gmail.com
heroku config:set SMTP_PORT=587
heroku config:set SMTP_USER=ducnha1554@gmail.com
heroku config:set SMTP_PASS=your_smtp_app_password

# SMS (Twilio)
heroku config:set TWILIO_ACCOUNT_SID=your_twilio_account_sid
heroku config:set TWILIO_AUTH_TOKEN=your_twilio_auth_token
heroku config:set TWILIO_PHONE_NUMBER=+1234567890

# Server
heroku config:set ENABLE_TUNNEL=false
heroku config:set PORT=8080
```

**Lưu ý quan trọng:**
- ⚠️ **ROTATE CREDENTIALS** - Đổi tất cả passwords/keys sau khi deploy thành công
- Thay `your-secure-random-secret-key-here` bằng một chuỗi ngẫu nhiên mạnh
- Update `VNPAY_RETURN_URL` với URL thực của Heroku app (sau khi tạo app)

**Kiểm tra env vars đã set:**
```bash
heroku config
```

---

### Bước 7: Fix API URL trong Frontend (QUAN TRỌNG)

File `js/api.js` đang hardcode `http://localhost:8080/api`. Cần fix để dùng dynamic URL.

**Cách 1: Dùng relative path (khuyến nghị)**
```javascript
// Thay dòng:
const API_BASE_URL = 'http://localhost:8080/api';

// Bằng:
const API_BASE_URL = '/api';
```

**Cách 2: Dùng environment detection**
```javascript
const API_BASE_URL = window.location.origin + '/api';
```

**Cách 3: Dùng Heroku config var (phức tạp hơn)**
- Set `API_URL` trên Heroku
- Inject vào HTML khi serve

---

### Bước 8: Deploy Code

Sau khi đã:
- ✅ Tạo Heroku app
- ✅ Setup Git
- ✅ Tạo Procfile
- ✅ Set environment variables
- ✅ Fix API URL

Deploy code:

```bash
# Kiểm tra Heroku remote đã được thêm
git remote -v

# Deploy
git push heroku main

# Hoặc nếu branch là master
git push heroku master
```

**Quá trình deploy sẽ:**
1. Heroku nhận code
2. Detect Node.js
3. Install dependencies từ `backend/package.json`
4. Chạy `Procfile` command
5. Start app

---

### Bước 9: Kiểm Tra Logs

Sau khi deploy, kiểm tra logs:

```bash
heroku logs --tail
```

**Tìm kiếm:**
- ✅ `REST API server running`
- ✅ `Socket.IO server integrated`
- ❌ Lỗi database connection
- ❌ Lỗi missing environment variables

---

### Bước 10: Test App

**Mở app:**
```bash
heroku open
```

**Hoặc truy cập:**
```
https://smartclub-app.herokuapp.com
```

**Test các endpoints:**
- Health check: `https://smartclub-app.herokuapp.com/api/health`
- Login page: `https://smartclub-app.herokuapp.com/index.html`

---

## 🔧 Troubleshooting

### Lỗi: "No Procfile found"
- Đảm bảo `Procfile` ở root directory
- Không có extension (không phải `Procfile.txt`)

### Lỗi: "Module not found"
- Kiểm tra `package.json` có đầy đủ dependencies
- Heroku tự động chạy `npm install` trong `backend/` folder

### Lỗi: "Database connection failed"
- Kiểm tra database IP có whitelist Heroku IPs không
- Kiểm tra env vars đã set đúng chưa: `heroku config`

### Lỗi: "Port already in use"
- Heroku tự động set `PORT` env var
- Code đã dùng `process.env.PORT || 8080` → OK

### App không start
- Xem logs: `heroku logs --tail`
- Kiểm tra Procfile command đúng chưa
- Kiểm tra `package.json` có script `start` chưa

---

## 📝 Checklist Trước Khi Deploy

- [ ] Đã login Heroku CLI
- [ ] Đã tạo Heroku app
- [ ] Đã setup Git repository
- [ ] Đã tạo Procfile
- [ ] Đã tạo/update .gitignore
- [ ] Đã set tất cả environment variables
- [ ] Đã fix API URL trong frontend
- [ ] Đã commit tất cả changes
- [ ] Sẵn sàng deploy

---

## 🎯 Kết Quả Mong Đợi

Sau khi hoàn thành tất cả bước:

1. ✅ App chạy trên Heroku URL
2. ✅ API endpoints hoạt động
3. ✅ Socket.IO hoạt động
4. ✅ Frontend có thể kết nối API
5. ✅ Database connection thành công
6. ✅ Email/SMS services hoạt động (nếu env vars đúng)
7. ✅ VNPay có thể hoạt động (với VNPAY_RETURN_URL đúng)

---

## ⚠️ Lưu Ý Bảo Mật

**SAU KHI DEPLOY THÀNH CÔNG:**

1. **ROTATE TẤT CẢ CREDENTIALS:**
   - Đổi database password
   - Đổi Gmail app password
   - Đổi Twilio credentials
   - Đổi JWT secret
   - Đổi VNPay secrets

2. **Remove hardcoded credentials từ code:**
   - Xóa default values trong code
   - Chỉ dùng environment variables

3. **Monitor logs:**
   - Kiểm tra logs thường xuyên
   - Tìm suspicious activity

---

## 🚀 Bước Tiếp Theo Ngay

**Chạy lệnh này để bắt đầu:**
```bash
heroku create smartclub-app
```

Sau đó tiếp tục với các bước trên!


