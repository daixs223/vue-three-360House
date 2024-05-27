<template>
    <div class="three-box">
        <div>
            <input type="number" v-model="position.x" @change="changePosition" placeholder="x">
            <input type="number" v-model="position.y" @change="changePosition" placeholder="y">
            <input type="number" v-model="position.z" @change="changePosition" placeholder="z">
        </div>
        <preview @changeView="changeView" />
    </div>
</template>

<script>
import * as THREE from 'three';
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls.js';
import materialConfig from "@/utils/config"
import preview from "@/components/preview";
export default {
    components:{
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

            position: {
                x: 0,
                y: 0,
                z: 0
            }
        }
    },
    mounted() {
        this.initThree();
        this.initObject();
        this.initControls();
        this.render();
        this.addMark();
        // 监听窗口变化
        window.addEventListener('resize', this.onWindowResize, false);
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
        initObject(name = 'drawingRoom') {
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

        // 渲染
        render() {
            requestAnimationFrame(this.render);
            this.renderer.render(this.scene, this.camera);
            this.renderer.gammaOutput = false;
        },

        // 切换场景
        changeView(key) {
            this.scene.remove(this.mesh);
            this.initObject(key);
        },

        //添加标记点
        addMark() {
            // 创建图像纹理
            let texture = new THREE.TextureLoader().load(require('@/assets/images/icon/icon_dw.jpg'));
            // 创建材质
            const material = new THREE.SpriteMaterial({map: texture});
            // 创建Sprite对象
            this.marker = new THREE.Sprite(material);
            // 设置Sprite大小
            this.marker.scale.set(0.2, 0.2, 0.2);
            // 设置Sprite位置
            this.marker.position.set(this.position.x, this.position.y, this.position.z);
            // 添加Sprite到场景
            this.scene.add(this.marker);
        },
        changePosition() {
            this.marker.position.set(this.position.x, this.position.y, this.position.z);
        }
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
