<template>
  <div class="screen">
    <div class="screen-top">
      <ScreenHeader></ScreenHeader>
      <ScreenTime class="screen-top-time"></ScreenTime>
    </div>
    <div class="screen-wrapper">
      <div class="screen-wrapper-left">
        <ScreenPolar></ScreenPolar>
        <ScreenPane></ScreenPane>
      </div>
      <div class="screen-wrapper-center">
        <ScreenSceneTarget></ScreenSceneTarget>
        <ScreenMap></ScreenMap>
      </div>
      <div class="screen-wrapper-right">
        <ScreenPane></ScreenPane>
        <ScreenPane></ScreenPane>
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
import ScreenTime from "./screen/ScreenTime";
export default {
  components: {
    ScreenHeader,ScreenPane,ScreenSceneTarget,ScreenMap,ScreenPolar,ScreenTime
  }
}
</script>
<style lang="less" scoped>
.screen {
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  background: #13294f;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  &-top{
    width: 100%;
    position: relative;
    &-time {
      position: absolute;
      right: 50px;
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
    }
    &-right {
      width: 30%;
      height: 100%;
    }
  }
}
</style>
