<template>
  <div class="screen-polar" id="dataLine"></div>
</template>
<script>
import DataSet from "@antv/data-set";
import { Chart } from "@antv/g2";
export default {
  mounted() {
    // const data = [
    //   { year: "1月", north: 322, south: 162 },
    //   { year: "2月", north: 324, south: 90 },
    //   { year: "3月", north: 329, south: 50 },
    //   { year: "4月", north: 342, south: 77 },
    //   { year: "5月", north: 348, south: 35 },
    //   { year: "6月", north: 334, south: 45 },
    //   { year: "7月", north: 325, south: 88 },
    //   { year: "8月", north: 316, south: 120 },
    //   { year: "9月", north: 318, south: 156 },
    //   { year: "10月", north: 330, south: 123 },
    //   { year: "11月", north: 355, south: 88 },
    // ];

const arr = []
    for(let i=0;i<12;i++) {
        arr.push({
            month:i+1 + "月",
            scene: "气候",
            scord: Math.random(0,10)
        });
        arr.push({month:i+1 + "月",scene: "地貌",scord: Math.random(0,10) });
        arr.push({month:i+1 + "月",scene: "水文",scord: Math.random(0,10) });
        arr.push({month:i+1 + "月",scene: "生物多样性",scord: Math.random(0,10) });
    }
    const data = arr;
//     const data = [
//   { month: '1月', scene: '气候', scord: 7 },
//   { month: '1月', scene: '地貌', scord: 3.9 },
//   { month: '2月', scene: '气候', scord: 6.9 },
//   { month: '2月', scene: '地貌', scord: 4.2 },
//   { month: '3月', scene: '气候', scord: 9.5 },
//   { month: '3月', scene: '地貌', scord: 5.7 },
//   { month: '4月', scene: '气候', scord: 14.5 },
//   { month: '4月', scene: '地貌', scord: 8.5 },
//   { month: '5月', scene: '气候', scord: 18.4 },
//   { month: '5月', scene: '地貌', scord: 11.9 },
//   { month: '6月', scene: '气候', scord: 21.5 },
//   { month: '6月', scene: '地貌', scord: 15.2 },
//   { month: '7月', scene: '气候', scord: 25.2 },
//   { month: '7月', scene: '地貌', scord: 17 },
//   { month: '8月', scene: '气候', scord: 26.5 },
//   { month: '8月', scene: '地貌', scord: 16.6 },
//   { month: '9月', scene: '气候', scord: 23.3 },
//   { month: '9月', scene: '地貌', scord: 14.2 },
//   { month: '10月', scene: '气候', scord: 18.3 },
//   { month: '10月', scene: '地貌', scord: 10.3 },
//   { month: '11月', scene: '气候', scord: 13.9 },
//   { month: '11月', scene: '地貌', scord: 6.6 },
//   { month: '12月', scene: '气候', scord: 9.6 },
//   { month: '12月', scene: '地貌', scord: 4.8 },
// ];
    // // 数据需要加工成 {year: '1996', type: 'north', value: 50} 的模式
    // const dv = new DataSet.DataView().source(data);
    // dv.transform({
    //   type: "fold",
    //   fields: ["north", "south"], // 展开字段集
    //   key: "type", // key字段
    //   value: "value" // value字段
    // });

    const chart = new Chart({
      container: "dataLine",
      autoFit: true,
      height: 300
    });

    chart.data(data);
chart.scale({
  month: {
    range: [0, 1],
  },
  scord: {
    nice: true,
  },
});
    // chart.scale("year", {
    //   range: [0, 1]
    // });
    // chart.scale("value", {
    //   nice: true
    // });
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

chart.axis('scord', {
  label: {
    formatter: (val) => {
      return val;
    },
  },
});


chart
      .area()
      .position("month*scord")
      .color("scene", ["red","orange","yellow","green","blue"]).style({
          fillOpascene: 0.2
      });
chart
  .line()
  .position('month*scord')
  .color('scene', ["red","orange","yellow","green","blue"]);

chart
  .point()
  .position('month*scord')
  .color('scene')
  .shape('circle')
  .style({
        lineWidth: 1,
        fill: "none",
      });
      
    chart.render();
  }
};
</script>
<style lang="less" scoped>
.screen-polar {
  width: 100%;
  padding: 20px;
  margin: 0 auto;
}
</style>
