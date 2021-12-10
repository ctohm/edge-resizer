<template>
<h3>Alignment shorthands</h3>
<aliases-table :aliases="alignments"/> 

<h3>Fit shorthands</h3>
<aliases-table :aliases="fits"/> 


    
    <table>
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
        <td>  {{item.name}}</td>
              
                <td><a :href="item.link">{{item.title}}</a></td>
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
</template>
<script setup lang="ts">
import { ref,computed } from 'vue';

import { AlignmentAliases,FitAliases ,AvailableTransforms} from 'edge-resizer/ResizerRouter.ts'

 const alignments=ref(Object.entries(AlignmentAliases).map(([alias,canonical])=>{
    return {alias,canonical}
})) 
const fits=ref(Object.entries(FitAliases).map(([alias,canonical])=>{
    return {alias,canonical}
})) 
const transforms=computed(()=>{
    let tfArray=[]
    Object.entries(AvailableTransforms).forEach(([name,value])=>{
        let {docs:link,title,example,section,sectionLink}=value
        if(section) 
        tfArray.push({
            name:section,
            section,
            sectionLink
            })
    tfArray.push( {
        name,title,link,example:example||`${name}`
    })
    })
    return tfArray
})

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
a.sectionLink {
    margin:0 auto;padding:5px 32px;border:1px solid #ccc;border-radius:5px;
}
a.sectionLink:hover {
    background-color:#f0f0f0;
    text-decoration:none;
    cursor:pointer;
}
</style>