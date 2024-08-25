// 创建音频上下文（若需使用Web Audio API，则保留此行代码，否则可移除）
const audioContext = new (window.AudioContext || window.webkitAudioContext)();

// 初始化音频播放器并设置循环播放
const audios = [
  { file: 'AUTOMOTIVO BAYSIDE.mp3', elementId: 'demo1' },
  { file: 'ONCE UPON A TIME.mp3', elementId: 'demo2' },
  { file: 'AUTOMOTIVO BAYSIDE 2.0.mp3', elementId: 'demo3' },
  { file: 'AUTOMOTIVO BAYSIDE 3.0.mp3', elementId: 'demo4' }
].map(audioInfo => {
  const audio = new Audio(audioInfo.file);
  audio.loop = true;
  return { audio, element: document.querySelector(`#${audioInfo.elementId}`) };
});

// 点击事件处理函数
function handleAudioClick(containerId, { audio, element }) {
  const container = document.querySelector(containerId);
  if (container) {
    container.addEventListener('click', function() {
      pauseAllExcept(audio);
      togglePlayPause(audio);
      if (element) toggleDisplay(element);
    });
  }
}

// 绑定点击事件
audios.forEach(({ audio, element }, index) => {
  handleAudioClick(`#container${index + 1}`, { audio, element });
});

// 定义 togglePlayPause 函数
function togglePlayPause(audio) {
  if (audio.paused) {
    audio.play();
  } else {
    audio.pause();
  }
}

// 定义 toggleDisplay 函数
function toggleDisplay(element) {
  element.style.display = element.style.display === 'none' ? 'block' : 'none';
}

// 定义 pauseAllExcept 函数
function pauseAllExcept(currentAudio) {
  audios.forEach(({ audio }) => {
    if (audio !== currentAudio) {
      audio.pause();
    }
  });
}

// 确保在DOM加载完成后绑定点击事件
document.addEventListener('DOMContentLoaded', function() {
  var container2 = document.getElementById('container2');
  if (container2) {
    container2.addEventListener('click', showCanvas);
  }
});

// 省略了其他未修改的函数...
