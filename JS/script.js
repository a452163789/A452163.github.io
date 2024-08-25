// 音频播放器1
var audio1 = new Audio('⟪牢大の小曲⟫.mp3');
audio1.loop = true;
var demo1 = document.querySelector('#demo1');
document.querySelector('#container1').addEventListener('click', function() {
  if (audio1.paused) {
    audio1.currentTime = 0;
    audio1.play().catch(error => console.error('Error playing audio1:', error));
  } else {
    audio1.pause();
  }
  demo1.style.display = demo1.style.display === 'none' ? 'block' : 'none';
});

// 音频播放器2
var audio2 = new Audio('ONCE UPON A TIME.mp3');
audio2.loop = true;
document.querySelector('#container2').addEventListener('click', function() {
  if (audio2.paused) {
    audio2.currentTime = 0;
    audio2.play().catch(error => console.error('Error playing audio2:', error));
  } else {
    audio2.pause();
  }
  // 注意：这里没有与audio2相关联的canvas元素需要切换
  // 如果将来有，请在此处添加逻辑
});