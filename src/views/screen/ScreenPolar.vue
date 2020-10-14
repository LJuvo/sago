<template>
  <div class="polar">
    <img class="polar-img" src="../images/target.png" />
    <div class="polar-cell">
      <div class="polar-cell-comps">
        <DataPolar></DataPolar>
      </div>
      <div class="polar-cell-list">
        <DataTarget></DataTarget>
      </div>
    </div>
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
  position: relative;
  &-img {
    width: 100%;
  }
  &-cell {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    &-comps {
      padding-top: 15px;
    }
  }
}
</style>
