
<template>
	 <div   class="feature_detection">
        <div         class="box right">🔳 Edge Resizer Feature </div>
        <slot></slot>
        </div>
</template>

<style  >

.feature_detection {
    display: flex;
    flex-wrap: wrap;
    width:100%;
    margin-top:2em;

}
.feature_detection.end {
    justify-content: end;
}
</style>