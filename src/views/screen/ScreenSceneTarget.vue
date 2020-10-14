<template>
    <div class="scene">
        <img class="scene-img" src="../images/scene.png"/>
        <div class="scene-cell">
            <div class="scene-cell-panel">
                <div class="scene-cell-node">
                    <div class="scene-cell-node-title">珍珠滩</div>
                    <div class="scene-cell-node-label">景点名称</div>
                </div>
                <div class="scene-cell-node">
                    <div class="scene-cell-node-title">1.28</div>
                    <div class="scene-cell-node-label">钙化数据</div>
                </div>
                <div class="scene-cell-node">
                    <div class="scene-cell-node-title">优</div>
                    <div class="scene-cell-node-label">指标数据</div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    
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
            flex-direction: column;
            justify-content: center;
            text-align: center;
            align-content: center;
            &-title {
                font-size: 2.6vw;
                color: #00fcff;
            }
            &-label {
                color: #ffffff;
                font-size: 12px;
            }
        }
    }

}
</style>