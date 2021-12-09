import esbuild from 'esbuild'

const mode = process.env.NODE_ENV || 'production';
const UNKNOWN=process.env.UNKNOWN
console.log({ mode,UNKNOWN });
esbuild
  .build({
    entryPoints: ['src/index.ts'],
    bundle: true,
    outfile: 'dist/worker.js',
    sourcemap: 'inline',

    minify: mode === 'production',
  }) 
  .catch(() => process.exit(1));
