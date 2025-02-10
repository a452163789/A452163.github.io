function init() {
    // 创建一个 div 元素
    const div = document.createElement('div');
    div.className = 'curzr-arrow-pointer';
    div.hidden = true;  // 根据需要，这里可以设置为 false 来显示元素
    // 设置 div 的内部 HTML
    div.innerHTML = `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32">
        <path class="inner" d="M25,30a5.82,5.82,0,0,1-1.09-.17l-.2-.07-7.36-3.48a.72.72,0,0,0-.35-.08.78.78,0,0,0-.33.07L8.24,29.54a.66.66,0,0,1-.2.06,5.17,5.17,0,0,1-1,.15,3.6,3.6,0,0,1-3.29-5L12.68,4.2a3.59,3.59,0,0,1,6.58,0l9,20.74A3.6,3.6,0,0,1,25,30Z" fill="#F2F5F8" />
        <path class="outer" d="M16,3A2.59,2.59,0,0,1,18.34,4.6l9,20.74A2.59,2.59,0,0,1,25,29a5.42,5.42,0,0,1-.86-.15l-7.37-3.48a1.84,1.84,0,0,0-.77-.17,1.69,1.69,0,0,0-.73.16l-7.4,3.31a5.89,5.89,0,0,1-.79.12,2.59,2.59,0,0,1-2.37-3.62L13.6,4.6A2.58,2.58,0,0,1,16,3m0-2h0A4.58,4.58,0,0,0,11.76,3.8L2.84,24.33A4.58,4.58,0,0,0,7,30.75a6.08,6.08,0,0,0,1.21-.17,1.87,1.87,0,0,0,.4-.13L16,27.18l7.29,3.44a1.64,1.64,0,0,0,.39.14A6.37,6.37,0,0,0,25,31a4.59,4.59,0,0,0,4.21-6.41l-9-20.75A4.62,4.62,0,0,0,16,1Z" fill="#111920" />
    </svg>
    `;
    // 将 div 添加到 body 的末尾
    document.body.appendChild(div);

    class ArrowPointer {
        constructor() {
            this.root = document.body;
            this.cursor = document.querySelector(".curzr-arrow-pointer");

            this.position = {
                distanceX: 0,
                distanceY: 0,
                distance: 0,
                pointerX: 0,
                pointerY: 0,
            };
            this.previousPointerX = 0;
            this.previousPointerY = 0;
            this.angle = 0;
            this.previousAngle = 0;
            this.angleDisplace = 0;
            this.degrees = 57.296;  // 角度转换系数，从弧度到度
            this.cursorSize = 20;  // 游标尺寸

            this.cursorStyle = {
                boxSizing: 'border-box',
                position: 'fixed',
                top: '0',
                left: '0',
                width: `${this.cursorSize}px`,
                height: `${this.cursorSize}px`,
                transition: '250ms, transform 100ms',
                userSelect: 'none',
                pointerEvents: 'none'
            };

            // 添加物理属性
            this.velocity = { x: 0, y: 0 };  // 速度
            this.target = { x: 0, y: 0 };    // 目标位置
            this.springStrength = 0.1;        // 弹簧强度
            this.damping = 0.7;              // 阻尼系数
            this.mass = 1;                   // 质量

            this.init();

            // 启动动画循环
            this.animate = this.animate.bind(this);
            requestAnimationFrame(this.animate);
        }

        init() {
            Object.assign(this.cursor.style, this.cursorStyle);
            setTimeout(() => {
                this.cursor.removeAttribute("hidden");
            }, 500);  // 500ms后显示游标
            this.cursor.style.opacity = 1;  // 设置透明度为1显示游标

            // 隐藏默认鼠标指针
            this.root.style.cursor = 'none';  // 隐藏真实的鼠标指针
        }

        move(event) {
            // 更新目标位置
            this.target.x = event.clientX;
            this.target.y = event.clientY;
            
            // 计算实际位置和目标位置的距离
            const dx = this.target.x - this.position.pointerX;
            const dy = this.target.y - this.position.pointerY;
            
            // 应用弹簧力
            const ax = dx * this.springStrength / this.mass;
            const ay = dy * this.springStrength / this.mass;
            
            // 更新速度
            this.velocity.x = this.velocity.x * this.damping + ax;
            this.velocity.y = this.velocity.y * this.damping + ay;
            
            // 更新位置
            this.previousPointerX = this.position.pointerX;
            this.previousPointerY = this.position.pointerY;
            this.position.pointerX += this.velocity.x;
            this.position.pointerY += this.velocity.y;
            
            // 计算移动距离用于旋转
            this.position.distanceX = this.previousPointerX - this.position.pointerX;
            this.position.distanceY = this.previousPointerY - this.position.pointerY;
            this.position.distance = Math.sqrt(this.position.distanceY ** 2 + this.position.distanceX ** 2);
        }

        animate() {
            // 应用变换
            if (this.cursor) {
                this.cursor.style.transform = 
                    `translate3d(${this.position.pointerX - this.cursorSize / 2}px, 
                                ${this.position.pointerY - this.cursorSize / 2}px, 0)` +
                    (this.position.distance > 0.1 ? this.rotate() : ` rotate(${this.angleDisplace}deg)`);
            }
            
            // 继续动画循环
            requestAnimationFrame(this.animate);
        }

        rotate() {
            let unsortedAngle = Math.atan2(Math.abs(this.position.distanceY), Math.abs(this.position.distanceX)) * this.degrees;
            this.previousAngle = this.angle;

            // 根据位置计算角度
            if (this.position.distanceX <= 0 && this.position.distanceY >= 0) {
                this.angle = 90 - unsortedAngle;
            } else if (this.position.distanceX < 0 && this.position.distanceY < 0) {
                this.angle = unsortedAngle + 90;
            } else if (this.position.distanceX >= 0 && this.position.distanceY <= 0) {
                this.angle = 90 - unsortedAngle + 180;
            } else if (this.position.distanceX > 0 && this.position.distanceY > 0) {
                this.angle = unsortedAngle + 270;
            }

            // 检查角度是否有效
            if (isNaN(this.angle)) {
                this.angle = this.previousAngle;
            } else {
                // 平滑角度变化
                const angleDiff = this.angle - this.previousAngle;
                if (Math.abs(angleDiff) > 180) {
                    // 处理角度跨越 360 度的情况
                    this.angleDisplace += angleDiff > 0 ? angleDiff - 360 : angleDiff + 360;
                } else {
                    // 应用平滑插值
                    this.angleDisplace += angleDiff * 0.15;
                }
            }

            return ` rotate(${this.angleDisplace}deg)`;
        }

        hidden() {
            this.cursor.style.opacity = 0;  // 设置透明度为0隐藏游标
            setTimeout(() => {
                this.cursor.setAttribute("hidden", "hidden");  // 500ms后设置为隐藏
            }, 500);
        }
    }

    const cursor = new ArrowPointer();
    // 监听鼠标移动事件
    document.addEventListener('mousemove', (event) => cursor.move(event));
    // 监听触摸事件
    document.addEventListener('touchmove', (event) => cursor.move(event.touches[0]));

    // 创建 MutationObserver 来监视 DOM 变化
    const observer = new MutationObserver((mutations) => {
        mutations.forEach((mutation) => {
            if (mutation.type === 'childList') {
                hideRealCursor();
            }
        });
    });

    // 配置 observer
    const config = { childList: true, subtree: true };

    // 开始观察 document.body 的所有子树修改
    observer.observe(document.body, config);
}

// 判断文档就绪状态
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
} else {
    init(); // DOMContentLoaded 已经发生
}

function hideRealCursor() {
    document.body.style.cursor = 'none';
    document.documentElement.style.cursor = 'none';

    // 为所有元素添加 'cursor: none' 样式
    const allElements = document.getElementsByTagName('*');
    for (let i = 0; i < allElements.length; i++) {
        allElements[i].style.cursor = 'none';
    }
}
