import esbuild from 'esbuild'

const mode = process.env.NODE_ENV || 'production';
const RELEASE=process.env.RELEASE
const ROUTE_PREFIX=process.env.ROUTE_PREFIX || '"/"'
const define={
  TIMESTAMP:Date.now(),
  RELEASE:`"${RELEASE}"`
  
}
console.log({ mode,RELEASE });
esbuild
  .build({
    entryPoints: ['src/index.ts'],
    bundle: true,
    outfile: 'dist/worker.js',
    sourcemap: 'inline',
format:'cjs',
    minify: mode === 'production',
    define
    
  }) 
  .then(()=>{
    console.log('built with',{define})
  })
  .catch((e) =>{
    console.warn(e.message)
     process.exit(1)
  });
