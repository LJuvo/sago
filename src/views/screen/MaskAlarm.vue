<template>
    <div class="screen-mask" v-if="value" @click="$emit('close')">
      <div class="screen-mask-box">
        <img src="images/tipAlarm.png" style="" />
        <!-- <div class="screen-mask-box-close" @click="$emit('close')">
          <img src="close.png" />
        </div> -->
        <div class="alarm-box">
          <div class="alarm-box-title">
            <div class="box-row">
              <div>告警类型：告警</div>
              <div class="alarm-box-title-main">告警标题：浊度上升</div>
              <div>2020-10-15 08:45:29</div>
            </div>
          </div>
          <div class="alarm-box-content">
            <div class="box-row">
              <div>告警遗产点：镜海</div>
              <div>接警人：李力</div>
              <div>处理状态：已派工</div>
            </div>
            <div class="alarm-box-content-info">
              <div class="box-column">
                <div>处理情况：</div>
                <div>1、2020-10-15 08:45:29 发生告警</div>
                <div>2、2020-10-15 08:45:29 发生告警</div>
                <div>3、2020-10-15 08:45:29 发生告警</div>
              </div>
              <div class="box-column">
                <div>处理结果：</div>
                <div>1、2020-10-15 08:45:29 发生告警</div>
                <div>2、2020-10-15 08:45:29 发生告警</div>
                <div>3、2020-10-15 08:45:29 发生告警</div>
              </div>
            </div>
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
      width: 600px;
      position: relative;
      img {
        width: 100%;
      }
      &-close {
        right: 40px;
        top: 65px;
        width: 30px;
        height: 30px;
        position: absolute;
      }
    }
  }
}
.alarm-box {
  position: absolute;
  top: 50px;
  width: 100%;
  padding: 40px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  color: #02d5dd;
  font-size: 14px;
  &-title {
    background: rgba(17,42,79,0.8);
    padding: 5px;
    &-main {
      font-size: 20px;
    }
  }
  &-content {
    padding: 10px 20px;
    display: flex;
  flex-direction: column;
  justify-content: flex-start;
  &-info {
    margin-top: 15px;
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
  }
  }
}
.box {
  &-row {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
  }
  &-column {
    display: flex;
  flex-direction: column;
  justify-content: flex-start;
  }
}
</style>