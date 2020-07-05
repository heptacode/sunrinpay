<template>
	<div class="stockmanagement">
		<div class="stockmanagement__stocklist">
			<StockList :data="list" @add-item="selectItem"></StockList>
			<button class="stockmanagement__stocklist__addbtn" @click="addItme">+</button>
		</div>
		<div class="stockmanagement__stockedit" v-if="selectedItem">
			<h2 class="stockmanagement__stockedit__name">
				<span><input type="text" class="editable" v-model="selectedItem.name"/></span>
				<i class="iconify" data-icon="mdi-edit"></i>
			</h2>
			<div class="stockmanagement__stockedit__barcode">
				<h3>바코드</h3>
				<input type="text" class="editable" v-model="selectedItem.barcode" />
			</div>
			<div class="stockmanagement__stockedit__quantity">
				<div>
					<h3>개당 가격</h3>
					<input type="text" class="editable" v-model="selectedItem.price" />원
				</div>
				<div>
					<h3>재고</h3>
					<input type="text" class="editable" v-model="selectedItem.quantity" />개
				</div>
			</div>
			<SalesChart></SalesChart>
		</div>
	</div>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import StockListVue from "../../components/StockList.vue";
import SalesChart from "../../components/SalesChart.vue";

import { db } from "@/DB";
import { StockItem } from "../../schema";

@Component({
	components: {
		StockList: StockListVue,
		SalesChart,
	},
	firestore: {
		list: db.collection("stock"),
	},
})
export default class StockManagement extends Vue {
	list: StockItem[] = [];
	selectedItem: StockItem | null = null;
	selectItem(item: StockItem) {
		this.selectedItem = item;
	}
	async addItme() {
		let data = {
			name: "물건",
			barcode: "",
			quantity: 1,
			price: 1000,
		} as StockItem;
		await db
			.collection("stock")
			.doc()
			.set(data);
	}
	async updateItem() {
		// FIXME: 업데이트 안됨
	}
}
</script>

<style lang="scss">
.editable {
	background: none;
	border: none;
	outline: none;

	color: $text-color;

	&:hover,
	&:focus {
		background-color: rgba(0, 0, 0, 0.1);
	}
}
.stockmanagement {
	display: flex;
	.stockmanagement__stocklist {
		flex: 1 1 50%;
		max-width: 50%;

		position: relative;

		.stockmanagement__stocklist__addbtn {
			position: absolute;
			right: 20px;
			bottom: 20px;

			width: $small-large-size;
			height: $small-large-size;

			display: flex;
			justify-content: center;
			align-items: center;

			border-radius: 50%;
			box-shadow: 0 4px 5px 0 rgba(0, 0, 0, 0.2);
			background-color: #ff53a3;

			font-size: $small-normal-size;

			z-index: 100;
		}
	}
	.stockmanagement__stockedit {
		flex: 1 1 50%;
		padding: 50px;

		display: flex;
		flex-direction: column;
		justify-content: space-between;
		h3 {
			font-size: $small-size;
			color: $gray-text-color;
		}

		.stockmanagement__stockedit__name {
			display: flex;
			justify-content: space-between;
			align-items: center;
			font-size: $small-normal-size;
			width: 100%;
			span {
				flex: 1;
			}
			input {
				width: 100%;
			}
		}
		.stockmanagement__stockedit__barcode {
			input {
				font-size: $small-normal-size;
			}
		}
		.stockmanagement__stockedit__quantity {
			display: flex;
			div {
				flex: 1;

				input {
					font-size: $small-normal-size;
					width: 40%;
				}
			}
		}
	}
}
</style>
