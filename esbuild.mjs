import esbuild from 'esbuild';
const mode = process.env.NODE_ENV || 'production';
console.log({ mode });
esbuild
  .build({
    entryPoints: ['src/index.ts'],
    bundle: true,
    outfile: 'dist/worker.js',
    sourcemap: 'inline',

    minify: mode === 'production',
  })
  .then(() => {
    return esbuild
      .build({
        entryPoints: ['src/ResizerRouter.ts'],
        bundle: true,
        outfile: 'dist/ResizerRouter.js',

        minify: false
      })
  })
  .catch(() => process.exit(1));
