
<template>
<cropper
			ref="cropper"
			class="coordinates-cropper"
			:src="image"
			:default-boundaries="boundaries"
			:transitions="true"
			:stencil-props="{
				minAspectRatio: 10 / 20,
			}"
			@change="updateSize"
		/>
 <vertical-buttons>
			<square-button title="Zoom In" @click="zoom(2)">
				➕
			</square-button>
			<square-button title="Zoom Out" @click="zoom(0.5)">
				➖
			</square-button>
			<square-button title="Move Top" @click="move('top')">
				  ⬆️
			</square-button>
			<square-button title="Move Left" @click="move('left')">
			⬅️
			</square-button>
			<square-button title="Move Right" @click="move('right')">
				➡️
			</square-button>
			<square-button title="Move Bottom" @click="move('bottom')">
				⬇️
			</square-button>
		</vertical-buttons>
</template>
<script lang="ts">
import { defineComponent, ref } from 'vue'
import VerticalButtons from './VerticalButtons.vue';
import SquareButton from './SquareButton.vue';
import { Cropper } from 'vue-advanced-cropper'
import 'vue-advanced-cropper/dist/style.css';

export default defineComponent({
  data() {
		return {
			image:
				'https://riff.one/designcue-unsplash.jpg',
			size: {
				width: null,
				height: null,
			},
		};
	},
	methods: {
		boundaries({ cropper, imageSize }) {
			return {
				width: cropper.clientWidth,
				height: cropper.clientHeight,
			};
		},
		updateSize({ coordinates }) {
			this.size.width = Math.round(coordinates.width);
			this.size.height = Math.round(coordinates.height);
		},
		zoom(factor) {
			this.$refs.cropper.zoom(factor);
		},
		move(direction) {
			if (direction === 'left') {
				this.$refs.cropper.move(-this.size.width / 4);
			} else if (direction === 'right') {
				this.$refs.cropper.move(this.size.width / 4);
			} else if (direction === 'top') {
				this.$refs.cropper.move(0, -this.size.height / 4);
			} else if (direction === 'bottom') {
				this.$refs.cropper.move(0, this.size.height / 4);
			}
		},
	
    change({coordinates, canvas}) {
      console.log(coordinates, canvas)
    }
  },
  components: {
    Cropper,VerticalButtons,SquareButton
  }
})

</script>

<style>
.manipulate-image-example	.coordinates-cropper {
		max-height: 500px;
		background: black;
	}
.manipulate-image-example	.size-info {
		color: white;
		position: absolute;
		font-size: 10px;
		right: 10px;
		bottom: 10px;
		opacity: 0.5;
	}

</style>