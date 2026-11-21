"use client";

import { useSyncExternalStore } from "react";

const noop = () => () => {};

/** "⌘" on Apple platforms, "Ctrl" elsewhere (and on the server). */
export function useModKey() {
    return useSyncExternalStore(
        noop,
        () =>
            /Mac|iPhone|iPad/.test(navigator.platform || navigator.userAgent)
                ? "⌘"
                : "Ctrl",
        () => "Ctrl",
    );
}

const DESKTOP = "(min-width: 1024px)";
export function useIsDesktop() {
    return useSyncExternalStore(
        (cb) => {
            const mq = window.matchMedia(DESKTOP);
            mq.addEventListener("change", cb);
            return () => mq.removeEventListener("change", cb);
        },
        () => window.matchMedia(DESKTOP).matches,
        () => true,
    );
}

export function useIsDark() {
    return useSyncExternalStore(
        (cb) => {
            const mo = new MutationObserver(cb);
            mo.observe(document.documentElement, {
                attributes: true,
                attributeFilter: ["class"],
            });
            return () => mo.disconnect();
        },
        () => document.documentElement.classList.contains("dark"),
        () => true,
    );
}
