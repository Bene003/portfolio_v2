"use client";

import { Float, Sparkles, Stars } from "@react-three/drei";
import { useFrame, useThree } from "@react-three/fiber";
import { useMemo, useRef, useState } from "react";
import {
  AdditiveBlending,
  BackSide,
  BufferGeometry,
  Color,
  DoubleSide,
  Group,
  MathUtils,
  Mesh,
  MeshBasicMaterial,
  MeshStandardMaterial,
  PointLight,
  ShaderMaterial,
  Vector3,
} from "three";

import { useTheme } from "@/hooks/useTheme";
import { toggleTheme, type Theme } from "@/lib/theme";

import type { SceneQuality } from "../HeroCanvas";

const COPPER = "#ff6a2b";
const GOLD = "#ffb15c";
const NIGHT = "#09070b";
const COOL = "#7790bd";
const STORM_OCEAN = "#379fe8";
const STORM_LAND = "#fff0a0";
const STORM_NIGHT = "#020817";
const STORM_CITY = "#ffffff";
const STORM_ATMOSPHERE = "#75d7ff";
const STORM_COOL = "#ffd84d";
const ICE_OCEAN = "#269dcb";
const ICE_LAND = "#d9f5ff";
const ICE_NIGHT = "#031a2b";
const ICE_CITY = "#80e5ff";
const ICE_ATMOSPHERE = "#73dcff";
const ICE_COOL = "#a9e9ff";
const FLORA_OCEAN = "#07533e";
const FLORA_LAND = "#57d36b";
const FLORA_NIGHT = "#020d07";
const FLORA_CITY = "#d6f57a";
const FLORA_ATMOSPHERE = "#6ee7a0";
const FLORA_COOL = "#5ba99a";
const TERRA_OCEAN = "#4b2417";
const TERRA_LAND = "#c9783d";
const TERRA_NIGHT = "#100603";
const TERRA_CITY = "#ffd28a";
const TERRA_ATMOSPHERE = "#e89554";
const TERRA_COOL = "#8f766c";
const WATER_OCEAN = "#0756b8";
const WATER_LAND = "#24b9dd";
const WATER_NIGHT = "#010817";
const WATER_CITY = "#baf6ff";
const WATER_ATMOSPHERE = "#36c9ff";
const WATER_COOL = "#6ee7ff";
const NOVA_OCEAN = "#2a1259";
const NOVA_LAND = "#b78bff";
const NOVA_NIGHT = "#05010f";
const NOVA_CITY = "#ffd9a0";
const NOVA_ATMOSPHERE = "#9a6bff";
const NOVA_COOL = "#e0c7ff";

const PLANET_PALETTES = {
  fire: {
    ocean: COPPER,
    land: GOLD,
    night: NIGHT,
    city: GOLD,
    cloud: "#ffd7b6",
    atmosphere: COPPER,
    cool: COOL,
    baseStrength: 0.46,
    landStrength: 1,
    stormStrength: 0,
    waterStrength: 0,
  },
  storm: {
    ocean: STORM_OCEAN,
    land: STORM_LAND,
    night: STORM_NIGHT,
    city: STORM_CITY,
    cloud: "#eefaff",
    atmosphere: STORM_ATMOSPHERE,
    cool: STORM_COOL,
    baseStrength: 0.64,
    landStrength: 1,
    stormStrength: 1,
    waterStrength: 0,
  },
  ice: {
    ocean: ICE_OCEAN,
    land: ICE_LAND,
    night: ICE_NIGHT,
    city: ICE_CITY,
    cloud: "#e8faff",
    atmosphere: ICE_ATMOSPHERE,
    cool: ICE_COOL,
    baseStrength: 0.74,
    landStrength: 1,
    stormStrength: 0,
    waterStrength: 0,
  },
  flora: {
    ocean: FLORA_OCEAN,
    land: FLORA_LAND,
    night: FLORA_NIGHT,
    city: FLORA_CITY,
    cloud: "#c8f7d4",
    atmosphere: FLORA_ATMOSPHERE,
    cool: FLORA_COOL,
    baseStrength: 0.54,
    landStrength: 1,
    stormStrength: 0,
    waterStrength: 0,
  },
  terra: {
    ocean: TERRA_OCEAN,
    land: TERRA_LAND,
    night: TERRA_NIGHT,
    city: TERRA_CITY,
    cloud: "#edc49c",
    atmosphere: TERRA_ATMOSPHERE,
    cool: TERRA_COOL,
    baseStrength: 0.62,
    landStrength: 1.18,
    stormStrength: 0,
    waterStrength: 0,
  },
  water: {
    ocean: WATER_OCEAN,
    land: WATER_LAND,
    night: WATER_NIGHT,
    city: WATER_CITY,
    cloud: "#dffbff",
    atmosphere: WATER_ATMOSPHERE,
    cool: WATER_COOL,
    baseStrength: 0.78,
    landStrength: 0.22,
    stormStrength: 0,
    waterStrength: 1,
  },
  nova: {
    ocean: NOVA_OCEAN,
    land: NOVA_LAND,
    night: NOVA_NIGHT,
    city: NOVA_CITY,
    cloud: "#e7d4ff",
    atmosphere: NOVA_ATMOSPHERE,
    cool: NOVA_COOL,
    baseStrength: 0.7,
    landStrength: 0.86,
    stormStrength: 0,
    waterStrength: 0,
  },
} satisfies Record<
  Theme,
  {
    ocean: string;
    land: string;
    night: string;
    city: string;
    cloud: string;
    atmosphere: string;
    cool: string;
    baseStrength: number;
    landStrength: number;
    stormStrength: number;
    waterStrength: number;
  }
