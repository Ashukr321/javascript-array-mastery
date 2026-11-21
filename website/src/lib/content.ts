import fs from "node:fs";
import path from "node:path";

// Notes live at the repo root, one level above `website/`. Every page is
// prerendered, so these reads only happen at build time.
export const IMAGE_EXTS = ["svg", "png", "jpg", "jpeg", "webp", "gif"];
export const ASSET_EXTS = [...IMAGE_EXTS, "html"];
export const SKIP_DIRS = new Set([
    "website",
    "node_modules",
    ".git",
    ".claude",
    ".next",
    ".vercel",
]);
/** Repo-relative image paths that are unrelated to the notes. Empty: every image belongs somewhere. */
export const IGNORED_IMAGES: string[] = [];
/** Category folders left off the site (the notes stay in the repo). */
export const EXCLUDED_CATEGORIES = ["05-practice-patterns"];

const ACRONYMS = new Set([
    "api",
    "apis",
    "json",
    "dom",
    "ui",
    "js",
    "html",
    "css",
    "url",
    "xss",
    "csrf",
    "cors",
    "http",
    "seo",
]);

export type Doc = {
    slug: string;
    href: string;
    title: string;
    description: string;
    categorySlug: string;
    category: string;
    group?: string;
    body: string;
    /** Repo-relative folder of the source file; relative links resolve from here. */
    dir: string;
    /** Repo-relative path of the .md file; undefined for image-only folder pages. */
    file?: string;
    /** Auto-placed images (repo-relative) that the body does not already link. */
    images: string[];
    /** Repo-relative .html visualizations shown in an iframe. */
    visualizations: string[];
};

export type Category = { slug: string; title: string; docs: Doc[] };

export type Content = {
    root: string;
    categories: Category[];
    docs: Doc[];
    /** Every servable asset (repo-relative, posix). */
    assets: string[];
    /** Every image that should appear somewhere (assets minus IGNORED_IMAGES). */
    allImages: string[];
};

const ext = (p: string) => path.extname(p).slice(1).toLowerCase();
const isReadme = (name: string) => name.toLowerCase() === "readme.md";
const toPosix = (p: string) => p.split(path.sep).join("/");
const stripNumber = (name: string) => name.replace(/^\d+[-_.\s]*/, "");

export function slugify(name: string) {
    return stripNumber(name.replace(/\.md$/i, ""))
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-+|-+$/g, "");
}

export function humanize(name: string) {
    return stripNumber(name.replace(/\.[a-z]+$/i, ""))
        .split(/[-_\s]+/)
        .filter(Boolean)
        .map((w) =>
            ACRONYMS.has(w.toLowerCase())
                ? w.toUpperCase()
                : w[0].toUpperCase() + w.slice(1),
        )
        .join(" ");
}

