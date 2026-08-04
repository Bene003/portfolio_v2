import type { CSSProperties } from "react";

import { KEY_SKILLS } from "@/lib/skills";

type EffectStyle = CSSProperties & Record<`--${string}`, string | number>;

const FIRE_EMBERS = Array.from({ length: 38 }, (_, index) => ({
  x: (index * 37 + (index % 4) * 11) % 100,
  size: 2 + ((index * 13) % 7),
  delay: -((index * 0.73) % 9),
  duration: 5 + ((index * 17) % 48) / 10,
  drift: -48 + ((index * 29) % 96),
}));

const ICE_HAIL = Array.from({ length: 42 }, (_, index) => ({
  x: (index * 31 + (index % 6) * 13) % 100,
  size: 4 + ((index * 17) % 10),
  delay: -((index * 0.41) % 8),
  duration: 4 + ((index * 23) % 38) / 10,
  drift: -38 + ((index * 19) % 76),
  round: index % 3 === 0,
}));

const ICE_SKILLS = KEY_SKILLS.map((label, index) => ({
  label,
  x: 4 + ((index * 29 + (index % 3) * 13) % 90),
  delay: -(index * 1.7),
  duration: 13 + (index % 4) * 1.8,
  drift: -48 + (index % 5) * 24,
}));

const FLORA_LEAVES = Array.from({ length: 30 }, (_, index) => ({
  x: (index * 47 + (index % 4) * 17) % 100,
  y: 10 + ((index * 31) % 86),
  size: 9 + ((index * 11) % 16),
  delay: -((index * 0.83) % 11),
  duration: 7 + ((index * 13) % 50) / 10,
  rotation: (index * 67) % 360,
}));

const FLORA_SPORES = Array.from({ length: 26 }, (_, index) => ({
  x: (index * 53 + 9) % 100,
  y: (index * 29 + 17) % 100,
  delay: -((index * 0.61) % 8),
  duration: 4.5 + ((index * 17) % 45) / 10,
}));

const FLORA_GROWTHS = Array.from({ length: 18 }, (_, index) => ({
  x: 10 + ((index * 31 + (index % 4) * 9) % 82),
  y: 14 + ((index * 23 + (index % 3) * 7) % 78),
  height: 34 + ((index * 17) % 58),
  delay: -((index * 0.77) % 9),
  duration: 7 + ((index * 13) % 38) / 10,
  lean: -18 + ((index * 11) % 36),
}));

const FLORA_SKILLS = KEY_SKILLS.map((label, index) => ({
  label,
  x: 6 + ((index * 23 + (index % 3) * 7) % 86),
  y: 8 + ((index * 19) % 82),
  delay: -(index * 1.15),
  scale: 0.82 + (index % 3) * 0.09,
}));

const STORM_SKILLS = KEY_SKILLS.map((label, index) => ({
  label,
  x: index % 2 === 0 ? 3 + (index % 3) * 5 : 67 + (index % 3) * 7,
  y: 7 + ((index * 19) % 84),
  delay: -(index * 0.92),
  angle: index % 2 === 0 ? -8 + (index % 3) * 8 : 8 - (index % 3) * 8,
}));

const TERRA_ROCKS = Array.from({ length: 26 }, (_, index) => ({
  x: (index * 43 + (index % 5) * 7) % 100,
  y: 6 + ((index * 31) % 90),
  size: 5 + ((index * 17) % 13),
  delay: -((index * 0.67) % 10),
  duration: 8 + ((index * 19) % 52) / 10,
  rotation: (index * 71) % 360,
}));

const TERRA_SKILLS = KEY_SKILLS.map((label, index) => ({
  label,
  x: index % 2 === 0 ? 4 + (index % 3) * 6 : 68 + (index % 3) * 7,
  y: 8 + ((index * 21) % 82),
  delay: -(index * 1.08),
  rotation: -12 + (index % 5) * 6,
}));

