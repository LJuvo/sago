<template>
  <div class="screen">
    <div class="screen-top">
      <ScreenHeader></ScreenHeader>
      <ScreenTime class="screen-top-time"></ScreenTime>
      <ScreenCoin class="screen-top-coin"></ScreenCoin>
    </div>
    <div class="screen-wrapper">
      <div class="screen-wrapper-left">
        <ScreenBasic>
          <div class="wrapper-polar">
            <DataPolar
              v-if="polarData.length > 0"
              :polarArr="polarData"
            ></DataPolar>
          </div>
          <div class="wrapper-pole">
            <ScreenPole :basicObj="waterScene"></ScreenPole>
          </div>
          <div class="wrapper-line">
            <DataLine @circle="setMask"></DataLine>
          </div>
        </ScreenBasic>
      </div>
      <div class="screen-wrapper-center">
        <ScreenSceneTarget :targetArr="sceneTargetData"></ScreenSceneTarget>
        <div class="screen-wrapper-center-node">
          <ScreenMap @on-touch="refreshTarget"></ScreenMap>
          <ScreenLegend></ScreenLegend>
        </div>
      </div>
      <div class="screen-wrapper-right">
        <ScreenScene>
          <ScreenVideo></ScreenVideo>
        </ScreenScene>
        <ScreenWarn id="sceneRef">
          <FormTarget :alarmArr="alarmData" @on-show="showAlarmMask"></FormTarget>
        </ScreenWarn>
      </div>
    </div>
    <MaskBox v-model="lineMaskStatus" :infoData="infoData" @close="lineMaskStatus = false"></MaskBox>
    <MaskAlarm v-model="alarmMaskStatus"  @close="alarmMaskStatus = false"></MaskAlarm>
    <img src="images/map.svg" style="display:none;"/>
  </div>
</template>

<script>
import ScreenHeader from "./screen/ScreenHeader";
import ScreenBasic from "./screen/ScreenBasic";
import ScreenScene from "./screen/ScreenScene";
import ScreenWarn from "./screen/ScreenWarn";
import ScreenSceneTarget from "./screen/ScreenSceneTarget";
import ScreenMap from "./screen/ScreenMap";
import ScreenLegend from "./screen/ScreenLegend";
import ScreenPole from "./screen/ScreenPolee";
import ScreenVideo from "./screen/ScreenVideo";
import FormTarget from "./screen/FormTarget";
import ScreenTime from "./screen/ScreenTime";
import ScreenCoin from "./screen/ScreenCoin";

