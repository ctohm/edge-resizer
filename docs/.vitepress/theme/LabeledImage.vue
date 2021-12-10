<template>
   <div class="labeledImageContainer">
    <div class="imagecell">
    <img :src="src"   />
    </div>
    <div class="captioncell">
    <slot></slot>
    </div>
    </div>
</template>
<script setup lang="ts">
 
const { src } = defineProps<{
    src: string
}>();
 </script>
 <style>
 .labeledImageContainer {
  display:flex;flex-direction:column;align-items: center;
  width: fit-content;
    margin: 0 auto;
    
    box-shadow:5px 5px 6px 0px rgba(0,0,0,0.43);

 }
 .labeledImageContainer .imagecell {
     flex: 1 1 0px;
     
 }
 .bordered.labeledImageContainer .imagecell {
padding:1em;
 }
 .bordered.labeledImageContainer .imagecell img {
     border:3px dashed #ccc;
     

 }
 .labeledImageContainer .captioncell {
      flex: 1 1 0px;
     width:100%;
padding-top:4px;
padding-bottom:4px;
        text-align:center;font-size:13px;background:#f0f0f0;
 }
 
 </style>