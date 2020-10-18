<template>
    <div class="video">
        <slot></slot>
    </div>
</template>
<script>
export default {
    
}
</script>
<style lang="less" scoped>
.video {
    border-radius: 10px;
    overflow: hidden;
    &-movie {
        width: 100%;
        height: 100%;
    }
    &-title {
        position: absolute;
        bottom: 0;
        width: 100%;
        height: 30px;
        line-height: 30px;
        background: rgba(0,0,0,0.4);
        color: #02d5dd;
        text-align: center;
    }
}
</style>