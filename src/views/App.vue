<template>
  <div class="screen-app">
    <router-view />
  </div>
</template>

<script>
export default {
  data () {
    return {}
  },
  mounted () {
  }
}

</script>
<style>
.screen-app {
  width: 100vw;
  height: 100vh;
}
</style>
<style lang="less">
@font-face {
  font-family: "Digital";
  src: url("./fonts/LED.ttf") format("truetype");
}
</style>
