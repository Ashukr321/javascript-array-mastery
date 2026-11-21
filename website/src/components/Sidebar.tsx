"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronRight } from "lucide-react";
import { useState } from "react";
import type { Nav } from "@/lib/content";

type Cat = Nav[number];

function CategoryItem({
    cat,
    pathname,
    onNavigate,
}: {
    cat: Cat;
    pathname: string;
    onNavigate: () => void;
}) {
    const isActive = cat.docs.some((d) => d.href === pathname);
    const [toggled, setToggled] = useState<boolean | null>(null);
    const open = toggled ?? isActive;
    const id = `cat-${cat.slug}`;

    return (
        <li className="border-b border-neutral-200 dark:border-neutral-800">
            <button
                type="button"
                onClick={() => setToggled(!open)}
                aria-expanded={open}
                aria-controls={id}
                className="flex w-full items-center justify-between px-4 py-2.5 text-left text-sm font-semibold text-neutral-800 hover:bg-neutral-100 dark:text-neutral-200 dark:hover:bg-neutral-800/60"
            >
                {cat.title}
                <ChevronRight
                    aria-hidden
                    className={`size-4 shrink-0 text-neutral-500 transition-transform duration-300 ${open ? "rotate-90" : ""}`}
                />
            </button>
            <div
                id={id}
                inert={!open}
                className={`grid transition-[grid-template-rows,opacity] duration-300 ease-out ${
                    open
                        ? "grid-rows-[1fr] opacity-100"
                        : "grid-rows-[0fr] opacity-0"
                }`}
            >
                {/* No padding on the grid item itself, or it never collapses to 0. */}
                <div className="min-h-0 overflow-hidden">
                    <ul className="pb-2">
                        {cat.docs.map((d, i) => (
                            <li key={d.slug}>
                                {d.group &&
                                    d.group !== cat.docs[i - 1]?.group && (
                                        <p className="px-4 pt-3 pb-1 text-[0.7rem] font-semibold tracking-wider text-neutral-500 uppercase">
                                            {d.group}
                                        </p>
                                    )}
                                <Link
                                    href={d.href}
                                    onClick={onNavigate}
                                    aria-current={
                                        d.href === pathname ? "page" : undefined
                                    }
                                    className={`mx-2 block rounded-md px-3 py-1.5 text-sm transition-colors ${
                                        d.href === pathname
                                            ? "bg-amber-500/15 font-medium text-amber-700 dark:text-amber-300"
                                            : "text-neutral-600 hover:bg-neutral-100 hover:text-neutral-900 dark:text-neutral-400 dark:hover:bg-neutral-800/60 dark:hover:text-neutral-100"
                                    }`}
                                >
                                    {d.title}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </li>
    );
}

export default function Sidebar({
    nav,
    onNavigate,
}: {
    nav: Nav;
    onNavigate: () => void;
}) {
    const pathname = usePathname();
    return (
        <nav
            aria-label="Topics"
            className="flex-1 overflow-y-auto overscroll-contain"
        >
            <ul>
                {nav.map((cat) => (
                    <CategoryItem
                        key={cat.slug}
                        cat={cat}
                        pathname={pathname}
                        onNavigate={onNavigate}
                    />
                ))}
            </ul>
        </nav>
    );
}
