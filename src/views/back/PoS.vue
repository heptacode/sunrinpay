<template>
	<div class="pos">
		<div class="pos__viewpager">
			<ViewPager :tab="['바코드 읽기','상품 선택하여 계산','상품 수동 입력']">
				<template v-slot:tab0>
					<BarcodeScanner></BarcodeScanner>
				</template>
				<template v-slot:tab1>상품 선택하여 계산</template>
				<template v-slot:tab1>상품 수동 입력</template>
			</ViewPager>
		</div>
		<div class="pos__list"></div>
	</div>
</template>

<script lang="ts">
import Vue from "vue";
import ViewPagerVue from "../../components/ViewPager.vue";
import BarcodeScannerVue from "../../components/BarcodeScanner.vue";

export default Vue.extend({
	components: {
		ViewPager: ViewPagerVue,
		BarcodeScanner: BarcodeScannerVue
	}
});
</script>

<style lang="scss" scoped>
.pos {
	display: flex;
	.pos__viewpager {
		flex: 5;
	}
	.pos__list {
		flex: 6;
	}
}
</style>