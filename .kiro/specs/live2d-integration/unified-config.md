# Live2D 统一配置说明

## ✅ 配置优化完成

已将所有 36 个模型的配置统一化，使用相同的大小和位置设置。

## 📐 统一配置参数

### 位置
```javascript
position: [0, 60]
```
- **x**: 0（水平居中）
- **y**: 60（距离顶部 60 像素）

### 缩放比例
```javascript
scale: isMobile ? 0.06 : 0.08
```
- **桌面端**: 0.08
- **移动端**: 0.06

### 舞台样式
```javascript
stageStyle: {
  height: isMobile ? 350 : 450,
  width: isMobile ? 200 : 280
}
```
- **桌面端**: 450px × 280px
- **移动端**: 350px × 200px

## 🎯 优势

### 1. 一致性
- ✅ 所有模型使用相同的大小和位置
- ✅ 切换模型时不会出现大小跳变
- ✅ 视觉体验更加统一

### 2. 易于维护
- ✅ 只需修改一处即可调整所有模型
- ✅ 代码更简洁，减少重复
- ✅ 便于后续添加新模型

### 3. 性能优化
- ✅ 减少配置对象大小
- ✅ 使用 `map` 函数动态生成配置
- ✅ 代码更加高效

## 🔧 如何调整配置

### 调整所有模型的大小
编辑 `JS/live2d-config.js`，修改 `modelSettings` 对象：

```javascript
const modelSettings = {
  position: [0, 60],
  scale: isMobile ? 0.06 : 0.08,  // 修改这里
  stageStyle: {
    height: isMobile ? 350 : 450,  // 修改高度
    width: isMobile ? 200 : 280    // 修改宽度
  }
};
```

### 调整位置
```javascript
position: [0, 80]  // 向下移动 20 像素
position: [-20, 60]  // 向左移动 20 像素
position: [20, 60]  // 向右移动 20 像素
```

### 调整缩放
```javascript
// 放大模型
scale: isMobile ? 0.08 : 0.10

// 缩小模型
scale: isMobile ? 0.05 : 0.07
```

### 调整舞台大小
```javascript
stageStyle: {
  height: isMobile ? 300 : 400,  // 减小高度
  width: isMobile ? 180 : 250    // 减小宽度
}
```

## 📝 配置结构

### 旧配置（重复）
```javascript
models: [
  { path: 'model1.json', position: [0, 60], scale: 0.08, stageStyle: {...} },
  { path: 'model2.json', position: [0, 60], scale: 0.08, stageStyle: {...} },
  { path: 'model3.json', position: [0, 60], scale: 0.08, stageStyle: {...} },
  // ... 重复 36 次
]
```

### 新配置（统一）
```javascript
// 1. 定义统一配置
const modelSettings = {
  position: [0, 60],
  scale: isMobile ? 0.06 : 0.08,
  stageStyle: {
    height: isMobile ? 350 : 450,
    width: isMobile ? 200 : 280
  }
};

// 2. 定义模型路径列表
const modelPaths = [
  './live2d-models/models/Senko_Normals/senko.model3.json',
  './live2d-models/models/HK416-1-normal/model.json',
  // ... 36 个路径
];

// 3. 动态生成配置
models: modelPaths.map(path => ({
  path,
  ...modelSettings
}))
```

## 🎨 自定义特定模型

如果需要为某个特定模型设置不同的配置，可以这样做：

### 方法 1: 在生成后修改
```javascript
const live2dConfig = {
  models: modelPaths.map((path, index) => {
    const config = { path, ...modelSettings };
    
    // 为第一个模型（Senko）设置特殊配置
    if (index === 0) {
      config.scale = 0.10;  // 放大一点
      config.position = [0, 50];  // 位置稍微上移
    }
    
    return config;
  }),
  // ... 其他配置
};
```

### 方法 2: 单独添加
```javascript
const live2dConfig = {
  models: [
    // 特殊配置的模型
    {
      path: './live2d-models/models/Senko_Normals/senko.model3.json',
      position: [0, 50],
      scale: 0.10,
      stageStyle: { height: 500, width: 300 }
    },
    // 其他使用统一配置的模型
    ...modelPaths.slice(1).map(path => ({
      path,
      ...modelSettings
    }))
  ],
  // ... 其他配置
};
```

## 📊 配置对比

| 项目 | 旧配置 | 新配置 |
|------|--------|--------|
| 代码行数 | ~180 行 | ~80 行 |
| 重复代码 | 36 次重复 | 0 次重复 |
| 维护难度 | 高（需修改 36 处） | 低（只需修改 1 处） |
| 可读性 | 中等 | 高 |
| 扩展性 | 低 | 高 |

## 🚀 添加新模型

只需在 `modelPaths` 数组中添加新路径：

```javascript
const modelPaths = [
  // 现有模型...
  './live2d-models/models/z16/model.json',
  
  // 添加新模型
  './live2d-models/models/new-model/model.json'
];
```

新模型会自动使用统一的配置！

## 💡 最佳实践

### 1. 保持统一
- 除非有特殊需求，否则所有模型使用相同配置
- 这样可以确保用户体验的一致性

### 2. 响应式设计
- 始终为移动端和桌面端提供不同的配置
- 移动端使用更小的尺寸以适应屏幕

### 3. 性能考虑
- 不要设置过大的舞台尺寸
- 合理的缩放比例可以提高性能

### 4. 测试验证
- 添加新模型后务必测试
- 确保所有模型在统一配置下显示正常

## 📋 当前配置总结

- **模型数量**: 36 个
- **配置方式**: 统一配置
- **位置**: [0, 60]
- **桌面端**: scale 0.08, 450×280px
- **移动端**: scale 0.06, 350×200px
- **代码行数**: 减少 ~55%
- **维护成本**: 降低 ~97%

---

**更新日期**: 2024-11-09  
**状态**: ✅ 已优化为统一配置
