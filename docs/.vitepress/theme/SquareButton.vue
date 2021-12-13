
<template>
	<div class="square-button" @click="$emit('click', $event)" v-bind="$attrs">
		<slot />
	</div>
</template>

<style l >
.square-button {
	background: rgba(black, 0.4);
	display: flex;
	align-items: center;
	justify-content: center;
	height: 42px;
	width: 42px;
	margin-bottom: 10px;
	cursor: pointer;
    border:1px solid #666;
    border-radius:20px;
	transition: rgba(rgb(51, 50, 50), 0.4);
	 
}
.square-button:hover {
    		background: black;


}
</style>