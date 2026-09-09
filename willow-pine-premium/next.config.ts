import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* Every route on this site is static, so it can build to plain
     HTML/CSS/JS for a zero-server preview alongside the normal
     `next dev` / `next start` workflow. */
  output: "export",
};

export default nextConfig;
