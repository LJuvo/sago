<template>
  <div class="coin">
    <a :class="{'coin-point': true, 'coin-point-active':dataStatus}">
      <span class="coin-point-icon iconfont">&#xe606;</span>
      <span>数据大屏</span>
    </a>
    <a :class="{'coin-point': true, 'coin-point-active':sceneStatus}">
      <span class="coin-point-icon iconfont">&#xe604;</span>
      <span>景区总览</span>
    </a>
    <a :class="{'coin-point': true, 'coin-point-active':futureStatus}">
      <span class="coin-point-icon iconfont">&#xe605;</span>
      <span>未来预测</span>
    </a>
  </div>
</template>
<script>
import * as d3 from "d3";
export default {
  data() {
    return {
      coinArr: [
        {label: "数据大屏", pic: "&#xe606;", url:""},
        {label: "景区总览", pic: "&#xe604;", url:""},
        {label: "未来预测", pic: "&#xe605;", url:""},

      ],
      dataStatus: true,
      sceneStatus: false,
      futureStatus: false
    };
  },
  mounted() {


  },
  methods: {

  }
};
</script>
<style lang="less" scoped>
@font-face {
  font-family: 'iconfont';
  src: url('icon/iconfont.eot');
  src: url('icon/iconfont.eot?#iefix') format('embedded-opentype'),
      url('icon/iconfont.woff2') format('woff2'),
      url('icon/iconfont.woff') format('woff'),
      url('icon/iconfont.ttf') format('truetype'),
      url('icon/iconfont.svg#iconfont') format('svg');
}
.iconfont {
  font-family: "iconfont" !important;
  font-size: 16px;
  font-style: normal;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
.coin {
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  &-point{
    margin-right: 10px;
     color:  #02d5dd;
    cursor: pointer;
    a{
      display: block;
      height: 100%;
    }

    &-icon {
      height: 18px;
      width: 18px;
     margin-right: 2px;
    }
    &-active{
      color: #FFC107;
    }
  }
  &-point:last-child {
      margin-right: 0;
    }
}
</style>
