"use client";

import {
  ArrowUpRight,
  CircleDot,
  Command,
  Download,
  Earth,
  Flame,
  Leaf,
  Mail,
  Search,
  Snowflake,
  Sparkles,
  SquareArrowOutUpRight,
  Waves,
  Zap,
} from "lucide-react";
import { AnimatePresence, m } from "motion/react";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";

import { useExplorer } from "@/hooks/useExplorer";
import { useScrollLock } from "@/hooks/useScrollLock";
import { useTheme } from "@/hooks/useTheme";
import { projects } from "@/lib/content/projects";
import { EASE_EXPO } from "@/lib/motion";
import { nav, site } from "@/lib/site";
import {
  SECRET_THEME,
  setTheme,
  THEME_LABELS,
  THEME_ORDER,
  toggleTheme,
  type Theme,
} from "@/lib/theme";
import { cn } from "@/lib/utils";

type Action = {
  id: string;
  label: string;
  hint: string;
  group: "Navigate" | "Case studies" | "Actions";
  icon: React.ComponentType<{ className?: string }>;
  run: () => void;
};

const THEME_ICONS = {
  fire: Flame,
  storm: Zap,
  ice: Snowflake,
  flora: Leaf,
  terra: Earth,
  water: Waves,
  nova: Sparkles,
} satisfies Record<Theme, typeof CircleDot>;

