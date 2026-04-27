"use client";

import { useRef, useMemo, useState, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

const PHOTO_URLS = [
  "/avatars/neo1.jpg",  "/avatars/neo2.jpg",  "/avatars/neo3.jpg",  "/avatars/neo4.jpg",
  "/avatars/neo5.jpg",  "/avatars/neo6.jpg",  "/avatars/neo7.jpg",  "/avatars/neo8.jpg",
  "/avatars/neo9.jpg",  "/avatars/neo10.jpg", "/avatars/neo11.jpg", "/avatars/neo12.jpg",
  "/avatars/neo13.jpg", "/avatars/neo14.jpg", "/avatars/neo15.jpg", "/avatars/neo16.jpg",
  "/avatars/neo17.jpg", "/avatars/neo18.jpg", "/avatars/neo19.jpg", "/avatars/neo20.jpg",
  "/avatars/neo21.jpg", "/avatars/neo22.jpg", "/avatars/neo23.jpg",
];

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

  nodes.push({ pos: new THREE.Vector3(0, 0, 0), scale: 1.1, isCenter: true, phase: 0 });

  const r1 = 5.5;
  const layer1Angles = [
    [0.52, 1.05], [2.09, 2.09], [3.67, 0.52],
    [4.71, 1.57], [1.26, 2.62], [5.76, 1.05],
    [0.95, 0.42], [3.20, 1.88], [1.80, 1.30],
    [4.20, 0.80], [5.00, 2.20], [2.70, 0.60],
  ];
  layer1Angles.forEach(([theta, phi], i) => {
    nodes.push({
      pos: spherePoint(r1, theta, phi),
      scale: 0.78,
      isCenter: false,
      phase: (i / layer1Angles.length) * Math.PI * 2,
    });
    edges.push({ a: 0, b: i + 1, phase: (i / layer1Angles.length) * Math.PI * 2 });
  });

  const l1count = layer1Angles.length;
  edges.push({ a: 1, b: 3, phase: 0.3 });
  edges.push({ a: 2, b: 4, phase: 0.8 });
  edges.push({ a: 3, b: 5, phase: 1.2 });
  edges.push({ a: 4, b: 6, phase: 0.5 });
  edges.push({ a: 5, b: 7, phase: 0.9 });
  edges.push({ a: 6, b: 8, phase: 1.5 });
  edges.push({ a: 7, b: 9, phase: 0.4 });
  edges.push({ a: 8, b: 10, phase: 1.1 });
  edges.push({ a: 9, b: 11, phase: 0.7 });
  edges.push({ a: 10, b: 12, phase: 1.4 });
  edges.push({ a: 1, b: 12, phase: 0.6 });
  edges.push({ a: 2, b: 11, phase: 1.0 });

  const r2 = 11.0;
  const layer2Angles = [
    [0.79, 0.79], [2.36, 1.26], [3.93, 0.52],
    [5.50, 1.83], [1.05, 2.36], [2.62, 0.26],
    [4.19, 2.09], [0.26, 1.57], [1.70, 0.88],
    [3.40, 1.40], [5.10, 0.70], [0.60, 2.00],
    [2.00, 0.50], [4.60, 1.20], [6.00, 0.90],
  ];
  const l2start = nodes.length;
  layer2Angles.forEach(([theta, phi], i) => {
    nodes.push({
      pos: spherePoint(r2, theta, phi),
      scale: 0.55,
      isCenter: false,
      phase: i * 0.85 + 1.1,
    });
    const r1Idx = 1 + (i % l1count);
    edges.push({ a: r1Idx, b: l2start + i, phase: i * 0.6 });
  });

  edges.push({ a: l2start,      b: l2start + 2,  phase: 0.7 });
  edges.push({ a: l2start + 1,  b: l2start + 4,  phase: 1.3 });
  edges.push({ a: l2start + 3,  b: l2start + 6,  phase: 0.2 });
  edges.push({ a: l2start + 5,  b: l2start + 8,  phase: 1.8 });
  edges.push({ a: l2start + 7,  b: l2start + 10, phase: 0.6 });
  edges.push({ a: l2start + 9,  b: l2start + 12, phase: 1.1 });
  edges.push({ a: l2start + 11, b: l2start + 14, phase: 0.4 });
  edges.push({ a: l2start + 13, b: l2start + 2,  phase: 0.9 });

  return { nodes, edges };
}

// Circle mask texture baked on a canvas — no external image, no CORS
function makeCircleMask(size = 128): THREE.CanvasTexture {
  const canvas = document.createElement("canvas");
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext("2d")!;
  ctx.clearRect(0, 0, size, size);
  ctx.beginPath();
  ctx.arc(size / 2, size / 2, size / 2 - 1, 0, Math.PI * 2);
  ctx.fillStyle = "#ffffff";
  ctx.fill();
  return new THREE.CanvasTexture(canvas);
}

