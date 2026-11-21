import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ChevronLeft, ChevronRight, ExternalLink } from "lucide-react";
import Markdown from "@/components/Markdown";
import { assetUrl, getContent, getDoc, humanize } from "@/lib/content";
import { SITE } from "@/lib/site";

type Props = { params: Promise<{ slug: string[] }> };

export const dynamicParams = false;

export function generateStaticParams() {
    return getContent().docs.map((d) => ({ slug: d.slug.split("/") }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const doc = getDoc((await params).slug.join("/"));
    if (!doc) return {};
    const title = `${doc.title} — ${doc.category}`;
    return {
        title,
        description: doc.description,
        alternates: { canonical: doc.href },
        openGraph: {
            type: "article",
            title,
            description: doc.description,
            url: doc.href,
            siteName: SITE.name,
        },
    };
}

export default async function DocPage({ params }: Props) {
    const slug = (await params).slug.join("/");
    const doc = getDoc(slug);
    if (!doc) notFound();
    const { docs, categories } = getContent();
    const i = docs.indexOf(doc);
    const prev = docs[i - 1];
    const next = docs[i + 1];
    const category = categories.find((c) => c.slug === doc.categorySlug)!;

    return (
        <article className="mx-auto max-w-5xl px-4 py-8 sm:px-6 lg:px-8">
            <nav
                aria-label="Breadcrumb"
                className="flex flex-wrap items-center gap-1 text-sm text-neutral-500"
            >
                <Link
                    href="/"
                    className="hover:text-neutral-900 dark:hover:text-neutral-100"
                >
                    {SITE.name}
                </Link>
                <ChevronRight aria-hidden className="size-3.5" />
                <Link
                    href={category.docs[0].href}
                    className="hover:text-neutral-900 dark:hover:text-neutral-100"
                >
                    {doc.category}
                </Link>
                {doc.group && (
                    <>
                        <ChevronRight aria-hidden className="size-3.5" />
                        <span>{doc.group}</span>
                    </>
                )}
                <ChevronRight aria-hidden className="size-3.5" />
                <span
                    aria-current="page"
                    className="text-neutral-900 dark:text-neutral-100"
                >
                    {doc.title}
                </span>
            </nav>

            <div className="prose prose-neutral dark:prose-invert prose-a:text-amber-700 prose-pre:overflow-x-auto dark:prose-a:text-amber-400 mt-4 max-w-none">
                <h1>{doc.title}</h1>
                {doc.body.trim() ? (
                    <Markdown body={doc.body} dir={doc.dir} />
                ) : (
                    doc.file && (
                        <p className="text-neutral-500 italic">
                            This topic is still being written.
                        </p>
                    )
                )}

                {doc.images.map((img) => (
                    <figure key={img}>
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                            src={assetUrl(img)}
                            alt={humanize(img.split("/").pop()!)}
                            loading="lazy"
                            className="rounded-lg"
                        />
                        <figcaption>
                            {humanize(img.split("/").pop()!)}
                        </figcaption>
                    </figure>
                ))}

                {doc.visualizations.map((html) => (
                    <figure key={html} className="not-prose my-6">
                        <iframe
                            src={assetUrl(html)}
                            sandbox="allow-scripts"
                            title={`${doc.title} demo`}
                            className="h-[32rem] w-full rounded-lg border border-neutral-200 bg-white dark:border-neutral-800"
                        />
                        <figcaption className="mt-2 text-sm">
                            <a
                                href={assetUrl(html)}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-1 text-amber-700 hover:underline dark:text-amber-400"
                            >
                                Open full screen{" "}
                                <ExternalLink
                                    aria-hidden
                                    className="size-3.5"
                                />
                            </a>
                        </figcaption>
                    </figure>
                ))}
            </div>

            <nav
                aria-label="Pagination"
                className="mt-12 grid gap-4 border-t border-neutral-200 pt-6 sm:grid-cols-2 dark:border-neutral-800"
            >
                {prev ? (
                    <Link
                        href={prev.href}
                        className="group rounded-lg border border-neutral-200 p-4 hover:border-amber-500 dark:border-neutral-800"
                    >
                        <span className="flex items-center gap-1 text-xs text-neutral-500">
                            <ChevronLeft aria-hidden className="size-3.5" />{" "}
                            Previous
                        </span>
                        <span className="mt-1 block font-medium group-hover:text-amber-700 dark:group-hover:text-amber-400">
                            {prev.title}
                        </span>
                    </Link>
                ) : (
                    <span />
                )}
                {next && (
                    <Link
                        href={next.href}
                        className="group rounded-lg border border-neutral-200 p-4 text-right hover:border-amber-500 dark:border-neutral-800"
                    >
                        <span className="flex items-center justify-end gap-1 text-xs text-neutral-500">
                            Next{" "}
                            <ChevronRight aria-hidden className="size-3.5" />
                        </span>
                        <span className="mt-1 block font-medium group-hover:text-amber-700 dark:group-hover:text-amber-400">
                            {next.title}
                        </span>
                    </Link>
                )}
            </nav>
        </article>
    );
}
