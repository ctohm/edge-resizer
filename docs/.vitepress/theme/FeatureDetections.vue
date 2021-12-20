<template>
        <div v-for="item in list" :key="item.key"  class="feature_detection">
        <er-feature   >
        <h3 :id="item.key"><b>{{item.icon}}</b> {{ item.title }}</h3>
        </er-feature>
    
            <p>{{ item.description }}</p>
            <sub>See IETF descripcion for:
            <a v-if="item.link" href="item.link">{{ item.title }}</a></sub>
        </div>
    
</template>
<script setup lang="ts">
import { ref } from 'vue';
const detectionKey = {

    vw: {
        key: 'vw',
        icon:'↔️',
        title: "Device's Viewport Width", link: 'https://wicg.github.io/responsive-image-client-hints/#sec-ch-viewport-width', description: `If your browser sent the "sec-ch-viewport-width" or "viewport-width" headers, passing the "vw" transformation 
        parameter will yield an image with the same width of your current's viewport. Pass it with a value between 0 and 1 (e.g. 'vw=0.4') to set the width as a fraction of the viewport width. 
        If you also pass an explicit width, the smallest is picked.`
    },
    vh: {
        key: 'vh',
        icon:'↕️',
        title: "Device's Viewport Height", link: 'https://wicg.github.io/responsive-image-client-hints/#sec-ch-viewport-height', description: `If your browser sent the "sec-ch-viewport-height" header, passing the "vh" transformation 
        parameter will yield an image with the same height of your current viewport. Pass it with a value between 0 and 1 (e.g. 'vh=0.4') to set the height as a fraction of the viewport height. 
        If you also pass an explicit width, the smallest is picked.`
    },
    dpr: {
        key: 'dpr',
        icon:'🔍',
        title: "Device's DPR", link: 'https://wicg.github.io/responsive-image-client-hints/#sec-ch-dpr',
        description: `If your browser sent the "sec-ch-dpr" or "dpr" headers, and you passed the "dpr" transformation without a value, Edge Resizer will try to populate it with the header value`
    },

    accept: {
        key: 'accept',icon:'💊',
        title: 'Accept', description: `If you request "format=auto" (or just "auto"), Edge Resizer will check your browser's "Accept" header for WebP support, and use it accordingly`
    }
}

/*const formats=[`jpg`, `png`, `gif`, `webp`],
image="https://riff.one/images/designcue-unsplash.jpg"*/
const { keys } = defineProps<{
    keys: string[];
}>();
const list = ref(keys.map(key => detectionKey[key]))
</script>
<style>
.feature_detection {
    display: flex;
    flex-wrap: wrap;
    width:100%;
    margin-top:2em;
}
.er-feature >i {
    display: flex;
    float:right;
    font-weight:bold;
    font-size:0.8em;
    
}
.er-feature  h3 {
    font-size: 1.2em;
    float: right;
    flex-grow: 2;
    display: inline-flex;
    margin-top: 0;
}
.er-feature  h3 b {
    font-size:1.24em;
    font-weight:bold;
    margin-right:0.5em;
}
.feature_detection .transform {
    margin: 1em 0.5em;

    width: 31%;
}
.transform .labeledImageContainer {
    margin-left: 0;
    margin-right: 0;
}
.transform .labeledImageContainer .imagecell {
    aspect-ratio: 1;
}
</style>