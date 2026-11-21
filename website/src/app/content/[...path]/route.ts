import fs from "node:fs";
import path from "node:path";
import { getContent } from "@/lib/content";

// Only files listed here are servable; anything else (website/package.json, ../README.md) is a 404.
export const dynamic = "force-static";
export const dynamicParams = false;

export function generateStaticParams() {
    return getContent().assets.map((a) => ({ path: a.split("/") }));
}

const TYPES: Record<string, string> = {
    svg: "image/svg+xml",
    png: "image/png",
    jpg: "image/jpeg",
    jpeg: "image/jpeg",
    webp: "image/webp",
    gif: "image/gif",
    html: "text/html; charset=utf-8",
};

export async function GET(
    _req: Request,
    { params }: { params: Promise<{ path: string[] }> },
) {
    const { root, assets } = getContent();
    const segs = (await params).path;
    const decode = (s: string) => {
        try {
            return decodeURIComponent(s);
        } catch {
            return s;
        }
    };
    // Params may arrive encoded or decoded depending on the Next version; accept either form.
    const repoPath = [segs.join("/"), segs.map(decode).join("/")].find((p) =>
        assets.includes(p),
    );
    if (!repoPath) return new Response("Not found", { status: 404 });
    const file = fs.readFileSync(
        /*turbopackIgnore: true*/ path.join(
            /*turbopackIgnore: true*/ root,
            repoPath,
        ),
    );
    return new Response(file, {
        headers: {
            "Content-Type":
                TYPES[path.extname(repoPath).slice(1).toLowerCase()],
            "Cache-Control": "public, max-age=3600",
        },
    });
}
