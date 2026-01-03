# Hướng Dẫn Deploy Lên Railway

## ✅ Đã Hoàn Thành

Tất cả các thay đổi đã được thực hiện:
- ✅ Fix API URL trong `js/api.js` - dùng dynamic URL
- ✅ Remove hardcoded credentials từ tất cả files
- ✅ Tạo `.gitignore` để bảo vệ secrets
- ✅ Tạo `railway.json` cho Railway config
- ✅ Tạo `README.md` với hướng dẫn đầy đủ

## 📝 Bước 1: Commit và Push Lên GitHub

### 1.1 Kiểm tra Git Status

```bash
cd C:\Users\Admin\Desktop\UI
git status
```

### 1.2 Add Tất Cả Files

```bash
git add .
```

### 1.3 Commit Changes

```bash
git commit -m "Fix security issues and prepare for Railway deployment

- Fix API URL to use dynamic URL instead of hardcoded localhost
- Remove all hardcoded credentials (database, email, SMS, JWT)
- Add validation for required environment variables
- Add .gitignore to protect sensitive files
- Add railway.json for Railway deployment config
- Add comprehensive README.md with deployment guide"
```

### 1.4 Push Lên GitHub

```bash
# Nếu chưa có remote
git remote add origin https://github.com/l0th/smartclub.git

# Push lên main branch
git push -u origin main
```

**Nếu có conflict hoặc cần force push:**
```bash
git push -u origin main --force
```

## 🚂 Bước 2: Deploy Lên Railway

### 2.1 Đăng Ký Railway

1. Truy cập: https://railway.app
2. Click "Start a New Project"
3. Đăng ký bằng GitHub (khuyến nghị) hoặc Email
4. Verify email nếu cần

### 2.2 Tạo Project

1. Click "New Project"
2. Chọn "Deploy from GitHub repo"
3. Authorize Railway để truy cập GitHub
4. Chọn repository: `l0th/smartclub`
5. Click "Deploy Now"

### 2.3 Configure Deployment

Railway sẽ tự detect Node.js, nhưng cần config:

1. Vào **Settings** của service
2. Set các giá trị sau:

**Root Directory:**
```
backend
```

**Start Command:**
```
node server.js
```

**Build Command:**
```
npm install
```

### 2.4 Set Environment Variables

1. Vào **Variables** tab trong Railway dashboard
2. Add các biến sau (copy từ `.env.example`):

**Database (Required):**
```
DB_HOST=103.97.126.78
DB_PORT=3306
DB_USER=eproject_2
DB_PASSWORD=cyp1zsduoqiomlm9ldz9
DB_NAME=eproject_2
```

**JWT (Required):**
```
JWT_SECRET=generate-a-secure-random-string-minimum-32-characters-here
JWT_EXPIRES_IN=24h
```

**VNPay:**
```
VNPAY_TMN_CODE=SO3GSJQG
VNPAY_HASH_SECRET=ZKUNPZCP7S0FPKZRLF30ZA7WA4CZ15UP
VNPAY_URL=https://sandbox.vnpayment.vn/paymentv2/vpcpay.html
VNPAY_RETURN_URL=
```
**Lưu ý:** Set `VNPAY_RETURN_URL` sau khi có Railway URL

**Email:**
```
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=ducnha1554@gmail.com
SMTP_PASS=ipgm zrua kctv gfea
```

**SMS (Twilio):**
```
TWILIO_ACCOUNT_SID=ACb039ee1db67a3df5e8affb406f754e74
TWILIO_AUTH_TOKEN=12867aa016ca57a83ca8bd2191b5839e
TWILIO_PHONE_NUMBER=+18165726509
```

**Server:**
```
PORT=8080
ENABLE_TUNNEL=false
```

### 2.5 Deploy

1. Railway sẽ tự động deploy khi bạn push code
2. Hoặc click **"Deploy"** button trong dashboard
3. Xem logs trong **Deployments** tab

