<template>
    <Layout>
   <template #home-hero>
     <!-- My custom sidebar top content-->
     <crop-table :w="1200" :h="900" :rows="3" :cols="5"  image="riff.one/designcue-unsplash.jpg?flop"   :cw="180" :ch="150">
     </crop-table>

    </template>
       <template #home-features>
     <!-- My custom sidebar top content-->
     
    </template>
    <template #home-footer>
     <div style="margin-left:-3em;text-align:center;font-size:0.8em;">Original image by <a href="https://unsplash.com/@designcue?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">DesignCue</a> on <a href="https://unsplash.com/?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Unsplash</a></div>

    </template>
  </Layout>
</template>
<script setup lang="ts">
import DefaultTheme from 'vitepress/theme'
const { Layout } = DefaultTheme

 

</script>
<style>
.home-hero {
  text-align:center;
}
</style>