import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

const scene = new THREE.Scene();
scene.background = new THREE.Color(0x1a1a1a);

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

// Very bright lights to see the moon
const ambientLight = new THREE.AmbientLight(0xffffff, 3);
scene.add(ambientLight);

const pointLight = new THREE.PointLight(0xffffff, 5);
pointLight.position.set(10, 10, 10);
scene.add(pointLight);

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setAnimationLoop(animate);
document.body.appendChild(renderer.domElement);

let moon;
const gltfLoader = new GLTFLoader();
gltfLoader.load(
    './public/moon/scene.gltf',
    (gltf) => {
        moon = gltf.scene;
        moon.scale.set(10, 10, 10);
        moon.position.set(0, 0, 0);
        
        // Force materials to be visible
        moon.traverse((child) => {
            if (child.isMesh) {
                child.material.emissive = new THREE.Color(0x444444);
            }
        });
        
        scene.add(moon);
        console.log('Moon loaded!');
    },
    (progress) => {
        console.log('Loading...', (progress.loaded / progress.total * 100) + '%');
    },
    (error) => {
        console.error('Error loading moon:', error);
    }
);

camera.position.z = 3;

function animate() {
    if (moon) {
        moon.rotation.y += 0.005;
    }
    renderer.render(scene, camera);
}