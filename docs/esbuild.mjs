import esbuild from 'esbuild'

const mode = process.env.NODE_ENV || 'production';
const RELEASE=process.env.RELEASE||process.env.CF_PAGES_COMMIT_SHA

const define={
  TIMESTAMP:Date.now(),
  RELEASE,
  
}
esbuild
  .build({
    entryPoints: ['worker.ts'],
    bundle: true,
    outfile: '.vitepress/dist/_worker.js',
    sourcemap: 'inline',
    format:'esm',

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
