<template>
	<div class="pos">
		<div class="pos__viewpager">
			<ViewPager :tab="['바코드 읽기','상품 선택하여 계산','상품 수동 입력']">
				<template v-slot:tab0>
					<div class="pos__viewpager__barcodescanner">
						<BarcodeScanner></BarcodeScanner>
					</div>
				</template>
				<template v-slot:tab1>
					<div class="pos__viewpager__search"></div>
				</template>
				<template v-slot:tab2>상품 수동 입력</template>
			</ViewPager>
		</div>
		<div class="pos__list"></div>
	</div>
</template>

<script lang="ts">
import ViewPagerVue from "../../components/ViewPager.vue";
import BarcodeScannerVue from "../../components/BarcodeScanner.vue";

import { Vue, Component } from "vue-property-decorator";

@Component({
	components: {
		ViewPager: ViewPagerVue,
		BarcodeScanner: BarcodeScannerVue
	}
})
export default class PoS extends Vue {
	getConsonant() {}
}
</script>

<style lang="scss" scoped>
.pos {
	display: flex;
	.pos__viewpager {
		flex: 5;

		.pos__viewpager__barcodescanner {
			display: flex;
			justify-content: center;
			align-items: center;

			width: 100%;
			height: 100%;
			overflow: hidden;
		}
		.pos__viewpager__search {
			background-color: $primary-color;

			width: 100%;
			height: 100%;
		}
	}
	.pos__list {
		flex: 6;
	}
}
</style>