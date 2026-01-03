# Hướng Dẫn Sử Dụng Branch main-clean

## ✅ Đã Tạo Branch Mới

Branch `main-clean` đã được tạo từ commit hiện tại (đã fix secrets).

## 📋 Các Bước Tiếp Theo

### Bước 1: Set main-clean Làm Default Branch trên GitHub

1. Truy cập: https://github.com/l0th/smartclub/settings
2. Vào **Branches** section
3. Tìm **Default branch**
4. Click **Switch to another branch**
5. Chọn `main-clean`
6. Click **Update**
7. Confirm bằng cách nhập tên repo

### Bước 2: Xóa Branch master (Optional)

Sau khi set `main-clean` làm default, có thể xóa `master`:

```bash
# Xóa branch master trên remote
git push origin --delete master

# Xóa branch master local (nếu muốn)
git branch -d master
```

### Bước 3: Đổi Tên Branch Local (Optional)

Nếu muốn đổi tên `main-clean` thành `main`:

```bash
# Đổi tên branch local
git branch -m main-clean main

# Push và set upstream
git push -u origin main

# Xóa main-clean trên remote
git push origin --delete main-clean
```

## 🎯 Kết Quả

Sau khi hoàn thành:
- ✅ Branch `main-clean` không có secrets trong history
- ✅ GitHub sẽ không block push
- ✅ Code sạch và an toàn

## 📝 Lưu Ý

- Branch `main-clean` chỉ chứa commits từ commit fix secrets trở đi
- History cũ (có secrets) vẫn còn trong branch `master` nhưng không được dùng
- Có thể xóa branch `master` sau khi confirm `main-clean` hoạt động tốt

