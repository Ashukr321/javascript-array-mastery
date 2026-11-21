"use client";

import { Command } from "cmdk";
import { FileText } from "lucide-react";
import { useRouter } from "next/navigation";
import type { Nav } from "@/lib/content";

// Every typed word must appear in the title/group/category. cmdk's default fuzzy
// match is too loose ("cors" would match "Web Security Overview").
export function matchAllWords(
    _value: string,
    search: string,
    keywords: string[] = [],
) {
    const hay = keywords.join(" ").toLowerCase();
    return search
        .toLowerCase()
        .split(/\s+/)
        .filter(Boolean)
        .every((w) => hay.includes(w))
        ? 1
        : 0;
}

export default function SearchPalette({
    nav,
    open,
    onOpenChange,
}: {
    nav: Nav;
    open: boolean;
    onOpenChange: (open: boolean) => void;
}) {
    const router = useRouter();
    return (
        <Command.Dialog
            open={open}
            onOpenChange={onOpenChange}
            label="Search topics"
            filter={matchAllWords}
            loop
        >
            <Command.Input placeholder="Search topics…" autoFocus />
            <Command.List>
                <Command.Empty>No topics found.</Command.Empty>
                {nav.map((cat) => (
                    <Command.Group key={cat.slug} heading={cat.title}>
                        {cat.docs.map((d) => (
                            <Command.Item
                                key={d.slug}
                                value={d.href}
                                keywords={[d.title, d.group ?? "", cat.title]}
                                onSelect={() => {
                                    onOpenChange(false);
                                    router.push(d.href);
                                }}
                            >
                                <span className="flex min-w-0 items-center gap-2">
                                    <FileText
                                        aria-hidden
                                        className="size-4 shrink-0 text-neutral-500"
                                    />
                                    <span className="truncate">{d.title}</span>
                                </span>
                                {d.group && (
                                    <span className="shrink-0 text-xs text-neutral-500">
                                        {d.group}
                                    </span>
                                )}
                            </Command.Item>
                        ))}
                    </Command.Group>
                ))}
            </Command.List>
        </Command.Dialog>
    );
}
