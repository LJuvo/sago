<template>
  <div class="screen-map" id="cavPane"></div>
</template>
<script>
import * as d3 from "d3";
export default {
  mounted() {
    this.svgInit();
  },
  methods: {
    svgInit() {
      let cavP = document.getElementById("cavPane");
      let cavPW = cavP.offsetWidth;
      let cavPH = cavP.offsetHeight;
        d3.svg("/map.svg").then(result => {
            console.log(result)
          
          document.getElementById("cavPane").appendChild(result.documentElement);
            d3.select("#cavPane").select("svg").attr("height",400)
          
        // .scaleExtent([0.1, 10]) // zoom limit
        // .translateExtent([[-100, -100], [cavPW + 90, cavPW + 100]]).call(zoom);
        });

    },
    
  }
};
</script>
<style lang="less" scoped>
.screen-map {
  width: 100%;
  height: 100%;
  overflow: hidden;
  position: relative;
  &-img {
    width: 100%;
  }
}
</style>
