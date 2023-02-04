import { useEffect } from "react";
import "./App.css";
import * as THREE from "three";

function App() {
	useEffect(() => {
		const scene = THREE.Scene();
		const camera = new THREE.PerspectiveCamera(
			50,
			window.innerWidth / window.innerHeight,
			1,
			100
		);
	});
	return (
		<div className="App">
			<canvas id="myThreeJsCanvas"></canvas>
		</div>
	);
}

export default App;
