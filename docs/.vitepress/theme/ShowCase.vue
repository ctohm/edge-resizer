<template>
   <div class="showcase">
    <div class="left_text">
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
.showcase .left_text {
    flex: 1;    padding-right: 1em;    text-align: justify;
}
.showcase.bordered .image_div p {
    border:1px solid #eee;
}
.image_div {
           padding-right: 1em;    text-align: right;float:right
}

</style>