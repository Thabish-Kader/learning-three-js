import { useEffect } from "react";
import "./App.css";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import Stats from "three/examples/jsm/libs/stats.module";
import { GUI } from "dat.gui";
import SceneInit from "./lib/SceneInit";

function App() {
	useEffect(() => {
		const test = new SceneInit("myThreeJsCanvas");
		test.initalize();
		test.animate();
		const gui = new GUI();

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
		// gui
		gui.add(boxMesh.rotation, "x", 0, Math.PI).name("Rotate X Axis");
		gui.add(boxMesh.rotation, "y", 0, Math.PI).name("Rotate Y Axis");
		gui.add(boxMesh.rotation, "z", 0, Math.PI).name("Rotate Z Axis");
		gui.add(boxMesh.scale, "x", 0, 2).name("Scale X Axis");
		gui.add(boxMesh.scale, "y", 0, 2).name("Scale Y Axis");
		gui.add(boxMesh.scale, "z", 0, 2).name("Scale Z Axis");

		return () => {
			gui.destroy();
		};
	}, []);

	return (
		<div className="App">
			<canvas id="myThreeJsCanvas"></canvas>
		</div>
	);
}

export default App;
