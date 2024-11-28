import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

// Scene setup
const scene = new THREE.Scene();
scene.background = new THREE.Color(0x000000);

// Camera setup
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.z = 5;

// Renderer setup
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// OrbitControls setup
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true; // Enable damping (inertia)
controls.dampingFactor = 0.25; // Damping factor

// Lighting setup
const ambientLight = new THREE.AmbientLight(0x404040, 2); // Increase intensity of ambient light
scene.add(ambientLight);

const directionalLight = new THREE.DirectionalLight(0xffffff, 2); // Increase intensity of directional light
directionalLight.position.set(5, 5, 5).normalize();
scene.add(directionalLight);

const pointLight = new THREE.PointLight(0xffffff, 1.5); // Add a point light
pointLight.position.set(0, 0, 5);
scene.add(pointLight);

// Create 10,000 cubes
const cubes = [];
const rotationDirections = [];
const minDistance = 1.5;

function getRandomPosition() {
    return {
        x: (Math.random() - 0.5) * 100,
        y: (Math.random() - 0.5) * 100,
        z: (Math.random() - 0.5) * 100
    };
}

function isFarEnough(position, cubes, minDistance) {
    for (let cube of cubes) {
        const dx = cube.position.x - position.x;
        const dy = cube.position.y - position.y;
        const dz = cube.position.z - position.z;
        const distance = Math.sqrt(dx * dx + dy * dy + dz * dz);
        if (distance < minDistance) {
            return false;
        }
    }
    return true;
}

for (let i = 0; i < 10000; i++) {
    const geometry = new THREE.BoxGeometry();
    const material = new THREE.MeshStandardMaterial({ color: Math.random() * 0xffffff });
    const cube = new THREE.Mesh(geometry, material);

    let position;
    do {
        position = getRandomPosition();
    } while (!isFarEnough(position, cubes, minDistance));

    cube.position.set(position.x, position.y, position.z);
    scene.add(cube);
    cubes.push(cube);

    // Random rotation direction
    rotationDirections.push({
        x: (Math.random() - 0.5) * 0.02,
        y: (Math.random() - 0.5) * 0.02,
        z: (Math.random() - 0.5) * 0.02
    });
}

// Animation loop
function animate() {
    requestAnimationFrame(animate);

    // Rotate each cube
    cubes.forEach((cube, index) => {
        cube.rotation.x += rotationDirections[index].x;
        cube.rotation.y += rotationDirections[index].y;
        cube.rotation.z += rotationDirections[index].z;
    });

    controls.update();
    renderer.render(scene, camera);
}

animate();