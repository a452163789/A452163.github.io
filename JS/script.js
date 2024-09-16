// 创建音频上下文和分析器
const audioContext = new (window.AudioContext || window.webkitAudioContext)();
const analyser = audioContext.createAnalyser();
analyser.fftSize = 32768; // 提高FFT大小以获取更多频率数据
const frequencyData = new Uint8Array(analyser.frequencyBinCount);

// 异步创建媒体元素源并连接到分析器和音频上下文
const createMediaElementSource = async (mediaElement) => {
    try {
        await audioContext.resume();
        const source = audioContext.createMediaElementSource(mediaElement);
        source.connect(analyser).connect(audioContext.destination);
        return source;
    } catch (error) {
        console.error("创建媒体元素源时出错:", error);
        throw error; // 抛出错误以便调用处处理
    }
};

// 异步加载音频文件并返回音频对象和容器元素
const loadAudioFiles = async (audioFiles) => {
    try {
        const audioPromises = audioFiles.map(async ({ file, containerId }) => {
            const audio = new Audio(file);
            audio.loop = true;
            await createMediaElementSource(audio);
            return { audio, container: document.getElementById(containerId) };
        });
        return await Promise.all(audioPromises);
    } catch (error) {
        console.error("加载音频文件时出错:", error);
        return []; // 确保总是返回一个数组以避免后续错误
    }
};

// 为每个音频容器添加点击事件监听器
const addEventListeners = (audioContainers) => {
    audioContainers.forEach(({ audio, container }) => {
        container?.addEventListener('click', async () => {
            try {
                await audioContext.resume(); // 确保音频上下文已经恢复

                // 暂停其他音频
                audioContainers.forEach(item => item.audio !== audio && item.audio.pause());

                // 切换播放状态
                if (audio.paused) {
                    audio.currentTime = 0; // 重置播放时间
                    audio.play().catch(error => console.error("播放音频时出错:", error));
                } else {
                    audio.pause(); // 暂停当前音频
                }
            } catch (error) {
                console.error("播放音频时出错:", error);
            }
        });
        
        // 音频结束时重置并重新播放
        audio.addEventListener('ended', () => {
            audio.currentTime = 0; // 重置播放时间
            audio.play().catch(error => console.error("重播音频时出错:", error));
        });
    });
};

// 获取页面中的图形元素
const graphicElement = document.querySelector('.g');

// 线性插值函数
const lerp = (start, end, t) => (1 - t) * start + t * end;

// 动画循环函数
const animate = () => {
    analyser.getByteFrequencyData(frequencyData);
    const averageFrequency = frequencyData.reduce((sum, value) => sum + value, 0) / frequencyData.length;

    // 使用 Math.min 限制 currentValue
    const currentValue = Math.min(averageFrequency * 2.5, 999999);

    const currentWidth = parseFloat(graphicElement.style.width) || 0;
    graphicElement.style.width = `${lerp(currentWidth, currentValue, 0.1)}px`;
    graphicElement.style.height = graphicElement.style.width; // 维持正方形
    graphicElement.style.backgroundColor = `rgba(${Math.min(255, averageFrequency * 2)}, 100, 150, 0.5)`; // 根据频率变化颜色
    graphicElement.style.cssText += 'backdrop-filter: blur(10px); border-radius: 50%; box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);'; // 提升性能

    requestAnimationFrame(animate);
};

// 页面加载完成后执行初始化
document.addEventListener('DOMContentLoaded', async () => {
    try {
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
        
        if (audioContainers.length > 0) {
            addEventListeners(audioContainers);
            animate(); // 启动动画
        } else {
            throw new Error("音频容器加载失败");
        }
    } catch (error) {
        console.error("初始化时出错:", error);
    }
});
