
<template>
	 <div   class="use_the_shorthand">
         <div         class="box">Shorthand</div>
         <slot></slot>
        </div>
</template>

<style  >

.use_the_shorthand {
    display: flex;
    flex-wrap: wrap;
    width:100%;
    margin-top:1em;

}

 .use_the_shorthand .box {
    background-color:#060; 
    padding:0.2em 0.5em;
    margin-left:-2em;
    margin-right:1em;

}
.use_the_shorthand   .box::before {
    left: 0;
    right: 20%;
    transform: skewX(-40deg);
  }
 .use_the_shorthand    .box::after {
    z-index: -2;
    left: 24%;
    top:70%;
    height: 100%; /* ~ 100%/cos(40deg) */
    width: 30px;
    filter: brightness(0.7);
    transform: rotate(130deg);
    
  }
  td .use_the_shorthand .box {
    top: -1.8em;
    left: 1em;
    margin-right: 0;
    position: relative;
    margin-left:unset;
  }
  td .use_the_shorthand .box + code {
      margin-left:-2em;
  }
</style>