<template>
  <div class="base-editor" :id="boxId">
    <div class="base-editor-props">
      <div>
        <button @click="startPoint()">标注</button>
        <button @click="startArea()">区域</button>
        <button @click="startPolygon()">矩形</button>
        <button @click="startSetting()">配置模式</button>
        <button @click="refreshPoint()">刷新</button>
      </div>
      <div v-if="editType === 'area'">
        <button @click="paintAreaPoint()">绘点</button>
        <button @click="paintAreaLine()">连线</button>
      </div>
      <div>名称：<span>A型修正型</span></div>
    </div>
  </div>
</template>
<script>
import * as d3 from "d3";
export default {
  data() {
    return {
      boxId: "editorBox",
      boxEle: null,
      editType: "",
      bgPath: "images/map.png",
      editTrans: null,
      lastTransform: null,
      points: [
        // { x: 10, y: 10 },
        // { x: 80, y: 120 },
        // { x: 70, y: 210 },
        // { x: 120, y: 40 }
      ],
      areas: [
        // [
        //   { x: 80, y: 10 },
        //   { x: 180, y: 10 },
        //   { x: 180, y: 80 },
        //   { x: 80, y: 80 }
        // ],
        // [
        //   { x: 210, y: 110 },
        //   { x: 180, y: 220 },
        //   { x: 120, y: 220 },
        //   { x: 120, y: 140 }
        // ]
      ],
      areaPoints: [],
      paintAreas: [],
      paintAreaIndex: 0
    };
  },
  mounted() {
    this.initPreviewView();
  },
  methods: {
    initPreviewView() {
      let width = document.getElementById(this.boxId).offsetWidth;
      let height = document.getElementById(this.boxId).offsetHeight;
      let self = this;
      let domEle = d3
        .select("#" + this.boxId)
        .append("svg")
        .attr("width", "100%")
        .attr("height", "100%")
        .call(
          d3
            .zoom()
            .on("zoom", function() {
              // 限制平移缩放
              let transform = d3.event.transform;
              self.editTrans = {
                x: transform.x,
                y: transform.y,
                k: transform.k
              };
              d3.event.transform.x = Math.min(
                0,
                Math.max(transform.x, width - width * transform.k)
              );
              d3.event.transform.y = Math.min(
                0,
                Math.max(transform.y, height - height * transform.k)
              );
              domEle.attr("transform", d3.event.transform);
            })
            .on("end", function() {
              self.lastTransform = d3.event.transform;
            })
        )
        .append("g");

      this.setBackGround(domEle);
      this.boxEle = domEle;
    },
    setBackGround(domEle) {
      domEle
        .append("svg:image")
        .attr("xlink:href", this.bgPath)
        .attr("cx", 0)
        .attr("cy", 0);
    },
    startPoint() {
      this.clearEditType();
      this.editType = "point";
      let pointGroup = this.boxEle.append("g").attr("id", "point-group");
      this.boxEle.on("mousedown", (d, i, n) => {
        const [x, y] = d3.mouse(n[i]);

        pointGroup
          .append("circle")
          .attr("cx", x)
          .attr("cy", y)
          .attr("r", 4)
          .attr("fill", "yellow");

        this.points.push({ x, y });
      });
    },
    startArea() {
      this.clearEditType();
      this.editType = "area";
    },
    startPolygon() {
      this.clearEditType();
      this.editType = "polygon";
    },
    startSetting() {
      this.clearEditType();
      this.editType = "";
    },
    clearEditType() {
      this.editType = "";
      this.boxEle.on("mousedown", null);
      this.boxEle.on("drag", null);
    },
    refreshPoint() {
      this.clearEditType();
      this.drawPoints(this.boxEle);
    },
    drawPoints(domEle) {
      domEle.selectAll("#point-group").remove();
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
    },
    paintAreaPoint() {
      this.clearPaintArea();
      let areaPointGroup = this.initAreaPointPane();
      let _this = this;

      this.boxEle.on("click", (d, i, n) => {
        const [x, y] = d3.mouse(n[i]);
        let pointIndex;

        const pid = `${x}_${y}_${Math.random().toFixed(6)}`;
        areaPointGroup
          .append("circle")
          .attr("cx", x)
          .attr("cy", y)
          .attr("r", 5)
          .attr("fill", "blue")
          .call(
            d3
              .drag()
              .on("start", function(d) {
                d3.select(this).classed("active", true);
                pointIndex = _this.areaPoints.findIndex(o => o.pid === pid);
              })
              .on("drag", (d, i, n) => {
                d3.select(n[i])
                  .attr("cx", d3.event.x)
                  .attr("cy", d3.event.y);
              })
              .on("end", function(d) {
                d3.select(this).classed("active", false);
                const nx = d3.event.x;
                const ny = d3.event.y;

                if (pointIndex > -1) {
                  _this.areaPoints[pointIndex] = {
                    pid,
                    x: nx,
                    y: ny
                  };

                  pointIndex = null;
                }
              })
          );

        this.areaPoints.push({ pid, x, y });
      });
    },
    paintAreaLine() {
      this.clearPaintArea();
      this.boxEle.selectAll("#area-point-group").remove();
      let areaPointGroup = this.boxEle
        .append("g")
        .attr("id", "area-point-group");

      let lineGroup = this.boxEle.append("g").attr("id", "area-line-group");

      let paintAreaIndex = 0;
      let firstPointId = "";
      let areas = [];
      let _this = this;
      let points = [];

      this.areaPoints.forEach(ele => {
        const { x, y } = ele;
        const pid = `${x}_${y}_${Math.random().toFixed(6)}`;
        areaPointGroup
          .append("circle")
          .attr("id", pid)
          .attr("cx", x)
          .attr("cy", y)
          .attr("r", 5)
          .attr("fill", "blue")
          .on("click", function(d, i, n) {
            if (firstPointId === pid) {
              console.log("finish");

              _this.areas.push(areas);
              _this.drawAreas(_this.boxEle);
              _this.clearPaintLine(lineGroup);
              d3.select(this)
                .attr("r", 5)
                .attr("fill", "blue");

              paintAreaIndex = 0;
              firstPointId = "";
              points = [];
              areas = [];
            } else {
              if (paintAreaIndex === 0) {
                firstPointId = pid;
                d3.select(this)
                  .attr("r", 8)
                  .attr("fill", "yellow");
              }

              paintAreaIndex++;
              areas.push({ x, y });
              points.push([x, y]);
              _this.paintLine(lineGroup, points);
              console.log("click-paintAreaIndex->", paintAreaIndex);
            }
          });
      });
    },
    paintLine(lineGroup, points) {
      this.clearPaintLine(lineGroup);
      let lineGenerator = d3
        .line()
        .x(function(d) {
          return d[0];
        })
        .y(function(d) {
          return d[1];
        });

      lineGroup
        .append("path")
        .attr("stroke", "red")
        .attr("stroke-width", 2)
        .attr("fill", "none")
        .attr("d", lineGenerator(points));
    },
    clearPaintLine(lineGroup) {
      lineGroup.selectAll("path").remove();
    },
    initAreaPointPane() {
      this.boxEle.selectAll("#area-point-group").remove();
      let areaPointGroup = this.boxEle
        .append("g")
        .attr("id", "area-point-group");

      this.appendAreaPoints(areaPointGroup);

      return areaPointGroup;
    },
    appendAreaPoints(areaEle) {
      this.areaPoints.forEach(ele => {
        const { x, y } = ele;
        areaEle
          .append("circle")
          .attr("cx", x)
          .attr("cy", y)
          .attr("r", 5)
          .attr("fill", "blue");
      });
    },
    clearPaintArea() {
      this.boxEle.on("click", null);
    }
  }
};
</script>
<style lang="less" scoped>
.base-editor {
  width: 100%;
  height: 100%;
  position: relative;
  &-props {
    position: absolute;
    right: 10px;
    top: 10px;
    width: 300px;
    padding: 10px;
    background: #fff;
  }
}
</style>
