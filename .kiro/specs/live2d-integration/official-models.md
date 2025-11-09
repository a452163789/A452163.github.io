# oh-my-live2d 官方模型库使用指南

## 📦 模型仓库

**仓库地址**: https://github.com/oh-my-live2d/live2d-models

**官方文档**: https://oml2d.com/guide/models.html

这是 oh-my-live2d 官方提供的高质量模型仓库，包含精选的 Live2D 模型。

## 🔗 模型加载规则

### 方式 1: 官方 CDN（推荐）
```
https://model.oml2d.com/{模型文件夹}/{模型的json文件}
```

### 方式 2: GitHub Raw 链接（当前使用）
```
https://raw.githubusercontent.com/oh-my-live2d/live2d-models/main/models/{模型文件夹}/{模型的json文件}
```

### 示例对比

#### 官方 CDN
```javascript
path: 'https://model.oml2d.com/Senko_Normals/senko.model3.json'
```

#### GitHub Raw（当前使用）
```javascript
path: 'https://raw.githubusercontent.com/oh-my-live2d/live2d-models/main/models/Senko_Normals/senko.model3.json'
```

## 🎨 当前配置的模型

### 1. Senko_Normals（仙狐）
```javascript
{
  path: 'https://raw.githubusercontent.com/oh-my-live2d/live2d-models/main/models/Senko_Normals/senko.model3.json',
  position: [0, 60],
  scale: 0.08,
  stageStyle: {
    height: 450,
    width: 280
  }
}
```
- **类型**: Live2D Cubism 3.0
- **特点**: 可爱的狐狸娘，动画丰富
- **推荐**: ⭐⭐⭐⭐⭐

### 2. HK416-1-normal（少女前线）
```javascript
{
  path: 'https://raw.githubusercontent.com/oh-my-live2d/live2d-models/main/models/HK416-1-normal/model.json',
  position: [0, 60],
  scale: 0.08,
  stageStyle: {
    height: 450,
    width: 280
  }
}
```
- **类型**: Live2D Cubism 2.0
- **特点**: 少女前线角色，精致细腻
- **推荐**: ⭐⭐⭐⭐⭐

### 3. cat-black（黑猫）
```javascript
{
  path: 'https://raw.githubusercontent.com/oh-my-live2d/live2d-models/main/models/cat-black/model.json',
  position: [0, 60],
  scale: 0.08,
  stageStyle: {
    height: 450,
    width: 280
  }
}
```
- **类型**: Live2D Cubism 2.0
- **特点**: 可爱的黑猫，简洁优雅
- **推荐**: ⭐⭐⭐⭐

## 📋 更多可用模型

访问官方文档查看完整的模型列表：
https://oml2d.com/guide/models.html

### 常见模型类别

#### 动漫角色
- Senko_Normals（仙狐）
- HK416 系列（少女前线）
- Pio（各种服装）
- 各种动漫角色

#### 动物系列
- cat-black（黑猫）
- cat-white（白猫）
- 其他动物模型

#### 游戏角色
- 少女前线系列
- 碧蓝航线系列
- 其他游戏角色

## 📌 为什么使用 GitHub Raw 链接？

### 优势
1. **直接访问源文件** - 从 GitHub 仓库直接加载
2. **稳定可靠** - GitHub 的全球 CDN 支持
3. **版本控制** - 可以指定特定的分支或提交
4. **透明度高** - 可以直接查看源文件

### GitHub Raw 链接格式
```
https://raw.githubusercontent.com/{用户名}/{仓库名}/{分支名}/路径/文件名
```

### 当前使用的链接
```
https://raw.githubusercontent.com/oh-my-live2d/live2d-models/main/models/{模型文件夹}/{模型文件}
```

### 与官方 CDN 的对比

| 特性 | GitHub Raw | 官方 CDN |
|------|-----------|----------|
| 速度 | 快 | 更快 |
| 稳定性 | 高 | 高 |
| 可用性 | 依赖 GitHub | 专用 CDN |
| 透明度 | 高（可查看源码） | 中 |
| 缓存 | GitHub CDN | 专用 CDN |

### 切换到官方 CDN

如果想切换回官方 CDN，只需修改路径：

```javascript
// 从 GitHub Raw
path: 'https://raw.githubusercontent.com/oh-my-live2d/live2d-models/main/models/Senko_Normals/senko.model3.json'

// 改为官方 CDN
path: 'https://model.oml2d.com/Senko_Normals/senko.model3.json'
```

