<template>
  <div class="screen-polar" id="dataLine"></div>
</template>
<script>
import DataSet from "@antv/data-set";
import { Chart } from "@antv/g2";
export default {
  mounted() {
    const arr = [];
    for (let i = 0; i < 12; i++) {
      arr.push({
        month: i + 1 + "月",
        scene: "气候",
        scord: Math.random(0, 10)* 10
      });
      arr.push({
        month: i + 1 + "月",
        scene: "地貌",
        scord: Math.random(0, 10)* 10
      });
      arr.push({
        month: i + 1 + "月",
        scene: "水文",
        scord: Math.random(0, 10)* 10
      });
      arr.push({
        month: i + 1 + "月",
        scene: "生物多样性",
        scord: Math.random(0, 10) * 10
      });
    }
    const sceneArr = ["气候", "地貌", "水文", "生物多样性"];
    const data = arr;

    const chart = new Chart({
      container: "dataLine",
      autoFit: true,
      height: 300
    });

    chart.data(data);
    chart.scale({
      month: {
        range: [0, 1]
      },
      scord: {
        nice: true
      }
    });
 
    chart.tooltip({
      shared: true,
      showCrosshairs: true,
      crosshairs: {
        line: {
          style: {
            lineDash: [4],
            stroke: "#00FFEF",
            fill: "#00FFEF"
          }
        }
      }
    });

    chart.axis("scord", {
      label: {
        formatter: val => {
          return val;
        }
      }
    });

    const colors = ["#00d1d9", "#70ec39", "#f18020", "#ff3600"];
    const acolors = ["#70ec39-#0050B3-#0e213e", "#00d1d9-#0050B3-#0e213e", "#f18020-#0050B3-#0e213e", "#ff3600-#0050B3-#0e213e"];
    chart
      .area()
      .position("month*scord")
      .color('scene', colors)
      .style({
        fillOpacity: 0.2
      });
    chart
      .line()
      .position("month*scord")
      .color("scene", colors);

    chart
      .point()
      .position("month*scord")
      .shape("circle")
      .style({
  fields: ['scene'], // 数据字段
  callback: (xVal) => {
    const style = { lineWidth: 2, fill: "#000",fillOpacity: 0.6, stroke: colors[sceneArr.findIndex(o=>{
      return o === xVal;
    })] };
    return style;
  },
})
      // .adjust('jitter')
      // .shape('circle')
      // .style({
      //   opacity: 0.65,
      // })

    chart.on("click", event => {
      const shape = event.data.shape;
      if (shape == "circle") {
        this.$emit("circle", event.data.data);
      }
    });

    chart.render();
  }
};
</script>
<style lang="less" scoped>
.screen-polar {
  width: 100%;
  height: 100%;
  padding: 20px;
  margin: 0 auto;
}
</style>
