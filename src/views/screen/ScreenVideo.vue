<template>
  <div class="video"> 
    <div class="video-cell">
      <a-carousel class="video-cell-carousel" :after-change="onChange" dotPosition="bottom" :dots="true">
        <div class="video-cell-node">
            <a-row :gutter="[16,16]">
  <a-col :span="12"><VideoPane class="video-cell-node-movie"></VideoPane></a-col>
  <a-col :span="12"><VideoPane class="video-cell-node-movie"></VideoPane></a-col>
  <a-col :span="12"><VideoPane class="video-cell-node-movie"></VideoPane></a-col>
  <a-col :span="12"><VideoPane class="video-cell-node-movie"></VideoPane></a-col>
</a-row>
        </div>
        <div class="video-cell-carousel"><h3>2</h3></div>
        <div class="video-cell-carousel"><h3>3</h3></div>
        <div class="video-cell-carousel"><h3>4</h3></div>
      </a-carousel>
    </div>
    <img class="video-img" src="../images/video.png" />
  </div>
</template>
<script>
import { Carousel } from 'ant-design-vue';
import VideoPane from "./VideoPane";
export default {
    components:{
        Carousel,VideoPane
    },
    methods:{
        onChange(){}
    }
};
</script>
<style >
.ant-carousel .slick-slide {
  text-align: center;
  height: 100%;
  overflow: hidden;
}
.ant-carousel .slick-dots li{
    margin: 0 6px!important;
}
.ant-carousel .slick-dots li button {
    height: 8px!important;
    width: 8px!important;
    border-radius: 8px!important;
    background: #00fcff!important;
    cursor: hand!important;
}

.ant-carousel .slick-dots li.slick-active button {
    background: #00fcff!important;
    opacity: 1;
}
</style>
<style lang="less" scoped>
.video {
  width: 100%;
  position: relative;
  &-img {
    width: 100%;
  }
  &-cell {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: calc(100% - 30px);
    padding-top: 40px;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    z-index: 10;
    &-carousel {
        height: 100%;
    }
    &-node {
        height: 100%;
        padding: 10px 20px;
        &-movie {
            width: 100%;
            height: 130px;
            border-radius: 10px;
        }
    }
  }
}
</style>
