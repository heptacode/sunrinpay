<template>
	<div class="console">
		<div class="console__content">
			<div class="console__content__head">
				<div class="left">
					<h2>오늘의 매출</h2>
					<h3>3,700,000원</h3>
				</div>
				<div class="right">
					<p>
						7일 전 대비
						<span>9.4%p</span>
					</p>
					<p>
						평균 대비
						<span>5.1%p</span>
					</p>
				</div>
			</div>
			<div class="console__content__actions">
				<h2>지난 7일간 매출</h2>
				<p>표시 범위 변경</p>
			</div>
			<SalesChart class="console__content__chart"></SalesChart>
			<div class="console__content__top3">
				<h2>오늘 판매 순위</h2>
				<ul class="console__content__top3__list">
					<li class="console__content__top3__list__item">
						<div class="score">1</div>
						<div class="name">커피콜라맛우유</div>
						<div class="price">4,200원</div>
						<div class="sales">5,740</div>
					</li>
                    <li class="console__content__top3__list__item">
						<div class="score">2</div>
						<div class="name">커피콜라맛우유</div>
						<div class="price">4,200원</div>
						<div class="sales">5,740</div>
					</li>
                    <li class="console__content__top3__list__item">
						<div class="score">3</div>
						<div class="name">커피콜라맛우유</div>
						<div class="price">4,200원</div>
						<div class="sales">5,740</div>
					</li>
				</ul>
			</div>
		</div>
		<div class="console__content"></div>
	</div>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import SalesChart from "../../components/SalesChart.vue";
@Component({
	components: {
		SalesChart: SalesChart
	}
})
export default class Console extends Vue {}
</script>

<style lang="scss">
.console {
	display: flex;
	.console__content {
		display: flex;
		flex-direction: column;

		flex: 1;
		margin: 30px;
		padding: 30px;

		border-radius: 24px;
		box-shadow: 0 3px 6px 0 rgba(0, 0, 0, 0.16);
		background-color: #333333;

		.console__content__head {
			display: flex;
			justify-content: space-between;
			margin-bottom: 30px;
			h2 {
				font-size: $small-up-size;
				font-weight: normal;
			}
			h3 {
				font-size: $small-normal-size;
			}
			p {
				font-size: $small-size;
			}
		}
		.console__content__actions {
			display: flex;
			justify-content: space-between;
			h2 {
				font-size: $small-size;
				color: #656666;
			}
			p {
				color: $primary-color;
			}
		}
		.console__content__chart {
			flex: 1;
		}
		.console__content__top3 {
			h2 {
				font-size: $small-size;
				color: #656666;
				margin: 20px 0;
			}
			.console__content__top3__list {
				.console__content__top3__list__item {
                    display: flex;
                    font-size: $small-normal-size;
					.score {
						flex: 1;
					}
					.name {
						flex: 5;
					}
					.price {
						flex: 2;
						text-align: right;
					}
					.sales {
						flex: 2;
						text-align: right;
					}
				}
			}
		}
	}
}
</style>
