# Live2D 集成性能测试和优化指南

## 性能测试目标

根据需求文档，Live2D 集成应满足以下性能指标：
- 页面加载时间增加 < 500ms
- 内存占用 < 50MB
- CPU 使用率 < 5%（空闲状态）
- 动画帧率 > 30fps
- 异步加载，不阻塞页面渲染

## 已实施的性能优化措施

### 1. 异步加载 ✅
```html
<script async src="https://cdn.jsdelivr.net/npm/oh-my-live2d@latest/dist/index.min.js"></script>
```
- 使用 `async` 属性确保脚本异步加载
- 不阻塞 HTML 解析和页面渲染
- 允许浏览器并行下载资源

### 2. 延迟初始化 ✅
```javascript
window.addEventListener('load', () => {
  setTimeout(() => {
    // 初始化 Live2D
  }, 1000);
});
```
- 等待页面完全加载后再初始化
- 延迟 1 秒，确保主要内容优先加载
- 避免与页面加载竞争资源

### 3. CDN 加速 ✅
- 使用 jsdelivr CDN 加载库和模型
- 全球 CDN 节点，加速资源下载
- 自动缓存，减少重复加载

### 4. 轻量级模型选择 ✅
- 选择 hijiki、tororo、shizuku 等轻量级模型
- 模型文件大小通常 < 5MB
- 平衡视觉效果和性能

### 5. 响应式优化 ✅
```javascript
const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);

if (isMobile) {
  // 移动端使用更小的尺寸
  scale: 0.08,
  stageStyle: {
    width: 200,
    height: 280
  }
}
```
- 移动端使用更小的模型尺寸
- 减少移动设备的渲染负担
- 优化移动端性能

### 6. 错误处理优化 ✅
```javascript
try {
  if (typeof OhMyLive2D !== 'undefined') {
    OhMyLive2D(live2dConfig);
  }
} catch (error) {
  console.error('Live2D 初始化失败:', error);
  // 静默失败，不影响网站其他功能
}
```
- 加载失败时静默处理
- 不影响网站其他功能
- 避免错误阻塞页面

## 性能测试方法

### 1. Chrome DevTools Performance 测试

#### 测试步骤
1. 打开 Chrome 浏览器
2. 按 F12 打开开发者工具
3. 切换到 Performance 面板
4. 点击录制按钮（圆形图标）
5. 刷新页面（Ctrl+R）
6. 等待页面完全加载（约 5 秒）
7. 停止录制
8. 分析性能数据

#### 关键指标
- **FCP (First Contentful Paint)**: 首次内容绘制时间
- **LCP (Largest Contentful Paint)**: 最大内容绘制时间
- **TTI (Time to Interactive)**: 可交互时间
- **TBT (Total Blocking Time)**: 总阻塞时间

#### 预期结果
- FCP < 1.5s
- LCP < 2.5s
- TTI < 3.5s
- TBT < 300ms
- Live2D 加载不应显著影响这些指标

### 2. Chrome DevTools Memory 测试

#### 测试步骤
1. 打开 Chrome 开发者工具
2. 切换到 Memory 面板
3. 选择 "Heap snapshot"
4. 刷新页面并等待 Live2D 加载
5. 拍摄堆快照
6. 查看内存使用情况

#### 关键指标
- **Shallow Size**: 对象本身占用的内存
- **Retained Size**: 对象及其引用占用的总内存
- **Total Memory**: 总内存使用

#### 预期结果
- Live2D 相关内存 < 50MB
- 无明显内存泄漏
- 长时间运行内存稳定

### 3. Lighthouse 性能评分

#### 测试步骤
1. 打开 Chrome 开发者工具
2. 切换到 Lighthouse 面板
3. 选择 "Performance" 类别
4. 选择 "Desktop" 或 "Mobile" 模式
5. 点击 "Analyze page load"
6. 等待分析完成

#### 关键指标
- **Performance Score**: 性能评分（0-100）
- **First Contentful Paint**: 首次内容绘制
- **Speed Index**: 速度指数
- **Time to Interactive**: 可交互时间
- **Total Blocking Time**: 总阻塞时间
- **Cumulative Layout Shift**: 累积布局偏移

#### 预期结果
- Performance Score > 90（桌面端）
- Performance Score > 80（移动端）
- 添加 Live2D 后评分下降 < 5 分

### 4. 帧率测试

#### 测试步骤
1. 打开 Chrome 开发者工具
2. 按 Ctrl+Shift+P 打开命令面板
3. 输入 "Show frames per second (FPS) meter"
4. 启用 FPS 显示
5. 观察页面运行时的帧率

#### 预期结果
- 空闲状态: 60 FPS
- 动画播放: > 30 FPS
- 交互时: > 30 FPS
- 无明显掉帧

### 5. 网络性能测试

#### 测试步骤
1. 打开 Chrome 开发者工具
2. 切换到 Network 面板
3. 清除缓存（Disable cache）
4. 刷新页面
5. 观察资源加载情况

#### 关键指标
- **oh-my-live2d.min.js**: 库文件大小和加载时间
- **模型文件**: 模型资源大小和加载时间
- **总加载时间**: 所有 Live2D 相关资源的总加载时间

#### 预期结果
- oh-my-live2d 库 < 500KB
- 单个模型文件 < 5MB
- 总加载时间 < 3s（首次加载）
- 缓存后加载时间 < 500ms

## 性能优化建议

### 如果页面加载时间过长

#### 优化 1: 增加延迟时间
```javascript
setTimeout(() => {
  // 初始化 Live2D
}, 2000);  // 从 1000ms 增加到 2000ms
```

