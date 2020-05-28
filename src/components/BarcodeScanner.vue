<template>
	<div class="barcodescanner scanner">
		<div ref="screen" class="barcodescanner__screen">
			<video />
			<canvas class="drawingBuffer" />
		</div>
		<button class="barcodescanner__startbtn" @click="start">Start</button>
		<button class="barcodescanner__stopbtn" @click="stop">Stop</button>
	</div>
</template>

<script lang="ts">
import Quagga from "quagga";

import { Vue, Component, Watch, Prop } from "vue-property-decorator";

@Component
export default class BarcodeScanner extends Vue {
	result: string = "";
	tmpDetectedList: string[] = [];
	tmpDetectedTimer: number = 0;

	@Prop({ default: () => {} }) onDetected: Function | undefined;

	@Watch("result")
	onChangeResult() {}

	start() {
		Quagga.onDetected(this.onDet);
		Quagga.onProcessed(this.onProcessed);

		let config = {
			inputStream: {
				name: "Live",
				type: "LiveStream",
				target: this.$refs.screen,
				constraints: {
					width: 1024,
					height: 1024,
					facingMode: "environment"
				}
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
			frequency: 10
		};

		Quagga.init(config, err => {
			if (err) {
				console.log(err);
				return;
			}
			console.log("Initialization finished. Ready to start");
			Quagga.start();
		});
	}
	stop() {
		Quagga.stop();
	}
	onDet(data) {
		this.tmpDetectedList.push(data.codeResult.code);
		if (!this.tmpDetectedTimer) {
			let tmpCountList = {};
			this.tmpDetectedTimer = window.setTimeout(() => {
				if (this.tmpDetectedList.length > 2) {
					this.tmpDetectedList.forEach(item => {
						if (tmpCountList[item]) tmpCountList[item]++;
						else tmpCountList[item] = 1;
					});
					let max = "";
					Object.keys(tmpCountList).forEach(key => {
						if (tmpCountList[key] > (tmpCountList[max] || 0))
							max = key;
					});
					this.result = max;
				} else {
					this.result = "";
				}
				if (this.onDetected) this.onDetected(this.result);
				this.tmpDetectedList = [];
				this.tmpDetectedTimer = 0;
			}, 1000);
		}
	}
	onProcessed(result) {
		let drawingCtx = Quagga.canvas.ctx.overlay;
		let drawingCanvas = Quagga.canvas.dom.overlay;
		if (result) {
			if (result.codeResult && result.codeResult.code) {
				drawingCtx.clearRect(
					0,
					0,
					parseInt(drawingCanvas.getAttribute("width")),
					parseInt(drawingCanvas.getAttribute("height"))
				);
				Quagga.ImageDebug.drawPath(
					result.line,
					{ x: "x", y: "y" },
					drawingCtx,
					{ color: "red", lineWidth: 3 }
				);
			}
		}
	}
}
</script>

<style lang="scss" scoped>
.barcodescanner {
	position: relative;
	width: 100%;
	height: 100%;
	background-color: black;

	.barcodescanner__startbtn {
		position: absolute;
		top: 10px;
		right: 10px;
		z-index: 50;
	}
	.barcodescanner__stopbtn {
		position: absolute;
		top: 10px;
		left: 10px;
		z-index: 50;
	}
	.barcodescanner__screen {
		position: absolute;
		width: 100%;
		height: 100%;
		video,
		canvas {
			position: absolute;
			top: 0;
			left: 0;
			width: 100% !important;
			height: 100% !important;
		}
	}
}
</style>