>;

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
  uniform vec3 uCity;
  uniform float uBaseStrength;
  uniform float uLandStrength;
  uniform float uStorm;
  uniform float uWater;
  uniform float uInteraction;
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

    vec3 base = mix(uNight, uCopper * uBaseStrength, diffuse);
    base = mix(base, uGold, continents * (.22 + diffuse * .72) * uLandStrength);
    base += uGold * ridges * diffuse * .7 * uLandStrength;
    base += uCopper * scan * diffuse;

    float waterBand = sin((vUv.y + fbm(p * 1.35) * .09) * 105.0 + uTime * 1.35) * .5 + .5;
    float waterGlint = smoothstep(.82, 1.0, waterBand) * (.18 + diffuse * .58);
    base += uCity * waterGlint * uWater;
    base = mix(base, uCopper * (1.05 + diffuse * .42), uWater * .16);

    float cityMask = step(.965, hash(floor(p * 24.0))) * continents;
    base += uCity * cityMask * (1.0 - diffuse) * 3.5;

    float stormNoise = noise(p * 11.0 + vec3(uTime * .9));
    float stormBand = abs(sin((vUv.x + fbm(p * 1.8) * .2 + uTime * .08) * 74.0));
    float lightning = smoothstep(.965, 1.0, stormBand) * smoothstep(.44, .8, stormNoise);
    base += uCity * lightning * uStorm * (1.4 + (1.0 - diffuse) * 1.8);
    base += uCopper * rim * 1.35;
    base += uGold * rim * uInteraction * 1.15;
    base += uCopper * continents * uInteraction * .18;

    gl_FragColor = vec4(base, 1.0);
  }
