import * as THREE from "three";
import gsap from "gsap";
// Canvas
const canvas = document.querySelector("canvas.webgl");

// Scene
const scene = new THREE.Scene();

/**
 * Objects
 */
const group = new THREE.Group();
scene.add(group);

const cube1 = new THREE.Mesh(
	new THREE.BoxGeometry(1, 1, 1),
	new THREE.MeshBasicMaterial({ color: "red" })
);
group.add(cube1);

const cube2 = new THREE.Mesh(
	new THREE.BoxGeometry(1, 1, 1),
	new THREE.MeshBasicMaterial({ color: "green" })
);
cube2.position.x = 2;
group.add(cube2);

const cube3 = new THREE.Mesh(
	new THREE.BoxGeometry(1, 1, 1),
	new THREE.MeshBasicMaterial({ color: "purple" })
);
cube3.position.x = -2;
group.add(cube3);
group.position.y = 1;
group.scale.x = 0.5;
/**
 * Sizes
 */
const sizes = {
	width: 800,
	height: 600,
};

/**
 * Camera
 */
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height);
camera.position.z = 3;
scene.add(camera);

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
	canvas: canvas,
});
renderer.setSize(sizes.width, sizes.height);

const clock = new THREE.Clock();
// animation
gsap.to(group.position, { duration: 1, delay: 1, x: 2 });
const tick = () => {
	renderer.render(scene, camera);
	window.requestAnimationFrame(tick);
};
tick();