## 🔄 切换模型

### 方法 1: 使用菜单切换
1. 点击看板娘右侧的菜单按钮
2. 点击"切换模型"选项
3. 模型会按配置顺序循环切换

### 方法 2: 修改配置文件
编辑 `JS/live2d-config.js`，在 `models` 数组中添加或修改模型：

```javascript
models: [
  {
    path: 'https://model.oml2d.com/你想要的模型/model.json',
    position: [0, 60],
    scale: 0.08,
    stageStyle: {
      height: 450,
      width: 280
    }
  }
]
```

## ⚙️ 模型配置参数

### path（必需）
模型文件的 URL 路径

### position
模型在舞台上的位置 [x, y]
- x: 水平位置（0 为中心）
- y: 垂直位置（正数向下）

### scale
模型缩放比例
- 推荐范围: 0.05 - 0.15
- 默认: 0.08

### stageStyle
舞台样式设置
- **height**: 舞台高度（像素）
- **width**: 舞台宽度（像素）
- **bottom**: 距离底部距离
- **right**: 距离右侧距离
- **left**: 距离左侧距离

## 🎯 优化建议

### 桌面端配置
```javascript
scale: 0.08,
stageStyle: {
  height: 450,
  width: 280
}
```

### 移动端配置
```javascript
scale: 0.06,
stageStyle: {
  height: 350,
  width: 200
}
```

### 响应式配置（推荐）
```javascript
const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);

{
  scale: isMobile ? 0.06 : 0.08,
  stageStyle: {
    height: isMobile ? 350 : 450,
    width: isMobile ? 200 : 280
  }
}
```

## 🔍 查找模型

### 方法 1: 访问官方文档
https://oml2d.com/guide/models.html

### 方法 2: 浏览 GitHub 仓库
https://github.com/oh-my-live2d/live2d-models/tree/main/models

### 方法 3: 直接访问 CDN
https://model.oml2d.com/

## 📝 模型文件类型

### Cubism 2.0 模型
- 文件名: `model.json`
- 特点: 兼容性好，文件较小
- 示例: `cat-black/model.json`

### Cubism 3.0 模型
- 文件名: `*.model3.json`
- 特点: 动画更丰富，效果更好
- 示例: `Senko_Normals/senko.model3.json`

### Cubism 4.0+ 模型
- 文件名: `*.model3.json`
- 特点: 最新版本，效果最佳
- 需要确保 oh-my-live2d 支持

## ⚠️ 注意事项

### 版权声明
- 所有模型来源于网络
- 仅供学习和参考使用
- 严禁用于商业盈利项目
- 模型所有权属于原作者或创作团队

### 使用建议
1. 选择适合网站风格的模型
2. 注意模型文件大小（建议 < 5MB）
3. 测试模型在不同设备上的表现
4. 尊重原作者版权

### 性能考虑
- 大型模型可能影响加载速度
- 复杂动画可能影响性能
- 建议在移动端使用较小的模型
- 可以配置多个模型供用户选择

## 🚀 快速测试

### 测试单个模型
在浏览器控制台执行：
```javascript
OML2D.loadOml2d({
  models: [{
    path: 'https://model.oml2d.com/Senko_Normals/senko.model3.json',
    position: [0, 60],
    scale: 0.08,
    stageStyle: { height: 450 }
  }]
});
```

### 测试模型是否可访问
在浏览器中直接访问模型 URL：
```
https://model.oml2d.com/Senko_Normals/senko.model3.json
```

如果能看到 JSON 内容，说明模型可用。

## 📚 相关资源

- **官方网站**: https://oml2d.com/
- **GitHub 仓库**: https://github.com/oh-my-live2d/oh-my-live2d
- **模型仓库**: https://github.com/oh-my-live2d/live2d-models
- **模型文档**: https://oml2d.com/guide/models.html

## 🎉 当前配置总结

项目当前使用 oh-my-live2d 官方模型库，配置了 3 个高质量模型：

1. ✅ **Senko_Normals** - 可爱的仙狐娘（Cubism 3.0）
2. ✅ **HK416-1-normal** - 少女前线角色（Cubism 2.0）
3. ✅ **cat-black** - 优雅的黑猫（Cubism 2.0）

所有模型都通过官方 CDN 加载：`https://model.oml2d.com/`

---

**最后更新**: 2024-11-09  
**状态**: ✅ 已配置官方高质量模型
