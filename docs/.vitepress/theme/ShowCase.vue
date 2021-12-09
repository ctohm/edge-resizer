<template>
   <div class="showcase">
    <div style="    flex: 1;    padding-right: 1em;    text-align: justify;">
    <slot name="first_paragraph"></slot>
    <br>
    <p>
        <slot name="second_paragraph"></slot>
    </p>

    </div>
    <div class="image_div">
    <slot name="table"></slot>
    </div>
    </div>
</template>
<style>
.showcase {
    display:flex;align-items: center;justify-content:flex-end;
}
.image_div {
           padding-right: 1em;    text-align: justify;
}
</style>