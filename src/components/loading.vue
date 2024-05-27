<template>
    <div class="container">
        <img class="scrolling-image" src="../assets/images/icon/icon_loading.png" alt="Scrolling Image">
    </div>
</template>

<script>
export default {
    mounted() {
        this.setupScrollingAnimation();
    },
    methods: {
        setupScrollingAnimation() {
            let containerWidth = 56; // 容器的宽度（像素）
            const imageWidth = 3000; // 图片的宽度（像素）
            const step = 20; // 每次移动的步长（像素）

            const animationDuration = (imageWidth / step) * 2 + 's'; // 动画持续时间

            const keyframes = `
        0% {
          transform: translateX(0);
        }
        100% {
          transform: translateX(-${imageWidth}px);
        }
      `;

            const animationName = 'scroll-animation';
            const animationStyle = `@keyframes ${animationName} { ${keyframes} }`;

            const styleElement = document.createElement('style');
            styleElement.innerHTML = animationStyle;
            document.head.appendChild(styleElement);

            const scrollingImage = document.querySelector('.scrolling-image');
            scrollingImage.style.animation = `${animationName} ${animationDuration} linear infinite step-start`;
        }
    }
};
</script>

<style>
.container {
    width: 56px;
    height: 56px;
    overflow: hidden;
    position: relative;
}

.scrolling-image {
    position: absolute;
    width: 3000px;
    height: auto;
}
</style>
