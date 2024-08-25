// 初始化音频播放器
const audios = [
  { file: 'AUTOMOTIVO BAYSIDE.mp3', containerId: 'container1' },
  { file: 'ONCE UPON A TIME.mp3', containerId: 'container2' },
  { file: 'AUTOMOTIVO BAYSIDE 2.0.mp3', containerId: 'container3' },
  { file: 'AUTOMOTIVO BAYSIDE 3.0.mp3', containerId: 'container4' }
].map(audioInfo => {
  const audio = new Audio(audioInfo.file);
  audio.loop = false;
  return { audio, container: document.querySelector(`#${audioInfo.containerId}`) };
});

// 绑定点击事件
function bindAudioClickEvents(audios) {
  audios.forEach(({ audio, container }) => {
    if (container) {
      container.addEventListener('click', function() {
        // 缓存其他音频对象
        const others = audios.filter(other => other.audio !== audio);
        others.forEach(other => other.audio.pause());

        if (audio.paused) {
          audio.currentTime = 0;
          audio.play();
        } else {
          audio.pause();
        }
      });
    }
  });
}

// 在DOM加载完成后执行
document.addEventListener('DOMContentLoaded', function() {
  bindAudioClickEvents(audios);

  // 如果还有其他DOM相关的初始化代码，可以放在这里
  const container2 = document.getElementById('container2');
  if (container2) {
    container2.addEventListener('click', function() {
      console.log('Container 2 clicked!');
      // 假设有一个与container2关联的显示/隐藏操作
      // toggleDisplay(document.querySelector('#someElementId'));
    });
  }
});

// 定义一个通用的显示/隐藏函数
function toggleDisplay(element) {
  if (element) {
    element.style.display = element.style.display === 'none' ? 'block' : 'none';
  }
}