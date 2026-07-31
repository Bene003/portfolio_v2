"use client";

import { Float, Sparkles, Stars } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import {
  AdditiveBlending,
  BackSide,
  BufferGeometry,
  Color,
  DoubleSide,
  Group,
  MathUtils,
  Mesh,
  ShaderMaterial,
} from "three";

const COPPER = "#ff6a2b";
const GOLD = "#ffb15c";
const NIGHT = "#09070b";
const COOL = "#7790bd";

const vertexShader = /* glsl */ `
  varying vec3 vNormal;
  varying vec3 vWorldPosition;
  varying vec2 vUv;

  void main() {
    vUv = uv;
    vNormal = normalize(normalMatrix * normal);
    vec4 world = modelMatrix * vec4(position, 1.0);
    vWorldPosition = world.xyz;
    gl_Position = projectionMatrix * viewMatrix * world;
  }
`;

const fragmentShader = /* glsl */ `
  uniform float uTime;
  uniform vec3 uCopper;
  uniform vec3 uGold;
  uniform vec3 uNight;
  varying vec3 vNormal;
  varying vec3 vWorldPosition;
  varying vec2 vUv;

  float hash(vec3 p) {
    p = fract(p * .3183099 + .1);
    p *= 17.0;
    return fract(p.x * p.y * p.z * (p.x + p.y + p.z));
  }

  float noise(vec3 p) {
    vec3 i = floor(p);
    vec3 f = fract(p);
    f = f * f * (3.0 - 2.0 * f);
    return mix(mix(mix(hash(i), hash(i + vec3(1,0,0)), f.x),
                   mix(hash(i + vec3(0,1,0)), hash(i + vec3(1,1,0)), f.x), f.y),
               mix(mix(hash(i + vec3(0,0,1)), hash(i + vec3(1,0,1)), f.x),
                   mix(hash(i + vec3(0,1,1)), hash(i + vec3(1,1,1)), f.x), f.y), f.z);
  }

  float fbm(vec3 p) {
    float value = 0.0;
    float amplitude = .5;
    for (int i = 0; i < 5; i++) {
      value += amplitude * noise(p);
      p = p * 2.03 + 11.7;
      amplitude *= .5;
    }
    return value;
  }

  void main() {
    vec3 n = normalize(vNormal);
    vec3 viewDirection = normalize(cameraPosition - vWorldPosition);
    vec3 lightDirection = normalize(vec3(-.7, .85, 1.0));
    float diffuse = max(dot(n, lightDirection), 0.0);
    float rim = pow(1.0 - max(dot(n, viewDirection), 0.0), 2.7);

    vec3 p = normalize(vWorldPosition) * 3.8;
    float continents = smoothstep(.47, .65, fbm(p + vec3(uTime * .025, 0., 0.)));
    float ridges = smoothstep(.64, .84, fbm(p * 2.4));
    float latitude = sin((vUv.y + fbm(p) * .08) * 55.0) * .5 + .5;
    float scan = smoothstep(.82, 1., latitude) * .15;

    vec3 base = mix(uNight, uCopper * .46, diffuse);
    base = mix(base, uGold, continents * (.22 + diffuse * .72));
    base += uGold * ridges * diffuse * .7;
    base += uCopper * scan * diffuse;

    float cityMask = step(.965, hash(floor(p * 24.0))) * continents;
    base += uGold * cityMask * (1.0 - diffuse) * 3.5;
    base += uCopper * rim * 1.35;

    gl_FragColor = vec4(base, 1.0);
  }
`;

