<template>
  <div class="screen">
    <div class="screen-top">
      <ScreenHeader></ScreenHeader>
      <ScreenTime class="screen-top-time"></ScreenTime>
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
          <ScreenMap></ScreenMap>
        </div>
      </div>
      <div class="screen-wrapper-right">
        <ScreenScene>
          <ScreenVideo></ScreenVideo>
        </ScreenScene>
        <ScreenWarn id="sceneRef">
          <FormTarget :alarmArr="alarmData"></FormTarget>
        </ScreenWarn>
      </div>
    </div>
    <div class="screen-mask" v-if="maskStatus">
      <div class="screen-mask-box">
        <img src="tips.png" />
        <div class="screen-mask-box-close" @click="maskStatus = false"></div>
        <div class="mask-row">
          <div class="mask-column" v-for="(title,index) in infoData"  :key="index">
            <div class="mask-column-title">{{title.title}}</div>
            <div class="mask-column-label">{{title.label}}</div>
            <div class="mask-column-cell" v-for="(item,key) in title.cell" :key="key">{{item.title}}:{{item.label}}</div>
          </div>
        </div>
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
import ScreenPole from "./screen/ScreenPolee";
import ScreenAlarm from "./screen/ScreenAlarm";
import ScreenVideo from "./screen/ScreenVideo";
import FormTarget from "./screen/FormTarget";
import ScreenTime from "./screen/ScreenTime";

import DataLine from "./screen/DataLine";
import DataPolar from "./screen/DataPolar";
export default {
  components: {
    ScreenHeader,
    ScreenPane,
    ScreenSceneTarget,
    ScreenMap,
    ScreenPole,
    ScreenAlarm,
    ScreenVideo,
    FormTarget,
    ScreenTime,

    ScreenBasic,
    ScreenScene,
    ScreenWarn,

    DataLine,
    DataPolar
  },
  data() {
    return {
      baseUrl: "http://www.riaeasy.com:9071",

      waterScene: {},
      polarData: [],
      sceneTargetData: [],
      alarmData: [],
      maskStatus: false,

      infoData: []
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
          type: "预警"
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
        { name: "美景指数", value: 7.6 },
        { name: "遗产健康指数", value: 7.4 },
        { name: "水体景观", value: 6.8 },
        { name: "钙华景观", value: 7.6 },
        { name: "生物生态景观", value: 7.8 },
        { name: "地貌", value: 8.3 },
        { name: "水文水质", value: 6.5 },
        { name: "生物多样性", value: 8.6 },
        { name: "气候", value: 7.1 }
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
      this.maskStatus = true;
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
  background: url("./images/bg.png") no-repeat;
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
      width: 45vw;
      position: relative;
      img {
        width: 100%;
      }
      &-close {
        right: 50px;
        top: 35px;
        width: 30px;
        height: 30px;
        position: absolute;
      }
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
    height: 40%;
    padding-left: 15px;
    padding-right: 10px;
  }
  &-pole {
    width: 100%;
    height: 18%;
    padding-top: 2%;
    overflow: hidden;
  }
  &-line {
    height: 36%;
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
