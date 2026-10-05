import { site } from "@/data/site";

export default function manifest() {
  return { name: site.name, short_name: site.shortName, description: site.description, start_url: "/", display: "standalone", background_color: "#0B0B0B", theme_color: "#0B0B0B", icons: [{ src: "/icon.svg", sizes: "any", type: "image/svg+xml" }] };
}
