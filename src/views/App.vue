<template>
  <div class="screen">
    <div class="screen-tools">
      <div v-for="(cell, key) in pathList" :key="key">
        <a @click="checkMapPath(cell.path)">{{ cell.name }}</a>
      </div>
      <button @click="initPolygonMap()">刷新</button>
    </div>
    <div
      style="width: 500px;height: 500px;background: rgba(0,0,0,0.4);display:grid;"
    >
      <base-map ref="baseMap"></base-map>
    </div>
    <!-- <div>X Domain:<input v-model="mapXDomain" type="number" /></div>
    <div>X Range:<input v-model="mapXRange" type="number" /></div>
    <div>Y Domain:<input v-model="mapYDomain" type="number" /></div>
    <div>Y Range:<input v-model="mapYRange" type="number" /></div>
    <button @click="refreshMap">刷新</button> -->
    <div id="map" style="width: 100%;height: 100%;"></div>
  </div>
</template>

<script>
import * as d3 from "d3";
import BaseMap from "../comps/baseMap.vue";
export default {
  components: {
    "base-map": BaseMap
  },
  data() {
    return {
      mapXDomain: "0,200",
      mapXRange: "0,200",
      mapYDomain: "0,200",
      mapYRange: "200,0",
      defaultPath: "./china.json",
      checkedPath: "./china.json",
      pathList: [
        { name: "中国", path: "./china.json" },
        { name: "宁水", path: "./water.json" }
      ]
    };
  },
  mounted() {
    this.checkedPath = this.defaultPath;
    this.initPolygonMap();
  },
  methods: {
    refreshMap() {
      this.$refs.baseMap.refreshMap();
    },
    checkMapPath(path) {
      console.log(path);
      if (this.checkedPath !== path) {
        this.checkedPath = path;
        this.initPolygonMap();
      }
    },
    initPolygonMap() {
      let width = document.getElementById("map").offsetWidth,
        height = document.getElementById("map").offsetHeight;

      d3.select("#map")
        .selectAll("*")
        .remove();
      let mapSvg = d3
        .select("#map")
        .append("svg")
        .attr("width", width + "px")
        .attr("height", height + "px")
        .attr("style", "position: absolute;z-index: 10;");

      let shadowMap = d3
        .select("#map")
        .append("svg")
        .attr("width", width + "px")
        .attr("height", height + "px")
        .attr("style", "position: absolute;z-index: 9;");

      let self = this;
      d3.json(this.checkedPath).then(function(china) {
        let mapArr = [];
        china.features.forEach(ele => {
          ele.geometry.coordinates.forEach(el => {
            el.forEach(cell => {
              mapArr.push(cell);
            });
          });
        });

        self.addMaskMap(mapSvg, mapArr);
        self.addShadowMap(shadowMap, mapArr);
      });
    },
    getScaleX() {
      return d3
        .scaleLinear()
        .domain([-80, 20])
        .range([0, 600]);
    },
    getScaleY() {
      return d3
        .scaleLinear()
        .domain([0, 60])
        .range([500, 0]);
    },
    addMaskMap(maskNode, polygonArr) {
      let scaleX = this.getScaleX();
      let scaleY = this.getScaleY();
      let maskGroup = maskNode.append("g");
      let mask = maskGroup
        .append("defs")
        .append("mask")
        .attr("id", "mapMask");
      mask
        .selectAll("polygon")
        .data(polygonArr)
        .enter()
        .append("polygon")
        .attr("points", function(d) {
          let strArr = [];
          d.forEach(cell => {
            strArr.push([scaleX(cell[0]), scaleY(cell[1])].join(","));
          });
          return strArr.join(" ");
        })
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
          "mask: url('#mapMask'); width: 1273.81px; height: 844px;"
        );

      maskGroup
        .append("g")
        .selectAll("polygon")
        .data(polygonArr)
        .enter()
        .append("polygon")
        .attr("points", function(d) {
          let strArr = [];
          d.forEach(cell => {
            strArr.push([scaleX(cell[0]), scaleY(cell[1])].join(","));
          });
          return strArr.join(" ");
        })
        .attr("fill", "rgba(11, 16, 27, 0.1)")
        .attr("stroke-width", "1")
        .attr("stroke", "rgb(14, 215, 255)")
        .attr("stroke-dasharray", "none")
        .attr("style", "cursor: pointer;");
    },
    addShadowMap(shadowNode, polygonArr) {
      let filterTemp = shadowNode
        .append("defs")
        .append("filter")
        .attr("id", "shadowFilter")
        .attr("x", "-2000%")
        .attr("y", "-2000%")
        .attr("width", "5000%")
        .attr("height", "5000%");

      filterTemp
        .append("feOffet")
        .attr("result", "offOut")
        .attr("in", "SourceGraphic")
        .attr("dx", 0)
        .attr("dy", 0);
      filterTemp
        .append("feGaussianBlur")
        .attr("result", "blurOut")
        .attr("in", "offOut")
        .attr("stdDeviation", 5);

      let scaleX = this.getScaleX();
      let scaleY = this.getScaleY();

      shadowNode
        .append("g")
        .selectAll("polygon")
        .data(polygonArr)
        .enter()
        .append("polygon")
        .attr("points", function(d) {
          let strArr = [];
          d.forEach(cell => {
            strArr.push([scaleX(cell[0]), scaleY(cell[1] - 1)].join(","));
          });
          return strArr.join(" ");
        })
        .attr("fill", "rgba(0,0,255,0)")
        .attr("stroke", "rgba(32,218,255,0.4)")
        .attr("stroke-width", "3");

      let shadowGroup = shadowNode.append("g");
      shadowGroup
        .selectAll("polygon")
        .data(polygonArr)
        .enter()
        .append("polygon")
        .attr("points", function(d) {
          let strArr = [];
          d.forEach(cell => {
            strArr.push([scaleX(cell[0]), scaleY(cell[1] - 1)].join(","));
          });
          return strArr.join(" ");
        })
        .attr("fill", "none")
        .attr("stroke", "rgba(0,187,255,1)")
        .attr("stroke-width", "3")
        .attr("filter", "url('#shadowFilter')");
      // .attr("fill", "rgba(0,0,255,0)")
      // .attr("stroke","rgba(32,218,255,0.4)")
      // .attr("stroke-width","3");
    },

    initPathMap() {
      var width = document.getElementById("map").offsetWidth,
        height = document.getElementById("map").offsetHeight;

      var svg = d3
        .select("#map")
        .append("svg")
        .attr("width", width + "px")
        .attr("height", height + "px");

      let filterTemp = svg
        .append("defs")
        .append("filter")
        .attr("x", "-2000%")
        .attr("y", "-2000%")
        .attr("width", "5000%")
        .attr("height", "5000%");

      filterTemp
        .append("feOffet")
        .attr("result", "offOut")
        .attr("in", "SourceGraphic")
        .attr("dx", 0)
        .attr("dy", 0);
      filterTemp
        .append("feGaussianBlur")
        .attr("result", "blurOut")
        .attr("in", "offOut")
        .attr("stdDeviation", 5);

      /*
       * 创建一个地理投影
       * .center 设置投影中心位置
       * .scale 设置缩放系数
       *
       */
      var projection = d3
        .geoMercator()
        .center([463, 36])
        .scale(850)
        .translate([width / 2, height / 2]);

      //  创建路径生成器path
      var path = d3.geoPath().projection(projection);

      d3.json("./china.json").then(function(china) {
        //  获取GeoJSON数据：这里我放在了js中方便加载
        var features = china.features;

        //  //实现图表的缩放
        //     		var zoom = d3.behavior.zoom()
        //     					.scaleExtent([1,5])
        //     					.on("zoom",zoomed);

        //     		function zoomed()
        //     		{
        //     			d3.select(this)
        //     				.attr("transform","translate("+d3.event.translate+")scale("+d3.event.scale+")");
        //     		}

        //包含中国各省路径的分组元素
        var chinaw = svg.append("g");
        // .call(zoom) //调用图表缩放函数
        //颜色
        // var color = d3.schemeCategory10();

        // //添加中国各省的路径元素
        // var provinces =chinaw.selectAll("path")
        // 					.data(china.features)
        // 					.enter()
        // 					.append("path")
        // 					.attr("class","province")
        //           .attr("fill", "none")
        // 					//  .style("fill",function(d,i)
        // 					// {
        // 					// 	return color(i);
        // 					// })
        // 					.attr("stroke","#00ff00")
        // 					.attr("stroke-width","1px")
        // 					.attr("d",path)
        //           .on("mouseover", function(d, i) {
        // 	d3.select(this)
        // 	  .attr("fill", "#00ffff");
        // })
        // .on("mouseout", function(d, i) {
        // 	d3.select(this)
        // 	  .attr("fill", "none");
        // });

        var chinax = svg.append("g");

        chinax
          .selectAll("polygon")
          .data(china.features)
          .enter()
          .append("polygon")
          .attr("class", "boxshadow")
          .attr("fill", "rgba(0,0,255,0)")
          //  .style("fill",function(d,i)
          // {
          // 	return color(i);
          // })
          .attr("stroke", "rgba(32,218,255,0.4)")
          .attr("stroke-width", "3")
          .attr("d", path);

        // // 设置颜色值
        // var ss2 = d3.schemeSet2;
        // var sp2 = d3.schemePastel2;

        /*
         * 渲染地图
         *
         * mouseover 鼠标移入变色
         *
         */
        // svg.append('g')
        // 	.attr('class', 'map')
        // 	.selectAll('.china')
        // 	.data(features)
        // 	.join('path')
        // 	.attr('class', 'china')
        // 	.attr("fill", function(d, i) {
        // 		return ss2[i % 3]
        // 	})
        // 	.attr('d', path)
        // .on("mouseover", function(d, i) {
        // 	d3.select(this)
        // 	  .attr("fill", sp2[i % 3]);
        // })
        // .on("mouseout", function(d, i) {
        // 	d3.select(this)
        // 	  .attr("fill", ss2[i % 3]);
        // });
      });
    }
  }
};
</script>
<style lang="less">
@font-face {
  font-family: "Digital";
  src: url("./fonts/LED.ttf") format("truetype");
}
</style>
<style lang="less" scoped>
.screen {
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  background: url("./screen/bg.png") no-repeat;
  background-size: cover;
  background-position: center 0;
  position: relative;
  &-tools {
    position: absolute;
    top: 0;
    right: 0;
    min-width: 300px;
    color: #fff;
    z-index: 20;
  }
}
</style>