function NodeMesh({
  node,
  photoUrl,
  nodeRef,
}: {
  node: NodeDef;
  photoUrl: string;
  nodeRef: (el: THREE.Mesh | null) => void;
}) {
  const [photoTex, setPhotoTex] = useState<THREE.Texture | null>(null);

  const circleMask = useMemo(() => makeCircleMask(128), []);

  useEffect(() => {
    return () => { circleMask.dispose(); };
  }, [circleMask]);

  const borderWidth = node.isCenter ? 0.06 : 0.04;

  useEffect(() => {
    let cancelled = false;
    const loader = new THREE.TextureLoader();
    loader.load(
      photoUrl,
      (tex) => {
        if (cancelled) { tex.dispose(); return; }
        tex.colorSpace = THREE.SRGBColorSpace;
        setPhotoTex(tex);
      },
      undefined,
      () => { if (!cancelled) setPhotoTex(null); }
    );
    return () => { cancelled = true; };
  }, [photoUrl]);

  useEffect(() => {
    return () => { photoTex?.dispose(); };
  }, [photoTex]);

  return (
    <mesh position={node.pos} ref={nodeRef}>
      {/* Border ring slightly behind */}
      <mesh position={[0, 0, -0.01]}>
        <ringGeometry args={[0.48, 0.52 + borderWidth, 48]} />
        <meshBasicMaterial
          color={node.isCenter ? "#06F9FA" : "#06F9FA"}
          transparent
          opacity={node.isCenter ? 1.0 : 0.55}
          depthWrite={false}
          side={THREE.DoubleSide}
        />
      </mesh>

      {/* Dark background circle */}
      <mesh position={[0, 0, -0.005]}>
        <circleGeometry args={[0.48, 48]} />
        <meshBasicMaterial
          color="#060e1a"
          transparent
          opacity={0.9}
          depthWrite={false}
          side={THREE.DoubleSide}
        />
      </mesh>

      {/* Photo circle */}
      <mesh>
        <circleGeometry args={[0.47, 48]} />
        <meshBasicMaterial
          map={photoTex ?? undefined}
          alphaMap={photoTex ? circleMask : undefined}
          transparent
          depthWrite={false}
          side={THREE.DoubleSide}
          color={photoTex ? "#ffffff" : "#06F9FA"}
          opacity={photoTex ? 1.0 : 0.3}
        />
      </mesh>
    </mesh>
  );
}

function NetworkScene() {
  const groupRef = useRef<THREE.Group>(null);
  const edgeMatsRef = useRef<THREE.LineBasicMaterial[]>([]);
  const nodeMeshesRef = useRef<THREE.Mesh[]>([]);

  const { nodes, edges, lineObjects } = useMemo(() => {
    const { nodes, edges } = buildGraph();
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
    return { nodes, edges, lineObjects };
  }, []);

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    if (groupRef.current) {
      groupRef.current.rotation.x = t * 0.007;
      groupRef.current.rotation.y = t * 0.012;
      groupRef.current.rotation.z = t * 0.005;
    }
    edgeMatsRef.current.forEach((mat, i) => {
      if (!mat) return;
      mat.opacity = 0.08 + Math.sin(t * 0.9 + (edges[i]?.phase ?? 0)) * 0.02;
    });
    nodeMeshesRef.current.forEach((mesh, i) => {
      if (!mesh) return;
      mesh.lookAt(state.camera.position);
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
        <NodeMesh
          key={`n${i}`}
          node={node}
          photoUrl={PHOTO_URLS[i % PHOTO_URLS.length]}
          nodeRef={(el) => {
            if (el) nodeMeshesRef.current[i] = el;
          }}
        />
      ))}
    </group>
  );
}

export function HeroOrb() {
  return (
    <div
      style={{
        position: "absolute",
        right: 0,
        top: 0,
        width: "60%",
        height: "100%",
        pointerEvents: "none",
        maskImage: "linear-gradient(to right, transparent 0%, rgba(0,0,0,0.3) 20%, black 40%)",
        WebkitMaskImage: "linear-gradient(to right, transparent 0%, rgba(0,0,0,0.3) 20%, black 40%)",
      }}
    >
      <Canvas
        style={{ width: "100%", height: "100%" }}
        camera={{ position: [0, 0, 14], fov: 65 }}
        gl={{ alpha: true, antialias: true }}
      >
        <NetworkScene />
      </Canvas>
    </div>
  );
}
