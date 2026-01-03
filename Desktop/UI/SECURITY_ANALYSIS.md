# Phân Tích Bảo Mật & Credentials Hardcoded

## 🔴 CRITICAL: Credentials Hardcoded Trong Code

### 1. Database Credentials
**File:** `backend/config/database.js`
```javascript
host: process.env.DB_HOST || '103.97.126.78',
user: process.env.DB_USER || 'eproject_2',
password: process.env.DB_PASSWORD || 'your_database_password',  // ⚠️ EXPOSED (example)
database: process.env.DB_NAME || 'eproject_2',
```

**Risk Level:** 🔴 **CRITICAL**
- Database password exposed
- Database host IP exposed
- Có thể bị truy cập trực tiếp vào database

### 2. Email Credentials (Gmail)
**File:** `backend/services/emailService.js`
```javascript
DEFAULT_SMTP_USER = 'ducnha1554@gmail.com',  // ⚠️ EXPOSED
DEFAULT_SMTP_PASS = 'your_smtp_app_password',     // ⚠️ EXPOSED (example)
```

**Risk Level:** 🔴 **CRITICAL**
- Gmail account có thể bị compromised
- Có thể gửi email giả mạo
- Có thể truy cập Gmail account

### 3. Twilio Credentials
**File:** `backend/services/smsService.js`
```javascript
DEFAULT_ACCOUNT_SID = 'your_twilio_account_sid',  // ⚠️ EXPOSED (example)
DEFAULT_AUTH_TOKEN = 'your_twilio_auth_token',      // ⚠️ EXPOSED (example)
DEFAULT_TWILIO_PHONE = '+1234567890',
```

**Risk Level:** 🔴 **CRITICAL**
- Twilio account có thể bị lạm dụng
- Có thể gửi SMS giả mạo
- Có thể tốn phí Twilio account

### 4. VNPay Credentials
**File:** `backend/services/vnpayService.js`
```javascript
VNPAY_TMN_CODE = 'SO3GSJQG',                              // ⚠️ EXPOSED
VNPAY_HASH_SECRET = 'ZKUNPZCP7S0FPKZRLF30ZA7WA4CZ15UP',   // ⚠️ EXPOSED
```

**Risk Level:** 🟠 **HIGH**
- Có thể tạo payment URLs giả mạo
- Có thể verify callbacks giả
- Có thể bị lạm dụng payment gateway

### 5. JWT Secret
**File:** `backend/config/jwt.js`
```javascript
JWT_SECRET = 'smartclub-secret-key-change-in-production',  // ⚠️ EXPOSED
```

**Risk Level:** 🔴 **CRITICAL**
- Có thể tạo JWT tokens giả
- Có thể bypass authentication
- Có thể truy cập tất cả user accounts

## 📊 Tổng Hợp Credentials Cần Bảo Vệ

| Service | Credential | Location | Risk | Action Required |
|---------|-----------|----------|------|-----------------|
| Database | Password | `config/database.js:7` | 🔴 Critical | Remove immediately |
| Database | Host IP | `config/database.js:4` | 🟠 High | Use env var |
| Gmail | Email | `services/emailService.js:10` | 🔴 Critical | Remove immediately |
| Gmail | App Password | `services/emailService.js:11` | 🔴 Critical | Remove immediately |
| Twilio | Account SID | `services/smsService.js:8` | 🔴 Critical | Remove immediately |
| Twilio | Auth Token | `services/smsService.js:9` | 🔴 Critical | Remove immediately |
| VNPay | TMN Code | `services/vnpayService.js:7` | 🟠 High | Use env var |
| VNPay | Hash Secret | `services/vnpayService.js:8` | 🟠 High | Use env var |
| JWT | Secret Key | `config/jwt.js:3` | 🔴 Critical | Remove immediately |

## ⚠️ Hành Động Khẩn Cấp

### Ngay Lập Tức:
1. **ROTATE TẤT CẢ CREDENTIALS** - Đổi tất cả passwords/keys đã bị expose
2. **Remove hardcoded values** - Xóa tất cả default credentials
3. **Check Git history** - Nếu đã commit, cần xóa khỏi history
4. **Monitor accounts** - Kiểm tra logs cho suspicious activity

### Trước Khi Deploy:
1. Tất cả credentials phải ở environment variables
2. Không có default values cho sensitive data
3. Validate env vars khi start server
4. Sử dụng `.gitignore` cho `.env` files


