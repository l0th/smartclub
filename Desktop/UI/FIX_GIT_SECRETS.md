# Fix Secrets Trong Git History

## 🔍 Vấn Đề

GitHub vẫn phát hiện secrets trong commit cũ `d16781d`. Cần remove secrets khỏi Git history.

## ✅ Giải Pháp

### Option 1: Rewrite History (Khuyến Nghị)

```bash
# 1. Interactive rebase để edit commit
git rebase -i d16781d^
# Trong editor, đổi "pick" thành "edit" cho commit d16781d

# 2. Fix files trong commit đó
# (Files đã được fix rồi)

# 3. Amend commit
git add DEPLOYMENT_GUIDE.md HEROKU_DEPLOY_STEPS.md OPTIMAL_DEPLOYMENT_PLAN.md SECURITY_ANALYSIS.md
git commit --amend --no-edit

# 4. Continue rebase
git rebase --continue

# 5. Force push (cẩn thận!)
git push origin master --force
```

### Option 2: Dùng GitHub Unblock URL (Tạm Thời)

Nếu không muốn rewrite history, có thể dùng URL GitHub cung cấp:
https://github.com/l0th/smartclub/security/secret-scanning/unblock-secret/37jx2VnA62tnKVAMtng7HEg2Lu0

**⚠️ Không khuyến nghị** vì secrets vẫn còn trong history.

### Option 3: Tạo Branch Mới (Đơn Giản Nhất)

```bash
# 1. Tạo branch mới từ commit hiện tại
git checkout -b main-clean

# 2. Push branch mới
git push origin main-clean

# 3. Set làm default branch trên GitHub
# (Làm trên GitHub web interface)
```

## 🚀 Quick Fix

Nếu muốn nhanh, dùng GitHub unblock URL, nhưng **nhớ rotate secrets** sau đó!

