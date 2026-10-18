import type { NextConfig } from "next";

// GitHub Pages serve o site em joaopedrov0.github.io/portfolio; o workflow de deploy
// define NEXT_PUBLIC_BASE_PATH=/portfolio. Localmente fica vazio e o site roda na raiz.
const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

const nextConfig: NextConfig = {
  output: "export",
  basePath,
  trailingSlash: true,
  images: {
    // A otimização padrão precisa de servidor, o que o export estático não tem
    unoptimized: true,
  },
};

export default nextConfig;
