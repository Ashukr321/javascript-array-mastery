import DocsShell from "@/components/DocsShell";
import { getNav } from "@/lib/content";

export default function DocsLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <DocsShell nav={getNav()}>{children}</DocsShell>;
}
