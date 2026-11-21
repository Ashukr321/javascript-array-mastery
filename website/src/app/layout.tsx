import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Script from "next/script";
import SwRegister from "@/components/SwRegister";
import { SITE } from "@/lib/site";
import "./globals.css";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({
    variable: "--font-geist-mono",
    subsets: ["latin"],
});

export const metadata: Metadata = {
    metadataBase: new URL(SITE.url),
    title: { default: SITE.name, template: `%s | ${SITE.name}` },
    description: SITE.description,
    keywords: SITE.keywords,
    applicationName: SITE.name,
    openGraph: {
        type: "website",
        siteName: SITE.name,
        title: SITE.name,
        description: SITE.description,
        url: "/",
    },
    twitter: {
        card: "summary",
        title: SITE.name,
        description: SITE.description,
    },
    appleWebApp: {
        capable: true,
        statusBarStyle: "black-translucent",
        title: SITE.shortName,
    },
};

export const viewport: Viewport = {
    themeColor: [
        { media: "(prefers-color-scheme: light)", color: "#ffffff" },
        { media: "(prefers-color-scheme: dark)", color: "#0a0a0a" },
    ],
};

// Dark by default; switch to light before first paint if the visitor chose it.
const themeScript = `try{if(localStorage.getItem("theme")==="light")document.documentElement.classList.remove("dark")}catch(e){}`;

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html
            lang="en"
            className={`dark ${geistSans.variable} ${geistMono.variable} antialiased`}
            suppressHydrationWarning
        >
            <body className="min-h-dvh font-sans">
                <Script id="theme" strategy="beforeInteractive">
                    {themeScript}
                </Script>
                {children}
                <SwRegister />
            </body>
        </html>
    );
}