export default function CommandPalette() {
  const router = useRouter();
  const { theme } = useTheme();
  const { visited, unlocked } = useExplorer();
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [cursor, setCursor] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLUListElement>(null);

  useScrollLock(open);

  const close = useCallback(() => setOpen(false), []);

  const actions = useMemo<Action[]>(() => {
    const go = (href: string) => () => {
      setOpen(false);
      router.push(href);
    };

    const currentThemeIndex = THEME_ORDER.indexOf(theme);
    const nextTheme =
      THEME_ORDER[(currentThemeIndex + 1) % THEME_ORDER.length];

    return [
      ...nav.map((item) => ({
        id: `nav-${item.href}`,
        label: item.label,
        hint: "Jump to section",
        group: "Navigate" as const,
        icon: Search,
        run: go(item.href),
      })),
      {
        id: "nav-all-work",
        label: "All work",
        hint: "Case study index",
        group: "Navigate" as const,
        icon: Search,
        run: go("/work"),
      },
      ...projects.map((p) => ({
        id: `project-${p.slug}`,
        label: p.name,
        hint: p.tagline,
        group: "Case studies" as const,
        icon: ArrowUpRight,
        run: go(`/work/${p.slug}`),
      })),
      {
        id: "theme",
        label: `Travel to ${THEME_LABELS[nextTheme]} planet`,
        hint: `${THEME_LABELS[theme]} → ${THEME_LABELS[nextTheme]}`,
        group: "Actions" as const,
        icon: THEME_ICONS[nextTheme],
        run: () => {
          setOpen(false);
          window.requestAnimationFrame(() => {
            toggleTheme({
              x: window.innerWidth / 2,
              y: Math.min(window.innerHeight * 0.22, 180),
              source: "command",
            });
          });
        },
      },
      // Only reachable once every public world has been visited, so the
      // palette never spoils the secret planet.
      ...(unlocked && theme !== SECRET_THEME
        ? [
            {
              id: "secret-theme",
              label: `Travel to ${THEME_LABELS[SECRET_THEME]} planet`,
              hint: "Unlocked — all worlds visited",
              group: "Actions" as const,
              icon: Sparkles,
              run: () => {
                setOpen(false);
                window.requestAnimationFrame(() => {
                  setTheme(SECRET_THEME, {
                    x: window.innerWidth / 2,
                    y: Math.min(window.innerHeight * 0.22, 180),
                    source: "command",
                  });
                });
              },
            },
          ]
        : []),
      {
        id: "copy-email",
        label: "Copy email address",
        hint: site.email,
        group: "Actions" as const,
        icon: Mail,
        run: () => {
          setOpen(false);
          navigator.clipboard
            ?.writeText(site.email)
            .catch(() => window.open(`mailto:${site.email}`));
        },
      },
      {
        id: "resume",
        label: "Download résumé",
        hint: "PDF",
        group: "Actions" as const,
        icon: Download,
        run: () => {
          setOpen(false);
          window.open(site.resume, "_blank", "noopener,noreferrer");
        },
      },
      {
        id: "github",
        label: "Open GitHub",
        hint: "New tab",
        group: "Actions" as const,
        icon: SquareArrowOutUpRight,
        run: () => {
          setOpen(false);
          window.open(site.socials.github, "_blank", "noopener,noreferrer");
        },
      },
      {
        id: "linkedin",
        label: "Open LinkedIn",
        hint: "New tab",
        group: "Actions" as const,
        icon: SquareArrowOutUpRight,
        run: () => {
          setOpen(false);
          window.open(site.socials.linkedin, "_blank", "noopener,noreferrer");
        },
      },
    ];
  }, [router, theme, unlocked]);

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return actions;
    return actions.filter(
      (a) =>
        a.label.toLowerCase().includes(q) || a.hint.toLowerCase().includes(q),
    );
  }, [actions, query]);

  // Global shortcut.
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key.toLowerCase() === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((v) => !v);
      }
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, []);

  // Focus the input when the dialog opens, and keep the cursor in range.
  useEffect(() => {
    if (!open) return;
    inputRef.current?.focus();
  }, [open]);

  const active = Math.min(cursor, Math.max(results.length - 1, 0));

  const onInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Escape") {
      close();
      return;
    }
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setCursor((c) => (results.length ? (c + 1) % results.length : 0));
      return;
    }
    if (e.key === "ArrowUp") {
      e.preventDefault();
      setCursor((c) =>
        results.length ? (c - 1 + results.length) % results.length : 0,
      );
      return;
    }
    if (e.key === "Enter") {
      e.preventDefault();
      results[active]?.run();
    }
  };

  let lastGroup = "";

  return (
    <>
      {/* Desktop trigger — also the discoverability cue for the shortcut. */}
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-label="Open command palette"
        className="hidden min-h-11 items-center gap-2 rounded-pill border border-line px-4 font-mono text-[0.6875rem] tracking-[0.1em] text-muted transition-colors duration-300 hover-fine:border-accent/45 hover-fine:text-fg lg:inline-flex"
      >
        <Command aria-hidden className="size-3.5" />
        <span>K</span>
      </button>

      <AnimatePresence>
        {open && (
          <m.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[80] flex items-start justify-center bg-bg/70 px-4 pt-[12vh] backdrop-blur-md"
            onClick={close}
          >
            <m.div
              role="dialog"
              aria-modal="true"
              aria-label="Command palette"
              initial={{ opacity: 0, y: -12, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -8, scale: 0.99 }}
              transition={{ duration: 0.32, ease: EASE_EXPO }}
              onClick={(e) => e.stopPropagation()}
              className="glass w-full max-w-xl overflow-hidden p-0 shadow-lift"
            >
              <div className="flex items-center gap-3 border-b border-line/70 px-5">
                <Search aria-hidden className="size-4 shrink-0 text-muted" />
                <input
                  ref={inputRef}
                  value={query}
                  onChange={(e) => {
                    setQuery(e.target.value);
                    setCursor(0);
                  }}
                  onKeyDown={onInputKeyDown}
                  placeholder="Search sections, projects, actions…"
                  aria-label="Search"
                  className="min-h-14 w-full bg-transparent text-sm text-fg outline-none placeholder:text-muted"
                />
                <kbd className="hidden shrink-0 rounded border border-line px-1.5 py-0.5 font-mono text-[0.625rem] text-muted sm:block">
                  ESC
                </kbd>
              </div>

              <ul
                ref={listRef}
                className="max-h-[52vh] overflow-y-auto overscroll-contain p-2"
              >
                {results.length === 0 && (
                  <li className="px-4 py-8 text-center text-sm text-muted">
                    Nothing matches “{query}”.
                  </li>
                )}

                {results.map((action, i) => {
                  const showGroup = action.group !== lastGroup;
                  lastGroup = action.group;
                  const Icon = action.icon;

                  return (
                    <li key={action.id}>
                      {showGroup && (
                        <p className="eyebrow px-3 pt-4 pb-2">{action.group}</p>
                      )}
                      <button
                        type="button"
                        onClick={action.run}
                        onPointerMove={() => setCursor(i)}
                        aria-current={i === active ? "true" : undefined}
                        className={cn(
                          "flex w-full items-center gap-3 rounded-xl px-3 py-3 text-left transition-colors duration-150",
                          i === active
                            ? "bg-surface-2 text-fg"
                            : "text-muted hover-fine:bg-surface-2/60",
                        )}
                      >
                        <Icon
                          aria-hidden
                          className={cn(
                            "size-4 shrink-0",
                            i === active ? "text-accent-text" : "text-muted",
                          )}
                        />
                        <span className="min-w-0 flex-1 truncate text-sm">
                          {action.label}
                        </span>
                        <span className="hidden shrink-0 truncate font-mono text-[0.625rem] text-muted sm:block sm:max-w-[45%]">
                          {action.hint}
                        </span>
                      </button>
                    </li>
                  );
                })}
              </ul>

              <div className="flex items-center justify-between gap-3 border-t border-line/70 px-5 py-3">
                <span className="font-mono text-[0.625rem] tracking-[0.12em] text-muted">
                  ↑↓ to move · ↵ to select
                </span>
                <span
                  className={cn(
                    "font-mono text-[0.625rem] tracking-[0.12em]",
                    unlocked ? "text-accent-text" : "text-fg/35",
                  )}
                >
                  {unlocked
                    ? "07 PLANETS"
                    : `${visited.length}/${THEME_ORDER.length} EXPLORED`}
                </span>
              </div>
            </m.div>
          </m.div>
        )}
      </AnimatePresence>
    </>
  );
}
