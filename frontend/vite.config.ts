import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";
import { prerenderMeta } from "./vite-plugins/prerender-meta";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    // Vite's default, and the localhost origin the form APIs allow (CORS in
    // infra/terraform/contact.tf and signup.tf).
    port: 5173,
  },
  plugins: [react(), mode === "development" && componentTagger(), prerenderMeta()].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
}));
