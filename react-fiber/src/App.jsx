import { useState, useRef } from "react";
import { Canvas, extend, useFrame, useThree } from "@react-three/fiber";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { useSpring, a } from "@react-spring/three";
extend({ OrbitControls });

const Controls = () => {
	const { camera, gl } = useThree();
	const orbitRef = useRef();
	useFrame(() => {
		orbitRef.current.update();
	});
	return <orbitControls args={[camera, gl.domElement]} ref={orbitRef} />;
};

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
			{/* <orbitcontrols /> */}
			<boxGeometry attach="geometry" args={[1, 1, 1]} />
			<a.meshBasicMaterial attach="material" color={props.color} />
		</a.mesh>
	);
};

function App() {
	return (
		<div className="App">
			<Canvas>
				<Controls />
				<Box />
			</Canvas>
		</div>
	);
}

export default App;
