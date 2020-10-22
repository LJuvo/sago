<template>
    <div class="screen-mask" v-if="value"  @click="$emit('close')">
      <div class="screen-mask-box">
        <img src="images/tipbg.png" style="" />
        <div class="screen-mask-box-close">
          <!-- <img src="close.png" /> -->
        </div>
        <div class="mask-row">
          <div class="mask-column" v-for="(title,index) in infoData"  :key="index">
            <div class="mask-column-title">{{title.title}}</div>
            <div class="mask-column-label">{{title.label}}</div>
            <div class="mask-column-cell" v-for="(item,key) in title.cell" :key="key">{{item.title}}:{{item.label}}</div>
          </div>
        </div>
      </div>
    </div>
</template>
<script>
export default {
    props:{
        value: {
            type: Boolean,
            default: false
        },
        infoData: {
            type: Array,
            default: []
        }
    }
}
</script>
<style lang="less" scoped>
.screen {
    &-mask {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background: rgba(0, 0, 0, 0.7);
    z-index: 10;
    display: flex;
    justify-content: center;
    align-items: center;
    &-box {
      margin: 0 auto;
      width: 500px;
      position: relative;
      img {
        width: 100%;
      }
      &-close {
        right: 30px;
        top: 35px;
        width: 30px;
        height: 30px;
        position: absolute;
      }
    }
  }
}
.mask {
  &-row {
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    position: absolute;
    top: 20%;
    left: 5%;
    width: 90%;
  }
  &-column {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    color: #02d5dd;
    &-title {
      font-size: 40px;
      line-height: 35px;
    }
    &-label {
      font-size: 30px;
    }
    &-cell {
      font-size: 16px;
    }
  }
}
</style>