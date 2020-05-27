<template>
	<div class="barcodescanner scanner">
		<button @click="acceptCamera">Camera</button>
		<div>result : {{ result }}</div>
		<div ref="screen" class="barcodescanner__screen">
			<video />
			<canvas class="drawingBuffer" />
		</div>
	</div>
</template>

<script lang="ts">
import Vue from "vue";
import Quagga from "quagga";

export default Vue.extend({
	data() {
		return {
			result: 0
		};
	},
	mounted() {
		let config = {
			inputStream: {
				name: "Live",
				type: "LiveStream",
				target: this.$refs.screen,
				constraints: { facingMode: "environment" }
			},
			decoder: {
				readers: [
					"code_128_reader",
					"ean_reader",
					"ean_8_reader",
					"code_39_reader",
					"code_39_vin_reader",
					"code_93_reader"
				]
			},
			locate: false, // 가로 인식
			numOfWorkers: navigator.hardwareConcurrency,
			frequency: 100
		};
		Quagga.init(config, err => {
			if (err) {
				console.log(err);
				return;
			}
			console.log("Initialization finished. Ready to start");
			Quagga.start();
		});
		Quagga.onDetected(this.onDetected);
		Quagga.onProcessed(this.onProcessed);
	},
	methods: {
		onDetected(data) {
			this.result = data.codeResult.code;
		},
		onProcessed(result) {
			let drawingCtx = Quagga.canvas.ctx.overlay;
			let drawingCanvas = Quagga.canvas.dom.overlay;
			if (result) {
				if (result.boxes) {
					drawingCtx.clearRect(
						0,
						0,
						parseInt(drawingCanvas.getAttribute("width")),
						parseInt(drawingCanvas.getAttribute("height"))
					);
					result.boxes
						.filter(function(box) {
							return box !== result.box;
						})
						.forEach(function(box) {
							Quagga.ImageDebug.drawPath(
								box,
								{ x: 0, y: 1 },
								drawingCtx,
								{
									color: "green",
									lineWidth: 2
								}
							);
						});
				}
				if (result.box) {
					Quagga.ImageDebug.drawPath(
						result.box,
						{ x: 0, y: 1 },
						drawingCtx,
						{
							color: "#00F",
							lineWidth: 2
						}
					);
				}
				if (result.codeResult && result.codeResult.code) {
					Quagga.ImageDebug.drawPath(
						result.line,
						{ x: "x", y: "y" },
						drawingCtx,
						{ color: "red", lineWidth: 3 }
					);
				}
			}
		},
		acceptCamera() {
			var handleSuccess = (stream: MediaStream) => {
				const mediaTracks = stream.getTracks();
				for (let mediaTrack of mediaTracks) {
					mediaTrack.stop();
				}
			};

			navigator.mediaDevices
				.getUserMedia({ video: true })
				.then(handleSuccess)
				.catch(err => console.log(err));
		}
	}
});
</script>

<style lang="scss" scoped>
.barcodescanner {
	.barcodescanner__screen {
		position: relative;
		video,
		canvas {
			position: absolute;
			top: 0;
			left: 0;
		}
	}
}
</style>
