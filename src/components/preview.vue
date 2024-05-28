<template>
    <div class="preview">
        <div class="preview-cto">
            <div class="cto-item"
                 :class="checkedKey === item.key ? 'active' : ''"
                 v-for="item in previewList" :key="item.key" @click.stop="handleClickPreview(item.key)">
                <div class="img-box">
                    <img :src="item.previewImg" alt="">
                </div>
                <div class="item-tip">{{item.name}}</div>
            </div>
        </div>
    </div>
</template>

<script>
import materialConfig from "@/utils/config";
export default {
    data() {
        return {
            previewList: [],
            checkedKey: 'drawingRoom'
        }
    },
    mounted() {
        this.previewList = Object.keys(materialConfig).map(key => {
            return {
                key,
                ...materialConfig[key]
            }
        })
    },
    methods: {
        changeView(key) {
            this.checkedKey = key;
        },
        handleClickPreview(key) {
            this.checkedKey = key;
            this.$emit('changeView', key);
        }
    }
}
</script>


<style scoped>
.preview{
    position: fixed;
    left: 0;
    bottom: 100px;
    width: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    z-index: 999;
}
.preview .preview-cto {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 10px 0;
}
.preview .preview-cto .cto-item{
    margin: 0 10px;
    border: 5px solid #FFFFFF;
    width: 110px;
    height: 110px;
    display: flex;
    flex-direction: column;
    cursor: pointer;
}
.active{
    border: 5px solid #f8ba1f!important;
}
.preview .preview-cto .img-box{
    height: 80px;
    width: 100%;
}
.preview .preview-cto .img-box img{
    width: 100%;
    height: 100%;
    object-fit: cover;
}
.preview .preview-cto .cto-item .item-tip{
    color: #FFFFFF;
    font-size: 12px;
    text-align: center;
    margin-top: 3px;
}
</style>
