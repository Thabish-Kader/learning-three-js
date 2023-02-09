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
const particleTexture = textureLoader.load(
	"../static//textures/particles/2.png"
);
// Particles

const particlesGeometry = new THREE.BufferGeometry();
const count = 5000;

const position = new Float32Array(count * 3);
const colors = new Float32Array(count * 3);

for (let i = 0; i < count * 3; i++) {
	position[i] = (Math.random() - 0.5) * 10;
	colors[i] = Math.random();
}
particlesGeometry.setAttribute(
	"position",
	new THREE.BufferAttribute(position, 3)
);
particlesGeometry.setAttribute("color", new THREE.BufferAttribute(colors, 3));

const particlesMaterial = new THREE.PointsMaterial();
particlesMaterial.size = 0.1;
particlesMaterial.sizeAttenuation = true;
// particlesMaterial.color = new THREE.Color("#ff88cc");
particlesMaterial.transparent = true;
particlesMaterial.alphaMap = particleTexture;
// particlesMaterial.alphaTest = 0.001;
// particlesMaterial.depthTest = false;
particlesMaterial.depthWrite = false;
particlesMaterial.blending = THREE.AdditiveBlending;
particlesMaterial.vertexColors = true;

// geometry
const particles = new THREE.Points(particlesGeometry, particlesMaterial);
scene.add(particles);

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

	// update particles
	// particles.rotation.y = elapsedTime * 0.2;
	for (let i = 0; i < count; i++) {
		const i3 = i * 3;

		// const x = particlesGeometry.attributes.position.array[i3];
		// particlesGeometry.attributes.position.array[i3 + 1] = Math.sin(
		// 	elapsedTime + x
		// );
	}
	particlesGeometry.attributes.position.needsUpdate = true;
	controls.update();
	renderer.render(scene, camera);
	window.requestAnimationFrame(animate);
};
animate();
