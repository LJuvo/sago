<template>
  <div class="date-weather">
    <div class="screen-date">
    <div class="screen-date-time">{{ time }}</div>
    <div class="screen-date-today">
      <div class="screen-date-today-year">{{ today }}</div>
      <div class="screen-date-today-week">{{ week }}</div>
    </div>
  </div>
  <div class="screen-weather">
    <!-- <img class="screen-weather-img" src="weather/sun.png" /> -->
  </div>
  </div>
</template>
<script>
import dayjs from "dayjs";
export default {
  data() {
    return {
      time: "",
      today: "",
      week: ""
    };
  },
  mounted() {
    window.setInterval(() => {
      this.time = dayjs().format("HH:mm:ss");
      this.today = dayjs().format("YYYY.MM.DD");
      this.week = this.getCurrentWeek();
    }, 1000);
  },
  methods: {
    getCurrentWeek() {
      var str = "";
      var week = dayjs().day();
      switch (week) {
        case 1:
          return "星期一";
          break;
        case 2:
          return "星期二";
          break;
        case 3:
          return "星期三";
          break;
        case 4:
          return "星期四";
          break;
        case 5:
          return "星期五";
          break;
        case 6:
          return "星期六";
          break;
        default:
          return "星期日";
          break;
      }
    }
  }
};
</script>
<style lang="less" scoped>
.screen-date {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  color: #ffffff;
  &-time {
    font-size: 45px;
    line-height: 35px;
    font-family: Digital;
  }
  &-today {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    padding-left: 5px;
    font-size: 16px;
    &-year {
      text-align: left;
    }
    &-week {
      text-align: right;
    }
  }
}
.screen-weather {
    margin-left: 1vw;
    &-img {
      width: 4vw;
    }
  }
.date-weather {
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
}
</style>
