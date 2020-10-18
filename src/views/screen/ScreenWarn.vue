<template>
  <div class="pane">
    <div class="pane-head">
      <img class="pane-img" src="../images/img/alarm_top.png" />
    </div>
    <div class="pane-body" id="warnBody">
      
        <div class="pane-body-box">
            <slot></slot>
        </div>
    </div>
    <div class="pane-footer">
      <img class="pane-img" src="../images/img/alarm_bottom.png" />
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      warnBodyHeight: 0
    };
  },
  watch:{
      warnBodyHeight(v){
          console.log("warn height ->",v)
      }
  },
  mounted() {
    
        this.$nextTick(() => {
            setTimeout(()=>{
      this.warnBodyHeight = document.getElementById('warnBody').offsetHeight - 160;
      },50)
    });
    
    window.addEventListener("resize", () => {
      this.$nextTick(() => {
            setTimeout(()=>{
      this.warnBodyHeight = document.getElementById('warnBody').offsetHeight;
      },50)
      })
    });
  }
};
</script>
<style lang="less" scoped>
.pane {
  width: 100%;
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  position: relative;
  &-head {
    width: 100%;
  }
  &-body {
    width: 100%;
    flex: 1;
    background: url("../images/img/alarm_center.png");
    background-repeat: no-repeat;
    background-size: 100% 100%;
    &-box {
      width: 100%;
      overflow: hidden;
      overflow-y: auto;
      padding: 0 20px;
    }
  }
  &-footer {
    width: 100%;
    margin-top: -40px;
  }
  &-img {
    width: 100%;
  }
}
</style>
