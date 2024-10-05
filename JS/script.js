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

    // 插值效果
    graphicElement.style.width = `${lerp(currentWidth, currentValue, 0.2)}px`; // 插值系数调整为0.2
    graphicElement.style.height = graphicElement.style.width; // 维持正方形

    // 计算新的 transform，增加右偏移量和旋转效果
    graphicElement.style.position = 'fixed'; // 使用 fixed 定位
    graphicElement.style.transform = `translate(-50%, -50%) translateX(0px) scale(${1 + averageFrequency / 1000}) rotate(${averageFrequency / 0.2}deg)`;

    // 动态调整背景颜色，加入颜色渐变
    const colorFactor = Math.min(255, averageFrequency * 2);
    const bgColor = `rgba(${colorFactor}, 100, ${255 - colorFactor}, 0.5)`;
    graphicElement.style.backgroundColor = bgColor;

    // 添加波纹效果，动态调整阴影
    graphicElement.style.boxShadow = `0 0 ${Math.min(25, colorFactor)}px rgba(0, 0, 0, 0.5), 0 0 ${Math.min(35, colorFactor)}px rgba(173, 216, 230, 0.6)`;

    // 动态边框样式，调整边框宽度
    graphicElement.style.border = `5px solid rgba(${colorFactor}, 100, 150, 0.7)`;

    // 添加活力效果，增加旋转速度
    graphicElement.style.transition = 'transform 0.1s ease-in-out, opacity 0.5s ease-in-out';
    graphicElement.style.transform = `translate(-50%, -50%) translateX(0px) scale(${1 + averageFrequency / 1000}) rotate(${averageFrequency / 0.2}deg)`;

    // 动态调整透明度
    graphicElement.style.opacity = averageFrequency > 50 ? '1' : '0.5';

    requestAnimationFrame(animate);
};


// 保存内容函数
const saveContent = (content) => {
    let savedContents = JSON.parse(localStorage.getItem('savedContents')) || [];
    savedContents.push(content);
    localStorage.setItem('savedContents', JSON.stringify(savedContents));
};


// 加载并显示已保存的内容
const loadSavedContent = () => {
    const savedContents = JSON.parse(localStorage.getItem('savedContents')) || [];
    const savedContentDiv = document.getElementById('savedContent');
    savedContentDiv.innerHTML = ''; // 清空已有内容
    savedContents.forEach(content => {
        const contentElement = document.createElement('p');
        contentElement.textContent = content;
        savedContentDiv.appendChild(contentElement);
    });
};


