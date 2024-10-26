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

    // 动态整背景颜色，加入颜色渐变
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
            { file: '親愛なるあなたは火葬.mp3', containerId: 'container21' },
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


// 为每个音器添加点击事监听器
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
                graphicElement.style.opacity = '1'; // 时显示
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

    // 修改这里：将 addCommentToGist 改为 addComment
    submitCommentButton.addEventListener('click', function() {
        const comment = commentInput.value.trim();
        const imageInput = document.getElementById('imageInput');
        const imageFile = imageInput.files[0];
        
        if (comment || imageFile) {
            addComment(comment, imageFile); // 使用正确的函数名
            commentInput.value = ''; // 清空输入框
            imageInput.value = ''; // 清空图片选择
            document.getElementById('imagePreview').innerHTML = ''; // 清空预览
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

// 修改加载评论函数
async function loadCommentsFromGist() {
    try {
        const response = await fetch(`https://api.github.com/gists/${GIST_ID}`, {
            headers: {
                'Authorization': `token ${GITHUB_TOKEN}`
            }
        });
        const data = await response.json();
        
        let comments = [];
        try {
            comments = JSON.parse(data.files['comments.json'].content);
        } catch (parseError) {
            console.error('JSON解析错误，重置评论:', parseError);
            comments = [];
            await updateGist([]);
        }
        
        displayComments(comments);
    } catch (error) {
        console.error('加载评论时出错:', error);
    }
}


// 修改显示评论的函数
function displayComments(comments) {
    const commentDisplay = document.getElementById('commentDisplay');
    commentDisplay.innerHTML = '';
    comments.forEach((comment, index) => {
        const commentElement = document.createElement('div');
        commentElement.className = 'comment-item';
        
        // 只使用简单的文本显示,不指定字体
        const textHtml = comment.text ? `<div class="comment-text">${comment.text}</div>` : '';
        
        commentElement.innerHTML = `
            <div class="comment-content">
                ${comment.image ? `<img src="${comment.image}" class="comment-image" alt="评论���片">` : ''}
                ${textHtml}
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
            
            // 只在存在文本元素时添加3D效果
            const text = commentElement.querySelector('.comment-text');
            if (text) {
                text.style.transform = `translateZ(20px) rotateX(${-rotateX * 1.5}deg) rotateY(${-rotateY * 1.5}deg)`;
            }
        });
        
        commentElement.addEventListener('mouseleave', () => {
            commentElement.style.transform = 'rotateX(0) rotateY(0) scale(1)';
            const content = commentElement.querySelector('.comment-content');
            content.style.transform = 'rotateX(0) rotateY(0)';
            
            // 同样检查文本元素是否存在
            const text = commentElement.querySelector('.comment-text');
            if (text) {
                text.style.transform = 'translateZ(0) rotateX(0) rotateY(0)';
            }
        });
    });
}

// 添加图片压缩函数
async function compressImage(file) {
    return new Promise((resolve) => {
        const reader = new FileReader();
        reader.onload = (e) => {
            const img = new Image();
            img.onload = () => {
                const canvas = document.createElement('canvas');
                let width = img.width;
                let height = img.height;
                
                // 计算压缩比例
                const maxSize = 800; // 最大尺寸
                if (width > height && width > maxSize) {
                    height *= maxSize / width;
                    width = maxSize;
                } else if (height > maxSize) {
                    width *= maxSize / height;
                    height = maxSize;
                }

                canvas.width = width;
                canvas.height = height;
                const ctx = canvas.getContext('2d');
                ctx.drawImage(img, 0, 0, width, height);
                
                // 压缩图片质量
                const compressedDataUrl = canvas.toDataURL('image/jpeg', 0.6);
                resolve(compressedDataUrl);
            };
            img.src = e.target.result;
        };
        reader.readAsDataURL(file);
    });
}

// 修改添加评论函数
async function addComment(comment, imageFile) {
    try {
        let imageUrl = '';
        if (imageFile) {
            // 检查文件大小
            if (imageFile.size > 5 * 1024 * 1024) {
                alert('图片太大，请选择小于5MB的图片');
                return;
            }
            imageUrl = await compressImage(imageFile);
        }

        const response = await fetch(`https://api.github.com/gists/${GIST_ID}`, {
            headers: {
                'Authorization': `token ${GITHUB_TOKEN}`
            }
        });
        const data = await response.json();
        let comments = [];
        try {
            comments = JSON.parse(data.files['comments.json'].content);
        } catch (error) {
            comments = [];
        }

        // 修改这里：确保评论文本为空字符串而不是undefined
        const sanitizedComment = comment ? comment.replace(/[\u0000-\u0008\u000B-\u000C\u000E-\u001F\uFFFD\uFFFE\uFFFF]/g, '') : '';

        comments.push({
            text: sanitizedComment, // 使用处理后的文本
            image: imageUrl,
            timestamp: new Date().toISOString()
        });

        await updateGist(comments);
        
        // 清空入
        document.getElementById('commentInput').value = '';
        document.getElementById('imageInput').value = '';
        document.getElementById('imagePreview').innerHTML = '';
        
        await loadCommentsFromGist();
    } catch (error) {
        console.error('添加评论时出错:', error);
        alert('添加评论失败，请稍后重试');
    }
}

// 修改更新Gist函数
async function updateGist(comments) {
    try {
        const sanitizedComments = comments.map(comment => ({
            text: String(comment.text || '').replace(/[\u0000-\u0008\u000B-\u000C\u000E-\u001F\uFFFD\uFFFE\uFFFF]/g, ''),
            image: comment.image || '',
            timestamp: comment.timestamp || new Date().toISOString()
        }));

        const content = JSON.stringify(sanitizedComments, null, 2);
        
        // 检查内容大小
        if (content.length > 900000) { // GitHub Gist 有大小限制
            throw new Error('评论内容太大，请删除一些旧评论');
        }

        const response = await fetch(`https://api.github.com/gists/${GIST_ID}`, {
            method: 'PATCH',
            headers: {
                'Authorization': `token ${GITHUB_TOKEN}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                files: {
                    'comments.json': {
                        content: content
                    }
                }
            })
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
    } catch (error) {
        console.error('更新Gist时出错:', error);
        throw error;
    }
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


// 为评论显示区域添加事件委托
document.getElementById('commentDisplay').addEventListener('click', function(event) {
    if (event.target.classList.contains('delete-comment')) {
        deleteComment(parseInt(event.target.getAttribute('data-index')));
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

// 在适当的地方调用showOverlay()来显覆盖层
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
};

const updateParticles = () => {
    particles.forEach((particle, index) => {
        const size = Math.random() * 5 + 1;
        const x = Math.random() * window.innerWidth;
        const y = Math.random() * window.innerHeight;
        const opacity = Math.random();
        particle.style.width = `${size}px`;
        particle.style.height = `${size}px`;
        particle.style.left = `${x}px`;
        particle.style.top = `${y}px`;
        particle.style.opacity = opacity;
        particle.style.transition = 'all 0.5s ease-out';
    });
};

setInterval(() => {
    createParticle();
    updateParticles();
}, 1000);

// 添加图片预览功能
document.getElementById('imageInput').addEventListener('change', function(event) {
    const file = event.target.files[0];
    if (file && file.type.startsWith('image/')) {
        const reader = new FileReader();
        reader.onload = function(e) {
            const preview = document.getElementById('imagePreview');
            preview.innerHTML = `<img src="${e.target.result}" alt="预图片">`;
        }
        reader.readAsDataURL(file);
    }
});

// 优化图片点击放大功能
function setupImageModal() {
    // 创建模态框元素
    const modal = document.createElement('div');
    modal.className = 'image-modal';
    document.body.appendChild(modal);

    // 为所有评论图片添加点击事件
    document.addEventListener('click', async function(e) {
        if (e.target.classList.contains('comment-image')) {
            const img = e.target;
            
            modal.innerHTML = `
                <div class="modal-content">
                    <img src="${img.src}" alt="放大图片">
                    <span class="close-modal">&times;</span>
                </div>
            `;
            
            // 重置任何可能的定位样式
            const modalContent = modal.querySelector('.modal-content');
            modalContent.style.transform = 'scale(0.8)';
            
            // 显示模态框
            modal.style.visibility = 'visible';
            requestAnimationFrame(() => {
                modal.classList.add('show');
                modalContent.classList.add('show');
            });
            
            document.body.style.overflow = 'hidden';
        }
    });

    // 关闭模态框的函数
    function closeModal() {
        const modalContent = modal.querySelector('.modal-content');
        modal.classList.remove('show');
        modalContent?.classList.remove('show');
        
        // 等待动画完成后隐藏
        setTimeout(() => {
            modal.style.visibility = 'hidden';
            document.body.style.overflow = '';
        }, 300);
    }

    // 点击模态框关闭
    modal.addEventListener('click', function(e) {
        if (e.target.classList.contains('image-modal') || 
            e.target.classList.contains('close-modal')) {
            closeModal();
        }
    });

    // ESC键关闭模态框
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && modal.classList.contains('show')) {
            closeModal();
        }
    });
}

// 在页面加载完成后初始化
document.addEventListener('DOMContentLoaded', setupImageModal);

// 修改键盘音效函数
const createKeySound = () => {
    const duration = 0.12; // 延长持续时间
    const sampleRate = audioContext.sampleRate;
    const buffer = audioContext.createBuffer(1, sampleRate * duration, sampleRate);
    const data = buffer.getChannelData(0);
    
    for (let i = 0; i < buffer.length; i++) {
        const t = i / sampleRate;
        
        // 主要的击键声 - 降低频率，增加厚重感
        const mainStrike = Math.sin(2 * Math.PI * 1200 * t) * Math.exp(-25 * t) * 0.8;
        
        // 键帽回弹声音
        const bounce = Math.sin(2 * Math.PI * 800 * t) * Math.exp(-20 * t) * 0.4;
        
        // 底部缓冲声音
        const cushion = (
            Math.sin(2 * Math.PI * 600 * t) * Math.exp(-15 * t) * 0.5 +   // 低频缓冲
            Math.sin(2 * Math.PI * 400 * t) * Math.exp(-10 * t) * 0.3     // 更低的频率
        );
        
        // 轻微的塑料外壳共振
        const case_resonance = Math.sin(2 * Math.PI * 300 * t) * Math.exp(-8 * t) * 0.2;
        
        // 非常轻微的机械噪声
        const noise = (Math.random() * 2 - 1) * Math.exp(-50 * t) * 0.05;
        
        // 组合所有声音成分
        data[i] = (mainStrike + bounce + cushion + case_resonance + noise) * 0.15;
    }
    
    const source = audioContext.createBufferSource();
    const gainNode = audioContext.createGain();
    const filterNode = audioContext.createBiquadFilter();
    
    // 添加低通滤波器使声音更圆润
    filterNode.type = 'lowpass';
    filterNode.frequency.value = 2000;
    filterNode.Q.value = 0.7;
    
    source.buffer = buffer;
    source.connect(filterNode);
    filterNode.connect(gainNode);
    gainNode.connect(audioContext.destination);
    
    // 更自然的音量包络
    gainNode.gain.setValueAtTime(0.08, audioContext.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.1);
    
    source.start();
};

// 为输入框添加音效
document.getElementById('commentInput').addEventListener('input', () => {
    createKeySound();
});

// 在页面加载完成后添加样式
document.addEventListener('DOMContentLoaded', () => {
    // 添加样式到 commentInput
    const commentInput = document.getElementById('commentInput');
    commentInput.style.resize = 'none'; // 禁用调整大小功能
});
