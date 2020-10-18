<template>
  <div class="pole">
    <div class="pole-left">
      <div class="pole-left-title">7.7</div>
      <div class="pole-left-label">水体景观</div>
    </div>
    <div class="pole-content">
      <div style="width:100%" v-swiper:mySwiper="swiperOption">
        <div class="swiper-wrapper">
          <div class="swiper-slide" :key="banner" v-for="banner in banners">
           <img style="width:100%" :src="banner"/>
          </div>
        </div>
        <div class="swiper-pagination"></div>
      </div>
    </div>
  </div>
</template>
<script>
import { directive } from "vue-awesome-swiper";
import "swiper/swiper-bundle.css";
export default {
  directives: {
    swiper: directive
  },
  data() {
    return {
      banners: ["../images/img/dragion.png", "../images/img/scene.png", "../images/img/sea.png","../images/img/tiger.png"],
      swiperOption: {
        pagination: {
          el: ".swiper-pagination"
        },
        // //设置点击箭头
        // navigation: {
        //   nextEl: ".swiper-button-next",
        //   prevEl: ".swiper-button-prev"
        // },
        //自动轮播
        autoplay: {
          delay: 500,
        //   //当用户滑动图片后继续自动轮播
        //   disableOnInteraction: false
        },
        //开启循环模式
        loop: true
        // ...
      }
    };
  }
};
</script>
<style lang="less" scoped>
.pole {
  width: 100%;
  padding: 0 20px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  &-left {
    display: flex;
    flex-direction: column;
    color: #00ffef;
    text-align: center;
    &-title {
      font-size: 50px;
      line-height: 40px;
    }
    &-label {
      font-size: 18px;
    }
  }
  &-content {
    flex: 1;
    overflow: hidden;
  }
}
</style>
