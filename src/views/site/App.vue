<template>
  <div id="nav">
    <div>
      <a href="home.html">跳转home的页面</a>
      <a href="ui.html">跳转ui的页面</a>
    </div>
    <router-view />
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  mounted() {
    console.log(this);
    console.log(this.$router);
  }
};
</script>
<style>
#nav {
  background: lawngreen;
  text-align: center;
}

#nav > a {
  display: inline;
  padding: 5px 10px;
}
</style>
