"use client";

import Link from "next/link";
import { Moon, PanelLeft, Search, Sun, X } from "lucide-react";
import { useEffect, useState } from "react";
import type { Nav } from "@/lib/content";
import { SITE } from "@/lib/site";
import { useIsDark, useIsDesktop, useModKey } from "./hooks";
import SearchPalette from "./SearchPalette";
import Sidebar from "./Sidebar";

type SetOpen = React.Dispatch<React.SetStateAction<boolean>>;
const toggleFor = (setDesktop: SetOpen, setMobile: SetOpen) => () =>
    (window.matchMedia("(min-width: 1024px)").matches ? setDesktop : setMobile)(
        (o) => !o,
    );

const isTyping = (t: EventTarget | null) =>
    t instanceof HTMLElement &&
    (t.isContentEditable ||
        ["INPUT", "TEXTAREA", "SELECT"].includes(t.tagName));

export function Logo({ className = "size-6" }: { className?: string }) {
    return (
        // eslint-disable-next-line @next/next/no-img-element
        <img
            src="/icon.svg"
            alt=""
            width={24}
            height={24}
            className={className}
        />
    );
}

export default function DocsShell({
    nav,
    children,
}: {
    nav: Nav;
    children: React.ReactNode;
}) {
    const [desktopOpen, setDesktopOpen] = useState(true);
    const [mobileOpen, setMobileOpen] = useState(false);
    const [searchOpen, setSearchOpen] = useState(false);
    const isDesktop = useIsDesktop();
    const isDark = useIsDark();
    const mod = useModKey();
    const toggleSidebar = toggleFor(setDesktopOpen, setMobileOpen);

    useEffect(() => {
        const toggleSidebar = toggleFor(setDesktopOpen, setMobileOpen);
        const onKey = (e: KeyboardEvent) => {
            const mod = e.ctrlKey || e.metaKey;
            if (mod && e.code === "KeyK") {
                e.preventDefault();
                setSearchOpen(true);
            } else if (mod && e.code === "KeyB") {
                e.preventDefault();
                toggleSidebar();
            } else if (
                !mod &&
                !e.altKey &&
                e.code === "Slash" &&
                !isTyping(e.target)
            ) {
                e.preventDefault();
                if (e.shiftKey) toggleSidebar();
                else setSearchOpen(true);
            } else if (e.key === "Escape") {
                setMobileOpen(false);
            }
        };
        window.addEventListener("keydown", onKey);
        return () => window.removeEventListener("keydown", onKey);
    }, []);

    const toggleTheme = () => {
        const dark = document.documentElement.classList.toggle("dark");
        try {
            localStorage.setItem("theme", dark ? "dark" : "light");
        } catch {}
    };

    const sidebarHidden = isDesktop ? !desktopOpen : !mobileOpen;
    const iconBtn =
        "inline-flex size-9 items-center justify-center rounded-md text-neutral-600 hover:bg-neutral-100 hover:text-neutral-900 dark:text-neutral-400 dark:hover:bg-neutral-800 dark:hover:text-neutral-100";

    return (
        <div className="flex min-h-dvh">
            <div
                aria-hidden
                onClick={() => setMobileOpen(false)}
                className={`fixed inset-0 z-40 bg-black/60 transition-opacity duration-300 lg:hidden ${
                    mobileOpen ? "opacity-100" : "pointer-events-none opacity-0"
                }`}
            />
            <aside
                id="sidebar"
                aria-label="Sidebar"
                inert={sidebarHidden}
                className={`fixed inset-y-0 left-0 z-50 overflow-hidden bg-neutral-50 transition-[translate,visibility] duration-300 ease-out lg:sticky lg:top-0 lg:z-auto lg:h-dvh lg:shrink-0 lg:translate-x-0 lg:transition-[width,visibility] dark:bg-neutral-900 ${
                    mobileOpen
                        ? "translate-x-0"
                        : "-translate-x-full max-lg:invisible"
                } ${desktopOpen ? "lg:w-64" : "lg:invisible lg:w-0"}`}
            >
                <div className="flex h-full w-72 flex-col border-r border-neutral-200 lg:w-64 dark:border-neutral-800">
                    <div className="flex h-14 shrink-0 items-center justify-between border-b border-neutral-200 px-4 dark:border-neutral-800">
                        <Link
                            href="/"
                            onClick={() => setMobileOpen(false)}
                            className="flex items-center gap-2 font-semibold"
                        >
                            <Logo />
                            <span className="truncate">{SITE.name}</span>
                        </Link>
                        <button
                            type="button"
                            onClick={() => setMobileOpen(false)}
                            className={`${iconBtn} lg:hidden`}
                            aria-label="Close sidebar"
                        >
                            <X className="size-5" />
                        </button>
                    </div>
                    <Sidebar
                        nav={nav}
                        onNavigate={() => setMobileOpen(false)}
                    />
                </div>
            </aside>

            <div className="flex min-w-0 flex-1 flex-col">
                <header className="sticky top-0 z-30 flex h-14 items-center gap-2 border-b border-neutral-200 bg-white/80 px-3 backdrop-blur sm:px-4 dark:border-neutral-800 dark:bg-neutral-950/80">
                    <button
                        type="button"
                        onClick={toggleSidebar}
                        className={iconBtn}
                        aria-label="Toggle sidebar"
                        aria-controls="sidebar"
                        aria-expanded={!sidebarHidden}
                        title={`Toggle sidebar (${mod} B)`}
                    >
                        <PanelLeft className="size-5" />
                    </button>
                    <button
                        type="button"
                        onClick={() => setSearchOpen(true)}
                        className="ml-auto flex h-9 min-w-0 flex-1 items-center gap-2 rounded-md border border-neutral-200 bg-neutral-50 px-3 text-sm text-neutral-500 hover:border-neutral-300 sm:max-w-xs dark:border-neutral-800 dark:bg-neutral-900 dark:hover:border-neutral-700"
                    >
                        <Search aria-hidden className="size-4 shrink-0" />
                        <span className="truncate">Search topics…</span>
                        <kbd className="ml-auto hidden shrink-0 rounded border border-neutral-300 px-1.5 font-mono text-[0.7rem] sm:inline dark:border-neutral-700">
                            {mod} K
                        </kbd>
                    </button>
                    <button
                        type="button"
                        onClick={toggleTheme}
                        className={iconBtn}
                        aria-label="Toggle theme"
                    >
                        {isDark ? (
                            <Sun className="size-5" />
                        ) : (
                            <Moon className="size-5" />
                        )}
                    </button>
                </header>
                <main className="flex-1">{children}</main>
            </div>

            <SearchPalette
                nav={nav}
                open={searchOpen}
                onOpenChange={setSearchOpen}
            />
        </div>
    );
}
