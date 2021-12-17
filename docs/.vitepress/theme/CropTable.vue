<template>

    
    <table v-if="croplist.length" class="croptable">
    
    <tbody>
        <tr v-for="(row,index) in croplist" :key="index">
       <td v-for="cell in row" :key="cell.transform">
            <image-transform class="no_caption no_shadow" :image="image" :transform="cell.transform"/>
       </td>
        </tr>
    </tbody>
</table>

</template>
<script setup lang="ts">
import { ref,computed } from 'vue';

import { AlignmentAliases,FitAliases ,AvailableTransforms,FormatAliases} from 'edge-resizer/ResizerRouter.ts'



const { rows,cols,ch,cw,image,huex,huey,hue0} = defineProps ({
     rows:{type:Number},
    cols:{type:Number},
    ch:{type:Number},
    cw:{type:Number},
    image:{type:String},
    huex:{type:Number,default:0},
    huey:{type:Number,default:0},
    hue0:{type:Number,default:0},
}); 
const scale=1
const croplist=computed(()=>{
    let croplistarr=[];
    
    for(let irow=0;irow<rows;irow++) {
        let appendrow=[]
        for(let icol=0;icol<cols;icol++) {
            appendrow.push({transform:`w=${cols*cw*scale}_h=${rows*ch*scale}_auto_cw=${cw*scale}_ch=${ch*scale}_cx=${icol*cw*scale}_cy=${irow*ch*scale}_cover_hue=${hue0+icol*huex+irow*huey}_q=80` })
        }
        croplistarr.push(appendrow)
    }
 
    return croplistarr
})
console.log( { rows,cols,ch,cw,croplist,image,huex,huey,hue0} )
</script>
<style>
.croptable {
    display:table;
    margin:0 auto;
}
.croptable td {
    padding:0.2em 0.5em;
}
</style>