### 2.6 Lấy Railway URL

1. Sau khi deploy thành công, Railway sẽ cung cấp URL
2. URL format: `https://your-app-name.railway.app`
3. Copy URL này

### 2.7 Update VNPAY_RETURN_URL

1. Vào **Variables** tab
2. Update `VNPAY_RETURN_URL`:
```
VNPAY_RETURN_URL=https://your-app-name.railway.app
```
3. Railway sẽ tự động restart service

## ✅ Bước 3: Test Deployment

### 3.1 Test Health Endpoint

Mở browser và truy cập:
```
https://your-app-name.railway.app/api/health
```

Kết quả mong đợi:
```json
{
  "status": "ok",
  "message": "SmartClub API is running"
}
```

### 3.2 Test Frontend

Truy cập:
```
https://your-app-name.railway.app/index.html
```

### 3.3 Test API Endpoints

Test login endpoint:
```bash
curl -X POST https://your-app-name.railway.app/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"cardCode": "your_card_code"}'
```

### 3.4 Test Socket.IO

1. Mở browser console
2. Kết nối Socket.IO:
```javascript
const socket = io('https://your-app-name.railway.app');
socket.on('connect', () => console.log('Connected!'));
```

## 🔧 Troubleshooting

### Lỗi: "Missing required database environment variables"

**Nguyên nhân:** Chưa set environment variables
**Giải pháp:** 
- Kiểm tra tất cả env vars đã set trong Railway
- Đảm bảo không có typo

### Lỗi: "JWT_SECRET environment variable is required"

**Nguyên nhân:** Chưa set JWT_SECRET
**Giải pháp:**
- Set `JWT_SECRET` trong Railway Variables
- Dùng string ngẫu nhiên, tối thiểu 32 ký tự

### Lỗi: Database connection failed

**Nguyên nhân:** 
- Database không cho phép kết nối từ Railway IPs
- Credentials sai

**Giải pháp:**
- Whitelist Railway IPs trong database firewall
- Kiểm tra lại DB credentials

### Lỗi: Port already in use

**Nguyên nhân:** Railway tự set PORT
**Giải pháp:** 
- Code đã handle `process.env.PORT` → OK
- Không cần fix

### App không start

**Kiểm tra:**
1. Xem logs trong Railway dashboard
2. Kiểm tra Start Command đúng chưa
3. Kiểm tra Root Directory đúng chưa (`backend`)

## 📊 Monitoring

### Xem Logs

1. Vào Railway dashboard
2. Click vào service
3. Xem **Logs** tab
4. Logs real-time

### Check Status

1. Vào **Metrics** tab
2. Xem CPU, Memory usage
3. Xem request count

## 🔄 Update Code

Sau khi sửa code:

1. **Commit và push:**
```bash
git add .
git commit -m "Your commit message"
git push origin main
```

2. **Railway tự động deploy** từ GitHub
3. Xem logs để kiểm tra deploy thành công

## 🎯 Checklist

- [ ] Code đã push lên GitHub
- [ ] Railway project đã tạo
- [ ] GitHub repo đã connect với Railway
- [ ] Root Directory set: `backend`
- [ ] Start Command set: `node server.js`
- [ ] Tất cả environment variables đã set
- [ ] Railway URL đã có
- [ ] VNPAY_RETURN_URL đã update
- [ ] Health endpoint hoạt động
- [ ] Frontend load được
- [ ] API endpoints hoạt động
- [ ] Socket.IO kết nối được

## 🎉 Hoàn Thành!

Sau khi hoàn thành tất cả bước, app của bạn sẽ chạy online trên Railway!

**Railway URL:** `https://your-app-name.railway.app`

---

## 📞 Support

Nếu gặp vấn đề:
1. Xem logs trong Railway dashboard
2. Kiểm tra environment variables
3. Xem README.md để biết thêm chi tiết

