<template>
    <div v-for="item in list" :key="item.transform" style="display: flex; align-items: baseline;border-top:1px solid #ccc">
        <div style="flex: 1; padding: 1em; align-self: center">
            <code >
                &lt;zone&gt;/w=150_</code><code class="boldcode">{{
                    item.transform
                }}</code><code>/{{item.url}}</code>
            <p style="text-align:center">
            or
            </p>
            <p v-if="item.extension !== item.format">
                <code >
                &lt;zone&gt;/w=150_</code><code class="boldcode">{{
                    item.format
                }}</code><code>/{{item.url}}</code>
            </p>
            <p v-else>...actually not setting an output format</p>
        </div>
        <div style="align-self: center">
            <img :src="item.image" />
        </div>
    </div>
</template>
<script setup lang="ts">
import { ref } from 'vue';

/*const formats=[`jpg`, `png`, `gif`, `webp`],
image="https://riff.one/images/designcue-unsplash.jpg"*/
const { formats, image } = defineProps<{
    formats: string[];
    image: string;
}>();
const extension = image.split('.').pop();
const list = ref(
    formats.map((format) => {
        const  transform= `output=${format}`,
        url=image.split('//').pop(),
         pathname = `w=150_${transform}/${url}`;

        return {
            extension,
            pathname,
            url,
            format,
            transform,
            image: `https://img.ctohm.com/${pathname}`,
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
</style>