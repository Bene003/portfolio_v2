"use client";

import { useSyncExternalStore } from "react";

type DeviceTier = "lite" | "full";

interface PerformanceNavigator extends Navigator {
  deviceMemory?: number;
  connection?: { saveData?: boolean };
}

const noopSubscribe = () => () => {};

function readDeviceTier(): DeviceTier {
  const nav = navigator as PerformanceNavigator;
  const coarsePointer = window.matchMedia("(pointer: coarse)").matches;

  return nav.connection?.saveData ||
    (nav.deviceMemory !== undefined && nav.deviceMemory <= 4) ||
    (nav.hardwareConcurrency !== undefined && nav.hardwareConcurrency <= 4) ||
    coarsePointer
    ? "lite"
    : "full";
}

export function useDevicePerformance(): DeviceTier {
  return useSyncExternalStore(noopSubscribe, readDeviceTier, () => "lite");
}
