import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: "/", // Define la ruta base; cámbiala si usas subdominios.
  build: {
    outDir: "dist", // Asegúrate de que el directorio de salida sea 'dist', compatible con Vercel.
  },
  resolve: {
    alias: {
      "@assets": path.resolve(
        path.dirname(new URL(import.meta.url).pathname),
        "src/assets/"
      ),
      "@components": path.resolve(
        path.dirname(new URL(import.meta.url).pathname),
        "src/components/"
      ),
      "@hooks": path.resolve(
        path.dirname(new URL(import.meta.url).pathname),
        "src/hooks/"
      ),
      "@layouts": path.resolve(
        path.dirname(new URL(import.meta.url).pathname),
        "src/layouts/"
      ),
      "@pages": path.resolve(
        path.dirname(new URL(import.meta.url).pathname),
        "src/pages/"
      ),
      "@utils": path.resolve(
        path.dirname(new URL(import.meta.url).pathname),
        "src/utils/"
      ),
      "@middlewares": path.resolve(
        path.dirname(new URL(import.meta.url).pathname),
        "src/middlewares/"
      ),
    },
  },
});
