# Các Bước Tiếp Theo - Branch main-clean

## ✅ Đã Hoàn Thành

- ✅ Tạo branch `main-clean` từ commit hiện tại
- ✅ Push branch `main-clean` lên GitHub
- ✅ Branch không chứa secrets trong commits mới

## 📋 Bước Tiếp Theo

### 1. Set main-clean Làm Default Branch

1. Truy cập: https://github.com/l0th/smartclub/settings/branches
2. Tìm **Default branch** section
3. Click **Switch to another branch**
4. Chọn `main-clean`
5. Click **Update**
6. Confirm

### 2. Deploy Lên Railway

Sau khi set default branch, deploy lên Railway:

1. Vào Railway Dashboard
2. Tạo New Project
3. Deploy from GitHub
4. Chọn repo: `l0th/smartclub`
5. Chọn branch: `main-clean`
6. Set Root Directory: `backend`
7. Set Start Command: `node server.js`
8. Set Environment Variables (xem `DEPLOYMENT_GUIDE.md`)

### 3. Xóa Branch master (Optional)

Sau khi confirm `main-clean` hoạt động tốt:

```bash
# Xóa branch master trên remote
git push origin --delete master
```

## 🎯 Kết Quả

- ✅ Code đã push lên GitHub (branch main-clean)
- ✅ Không còn secrets trong branch mới
- ✅ Sẵn sàng deploy lên Railway

## 📝 Lưu Ý

- Branch `main-clean` là branch sạch, không có secrets
- Có thể xóa branch `master` sau khi không cần nữa
- Railway sẽ deploy từ branch `main-clean`