const WATER_DROPS = Array.from({ length: 34 }, (_, index) => ({
  x: (index * 37 + (index % 6) * 9) % 100,
  size: 5 + ((index * 13) % 10),
  delay: -((index * 0.43) % 8),
  duration: 4.6 + ((index * 23) % 36) / 10,
  drift: -28 + ((index * 17) % 56),
}));

const WATER_BUBBLES = Array.from({ length: 22 }, (_, index) => ({
  x: (index * 47 + 11) % 100,
  size: 4 + ((index * 19) % 16),
  delay: -((index * 0.72) % 10),
  duration: 7 + ((index * 29) % 54) / 10,
  drift: -36 + ((index * 23) % 72),
}));

const WATER_SKILLS = KEY_SKILLS.map((label, index) => ({
  label,
  x: 5 + ((index * 31 + (index % 3) * 11) % 88),
  delay: -(index * 1.32),
  duration: 12 + (index % 4) * 1.7,
  drift: -52 + (index % 5) * 26,
}));

const NOVA_STARS = Array.from({ length: 44 }, (_, index) => ({
  x: (index * 41 + (index % 5) * 11) % 100,
  y: (index * 67 + (index % 7) * 8) % 100,
  size: 2 + ((index * 13) % 9) / 2,
  glow: 10 + ((index * 17) % 22),
  delay: -((index * 0.83) % 9),
  duration: 3.4 + ((index * 23) % 42) / 10,
}));

const NOVA_SHARDS = Array.from({ length: 12 }, (_, index) => ({
  x: (index * 53 + 7) % 96,
  y: (index * 37 + 11) % 92,
  size: 90 + ((index * 29) % 140),
  angle: -32 + ((index * 17) % 64),
  delay: -((index * 1.27) % 11),
  duration: 6 + ((index * 19) % 44) / 10,
}));

function FireWorld() {
  return (
    <div className="world-effect world-effect--fire">
      <div className="fire-horizon" />
      {FIRE_EMBERS.map((ember, index) => (
        <span
          key={index}
          className="fire-ember"
          style={{
            "--x": `${ember.x}%`,
            "--size": `${ember.size}px`,
            "--delay": `${ember.delay}s`,
            "--duration": `${ember.duration}s`,
            "--drift": `${ember.drift}px`,
          } as EffectStyle}
        />
      ))}
      {Array.from({ length: 8 }, (_, index) => (
        <span
          key={index}
          className="fire-tongue"
          style={{
            "--x": `${2 + index * 14}%`,
            "--scale": 0.76 + (index % 3) * 0.27,
            "--delay": `${-index * 0.43}s`,
          } as EffectStyle}
        />
      ))}
    </div>
  );
}

function StormWorld() {
  return (
    <div className="world-effect world-effect--storm">
      <div className="storm-vignette" />
      {Array.from({ length: 5 }, (_, index) => (
        <span
          key={`cloud-${index}`}
          className="storm-cloud"
          style={{
            "--y": `${3 + index * 22}%`,
            "--delay": `${-index * 6}s`,
            "--duration": `${24 + index * 5}s`,
            "--scale": 0.78 + index * 0.13,
          } as EffectStyle}
        />
      ))}
      {STORM_SKILLS.map((skill, index) => (
        <span
          key={skill.label}
          className={`storm-skill ${skill.x > 50 ? "storm-skill--right" : ""}`}
          style={{
            "--x": `${skill.x}%`,
            "--y": `${skill.y}%`,
            "--delay": `${skill.delay}s`,
            "--angle": `${skill.angle}deg`,
          } as EffectStyle}
        >
          <svg className="storm-skill__bolt" viewBox="0 0 42 116" fill="none">
            <path d="M29 2 7 58h16l-9 56 27-72H25L29 2Z" />
          </svg>
          <span className="storm-skill__label">{skill.label}</span>
          {index % 3 === 0 && <span className="storm-skill__branch" />}
        </span>
      ))}
      <span className="storm-flash storm-flash--one" />
      <span className="storm-flash storm-flash--two" />
    </div>
  );
}

