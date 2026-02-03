import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

const scene = new THREE.Scene();
scene.background = new THREE.Color(0x000000);

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.z = 5;

const ambientLight = new THREE.AmbientLight(0xffffff, 2);
scene.add(ambientLight);

const directionalLight = new THREE.DirectionalLight(0xffffff, 3);
directionalLight.position.set(5, 3, 5);
scene.add(directionalLight);

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

let jupiter;
const gltfLoader = new GLTFLoader();

gltfLoader.load(
    './public/realistic_jupiter/scene.gltf',
    (gltf) => {
        console.log('Jupiter loaded!');
        jupiter = gltf.scene;
        jupiter.scale.set(2, 2, 2);
        jupiter.position.set(9, 9, 9);
        scene.add(jupiter);
    },
    (progress) => {
        console.log('Loading...', (progress.loaded / progress.total * 100) + '%');
    },
    (error) => {
        console.error('Error loading Jupiter:', error);
    }
);

function animate() {
    if (jupiter) {
        jupiter.rotation.y += 0.001;
    }
    renderer.render(scene, camera);
}

renderer.setAnimationLoop(animate);