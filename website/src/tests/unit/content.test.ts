// @vitest-environment node
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { describe, expect, it } from "vitest";
import {
    getContent,
    getDoc,
    imageRefs,
    loadContent,
    resolveLink,
} from "@/lib/content";

const content = getContent();

describe("content loader (real notes)", () => {
    it("has unique, URL-safe slugs and a title for every doc", () => {
        const slugs = content.docs.map((d) => d.slug);
        expect(new Set(slugs).size).toBe(slugs.length);
        for (const d of content.docs) {
            expect(d.slug).toMatch(
                /^[a-z0-9]+(-[a-z0-9]+)*(\/[a-z0-9]+(-[a-z0-9]+)*)*$/,
            );
            expect(d.title.trim()).not.toBe("");
        }
    });

    it("maps a README to its folder URL and returns undefined for a missing doc", () => {
        const doc = content.docs.find(
            (d) => d.file === "01-basics/01-what-is-array/README.md",
        );
        expect(doc?.href).toBe("/docs/basics/what-is-array");
        expect(getDoc("basics/does-not-exist")).toBeUndefined();
    });

    it("leaves excluded categories off the site", () => {
        expect(content.categories.map((c) => c.slug)).not.toContain(
            "practice-patterns",
        );
    });

    it("has no doc titled Concept", () => {
        expect(
            content.docs.filter((d) => d.title.toLowerCase() === "concept"),
        ).toEqual([]);
    });

    it("shows every repo image on at least one page", () => {
        const shown = (img: string) =>
            content.docs.some(
                (d) =>
                    d.images.includes(img) || imageRefs(d.body, d.dir).has(img),
            );
        expect(content.allImages.length).toBeGreaterThan(0);
        expect(content.allImages.filter((img) => !shown(img))).toEqual([]);
    });

    it("renders links to missing notes as plain text", () => {
        expect(resolveLink("./nope.md", "01-basics")).toBeNull();
        expect(
            resolveLink(
                "../01-what-is-array/README.md",
                "01-basics/02-indexing",
            ),
        ).toBe("/docs/basics/what-is-array");
    });

    it("never serves files from website/, .git or .claude", () => {
        expect(
            content.assets.filter((a) => /^(website|\.git|\.claude)\//.test(a)),
        ).toEqual([]);
    });
});

describe("content loader (fixture)", () => {
    const root = fs.mkdtempSync(path.join(os.tmpdir(), "notes-"));
    const write = (p: string, s = "") => {
        fs.mkdirSync(path.dirname(path.join(root, p)), { recursive: true });
        fs.writeFileSync(path.join(root, p), s);
    };
    write("README.md", "# Repo\n\nHello.");
    write("01_Intro/README.md", "# Intro\n\nStart here.");
    write("01_Intro/validation-vs-escaping.md", "");
    write("01_Intro/validation.svg", "<svg/>");
    write("01_Intro/diagrams/flow.svg", "<svg/>");
    write("website/leak.png", "x");
    write(".claude/leak.png", "x");
    const c = loadContent(root);

    it("gives an image-only folder its own page", () => {
        const d = c.docs.find((x) => x.slug === "intro/diagrams");
        expect(d?.images).toEqual(["01_Intro/diagrams/flow.svg"]);
    });

    it("places images by file-name words and adds the Overview page", () => {
        expect(
            c.docs.find((x) => x.slug === "intro/validation-vs-escaping")
                ?.images,
        ).toContain("01_Intro/validation.svg");
        expect(c.docs[0]).toMatchObject({
            slug: "intro/overview",
            title: "Overview",
        });
    });

    it("skips website/ and .claude assets", () => {
        expect(c.assets.some((a) => a.includes("leak"))).toBe(false);
    });
});
