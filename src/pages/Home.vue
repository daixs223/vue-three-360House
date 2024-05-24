<template>
    <div class="three-box">
        <button @click="changeView('cloakroom')">点击切换</button>
    </div>
</template>

<script>
import * as THREE from 'three';
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls.js';
import materialConfig from "@/utils/config"
export default {
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
        }
    },
    mounted() {
        this.initThree();
        this.initObject();
        this.initControls();
        this.render();
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
            this.renderer.antialias=true;
            this.renderer.alpha=true;
            this.renderer.precision='highp'
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

            if (!this.geometry){
                // 创建盒模型
                this.geometry = new THREE.BoxGeometry(10, 10, 10);
                // 创建网格
                this.mesh = new THREE.Mesh(this.geometry, textureList);
                // 反转视角
                this.mesh.geometry.scale(10, 10, -10);

            }else{
                console.log(textureList)
                console.log('切换材质')
                this.mesh.material.map = textureList;
                this.mesh.material.needsUpdate = true; // 标记材质需要更新
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

        // 切换视角
        changeView(name){
            this.scene.remove(this.mesh);
            this.initObject(name);
        }
    }
}
</script>

<style scoped>
.three-box{
    overflow: hidden;
    position: absolute;
    left:100px;
    top: 100px;
    z-index: 999;
}
</style>
