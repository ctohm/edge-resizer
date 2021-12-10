<template>
    <labeled-image  :src="src"><slot></slot></labeled-image>
</template>
<script setup lang="ts">
import { ref } from 'vue';

const { transform,image } = defineProps<{
    transform: string;
    image: string;

}>();
const src=ref('https://resizer.pictures/'+transform+'/'+(image||'riff.one/designcue-unsplash.jpg'))
</script>