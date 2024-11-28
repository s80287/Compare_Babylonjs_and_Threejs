import { Engine, Scene, ArcRotateCamera, HemisphericLight, Vector3, MeshBuilder, Color3, StandardMaterial } from 'babylonjs';

// Get the canvas element
const canvas = document.getElementById('renderCanvas');

// Generate the Babylon.js engine
const engine = new BABYLON.Engine(canvas, true);

// Create the scene
const createScene = () => {
    const scene = new BABYLON.Scene(engine);

    // Create a camera and attach it to the canvas
    const camera = new BABYLON.ArcRotateCamera("camera1", Math.PI / 2, Math.PI / 2, 2, BABYLON.Vector3.Zero(), scene);
    camera.attachControl(canvas, true);

    // Add a light to the scene
    const light = new BABYLON.HemisphericLight("light1", new BABYLON.Vector3(1, 1, 0), scene);
    light.intensity = 0.7;

    // Create a box (cube)
    const box = BABYLON.MeshBuilder.CreateBox("box", { size: 1 }, scene);

    // Animation to move the cube, change frame rate (position 3) to speed up or slow down
    const animationBox = new BABYLON.Animation("boxAnimation", "position.x", 10, BABYLON.Animation.ANIMATIONTYPE_FLOAT, BABYLON.Animation.ANIMATIONLOOPMODE_CYCLE);

    // Animation keys
    const keys = [];
    keys.push({ frame: 0, value: -5 });
    keys.push({ frame: 50, value: 5 });
    keys.push({ frame: 100, value: -5 });

    animationBox.setKeys(keys);

    // Link the animation to the box
    box.animations = [];
    box.animations.push(animationBox);

    // Run the animation
    scene.beginAnimation(box, 0, 100, true);

    return scene;
};

// Create the scene
const scene = createScene();

// Register a render loop to repeatedly render the scene
engine.runRenderLoop(() => {
    scene.render();
});

// Watch for browser/canvas resize events
window.addEventListener('resize', () => {
    engine.resize();
});