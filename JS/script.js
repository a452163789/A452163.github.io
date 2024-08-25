// 音频播放器1
var audio1 = new Audio('AUTOMOTIVO BAYSIDE.mp3');
audio1.loop = true;
var demo1 = document.querySelector('#demo1');

// 音频播放器2
var audio2 = new Audio('ONCE UPON A TIME.mp3');
audio2.loop = true;

// 点击 #container1 时的处理
document.querySelector('#container1').addEventListener('click', function() {
  if (audio1.paused) {
    // 如果audio1是暂停的，则播放它并停止audio2
    if (!audio2.paused) {
      audio2.pause();
    }
    audio1.currentTime = 0;
    audio1.play().catch(error => console.error('Error playing audio1:', error));
  } else {
    audio1.pause();
  }
  demo1.style.display = demo1.style.display === 'none' ? 'block' : 'none';
});

// 点击 #container2 时的处理
document.querySelector('#container2').addEventListener('click', function() {
  if (audio2.paused) {
    // 如果audio2是暂停的，则播放它并停止audio1
    if (!audio1.paused) {
      audio1.pause();
    }
    audio2.currentTime = 0;
    audio2.play().catch(error => console.error('Error playing audio2:', error));
  } else {
    audio2.pause();
  }
  // 注意：这里没有与audio2相关联的canvas元素需要切换
  // 如果将来有，请在此处添加逻辑
});