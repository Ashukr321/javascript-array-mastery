import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    // Standalone only for Docker. On Vercel, Next 16's adapter doesn't write the
    // .nft.json the standalone step needs, so hard-coding it breaks the build.
    output: process.env.BUILD_STANDALONE === "true" ? "standalone" : undefined,

    // Pages without an icon <link> (the HTML demos opened full screen) still ask for /favicon.ico.
    async rewrites() {
        return [{ source: "/favicon.ico", destination: "/icon.svg" }];
    },

    async headers() {
        return [
            {
                source: "/(.*)",
                headers: [
                    { key: "X-DNS-Prefetch-Control", value: "on" },
                    { key: "X-Frame-Options", value: "SAMEORIGIN" },
                    { key: "X-Content-Type-Options", value: "nosniff" },
                    {
                        key: "Referrer-Policy",
                        value: "strict-origin-when-cross-origin",
                    },
                    {
                        key: "Permissions-Policy",
                        value: "camera=(), microphone=(), geolocation=(), browsing-topics=()",
                    },
                    {
                        key: "Strict-Transport-Security",
                        value: "max-age=63072000; includeSubDomains; preload",
                    },
                ],
            },
            {
                source: "/sw.js",
                headers: [
                    { key: "Cache-Control", value: "no-cache" },
                    {
                        key: "Content-Type",
                        value: "application/javascript; charset=utf-8",
                    },
                ],
            },
        ];
    },
};

export default nextConfig;