function World() {
  const world = useRef<Mesh>(null);
  const cloud = useRef<Mesh>(null);
  const material = useRef<ShaderMaterial>(null);
  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uCopper: { value: new Color(COPPER) },
      uGold: { value: new Color(GOLD) },
      uNight: { value: new Color(NIGHT) },
    }),
    [],
  );

  useFrame(({ clock }, delta) => {
    if (material.current) material.current.uniforms.uTime.value = clock.elapsedTime;
    if (world.current) world.current.rotation.y += delta * 0.055;
    if (cloud.current) cloud.current.rotation.y -= delta * 0.018;
  });

  return (
    <group rotation={[0.12, 0, -0.16]}>
      <mesh ref={world}>
        <sphereGeometry args={[1.72, 128, 128]} />
        <shaderMaterial
          ref={material}
          vertexShader={vertexShader}
          fragmentShader={fragmentShader}
          uniforms={uniforms}
        />
      </mesh>

      <mesh ref={cloud} scale={1.018}>
        <sphereGeometry args={[1.72, 64, 64]} />
        <meshStandardMaterial
          color="#ffd7b6"
          wireframe
          transparent
          opacity={0.035}
          depthWrite={false}
        />
      </mesh>

      <mesh scale={1.11}>
        <sphereGeometry args={[1.72, 64, 64]} />
        <meshBasicMaterial
          color={COPPER}
          transparent
          opacity={0.19}
          side={BackSide}
          blending={AdditiveBlending}
          depthWrite={false}
        />
      </mesh>
    </group>
  );
}

function DataRing({ radius, tilt, speed, dash = false }: {
  radius: number;
  tilt: [number, number, number];
  speed: number;
  dash?: boolean;
}) {
  const ring = useRef<Mesh<BufferGeometry>>(null);
  useFrame((_, delta) => {
    if (ring.current) ring.current.rotation.z += delta * speed;
  });
  return (
    <mesh ref={ring} rotation={tilt}>
      <torusGeometry args={[radius, dash ? 0.012 : 0.006, 8, dash ? 48 : 220]} />
      <meshBasicMaterial
        color={dash ? GOLD : COOL}
        transparent
        opacity={dash ? 0.44 : 0.22}
        blending={AdditiveBlending}
        depthWrite={false}
      />
    </mesh>
  );
}

function Satellite() {
  const carrier = useRef<Group>(null);
  useFrame(({ clock }) => {
    if (carrier.current) carrier.current.rotation.y = clock.elapsedTime * 0.23;
  });
  return (
    <group rotation={[0.45, 0, -0.2]}>
      <group ref={carrier}>
        <group position={[3.05, 0, 0]} rotation={[0.2, 0.5, 0]}>
          <mesh>
            <boxGeometry args={[0.16, 0.1, 0.12]} />
            <meshStandardMaterial color={GOLD} metalness={0.85} roughness={0.25} />
          </mesh>
          {[-0.21, 0.21].map((x) => (
            <mesh key={x} position={[x, 0, 0]}>
              <boxGeometry args={[0.24, 0.015, 0.12]} />
              <meshBasicMaterial color={COOL} side={DoubleSide} />
            </mesh>
          ))}
          <pointLight color={GOLD} intensity={2} distance={1.2} />
        </group>
      </group>
    </group>
  );
}

function PointerRig({ children }: { children: React.ReactNode }) {
  const rig = useRef<Group>(null);
  useFrame((state, delta) => {
    if (!rig.current) return;
    const damping = 1 - Math.pow(0.002, delta);
    rig.current.rotation.y = MathUtils.lerp(rig.current.rotation.y, state.pointer.x * 0.34, damping);
    rig.current.rotation.x = MathUtils.lerp(rig.current.rotation.x, -state.pointer.y * 0.2, damping);
    rig.current.position.x = MathUtils.lerp(rig.current.position.x, state.pointer.x * 0.14, damping);
  });
  return <group ref={rig}>{children}</group>;
}

export default function CopperSystem() {
  return (
    <>
      <Stars radius={45} depth={22} count={700} factor={1.6} saturation={0.35} fade speed={0.18} />
      <PointerRig>
        <Float speed={0.8} rotationIntensity={0.08} floatIntensity={0.28}>
          <group scale={0.92}>
            <World />
            <DataRing radius={2.35} tilt={[1.18, 0.16, 0.24]} speed={0.025} />
            <DataRing radius={2.72} tilt={[1.42, -0.18, -0.36]} speed={-0.04} dash />
            <DataRing radius={3.4} tilt={[1.28, 0.45, 0.14]} speed={0.018} />
            <Satellite />
          </group>
        </Float>
        <Sparkles count={54} scale={[8, 6, 5]} size={2.2} speed={0.22} opacity={0.48} color={GOLD} />
      </PointerRig>
    </>
  );
}
