<template>
    <div class="pane">
        <div class="pane-head">
            <img class="pane-img" src="images/img/target_top.png"/>
        </div>
        <div class="pane-body">
            <slot></slot>
        </div>
        <div class="pane-footer">
            <img class="pane-img" src="images/img/target_bottom.png"/>
        </div>
    </div>
</template>
<script>
export default {
    props: {
        headImg: {
            type: String,
            default: ""
        },
        bodyImg: {
            type: String,
            default: ""
        },
        footerImg: {
            type: String,
            default: ""
        },
        padding: {
            type: String,
            default: "0 0"
        },
    }
}
</script>
<style lang="less" scoped>
.pane {
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    position: relative;
    &-head {
        width: 100%;
    }
    &-body {
        width: 100%;
        flex: 1;
        background: url("images/img/target_center.png");
        background-repeat: no-repeat;
        background-size: 100% 100%;
    }
    &-footer {
        width: 100%;
    }
    &-img {
        width: 100%;
    }
}
</style>