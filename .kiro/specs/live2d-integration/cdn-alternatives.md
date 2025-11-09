# CDN 备用方案

如果默认的 jsdelivr CDN 无法加载，可以尝试以下备用方案：

## 方案 1: 使用固定版本号（推荐）

编辑 `index.html`，将：
```html
<script src="https://cdn.jsdelivr.net/npm/oh-my-live2d@latest/dist/index.min.js"></script>
```

改为：
```html
<script src="https://cdn.jsdelivr.net/npm/oh-my-live2d@0.19.3/dist/index.min.js"></script>
```

## 方案 2: 使用 unpkg CDN

```html
<script src="https://unpkg.com/oh-my-live2d@latest/dist/index.min.js"></script>
```

或固定版本：
```html
<script src="https://unpkg.com/oh-my-live2d@0.19.3/dist/index.min.js"></script>
```

## 方案 3: 使用 jsdelivr 的备用域名

```html
<script src="https://fastly.jsdelivr.net/npm/oh-my-live2d@latest/dist/index.min.js"></script>
```

## 方案 4: 本地托管（最可靠）

### 步骤 1: 下载文件
访问以下链接下载文件：
```
https://cdn.jsdelivr.net/npm/oh-my-live2d@0.19.3/dist/index.min.js
```

### 步骤 2: 保存到项目
将下载的文件保存为 `JS/oh-my-live2d.min.js`

### 步骤 3: 修改引用
编辑 `index.html`：
```html
<script src="./JS/oh-my-live2d.min.js"></script>
```

## 测试 CDN 可用性

在浏览器中直接访问以下链接，看是否能下载：

1. **jsdelivr (默认)**:
   https://cdn.jsdelivr.net/npm/oh-my-live2d@latest/dist/index.min.js

2. **unpkg**:
   https://unpkg.com/oh-my-live2d@latest/dist/index.min.js

3. **jsdelivr 备用**:
   https://fastly.jsdelivr.net/npm/oh-my-live2d@latest/dist/index.min.js

## 当前推荐配置

基于稳定性考虑，推荐使用固定版本号：

```html
<!-- Live2D 看板娘 -->
<script 
  src="https://cdn.jsdelivr.net/npm/oh-my-live2d@0.19.3/dist/index.min.js"
  onload="console.log('oh-my-live2d 脚本已加载');"
  onerror="console.error('oh-my-live2d 脚本加载失败');">
</script>
<script src="./JS/live2d-config.js"></script>
```

## 检查加载状态

刷新页面后，在浏览器控制台应该看到：
- ✅ "oh-my-live2d 脚本已加载"
- ✅ "Live2D 初始化尝试 1/3"
- ✅ "OhMyLive2D 已加载，开始初始化..."
- ✅ "✅ Live2D 初始化成功！"

如果看到错误，请尝试上述备用方案。