`;

function World({
  quality,
  interactive,
  onInteractionChange,
  theme,
  transitioning,
}: {
  quality: SceneQuality;
  interactive: boolean;
  onInteractionChange: (active: boolean) => void;
  theme: Theme;
  transitioning: boolean;
}) {
  const { camera, gl } = useThree();
  const group = useRef<Group>(null);
  const world = useRef<Mesh>(null);
  const cloud = useRef<Mesh>(null);
  const material = useRef<ShaderMaterial>(null);
  const cloudMaterial = useRef<MeshStandardMaterial>(null);
  const atmosphereMaterial = useRef<MeshBasicMaterial>(null);
  const projectedCenter = useMemo(() => new Vector3(), []);
  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uCopper: { value: new Color(COPPER) },
      uGold: { value: new Color(GOLD) },
      uNight: { value: new Color(NIGHT) },
      uCity: { value: new Color(GOLD) },
      uBaseStrength: { value: 0.46 },
      uLandStrength: { value: 1 },
      uStorm: { value: 0 },
      uWater: { value: 0 },
      uInteraction: { value: 0 },
    }),
    [],
  );
  const segments = quality === "high" ? 96 : quality === "medium" ? 64 : 40;
  const shellSegments = quality === "high" ? 48 : quality === "medium" ? 36 : 28;
  const targets = useMemo(
    () => {
      const palette = PLANET_PALETTES[theme];
      return {
        ocean: new Color(palette.ocean),
        land: new Color(palette.land),
        night: new Color(palette.night),
        city: new Color(palette.city),
        cloud: new Color(palette.cloud),
        atmosphere: new Color(palette.atmosphere),
        baseStrength: palette.baseStrength,
        landStrength: palette.landStrength,
        stormStrength: palette.stormStrength,
        waterStrength: palette.waterStrength,
      };
    },
    [theme],
  );

  useFrame(({ clock }, delta) => {
    const themeDamping = 1 - Math.exp(-4 * delta);
    if (material.current) {
      material.current.uniforms.uTime.value = clock.elapsedTime;
      material.current.uniforms.uCopper.value.lerp(targets.ocean, themeDamping);
      material.current.uniforms.uGold.value.lerp(targets.land, themeDamping);
      material.current.uniforms.uNight.value.lerp(targets.night, themeDamping);
      material.current.uniforms.uCity.value.lerp(targets.city, themeDamping);
      material.current.uniforms.uBaseStrength.value = MathUtils.lerp(
        material.current.uniforms.uBaseStrength.value,
        targets.baseStrength,
        themeDamping,
      );
      material.current.uniforms.uLandStrength.value = MathUtils.lerp(
        material.current.uniforms.uLandStrength.value,
        targets.landStrength,
        themeDamping,
      );
      material.current.uniforms.uStorm.value = MathUtils.lerp(
        material.current.uniforms.uStorm.value,
        targets.stormStrength,
        themeDamping,
      );
      material.current.uniforms.uWater.value = MathUtils.lerp(
        material.current.uniforms.uWater.value,
        targets.waterStrength,
        themeDamping,
      );
      material.current.uniforms.uInteraction.value = MathUtils.lerp(
        material.current.uniforms.uInteraction.value,
        interactive ? 1 : 0,
        1 - Math.pow(0.002, delta),
      );
    }
    cloudMaterial.current?.color.lerp(targets.cloud, themeDamping);
    atmosphereMaterial.current?.color.lerp(
      targets.atmosphere,
      themeDamping,
    );
    if (group.current) {
      const scale = MathUtils.lerp(
        group.current.scale.x,
        interactive ? 1.045 : 1,
        1 - Math.pow(0.004, delta),
      );
      group.current.scale.setScalar(scale);
    }
    if (world.current) world.current.rotation.y += delta * 0.055;
    if (cloud.current) cloud.current.rotation.y -= delta * 0.018;
  });

  return (
    <group ref={group} rotation={[0.12, 0, -0.16]}>
      <mesh
        ref={world}
        onPointerEnter={(event) => {
          event.stopPropagation();
          onInteractionChange(true);
        }}
        onPointerMove={(event) => {
          event.stopPropagation();
          onInteractionChange(true);
        }}
        onPointerLeave={() => onInteractionChange(false)}
        onPointerDown={(event) => {
          event.stopPropagation();
          onInteractionChange(true);
        }}
        onPointerUp={(event) => {
          if (event.pointerType !== "mouse") onInteractionChange(false);
        }}
        onPointerCancel={() => onInteractionChange(false)}
        onClick={(event) => {
          event.stopPropagation();
          if (!world.current || transitioning) return;

          world.current.getWorldPosition(projectedCenter).project(camera);
          const rect = gl.domElement.getBoundingClientRect();
          toggleTheme({
            x: rect.left + ((projectedCenter.x + 1) / 2) * rect.width,
            y: rect.top + ((1 - projectedCenter.y) / 2) * rect.height,
            source: "planet",
          });
        }}
      >
        <sphereGeometry args={[1.72, segments, segments]} />
        <shaderMaterial
          ref={material}
          vertexShader={vertexShader}
          fragmentShader={fragmentShader}
          uniforms={uniforms}
        />
      </mesh>

      <mesh ref={cloud} scale={1.018}>
        <sphereGeometry args={[1.72, shellSegments, shellSegments]} />
        <meshStandardMaterial
          ref={cloudMaterial}
          color="#ffd7b6"
          wireframe
          transparent
          opacity={0.035}
          depthWrite={false}
        />
      </mesh>

      <mesh scale={1.11}>
        <sphereGeometry args={[1.72, shellSegments, shellSegments]} />
        <meshBasicMaterial
          ref={atmosphereMaterial}
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

function DataRing({ radius, tilt, speed, quality, theme, dash = false }: {
  radius: number;
  tilt: [number, number, number];
  speed: number;
  quality: SceneQuality;
  theme: Theme;
  dash?: boolean;
}) {
  const ring = useRef<Mesh<BufferGeometry>>(null);
  const material = useRef<MeshBasicMaterial>(null);
  const target = useMemo(
    () => {
      const palette = PLANET_PALETTES[theme];
      return new Color(dash ? palette.atmosphere : palette.cool);
    },
    [dash, theme],
  );
  useFrame((_, delta) => {
    if (ring.current) ring.current.rotation.z += delta * speed;
    material.current?.color.lerp(target, 1 - Math.exp(-4 * delta));
  });
  return (
    <mesh ref={ring} rotation={tilt}>
      <torusGeometry
        args={[
          radius,
          dash ? 0.012 : 0.006,
          quality === "low" ? 4 : 8,
          dash ? (quality === "low" ? 28 : 48) : quality === "high" ? 220 : 120,
        ]}
      />
      <meshBasicMaterial
        ref={material}
        color={dash ? GOLD : COOL}
        transparent
        opacity={dash ? 0.44 : 0.22}
        blending={AdditiveBlending}
        depthWrite={false}
      />
    </mesh>
  );
}

function Moon() {
  const carrier = useRef<Group>(null);
  const moon = useRef<Mesh>(null);
  useFrame(({ clock }, delta) => {
    if (carrier.current) carrier.current.rotation.y = clock.elapsedTime * -0.12 + 1.7;
    if (moon.current) moon.current.rotation.y += delta * 0.2;
  });

  return (
    <group rotation={[-0.22, 0, 0.42]}>
      <group ref={carrier}>
        <group position={[4.05, 0, 0]}>
          <mesh ref={moon}>
            <icosahedronGeometry args={[0.22, 2]} />
            <meshStandardMaterial color="#aab4c8" roughness={0.74} metalness={0.18} />
          </mesh>
          <mesh scale={1.3}>
            <sphereGeometry args={[0.22, 20, 20]} />
            <meshBasicMaterial
              color={COOL}
              transparent
              opacity={0.11}
              side={BackSide}
              blending={AdditiveBlending}
              depthWrite={false}
            />
          </mesh>
        </group>
      </group>
    </group>
  );
}

const SIGNALS = [
  [0.54, 1.42, 0.78],
  [-1.2, 0.65, 1.0],
  [1.34, -0.42, 0.95],
  [-0.46, -1.38, 0.9],
  [1.08, 0.88, -0.95],
] as const;

function SignalNodes({ quality, theme }: { quality: SceneQuality; theme: Theme }) {
  const nodes = useRef<Group>(null);
  const target = useMemo(
    () => new Color(PLANET_PALETTES[theme].city),
    [theme],
  );
  useFrame(({ clock }, delta) => {
    if (!nodes.current) return;
    nodes.current.children.forEach((node, index) => {
      const pulse = 0.75 + Math.sin(clock.elapsedTime * 2.1 + index * 1.7) * 0.25;
      node.scale.setScalar(pulse);
      const nodeMaterial = (node as Mesh).material as MeshBasicMaterial;
      nodeMaterial.color.lerp(target, 1 - Math.exp(-4 * delta));
    });
  });

  const visibleSignals = quality === "low" ? SIGNALS.slice(0, 3) : SIGNALS;
  return (
    <group ref={nodes}>
      {visibleSignals.map(([x, y, z], index) => {
        const position = new Vector3(x, y, z).normalize().multiplyScalar(1.78);
        return (
          <mesh key={index} position={position}>
            <sphereGeometry args={[0.026, 10, 10]} />
            <meshBasicMaterial color={GOLD} blending={AdditiveBlending} depthWrite={false} />
          </mesh>
        );
      })}
    </group>
  );
}

function TransmissionPulse({
  theme,
  revision,
}: {
  theme: Theme;
  revision: number;
}) {
  const pulse = useRef<Mesh>(null);
  const material = useRef<MeshBasicMaterial>(null);
  const elapsed = useRef(Number.POSITIVE_INFINITY);
  const seenRevision = useRef(revision);
  const target = useMemo(
    () => new Color(PLANET_PALETTES[theme].atmosphere),
    [theme],
  );

  useFrame((_, delta) => {
    if (seenRevision.current !== revision) {
      seenRevision.current = revision;
      elapsed.current = 0;
    }

    material.current?.color.lerp(target, 1 - Math.exp(-5 * delta));
    if (elapsed.current > 1.2) {
      if (material.current) material.current.opacity = 0;
      return;
    }

    elapsed.current += delta;
    const progress = Math.min(elapsed.current / 1.2, 1);
    const eased = 1 - Math.pow(1 - progress, 3);
    if (pulse.current) pulse.current.scale.setScalar(0.55 + eased * 2.45);
    if (material.current) {
      material.current.opacity = Math.sin(progress * Math.PI) * 0.42;
    }
  });

  return (
    <mesh ref={pulse} rotation={[Math.PI / 2, 0, 0]}>
      <ringGeometry args={[1.82, 1.85, 96]} />
      <meshBasicMaterial
        ref={material}
        color={GOLD}
        transparent
        opacity={0}
        side={DoubleSide}
        blending={AdditiveBlending}
        depthWrite={false}
      />
    </mesh>
  );
}

function Satellite({ theme }: { theme: Theme }) {
  const carrier = useRef<Group>(null);
  const bodyMaterial = useRef<MeshStandardMaterial>(null);
  const light = useRef<PointLight>(null);
  const bodyTarget = useMemo(
    () => new Color(PLANET_PALETTES[theme].city),
    [theme],
  );
  const lightTarget = useMemo(
    () => new Color(PLANET_PALETTES[theme].atmosphere),
    [theme],
  );
  useFrame(({ clock }, delta) => {
    if (carrier.current) carrier.current.rotation.y = clock.elapsedTime * 0.23;
    const damping = 1 - Math.exp(-4 * delta);
    bodyMaterial.current?.color.lerp(bodyTarget, damping);
    light.current?.color.lerp(lightTarget, damping);
  });
  return (
    <group rotation={[0.45, 0, -0.2]}>
      <group ref={carrier}>
        <group position={[3.05, 0, 0]} rotation={[0.2, 0.5, 0]}>
          <mesh>
            <boxGeometry args={[0.16, 0.1, 0.12]} />
            <meshStandardMaterial
              ref={bodyMaterial}
              color={GOLD}
              metalness={0.85}
              roughness={0.25}
            />
          </mesh>
          {[-0.21, 0.21].map((x) => (
            <mesh key={x} position={[x, 0, 0]}>
              <boxGeometry args={[0.24, 0.015, 0.12]} />
              <meshBasicMaterial color={COOL} side={DoubleSide} />
            </mesh>
          ))}
          <pointLight ref={light} color={GOLD} intensity={2} distance={1.2} />
        </group>
      </group>
    </group>
  );
}

function PointerRig({
  active,
  children,
}: {
  active: boolean;
  children: React.ReactNode;
}) {
  const rig = useRef<Group>(null);
  useFrame((state, delta) => {
    if (!rig.current) return;
    const damping = 1 - Math.pow(0.002, delta);
    const pointerX = active ? state.pointer.x : 0;
    const pointerY = active ? state.pointer.y : 0;
    rig.current.rotation.y = MathUtils.lerp(rig.current.rotation.y, pointerX * 0.34, damping);
    rig.current.rotation.x = MathUtils.lerp(rig.current.rotation.x, -pointerY * 0.2, damping);
    rig.current.position.x = MathUtils.lerp(rig.current.position.x, pointerX * 0.14, damping);
  });
  return <group ref={rig}>{children}</group>;
}

export default function CopperSystem({ quality }: { quality: SceneQuality }) {
  const { theme, revision, transitioning } = useTheme();
  const [interactive, setInteractive] = useState(false);
  const scale = quality === "high" ? 1.24 : quality === "medium" ? 1.16 : 1.32;
  const starCount = quality === "high" ? 520 : quality === "medium" ? 320 : 190;
  const sparkleCount = quality === "high" ? 40 : quality === "medium" ? 24 : 12;

  return (
    <>
      <Stars
        radius={45}
        depth={22}
        count={starCount}
        factor={theme === "storm" || theme === "flora" || theme === "water" ? 1.2 : 1.6}
        saturation={theme === "storm" ? 0.48 : theme === "ice" || theme === "water" ? 0.18 : 0.35}
        fade
        speed={0.18}
      />
      <PointerRig active={interactive}>
        <Float speed={0.8} rotationIntensity={0.08} floatIntensity={0.28}>
          <group scale={scale} position={[0, quality === "low" ? -0.18 : 0, 0]}>
            <World
              quality={quality}
              interactive={interactive}
              onInteractionChange={setInteractive}
              theme={theme}
              transitioning={transitioning}
            />
            <SignalNodes quality={quality} theme={theme} />
            <TransmissionPulse theme={theme} revision={revision} />
            <DataRing quality={quality} theme={theme} radius={2.35} tilt={[1.18, 0.16, 0.24]} speed={0.025} />
            <DataRing quality={quality} theme={theme} radius={2.72} tilt={[1.42, -0.18, -0.36]} speed={-0.04} dash />
            <DataRing quality={quality} theme={theme} radius={3.4} tilt={[1.28, 0.45, 0.14]} speed={0.018} />
            <Satellite theme={theme} />
            {quality !== "low" && <Moon />}
          </group>
        </Float>
        <Sparkles
          count={sparkleCount}
          scale={[8, 6, 5]}
          size={2.2}
          speed={0.22}
          opacity={theme === "storm" ? 0.54 : 0.48}
          color={PLANET_PALETTES[theme].atmosphere}
        />
      </PointerRig>
    </>
  );
}
