import { Suspense, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { useGLTF, OrbitControls, Environment } from "@react-three/drei";
import { useScroll } from "framer-motion";
import * as THREE from "three";

const Model = ({ scrollY }: { scrollY: any }) => {
  const { scene } = useGLTF("/assets/character-sitting.glb");
  const ref = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (!ref.current) return;
    ref.current.position.y = Math.sin(state.clock.elapsedTime * 0.8) * 0.06;
    const scrollVal = scrollY.get();
    const targetRotY = (scrollVal / 800) * Math.PI * 2;
    ref.current.rotation.y = THREE.MathUtils.lerp(
      ref.current.rotation.y,
      targetRotY,
      0.05
    );
  });

  return (
    <primitive
      ref={ref}
      object={scene}
      scale={2.2}
      position={[0, -0.8, 0]}
    />
  );
};

const Model3D = ({
  width = "100%",
  height = "420px",
}: {
  width?: string;
  height?: string;
}) => {
  const { scrollY } = useScroll();

  return (
    <div style={{ width, height }}>
      <Canvas
        camera={{ position: [0, 1.0, 4.5], fov: 40 }}
        style={{ background: "transparent" }}
        gl={{ alpha: true, antialias: true }}
      >
        <Suspense fallback={null}>
          <ambientLight intensity={1.4} />
          <directionalLight position={[5, 5, 5]} intensity={1.6} />
          <directionalLight position={[-5, 3, -5]} intensity={0.6} color="#4f8cff" />
          <Environment preset="city" />
          <Model scrollY={scrollY} />
          <OrbitControls
            enableZoom={false}
            enablePan={false}
            minPolarAngle={Math.PI / 3}
            maxPolarAngle={Math.PI / 1.8}
          />
        </Suspense>
      </Canvas>
    </div>
  );
};

useGLTF.preload("/assets/character-sitting.glb");

export default Model3D;