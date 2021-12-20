import esbuild from 'esbuild'

const mode = process.env.NODE_ENV || 'production';
const COMMIT=process.env.COMMIT||process.env.RELEASE
console.log({ mode,COMMIT });
esbuild
  .build({
    entryPoints: ['src/index.ts'],
    bundle: true,
    outfile: 'dist/worker.js',
    sourcemap: 'inline',

    minify: mode === 'production',
    define:{
      TIMESTAMP:Date.now(),
      RELEASE:`"${COMMIT}"`
    }
  }) 
  .catch(() => process.exit(1));
