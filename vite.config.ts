// import { defineConfig } from "vite";
// import react from "@vitejs/plugin-react";
// import { resolve } from "path";
// import { viteStaticCopy } from "vite-plugin-static-copy";

// export default defineConfig({
//   plugins: [
//     react(),
//     viteStaticCopy({
//       targets: [
//         {
//           src: "public/icons/*",
//           dest: "icons",
//         },
//       ],
//     }),
//   ],
//   build: {
//     rollupOptions: {
//       input: {
//         popup: resolve(__dirname, "src/popup/index.html"),
//         options: resolve(__dirname, "src/options/index.html"),
//         background: resolve(__dirname, "src/background/index.ts"),
//         content: resolve(__dirname, "src/content/index.ts"),
//       },
//       output: {
//         entryFileNames: "[name]/index.js",
//         chunkFileNames: "chunks/[name]-[hash].js",
//         assetFileNames: "[name]-[hash][extname]",
//       },
//     },
//     outDir: "dist",
//     emptyOutDir: true,
//   },
// });
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { viteStaticCopy } from "vite-plugin-static-copy";
import { resolve } from "path";

export default defineConfig({
  plugins: [
    react(),
    viteStaticCopy({
      targets: [
        {
          src: "public/icons/*",
          dest: "icons",
        },
        {
          src: "public/manifest.json",
          dest: ".",
        },
      ],
    }),
  ],
  build: {
    outDir: "dist",
    emptyOutDir: true,
    rollupOptions: {
      input: {
        popup: resolve(__dirname, "src/popup/index.html"),
        options: resolve(__dirname, "src/options/index.html"),
        background: resolve(__dirname, "src/background/index.ts"),
        content: resolve(__dirname, "src/content/index.ts"),
      },
      output: {
        entryFileNames: (chunk) => {
          return chunk.name === "background" || chunk.name === "content"
            ? "[name]/index.js"
            : "assets/[name]-[hash].js";
        },
      },
    },
  },
  // resolve: {
  //   alias: {
  //     '@': resolve(__dirname, 'src')
  //   }
  // }
});
