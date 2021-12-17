<template>
  <div class="adjustments">
    <div v-for="item in list" :key="item.adjustment" class="transform">
      <image-transform :transform="item.adjustment_and_width" :image="image">
        <div>
          &lt;zone&gt;/<b>{{ item.adjustment }}</b
          >/&lt;source img&gt;
          <template v-if="item.shorthand">
          &lt;zone&gt;/<b>{{ item.shorthand }}</b
          >/&lt;source img&gt;
          </template>
        </div>
      </image-transform>
      <a v-if="item.documentation" :href="item.documentation">
        <sup style="margin-top: 0.7em; display: block; font-size: 0.8em">
          📘 See documentation: "{{ item.transform_type }}"</sup
        ></a
      >
    </div>
  </div>
</template>
<script setup lang="ts">
import { ref } from 'vue';
const documentationLink = {
  blur: 'https://images.weserv.nl/docs/adjustment.html#blur',
  flip: 'https://images.weserv.nl/docs/orientation.html#flip',
  flop: 'https://images.weserv.nl/docs/orientation.html#flop',
  ro: 'https://images.weserv.nl/docs/orientation.html#ro',
  mod: 'https://images.weserv.nl/docs/adjustment.html#mod',
  sat: 'https://images.weserv.nl/docs/adjustment.html#sat',
  tint: 'https://images.weserv.nl/docs/adjustment.html#tint',
  con: 'https://images.weserv.nl/docs/adjustment.html#con',
  filt: 'https://images.weserv.nl/docs/adjustment.html#filter',
  trim: 'https://images.weserv.nl/docs/orientation.html#trim',
  sharp: 'https://images.weserv.nl/docs/adjustment.html#sharp',
  hue: 'https://images.weserv.nl/docs/adjustment.html#hue-rotation',
};
/*const formats=[`jpg`, `png`, `gif`, `webp`],
image="https://riff.one/images/designcue-unsplash.jpg"*/
const {
  adjustments,
  image,
  default_width,
  default_height,
  aliasprefix='',
  default_tx = '',
} = defineProps<{
    aliasprefix:string,
  adjustments: Object,
  default_width: number,
  default_height: number,
  default_tx: string,
  image: string,
}>();
console.log({
  adjustments,
  image,
  default_width,
  default_height,
  aliasprefix,
  default_tx,
} )
const extension = image.split('.').pop();
const list = ref(
  Object.entries(adjustments).map(([key, value]) => {
    const adjustment = `${key}${value ? '=' + value : ''}`,
      url = image.split('//').pop(),
      adjustment_and_width = `${default_tx}_h=${default_height}_w=${default_width}_${adjustment}`,
      pathname = `${adjustment_and_width}/${url}`;
let shorthand 
if(aliasprefix&&adjustment.startsWith(aliasprefix)) shorthand=adjustment.replace(aliasprefix,'')

    return {
      transform_type: key,
      documentation: documentationLink[key],
      extension,
      pathname,
      url,
      adjustment_and_width,
      adjustment,
      shorthand,
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
  margin: 1em 0.5em;
  display: flex;
  width: 31%;
}
.transform .labeledImageContainer {
  margin-left: 0;
  margin-right: 0;
  width: 100%;
  text-align: center;
}

.adjustments.fit .imagecell img {
  border: 1px dashed #ccc;
}
.adjustments.fit .labeledImageContainer .captioncell {
  height: fit-content;
  flex-grow: 0;
}
</style>
