<template>
  <div class="alarm-target">
    <div class="alarm-target-title">
      <div class="alarm-target-cell-address">预警地点</div>
      <div class="alarm-target-cell-time">预警时间</div>
      <div class="alarm-target-cell-info">预警内容</div>
      <div class="alarm-target-cell-status">处理状态</div>
    </div>
    <div class="alarm-target-cell" v-for="(item, key) in targetArr" :key="key">
      <div class="alarm-target-cell-address" :style="{color: item.type=='已处理'?'#0cff67':'#ffce0c'}">{{ item.address }}</div>
      <div class="alarm-target-cell-time" :style="{color: item.type=='已处理'?'#0cff67':'#ffce0c'}">{{ item.time }}</div>
      <div class="alarm-target-cell-info" :style="{color: item.type=='已处理'?'#0cff67':'#ffce0c'}">{{ item.info }}</div>
      <div class="alarm-target-cell-status" :style="{color: item.type=='已处理'?'#0cff67':'#ffce0c'}">{{ item.type }}</div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      targetArr: [],
      blank: "  "
    };
  },
  mounted() {
    this.targetArr = [
      { type: "已处理", info: "水质污染超标", time: "10:20 - 12:14", address: "五彩池" },
      { type: "待处理", info: "水质污染超标", time: "10:20 - 12:14", address: "珍珠滩" },
      { type: "已处理", info: "水质污染超标", time: "10:20 - 12:14", address: "五彩池" },
      { type: "待处理", info: "水质污染超标", time: "10:20 - 12:14", address: "珍珠滩" },
      { type: "已处理", info: "水质污染超标", time: "10:20 - 12:14", address: "五彩池" },
      { type: "待处理", info: "水质污染超标", time: "10:20 - 12:14", address: "珍珠滩" },
      { type: "已处理", info: "水质污染超标", time: "10:20 - 12:14", address: "珍珠滩" },
      { type: "待处理", info: "水质污染超标", time: "10:20 - 12:14", address: "珍珠滩" },
      { type: "已处理", info: "水质污染超标", time: "10:20 - 12:14", address: "五彩池" },
      { type: "待处理", info: "水质污染超标", time: "10:20 - 12:14", address: "珍珠滩" },
    ];
  },
  methods: {}
};
</script>
<style lang="less" scoped>
.alarm-target {
  width: 100%;
  padding: 0 10px;
  font-size: 14px;
  color: #02d5dd;
  &-title {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    text-align: center;
    margin-bottom: 10px;
  }
  &-cell {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    text-align: center;
    margin-bottom: 8px;
    &-address {
      width: 20%;
    }
    &-time {
      width: 25%;
    }
    &-info {
      flex: 1;
    }
    &-status {
      width: 20%;
    }
  }
  &-cell:last-child {
    margin-bottom: 0;
  }
}
</style>
