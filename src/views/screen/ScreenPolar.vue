<template>
  <div class="polar">
    <DataPolar></DataPolar>
  </div>
</template>
<script>
import DataPolar from "./DataPolar";
import DataTarget from "./DataTarget";
export default {
  components: {
    DataPolar,
    DataTarget
  }
};
</script>
<style lang="less" scoped>
.polar {
  width: 100%;
  padding-left: 15px;
  padding-right: 10px;
}
</style>
