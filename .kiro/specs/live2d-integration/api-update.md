# oh-my-live2d API 更新说明

## 🔄 API 变更

oh-my-live2d 的新版本使用了不同的 API 结构。

### 旧版 API（已弃用）
```javascript
// 旧版使用 OhMyLive2D 函数
OhMyLive2D(config);
```

### 新版 API（当前使用）
```javascript
// 新版使用 OML2D.loadOml2d 方法
OML2D.loadOml2d(config);
```

## 📦 CDN 更新

### 旧版 CDN
```html
<script src="https://cdn.jsdelivr.net/npm/oh-my-live2d@0.19.3/dist/index.min.js"></script>
```

### 新版 CDN（当前使用）
```html
<script src="https://unpkg.com/oh-my-live2d@latest"></script>
```

## ✅ 当前配置

### HTML 引用
```html
<!-- Live2D 看板娘 -->
<script src="https://unpkg.com/oh-my-live2d@latest"></script>
<script src="./JS/live2d-config.js"></script>
```

### JavaScript 初始化
```javascript
// 检查新版 API
if (typeof OML2D !== 'undefined' && typeof OML2D.loadOml2d === 'function') {
  OML2D.loadOml2d(live2dConfig);
}
```

## 🎯 配置示例

### 最小配置
```javascript
OML2D.loadOml2d({
  models: [{
    path: 'https://cdn.jsdelivr.net/gh/zenghongtu/live2d-model-assets@master/assets/hijiki/hijiki.model.json',
    position: [0, 60],
    scale: 0.08,
    stageStyle: {
      height: 450
    }
  }]
});
```

### 完整配置
```javascript
OML2D.loadOml2d({
  models: [
    {
      path: 'https://cdn.jsdelivr.net/gh/zenghongtu/live2d-model-assets@master/assets/hijiki/hijiki.model.json',
      position: [0, 60],
      scale: 0.08,
      stageStyle: {
        height: 450,
        width: 280
      }
    }
  ],
  tips: {
    style: {
      width: 230,
      height: 70,
      left: '10px',
      top: '-60px'
    },
    idleTips: {
      message: ['欢迎！', '点击我试试~'],
      duration: 5000,
      interval: 15000
    }
  },
  statusBar: {
    disable: false,
    transitionTime: 800
  },
  menus: {
    disable: false,
    items: [
      {
        id: 'Rest',
        icon: 'icon-rest',
        title: '休息',
        onClick(oml2d) {
          oml2d.stageSlideOut();
        }
      },
      {
        id: 'SwitchModel',
        icon: 'icon-switch',
        title: '切换模型',
        onClick(oml2d) {
          oml2d.loadNextModel();
        }
      }
    ]
  },
  primaryColor: '#38B0DE',
  sayHello: true
});
```

## 🔍 验证加载

### 控制台检查
```javascript
// 检查 OML2D 对象
console.log(typeof OML2D);  // 应该输出: "object"
console.log(typeof OML2D.loadOml2d);  // 应该输出: "function"
```

### 预期日志
刷新页面后，控制台应该显示：
```
页面已加载，准备初始化 Live2D...
Live2D 初始化尝试 1/3
尝试初始化 Live2D...
OML2D 类型: object
OML2D 已加载，开始初始化...
✅ Live2D 初始化成功！
```

## 📚 zenghongtu/live2d-model-assets 模型库

### 模型路径格式
```
https://cdn.jsdelivr.net/gh/zenghongtu/live2d-model-assets@master/assets/{模型名}/{模型名}.model.json
```

### 可用模型列表
- **hijiki** - 轻量可爱的模型（推荐）
- **tororo** - 另一个可爱模型
- **shizuku** - 清新风格
- **izumi** - 优雅风格
- **koharu** - 活泼风格
- **miku** - 初音未来
- **z16** - 舰娘风格

### 使用示例
```javascript
models: [
  {
    path: 'https://cdn.jsdelivr.net/gh/zenghongtu/live2d-model-assets@master/assets/hijiki/hijiki.model.json',
    position: [0, 60],
    scale: 0.08,
    stageStyle: { height: 450 }
  },
  {
    path: 'https://cdn.jsdelivr.net/gh/zenghongtu/live2d-model-assets@master/assets/tororo/tororo.model.json',
    position: [0, 60],
    scale: 0.08,
    stageStyle: { height: 450 }
  }
]
```

## 🎨 配置参数说明

### models 配置
- **path**: 模型文件路径（必需）
- **position**: 位置 [x, y]，默认 [0, 0]
- **scale**: 缩放比例，默认 0.1
- **stageStyle**: 舞台样式
  - **height**: 高度（像素）
  - **width**: 宽度（像素）

### tips 配置
- **style**: 提示框样式（CSS 属性）
- **idleTips**: 空闲提示
  - **message**: 提示消息数组
  - **duration**: 显示时长（毫秒）
  - **interval**: 间隔时间（毫秒）

### menus 配置
- **disable**: 是否禁用菜单
- **items**: 菜单项数组
  - **id**: 唯一标识
  - **icon**: 图标类名
  - **title**: 标题
  - **onClick**: 点击回调函数

## 🔄 迁移指南

如果你之前使用旧版 API，需要进行以下更改：

### 1. 更新 HTML
```html
<!-- 旧版 -->
<script src="https://cdn.jsdelivr.net/npm/oh-my-live2d@0.19.3/dist/index.min.js"></script>

<!-- 新版 -->
<script src="https://unpkg.com/oh-my-live2d@latest"></script>
```

### 2. 更新 JavaScript
```javascript
// 旧版
if (typeof OhMyLive2D !== 'undefined') {
  OhMyLive2D(config);
}

// 新版
if (typeof OML2D !== 'undefined' && typeof OML2D.loadOml2d === 'function') {
  OML2D.loadOml2d(config);
}
```

### 3. 配置对象保持不变
配置对象的结构基本保持不变，可以直接使用。

## 📝 更新日期
2024-11-09

## ✅ 当前状态
已更新到最新 API，使用 unpkg CDN 和 OML2D.loadOml2d 方法。
