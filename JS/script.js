// 创建音频上下文
const audioContext = new (window.AudioContext || window.webkitAudioContext)();

// 音频播放器1
var audio1 = new Audio('AUTOMOTIVO BAYSIDE.mp3');
audio1.loop = true;
var demo1 = document.querySelector('#demo1');

// 音频播放器2
var audio2 = new Audio('ONCE UPON A TIME.mp3');
audio2.loop = true;

// 音频播放器3
var audio3 = new Audio('AUTOMOTIVO BAYSIDE 2.0.mp3');
audio3.loop = true;

// 音频播放器4
var audio4 = new Audio('AUTOMOTIVO BAYSIDE 3.0.mp3');
audio4.loop = true;

// 点击事件处理函数
function handleAudioClick(containerId, audio, toggleElement) {
  document.querySelector(containerId).addEventListener('click', function() {
    pauseAllExcept(audio);
    togglePlayPause(audio);
    toggleDisplay(toggleElement);
    visualize(audio);
  });
}

// 处理音频播放和暂停
function togglePlayPause(audio) {
  if (audio.paused) {
    audio.currentTime = 0;
    audio.play().catch(error => console.error(`Error playing ${audio.src}:`, error));
  } else {
    audio.pause();
  }
}

// 暂停除了指定音频之外的所有音频
function pauseAllExcept(audioToPlay) {
  [audio1, audio2, audio3, audio4].forEach(audio => {
    if (audio !== audioToPlay && !audio.paused) {
      audio.pause();
    }
  });
}

// 切换DOM元素的显示状态
function toggleDisplay(element) {
  if (element) {
    element.style.display = element.style.display === 'none' ? 'block' : 'none';
  }
}

// 可视化音频
function visualize(audio) {
  const canvas = document.querySelector('canvas');
  canvas.width = window.innerWidth; // 设置Canvas宽度为窗口宽度
  canvas.height = 200; // 设置合适的高度
  const ctx = canvas.getContext('2d');
  const source = audioContext.createMediaElementSource(audio);
  const analyser = audioContext.createAnalyser();

  source.connect(analyser);
  analyser.connect(audioContext.destination);

  analyser.fftSize = 256;
  const bufferLength = analyser.frequencyBinCount;
  const dataArray = new Uint8Array(bufferLength);

  function draw() {
    requestAnimationFrame(draw);
    analyser.getByteFrequencyData(dataArray);
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = 'rgb(0, 0, 0)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    const barWidth = (canvas.width / bufferLength) * 2.5;
    let barHeight;
    let x = 0;

    for (let i = 0; i < bufferLength; i++) {
      barHeight = dataArray[i];
      ctx.fillStyle = 'rgb(' + (barHeight + 100) + ',50,50)';
      ctx.fillRect(x, canvas.height - barHeight / 2, barWidth, barHeight / 2);
      x += barWidth + 1;
    }
  }

  draw();
}

// 绑定点击事件
handleAudioClick('#container1', audio1, demo1);
handleAudioClick('#container2', audio2);
handleAudioClick('#container3', audio3);
handleAudioClick('#container4', audio4);
