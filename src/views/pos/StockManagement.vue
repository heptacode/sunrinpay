<template>
	<div class="stockmanagement">
		<div class="stockmanagement__stocklist">
			<StockList :data="list"></StockList>
		</div>
		<div class="stockmanagement__stockedit">
			<h2 class="stockmanagement__stockedit__name">
				<span><input type="text" class="editable" value="메로나메론맛"/></span>
				<i class="iconify" data-icon="mdi-edit"></i>
			</h2>
			<div class="stockmanagement__stockedit__barcode">
				<h3>바코드</h3>
				<input type="text" class="editable" value="123456789" />
			</div>
			<div class="stockmanagement__stockedit__quantity">
				<div>
					<h3>개당 가격</h3>
					<input type="text" class="editable" value="5700" />원
				</div>
				<div>
					<h3>재고</h3>
					<input type="text" class="editable" value="55" />개
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
