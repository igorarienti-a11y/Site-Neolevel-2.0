"use client";

import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

function makeProfileTexture(size = 128, isCenter = false): THREE.CanvasTexture {
  const canvas = document.createElement("canvas");
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext("2d")!;
  const cx = size / 2;
  const cy = size / 2;
  const r = size / 2 - 2;

  ctx.beginPath();
  ctx.arc(cx, cy, r, 0, Math.PI * 2);
  ctx.fillStyle = isCenter ? "rgba(6,249,250,0.10)" : "rgba(14,26,43,0.88)";
  ctx.fill();

  ctx.beginPath();
  ctx.arc(cx, cy, r, 0, Math.PI * 2);
  ctx.strokeStyle = isCenter ? "#06F9FA" : "rgba(6,249,250,0.5)";
  ctx.lineWidth = isCenter ? 4 : 2;
  ctx.stroke();

  // head
  ctx.beginPath();
  ctx.arc(cx, cy * 0.78, size * 0.16, 0, Math.PI * 2);
  ctx.fillStyle = isCenter ? "rgba(6,249,250,0.85)" : "rgba(6,249,250,0.5)";
  ctx.fill();

  // body
  ctx.save();
  ctx.beginPath();
  ctx.arc(cx, cy * 1.55, size * 0.25, Math.PI, 0);
  ctx.fillStyle = isCenter ? "rgba(6,249,250,0.85)" : "rgba(6,249,250,0.5)";
  ctx.fill();
  ctx.restore();

  return new THREE.CanvasTexture(canvas);
}

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

  const r1 = 3.2;
  const layer1Angles = [
    [0.52, 1.05], [2.09, 2.09], [3.67, 0.52],
    [4.71, 1.57], [1.26, 2.62], [5.76, 1.05],
    [0.95, 0.42], [3.20, 1.88],
  ];
  layer1Angles.forEach(([theta, phi], i) => {
    nodes.push({
      pos: spherePoint(r1, theta, phi),
      scale: 0.50,
      isCenter: false,
      phase: (i / 8) * Math.PI * 2,
    });
    edges.push({ a: 0, b: i + 1, phase: (i / 8) * Math.PI * 2 });
  });

  // Mais conexões laterais na camada 1
  edges.push({ a: 1, b: 3, phase: 0.3 });
  edges.push({ a: 2, b: 4, phase: 0.8 });
  edges.push({ a: 3, b: 5, phase: 1.2 });
  edges.push({ a: 4, b: 6, phase: 0.5 });
  edges.push({ a: 5, b: 7, phase: 0.9 });
  edges.push({ a: 6, b: 8, phase: 1.5 });
  edges.push({ a: 1, b: 8, phase: 0.4 });
  edges.push({ a: 2, b: 7, phase: 1.1 });

  const r2 = 5.8;
  const layer2Angles = [
    [0.79, 0.79], [2.36, 1.26], [3.93, 0.52],
    [5.50, 1.83], [1.05, 2.36], [2.62, 0.26],
    [4.19, 2.09], [0.26, 1.57],
    [1.70, 0.88], [3.40, 1.40], [5.10, 0.70],
  ];
  const l2start = nodes.length;
  layer2Angles.forEach(([theta, phi], i) => {
    nodes.push({
      pos: spherePoint(r2, theta, phi),
      scale: 0.35,
      isCenter: false,
      phase: i * 0.85 + 1.1,
    });
    const r1Idx = 1 + (i % 8);
    edges.push({ a: r1Idx, b: l2start + i, phase: i * 0.6 });
  });

  // Conexões entre camada 2
  edges.push({ a: l2start,     b: l2start + 2, phase: 0.7 });
  edges.push({ a: l2start + 1, b: l2start + 4, phase: 1.3 });
  edges.push({ a: l2start + 3, b: l2start + 6, phase: 0.2 });
  edges.push({ a: l2start + 5, b: l2start + 8, phase: 1.8 });
  edges.push({ a: l2start + 7, b: l2start + 10, phase: 0.6 });

  return { nodes, edges };
}

function NetworkScene() {
  const groupRef = useRef<THREE.Group>(null);
  const edgeMatsRef = useRef<THREE.LineBasicMaterial[]>([]);
  const nodeMeshesRef = useRef<THREE.Mesh[]>([]);

  const { nodes, edges, textures, lineObjects } = useMemo(() => {
    const { nodes, edges } = buildGraph();
    const textures = nodes.map((n) => makeProfileTexture(128, n.isCenter));

    const lineObjects = edges.map((e) => {
      const a = nodes[e.a].pos;
      const b = nodes[e.b].pos;
      const geo = new THREE.BufferGeometry().setFromPoints([a, b]);
      const mat = new THREE.LineBasicMaterial({
        color: "#06F9FA",
        transparent: true,
        opacity: 0.08,
      });
      return { line: new THREE.Line(geo, mat), mat };
    });

    return { nodes, edges, textures, lineObjects };
  }, []);

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    if (groupRef.current) {
      groupRef.current.rotation.x = t * 0.00213;
      groupRef.current.rotation.y = t * 0.00388;
      groupRef.current.rotation.z = t * 0.00138;
    }
    edgeMatsRef.current.forEach((mat, i) => {
      if (!mat) return;
      const phase = edges[i]?.phase ?? 0;
      mat.opacity = 0.08 + Math.sin(t * 0.9 + phase) * 0.02;
    });
    nodeMeshesRef.current.forEach((mesh, i) => {
      if (!mesh) return;
      const phase = nodes[i]?.phase ?? 0;
      const base = nodes[i]?.scale ?? 0.4;
      mesh.scale.setScalar(base * (1 + Math.sin(t * 1.0 + phase) * 0.035));
    });
  });

  return (
    <group ref={groupRef}>
      <ambientLight intensity={0.05} />
      <pointLight position={[0, 0, 5]} intensity={1.0} color="#06F9FA" distance={12} />

      {lineObjects.map(({ line, mat }, i) => {
        edgeMatsRef.current[i] = mat;
        return <primitive key={`e${i}`} object={line} />;
      })}

      {nodes.map((node, i) => (
        <mesh
          key={`n${i}`}
          position={node.pos}
          ref={(el) => { if (el) nodeMeshesRef.current[i] = el; }}
        >
          <planeGeometry args={[1, 1]} />
          <meshBasicMaterial
            map={textures[i]}
            transparent
            depthWrite={false}
            side={THREE.DoubleSide}
          />
        </mesh>
      ))}
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
        camera={{ position: [0.5, 0.3, 12], fov: 52 }}
        gl={{ alpha: true, antialias: true }}
      >
        <NetworkScene />
      </Canvas>
    </div>
  );
}
