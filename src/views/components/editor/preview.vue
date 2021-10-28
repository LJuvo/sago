<template>
  <div class="base-preview" :id="boxId"></div>
</template>
<script>
import * as d3 from "d3";
export default {
  data() {
    return {
      boxId: "previewBox",
      bgPath: "images/map.png",
      points: [
        { x: 10, y: 10 },
        { x: 80, y: 120 },
        { x: 70, y: 210 },
        { x: 120, y: 40 }
      ],
      areas: [
        [
          { x: 80, y: 10 },
          { x: 180, y: 10 },
          { x: 180, y: 80 },
          { x: 80, y: 80 }
        ],
        [
          { x: 210, y: 110 },
          { x: 180, y: 220 },
          { x: 120, y: 220 },
          { x: 120, y: 140 }
        ]
      ]
    };
  },
  mounted() {
    this.initPreviewView();
  },
  methods: {
    initPreviewView() {
      let width = document.getElementById(this.boxId).offsetWidth;
      let height = document.getElementById(this.boxId).offsetHeight;
      let domEle = d3
        .select("#" + this.boxId)
        .append("svg")
        .attr("width", "100%")
        .attr("height", "100%")
        .call(
          d3.zoom().on("zoom", function() {
            //  无限制缩放平移
            let transform = d3.event.transform;
            domEle.attr(
              "transform",
              "translate(" +
                transform.x +
                "," +
                transform.y +
                ")scale(" +
                transform.k +
                ")"
            );

            // 限制平移缩放
            // let transform = d3.event.transform;
            // d3.event.transform.x = Math.min(
            //   0,
            //   Math.max(transform.x, width - width * transform.k)
            // );
            // d3.event.transform.y = Math.min(
            //   0,
            //   Math.max(transform.y, height - height * transform.k)
            // );
            // domEle.attr("transform", d3.event.transform);
          })
        )
        .append("g");
      domEle
        .append("svg:image")
        .attr("xlink:href", this.bgPath)
        .attr("cx", 0)
        .attr("cy", 0);

      this.drawPoints(domEle);
      this.drawAreas(domEle);
    },
    drawPoints(domEle) {
      let pointGroup = domEle.append("g").attr("id", "point-group");

      this.points.forEach(ele => {
        const { x, y } = ele;
        pointGroup
          .append("circle")
          .attr("cx", x)
          .attr("cy", y)
          .attr("r", 8)
          .attr("fill", "red");
      });
    },
    drawAreas(domEle) {
      let areaGroup = domEle.append("g").attr("id", "area-group");

      areaGroup.exit().remove();

      const polygon = areaGroup.selectAll("polygon").data(this.areas, d => {
        return d.map(d => [d.x, d.y].join("#")).join("#");
      });

      polygon
        .enter()
        .append("polygon")
        .merge(polygon)
        .attr("points", d => {
          return d.map(d => [d.x, d.y].join(",")).join(" ");
        })
        .attr("stroke", "#007bff")
        .attr("stroke-width", 1)
        .attr("fill", "#007bff")
        .attr("fill-opacity", 0.25);

      polygon.exit().remove();
    }
  }
};
</script>
<style lang="less" scoped>
.base-preview {
  width: 100%;
  height: 100%;
}
</style>
