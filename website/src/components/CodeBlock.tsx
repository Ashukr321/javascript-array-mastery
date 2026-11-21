"use client";

import { Check, Copy } from "lucide-react";
import { useRef, useState, type ComponentProps } from "react";

/** A markdown <pre> with a copy-to-clipboard button. */
export default function CodeBlock(props: ComponentProps<"pre">) {
    const ref = useRef<HTMLPreElement>(null);
    const [copied, setCopied] = useState(false);

    async function copy() {
        try {
            await navigator.clipboard.writeText(ref.current?.innerText ?? "");
            setCopied(true);
            setTimeout(() => setCopied(false), 1500);
        } catch {
            // clipboard blocked (insecure origin / permissions): nothing to do
        }
    }

    return (
        <div className="group relative">
            <pre ref={ref} {...props} />
            <button
                type="button"
                onClick={copy}
                aria-label={copied ? "Copied" : "Copy code"}
                className="absolute top-2 right-2 rounded-md border border-white/10 bg-white/5 p-1.5 text-neutral-400 opacity-70 transition hover:bg-white/10 hover:text-white group-hover:opacity-100 focus-visible:opacity-100"
            >
                {copied ? <Check size={14} /> : <Copy size={14} />}
            </button>
        </div>
    );
}
