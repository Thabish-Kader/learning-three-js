import * as THREE from "three";
import "./style.css";
import gsap from "gsap";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
const scene = new THREE.Scene();

const sizes = {
	width: window.innerWidth,
	hieght: window.innerHeight,
};

const geometry = new THREE.SphereGeometry(3, 64, 64);
const material = new THREE.MeshStandardMaterial({
	color: "#00ff83",
	roughness: 0.5,
});
const mesh = new THREE.Mesh(geometry, material);
scene.add(mesh);

// light
const light = new THREE.PointLight(0xffffff, 1, 100);
light.position.set(0, 10, 10);
light.intensity = 1.25;
scene.add(light);
// camera
const camera = new THREE.PerspectiveCamera(
	45,
	sizes.width / sizes.hieght,
	0.1,
	100
);
camera.position.z = 20;
scene.add(camera);

// rendere
const canvas = document.querySelector(".webgl");
const renderer = new THREE.WebGLRenderer({ canvas });
renderer.setSize(sizes.width, sizes.hieght);
renderer.setPixelRatio(2);
renderer.render(scene, camera);

// Resize
window.addEventListener("resize", () => {
	(sizes.width = window.innerWidth), (sizes.hieght = window.innerHeight);
	//update camera
	camera.aspect = sizes.width / sizes.hieght;
	camera.updateProjectionMatrix();
	renderer.setSize(sizes.width, sizes.hieght);
});

const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;
controls.enablePan = false;
controls.enableZoom = false;
controls.autoRotate = true;
controls.autoRotateSpeed = 5;

const loop = () => {
	controls.update();
	renderer.render(scene, camera);
	window.requestAnimationFrame(loop);
};
loop();

// timeline
const t1 = gsap.timeline({ default: { duration: 1 } });
t1.fromTo(mesh.scale, { z: 0, x: 0, y: 0 }, { z: 1, x: 1, y: 1 });
t1.fromTo("nav", { y: "-100%" }, { y: "0%" });
t1.fromTo(".title", { opacity: 0 }, { opacity: 1 });

// mouse animation color
let mouseDown = false;
let rgb = [12, 23, 55];
window.addEventListener("mousedown", () => (mouseDown = true));
window.addEventListener("mouseUp", () => (mouseDown = false));

window.addEventListener("mousedown", (e) => {
	if (mouseDown) {
		rgb = [
			Math.round((e.pageX / sizes.width) * 255),
			Math.round((e.pageY / sizes.hieght) * 255),
			150,
		];
		let newColor = new THREE.Color(`rgb${rgb.join(",")}`);
		gsap.to(mesh.material.color, {
			r: newColor.r,
			g: newColor.g,
			b: newColor.b,
		});
	}
});
