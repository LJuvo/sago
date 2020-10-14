<template>
  <div class="data-target">
    <div class="data-target-cell" v-for="(item, key) in targetArr" :key="key">
      [{{ item.type }}]{{blank}}{{ item.info }}
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
      {
        type: "钙化指标",
        info: "钙化指标钙化指标钙化指标钙化指标钙化指标钙化指标钙化指标"
      },
      {
        type: "美景指标",
        info: "钙化指标钙化指标钙化指标钙化指标钙化指标钙化指标钙化指标"
      },
      {
        type: "健康指标",
        info: "钙化指标钙化指标钙化指标钙化指标钙化指标钙化指标钙化指标"
      },
      {
        type: "钙化指标",
        info: "钙化指标钙化指标钙化指标钙化指标钙化指标钙化指标钙化指标"
      }
    ];
  },
  methods: {}
};
</script>
<style lang="less" scoped>
.data-target {
  width: 80%;
  margin: 0 auto;
  font-size: 14px;
  line-height: 18px;
  height: 54px;
  overflow: hidden;
  color: #02d5dd;
  &-cell {
    white-space: nowrap;
    width: 100%;
    overflow: hidden;
    text-overflow: ellipsis;
  }
}
</style>
