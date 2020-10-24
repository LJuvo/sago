<template>
  <div class="alarm-target">
    <div class="target-cell" v-for="(item, key) in alarmArr" :key="key" @click="$emit('on-show',item)">
      <div class="target-cell-title">
        <div class="target-cell-title-address">{{item.name}}</div>
        <div class="target-cell-title-time">{{backTime(item.dt)}}</div>
        <div class="target-cell-title-alarm" :style="{color: backColor(item.type)}">{{item.type}}</div>
      </div>
      <div class="target-cell-info">【{{item.status}}】{{item.title}}</div>
    </div>
  </div>
</template>
<script>
import dayjs from "dayjs";
export default {
  props: {
    alarmArr: {
      type: Array,
      default: []
    }
  },
  data() {
    return {
      blank: "  ",
      alarmType: ["异常", "告警", "紧急", "未知", "正常"],
      alarmColor: ["#ff6825", "#ffbf25", "#FF5722", "#d4d4d4", "#18d724"]
    };
  },
  mounted() {
    // this.targetArr = [
    //   { type: "告警", grade: 2, time: "2020.10.14", address: "五彩池", info: "水质污染超标水质污染超标水质污染超水质污染超标水质污染超标水质污染超水质污染超标水质污染超标水质污染超水质污染超标水质污染超标水质污染超水质污染超标水质污染超标水质污染超标" 
    //   },
    //   { type: "异常", grade: 0, time: "2020.10.14", address: "五彩池", info: "水质污染超标水质污染超标水质污染超水质污染超标水质污染超标水质污染超水质污染超标水质污染超标水质污染超水质污染超标水质污染超标水质污染超水质污染超标水质污染超标水质污染超标" 
    //   },
    //   { type: "告警", grade: 2, time: "2020.10.14", address: "五彩池", info: "水质污染超标水质污染超标水质污染超水质污染超标水质污染超标水质污染超水质污染超标水质污染超标水质污染超水质污染超标水质污染超标水质污染超水质污染超标水质污染超标水质污染超标" 
    //   },
    //   { type: "异常", grade: 0, time: "2020.10.14", address: "五彩池", info: "水质污染超标水质污染超标水质污染超水质污染超标水质污染超标水质污染超水质污染超标水质污染超标水质污染超水质污染超标水质污染超标水质污染超水质污染超标水质污染超标水质污染超标" 
    //   },
    //   { type: "告警", grade: 2, time: "2020.10.14", address: "五彩池", info: "水质污染超标水质污染超标水质污染超水质污染超标水质污染超标水质污染超水质污染超标水质污染超标水质污染超水质污染超标水质污染超标水质污染超水质污染超标水质污染超标水质污染超标" 
    //   },
    //   { type: "异常", grade: 0, time: "2020.10.14", address: "五彩池", info: "水质污染超标水质污染超标水质污染超水质污染超标水质污染超标水质污染超水质污染超标水质污染超标水质污染超水质污染超标水质污染超标水质污染超水质污染超标水质污染超标水质污染超标" 
    //   },
    //   { type: "告警", grade: 2, time: "2020.10.14", address: "五彩池", info: "水质污染超标水质污染超标水质污染超水质污染超标水质污染超标水质污染超水质污染超标水质污染超标水质污染超水质污染超标水质污染超标水质污染超水质污染超标水质污染超标水质污染超标" 
    //   },
    //   { type: "异常", grade: 0, time: "2020.10.14", address: "五彩池", info: "水质污染超标水质污染超标水质污染超水质污染超标水质污染超标水质污染超水质污染超标水质污染超标水质污染超水质污染超标水质污染超标水质污染超水质污染超标水质污染超标水质污染超标" 
    //   },
    // ];
  },
  methods: {
    backColor(type){
      const index = this.alarmType.findIndex(o=> {return o == type});
      // console.log("index -?", index, type);
      return this.alarmColor[index];
    },
    backTime(time){
      return dayjs(time).format("YYYY-MM-DD");
    }
  }
};
</script>
<style lang="less" scoped>
.alarm-target {
  width: 100%;
  height: 100%;
  overflow: hidden;
  overflow-y: auto;
  padding: 0 10px;
  font-size: 14px;
  color: #02d5dd;
  
}
.alarm-target::-webkit-scrollbar
{
	width: 6px;
	height: 6px;
	background-color: none;
}
 
/*定义滚动条轨道 内阴影+圆角*/
.alarm-target::-webkit-scrollbar-track
{
	-webkit-box-shadow: inset 0 0 6px rgba(0,0,0,0.3);
	border-radius: 10px;
	background-color: none;
}
 
/*定义滑块 内阴影+圆角*/
.alarm-target::-webkit-scrollbar-thumb
{
	border-radius: 10px;
	-webkit-box-shadow: inset 0 0 6px rgba(0,0,0,.3);
	background-color: #194963;
}
.target {
  &-cell {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    margin-bottom: 8px;
    &-title{
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      text-align: center;
      margin-bottom: 8px;
      padding: 4px 0;
    background: rgba(17,42,79,0.8);
      &-address {
        width: 40%;
      }
      &-time {
        flex: 1;
      }
      &-alarm {
        width: 30%;
      }
    }
    &-info {
      width: 100%;
    }
  }
  &-cell:last-child {
    margin-bottom: 0;
  }
}
</style>