function IceWorld() {
  return (
    <div className="world-effect world-effect--ice">
      <div className="ice-frost ice-frost--left" />
      <div className="ice-frost ice-frost--right" />
      {ICE_HAIL.map((hail, index) => (
        <span
          key={index}
          className={`ice-hail ${hail.round ? "ice-hail--round" : ""}`}
          style={{
            "--x": `${hail.x}%`,
            "--size": `${hail.size}px`,
            "--delay": `${hail.delay}s`,
            "--duration": `${hail.duration}s`,
            "--drift": `${hail.drift}px`,
          } as EffectStyle}
        />
      ))}
      {ICE_SKILLS.map((skill) => (
        <span
          key={skill.label}
          className={`ice-skill ${skill.x > 54 ? "ice-skill--right" : ""}`}
          style={{
            "--x": `${skill.x}%`,
            "--delay": `${skill.delay}s`,
            "--duration": `${skill.duration}s`,
            "--drift": `${skill.drift}px`,
          } as EffectStyle}
        >
          <span className="ice-skill__crystal" />
          <span className="ice-skill__label">{skill.label}</span>
        </span>
      ))}
    </div>
  );
}

function Vine({ mirrored = false }: { mirrored?: boolean }) {
  return (
    <svg viewBox="0 0 260 720" className={`flora-vine ${mirrored ? "flora-vine--mirrored" : ""}`} fill="none">
      <path className="flora-vine__stem" d="M28 720C38 630 144 628 113 528 80 423 224 421 178 303 151 235 232 173 210 70" />
      {[620, 510, 405, 292, 174].map((y, index) => (
        <g key={y} className="flora-vine__leaf" style={{ animationDelay: `${index * 0.34}s` }}>
          <ellipse cx={index % 2 ? 153 : 81} cy={y} rx="25" ry="9" />
          <path d={`M${index % 2 ? 130 : 104} ${y}h${index % 2 ? 25 : -25}`} />
        </g>
      ))}
    </svg>
  );
}

function FloraWorld() {
  return (
    <div className="world-effect world-effect--flora">
      <Vine />
      <Vine mirrored />
      {FLORA_GROWTHS.map((growth, index) => (
        <span
          key={`growth-${index}`}
          className="flora-growth"
          style={{
            "--x": `${growth.x}%`,
            "--y": `${growth.y}%`,
            "--height": `${growth.height}px`,
            "--delay": `${growth.delay}s`,
            "--duration": `${growth.duration}s`,
            "--lean": `${growth.lean}deg`,
          } as EffectStyle}
        >
          <span className="flora-growth__stem" />
          <span className="flora-growth__leaf flora-growth__leaf--one" />
          <span className="flora-growth__leaf flora-growth__leaf--two" />
          <span className="flora-growth__bud" />
        </span>
      ))}
      {FLORA_SKILLS.map((skill) => (
        <span
          key={skill.label}
          className={`flora-skill ${skill.x > 56 ? "flora-skill--right" : ""}`}
          style={{
            "--x": `${skill.x}%`,
            "--y": `${skill.y}%`,
            "--delay": `${skill.delay}s`,
            "--scale": skill.scale,
          } as EffectStyle}
        >
          <span className="flora-skill__stem" />
          <span className="flora-skill__leaf" />
          <span className="flora-skill__label">{skill.label}</span>
        </span>
      ))}
      {FLORA_LEAVES.map((leaf, index) => (
        <span key={`leaf-${index}`} className="flora-leaf" style={{
          "--x": `${leaf.x}%`, "--y": `${leaf.y}%`, "--size": `${leaf.size}px`,
          "--delay": `${leaf.delay}s`, "--duration": `${leaf.duration}s`, "--rotation": `${leaf.rotation}deg`,
        } as EffectStyle} />
      ))}
      {FLORA_SPORES.map((spore, index) => (
        <span key={`spore-${index}`} className="flora-spore" style={{
          "--x": `${spore.x}%`, "--y": `${spore.y}%`, "--delay": `${spore.delay}s`, "--duration": `${spore.duration}s`,
        } as EffectStyle} />
      ))}
    </div>
  );
}

