import * as BABYLON from 'babylonjs';
import 'babylonjs-loaders'; // Ensure this import is present

const canvas = document.getElementById('renderCanvas');
const engine = new BABYLON.Engine(canvas, true);

const createScene = () => {
    const scene = new BABYLON.Scene(engine);

    const camera = new BABYLON.ArcRotateCamera("camera", Math.PI / 2, Math.PI / 2, 2, BABYLON.Vector3.Zero(), scene);
    camera.attachControl(canvas, true);

    const light = new BABYLON.HemisphericLight("light", new BABYLON.Vector3(1, 1, 0), scene);

    // Load the .3ds file
    BABYLON.SceneLoader.ImportMesh("", "./", "teapot.3ds", scene, (meshes) => {
        scene.createDefaultCameraOrLight(true, true, true);
        scene.createDefaultEnvironment();
    });

    return scene;
};

const scene = createScene();

engine.runRenderLoop(() => {
    scene.render();
});

window.addEventListener('resize', () => {
    engine.resize();
});