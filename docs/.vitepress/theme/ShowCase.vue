<template>
   <div style="display:flex;align-items: baseline;">
    <div style="    flex: 1;    padding-right: 1em;    text-align: justify;">
    <slot name="first_paragraph"></slot>
    <br>
    <p>
        <slot name="second_paragraph"></slot>
    </p>

    </div>
    <slot name="table"></slot>
    
    </div>
</template>