// 页面加载完成后执行初始化
document.addEventListener('DOMContentLoaded', async () => {
    try {
        // 确保在加载完后进行初始化
        graphicElement.style.width = '0px'; // 初始宽度
        graphicElement.style.height = '0px'; // 初始高度
        graphicElement.style.opacity = '0'; // 初始为透明

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


// 为每个音器添加点击事件监听器
const addEventListeners = (audioContainers) => {
    audioContainers.forEach(({ audio, container }) => {
        container?.addEventListener('click', async () => {
            try {
                await audioContext.resume(); // 确保音频上下文已经恢复

                // 暂停其他音频
                audioContainers.forEach(item => {
                    if (item.audio !== audio) {
                        item.audio.pause();
                        item.audio.currentTime = 0; // 重置其他音频播放时间
                        graphicElement.style.opacity = '0'; // 设为透明
                    }
                });

                // 切换播放状态
                if (audio.paused) {
                    audio.currentTime = 0; // 重置播放时间
                    audio.play().then(() => {
                        graphicElement.style.opacity = '1'; // 播放音频时显示
                    }).catch(error => console.error("播放音频时出错:", error));
                } else {
                    audio.pause(); // 暂停当前音频
                    // 只设置透明度
                    graphicElement.style.opacity = '0'; // 隐藏元素
                }
            } catch (error) {
                console.error("播放:", error);
            }
        });
        
        // 音频结束时重置并重新播放
        audio.addEventListener('ended', () => {
            audio.currentTime = 0; // 重置播放时间
            audio.play().then(() => {
                graphicElement.style.opacity = '1'; // 播放时显示
            }).catch(error => console.error("重播音频时出错:", error));
        });
    });
};


import { GIST_ID, GITHUB_TOKEN } from './config.js';

window.onload = function() {
    const introPopup = document.getElementById('introPopup');
    const closePopupButton = document.getElementById('closePopup');
    const commentInput = document.getElementById('commentInput');
    const submitCommentButton = document.getElementById('submitComment');
    const commentDisplay = document.getElementById('commentDisplay');

    // 显示弹出框并禁用滚动
    introPopup.classList.add('show');
    document.body.classList.add('no-scroll');

    // 关闭弹出框并重新启用滚动
    closePopupButton.addEventListener('click', function() {
        introPopup.classList.remove('show');
        document.body.classList.remove('no-scroll');

        setTimeout(() => {
            introPopup.style.visibility = 'hidden';
        }, 500);
    });

    // 提评论
    submitCommentButton.addEventListener('click', function() {
        const comment = commentInput.value.trim();
        if (comment) {
            addCommentToGist(comment);
            commentInput.value = ''; // 清空输入框
        }
    });

    // 加载评论
    loadCommentsFromGist();

    // 在适当的地方（比如页面加载完成后）显示 overlayContainer
    document.getElementById('overlayContainer').classList.add('show');

    // 在关闭按钮的点击事件中隐藏 overlayContainer
    document.getElementById('closePopup').addEventListener('click', function() {
        document.getElementById('overlayContainer').classList.remove('show');
    });
};

// 加载评论
function loadCommentsFromGist() {
    fetch(`https://api.github.com/gists/${GIST_ID}`, {
        headers: {
            'Authorization': `token ${GITHUB_TOKEN}`
        }
    })
    .then(response => response.json())
    .then(data => {
        const comments = JSON.parse(data.files['comments.json'].content);
        displayComments(comments);
    })
    .catch(error => console.error('加载评论时出错:', error));
}


// 修改显示评论的函数
function displayComments(comments) {
    const commentDisplay = document.getElementById('commentDisplay');
    commentDisplay.innerHTML = '';
    comments.forEach((comment, index) => {
        const commentElement = document.createElement('div');
        commentElement.className = 'comment-item';
        commentElement.innerHTML = `
            <div class="comment-content">
                <span class="comment-text">${comment}</span>
                <button class="delete-comment" data-index="${index}">删除</button>
            </div>
        `;
        commentElement.style.opacity = '0';
        commentElement.style.transform = 'rotateX(-90deg) translateY(30px)';
        commentDisplay.appendChild(commentElement);
        
        requestAnimationFrame(() => {
            commentElement.classList.add('comment-new');
        });
        
        commentElement.addEventListener('mousemove', (e) => {
            const rect = commentElement.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            const rotateX = (y - centerY) / 10;
            const rotateY = (centerX - x) / 10;
            
            commentElement.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.05)`;
            
            const content = commentElement.querySelector('.comment-content');
            content.style.transform = `rotateX(${-rotateX}deg) rotateY(${-rotateY}deg)`;
            
            // 为文字添加额外的3D效果
            const text = commentElement.querySelector('.comment-text');
            text.style.transform = `translateZ(20px) rotateX(${-rotateX * 1.5}deg) rotateY(${-rotateY * 1.5}deg)`;
        });
        
        commentElement.addEventListener('mouseleave', () => {
            commentElement.style.transform = 'rotateX(0) rotateY(0) scale(1)';
            const content = commentElement.querySelector('.comment-content');
            content.style.transform = 'rotateX(0) rotateY(0)';
            const text = commentElement.querySelector('.comment-text');
            text.style.transform = 'translateZ(0) rotateX(0) rotateY(0)';
        });
    });
}

// 添加评论
function addComment(comment) {
    fetch(`https://api.github.com/gists/${GIST_ID}`, {
        method: 'GET',
        headers: {
            'Authorization': `token ${GITHUB_TOKEN}`
        }
    })
    .then(response => response.json())
    .then(data => {
        const comments = JSON.parse(data.files['comments.json'].content);
        comments.push(comment);
        return updateGist(comments);
    })
    .then(() => loadCommentsFromGist())
    .catch(error => console.error('添加评论时出错:', error));
}


// 修改删除论的函数
function deleteComment(index) {
    const commentElement = document.querySelector(`[data-index="${index}"]`).parentNode;
    commentElement.classList.add('comment-delete');
    
    setTimeout(() => {
        fetch(`https://api.github.com/gists/${GIST_ID}`, {
            method: 'GET',
            headers: {
                'Authorization': `token ${GITHUB_TOKEN}`
            }
        })
        .then(response => response.json())
        .then(data => {
            const comments = JSON.parse(data.files['comments.json'].content);
            comments.splice(index, 1);
            return updateGist(comments);
        })
        .then(() => loadCommentsFromGist())
        .catch(error => console.error('删除评论时出错:', error));
    }, 600); // 匹配动画持续时间
}


// 更新 Gist
function updateGist(comments) {
    return fetch(`https://api.github.com/gists/${GIST_ID}`, {
        method: 'PATCH',
        headers: {
            'Authorization': `token ${GITHUB_TOKEN}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            files: {
                'comments.json': { content: JSON.stringify(comments) }
            }
        })
    });
}

// 为评论显示区域添加事件委托
document.getElementById('commentDisplay').addEventListener('click', function(event) {
    if (event.target.classList.contains('delete-comment')) {
        deleteComment(parseInt(event.target.getAttribute('data-index')));
    }
});

// 修改提交评论按钮的事件监听器
document.getElementById('submitComment').addEventListener('click', function() {
    const commentInput = document.getElementById('commentInput');
    const comment = commentInput.value.trim();
    if (comment) {
        addComment(comment);
        commentInput.value = ''; // 清空输入框
    }
});

// 显示overlayContainer
function showOverlay() {
    document.getElementById('overlayContainer').classList.add('show');
}

// 隐藏overlayContainer
function hideOverlay() {
    document.getElementById('overlayContainer').classList.remove('show');
}

// 在适当的地方调用showOverlay()来显示覆盖层
// 例如,页面加载完成后或点击某个按钮时

// 为关闭按钮添加点击事件
document.getElementById('closePopup').addEventListener('click', hideOverlay);

function toggleIntroPopup() {
    const popup = document.getElementById('introPopup');
    popup.classList.toggle('show');
}

document.getElementById('closePopup').addEventListener('click', toggleIntroPopup);

// 在需要显示自我介绍弹窗的地方调用 toggleIntroPopup()

// 鼠标移动事件监听器，增强视差效果
document.addEventListener('mousemove', (e) => {
    const { clientX, clientY } = e;
    const centerX = window.innerWidth / 2;
    const centerY = window.innerHeight / 2;
    const rotateX = (clientY - centerY) / 50;
    const rotateY = (centerX - clientX) / 50;

    graphicElement.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
});

// 粒子效果
const particles = [];
const createParticle = () => {
    const particle = document.createElement('div');
    particle.className = 'particle';
    document.body.appendChild(particle);
    particles.push(particle);

    // 设置粒子的初始位置和大小
    const size = Math.random() * 10 + 5; // 增大粒子大小
    const x = Math.random() * window.innerWidth;
    const y = Math.random() * window.innerHeight;
    particle.style.width = `${size}px`;
    particle.style.height = `${size}px`;
    particle.style.left = `${x}px`;
    particle.style.top = `${y}px`;
    particle.style.opacity = Math.random();
    particle.style.transition = 'all 1s ease-out'; // 增加过渡时间

    // 添加光晕效果
    particle.style.boxShadow = `0 0 ${size * 2}px rgba(255, 255, 255, 0.8)`;
};

// 动态更新粒子位置
const updateParticles = () => {
    particles.forEach((particle) => {
        const x = Math.random() * window.innerWidth;
        const y = Math.random() * window.innerHeight;
        particle.style.left = `${x}px`;
        particle.style.top = `${y}px`;
    });
};

// 动态背景渐变
const updateBackgroundGradient = () => {
    const color1 = `rgba(${Math.random() * 255}, ${Math.random() * 255}, ${Math.random() * 255}, 0.5)`;
    const color2 = `rgba(${Math.random() * 255}, ${Math.random() * 255}, ${Math.random() * 255}, 0.5)`;
    document.body.style.background = `linear-gradient(45deg, ${color1}, ${color2})`;
};

// 定时更新背景和粒子
setInterval(() => {
    createParticle();
    updateParticles();
    updateBackgroundGradient();
}, 2000);