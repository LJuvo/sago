<template>
  <div class="alarm-target">
    <div class="target-cell" v-for="(item, key) in targetArr" :key="key">
      <div class="target-cell-title">
        <div class="target-cell-title-address">{{item.address}}</div>
        <div class="target-cell-title-time">{{item.time}}</div>
        <div class="target-cell-title-alarm" :style="{color: alarmColor[item.grade]}">{{item.type}}</div>
      </div>
      <div class="target-cell-info">{{item.info}}</div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      targetArr: [],
      blank: "  ",
      alarmColor: ["red", "orange", "yellow", "green", "blue"]
    };
  },
  mounted() {
    this.targetArr = [
      { type: "告警", grade: 2, time: "2020.10.14", address: "五彩池", info: "水质污染超标水质污染超标水质污染超水质污染超标水质污染超标水质污染超水质污染超标水质污染超标水质污染超水质污染超标水质污染超标水质污染超水质污染超标水质污染超标水质污染超标" 
      },
      { type: "异常", grade: 0, time: "2020.10.14", address: "五彩池", info: "水质污染超标水质污染超标水质污染超水质污染超标水质污染超标水质污染超水质污染超标水质污染超标水质污染超水质污染超标水质污染超标水质污染超水质污染超标水质污染超标水质污染超标" 
      },
      { type: "告警", grade: 2, time: "2020.10.14", address: "五彩池", info: "水质污染超标水质污染超标水质污染超水质污染超标水质污染超标水质污染超水质污染超标水质污染超标水质污染超水质污染超标水质污染超标水质污染超水质污染超标水质污染超标水质污染超标" 
      },
      { type: "异常", grade: 0, time: "2020.10.14", address: "五彩池", info: "水质污染超标水质污染超标水质污染超水质污染超标水质污染超标水质污染超水质污染超标水质污染超标水质污染超水质污染超标水质污染超标水质污染超水质污染超标水质污染超标水质污染超标" 
      },
      { type: "告警", grade: 2, time: "2020.10.14", address: "五彩池", info: "水质污染超标水质污染超标水质污染超水质污染超标水质污染超标水质污染超水质污染超标水质污染超标水质污染超水质污染超标水质污染超标水质污染超水质污染超标水质污染超标水质污染超标" 
      },
      { type: "异常", grade: 0, time: "2020.10.14", address: "五彩池", info: "水质污染超标水质污染超标水质污染超水质污染超标水质污染超标水质污染超水质污染超标水质污染超标水质污染超水质污染超标水质污染超标水质污染超水质污染超标水质污染超标水质污染超标" 
      },
      { type: "告警", grade: 2, time: "2020.10.14", address: "五彩池", info: "水质污染超标水质污染超标水质污染超水质污染超标水质污染超标水质污染超水质污染超标水质污染超标水质污染超水质污染超标水质污染超标水质污染超水质污染超标水质污染超标水质污染超标" 
      },
      { type: "异常", grade: 0, time: "2020.10.14", address: "五彩池", info: "水质污染超标水质污染超标水质污染超水质污染超标水质污染超标水质污染超水质污染超标水质污染超标水质污染超水质污染超标水质污染超标水质污染超水质污染超标水质污染超标水质污染超标" 
      },
    ];
  },
  methods: {}
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
