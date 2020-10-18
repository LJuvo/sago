<template>
  <div class="screen-polar" id="polar"></div>
</template>
<script>
import DataSet from "@antv/data-set";
import { Chart } from "@antv/g2";
export default {
  mounted() {

    this.fetchPolar()
  },
  methods:{
    fetchPolar() {
      this.$axios({
        url: "/act/current/zhibiaoValue",
        method: "get",
        headers: {
          "Content-Type": "application/json;charset=UTF-8"
        }
      }).then(res => {
        console.log(res.data.data);
        this.initPolar(res.data.data)
      });
    },
    initPolar(polarArr){
      const data = polarArr;
    //   const data = [
    //   { item: "水体景观", a: 70 },
    //   { item: "钙化景观", a: 60 },
    //   { item: "气候", a: 50 },
    //   { item: "生物多样性", a: 40 },
    //   { item: "水文水质", a: 60 },
    //   { item: "地貌", a: 70 },
    //   { item: "生物生态景观", a: 50 }
    // ];
    const { DataView } = DataSet;
    const dv = new DataView().source(data);
    dv.transform({
      type: "fold",
      fields: ["value"], // 展开字段集
      key: "user", // key字段
      value: "score" // value字段
    });

    const chart = new Chart({
      container: "polar",
      autoFit: true,
      height: 250
    });
    chart.data(dv.rows);
    
    chart.scale("score", {
      min: 0,
      max: 10
    });
    chart.coordinate("polar", {
      radius: 0.8
    });
    chart.tooltip({
      shared: true,
      showCrosshairs: true,
      crosshairs: {
        line: {
          style: {
            lineDash: [4],
            stroke: "#00FFEF",
            fill:"#00FFEF"
          }
        }
      }
    });
    chart.legend(false);
    chart.axis("name", {
      line: null,
      tickLine: null,
      label:{
        style: {
          fill: "#00FFEF"
        }
      },
      grid: {
        line: {
          style: {
            lineDash: null,
            stroke: "#FEF"
          }
        }
      }
    });
    chart.axis("score", {
      line: null,
      tickLine: null,
      label: null,
      grid: {
        line: {
          type: "line",
          style: {
            lineDash: null,
            lineWidth: 1,
            stroke: "#00FFEF"
          }
        }
      }
    });
  
    chart
      .line()
      .position("name*score")
      .color("user")
      .size(2)
      .style({
        stroke: "#02FF02",
        lineWidth: 2,
        fillOpacity: 1
      });
    chart
      .point()
      .position('name*score')
      .color('user')
      .shape('circle')
      .size(4)
      .style({
        stroke: '#fff',
        lineWidth: 1,
        fillOpacity: 1,
        fill: "#02FF02",
      });
    chart
      .area()
      .position("name*score")
      .color("user")
      .style({
        fill: "#02FF02",
        fillOpacity: 0.2
      });
    chart.render();
    }
  }
};
</script>
<style lang="less" scoped>
.screen-polar {
  width: 100%;
  margin: 0 auto;
}
</style>
