<template>
  <div id="baseMap" class="base-map"></div>
</template>
<script>
import * as d3 from "d3";
export default {
  data() {
    return {};
  },
  mounted() {
    this.initBaseMap("baseMap", "/china.json");
  },
  methods: {
    refreshMap() {
      this.initBaseMap("baseMap", "/china.json");
    },
    initBaseMap(mapId, path) {
      let width = document.getElementById(mapId).offsetWidth;
      let height = document.getElementById(mapId).offsetHeight;

      d3.select("#" + mapId)
        .selectAll("*")
        .remove();
      let mapSvg = d3
        .select("#" + mapId)
        .append("svg")
        .attr("width", width + "px")
        .attr("height", height + "px")
        .attr("style", "position: absolute;z-index: 10;");
      let shadowMap = d3
        .select("#" + mapId)
        .append("svg")
        .attr("width", width + "px")
        .attr("height", height + "px")
        .attr("style", "position: absolute;z-index: 9;");

      const projection = d3
        .geoMercator()
        .center([107, 31])
        .scale(300)
        .translate([width / 2, height / 2]);

      const color = d3.schemeCategory10;

      const projectPath = d3.geoPath().projection(projection);

      let self = this;
      d3.json(path).then(function(china) {
        self.addMaskMap(mapSvg, china.features, projectPath);
        // mapSvg
        //   .selectAll("g")
        //   .data(china.features)
        //   .enter()
        //   .append("g")
        //   .append("path")
        //   .attr("d", projectPath)
        //   .attr("stroke", "#000")
        //   .attr("stroke-width", 1)
        //   .attr("opacity", 0.6)
        //   .attr("fill", function(d, i) {
        //     return color[i % 10];
        //   });
        // //   .on("mouseover", function() {
        // //     d3.select(this).attr("opacity", 1);
        // //   })
        // //   .on("mouseout", function() {
        // //     d3.select(this).attr("opacity", 0.6);
        // //   });
      });

      //   d3.json(path).then(function(china) {
      //     let mapArr = [];
      //     china.features.forEach(ele => {
      //       ele.geometry.coordinates.forEach(el => {
      //         el.forEach(cell => {
      //           mapArr.push(cell);
      //         });
      //       });
      //     });

      //     self.addMaskMap(mapSvg, mapArr);
      //     // self.addShadowMap(shadowMap, mapArr);
      //   });
    },
    getScaleX() {
      return d3
        .scaleLinear()
        .domain([50, 100])
        .range([0, 200]);
    },
    getScaleY() {
      return d3
        .scaleLinear()
        .domain([30, 100])
        .range([240, 0]);
    },
    addMaskMap(maskNode, polygonArr, projectPath) {
      let scaleX = this.getScaleX();
      let scaleY = this.getScaleY();
      let maskGroup = maskNode.append("g");
      let mask = maskGroup
        .append("defs")
        .append("mask")
        .attr("id", "baseMapMask");
      mask
        .selectAll("polygon")
        .data(polygonArr)
        .enter()
        .append("polygon")
        .append("path")
        .attr("d", projectPath)
        // .attr("points", function(d) {
        //   let strArr = [];
        //   d.forEach(cell => {
        //     // strArr.push([cell[0], cell[1]].join(","));
        //     strArr.push([scaleX(cell[0]), scaleY(cell[1])].join(","));
        //   });
        //   return strArr.join(" ");
        // })
        .attr("fill", "white");

      maskGroup
        .append("image")
        .attr(
          "href",
          "https://easyv.assets.dtstack.com/data/img/7478/35145/wkEdWxow7_1595483348064_oYfKXcfj2O.jpg"
        )
        .attr("height", "980")
        .attr(
          "style",
          "mask: url('#baseMapMask'); width: 1273.81px; height: 844px;"
        );

      maskGroup
        .append("g")
        .selectAll("polygon")
        .data(polygonArr)
        .enter()
        .append("polygon")
        .append("path")
        .attr("d", projectPath)
        // .attr("points", function(d) {
        //   let strArr = [];
        //   d.forEach(cell => {
        //     strArr.push([scaleX(cell[0]), scaleY(cell[1])].join(","));
        //   });
        //   return strArr.join(" ");
        // })
        .attr("fill", "rgba(11, 16, 27, 0.1)")
        .attr("stroke-width", "1")
        .attr("stroke", "rgb(14, 215, 255)")
        .attr("stroke-dasharray", "none")
        .attr("style", "cursor: pointer;");
    }
  }
};
</script>
<style lang="less" scoped>
.base-map {
  width: 100%;
  height: 100%;
  position: relative;
}
</style>
