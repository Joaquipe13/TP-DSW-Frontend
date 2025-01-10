import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/', // Define la ruta base; cámbiala si usas subdominios.
  build: {
    outDir: 'dist', // Asegúrate de que el directorio de salida sea 'dist', compatible con Vercel.
  },
});
