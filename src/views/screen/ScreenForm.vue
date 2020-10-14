<template>
    <div class="form">
        <img class="form-img" src="../images/form.png"/>
        <div class="form-cell">
            <FormTarget></FormTarget>
        </div>
    </div>
</template>
<script>
import FormTarget from "./FormTarget";
export default {
    components: {
        FormTarget
    }
}
</script>
<style lang="less" scoped>
.form {
    width: 100%;
    position: relative;
    &-img {
        width: 100%;
    }
    &-cell {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: calc(100% - 60px);
    padding-top: 45px;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
  }
}
</style>