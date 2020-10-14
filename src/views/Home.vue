<template>
  <div class="screen">
    <div class="screen-top">
      <ScreenHeader></ScreenHeader>
      <ScreenTime class="screen-top-time"></ScreenTime>
    </div>
    <div class="screen-wrapper">
      <div class="screen-wrapper-left">
        <ScreenPolar></ScreenPolar>
        <ScreenAlarm></ScreenAlarm>
      </div>
      <div class="screen-wrapper-center">
        <div class="screen-wrapper-center-node">
          <ScreenSceneTarget></ScreenSceneTarget>
        <ScreenMap></ScreenMap>
        </div>
      </div>
      <div class="screen-wrapper-right">
        <ScreenVideo></ScreenVideo>
        <ScreenForm></ScreenForm>
      </div>
    </div>
  </div>
</template>

<script>
import ScreenHeader from "./screen/ScreenHeader";
import ScreenPane from "./screen/ScreenPane";
import ScreenSceneTarget from "./screen/ScreenSceneTarget";
import ScreenMap from "./screen/ScreenMap";
import ScreenPolar from "./screen/ScreenPolar";
import ScreenAlarm from "./screen/ScreenAlarm";
import ScreenVideo from "./screen/ScreenVideo";
import ScreenForm from "./screen/ScreenForm";
import ScreenTime from "./screen/ScreenTime";
export default {
  components: {
    ScreenHeader,
    ScreenPane,
    ScreenSceneTarget,
    ScreenMap,
    ScreenPolar,
    ScreenAlarm,
    ScreenVideo,
    ScreenForm,
    ScreenTime
  }
};
</script>
<style lang="less" scoped>
.screen {
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  background: url("./images/bg.png") no-repeat;
  background-size: cover;
  background-position: center 0;
  &-top {
    width: 100%;
    position: relative;
    &-time {
      position: absolute;
      left: 50px;
      top: 30px;
    }
  }
  &-wrapper {
    flex: 1;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    &-left {
      width: 30%;
      height: 100%;
    }
    &-center {
      flex: 1;
      height: 100%;
      &-node {
        margin: 0 auto;
        display: flex;
        flex-direction: column;
        justify-content: flex-start;
        width: 100%;
      }
    }
    &-right {
      width: 30%;
      height: 100%;
    }
  }
}
</style>
