<template>

    
    <table v-if="transforms.length">
    <thead>
        <tr>
            <th>Parameter</th>
            <th>Resulting Transformation</th>
            <th>example</th>
        </tr>
    </thead>
    <tbody>
        <tr v-for="item in transforms" :key="item.name">
        <th colspan="3" v-if="item.section" style="padding-top:1em"><a class="sectionLink" :href="item.sectionLink">📑 {{item.section}}</a></th>
        <template v-else>
        <td class="tx_cell">  {{item.name}}</td>
              
                <td class="tx_link">
                    <a v-if="item.link" :href="item.link">🔗 {{item.title}}</a>
                    <span v-else>{{item.title}}</span>
                    <sub v-if="item.note">{{item.note}}</sub></td>
                <td>
                      <code >
                &lt;zone&gt;/</code><code class="boldcode">{{
                    item.example
                }}</code><code>/&lt;image source&gt;</code>
                </td>
                </template>
        </tr>
    </tbody>
</table>
<aliases-table :aliases="alignments"><er-feature   >
        <h3 id="formats_shorthands">Alignment shorthands</h3>
        </er-feature></aliases-table>


<aliases-table :aliases="fits"><er-feature   >
        <h3 id="formats_shorthands">Fit shorthands</h3>
        
        

        </er-feature>
        Every supported value for `fit` can also be passed in its shorthand form</aliases-table>

<aliases-table :aliases="formats">
        <er-feature   >
        <h3 id="formats_shorthands">Format shorthands</h3>
        </er-feature>
</aliases-table>

</template>
<script setup lang="ts">
import { ref,computed } from 'vue';

import { AlignmentAliases,FitAliases ,AvailableTransforms,FormatAliases} from 'edge-resizer/ResizerRouter.ts'
const { keys } = defineProps<{
    keys: string[];
}>();
const formats=ref(Object.entries(FormatAliases).filter(()=> keys.includes('formats')).map(([alias,canonical])=>{
    return {alias,canonical}
}))
 const alignments=ref(Object.entries(AlignmentAliases).filter(()=>   keys.includes('alignments')).map(([alias,canonical])=>{
    return {alias,canonical}
})) 
const fits=ref(Object.entries(FitAliases).filter(()=>   keys.includes('fits')).map(([alias,canonical])=>{
    return {alias,canonical}
})) 
const transforms=computed(()=>{
    let tfArray=[]
    Object.entries(AvailableTransforms).forEach(([name,value])=>{
        let {docs:link,title,example,section,sectionLink,note}=value
        if(section) 
        tfArray.push({
            name:section,
            section,
            sectionLink
            
            })
    tfArray.push( {
        name,title,link,example:example||`${name}`,note
    })
    })
    return tfArray.filter(()=>keys.includes('transforms'))
})

</script>
<style>
code {
    font-family: monospace; font-size: 0.8em;
        padding-right: 0;
    padding-left: 0;
}
.tx_link sub {
    display:block;font-size:0.75em;
}
code.boldcode {
    color:#000;
    font-weight:bold;
}
a.sectionLink {
    margin:0 auto;padding:5px 32px;border:1px solid #ccc;border-radius:5px;
}
a.sectionLink:hover {
    background-color:#f0f0f0;
    text-decoration:none;
    cursor:pointer;
}
</style>