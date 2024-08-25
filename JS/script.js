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

// 绑定点击事件
handleAudioClick('#container1', audio1, demo1);
handleAudioClick('#container2', audio2);
handleAudioClick('#container3', audio3);
handleAudioClick('#container4', audio4);
