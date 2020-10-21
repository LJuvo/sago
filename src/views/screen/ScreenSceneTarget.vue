<template>
    <div class="scene">
        <img class="scene-img" src="healthy.png"/>
        <div class="scene-cell">
            <div class="scene-cell-panel">
                <div class="scene-cell-node" v-for="(item,key) in targetArr" :key="key">
                    <div class="scene-cell-node-title">{{item.name}}</div>
                    <div class="scene-cell-node-label">{{item.value.toFixed(1)}}</div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    props:{
        targetArr: {
            type: Array,
            default: []
        }
    }
}
</script>
<style lang="less" scoped>
.scene {
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
        padding-top: 50px;
        color: #1cf017;
        &-panel{
            padding: 0 30px;
            width: 100%;
            display: flex;
            flex-direction: row;
            justify-content: space-between;
        }
        &-node {
            margin: 0 auto;
            display: flex;
            flex-direction: row;
            justify-content: center;
            text-align: center;
            align-content: flex-end;
            align-items: baseline;
            &-title {
                font-size: 1.3vw;
                margin-right: 0.5vw;
            }
            &-label {
                font-size: 2.6vw;
                font-weight: 600;
            }
        }
    }

}
</style>