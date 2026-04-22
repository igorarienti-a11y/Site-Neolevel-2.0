"use client";

import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

interface NodeDef {
  pos: THREE.Vector3;
  scale: number;
  isCenter: boolean;
  phase: number;
}

interface EdgeDef {
  a: number;
  b: number;
  phase: number;
}

function spherePoint(radius: number, theta: number, phi: number): THREE.Vector3 {
  return new THREE.Vector3(
    radius * Math.sin(phi) * Math.cos(theta),
    radius * Math.sin(phi) * Math.sin(theta),
    radius * Math.cos(phi)
  );
}

function buildGraph() {
  const nodes: NodeDef[] = [];
  const edges: EdgeDef[] = [];

  nodes.push({ pos: new THREE.Vector3(0, 0, 0), scale: 0.72, isCenter: true, phase: 0 });

  const r1 = 1.8;
  const layer1Angles = [
    [0.52, 1.05], [2.09, 2.09], [3.67, 0.52],
    [4.71, 1.57], [1.26, 2.62], [5.76, 1.05],
  ];
  layer1Angles.forEach(([theta, phi], i) => {
    nodes.push({
      pos: spherePoint(r1, theta, phi),
      scale: 0.50,
      isCenter: false,
      phase: (i / 6) * Math.PI * 2,
    });
    edges.push({ a: 0, b: i + 1, phase: (i / 6) * Math.PI * 2 });
  });

  edges.push({ a: 1, b: 3, phase: 0.3 });
  edges.push({ a: 2, b: 4, phase: 0.8 });
  edges.push({ a: 3, b: 5, phase: 1.2 });
  edges.push({ a: 4, b: 6, phase: 0.5 });

  const r2 = 3.2;
  const layer2Angles = [
    [0.79, 0.79], [2.36, 1.26], [3.93, 0.52],
    [5.50, 1.83], [1.05, 2.36], [2.62, 0.26],
    [4.19, 2.09], [0.26, 1.57],
  ];
  const l2start = nodes.length;
  layer2Angles.forEach(([theta, phi], i) => {
    nodes.push({
      pos: spherePoint(r2, theta, phi),
      scale: 0.35,
      isCenter: false,
      phase: i * 0.85 + 1.1,
    });
    const r1Idx = 1 + (i % 6);
    edges.push({ a: r1Idx, b: l2start + i, phase: i * 0.6 });
  });

  return { nodes, edges };
}

function NetworkScene() {
  const groupRef = useRef<THREE.Group>(null);
  const edgeMatsRef = useRef<THREE.LineBasicMaterial[]>([]);
  const coreMeshesRef = useRef<THREE.Mesh[]>([]);

  const { nodes, edges, lineObjects } = useMemo(() => {
    const { nodes, edges } = buildGraph();

    const lineObjects = edges.map((e) => {
      const a = nodes[e.a].pos;
      const b = nodes[e.b].pos;
      const geo = new THREE.BufferGeometry().setFromPoints([a, b]);
      const mat = new THREE.LineBasicMaterial({
        color: "#06F9FA",
        transparent: true,
        opacity: 0.14,
      });
      return { line: new THREE.Line(geo, mat), mat };
    });

    return { nodes, edges, lineObjects };
  }, []);

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    if (groupRef.current) {
      groupRef.current.rotation.x = t * 0.017;
      groupRef.current.rotation.y = t * 0.031;
      groupRef.current.rotation.z = t * 0.011;
    }
    edgeMatsRef.current.forEach((mat, i) => {
      if (!mat) return;
      const phase = edges[i]?.phase ?? 0;
      mat.opacity = 0.08 + Math.sin(t * 0.9 + phase) * 0.05;
    });
    coreMeshesRef.current.forEach((mesh, i) => {
      if (!mesh) return;
      const phase = nodes[i]?.phase ?? 0;
      const isCenter = nodes[i]?.isCenter;
      const base = isCenter ? 0.82 : 0.52;
      (mesh.material as THREE.MeshBasicMaterial).opacity =
        base + Math.sin(t * 1.1 + phase) * 0.13;
    });
  });

  return (
    <group ref={groupRef}>
      <pointLight position={[0, 0, 2]} intensity={4} color="#06F9FA" distance={10} decay={2} />
      <pointLight position={[3, 2, 4]} intensity={1.5} color="#06F9FA" distance={14} decay={2} />

      {lineObjects.map(({ line, mat }, i) => {
        edgeMatsRef.current[i] = mat;
        return <primitive key={`e${i}`} object={line} />;
      })}

      {nodes.map((node, i) => {
        const r = node.scale * 0.22;
        return (
          <group key={`n${i}`} position={node.pos}>
            {/* Core sphere */}
            <mesh ref={(el) => { if (el) coreMeshesRef.current[i] = el; }}>
              <sphereGeometry args={[r, 28, 28]} />
              <meshBasicMaterial
                color="#06F9FA"
                transparent
                opacity={node.isCenter ? 0.88 : 0.55}
              />
            </mesh>

            {/* Halo ring */}
            <mesh>
              <torusGeometry args={[r * 1.6, r * 0.09, 8, 40]} />
              <meshBasicMaterial
                color="#06F9FA"
                transparent
                opacity={node.isCenter ? 0.5 : 0.28}
              />
            </mesh>

            {/* Outer glow shell */}
            <mesh>
              <sphereGeometry args={[r * 2.4, 16, 16]} />
              <meshBasicMaterial
                color="#06F9FA"
                transparent
                opacity={node.isCenter ? 0.055 : 0.025}
                side={THREE.BackSide}
              />
            </mesh>
          </group>
        );
      })}
    </group>
  );
}

export function HeroOrb() {
  return (
    <div
      style={{
        position: "absolute",
        right: "-5%",
        top: 0,
        width: "50%",
        height: "100%",
        pointerEvents: "none",
        maskImage: "linear-gradient(to right, transparent 0%, rgba(0,0,0,0.3) 22%, black 44%)",
        WebkitMaskImage: "linear-gradient(to right, transparent 0%, rgba(0,0,0,0.3) 22%, black 44%)",
      }}
    >
      <Canvas
        style={{ width: "100%", height: "100%" }}
        camera={{ position: [0.5, 0.3, 7.5], fov: 44 }}
        gl={{ alpha: true, antialias: true }}
      >
        <NetworkScene />
      </Canvas>
    </div>
  );
}
