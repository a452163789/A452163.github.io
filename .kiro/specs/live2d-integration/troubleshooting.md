# Live2D 集成故障排除指南

## 常见问题和解决方案

### 问题 1: "OhMyLive2D 未加载" 警告

#### 症状
浏览器控制台显示：`OhMyLive2D 未加载，Live2D 功能将被禁用`

#### 可能原因
1. CDN 连接失败
2. 网络问题
3. 脚本加载顺序问题
4. 浏览器缓存问题

#### 解决方案

##### 方案 1: 检查网络连接
1. 打开浏览器开发者工具（F12）
2. 切换到 Network 面板
3. 刷新页面
4. 查找 `index.min.js` 文件
5. 检查状态码是否为 200

如果状态码不是 200：
- 检查网络连接
- 尝试直接访问 CDN 链接：https://cdn.jsdelivr.net/npm/oh-my-live2d@latest/dist/index.min.js
- 考虑使用备用 CDN

##### 方案 2: 清除浏览器缓存
1. 按 Ctrl+Shift+Delete 打开清除缓存对话框
2. 选择"缓存的图片和文件"
3. 点击"清除数据"
4. 刷新页面

##### 方案 3: 使用固定版本号
编辑 `index.html`，将：
```html
<script src="https://cdn.jsdelivr.net/npm/oh-my-live2d@latest/dist/index.min.js"></script>
```
改为：
```html
<script src="https://cdn.jsdelivr.net/npm/oh-my-live2d@0.19.3/dist/index.min.js"></script>
```

##### 方案 4: 使用备用 CDN
编辑 `index.html`，尝试使用 unpkg CDN：
```html
<script src="https://unpkg.com/oh-my-live2d@latest/dist/index.min.js"></script>
```

##### 方案 5: 本地托管
1. 下载 oh-my-live2d 库文件
2. 放到项目的 `JS` 目录
3. 修改 `index.html` 中的引用：
```html
<script src="./JS/oh-my-live2d.min.js"></script>
```

### 问题 2: 看板娘不显示

#### 症状
页面加载完成，但看不到 Live2D 看板娘

#### 可能原因
1. 模型文件加载失败
2. WebGL 不支持
3. CSS 样式冲突
4. z-index 层级问题

#### 解决方案

##### 方案 1: 检查模型加载
1. 打开浏览器控制台
2. 查看是否有模型加载错误
3. 检查 Network 面板中的模型文件请求

如果模型加载失败，尝试更换模型：
```javascript
// 在 live2d-config.js 中
models: [
  {
    path: 'https://cdn.jsdelivr.net/gh/Eikanya/Live2d-model@master/Live2D/Senko_Normals/senko.model.json',
    // ...
  }
]
```

##### 方案 2: 检查 WebGL 支持
访问 https://get.webgl.org/ 检查浏览器是否支持 WebGL

如果不支持：
- 更新浏览器到最新版本
- 更新显卡驱动
- 在浏览器设置中启用硬件加速

##### 方案 3: 检查 CSS 冲突
在浏览器开发者工具中：
1. 按 F12 打开开发者工具
2. 点击元素选择器（左上角箭头图标）
3. 尝试点击页面右下角区域
4. 查看是否有 Live2D 相关的 DOM 元素
5. 检查元素的 CSS 样式

### 问题 3: 鼠标跟随不工作

#### 症状
看板娘显示正常，但视线不跟随鼠标

#### 解决方案
这是 oh-my-live2d 的默认行为，鼠标跟随功能应该是自动启用的。如果不工作：

1. 检查控制台是否有 JavaScript 错误
2. 尝试点击看板娘，看是否有反应
3. 确认模型本身支持视线跟随功能

### 问题 4: 点击没有反应

#### 症状
点击看板娘没有触发动画

#### 解决方案
1. 确认点击的是模型本身，不是背景
2. 检查模型是否包含交互动画
3. 查看控制台是否有错误

### 问题 5: 菜单不显示

#### 症状
看板娘显示正常，但没有菜单按钮

#### 解决方案
检查配置文件中的菜单设置：
```javascript
menus: {
  disable: false,  // 确保这里是 false
  items: [
    // 菜单项...
  ]
}
```

### 问题 6: 性能问题（卡顿、掉帧）

#### 症状
页面加载慢，动画卡顿，浏览器响应慢

#### 解决方案

##### 方案 1: 减小模型尺寸
```javascript
scale: 0.06,  // 从 0.1 减小到 0.06
stageStyle: {
  width: 180,   // 从 250 减小到 180
  height: 250   // 从 350 减小到 250
}
```

