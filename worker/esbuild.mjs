import esbuild from 'esbuild'

const mode = process.env.NODE_ENV || 'production';
const RELEASE=process.env.RELEASE
const ROUTE_PREFIX=process.env.ROUTE_PREFIX || "/"
console.log({ mode,RELEASE });
esbuild
  .build({
    entryPoints: ['src/index.ts'],
    bundle: true,
    outfile: 'dist/worker.js',
    sourcemap: 'inline',
format:'cjs',
    minify: mode === 'production',
    define:{
      TIMESTAMP:Date.now(),
      RELEASE:`"${RELEASE}"`,
      ROUTE_PREFIX:`"${ROUTE_PREFIX}"`
    }
  }) 
  .catch(() => process.exit(1));
