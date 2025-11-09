// Live2D 配置文件
// 检测设备类型
const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);

// 只包含完整可用的模型
const modelPaths = [
  './live2d-models/models/Senko_Normals/senko.model3.json',
  './live2d-models/models/HK416-1-normal/model.json',
  './live2d-models/models/cat-white/model.json',
  './live2d-models/models/Pio/model.json',
  './live2d-models/models/bilibili-22/index.json',
  './live2d-models/models/bilibili-33/index.json',
  './live2d-models/models/haruto/haruto.model.json',
  './live2d-models/models/hibiki/hibiki.model.json',
  './live2d-models/models/koharu/model.json',
  './live2d-models/models/rem/model.json',
  './live2d-models/models/shizuku/shizuku.model.json',
  './live2d-models/models/shizuku_48/index.json',
  './live2d-models/models/shizuku_pajama/index.json',
  './live2d-models/models/z16/z16.model.json'
];

// 基础配置对象
const live2dConfig = {
  models: modelPaths.map(path => ({ 
    path,
    scale: 0.1,  // 统一模型缩放比例
    position: [0, 20],  // 统一模型位置 [x, y]
    stageStyle: {
      width: isMobile ? 450 : 450,  // 统一舞台宽度
      height: isMobile ? 500 : 500  // 统一舞台高度
    }
  })),
  // 错
  tips: {
    style: {
      width: isMobile ? 180 : 230,
      height: isMobile ? 60 : 70,
      left: '350px',     // 改为左侧
      top: '10px'       // 距离顶部 10px
    },
    idleTips: {
      message: [
        '欢迎来到我的音乐网站！',
        '点击我试试看~',
        '今天听什么音乐呢？',
        '让音乐陪伴你的每一天~'
      ],
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
      },
      {
        id: 'About',
        icon: 'icon-about',
        title: '关于',
        onClick() {
          window.open('https://github.com/oh-my-live2d/oh-my-live2d');
        }
      }
    ]
  },
  primaryColor: '#38B0DE',
  sayHello: true
};

// 初始化函数
function initLive2D() {
  console.log('尝试初始化 Live2D...');
  console.log('OML2D 类型:', typeof OML2D);
  
  try {
    // 检查 OML2D 是否成功加载
    if (typeof OML2D !== 'undefined' && typeof OML2D.loadOml2d === 'function') {
      console.log('OML2D 已加载，开始初始化...');
      OML2D.loadOml2d(live2dConfig);
      console.log('✅ Live2D 初始化成功！');
    } else {
      console.warn('⚠️ OML2D 未加载，Live2D 功能将被禁用');
      console.log('请检查：');
      console.log('1. 网络连接是否正常');
      console.log('2. CDN 是否可访问');
      console.log('3. 是否使用 HTTP 服务器（不是直接打开 HTML 文件）');
    }
  } catch (error) {
    console.error('❌ Live2D 初始化失败:', error);
    // 静默失败，不影响网站其他功能
  }
}

// 重试机制：尝试多次初始化
let retryCount = 0;
const maxRetries = 3;

function tryInitLive2D() {
  retryCount++;
  console.log(`Live2D 初始化尝试 ${retryCount}/${maxRetries}`);
  
  if (typeof OML2D !== 'undefined' && typeof OML2D.loadOml2d === 'function') {
    initLive2D();
  } else if (retryCount < maxRetries) {
    console.log(`OML2D 未就绪，${1000}ms 后重试...`);
    setTimeout(tryInitLive2D, 1000);
  } else {
    console.warn('⚠️ 已达到最大重试次数，Live2D 加载失败');
    console.log('故障排除建议：');
    console.log('1. 检查浏览器控制台的网络面板');
    console.log('2. 尝试访问: https://unpkg.com/oh-my-live2d@latest');
    console.log('3. 清除浏览器缓存后重试');
    console.log('4. 查看故障排除文档: .kiro/specs/live2d-integration/troubleshooting.md');
  }
}

// 延迟初始化，确保页面完全加载
if (document.readyState === 'loading') {
  // 页面还在加载中
  document.addEventListener('DOMContentLoaded', () => {
    console.log('DOM 已加载，准备初始化 Live2D...');
    setTimeout(tryInitLive2D, 500);
  });
} else {
  // 页面已经加载完成
  console.log('页面已加载，准备初始化 Live2D...');
  setTimeout(tryInitLive2D, 500);
}
