import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { getContent } from "@/lib/content";
import { SITE } from "@/lib/site";

const PER_CARD = 6;

export default function Home() {
    const { categories, docs } = getContent();
    return (
        <div className="mx-auto max-w-6xl px-4 py-10 sm:px-8 sm:py-16">
            <p className="inline-flex rounded-full border border-neutral-200 px-3 py-1 text-xs font-medium text-neutral-600 dark:border-neutral-800 dark:text-neutral-400">
                {docs.length} topics · {categories.length} categories
            </p>
            <h1 className="mt-5 text-4xl font-bold tracking-tight sm:text-5xl">
                {SITE.name}
            </h1>
            <p className="mt-4 max-w-2xl text-lg text-neutral-600 dark:text-neutral-400">
                {SITE.description}
            </p>
            {docs[0] && (
                <Link
                    href={docs[0].href}
                    className="mt-6 inline-flex items-center gap-2 rounded-md bg-neutral-900 px-4 py-2 text-sm font-medium text-white hover:bg-neutral-700 dark:bg-white dark:text-neutral-900 dark:hover:bg-neutral-200"
                >
                    Start reading <ArrowRight aria-hidden className="size-4" />
                </Link>
            )}

            <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {categories.map((c) => (
                    <section
                        key={c.slug}
                        className="rounded-xl border border-neutral-200 bg-neutral-50 p-5 dark:border-neutral-800 dark:bg-neutral-900"
                    >
                        <h2 className="font-semibold">
                            <Link
                                href={c.docs[0].href}
                                className="hover:text-amber-600 dark:hover:text-amber-400"
                            >
                                {c.title}
                            </Link>
                        </h2>
                        <ul className="mt-3 space-y-1.5 text-sm">
                            {c.docs.slice(0, PER_CARD).map((d) => (
                                <li key={d.slug}>
                                    <Link
                                        href={d.href}
                                        className="text-neutral-600 hover:text-amber-600 dark:text-neutral-400 dark:hover:text-amber-400"
                                    >
                                        {d.title}
                                    </Link>
                                </li>
                            ))}
                            {c.docs.length > PER_CARD && (
                                <li className="text-neutral-500">
                                    +{c.docs.length - PER_CARD} more
                                </li>
                            )}
                        </ul>
                    </section>
                ))}
            </div>
        </div>
    );
}
