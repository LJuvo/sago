<template>
  <div class="coin">
    <div class="coin-point" v-for="(item,index) of coinArr" :key="index">
      <a>
      <img :src="item"/>
      </a>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      coinArr: [
        "images/img/sea.png",
        "images/img/tiger.png",
        "images/img/dragion.png",
      ]
    };
  },
  mounted() {
  },
  methods: {
  }
};
</script>
<style lang="less" scoped>
.coin {
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  &-point{
    width:60px;
    height: 60px;
    margin-right: 10px;
    cursor: pointer;
    a{
      display: block;
      height: 100%;
    }
    img {
      width: 100%;
      height: 100%;
      border-radius: 50%;
      
    }
    
  }
  &-point:last-child {
      margin-right: 0;
    }
}
</style>