function cleanTitle(h1: string) {
    const t = h1
        .replace(/[`*_]/g, "")
        .replace(/[\s:;]+$/, "")
        .trim();
    // Slug-style headings ("array-chaining", "08-code-examples") read better humanized.
    return /^[\w-]+$/.test(t) && t.includes("-") ? humanize(t) : t;
}

function describe(body: string) {
    let inFence = false;
    for (const block of body.split(/\n\s*\n/)) {
        const lines = block.trim().split("\n");
        for (const line of lines)
            if (/^\s*(```|~~~)/.test(line)) inFence = !inFence;
        const text = block.trim();
        if (!text || inFence || /^(```|~~~|#|\||!\[|<|-{3,}|>)/.test(text))
            continue;
        const plain = text
            .replace(/!\[[^\]]*\]\([^)]*\)/g, "")
            .replace(/\[([^\]]*)\]\([^)]*\)/g, "$1")
            .replace(/<[^>]+>/g, "")
            .replace(/[`*_>#]/g, "")
            .replace(/^\s*[-+]\s+/gm, "")
            .replace(/\s+/g, " ")
            .replace(/^[\s:/-]+/, "")
            .trim();
        if (plain.length < 3) continue;
        return plain.length > 160
            ? plain.slice(0, 157).replace(/\s+\S*$/, "") + "…"
            : plain;
    }
    return "";
}

/** Resolve a link/src written in a note to a repo-relative posix path, or null if external/outside the repo. */
export function resolveRef(ref: string, fromDir: string): string | null {
    const raw = ref.trim().replace(/^<|>$/g, "");
    if (
        !raw ||
        /^[a-z][a-z0-9+.-]*:/i.test(raw) ||
        raw.startsWith("//") ||
        raw.startsWith("#")
    )
        return null;
    let clean = raw.split(/[?#]/)[0].replace(/\\/g, "/");
    try {
        clean = decodeURIComponent(clean);
    } catch {
        /* keep as written */
    }
    const joined = clean.startsWith("/")
        ? clean.slice(1)
        : path.posix.join(fromDir || ".", clean);
    const norm = path.posix.normalize(joined).replace(/\/$/, "");
    if (norm.startsWith("..") || norm === ".") return null;
    return norm;
}

const IMG_MD = /!\[[^\]]*\]\(\s*<?((?:[^()\s<>]|\([^()\s]*\))+)>?/g;
const IMG_HTML = /<img\b[^>]*?\bsrc\s*=\s*["']([^"']+)["']/gi;

export function imageRefs(body: string, fromDir: string) {
    const out = new Set<string>();
    for (const re of [IMG_MD, IMG_HTML])
        for (const m of body.matchAll(re)) {
            const r = resolveRef(m[1], fromDir);
            if (r && IMAGE_EXTS.includes(ext(r))) out.add(r);
        }
    return out;
}

const words = (s: string) =>
    s
        .toLowerCase()
        .split(/[^a-z0-9]+/)
        .filter(Boolean);

export function loadContent(root: string): Content {
    const rel = (abs: string) =>
        toPosix(path.relative(/*turbopackIgnore: true*/ root, abs));
    const list = (dir: string) =>
        fs
            .readdirSync(/*turbopackIgnore: true*/ dir, { withFileTypes: true })
            .filter((e) => !e.name.startsWith(".") && !SKIP_DIRS.has(e.name))
            .sort((a, b) =>
                a.name.localeCompare(b.name, "en", { numeric: true }),
            );
    const read = (repoPath: string) =>
        fs.readFileSync(
            /*turbopackIgnore: true*/ path.join(
                /*turbopackIgnore: true*/ root,
                repoPath,
            ),
            "utf8",
        );

    // All servable assets anywhere in the repo.
    const assets: string[] = [];
    const scan = (dir: string) => {
        for (const e of list(dir)) {
            const abs = path.join(/*turbopackIgnore: true*/ dir, e.name);
            if (e.isDirectory()) scan(abs);
            else if (ASSET_EXTS.includes(ext(e.name))) assets.push(rel(abs));
        }
    };
    scan(root);
    const allImages = assets.filter(
        (a) => IMAGE_EXTS.includes(ext(a)) && !IGNORED_IMAGES.includes(a),
    );

    const hasMd = (dir: string): boolean =>
        list(dir).some((e) =>
            e.isDirectory()
                ? hasMd(path.join(/*turbopackIgnore: true*/ dir, e.name))
                : e.name.toLowerCase().endsWith(".md"),
        );
    const hasImages = (dir: string) =>
        list(dir).some((e) => e.isFile() && IMAGE_EXTS.includes(ext(e.name)));
    const isLeaf = (dir: string) =>
        !list(dir).some(
            (e) =>
                e.isDirectory() &&
                (hasMd(path.join(/*turbopackIgnore: true*/ dir, e.name)) ||
                    hasImages(
                        path.join(/*turbopackIgnore: true*/ dir, e.name),
                    )),
        );

    const makeDoc = (
        file: string | undefined,
        dir: string,
        slug: string,
        cat: Category,
        group: string | undefined,
    ): Doc => {
        const raw = file ? read(file).replace(/^﻿/, "") : "";
        const folderName = humanize(path.posix.basename(dir));
        const base = file ? path.posix.basename(file) : "";
        const fallback =
            !file || isReadme(base) || base.toLowerCase() === "concept.md"
                ? folderName
                : humanize(base.replace(/\.md$/i, ""));
        let title = fallback;
        let body = raw;
        const h1 = raw.match(/^#[ \t]+(.+?)[ \t#]*$/m);
        if (
            h1 &&
            cleanTitle(h1[1]).length > 0 &&
            cleanTitle(h1[1]).length <= 60
        ) {
            title = cleanTitle(h1[1]);
            body = raw.replace(h1[0], "").replace(/^\s+/, "");
        }
        if (title.toLowerCase() === "concept") title = folderName;
        return {
            slug,
            href: `/docs/${slug}`,
            title,
            description: describe(body) || `${title} — ${cat.title} notes.`,
            categorySlug: cat.slug,
            category: cat.title,
            group,
            body,
            dir,
            file,
            images: [],
            visualizations: [],
        };
    };

    const categories: Category[] = [];
    const walk = (
        abs: string,
        slugBase: string,
        cat: Category,
        group: string | undefined,
    ) => {
        const entries = list(abs);
        const dir = rel(abs);
        const md = entries.filter(
            (e) => e.isFile() && e.name.toLowerCase().endsWith(".md"),
        );
        md.sort((a, b) => Number(isReadme(b.name)) - Number(isReadme(a.name)));
        for (const f of md) {
            const slug = isReadme(f.name)
                ? slugBase
                : `${slugBase}/${slugify(f.name)}`;
            cat.docs.push(
                makeDoc(path.posix.join(dir, f.name), dir, slug, cat, group),
            );
        }
        if (!md.length && hasImages(abs))
            cat.docs.push(makeDoc(undefined, dir, slugBase, cat, group));
        for (const d of entries.filter((e) => e.isDirectory())) {
            const sub = path.join(/*turbopackIgnore: true*/ abs, d.name);
            if (
                !hasMd(sub) &&
                !hasImages(sub) &&
                !list(sub).some((e) => e.isDirectory())
            )
                continue;
            // A sub-folder with its own sub-topics becomes a sidebar group; a single-topic folder is just a doc.
            walk(
                sub,
                `${slugBase}/${slugify(d.name)}`,
                cat,
                isLeaf(sub) ? group : (group ?? humanize(d.name)),
            );
        }
    };

    for (const e of list(root).filter(
        (e) =>
            e.isDirectory() &&
            /^\d+[-_]/.test(e.name) &&
            !EXCLUDED_CATEGORIES.includes(e.name),
    )) {
        const cat: Category = {
            slug: slugify(e.name),
            title: humanize(e.name),
            docs: [],
        };
        walk(
            path.join(/*turbopackIgnore: true*/ root, e.name),
            cat.slug,
            cat,
            undefined,
        );
        if (cat.docs.length) categories.push(cat);
    }

    // Root README → "Overview" page at the top of the first category.
    const rootReadme = list(root).find((e) => e.isFile() && isReadme(e.name));
    if (rootReadme && categories.length) {
        const cat = categories[0];
        const doc = makeDoc(
            rootReadme.name,
            "",
            `${cat.slug}/overview`,
            cat,
            undefined,
        );
        cat.docs.unshift({ ...doc, title: "Overview" });
    }

    const docs = categories.flatMap((c) => c.docs);

    // --- Image placement ---------------------------------------------------
    const linked = new Map<string, Doc[]>();
    for (const d of docs)
        for (const img of imageRefs(d.body, d.dir))
            linked.set(img, [...(linked.get(img) ?? []), d]);

    const nearestDoc = (dir: string): Doc | undefined => {
        for (let cur = dir; ; cur = path.posix.dirname(cur)) {
            const here = docs.filter((d) => d.dir === (cur === "." ? "" : cur));
            const found =
                here.find(
                    (d) => d.file && isReadme(path.posix.basename(d.file)),
                ) ?? here[0];
            if (found) return found;
            if (cur === "." || cur === "") return undefined;
        }
    };
    const place = (d: Doc | undefined, img: string) => {
        if (d && !imageRefs(d.body, d.dir).has(img) && !d.images.includes(img))
            d.images.push(img);
    };

    for (const img of allImages) {
        const imgDir =
            path.posix.dirname(img) === "." ? "" : path.posix.dirname(img);
        const imgWords = words(
            path.posix.basename(img).replace(/\.[^.]+$/, ""),
        );
        // Name match: `validation.svg` → `validation-vs-sanitization.md`.
        for (const d of docs) {
            const name =
                d.file && !isReadme(path.posix.basename(d.file))
                    ? path.posix.basename(d.file)
                    : path.posix.basename(d.dir);
            const nameWords = words(name);
            if (imgWords.length && imgWords.every((w) => nameWords.includes(w)))
                place(d, img);
        }
        // Unlinked, or only linked from a note outside its own folder (e.g. the root README
        // showing a topic's screenshot): also show it on the nearest doc in its folder.
        const linkers = linked.get(img) ?? [];
        if (!linkers.some((d) => d.dir === imgDir))
            place(nearestDoc(imgDir), img);
    }

    // HTML visualizations next to a README.
    for (const html of assets.filter((a) => ext(a) === "html")) {
        const dir =
            path.posix.dirname(html) === "." ? "" : path.posix.dirname(html);
        const d = docs.find(
            (x) =>
                x.dir === dir &&
                x.file &&
                isReadme(path.posix.basename(x.file)),
        );
        d?.visualizations.push(html);
    }

    return { root, categories, docs, assets, allImages };
}

let cache: Content | undefined;
let loadedAt = 0;
export function getContent() {
    // In dev, re-read at most once a second so README edits show on refresh without a restart.
    const stale =
        process.env.NODE_ENV !== "production" && Date.now() - loadedAt > 1000;
    if (!cache || stale) {
        cache = loadContent(
            process.env.CONTENT_DIR ??
                path.join(/*turbopackIgnore: true*/ process.cwd(), ".."),
        );
        loadedAt = Date.now();
    }
    return cache;
}

export const getDoc = (slug: string) =>
    getContent().docs.find((d) => d.slug === slug);

/** Map a repo path to the public asset URL. */
export const assetUrl = (repoPath: string) =>
    "/content/" + repoPath.split("/").map(encodeURIComponent).join("/");

/** Rewrite a link inside a note: doc URL, asset URL, external as-is, or null (render as plain text). */
export function resolveLink(href: string, fromDir: string): string | null {
    if (/^([a-z][a-z0-9+.-]*:|\/\/|#)/i.test(href.trim())) return href;
    const target = resolveRef(href, fromDir);
    if (!target) return null;
    const { docs, assets } = getContent();
    const hash = href.includes("#") ? href.slice(href.indexOf("#")) : "";
    const doc =
        docs.find((d) => d.file === target) ??
        docs.find(
            (d) =>
                d.file &&
                d.dir === target &&
                isReadme(path.posix.basename(d.file)),
        ) ??
        docs.find((d) => !d.file && d.dir === target);
    if (doc) return doc.href + hash;
    if (assets.includes(target)) return assetUrl(target);
    return null;
}

/** Ordered, body-free navigation tree for client components. */
export function getNav() {
    return getContent().categories.map((c) => ({
        slug: c.slug,
        title: c.title,
        docs: c.docs.map((d) => ({
            slug: d.slug,
            href: d.href,
            title: d.title,
            group: d.group,
        })),
    }));
}
export type Nav = ReturnType<typeof getNav>;
