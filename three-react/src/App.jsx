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

		const boxGeometry = new THREE.BoxGeometry(16, 16, 16);
		const boxMaterial = new THREE.MeshNormalMaterial();
		const boxMesh = new THREE.Mesh(boxGeometry, boxMaterial);
		test.scene.add(boxMesh);
	}, []);

	return (
		<div className="App">
			<canvas id="myThreeJsCanvas"></canvas>
		</div>
	);
}

export default App;
