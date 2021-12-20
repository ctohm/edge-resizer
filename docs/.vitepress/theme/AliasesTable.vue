<template>
<div v-if="aliases.length">
    <slot></slot>

<table>
    <thead>
        <tr>
            
            <th>Canonical form</th>
            <th>Short form</th>
        </tr>
    </thead>
    <tbody>
        <tr v-for="item in aliases" :key="item.alias">
       
                 <td>
                      <code >
                &lt;zone&gt;/</code><code class="boldcode">{{
                    item.canonical
                }}</code><code>/&lt;image source&gt;</code>
                </td>
                 <td>  <short-hand> <code >
                &lt;zone&gt;/</code><code class="boldcode">{{
                    item.alias
                }}</code><code>/&lt;image source&gt;</code>
                </short-hand>
                </td>
        </tr>
    </tbody>
</table>
 </div>
</template>
<script setup lang="ts">
import { ref } from 'vue';
const { aliases } = defineProps<{
    aliases:({alias:string,canonical:string})[]

}>();
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
</style>