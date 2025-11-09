# Live2D 集成快速开始指南

## 🚀 快速测试步骤

### 1. 启动本地服务器

**重要**: 不要直接双击打开 HTML 文件，必须使用 HTTP 服务器！

#### 选项 A: 使用 Python（推荐）
```bash
# 在项目根目录运行
python -m http.server 8000
```

#### 选项 B: 使用 Node.js
```bash
# 需要先安装 serve
npx serve
```

#### 选项 C: 使用 PHP
```bash
php -S localhost:8000
```

### 2. 在浏览器中打开

打开浏览器，访问：
```
http://localhost:8000/index.html
```

### 3. 等待加载

- 页面加载后，等待 1-2 秒
- 看板娘应该出现在页面右下角
- 如果没有出现，按 F12 打开控制台查看日志

### 4. 验证功能

#### ✅ 基础显示
- [ ] 看板娘出现在右下角
- [ ] 模型显示完整
- [ ] 有待机动画（呼吸、眨眼）

#### ✅ 交互功能
- [ ] 移动鼠标，视线跟随
- [ ] 点击模型，触发动画
- [ ] 提示气泡显示消息

#### ✅ 菜单功能
- [ ] 点击右侧菜单按钮
- [ ] 点击"休息"，模型滑出
- [ ] 点击唤醒，模型滑回
- [ ] 点击"切换模型"，切换到下一个模型

## 🔍 检查控制台

按 F12 打开浏览器开发者工具，查看控制台：

### 成功的日志应该显示：
```
Live2D 加载成功
```

### 如果看到警告：
```
OhMyLive2D 未加载，Live2D 功能将被禁用
```

请参考故障排除指南：`.kiro/specs/live2d-integration/troubleshooting.md`

## 📱 移动端测试

### 使用浏览器开发者工具模拟
1. 按 F12 打开开发者工具
2. 点击设备切换按钮（Ctrl+Shift+M）
3. 选择移动设备（如 iPhone 12）
4. 刷新页面
5. 验证模型大小是否适配

### 在真实设备上测试
1. 确保电脑和手机在同一网络
2. 查找电脑的 IP 地址
   - Windows: `ipconfig`
   - Mac/Linux: `ifconfig`
3. 在手机浏览器访问：`http://你的IP:8000/index.html`

## ⚙️ 配置调整

### 如果模型太大
编辑 `JS/live2d-config.js`：
```javascript
scale: 0.08,  // 减小这个值
```

### 如果模型位置不对
```javascript
position: [0, 80],  // 调整 y 值
```

### 如果想更换模型
```javascript
models: [
  {
    path: 'https://cdn.jsdelivr.net/gh/zenghongtu/live2d-model-assets@master/assets/模型名/模型名.model.json',
    // ...
  }
]
```

可用的模型名：
- hijiki（默认）
- tororo
- shizuku
- izumi
- koharu
- miku
- z16

## 🐛 常见问题

### 问题：看不到看板娘
**解决**：
1. 检查是否使用 HTTP 服务器（不是直接打开 HTML）
2. 检查控制台是否有错误
3. 清除浏览器缓存后重试
4. 检查网络连接

### 问题：鼠标跟随不工作
**解决**：
- 这是正常的，鼠标跟随需要鼠标移动到模型附近
- 尝试点击模型看是否有反应

### 问题：性能卡顿
**解决**：
1. 减小模型尺寸
2. 增加初始化延迟
3. 在移动端禁用

## 📚 更多文档

- **完整功能测试**: `functional-test.md`
- **性能测试指南**: `performance-test.md`
- **故障排除**: `troubleshooting.md`
- **实施总结**: `implementation-summary.md`

## 🎯 下一步

测试成功后：
1. 根据需要调整配置
2. 在不同浏览器中测试
3. 在移动设备上测试
4. 进行性能测试
5. 部署到生产环境

## 💡 提示

- 首次加载可能需要几秒钟下载模型文件
- 后续访问会使用缓存，加载更快
- 如果遇到问题，先查看控制台日志
- 可以在控制台手动测试：`console.log(typeof OhMyLive2D)`

---

**祝你使用愉快！** 🎉

如有问题，请查看故障排除指南或提交 Issue。
