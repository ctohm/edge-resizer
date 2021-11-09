export const home_html = `<div style="max-width:900px;margin:0 auto;"><center>

<div class="figure">
<img src="docs/repo_title.svg" alt="Logo" /><p class="caption">Logo</p>
</div>
<p><img src="https://img.shields.io/static/v1?label=Made%20With&amp;message=TypeScript&amp;color=f0f0f0&amp;labelColor=3974c0&amp;style=for-the-badge&amp;logo=typescript&amp;logoColor=white&amp;messageColor=3974c0" />   <img src="https://img.shields.io/badge/Cloudflare-Workers-orange?color=f38020&amp;logo=cloudflare&amp;logoColor=f38020&amp;style=for-the-badge&amp;labelColor=gainsboro" /></p>
<p>Resize, crop and optimize images according to URL parameters, and serve a cached result from then on.</p>
</center>

<h2 id="how">How ?</h2>
<p>This worker computes the original image's URL using the convention:</p>
<p><code>https://img.ctohm.com/&lt;protocol&gt;/&lt;domain&gt;/&lt;pathname&gt;</code></p>
<p>Let's use our Github Avatar as an example:</p>
<p><code>https://avatars.githubusercontent.com/u/71311688</code></p>
<p>You'd request it with</p>
<p><code>https://img.ctohm.com/https/avatars.githubusercontent.com/u/71311688</code></p>
<p>The original url is rebuilt and served from then on cached in the edge.</p>
<p>There's a middle step in which any transformations computed from the search params are applied through <a href="https://images.weserv.nl/">Images.weserv.nl API</a></p>
<hr />
<h2 id="available-transformations">Available Transformations</h2>
<h4 id="width-and-height"><a href="https://images.weserv.nl/docs/size.html#width">Width and Height</a></h4>
<ul>
<li>w: 'Width',</li>
<li>h: 'Height',</li>
</ul>
<h4 id="fitcolorizesharpen">Fit/Colorize/Sharpen</h4>
<ul>
<li>fit: <a href="https://images.weserv.nl/docs/fit.html">Fit</a></li>
<li>cbg: <a href="https://images.weserv.nl/docs/format.html#compression-level">Background Color for Fit=Contain</a></li>
<li>sharp: <a href="https://images.weserv.nl/docs/adjustment.html#sharpen">Sharpen</a></li>
<li>n: <a href="https://images.weserv.nl/docs/format.html#number-of-pages">Number of Pages</a> (is multipage images still a thing?)</li>
</ul>
<h4 id="cropping"><a href="https://images.weserv.nl/docs/crop.html#rectangle-crop">Cropping</a></h4>
<pre><code>cw: &#39;Crop width&#39;,
cy: &#39;Crop y&#39;,
cx: &#39;Crop x&#39;,
ch: &#39;Crop height&#39;,</code></pre>
<h4 id="compressionoptimization">Compression/Optimization</h4>
<ul>
<li>af: <a href="https://images.weserv.nl/docs/format.html#adaptive-filter">Adaptative Filter</a></li>
<li>l: <a href="https://images.weserv.nl/docs/format.html#compression-level">Compression Level</a></li>
<li>q: <a href="https://images.weserv.nl/docs/format.html#quality">Quality</a></li>
<li>il: <a href="https://images.weserv.nl/docs/format.html#interlace-progressive">Interlaced/Progressive</a></li>
</ul>
<h4 id="output-format-and-naming">Output Format and naming</h4>
<ul>
<li>output: <a href="https://images.weserv.nl/docs/format.html#output">Output</a></li>
<li>filename: <a href="https://images.weserv.nl/docs/format.html#filename">Filename</a></li>
</ul></div>
`