import { useState } from "react";
import { Canvas } from "react-three-fiber";
import { useSpring, a } from "@react-spring/three";
function App() {
	const Box = () => {
		const [hoverd, setHoverd] = useState(false);
		const [active, setActive] = useState(false);
		const props = useSpring({
			scale: active ? [1.5, 1.5, 1.5] : [1, 1, 1],
			color: hoverd ? "hotpink" : "grey",
		});
		return (
			<a.mesh
				onPointerOver={() => setHoverd(true)}
				onPointerOut={() => setHoverd(false)}
				onClick={() => setActive(!active)}
				scale={props.scale}
			>
				<boxBufferGeometry attach="geometry" args={[1, 1, 1]} />
				<a.meshBasicMaterial attach="material" color={props.color} />
			</a.mesh>
		);
	};

	return (
		<div className="App">
			<Canvas>
				<Box />
			</Canvas>
		</div>
	);
}

export default App;
