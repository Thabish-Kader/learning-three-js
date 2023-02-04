import { useEffect } from "react";
import "./App.css";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import Stats from "three/examples/jsm/libs/stats.module";
import SceneInit from "./lib/SceneInit";

function App() {
	useEffect(() => {
		const test = new SceneInit("myThreeJsCanvas");
		test.initalize();
		test.animate();

		const boxGeometry = new THREE.BoxGeometry(1, 1, 1, 1, 16);
		const boxMaterial = new THREE.MeshNormalMaterial();
		const boxMesh = new THREE.Mesh(boxGeometry, boxMaterial);
		boxMesh.position.x = -1;
		test.scene.add(boxMesh);

		const cylinderGeometry = new THREE.CylinderGeometry(
			0.5,
			0.5,
			1,
			32,
			16
		);
		const cylinderMaterial = new THREE.MeshNormalMaterial({
			wireframe: true,
		});
		const cylinderMesh = new THREE.Mesh(cylinderGeometry, cylinderMaterial);
		cylinderMesh.position.x = 1;
		test.scene.add(cylinderMesh);
	}, []);

	return (
		<div className="App">
			<canvas id="myThreeJsCanvas"></canvas>
		</div>
	);
}

export default App;
