import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: "/", // Define the base URL for your app.
  build: {
    outDir: "dist", // Ensure the build output directory is set.
  },
  resolve: {
    alias: {
      "@assets": path.resolve(__dirname, "src/assets/"),
      "@components": path.resolve(__dirname, "src/components/"),
      "@hooks": path.resolve(__dirname, "src/hooks/"),
      "@layouts": path.resolve(__dirname, "src/layouts/"),
      "@pages": path.resolve(__dirname, "src/pages/"),
      "@utils": path.resolve(__dirname, "src/utils/"),
      "@middlewares": path.resolve(__dirname, "src/middlewares/"),
    },
    extensions: [".js", ".ts", ".jsx", ".tsx", ".json"], // Add extensions to avoid explicit extensions in imports.
  },
});