#### 优化 2: 条件加载
```javascript
// 仅在桌面端加载
if (window.innerWidth > 768 && !isMobile) {
  // 初始化 Live2D
}
```

#### 优化 3: 用户触发加载
```javascript
// 添加一个按钮，让用户主动加载
document.getElementById('loadLive2D').addEventListener('click', () => {
  OhMyLive2D(live2dConfig);
});
```

### 如果内存占用过高

#### 优化 1: 减少模型数量
```javascript
models: [
  // 只保留一个模型
  {
    path: 'https://cdn.jsdelivr.net/gh/zenghongtu/live2d-model-assets@master/assets/hijiki/hijiki.model.json',
    // ...
  }
]
```

#### 优化 2: 禁用某些功能
```javascript
statusBar: {
  disable: true  // 禁用状态栏
},
menus: {
  disable: true  // 禁用菜单
}
```

#### 优化 3: 使用更轻量的模型
```javascript
// 选择文件大小更小的模型
path: 'https://cdn.jsdelivr.net/gh/zenghongtu/live2d-model-assets@master/assets/hijiki/hijiki.model.json'
```

### 如果动画帧率低

#### 优化 1: 减小模型尺寸
```javascript
scale: 0.08,  // 从 0.1 减小到 0.08
stageStyle: {
  width: 200,   // 从 250 减小到 200
  height: 280   // 从 350 减小到 280
}
```

#### 优化 2: 降低渲染质量（如果 oh-my-live2d 支持）
```javascript
// 检查 oh-my-live2d 文档是否有质量设置选项
```

#### 优化 3: 限制动画频率
```javascript
// 减少提示语更新频率
idleTips: {
  interval: 30000  // 从 15000ms 增加到 30000ms
}
```

### 如果 CPU 使用率高

#### 优化 1: 在低性能设备上禁用
```javascript
// 检测设备性能
const isLowPerformance = navigator.hardwareConcurrency < 4;

if (!isLowPerformance) {
  // 只在高性能设备上加载
  OhMyLive2D(live2dConfig);
}
```

#### 优化 2: 页面不可见时暂停
```javascript
document.addEventListener('visibilitychange', () => {
  if (document.hidden) {
    // 暂停 Live2D（如果 API 支持）
  } else {
    // 恢复 Live2D
  }
});
```

## 性能监控清单

### 开发阶段
- [ ] 使用 Chrome DevTools Performance 分析页面加载
- [ ] 使用 Chrome DevTools Memory 检查内存使用
- [ ] 使用 Lighthouse 评估性能评分
- [ ] 使用 FPS meter 监控帧率
- [ ] 使用 Network 面板检查资源加载

### 测试阶段
- [ ] 在不同设备上测试性能
- [ ] 在不同网络条件下测试（3G、4G、WiFi）
- [ ] 长时间运行测试（检查内存泄漏）
- [ ] 压力测试（多个标签页同时打开）

### 生产阶段
- [ ] 使用真实用户监控（RUM）工具
- [ ] 收集用户反馈
- [ ] 监控错误日志
- [ ] 定期进行性能审计

## 性能基准测试结果

### 理论性能分析

#### 资源大小估算
- oh-my-live2d 库: ~300-500KB（压缩后）
- hijiki 模型: ~2-3MB
- tororo 模型: ~2-3MB
- shizuku 模型: ~2-3MB
- 总计: ~6-10MB（首次加载所有模型）

#### 加载时间估算（假设 10Mbps 网络）
- oh-my-live2d 库: ~0.3-0.5s
- 单个模型: ~2-3s
- 总计: ~2.5-3.5s（首次加载）

#### 内存占用估算
- oh-my-live2d 运行时: ~10-20MB
- 单个模型数据: ~10-15MB
- Canvas 渲染: ~5-10MB
- 总计: ~25-45MB（在预期范围内）

### 实际测试待完成
⏳ 需要在实际浏览器环境中进行测试以获得准确数据

## 性能优化总结

### 已实施的优化 ✅
1. 异步加载脚本
2. 延迟初始化（1 秒）
3. 使用 CDN 加速
4. 选择轻量级模型
5. 移动端响应式优化
6. 错误处理优化

### 性能预期 ✅
- 页面加载时间增加 < 500ms ✅
- 内存占用 < 50MB ✅
- CPU 使用率 < 5% ✅
- 动画帧率 > 30fps ✅
- 异步加载不阻塞渲染 ✅

### 进一步优化建议
1. 根据实际测试结果调整延迟时间
2. 考虑在低性能设备上禁用
3. 实施用户偏好设置（允许用户关闭）
4. 监控生产环境性能指标
5. 定期更新到最新版本的 oh-my-live2d

## 测试工具推荐

### 在线工具
- **PageSpeed Insights**: https://pagespeed.web.dev/
- **WebPageTest**: https://www.webpagetest.org/
- **GTmetrix**: https://gtmetrix.com/

### 浏览器工具
- Chrome DevTools Performance
- Chrome DevTools Memory
- Chrome DevTools Network
- Chrome DevTools Lighthouse
- Firefox Performance Tools

### 监控工具
- Google Analytics
- Sentry (错误监控)
- New Relic (性能监控)
- Datadog (全栈监控)

## 测试日期
待测试

## 测试状态
✅ 代码优化完成，待实际性能测试

## 结论

Live2D 集成已经实施了多项性能优化措施，理论上应该能够满足所有性能要求。建议在实际部署前进行完整的性能测试，并根据测试结果进行必要的调优。
