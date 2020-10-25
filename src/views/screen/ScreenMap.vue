<template>
  <svg class="screen-map" id="cavPane"></svg>
</template>
<script>
import * as d3 from "d3";
export default {
  mounted() {
    this.svgInit();
    this.$nextTick(() => {
      setTimeout(() => {}, 1000);
    });
  },
  methods: {
    svgInit() {
      let self = this;
      d3.svg("/images/map.svg").then(result => {
        document.getElementById("cavPane").appendChild(result.documentElement);
        d3.select("#cavPane")
          .select("svg")
          .attr("height", "100%");

        let cavP = document.getElementById("cavPane");
        let cavPW = cavP.offsetWidth;
        let cavPH = cavP.offsetHeight;
        let svg = d3.select("#cavPane").select("svg");
        self.addMapClick(self);
        svg.call(
          d3
            .zoom()
            .scaleExtent([0.5, 3])
            .on("zoom", event => {
              let transform = event.transform;
              const scale = transform.k;
              self.addMapScale(scale);
              d3.select("#cavPane")
                .select("svg")
                .selectAll(".map")
                .attr(
                  "transform",
                  "translate(" +
                    transform.x +
                    "," +
                    transform.y +
                    ")scale(" +
                    transform.k +
                    ")"
                );
            })
        );

        self.addMapVisible();
      });
    },
    addMapClick(self) {
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
    },
    addMapScale(scale) {
      if (scale < 0.9) {
        d3.selectAll(".scale05").attr("visibility", "hidden");
      } else {
        d3.selectAll(".scale05").attr("visibility", "visible");
      }
      if (scale < 1.2) {
        d3.selectAll(".scale07").attr("visibility", "hidden");
      } else {
        d3.selectAll(".scale07").attr("visibility", "visible");
      }
      if (scale < 0.8) {
        d3.selectAll(".scale08").attr("visibility", "hidden");
      } else {
        d3.selectAll(".scale08").attr("visibility", "visible");
      }
      if (scale < 1.5) {
        d3.selectAll(".scale15").attr("visibility", "hidden");
      } else {
        d3.selectAll(".scale15").attr("visibility", "visible");
      }
      if (scale < 1.4) {
        d3.selectAll(".scale20").attr("visibility", "hidden");
      } else {
        d3.selectAll(".scale20").attr("visibility", "visible");
      }

      if (scale > 2) {
        d3.selectAll(".scale05").attr("visibility", "visible");
        d3.selectAll(".scale07").attr("visibility", "visible");
        d3.selectAll(".scale08").attr("visibility", "visible");
        d3.selectAll(".scale15").attr("visibility", "visible");
        d3.selectAll(".scale20").attr("visibility", "visible");
      }
    },
    addMapVisible() {
      d3.selectAll(".scale05").attr("visibility", "hidden");
      d3.selectAll(".scale07").attr("visibility", "hidden");
      d3.selectAll(".scale08").attr("visibility", "hidden");
      d3.selectAll(".scale15").attr("visibility", "hidden");
      d3.selectAll(".scale20").attr("visibility", "hidden");
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
}
</style>
