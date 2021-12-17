<template>
    <Layout>
   <template #home-hero>
     <!-- My custom sidebar top content-->
     <crop-grid :w="1200" :h="900" :rows="2" :cols="4"  image="riff.one/designcue-unsplash.jpg?flop"   :cw="225" :ch="225"/>
    </template>
       <template #home-features>
     <!-- My custom sidebar top content-->
     
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