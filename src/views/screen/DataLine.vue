<template>
  <div class="screen-line" id="dataLineBox">
    <div id="dataLine"></div>
    <div class="line-box">
      <div class="line-box-time">
        <div :class="{'line-box-time-cell':true,'line-cell-active': currentType == 'day'}" @click="onChangeType('day')">日度</div>
        <div :class="{'line-box-time-cell':true,'line-cell-active': currentType == 'month'}" @click="onChangeType('month')">月度</div>
        <div :class="{'line-box-time-cell':true,'line-cell-active': currentType == 'year'}" @click="onChangeType('year')">年度</div>
      </div>
      <div class="line-check" v-show="showLegend">
      <div class="line-check-cell">
        <div class="line-cell" v-for="(item, index) of firstRow" :key="index">
          <span
            class="line-cell-circle"
            :style="{ background: item.bg }"
          ></span>
          <span :class="{ 'line-cell-active': item.status }">{{
            item.label
          }}</span>
        </div>
      </div>
      <div class="line-check-cell">
        <div
          class="line-cell"
          v-for="(item, index) of secondRow"
          :key="index"
          @click="onClickSecondRow(index)"
        >
          <span
            class="line-cell-circle"
            :style="{ background: item.bg }"
          ></span>
          <span :class="{ 'line-cell-active': item.status }">{{
            item.label
          }}</span>
        </div>
      </div>
    </div>
    </div>
    
  </div>
</template>
<script>
import DataSet from "@antv/data-set";
import { Chart } from "@antv/g2";
export default {
  data() {
    return {
      basicData: [],
      firstRow: [
        { label: "美景指数", bg: "#00d1d9", status: true },
        { label: "健康指数", bg: "#8bc34a", status: true }
      ],
      secondRow: [
        { label: "气候", bg: "#f18020", status: false },
        { label: "地貌", bg: "#ff3600", status: false },
        { label: "水文", bg: "#40a9ff", status: false },
        { label: "生物多样性", bg: "#18d724", status: false }
      ],
      showLegend: false,
      isFirst: true,
      setHeight: 0,
      currentType: "year"
    };
  },
  computed: {
    allRow() {
      return [...this.firstRow, ...this.secondRow];
    }
  },
  mounted() {
    
    this.$nextTick(() => {
      this.initLineChart();
      this.isFirst = false;
    });
  },
  methods: {
    setLineData(){
      const arr = [];
    let time = "时";
    if(this.currentType=='month') {
      time= "日";
    }
    if(this.currentType=='year') {
      time= "月";
    }
    for (let i = 0; i < 12; i++) {
      arr.push({
        month: i + 1 + time,
        scene: "美景指数",
        scord: Math.random(0, 10) * 10
      });
      arr.push({
        month: i + 1 + time,
        scene: "健康指数",
        scord: Math.random(0, 10) * 10
      });
      arr.push({
        month: i + 1 + time,
        scene: "气候",
        scord: Math.random(0, 10) * 10
      });
      arr.push({
        month: i + 1 + time,
        scene: "地貌",
        scord: Math.random(0, 10) * 10
      });
      arr.push({
        month: i + 1 + time,
        scene: "水文",
        scord: Math.random(0, 10) * 10
      });
      arr.push({
        month: i + 1 + time,
        scene: "生物多样性",
        scord: Math.random(0, 10) * 10
      });
    }

    this.basicData = arr;
    console.log(arr);
    },
    initLineChart() {
      this.setLineData();
      let showCells = [];
      this.allRow.forEach(ele => {
        if (ele.status) {
          showCells.push(ele.label);
        }
      });

      const data = this.basicData.filter(ele => {
        return !!showCells.find(o => {
          return o === ele.scene;
        });
      });
      console.log("datss -> ", showCells, data);

      const cpH = this.isFirst
        ? document.getElementById("dataLineBox").offsetHeight
        : this.setHeight;
      const caH = cpH - 80;
      if (this.isFirst) {
        this.setHeight = cpH;
      }

      document.getElementById("dataLine").innerHTML = "";
      const chart = new Chart({
        container: "dataLine",
        autoFit: true,
        height: caH
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
      chart.legend(false);

      chart.axis("scord", {
        label: {
          formatter: val => {
            return val;
          }
        }
      });

      let colorArr = [];
      this.allRow.forEach(ele => {
        colorArr.push(ele.bg);
      });
      const colors = colorArr;
      chart
        .area()
        .position("month*scord")
        .color("scene", colors)
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
          fields: ["scene"], // 数据字段
          callback: xVal => {
            const style = {
              lineWidth: 2,
              fill: "#000",
              fillOpacity: 0.6,
              stroke: this.allRow.find(o => {
                return o.label === xVal;
              }).bg
            };
            return style;
          }
        });

      chart.on("click", event => {
        if (event && event.data) {
          const shape = event.data.shape;
          if (shape == "circle") {
            this.$emit("circle", event.data.data);
          }
        }
      });

      chart.changeData(data);
      this.showLegend = true;
    },
    onClickFirstRow(index) {
      this.firstRow[index].status = !this.firstRow[index].status;
    },
    onClickSecondRow(index) {
      this.secondRow[index].status = !this.secondRow[index].status;
      this.initLineChart();
    },
    onChangeType(type){
      this.currentType=type;
      this.initLineChart();
    }
  }
};
</script>
<style lang="less" scoped>
.screen-line {
  width: 100%;
  height: 100%;
  padding: 20px;
  margin: 0 auto;
  position: relative;
}
.line-check {
  // flex: 1;
  height: 40px;
  display: flex;
  flex-direction: column;
  text-align: center;
  justify-content: center;
  &-cell {
    margin: 0 auto;
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
  }
}
.line{
  &-box {
    color: #bfbfbf;
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    align-items: center;
    &-time {
      display: flex;
    flex-direction: row;
    justify-content: space-between;
    font-size: 8px;
    &-cell {
      margin-right: 3px;
      cursor: pointer;
    }
    }
  }
  &-cell {
    
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  font-size: 8px;
  margin-right: 6px;
  cursor: pointer;
  &-circle {
    width: 10px;
    height: 10px;
    border-radius: 10px;
    background: #eeeeee;
    margin-right: 3px;
  }
  &-active {
    color: #02d5dd;
  }
}
}
</style>