function TerraWorld() {
  return (
    <div className="world-effect world-effect--terra">
      <div className="terra-horizon" />
      <div className="terra-crack terra-crack--left" />
      <div className="terra-crack terra-crack--right" />
      {TERRA_ROCKS.map((rock, index) => (
        <span
          key={`rock-${index}`}
          className="terra-rock"
          style={{
            "--x": `${rock.x}%`,
            "--y": `${rock.y}%`,
            "--size": `${rock.size}px`,
            "--delay": `${rock.delay}s`,
            "--duration": `${rock.duration}s`,
            "--rotation": `${rock.rotation}deg`,
          } as EffectStyle}
        />
      ))}
      {TERRA_SKILLS.map((skill) => (
        <span
          key={skill.label}
          className={`terra-skill ${skill.x > 50 ? "terra-skill--right" : ""}`}
          style={{
            "--x": `${skill.x}%`,
            "--y": `${skill.y}%`,
            "--delay": `${skill.delay}s`,
            "--rotation": `${skill.rotation}deg`,
          } as EffectStyle}
        >
          <span className="terra-skill__stone" />
          <span className="terra-skill__label">{skill.label}</span>
        </span>
      ))}
    </div>
  );
}

function WaterWorld() {
  return (
    <div className="world-effect world-effect--water">
      <div className="water-caustics" />
      <div className="water-surface" />
      {WATER_DROPS.map((drop, index) => (
        <span
          key={`drop-${index}`}
          className="water-drop"
          style={{
            "--x": `${drop.x}%`,
            "--size": `${drop.size}px`,
            "--delay": `${drop.delay}s`,
            "--duration": `${drop.duration}s`,
            "--drift": `${drop.drift}px`,
          } as EffectStyle}
        />
      ))}
      {WATER_BUBBLES.map((bubble, index) => (
        <span
          key={`bubble-${index}`}
          className="water-bubble"
          style={{
            "--x": `${bubble.x}%`,
            "--size": `${bubble.size}px`,
            "--delay": `${bubble.delay}s`,
            "--duration": `${bubble.duration}s`,
            "--drift": `${bubble.drift}px`,
          } as EffectStyle}
        />
      ))}
      {WATER_SKILLS.map((skill) => (
        <span
          key={skill.label}
          className={`water-skill ${skill.x > 55 ? "water-skill--right" : ""}`}
          style={{
            "--x": `${skill.x}%`,
            "--delay": `${skill.delay}s`,
            "--duration": `${skill.duration}s`,
            "--drift": `${skill.drift}px`,
          } as EffectStyle}
        >
          <span className="water-skill__drop" />
          <span className="water-skill__label">{skill.label}</span>
        </span>
      ))}
    </div>
  );
}

function NovaWorld() {
  return (
    <div className="world-effect world-effect--nova">
      <div className="nova-aurora" />
      <div className="nova-aurora nova-aurora--low" />
      {NOVA_STARS.map((star, index) => (
        <span
          key={`star-${index}`}
          className="nova-star"
          style={{
            "--x": `${star.x}%`,
            "--y": `${star.y}%`,
            "--size": `${star.size}px`,
            "--glow": `${star.glow}px`,
            "--delay": `${star.delay}s`,
            "--duration": `${star.duration}s`,
          } as EffectStyle}
        />
      ))}
      {NOVA_SHARDS.map((shard, index) => (
        <span
          key={`shard-${index}`}
          className="nova-shard"
          style={{
            "--x": `${shard.x}%`,
            "--y": `${shard.y}%`,
            "--size": `${shard.size}px`,
            "--angle": `${shard.angle}deg`,
            "--delay": `${shard.delay}s`,
            "--duration": `${shard.duration}s`,
          } as EffectStyle}
        />
      ))}
    </div>
  );
}

export default function WorldEffects() {
  return (
    <div className="world-effects" aria-hidden>
      <FireWorld />
      <StormWorld />
      <IceWorld />
      <FloraWorld />
      <TerraWorld />
      <WaterWorld />
      <NovaWorld />
    </div>
  );
}
