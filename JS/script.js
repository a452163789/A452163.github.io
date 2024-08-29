// 创建音频上下文和分析器
const audioContext = new AudioContext(); // 创建一个新的音频上下文
const analyser = audioContext.createAnalyser(); // 创建一个分析器节点
analyser.fftSize = 32; // 设置快速傅里叶变换的大小
const frequencyBinCount = analyser.frequencyBinCount; // 获取频率数据的数量
const frequencyData = new Uint8Array(frequencyBinCount); // 创建一个用于存储频率数据的数组

// 创建媒体元素源并连接到分析器和音频上下文
function createMediaElementSource(mediaElement) {
    const source = audioContext.createMediaElementSource(mediaElement); // 创建媒体元素源
    source.connect(analyser); // 将媒体元素源连接到分析器
    analyser.connect(audioContext.destination); // 将分析器连接到音频上下文的输出
}

// 加载音频文件并返回音频对象和容器元素
function loadAudioFiles(audioFiles) {
    return audioFiles.map(fileInfo => { // 遍历音频文件信息数组
        const audio = new Audio(fileInfo.file); // 创建一个新的音频对象
        audio.loop = true; // 设置音频循环播放
        createMediaElementSource(audio); // 创建媒体元素源并连接到分析器
        return {
            audio: audio, // 返回音频对象
            container: document.querySelector(`#${fileInfo.containerId}`) // 返回对应的容器元素
        };
    });
}

// 为每个音频容器添加点击事件监听器
function addEventListeners(audioContainers) {
    audioContainers.forEach(({ audio, container }) => { // 遍历音频容器数组
        if (container) { // 如果容器存在
            container.addEventListener('click', () => { // 为容器添加点击事件监听器
                audioContext.resume().then(() => { // 恢复音频上下文
                    audioContainers.filter(item => item.audio !== audio).forEach(item => item.audio.pause()); // 暂停其他音频
                    if (audio.paused) { // 如果当前音频暂停
                        audio.currentTime = 0; // 重置音频播放时间
                        audio.play(); // 播放音频
                    } else {
                        audio.pause(); // 暂停音频
                    }
                });
            });
            audio.addEventListener('ended', () => { // 为音频添加结束事件监听器
                audio.currentTime = 0; // 重置音频播放时间
                audio.play(); // 重新播放音频
            });
        }
    });
}

// 获取页面中的图形元素
const graphicElement = document.querySelector('.g'); // 获取图形元素

// 线性插值函数
function lerp(start, end, t) {
    return (1 - t) * start + t * end; // 计算线性插值
}

let currentValue = 0; // 当前值

// 动画循环函数
function animate() {
    analyser.getByteFrequencyData(frequencyData); // 获取频率数据
    let averageFrequency = frequencyData.reduce((sum, value) => sum + value, 0) / frequencyBinCount; // 计算平均频率
    const maxValue = 999999; // 最大值
    currentValue = Math.min(averageFrequency * 2.5, maxValue); // 更新当前值

    let currentWidth = parseFloat(graphicElement.style.width) || 0; // 获取当前宽度
    let newWidth = lerp(currentWidth, currentValue, 0.1); // 计算新的宽度

    graphicElement.style.width = `${newWidth}px`; // 设置图形元素的宽度
    graphicElement.style.height = `${newWidth}px`; // 设置图形元素的高度
    graphicElement.style.backgroundColor = 'rgba(255, 255, 255, 0.5)'; // 设置背景颜色
    graphicElement.style.backdropFilter = 'blur(10px)'; // 设置背景模糊效果
    graphicElement.style.borderRadius = '50%'; // 设置边框圆角
    graphicElement.style.boxShadow = '0 0 10px rgba(0, 0, 0, 0.2)'; // 设置阴影效果

    requestAnimationFrame(animate); // 请求下一帧动画
}

// 页面加载完成后执行初始化
document.addEventListener('DOMContentLoaded', () => {
    const audioContainers = loadAudioFiles([ // 加载音频文件
        { file: 'AUTOMOTIVO BAYSIDE.mp3', containerId: 'container1' },
        { file: 'ONCE UPON A TIME.mp3', containerId: 'container2' },
        { file: 'AUTOMOTIVO BAYSIDE 2.0.mp3', containerId: 'container3' },
        { file: 'AUTOMOTIVO BAYSIDE 3.0.mp3', containerId: 'container4' },
        { file: 'ROMANCE GARBAGE.mp3', containerId: 'container5' },
        { file: 'I BELIEVE.mp3', containerId: 'container6' },
        { file: 'SWEET RALLY.mp3', containerId: 'container7' },
        { file: 'MY WAY.mp3', containerId: 'container8' }
    ]);
    addEventListeners(audioContainers); // 为音频容器添加事件监听器
    animate(); // 开始动画循环
});
