<template>
    <div class="alarm">
        <img class="alarm-img" src="../images/alarm.png"/>
        <div class="alarm-cell">
            <AlarmTarget></AlarmTarget>
        </div>
    </div>
</template>
<script>
import AlarmTarget from "./AlarmTarget";
export default {
    components: {
        AlarmTarget
    }
}
</script>
<style lang="less" scoped>
.alarm {
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
    height: calc(100% - 60px);
    padding-top: 45px;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
  }
}
</style>