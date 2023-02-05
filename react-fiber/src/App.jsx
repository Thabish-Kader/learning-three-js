import { useState, useRef } from "react";
import * as THREE from "three";
import { Canvas, extend, useFrame, useThree } from "@react-three/fiber";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { useSpring, a } from "@react-spring/three";
import { useEffect } from "react";
extend({ OrbitControls });

const SpaceShip = () => {
	const [model, setModel] = useState();
	useEffect(() => {
		new GLTFLoader().load("./scene.gltf", setModel);
	});
	console.log(model);
	return model ? <primitive object={model.scene} /> : null;
};

const Controls = () => {
	const { camera, gl } = useThree();
	const orbitRef = useRef();

	useFrame(() => {
		orbitRef.current.update();
	});
	return (
		<orbitControls
			autoRotate
			args={[camera, gl.domElement]}
			ref={orbitRef}
		/>
	);
};

const Plane = () => (
	<mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.5, 0]} receiveShadow>
		<planeBufferGeometry attach="geometry" args={[100, 100]} />
		<meshPhysicalMaterial attach="material" color="white" />
	</mesh>
);

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
			castShadow
		>
			<ambientLight />
			<spotLight position={[0, 5, 10]} penumbra={1} castShadow />
			<boxGeometry attach="geometry" args={[1, 1, 1]} />
			<a.meshPhysicalMaterial attach="material" color={props.color} />
		</a.mesh>
	);
};

function App() {
	return (
		<div className="App">
			<Canvas
				camera={{ position: [0, 0, 5] }}
				onCreated={({ gl }) => {
					gl.shadowMap.enabled = true;
					gl.shadowMap.type = THREE.PCFSoftShadowMap;
				}}
			>
				{/* <fog attach="fog" args={["white", 5, 15]} /> */}
				<ambientLight intensity={0.5} />
				<spotLight position={[15, 25, 10]} penumbra={1} castShadow />
				<Controls />
				{/* <Box /> */}
				{/* <Plane /> */}
				<SpaceShip />
			</Canvas>
		</div>
	);
}

export default App;