##### 方案 2: 增加初始化延迟
```javascript
setTimeout(initLive2D, 2000);  // 从 1000ms 增加到 2000ms
```

##### 方案 3: 仅在桌面端加载
```javascript
// 在 live2d-config.js 开头添加
if (isMobile) {
  console.log('移动端不加载 Live2D');
} else {
  // 初始化 Live2D
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
      setTimeout(initLive2D, 1000);
    });
  } else {
    setTimeout(initLive2D, 1000);
  }
}
```

##### 方案 4: 禁用某些功能
```javascript
statusBar: {
  disable: true  // 禁用状态栏
},
menus: {
  disable: true  // 禁用菜单
}
```

### 问题 7: 移动端显示异常

#### 症状
在移动设备上看板娘太大或位置不对

#### 解决方案
调整移动端配置：
```javascript
scale: isMobile ? 0.06 : 0.1,  // 减小移动端缩放
stageStyle: {
  width: isMobile ? 150 : 250,   // 减小移动端宽度
  height: isMobile ? 210 : 350   // 减小移动端高度
}
```

### 问题 8: CORS 错误

#### 症状
控制台显示跨域错误（CORS error）

#### 解决方案
1. 确保使用 HTTP 服务器访问页面，不要直接打开 HTML 文件
2. 使用以下命令启动本地服务器：
   ```bash
   # Python 3
   python -m http.server 8000
   
   # Python 2
   python -m SimpleHTTPServer 8000
   
   # Node.js
   npx serve
   
   # PHP
   php -S localhost:8000
   ```
3. 在浏览器中访问 `http://localhost:8000/index.html`

### 问题 9: 模型切换不工作

#### 症状
点击"切换模型"按钮没有反应

#### 解决方案
1. 确认配置了多个模型
2. 检查所有模型路径是否正确
3. 查看控制台是否有加载错误

### 问题 10: 提示语不显示

#### 症状
看板娘显示正常，但没有提示气泡

#### 解决方案
检查配置：
```javascript
tips: {
  style: {
    width: 230,
    height: 70,
    left: '10px',
    top: '-60px'  // 确保位置在模型上方
  },
  idleTips: {
    message: [
      '欢迎！',
      // 至少要有一条消息
    ],
    duration: 5000,
    interval: 15000
  }
}
```

## 调试技巧

### 1. 启用详细日志
在配置文件开头添加：
```javascript
console.log('Live2D 配置文件已加载');
console.log('设备类型:', isMobile ? '移动端' : '桌面端');
console.log('配置对象:', live2dConfig);
```

### 2. 检查 OhMyLive2D 对象
在浏览器控制台输入：
```javascript
console.log(typeof OhMyLive2D);
console.log(OhMyLive2D);
```

### 3. 手动初始化
在浏览器控制台尝试手动初始化：
```javascript
OhMyLive2D({
  models: [
    {
      path: 'https://cdn.jsdelivr.net/gh/zenghongtu/live2d-model-assets@master/assets/hijiki/hijiki.model.json',
      scale: 0.1,
      position: [0, 50],
      stageStyle: {
        width: 250,
        height: 350
      }
    }
  ]
});
```

### 4. 检查网络请求
1. 打开 Network 面板
2. 刷新页面
3. 筛选 JS 和 JSON 文件
4. 检查所有 Live2D 相关文件的加载状态

### 5. 测试简化配置
创建一个最小配置测试：
```javascript
const minimalConfig = {
  models: [
    {
      path: 'https://cdn.jsdelivr.net/gh/zenghongtu/live2d-model-assets@master/assets/hijiki/hijiki.model.json'
    }
  ]
};

OhMyLive2D(minimalConfig);
```

## 获取帮助

### 官方资源
- oh-my-live2d GitHub: https://github.com/oh-my-live2d/oh-my-live2d
- oh-my-live2d 文档: 查看 GitHub README
- Live2D 官方文档: https://www.live2d.com/

### 社区支持
- GitHub Issues: 在 oh-my-live2d 仓库提交问题
- Stack Overflow: 搜索 "oh-my-live2d" 相关问题

### 检查清单

在寻求帮助前，请确认：
- [ ] 使用 HTTP 服务器访问页面（不是直接打开 HTML）
- [ ] 浏览器控制台没有 JavaScript 错误
- [ ] 网络连接正常
- [ ] CDN 可以访问
- [ ] 浏览器支持 WebGL
- [ ] 已清除浏览器缓存
- [ ] 已尝试使用固定版本号
- [ ] 已尝试使用备用 CDN
- [ ] 已尝试简化配置

## 最后更新
2024-11-09
