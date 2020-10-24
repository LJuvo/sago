<template>

  <div class="map-legend" id="legendPane"></div>

</template>
<script>
import * as d3 from "d3";
export default {
  mounted() {

    this.addLegend();
  },
  methods: {
    
    addLegend() {
      d3.svg("/images/legend.svg").then(result => {
        document
          .getElementById("legendPane")
          .appendChild(result.documentElement);
        d3.select("#legendPane")
          .select("svg")
          .attr("height", 80);
      });
    }
  }
};
</script>
<style lang="less" scoped>
.map {
  &-legend {
    position: absolute;
    right: 40px;
    bottom: 40px;
  }
}
</style>
