"use client";

import { AdaptiveDpr, Environment, Lightformer } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { useEffect, useRef, useState } from "react";

import CopperSystem from "./scene/CopperSystem";

/** Renders only while the hero is on screen and the tab is visible. Off-screen
 *  the frameloop stops entirely, so scrolling through the rest of the page
 *  costs zero GPU. Both setState calls come from external callbacks. */
function useIsLive(ref: React.RefObject<HTMLDivElement | null>) {
  const [onScreen, setOnScreen] = useState(true);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const io = new IntersectionObserver(
      ([entry]) => setOnScreen(entry.isIntersecting),
      { rootMargin: "120px" },
    );
    io.observe(el);

    const onVisibility = () => setVisible(!document.hidden);
    document.addEventListener("visibilitychange", onVisibility);

    return () => {
      io.disconnect();
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, [ref]);

  return onScreen && visible;
}

export default function HeroCanvas() {
  const wrapper = useRef<HTMLDivElement>(null);
  const live = useIsLive(wrapper);

  return (
    <div ref={wrapper} className="absolute inset-0">
      <Canvas
        frameloop={live ? "always" : "never"}
        dpr={[1, 1.75]}
        gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
        camera={{ position: [0, 0.15, 10.5], fov: 38 }}
        // The canvas is decorative; the hero text carries the meaning.
        aria-hidden
      >
        {/* Local rig only — no HDR is fetched from a CDN. */}
        <Environment resolution={64}>
          {/* wide and soft: a large low-intensity source reads as a gradient
              across the metal, where a small bright one reads as a hotspot */}
          <Lightformer
            form="rect"
            intensity={1.15}
            color="#ffc79a"
            position={[7, 6, 4]}
            scale={[16, 16, 1]}
          />
          <Lightformer
            intensity={0.85}
            color="#8fa0bd"
            position={[-7, -2, -4]}
            scale={[14, 14, 1]}
          />
          <Lightformer
            intensity={0.5}
            color="#ffffff"
            position={[0, 8, -8]}
            scale={[18, 5, 1]}
          />
          <Lightformer
            intensity={0.45}
            color="#ff8c4d"
            position={[-4, 2, 6]}
            scale={[10, 10, 1]}
          />
        </Environment>

        <ambientLight intensity={0.35} />
        <directionalLight position={[5, 4, 6]} intensity={0.7} color="#ffc79a" />

        <CopperSystem />

        <AdaptiveDpr pixelated />
      </Canvas>
    </div>
  );
}
