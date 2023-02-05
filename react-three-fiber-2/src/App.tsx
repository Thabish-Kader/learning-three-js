import { Canvas, useFrame } from "@react-three/fiber";
import { useRef, useState } from "react";
import { Mesh } from "three";
const Cube = () => {
	const meshRef = useRef<Mesh>(null);
	useFrame(() => {
		if (!meshRef.current) {
			return;
		}
		meshRef.current.rotation.x += 0.01;
		meshRef.current.rotation.y += 0.01;
	});
	return (
		<mesh ref={meshRef}>
			<boxGeometry />
			<meshStandardMaterial />
		</mesh>
	);
};

function App() {
	return (
		<Canvas>
			<Cube />
		</Canvas>
	);
}

export default App;
