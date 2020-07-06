<template>
	<div class="stockmanagement">
		<div class="stockmanagement__stocklist">
			<StockList :data="list" @add-item="selectItem"></StockList>
			<button class="stockmanagement__stocklist__addbtn" @click="addItem">+</button>
		</div>
		<div class="stockmanagement__stockedit" v-if="selectedItem">
			<h2 class="stockmanagement__stockedit__withicon">
				<i class="iconify" data-icon="mdi-cube-outline"></i>
				<span>
					<input type="text" class="editable" v-model="selectedItem.name" @change="updateItem('name')" />
				</span>
			</h2>
			<div class="stockmanagement__stockedit__small">
				<h3>바코드 <i class="iconify" data-icon="mdi-barcode"></i></h3>
				<input type="text" class="editable" v-model="selectedItem.barcode" @change="updateItem('barcode')" />
				<!-- TODO: Barcode Scan -->
				<span>
					<i class="iconify" data-icon="mdi-barcode-scan"></i>
				</span>
			</div>
			<div class="stockmanagement__stockedit__flex">
				<div>
					<h3>단가 <i class="iconify" data-icon="mdi-currency-krw"></i></h3>
					<input type="text" class="editable" v-model="selectedItem.price" @change="updateItem('price')" />원
				</div>
				<div>
					<h3>할인율 <i class="iconify" data-icon="mdi-sale"></i></h3>
					<input type="text" class="editable" v-model="selectedItem.discount" @change="updateItem('discount')" />%
				</div>
				<div>
					<h3>재고 <i class="iconify" data-icon="mdi-archive"></i></h3>
					<input type="text" class="editable" v-model="selectedItem.quantity" @change="updateItem('quantity')" />개
				</div>
			</div>
			<div class="stockmanagement__stockedit__small">
				<h3>태그 <i class="iconify" data-icon="mdi-tag-multiple"></i></h3>
				<!-- TODO: 태그 구현(필드 추가+, 삭제-) -->
				<!-- <input type="text" class="editable" v-model="selectedItem.tags[0]" @change="updateItem('tags')" />개
				<input type="text" class="editable" v-model="selectedItem.tags[1]" @change="updateItem('tags')" />개
				<input type="text" class="editable" v-model="selectedItem.tags[2]" @change="updateItem('tags')" />개 -->
			</div>
			<SalesChart></SalesChart>
		</div>
	</div>
</template>

<script lang="ts">
import { Vue, Component, Watch } from "vue-property-decorator";
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

	@Watch("list")
	onListChanged(next: any[], prev: any[]) {
		if (this.selectedItem === null) this.selectedItem = this.list[0];
	}

	selectItem(item: StockItem) {
		this.selectedItem = item;
	}
	async addItem() {
		// TODO: INTENT로 추가할 상품 정보 입력받기
		await db.collection("stock").add({
			name: "물건",
			barcode: "",
			quantity: 1,
			price: 1000,
			discount: 0,
			tags: [],
		});
	}
	async updateItem(key: string) {
		await db
			.collection("stock")
			.doc(this.selectedItem?.id)
			.update({
				[key]: this.selectedItem?.[key],
			});
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

		.stockmanagement__stockedit__withicon {
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
		.stockmanagement__stockedit__small {
			input {
				font-size: $small-normal-size;
			}
		}
		.stockmanagement__stockedit__flex {
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
