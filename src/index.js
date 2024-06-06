import * as THREE from 'three';

import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';



// Renderer
const renderer = new THREE.WebGLRenderer();

renderer.shadowMap.enabled = true;

document.body.appendChild( renderer.domElement );

renderer.setSize(window.innerWidth, window.innerHeight);



// Scene
const scene = new THREE.Scene();



// Axes Helper
const axes = new THREE.AxesHelper(10);



// Grid Helper
const grid = new THREE.GridHelper(10, 10);



// Camera
const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.z = 10;
camera.position.x = 10;



// OrbitControls
const controls = new OrbitControls( camera, renderer.domElement );
controls.addEventListener('change', render);
controls.update();



// Light
const light = new THREE.DirectionalLight( 0xffffff, 10 );

light.position.y = 10;
light.position.x = 5;
light.position.z = -5;

light.castShadow = true;
light.shadow.camera.top = 50;
light.shadow.camera.bottom = 50;



// Light Helper
const lightHelper = new THREE.DirectionalLightHelper( light );



// Shadow Light
const shadowHelper = new THREE.CameraHelper(light.shadow.camera);



// Plane
const planeGeo = new THREE.PlaneGeometry(10, 10);
const planeMaterial = new THREE.MeshStandardMaterial( { color: 0xffffff } );
const plane = new THREE.Mesh(planeGeo, planeMaterial);

plane.receiveShadow = true;

plane.rotation.x = -0.5 * Math.PI;
planeMaterial.side = THREE.DoubleSide;



// Sphere
const sphereGeo = new THREE.SphereGeometry(2, 40, 40);
const sphereMaterial = new THREE.MeshStandardMaterial( { color: 0xffdddd } );

const sphere = new THREE.Mesh(sphereGeo, sphereMaterial);

sphere.castShadow = true;
sphere.position.y = 5;



//  +----------------------+
//  + Add Items to the scene
//  +----------------------+

// Plane
scene.add(plane);

// Sphere
scene.add(sphere);

// Light
scene.add(light);
scene.add(lightHelper);

// Helpers
scene.add(axes);
scene.add(grid);
scene.add(shadowHelper);

// Render
function render() {
    // Window resize update aspect ratio
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();

    // Set current screen size
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.render(scene, camera);
}

window.addEventListener("resize", render);

render()