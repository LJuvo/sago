<template>
  <section class="base-editor" id="editor">
    <input type="button" class="btn-text" @click="drawClear" value="删除" />
    <input type="button" class="btn-text" @click="drawEdit" value="编辑" />
    <input type="button" class="btn-text" @click="drawLine()" value="绘线" />
  </section>
</template>
<script>
import * as d3 from "d3";
export default {
  data() {
    return {
      svg: null,
      points: [],
      isDrawingLine: false,
      gis_edit: false
    };
  },
  mounted() {
    this.initEditor();
  },
  methods: {
    drawLine() {
      this.isDrawingLine = !this.isDrawingLine;
    },
    drawEdit() {
      if (this.gis_edit) {
        this.gis_edit = false;

        d3.selectAll("circle").remove();
        d3.select("path").style("stroke-dasharray", null);
      } else {
        this.gis_edit = true;
      }
    },
    drawClear() {
      this.points = [];
      this.redraw();
    },
    initEditor() {
      let editorId = "editor";
      const domElement = d3
        .select("#" + editorId)
        .append("svg")
        .attr("width", "100%")
        .attr("height", "100%")
        .on("mousedown", this.mousedown);
      this.svg = domElement;
      const imagePath = "images/map.png";
      domElement
        .append("svg:image")
        .attr("xlink:href", imagePath)
        .attr("cx", 0)
        .attr("cy", 0);

      domElement.call(
        d3
          .zoom()
          .scaleExtent([0.5, 3])
          .on("zoom", event => {
            let transform = event.transform;
            const scale = transform.k;
            d3.select("#editor")
              .select("svg")
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
    },
    mousedown(evt) {
      //没有开启编辑
      if (!this.isDrawingLine) return;

      const point = d3.mouse(this.svg.node());
      this.selected = this.dragged = point;
      this.points.push(point);
      this.redraw();
    },
    redraw() {
      console.log(" redraw =>");

      this.svg
        .select("path")
        .attr("d", function(d, i) {
          var line = d3.line();
          const point = line(this.points);

          console.log("point ->", point);
          return point;
        })
        .style("stroke-dasharray", "10 5")
        .on("click", this.lineOnClick) //全局鼠标点击
        .on("mouseover", function(d, i) {
          d3.select(this).style("stroke-width", 3);
          this.lineSelect = true;
        })
        .on("mouseout", function(d, i) {
          d3.select(this).style("stroke-width", 1);
          this.lineSelect = false;
        });

      var circle = this.svg.selectAll("circle").data(this.points, function(d) {
        return d;
      });

      circle
        .enter()
        .append("circle")
        .attr("r", 6)
        .on("mousedown", function(d) {
          this.selected = this.dragged = d;
          redraw();
        })
        .transition()
        .duration(750)
        .ease("elastic")
        .attr("r", 6.5);

      circle
        .classed("selected", function(d) {
          return d === this.selected;
        })
        .attr("cx", function(d) {
          return d[0];
        })
        .attr("cy", function(d) {
          return d[1];
        });

      circle.exit().remove();

      if (d3.event) {
        d3.event.preventDefault();
        d3.event.stopPropagation();
      }

      console.log("point -> ");
    },
    lineOnClick() {
      if (this.gis_edit) {
        d3.select(this).style("stroke-dasharray", "10 5");

        this.drawHotPoint();
      }
    },
    drawHotPoint() {
      svg
        .selectAll("circle")
        .data(this.points, function(d) {
          return d;
        })
        .enter()
        .append("circle")
        .on("mousedown", function(d) {
          this.selected = this.dragged = d;
          redraw();
        })
        .attr("r", 6.5)
        .attr("cx", function(d) {
          return d[0];
        })
        .attr("cy", function(d) {
          return d[1];
        });
    },
    svgInit() {
      d3.svg("/images/map.svg").then(result => {
        document.getElementById("editor").appendChild(result.documentElement);
        d3.select("#editor")
          .select("svg")
          .attr("height", "100%");

        let svg = d3.select("#editor").select("svg");
        svg.call(
          d3
            .zoom()
            .scaleExtent([0.5, 3])
            .on("zoom", event => {
              let transform = event.transform;
              const scale = transform.k;
              d3.select("#editor")
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
      });
    }
  }
};
</script>
<style lang="less" scoped>
.base-editor {
  width: 100%;
  height: 100%;
}
</style>
