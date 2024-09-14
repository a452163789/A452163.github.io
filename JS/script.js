// 创建音频上下文和分析器
const audioContext = new (window.AudioContext || window.webkitAudioContext)();
const analyser = audioContext.createAnalyser();
analyser.fftSize = 32;
const frequencyData = new Uint8Array(analyser.frequencyBinCount);

// 异步创建媒体元素源并连接到分析器和音频上下文
async function createMediaElementSource(mediaElement) {
    await audioContext.resume();
    const source = audioContext.createMediaElementSource(mediaElement);
    source.connect(analyser).connect(audioContext.destination);
}

// 异步加载音频文件并返回音频对象和容器元素
async function loadAudioFiles(audioFiles) {
    return Promise.all(audioFiles.map(async fileInfo => {
        const audio = new Audio(fileInfo.file);
        audio.loop = true;
        await createMediaElementSource(audio);
        return { audio, container: document.getElementById(fileInfo.containerId) };
    }));
}

// 为每个音频容器添加点击事件监听器
function addEventListeners(audioContainers) {
    audioContainers.forEach(({ audio, container }) => {
        container?.addEventListener('click', () => {
            audioContext.resume().then(() => {
                audioContainers.forEach(item => item.audio.paused || item.audio === audio || item.audio.pause());
                audio.paused ? (audio.currentTime = 0) + audio.play() : audio.pause();
            });
        });
        audio.addEventListener('ended', () => (audio.currentTime = 0) + audio.play());
    });
}

// 获取页面中的图形元素
const graphicElement = document.querySelector('.g');

// 线性插值函数
function lerp(start, end, t) {
    return (1 - t) * start + t * end;
}

let currentValue = 0, lastUpdateTime = 0;
const updateInterval = 16;

// 动画循环函数
function animate(currentTime) {
    if (currentTime - lastUpdateTime >= updateInterval) {
        analyser.getByteFrequencyData(frequencyData);
        const averageFrequency = frequencyData.reduce((sum, value) => sum + value) / frequencyData.length;
        currentValue = Math.min(averageFrequency * 2.5, 999999);

        const currentWidth = parseFloat(graphicElement.style.width) || 0;
        const newWidth = lerp(currentWidth, currentValue, 0.1);

        graphicElement.style.width = `${newWidth}px`;
        graphicElement.style.height = `${newWidth}px`;
        graphicElement.style.backgroundColor = 'rgba(255, 255, 255, 0.5)';
        graphicElement.style.backdropFilter = 'blur(10px)';
        graphicElement.style.borderRadius = '50%';
        graphicElement.style.boxShadow = '0 0 10px rgba(0, 0, 0, 0.2)';

        lastUpdateTime = currentTime;
    }
    requestAnimationFrame(animate);
}


// 页面加载完成后执行初始化
document.addEventListener('DOMContentLoaded', async () => {
    const audioContainers = await loadAudioFiles([
        { file: 'AUTOMOTIVO BAYSIDE.mp3', containerId: 'container1' },
        { file: 'ONCE UPON A TIME.mp3', containerId: 'container2' },
        { file: 'AUTOMOTIVO BAYSIDE 2.0.mp3', containerId: 'container3' },
        { file: 'AUTOMOTIVO BAYSIDE 3.0.mp3', containerId: 'container4' },
        { file: 'ROMANCE GARBAGE.mp3', containerId: 'container5' },
        { file: 'I BELIEVE.mp3', containerId: 'container6' },
        { file: 'SWEET RALLY.mp3', containerId: 'container7' },
        { file: 'MY WAY.mp3', containerId: 'container8' },
        { file: 'CUTE.mp3', containerId: 'container9' },
        { file: 'ITS OKAY NOW.mp3', containerId: 'container10' },
        { file: 'III.mp3', containerId: 'container11' },
        { file: 'RASA SAYANG.mp3', containerId: 'container12' },
        { file: 'HEARTBEAT.mp3', containerId: 'container13' },
        { file: 'EU SENTO GABU.mp3', containerId: 'container14' },
        { file: '蜘蛛糸モノポリー.mp3', containerId: 'container15' },
        { file: 'ECLIPSE!.mp3', containerId: 'container16' },
        { file: 'GIGACHAD FUNK.mp3', containerId: 'container17' },
        { file: 'BRODYAGA FUNK.mp3', containerId: 'container18' },
        { file: 'SimpsonWave1995.mp3', containerId: 'container19' },
        { file: 'WE NEVER.mp3', containerId: 'container20' },
    ]);
    addEventListeners(audioContainers);
    animate();
});