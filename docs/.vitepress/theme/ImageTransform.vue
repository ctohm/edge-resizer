<template>
    <labeled-image :src="src"><slot></slot></labeled-image>
</template>
<script setup lang="ts">
import { ref } from 'vue';

const { transform } = defineProps<{
    transform: string;
}>();
const src=ref('https://resizer.pictures/'+transform+'/riff.one/images/designcue-unsplash.jpg')
</script>