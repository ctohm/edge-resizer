<template>
   
    <div class="adjustments">
    <div v-for="item in list" :key="item.adjustment" class="transform">
         <image-transform :transform="item.adjustment_and_width" :image="image">
         
        <div>&lt;zone&gt;/<b>{{item.adjustment}}</b>/&lt;source img&gt;</div>
         </image-transform>
        <a v-if="item.documentation" :href="item.documentation"> <sup style="margin-top:0.7em;display:block;font-size:0.8em"> 📘 See documentation: "{{item.transform_type}}"</sup></a>
         
    </div>
    </div>
</template>
<script setup lang="ts">
import { ref } from 'vue';
const documentationLink={
        blur:'https://images.weserv.nl/docs/orientation.html#blur',
    flip:'https://images.weserv.nl/docs/orientation.html#flip',
    flop:'https://images.weserv.nl/docs/orientation.html#flop',
    ro:'https://images.weserv.nl/docs/orientation.html#ro',
    mod:'https://images.weserv.nl/docs/orientation.html#mod',
    sat:'https://images.weserv.nl/docs/orientation.html#sat',
    tint:'https://images.weserv.nl/docs/orientation.html#tint',
    con:'https://images.weserv.nl/docs/orientation.html#con',
    filt:'https://images.weserv.nl/docs/orientation.html#filt',
    trim:'https://images.weserv.nl/docs/orientation.html#trim',
    sharp:'https://images.weserv.nl/docs/orientation.html#sharp',
    hue:'https://images.weserv.nl/docs/adjustment.html#hue-rotation'

}
/*const formats=[`jpg`, `png`, `gif`, `webp`],
image="https://riff.one/images/designcue-unsplash.jpg"*/
const { adjustments, image,default_width,default_height,default_tx='' } = defineProps<{
    adjustments: Object;
    default_width:number;
    default_height:number;
    default_tx:string,
    image: string;
}>();
const extension = image.split('.').pop();
const list = ref(
    Object.entries(adjustments).map(([key,value]) => {
        const  adjustment= `${key}${value? ('='+value):''}`,
        url=image.split('//').pop(),
        adjustment_and_width=`${default_tx}_h=${default_height}_w=${default_width}_${adjustment}`,
         pathname = `${adjustment_and_width}/${url}`;

        return {
            transform_type:key,
            documentation:documentationLink[key],
            extension,
            pathname,
            url,
            adjustment_and_width,
            adjustment,
            image: `https://resizer.pictures/${pathname}`,
           
        };
    }),
);
</script>
<style>
.adjustments {
        display: flex;
    flex-wrap: wrap;
    margin: 0 -24px;
}
.adjustments .transform {
    margin:1em 0.5em;

    width:31%
}
.transform .labeledImageContainer {
    margin-left:0;
    margin-right:0;
}
.transform .labeledImageContainer  .imagecell {
    aspect-ratio:1;
}
</style>