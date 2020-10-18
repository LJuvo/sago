<template>
  <div class="screen">
    <div class="screen-top">
      <ScreenHeader></ScreenHeader>
      <ScreenTime class="screen-top-time"></ScreenTime>
    </div>
    <div class="screen-wrapper">
      <div class="screen-wrapper-left">
        <ScreenBasic>
          <ScreenPolar></ScreenPolar>
          <ScreenPole></ScreenPole>
          <DataLine></DataLine>
          <!-- <div class="basic-wrapper">
            
            <ScreenAlarm></ScreenAlarm>
          </div> -->
        </ScreenBasic>
      </div>
      <div class="screen-wrapper-center">
        <ScreenSceneTarget></ScreenSceneTarget>
        <div class="screen-wrapper-center-node">
          <ScreenMap></ScreenMap>
        </div>
      </div>
      <div class="screen-wrapper-right">
        <ScreenScene>
          <ScreenVideo></ScreenVideo>
        </ScreenScene>
        <ScreenWarn id="sceneRef">
          <ScreenForm style="max-height:380px"></ScreenForm>
        </ScreenWarn>
      </div>
    </div>
  </div>
</template>

<script>
import ScreenHeader from "./screen/ScreenHeader";
import ScreenPane from "./screen/ScreenPane";
import ScreenBasic from "./screen/ScreenBasic";
import ScreenScene from "./screen/ScreenScene";
import ScreenWarn from "./screen/ScreenWarn";
import ScreenSceneTarget from "./screen/ScreenSceneTarget";
import ScreenMap from "./screen/ScreenMap";
import ScreenPolar from "./screen/ScreenPolar";
import ScreenPole from "./screen/ScreenPole";
import ScreenAlarm from "./screen/ScreenAlarm";
import ScreenVideo from "./screen/ScreenVideo";
import ScreenForm from "./screen/ScreenForm";
import ScreenTime from "./screen/ScreenTime";

import DataLine from "./screen/DataLine";
export default {
  components: {
    ScreenHeader,
    ScreenPane,
    ScreenSceneTarget,
    ScreenMap,
    ScreenPolar,
    ScreenPole,
    ScreenAlarm,
    ScreenVideo,
    ScreenForm,
    ScreenTime,

    ScreenBasic,
    ScreenScene,
    ScreenWarn,

    DataLine
  },
  data() {
    return {};
  },
  mounted() {
    this.fetchScreen();
  },
  methods: {
    fetchScreen() {
      this.$axios({
        url: "/act/current/dimaoValue",
        method: "get",
        headers: {
          "Content-Type": "application/json;charset=UTF-8"
        }
      }).then(res => {
        console.log(res);
      });
    }
  }
};
</script>
<style lang="less">
@font-face {
  font-family: "Digital";
  src: url("./fonts/LED.ttf") format("truetype");
}
</style>
<style lang="less" scoped>
.screen {
  width: 100vw;
  height: 100vh;
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
      width: 28%;
      max-width: 515px;
      height: 100%;
    }
    &-center {
      flex: 1;
      display: flex;
      flex-direction: column;
      justify-content: flex-start;
      &-node {
        flex: 1;
      }
    }
    &-right {
      width: 28%;
      max-width: 515px;
      height: 100%;
      display: flex;
      flex-direction: column;
    }
  }
}
.basic-wrapper {
  width: 100%;
  padding: 40px 20px 20px 20px;
}
</style>
