import { Engine, Scene, ArcRotateCamera, HemisphericLight, Vector3, MeshBuilder, Color3, StandardMaterial } from 'babylonjs';

// Get the canvas element
const canvas = document.getElementById('renderCanvas');

// Create the Babylon.js engine with a higher pixel ratio
const engine = new Engine(canvas, true, { preserveDrawingBuffer: true, stencil: true });
engine.setHardwareScalingLevel(1 / window.devicePixelRatio);

// Create the scene
const createScene = () => {
    const scene = new Scene(engine);

    // Create a camera and position it
    const camera = new ArcRotateCamera('camera1', Math.PI / 2, Math.PI / 4, 300, new Vector3(0, 0, 0), scene);
    camera.attachControl(canvas, true);

    // Create a hemispheric light
    const light = new HemisphericLight('light1', new Vector3(0, 1, 0), scene);
    light.intensity = 0.7;

    // Create a ground plane
    const ground = MeshBuilder.CreateGround('ground', { width: 400, height: 400 }, scene);
    ground.position.y = -2;

    // Create 10,000 cubes with different colors and rotations
    const cubeSize = 2;
    const spacing = 5; // Minimum distance between cubes

    const positions = [];

    for (let i = 0; i < 10000; i++) {
        let position;
        let isOverlapping;

        // Ensure cubes do not overlap
        do {
            isOverlapping = false;
            position = new Vector3(
                Math.random() * 400 - 200,
                Math.random() * 400 - 200,
                Math.random() * 400 - 200
            );

            for (const pos of positions) {
                if (Vector3.Distance(position, pos) < spacing) {
                    isOverlapping = true;
                    break;
                }
            }
        } while (isOverlapping);

        positions.push(position);

        const box = MeshBuilder.CreateBox(`box${i}`, { size: cubeSize }, scene);
        box.position = position;

        // Assign a unique color to each box
        const material = new StandardMaterial(`material${i}`, scene);
        material.diffuseColor = new Color3(Math.random(), Math.random(), Math.random());
        box.material = material;

        // Set a random rotation direction
        const rotationSpeed = Math.random() * 0.2;
        scene.registerBeforeRender(() => {
            box.rotation.y += rotationSpeed;
        });
    }

    return scene;
};

// Create the scene
const scene = createScene();

// Attach camera controls to the canvas for mouse interaction
scene.activeCamera.attachControl(canvas, true);

// Register a render loop to repeatedly render the scene
engine.runRenderLoop(() => {
    scene.render();
});

// Resize the engine when the window is resized
window.addEventListener('resize', () => {
    engine.resize();
    engine.setHardwareScalingLevel(1 / window.devicePixelRatio);
});