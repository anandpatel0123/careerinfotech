import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// A relative base keeps every asset and the syllabus PDF working on any host,
// whether the site is deployed at a domain root or inside a sub-folder.
export default defineConfig({
  base: './',
  plugins: [react()],
});
