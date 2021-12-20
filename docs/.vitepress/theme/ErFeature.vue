
<template>
	 <div   class="er-feature">
         <slot></slot>
        <div         class="box right custom-feature">🔳 Edge Resizer Features</div>
        </div>
</template>

<style  >

.er-feature {
    display: flex;
    flex-wrap: wrap;
    width:100%;
    margin-top:2em;

}
.er-feature.end {
    justify-content: end;
}
.er-feature.banner {
    background-color:#cce1eb;
    padding-bottom:0.5em;
    border-radius:0.4em;
    margin-bottom:1em;
}
 .feature_description{ 
     flex:1;
     font-size:0.95rem;
     padding:0.5em 0 0 1em;
 }
 .feature_description > b {
     font-size:1.2rem;
     

 }
 .er-feature.info-block .box {
         height: 2.5em;
    position: absolute;
    right: 0;
 }
 .er-feature.info-block .info.custom-block {
     width:100%;
 }
 .er-feature.info-block .info.custom-block .custom-block-title {
    margin:0 0 0 -1em;
 }
 
</style>