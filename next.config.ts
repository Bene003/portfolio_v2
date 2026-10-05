import type { NextConfig } from "next";

// eben.live est fermé : toute adresse renvoie vers la page « À propos »
// d'Hephera, dans la langue du navigateur (français si elle commence par
// « fr », anglais sinon). Les liens déjà partagés continuent de fonctionner.
const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: "/:path*",
        has: [{ type: "header", key: "accept-language", value: "fr.*" }],
        destination: "https://www.hephera.com/fr/a-propos",
        permanent: true,
      },
      {
        source: "/:path*",
        destination: "https://www.hephera.com/en/about",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
