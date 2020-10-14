<template>
  <div class="alarm-target">
    <div class="alarm-target-title">
      <div class="alarm-target-cell-state">状态</div>
      <div class="alarm-target-cell-target">指标</div>
      <div class="alarm-target-cell-time">时间</div>
      <div class="alarm-target-cell-address">地点</div>
      <div class="alarm-target-cell-action"></div>
    </div>
    <div class="alarm-target-cell" v-for="(item, key) in targetArr" :key="key">
      <div class="alarm-target-cell-state">{{ item.type }}</div>
      <div class="alarm-target-cell-target">{{ item.record }}</div>
      <div class="alarm-target-cell-time">{{ item.time }}</div>
      <div class="alarm-target-cell-address">{{ item.address }}</div>
      <div class="alarm-target-cell-action"><button>查看</button></div>
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
      { type: "正常", record: "98分", time: "2020.10.14", address: "珍珠滩" },
      { type: "正常", record: "98分", time: "2020.10.14", address: "珍珠滩" },
      { type: "正常", record: "98分", time: "2020.10.14", address: "珍珠滩" },
      { type: "正常", record: "98分", time: "2020.10.14", address: "珍珠滩" },
      { type: "正常", record: "98分", time: "2020.10.14", address: "珍珠滩" },
      { type: "正常", record: "98分", time: "2020.10.14", address: "珍珠滩" },
      { type: "正常", record: "98分", time: "2020.10.14", address: "珍珠滩" },
      { type: "正常", record: "98分", time: "2020.10.14", address: "珍珠滩" }
    ];
  },
  methods: {}
};
</script>
<style lang="less" scoped>
.alarm-target {
  width: 100%;
  padding: 0 10px;
  padding-left: 20px;
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
    margin-bottom: 10px;
    &-state {
      width: 15%;
    }
    &-target {
      width: 15%;
    }
    &-time {
      flex: 1;
    }
    &-address {
      width: 20%;
    }
    &-action {
      width: 20%;
    }
  }
  &-cell:last-child {
    margin-bottom: 0;
  }
}
</style>
