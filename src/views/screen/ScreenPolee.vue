<template>
  <a-carousel
    class="video-cell"
    :after-change="onChange"
    dotPosition="bottom"
    :dots="true"
    autoplay
  >
    <div
      style="height:100%;"
      v-for="(basicObj, index) in poleeData"
      :key="index"
    >
    <div class="video-cell-node" style="height:100%;">
      <div class="polee-left">
        <div class="polee-left-title" style="height: 40px!important;">{{ basicObj.value || 0 }}</div>
        <div class="polee-left-label" style="height: auto!important;">{{ basicObj.name || "-" }}</div>
      </div>
      <a-row style="height:100%;">
        <a-col
          :span="12"
          v-for="(item, index) in basicObj.banners"
          :key="index"
        >
          <VideoPane class="video-cell-node-movie">
            <img class="video-movie" :src="item" />
          </VideoPane>
        </a-col>
      </a-row>
    </div>
    </div>
  </a-carousel>
</template>
<script>
import { Carousel } from "ant-design-vue";
import VideoPane from "./VideoPane";
export default {
  components: {
    Carousel,
    VideoPane
  },
  data() {
    return {
      poleeData: [
        {
          name: "水体景观",
          value: 9.8,
          banners: ["images/img/dragion.png", "images/img/scene.png"]
        },
        {
          name: "钙化景观",
          value: 7.8,
          banners: ["images/img/sea.png", "images/img/tiger.png"]
        },
        {
          name: "生物生态景观",
          value: 9.2,
          banners: ["images/img/dragion.png", "images/img/sea.png"]
        }
      ]
    };
  },
  methods: {
    onChange() {}
  }
};
</script>
<style lang="less">
.video-cell {
  .slick-slider{
    height: 100%!important;
  }
  .slick-list {
    height: 100%!important;
  }
  .slick-track {
    height: 100%!important;
  }
  .slick-slide div {
    height: 100%!important;
  }
  .slick-dots-bottom {
    bottom: 5px!important;
}
}
</style>
<style lang="less" scoped>
.video {
  width: 100%;
  position: relative;
  max-height: 450px;
  &-img {
    width: 100%;
  }
  &-cell {
    height: 100%;
    &-node {
      height: 100%;
      width: 100%;
      padding: 10px;
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      &-movie {
        width: 80%;
        max-height: 100%;
        border-radius: 10px;
        margin: 0 auto;
      }
    }
  }
}
.polee {
  &-left {
    display: flex;
    flex-direction: column;
    color: #00ffef;
    text-align: center;
    justify-content: center;
    &-title {
      font-size: 50px;
      line-height: 40px;
      height: 40px;
    }
    &-label {
      font-size: 18px;
      height: auto;
    }
  }
}
</style>
