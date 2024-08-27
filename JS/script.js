// 创建音频上下文和分析器
const audioContext = new (window.AudioContext || window.webkitAudioContext)();
const analyser = audioContext.createAnalyser();
analyser.fftSize = 256; // 减小FFT大小以提高稳定性
const bufferLength = analyser.frequencyBinCount;
const dataArray = new Uint8Array(bufferLength);

// 获取canvas元素并设置绘图环境
const canvas = document.getElementById('audioVisualization');
const ctx = canvas.getContext('2d');
let canvasWidth = window.innerWidth;
let canvasHeight = window.innerHeight;
canvas.width = canvasWidth;
canvas.height = canvasHeight;

// 绘制音频可视化
let frameId;
let lastDataArray = new Uint8Array(bufferLength);
let barWidth = (canvasWidth / bufferLength) * 2.154; // 只计算一次
let timeIncrement = 0.5; // 调整此值以控制速度，减小此值以放慢速度
let currentTime = 0; // 当前时间

// 定义roundRect函数
function roundRect(ctx, x, y, width, height, radius) {
    if (width < 2 * radius) radius = width / 2;
    if (height < 2 * radius) radius = height / 2;
    ctx.beginPath();
    ctx.moveTo(x + radius, y);
    ctx.arcTo(x + width, y, x + width, y + height, radius);
    ctx.arcTo(x + width, y + height, x, y + height, radius);
    ctx.arcTo(x, y + height, x, y, radius);
    ctx.arcTo(x, y, x + width, y, radius);
    ctx.closePath();
    ctx.fill();
}

function drawAudioVisualization() {
    analyser.getByteFrequencyData(dataArray);
  
    // 清除画布
    ctx.clearRect(0, 0, canvasWidth, canvasHeight);
  
    let x = 0;
    currentTime += timeIncrement; // 更新当前时间
  
    for (let i = 0; i < bufferLength; i++) {
      let barHeight = dataArray[i] * 2.05; // 增大放大因子
  
      // 动态颜色渐变，引入时间因素
      const hue = (i / bufferLength) * 360 + currentTime * 2.5; // 使用HSL颜色模式，色调从0到360，并随时间变化
      const barColor = `hsl(${hue % 360}, 100%, 80%)`; // 饱和度100%，亮度50%
  
      // 创建径向辉光效果
      const gradient = ctx.createRadialGradient(x + barWidth / 2, canvasHeight - barHeight, 0, x + barWidth / 2, canvasHeight - barHeight, barHeight / 2);
      gradient.addColorStop(0, barColor);
      gradient.addColorStop(1, 'rgba(0,0,0,0)'); // 透明度为0，形成辉光效果
  
      // 设置亚克力材质效果
      ctx.globalAlpha = 0.8; // 设置透明度，模拟亚克力材质
  
      // 绘制条形
      ctx.fillStyle = gradient;
      roundRect(ctx, x, canvasHeight - barHeight, barWidth, barHeight, 5); // 添加圆角
  
      // 添加发光效果
      ctx.shadowColor = barColor; // 动态调整阴影颜色
      ctx.shadowBlur = 15; // 增加模糊度以增强辉光效果
      ctx.shadowOffsetX = 0;
      ctx.shadowOffsetY = 0;
  
      x += barWidth + 1;
    }
  
    // 更新lastDataArray
    lastDataArray.set(dataArray);
    frameId = requestAnimationFrame(drawAudioVisualization);
  }
  


// 停止绘制音频可视化
function stopDrawAudioVisualization() {
    cancelAnimationFrame(frameId);
}

// 将音频源连接到分析器
function connectAudioSource(audio, analyser) {
    const source = audioContext.createMediaElementSource(audio);
    source.connect(analyser);
    analyser.connect(audioContext.destination);
}

// 初始化音频播放器时，连接音频源到分析器
function initializeAudios(audioConfigs) {
    return audioConfigs.map(audioInfo => {
        const audio = new Audio(audioInfo.file);
        audio.loop = true;
        connectAudioSource(audio, analyser); // 连接音频源到分析器
        return { audio, container: document.querySelector(`#${audioInfo.containerId}`) };
    });
}

// 绑定点击事件
function bindAudioClickEvents(audios) {
    audios.forEach(({ audio, container }) => {
        if (container) {
            container.addEventListener('click', function() {
                const others = audios.filter(other => other.audio !== audio);
                others.forEach(other => other.audio.pause());

                if (audio.paused) {
                    audio.currentTime = 0;
                    audio.play();
                } else {
                    audio.pause();
                }
            });

            audio.addEventListener('ended', function() {
                audio.currentTime = 0;
                audio.play();
            });
        }
    });
}

// 在DOM加载完成后执行
document.addEventListener('DOMContentLoaded', function() {
    const audios = initializeAudios([
        { file: 'AUTOMOTIVO BAYSIDE.mp3', containerId: 'container1' },
        { file: 'ONCE UPON A TIME.mp3', containerId: 'container2' },
        { file: 'AUTOMOTIVO BAYSIDE 2.0.mp3', containerId: 'container3' },
        { file: 'AUTOMOTIVO BAYSIDE 3.0.mp3', containerId: 'container4' },
        { file: 'ROMANCE GARBAGE.mp3', containerId: 'container5' },
        { file: 'I BELIEVE.mp3', containerId: 'container6' }
    ]);

    bindAudioClickEvents(audios);

    // 开始绘制音频可视化
    drawAudioVisualization();
});

// 当需要停止动画时，可以调用 stopDrawAudioVisualization();