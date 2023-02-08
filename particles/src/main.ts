import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import * as dat from "lil-gui";

// base
// debug
const gui = new dat.GUI();

// canvas
const canvas = document.querySelector("canvas.webgl");

// scene
const scene = new THREE.Scene();

// textures
const textureLoader = new THREE.TextureLoader();

// test cube
const cube = new THREE.Mesh(
	new THREE.BoxGeometry(1, 1, 1),
	new THREE.MeshBasicMaterial()
);
scene.add(cube);

// sizes
const sizes = {
	width: window.innerWidth,
	height: window.innerHeight,
};

// resize
window.addEventListener("resize", () => {
	// Update sizes
	sizes.width = window.innerWidth;
	sizes.height = window.innerHeight;

	// Update camera
	camera.aspect = sizes.width / sizes.height;
	camera.updateProjectionMatrix();

	// Update renderer
	renderer.setSize(sizes.width, sizes.height);
	renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
});

// camera
const camera = new THREE.PerspectiveCamera(
	75,
	sizes.width / sizes.height,
	0.1,
	100
);
camera.position.z = 3;
scene.add(camera);

const controls = new OrbitControls(camera, canvas as HTMLCanvasElement);
controls.enableDamping = true;
// renderer
const renderer = new THREE.WebGLRenderer({
	canvas: canvas as HTMLCanvasElement,
});

renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

const clock = new THREE.Clock();
const animate = () => {
	const elapsedTime = clock.getElapsedTime();

	controls.update();
	renderer.render(scene, camera);
	window.requestAnimationFrame(animate);
};
animate();
