"use client";

import { useSyncExternalStore } from "react";

import {
  getExplorerSnapshot,
  getServerExplorerSnapshot,
  subscribeExplorer,
} from "@/lib/explorer";

export function useExplorer() {
  return useSyncExternalStore(
    subscribeExplorer,
    getExplorerSnapshot,
    getServerExplorerSnapshot,
  );
}
