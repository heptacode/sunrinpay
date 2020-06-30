<template>
	<div class="stockmanagement">
		<div class="stockmanagement__stocklist">
			<StockList :data="list"></StockList>
		</div>
		<div class="stockmanagement__stockedit"></div>
	</div>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import StockListVue from "../../components/StockList.vue";

import { db } from "@/DB";
import { StockItem } from "../../schema";

@Component({
	components: {
		StockList: StockListVue
	},
	firestore: {
		list: db.collection("stock")
	}
})
export default class StockManagement extends Vue {
	list: StockItem[] = [];
}
</script>

<style lang="scss">
.stockmanagement {
	display: flex;
	.stockmanagement__stocklist {
		flex: 1;
	}
	.stockmanagement__stockedit {
		flex: 1;
	}
}
</style>
