import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import GUI from "lil-gui";
import gsap from "gsap";
/**
 * Base
 */
// Canvas
const canvas = document.querySelector("canvas.webgl");

// Scene
const scene = new THREE.Scene();

// Object
const material = new THREE.MeshBasicMaterial({ color: "red" });
const sphere = new THREE.Mesh(new THREE.SphereGeometry(0.5, 16, 16), material);

const plane = new THREE.Mesh(new THREE.PlaneGeometry(1, 1), material);
sphere.position.x = -1.5;
const torus = new THREE.Mesh(
	new THREE.TorusGeometry(0.3, 0.2, 16, 32),
	material
);
torus.position.x = 1.5;
scene.add(sphere, plane, torus);

/**
 * Sizes
 */
const sizes = {
	width: window.innerWidth,
	height: window.innerHeight,
};

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

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(
	75,
	sizes.width / sizes.height,
	0.1,
	100
);
camera.position.z = 3;
scene.add(camera);

// Controls
const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
	canvas: canvas,
});
renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

const clock = new THREE.Clock();
/**
 * Animate
 */

const tick = () => {
	const elapsedTime = clock.getElapsedTime();
	// Update controls
	controls.update();
	sphere.rotation.y = 0.1 * elapsedTime;
	torus.rotation.y = 0.1 * elapsedTime;
	plane.rotation.y = 0.1 * elapsedTime;

	sphere.rotation.x = 0.1 * elapsedTime;

	torus.rotation.x = 0.1 * elapsedTime;

	plane.rotation.x = 0.1 * elapsedTime;

	// Render
	renderer.render(scene, camera);

	// Call tick again on the next frame
	window.requestAnimationFrame(tick);
};

tick();
