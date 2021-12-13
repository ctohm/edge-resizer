<template>
	<div class="vertical-buttons">
		<slot />
	</div>
</template>

<style  >
.vertical-buttons {
	position: absolute;
	left: 10px;
	top: 50%;
	transform: translateY(-50%);
}
</style>
 