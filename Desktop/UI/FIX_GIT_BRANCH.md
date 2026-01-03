# Fix Lỗi Git Branch - main does not match any

## 🔍 Vấn Đề

Lỗi: `error: src refspec main does not match any`

**Nguyên nhân:** 
- Branch hiện tại là `master`
- Đang cố push `main` nhưng branch `main` không tồn tại

## ✅ Giải Pháp

### Option 1: Push Branch `master` (Đơn Giản Nhất)

```bash
git push origin master
```

Nếu GitHub repo dùng `main` làm default, có thể cần set upstream:

```bash
git push -u origin master
```

### Option 2: Đổi Tên Branch Sang `main` (Khuyến Nghị)

Nếu muốn dùng `main` thay vì `master`:

```bash
# 1. Đổi tên branch local
git branch -m master main

# 2. Push branch mới
git push -u origin main

# 3. Xóa branch master trên remote (nếu có)
git push origin --delete master
```

### Option 3: Tạo Branch `main` Từ `master`

```bash
# 1. Tạo branch main từ master
git checkout -b main

# 2. Push branch main
git push -u origin main
```

## 🚀 Quick Fix (Chọn Một)

### Nếu GitHub Repo Dùng `master`:
```bash
git push origin master
```

### Nếu GitHub Repo Dùng `main`:
```bash
git branch -m master main
git push -u origin main
```

## 📋 Sau Khi Push Thành Công

Kiểm tra trên GitHub:
- https://github.com/l0th/smartclub

Code sẽ xuất hiện trên branch đã push.