import DataLine from "./screen/DataLine";
import DataPolar from "./screen/DataPolar";
import MaskBox from "./screen/MaskBox";
import MaskAlarm from "./screen/MaskAlarm";
export default {
  components: {
    ScreenHeader,
    ScreenSceneTarget,
    ScreenMap,
    ScreenLegend,
    ScreenPole,
    ScreenVideo,
    FormTarget,
    ScreenTime,
    ScreenCoin,

    ScreenBasic,
    ScreenScene,
    ScreenWarn,

    DataLine,
    DataPolar,
    MaskBox,
    MaskAlarm
  },
  data() {
    return {
      baseUrl: "http://www.riaeasy.com:9071",

      waterScene: {},
      polarData: [],
      sceneTargetData: [],
      alarmData: [],
      lineMaskStatus: false,
      alarmMaskStatus: false,

      infoData: [],
      maskAlarmData:{}
    };
  },
  mounted() {
    this.fetchScreen();
    this.fetchWaterScene();
    this.fetchAlarmList();
    this.fetchPolar();
    
  },
  methods: {
    fetchScreen() {
      // this.$axios({
      //   url: this.baseUrl + "/act/current/dimaoValue",
      //   method: "get",
      //   headers: {
      //     "Content-Type": "application/json;charset=UTF-8"
      //   }
      // }).then(res => {
      //   console.log(res);
      // });
    },
    fetchWaterScene() {
      // this.$axios({
      //   url: this.baseUrl + "/act/current/shuitiValue",
      //   method: "get",
      //   headers: {
      //     "Content-Type": "application/json;charset=UTF-8"
      //   }
      // }).then(res => {
      //   console.log("waterScene ->", res);
      //   this.waterScene = res.data.data[0] || {};
      // });
      this.waterScene = {name: "水体景观", value: 10, photos: []};
    },
    fetchAlarmList() {
      // this.$axios({
      //   url: this.baseUrl + "/act/yujing/yujingQuery",
      //   method: "get"
      // }).then(res => {
      //   console.log("alarmArr", res.data.data);
      // this.alarmData = res.data.data || [];
      // });
      this.alarmData = [
        {
          dt: "2020-10-16 04:39:22",
          id: 4,
          method: "持续观察",
          name: "火花海",
          result: "",
          status: "处理中",
          title: "浊度上升",
          type: "告警"
        },
        {
          dt: "2020-10-16 02:40:30",
          id: 5,
          method: "持续观察",
          name: "犀牛海",
          result: "",
          status: "处理中",
          title: "浊度上升",
          type: "正常"
        },
        {
          dt: "2020-10-16 02:40:30",
          id: 5,
          method: "持续观察",
          name: "犀牛海",
          result: "",
          status: "处理中",
          title: "浊度上升",
          type: "紧急"
        }
      ];
    },
    fetchPolar() {
      // this.$axios({
      //   url: "/act/current/zhibiaoValue",
      //   method: "get",
      //   headers: {
      //     "Content-Type": "application/json;charset=UTF-8"
      //   }
      // })
      //   .then(res => {
      //     let arr = res.data.data || [];
      //     this.setPolar(arr);
      //   })
      //   .catch(() => {
      let arr = [
        { name: "美景指数", value: Math.round((Math.random() *10)) },
        { name: "遗产健康指数", value: Math.round((Math.random() *10)) },
        { name: "水体景观", value: Math.round((Math.random() *10)) },
        { name: "钙华景观", value: Math.round((Math.random() *10)) },
        { name: "生物生态景观", value: Math.round((Math.random() *10)) },
        { name: "地貌", value: Math.round((Math.random() *10)) },
        { name: "水文水质", value: Math.round((Math.random() *10))},
        { name: "生物多样性", value: Math.round((Math.random() *10)) },
        { name: "气候", value: Math.round((Math.random() *10)) }
      ];
      this.setPolar(arr);
      // });
    },
    setPolar(arr) {
      const filterArr = ["美景指数", "遗产健康指数"];
      this.polarData = arr.filter(ele => {
        return !filterArr.includes(ele.name);
      });

      this.sceneTargetData = arr.filter(ele => {
        return filterArr.includes(ele.name);
      });
    },
    setMask() {
      this.fetchInfo();
      this.lineMaskStatus = true;
    },
    fetchInfo(){
      this.infoData = [
        { title: "7.6", label: "气候", cell: [
          { title:"降水", label: "5.8"},
          { title:"温度", label: "5.8"},
          { title:"SO2", label: "5.8"},
          { title:"CO", label: "5.8"},
        ]},
        { title: "7.6", label: "地貌", cell: [
          { title:"降水", label: "5.8"},
          { title:"温度", label: "5.8"},
          { title:"SO2", label: "5.8"},
          { title:"CO", label: "5.8"},
        ]},
        { title: "7.6", label: "水文", cell: [
          { title:"降水", label: "5.8"},
          { title:"温度", label: "5.8"},
          { title:"SO2", label: "5.8"},
          { title:"CO", label: "5.8"},
        ]},
        { title: "7.6", label: "生物多样性", cell: [
          { title:"降水", label: "5.8"},
          { title:"温度", label: "5.8"},
          { title:"SO2", label: "5.8"},
          { title:"CO", label: "5.8"},
        ]}
      ]
    },
    showAlarmMask(v){
      this.alarmMaskStatus = true;
    },
    refreshTarget(v){
      this.fetchPolar()
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
  overflow: hidden;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  background: url("./screen/bg.png") no-repeat;
  background-size: cover;
  background-position: center 0;
  &-top {
    width: 100%;
    position: relative;
    &-time {
      position: absolute;
      left: 3vw;
      bottom: 2vh;
    }
    &-coin {
      position: absolute;
      right: 3vw;
      bottom: 2vh;
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
      height: 100%;
      display: flex;
      flex-direction: column;
      justify-content: flex-start;
      &-node {
        flex: 1;
        position: relative;
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
.wrapper {
  &-polar {
    width: 100%;
    height: 30%;
    padding-left: 15px;
    padding-right: 10px;
  }
  &-pole {
    width: 100%;
    height: 28%;
    padding-top: 2%;
    overflow: hidden;
  }
  &-line {
    height: 36%;
  }
}

</style>
