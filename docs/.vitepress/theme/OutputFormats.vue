<template>
    <div v-for="item in list" :key="item.transform" style="display: flex; align-items: baseline;border-top:1px solid #ccc">
        <div style="flex: 1; padding: 1em; align-self: center">
            <code style="font-family: monospace; font-size: 0.8em">
                &lt;zone&gt;/{{
                    item.pathname
                }}
            </code>
            <p style="text-align:center">
            or
            </p>
            <p v-if="item.extension !== item.format">
                <code style="font-family: monospace; font-size: 0.8em">
                    {{
                        item.comment
                    }}
                </code>
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
        const pathname = `w=150_output=${format}/${image.split('//').pop()}`;

        return {
            extension,
            pathname,
            format,
            transform: `output=${format}`,
            image: `https://img.ctohm.com/${pathname}`,
            comment:
                extension === format
                    ? 'Actually same as not requesting any format'
                    : pathname.replace('output=', ''),
        };
    }),
);
</script>
