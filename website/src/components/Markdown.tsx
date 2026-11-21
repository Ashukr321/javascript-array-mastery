import Link from "next/link";
import ReactMarkdown from "react-markdown";
import rehypeHighlight from "rehype-highlight";
import rehypeRaw from "rehype-raw";
import remarkGfm from "remark-gfm";
import CodeBlock from "@/components/CodeBlock";
import { assetUrl, getContent, resolveLink, resolveRef } from "@/lib/content";

/** Renders a note. `dir` is the note's repo-relative folder, used to resolve relative links/images. */
export default function Markdown({ body, dir }: { body: string; dir: string }) {
    const { assets } = getContent();
    return (
        <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            rehypePlugins={[rehypeRaw, rehypeHighlight]}
            components={{
                // eslint-disable-next-line @typescript-eslint/no-unused-vars -- drop the AST node so it isn't put on the DOM
                pre({ node, ...props }) {
                    return <CodeBlock {...props} />;
                },
                a({ href, children }) {
                    const to = href ? resolveLink(href, dir) : null;
                    if (!to) return <span>{children}</span>;
                    if (/^https?:/i.test(to))
                        return (
                            <a
                                href={to}
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                {children}
                            </a>
                        );
                    if (
                        to.startsWith("/content/") ||
                        to.startsWith("#") ||
                        /^[a-z]+:/i.test(to)
                    )
                        return <a href={to}>{children}</a>;
                    return <Link href={to}>{children}</Link>;
                },
                img({ src, alt }) {
                    if (typeof src !== "string") return null;
                    const local = resolveRef(src, dir);
                    const url = local
                        ? assets.includes(local)
                            ? assetUrl(local)
                            : null
                        : /^https?:/i.test(src)
                          ? src
                          : null;
                    if (!url) return null;
                    return (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img
                            src={url}
                            alt={alt ?? ""}
                            loading="lazy"
                            className="rounded-lg"
                        />
                    );
                },
                table({ children }) {
                    return (
                        <div className="overflow-x-auto">
                            <table>{children}</table>
                        </div>
                    );
                },
            }}
        >
            {body}
        </ReactMarkdown>
    );
}
