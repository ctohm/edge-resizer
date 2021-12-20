<template>
    <div v-for="item in list" :key="item.transform" style="display: flex; align-items: baseline;border-top:1px solid #ccc">
        <div style="flex: 1; padding: 1em; align-self: center">
            <code >
                &lt;zone&gt;/w=150_</code><code class="boldcode">{{
                    item.transform
                }}</code><code>/{{item.url}}</code>
           <short-hand>
            
         
            
                <code >
                &lt;zone&gt;/w=150_</code><code class="boldcode">{{
                    item.format
                }}</code><code>/{{item.url}}</code>
            
           </short-hand>
        </div>
        <div style="align-self: center">
            <img :src="item.image" />
        </div>
    </div>
</template>
<script setup lang="ts">
import { ref } from 'vue';

const {  image ,onlyFormats} = defineProps<{
    image: string;
    onlyFormats:string[];
}>();
console.log({onlyFormats})
import {FormatAliases } from 'edge-resizer/ResizerRouter'
const formats=Object.entries(FormatAliases).filter(([key])=>onlyFormats.includes(key)).map(([alias,canonical])=>{
    return {alias,canonical}
})
const extension = image.split('.').pop();
const list = ref(
    formats.map(({alias:format,canonical}) => {
        const  transform= `output=${format}`,
        url=image.split('//').pop(),
         pathname = `w=150_${transform}/${url}`;

        return {
            canonical,
            extension,
            pathname,
            url,
            format,
            transform,
            image: `https://resizer.pictures/${pathname}`,
            comment:
                extension === format
                    ? 'Actually same as not requesting any format'
                    : pathname.replace('output=', ''),
        };
    }),
);
</script>
<style>
code {
    font-family: monospace; font-size: 0.8em;
        padding-right: 0;
    padding-left: 0;
}
code.boldcode {
    color:#000;
    font-weight:bold;
}
.use_the_shorthand {
    color:#060;
    
    
    padding:0 4px ;
    display:inline-block;
    font-size:0.9em;
    margin-bottom:0;
    display:block;

}
.use_the_shorthand + p  {
    margin-top:0.1em;  
} 
.use_the_shorthand code {
    clear:both;
}
.use_the_shorthand + code +code.boldcode{
    color:#060;
}
.use_the_shorthand b {
    font-size:1em;
    font-weight:bolder;
    padding:0;
    margin-right:0.2em;
     background-color:#090;border-radius:0.9em;padding:0.1em 0.4em;

     color:white;
}
</style>