# Fix Lỗi Railway Deploy

## 🔍 Vấn Đề

Railway không thể detect code vì:
- Files đang ở trong `Desktop/UI/backend/` thay vì `backend/`
- Railway tìm files ở root nhưng không thấy

## ✅ Giải Pháp

### Option 1: Dùng Branch main-fixed (Đã Fix)

Branch `main-fixed` đã được tạo với cấu trúc đúng:
- Files ở root: `backend/`, `js/`, `css/`, etc.
- Không có `Desktop/UI/` prefix

**Cách dùng:**
1. Vào Railway Dashboard
2. Chọn branch: `main-fixed`
3. Set Root Directory: `.` (root)
4. Set Start Command: `node backend/server.js`
5. Set Build Command: `npm install` (trong backend folder)

### Option 2: Config Railway với Path Hiện Tại

Nếu muốn dùng branch `main` hiện tại:

1. Vào Railway Dashboard → Service → Settings
2. Set **Root Directory**: `Desktop/UI`
3. Set **Start Command**: `node backend/server.js`
4. Set **Build Command**: `cd backend && npm install`

### Option 3: Tạo nixpacks.toml

Tạo file `nixpacks.toml` ở root:

```toml
[phases.setup]
nixPkgs = ["nodejs-18_x"]

[phases.install]
cmds = ["cd backend && npm install"]

[start]
cmd = "cd backend && node server.js"
```

## 🚀 Quick Fix

**Dùng branch main-fixed:**
1. Railway Dashboard → Settings
2. Change branch to: `main-fixed`
3. Root Directory: `.` (empty/root)
4. Start Command: `node backend/server.js`
5. Build Command: `npm install` (hoặc để Railway tự detect)

## 📋 Checklist

- [ ] Branch có cấu trúc đúng (files ở root)
- [ ] Root Directory set đúng
- [ ] Start Command point đúng file
- [ ] Build Command chạy trong đúng folder
- [ ] Environment variables đã set

