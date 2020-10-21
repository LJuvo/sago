<template>
  <div class="pole">
    <div class="pole-left">
      <div class="pole-left-title">{{ basicObj.value || 0 }}</div>
      <div class="pole-left-label">{{ basicObj.name || "-" }}</div>
    </div>
    <div class="pole-content">
      <swiper
        ref="mySwiper"
        :options="swiperOption"
        style="height:100%;"
        :auto-update="true"
        :auto-destroy="true"
        :delete-instance-on-destroy="true"
        :cleanup-styles-on-destroy="true"
      >
        <swiper-slide
          class="swiper-slide"
          v-for="(item, index) in banners"
          :key="index"
          style="text-align: center;height:100%;"
        >
          <img class="swiper-slide-start" v-if="index != 0" :src="banners[index -1]" />
          <img class="swiper-slide-next" v-if="index != banners.length -1" :src="banners[index +1]" />
          <img class="swiper-slide-main" :src="item" />
        </swiper-slide>
        <div class="swiper-pagination" slot="pagination"></div>
      </swiper>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    basicObj: {
      type: Object,
      default: {}
    }
  },
  data() {
    return {
      banners: [
        "images/img/dragion.png",
        "images/img/scene.png",
        "images/img/sea.png",
        "images/img/tiger.png"
      ],
      slide: [1, 2, 3, 4, 5],
      //设置属性
      swiperOption: {
        //显示分页
        pagination: {
          el: ".swiper-pagination"
        },
        //设置点击箭头
        navigation: {
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev"
        },
        //自动轮播
        autoplay: {
          delay: 1000
        },
        //开启循环模式
        loop: true,
        //开启鼠标滚轮控制Swiper切换
        mousewheel: true
      }
    };
  },
  computed: {
    swiper() {
      return this.$refs.mySwiper.$swiper;
    }
  },
  mounted() {},
  methods: {
    startBanner(Index) {
      if (Index == 0) {
        return "";
      } else {
        return this.banners[Index - 1];
      }
    },
    nextBanner(Index) {
      if (Index == this.banners.length - 1) {
        return "";
      } else {
        return this.banners[Index - 1];
      }
    }
  }
};
</script>
<style lang="less" scoped>
.pole {
  width: 100%;
  height: 100%;
  padding: 0 20px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
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
    height: 100%;
    overflow: hidden;
    padding: 10px 0;
    padding-left: 20px;
  }
}
.swiper-slide {
  position: relative;
  &-main {
    z-index: 10;
    height: calc(100% - 20px);
    max-width: 100%;
    margin: 0 auto;
    position: absolute;
    left: 18px;
  }
  &-start {
    z-index: 1;
    height: 40%;
    position: absolute;
    top: 15%;
    left: 0;
  }
  &-next {
    z-index: 1;
    height: 40%;
    position: absolute;
    top: 15%;
    right: 0;
  }
}
</style>
