<template>
  <div class="screen-map" id="cavPane">
    <div class="map-legend" id="legendPane"></div>
  </div>
</template>
<script>
import * as d3 from "d3";
export default {
  mounted() {
    this.$nextTick(() => {
      setTimeout(() => {
        this.svgInit();
      }, 1000);
    });
  },
  methods: {
    svgInit() {
      let cavP = document.getElementById("cavPane");
      let cavPW = cavP.offsetWidth;
      let cavPH = cavP.offsetHeight;
      d3.svg("/images/map.svg").then(result => {
        document.getElementById("cavPane").appendChild(result.documentElement);
        d3.select("#cavPane")
          .select("svg")
          .attr("height", "80%");
        let self = this;
        let svg = d3.select("#cavPane").select("svg");


        d3.select("#cavPane")
          .select("svg")
          .selectAll("circle")
          .on("click", function(v) {
            self.$emit("on-touch");
          });
        d3.select("#cavPane")
          .select("svg")
          .selectAll(".st10")
          .on("click", function(v) {
            self.$emit("on-touch");
          });
        svg.call(
          d3
            .zoom()
            .scaleExtent([0.5, 3])
            .on("zoom", ele => {
              let transform = ele.transform;
              // console.log("scale ->", transform.k);
              const scale = transform.k;
              if (scale > 0.7) {
                d3.selectAll(".scale05").attr("visibility", "hidden");
              } else {
                d3.selectAll(".scale05").attr("visibility", "visible");
              }
              if (scale > 0.8) {
                d3.selectAll(".scale08").attr("visibility", "hidden");
              } else {
                d3.selectAll(".scale08").attr("visibility", "visible");
              }
              if (scale > 1.5) {
                d3.selectAll(".scale15").attr("visibility", "hidden");
              } else {
                d3.selectAll(".scale15").attr("visibility", "visible");
              }
              if (scale > 2 || scale < 1.4) {
                d3.selectAll(".scale20").attr("visibility", "hidden");
              } else {
                d3.selectAll(".scale20").attr("visibility", "visible");
              }
              svg.attr(
                "transform",
                "scale(" +
                  transform.k +
                  ")"
              );
            })
        );

        d3.selectAll(".scale05").attr("visibility", "hidden");
        d3.selectAll(".scale08").attr("visibility", "hidden");
        d3.selectAll(".scale15").attr("visibility", "hidden");
        d3.selectAll(".scale20").attr("visibility", "hidden");

        // .scaleExtent([0.1, 10]) // zoom limit
        // .translateExtent([[-100, -100], [cavPW + 90, cavPW + 100]]).call(zoom);
      });

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
.screen-map {
  width: 100%;
  height: 100%;
  overflow: hidden;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  &-img {
    width: 100%;
  }
}
.map {
  &-legend {
    position: absolute;
    right: 40px;
    bottom: 40px;
  }
}
</style>
