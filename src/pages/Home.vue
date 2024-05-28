<template>
    <div class="three-box">
<!--        测试用 -->
<!--        <div>-->
<!--            <input type="number" v-model="position.x" @change="changePosition" placeholder="x">-->
<!--            <input type="number" v-model="position.y" @change="changePosition" placeholder="y">-->
<!--            <input type="number" v-model="position.z" @change="changePosition" placeholder="z">-->
<!--            <input type="number" v-model="scale" @change="changePosition" placeholder="z">-->
<!--        </div>-->
<!--        <button @click="addMarks">添加</button>-->
        <preview ref="preview" @changeView="changeView"/>
    </div>
</template>

<script>
import * as THREE from 'three';
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls.js';
import TWEEN from '@tweenjs/tween.js';
// import { CSS2DObject , CSS2DRenderer} from 'three/examples/jsm/renderers/CSS2DRenderer.js';
import materialConfig from "@/utils/config"
import preview from "@/components/preview";

export default {
    components: {
        preview
    },
    data() {
        return {
            scene: null,
            camera: null,
            renderer: null,
            geometry: null,
            material: null,
            mesh: null,
            timer: null,
            materialConfig,
            materialName: 'drawingRoom',
            markerList: [],
            position: {
                x: -49,
                y: 0,
                z: -16
            },
            scale: 10
        }
    },
    mounted() {
        this.initThree();
        this.initObject();
        this.initControls();
        this.render();
        this.addMark();
        // this.addMarks();
        // 监听窗口变化
        window.addEventListener('resize', this.onWindowResize, false);
        // 监听鼠标点击事件
        window.addEventListener('click', this.onMouseClick, false);
    },
    methods: {
        // 初始化场景
        initThree() {
            this.scene = new THREE.Scene();
            this.scene.background = new THREE.Color(0x101010);
            // 透视相机
            this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
            this.renderer = new THREE.WebGLRenderer({
                antialias: true,
            });
            this.renderer.antialias = true;
            this.renderer.alpha = true;
            this.renderer.precision = 'highp'
            this.renderer.setPixelRatio(window.devicePixelRatio) // 设置像素比
            this.renderer.setSize(window.innerWidth, window.innerHeight);
            document.body.appendChild(this.renderer.domElement);
        },
        // 初始化控制器
        initControls() {
            this.controls = new OrbitControls(this.camera, this.renderer.domElement);
            //控制器缩放范围
            this.controls.minDistance = 1;
            this.controls.maxDistance = 30;
            this.controls.enablePan = false;
        },
        // 初始化物体
        initObject(name = this.materialName) {
            // 创建材质
            let textureList = this.materialConfig[name].picList.map(item => {
                let texture = new THREE.TextureLoader().load(item);
                texture.magFilter = THREE.NearestFilter;
                texture.minFilter = THREE.NearestFilter;
                return new THREE.MeshBasicMaterial({map: texture});
            });

            if (!this.geometry) {
                // 创建盒模型
                this.geometry = new THREE.BoxGeometry(10, 10, 10);
                // 创建网格
                this.mesh = new THREE.Mesh(this.geometry, textureList);
                // 反转视角
                this.mesh.geometry.scale(10, 10, -10);

            } else {
                // 更新六个面的材质
                for (let i = 0; i < this.mesh.material.length; i++) {
                    this.mesh.material[i] = textureList[i]
                }
                // 标记材质需要更新
                this.mesh.material.needsUpdate = true;
            }
            // 添加到场景
            this.scene.add(this.mesh);
        },

        //缩放调整renderer
        onWindowResize() {
            this.camera.aspect = window.innerWidth / window.innerHeight;
            this.camera.updateProjectionMatrix();
            this.renderer.setSize(window.innerWidth, window.innerHeight);
        },

        // 渲染&更新渲染
        render() {
            requestAnimationFrame(this.render);
            this.renderer.render(this.scene, this.camera);
            TWEEN.update()
            this.renderer.gammaOutput = false;
        },

        // 切换场景
        changeView(key) {
            this.materialName = key;
            this.clearMarker();
            this.$refs.preview.changeView(key);
            this.scene.remove(this.mesh);
            this.initObject(key);
            this.addMark();
        },

        //清除标记点
        clearMarker() {
            this.markerList.forEach(item => {
                this.scene.remove(item);
            })
        },
        /**
         * 测试用
         */
        // addMarks() {
        //     // 创建图像纹理
        //     let texture = new THREE.TextureLoader().load(require('@/assets/images/icon/icon_top.png'));
        //     // 创建材质
        //     const material = new THREE.SpriteMaterial({map: texture});
        //     // 创建Sprite对象
        //     this.marker = new THREE.Sprite(material);
        //     // 添加用户数据-标记-点击时用于判断
        //     // 设置Sprite大小
        //     this.marker.scale.set(5, 5, 5);
        //     // 设置Sprite位置
        //     this.marker.position.set(this.position.x, this.position.y, this.position.z);
        //     // 添加Sprite到场景
        //     this.scene.add(this.marker);
        // },
        //添加标记点
        addMark() {
            let markerList = this.materialConfig[this.materialName].marker;
            //marker list
            this.markerList = []
            if (markerList && markerList.length > 0) {
                markerList.forEach(item => {
                    // 创建图像纹理
                    let texture = new THREE.TextureLoader().load(item.icon);
                    // 创建材质
                    const material = new THREE.SpriteMaterial({map: texture});
                    // 创建Sprite对象
                    let marker = new THREE.Sprite(material);
                    // 添加用户数据-标记-点击时用于判断
                    marker.userData = {marker: true, position: item.position, name: item.materialName};
                    // 设置Sprite大小
                    marker.scale.set(item.scale, item.scale, item.scale);
                    // 设置Sprite位置
                    marker.position.set(item.position.x, item.position.y, item.position.z);
                    // 添加到markerList 方便后面清除
                    this.markerList.push(marker);
                    // 添加Sprite到场景
                    this.scene.add(marker);
                })
            }
        },

        // 鼠标点击事件
        onMouseClick(event) {
            // 创建一个raycaster实例
            let raycaster = new THREE.Raycaster();
            // 创建一个二维空间的向量用于存储鼠标点击的屏幕位置
            let mouse = new THREE.Vector2();
            // 将浏览器的2D鼠标位置转换为Three.js的标准设备坐标(-1到+1)
            mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
            mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

            // 使用鼠标的2D位置和当前相机的位置来更新射线
            raycaster.setFromCamera(mouse, this.camera);

            // 计算物体和射线的交点
            let intersects = raycaster.intersectObjects(this.scene.children);
            // 检查是否有标记被点击
            for (let i = 0; i < intersects.length; i++) {
                let intersection = intersects[i];
                // 假设我们给标记添加了名字为"marker"的用户数据属性
                if (intersection.object.userData.marker) {
                    let pos = intersection.object.userData.position;
                    let viewName = intersection.object.userData.name;
                    this.moveCamera(pos, viewName);
                }
            }
        },

        //利用tween.js实现相机移动
        moveCamera(pos = {x: -6, y: -6, z: -46}, viewName = 'masterBedroom') {
            this.clearMarker();
            const targetPosition = new THREE.Vector3(pos.x, pos.y, pos.z);
            new TWEEN.Tween(this.camera.position)
                .to(targetPosition, 2000) // 动画持续时间2秒
                .easing(TWEEN.Easing.Quadratic.InOut)
                .onComplete(() => {
                    //移动结束-切换场景
                    this.changeView(viewName);
                    this.camera.position.set(0, 0, 0);
                })
                .start();
        }
        ,
        /**
         * 测试用
         */
        // changePosition() {
        //     this.marker.position.set(this.position.x, this.position.y, this.position.z);
        // },
        // changeScale() {
        //     this.marker.scale.set(this.scale, this.scale, this.scale);
        // }
    }
}
</script>

<style scoped>
.three-box {
    overflow: hidden;
    position: absolute;
    left: 100px;
    top: 100px;
    z-index: 999;
}
</style>
