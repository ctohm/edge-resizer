import esbuild from 'esbuild'

const mode = process.env.NODE_ENV || 'production';
const RELEASE=process.env.RELEASE
console.log({ mode,RELEASE });
esbuild
  .build({
    entryPoints: ['src/index.ts'],
    bundle: true,
    outfile: 'dist/worker.js',
    sourcemap: 'inline',

    minify: mode === 'production',
    define:{
      TIMESTAMP:Date.now(),
      RELEASE:`"${RELEASE}"`
    }
  }) 
  .catch(() => process.exit(1));
