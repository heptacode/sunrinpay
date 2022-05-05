<template>
  <div class="detailsuserpayment">
    <div class="detailsuserpayment__list">
      <h2>상품 목록</h2>
      <ul class="detailsuserpayment__list__ul" ref="list">
        <li class="detailsuserpayment__list__item" v-for="idx in itemCount" :key="idx">
          <p class="name">(빙그레)메로나메론맛</p>
          <p class="count">×1</p>
          <p class="price">14,700원</p>
        </li>
      </ul>
      <button class="detailsuserpayment__list__allbtn" @click="showAll">
        <i class="iconify" data-icon="mdi-chevron-down"></i>
        모두보기
      </button>
    </div>
    <div class="detailsuserpayment__price">
      <h2>결제 금액</h2>
      <p class="detailsuserpayment__price__item">
        <span>총액</span>
        <span>1,000원</span>
      </p>
      <p class="detailsuserpayment__price__item">
        <span>할인 금액</span>
        <span>-400원</span>
      </p>
      <p class="detailsuserpayment__price__item total">
        <span>결제하실 금액</span>
        <span>600원</span>
      </p>
    </div>
    <div class="detailsuserpayment__paymentselected">
      <h2>결제 수단 선택</h2>
      <PaymentSelected v-model="paymentResult"></PaymentSelected>
    </div>
    <div class="detailsuserpayment__button__container">
      <button class="detailsuserpayment__ok">결제하기</button>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
import smoothReflow from 'vue-smooth-reflow';
import PaymentSelected from '@/components/PaymentSelected.vue';

@Component({
  mixins: [smoothReflow],
  components: {
    PaymentSelected,
  },
})
export default class DetailsUserPayment extends Vue {
  itemCount: number = 3;
  paymentResult: string = 'sunrinpay';

  mounted() {
    this.$smoothReflow!({
      el: this.$refs.list as HTMLDivElement,
      property: ['height'],
    });
  }

  showAll() {
    if (this.itemCount == 3) this.itemCount = 10;
    else this.itemCount = 3;
  }
}
</script>

<style lang="scss" scoped>
.list-animation {
  &-enter-active,
  &-leave-active {
    transition: 0.5s;
  }
  &-enter,
  &-leave-to {
    opacity: 0;
  }
  &-enter-to,
  &-leave {
    opacity: 1;
  }
}

.detailsuserpayment {
  padding: 25px;
  padding-bottom: 125px;

  overflow-y: auto;

  display: flex;
  flex-direction: column;

  h2 {
    font-size: $small-size;
    opacity: 0.6;
    margin-bottom: 15px;
  }
  p {
    font-size: $small-up-size;
  }

  &__list {
    margin-bottom: 45px;
    &__ul {
      position: relative;
    }
    &__item {
      display: flex;
      justify-content: space-between;

      border-bottom: 1px solid $select-color;

      padding: 10px 0;
      &:last-child {
        margin-bottom: 0;
      }

      .name {
        flex: 5;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
      }
      .count {
        flex: 1;
      }
      .price {
        flex: 4;
        text-align: right;
      }
    }
    &__allbtn {
      color: $text-color;
      border-radius: 0;
      background: none;
      border-bottom: 1px solid $select-color;

      width: 100%;
    }
  }
  &__price {
    margin-bottom: 45px;
    &__item {
      display: flex;
      justify-content: space-between;
      margin-bottom: 10px;
      &:last-child {
        margin-bottom: 0;
      }

      &.total {
        color: $primary-color;
        font-weight: bold;
      }
    }
  }
  &__button__container {
    //left: 25px;
    width: 100%;
    position: fixed;
    left: 0;
    bottom: 0;
    background-color: $background-color;
    -webkit-box-shadow: 0px -4px 20px -1px rgba(0, 0, 0, 0.25);
    box-shadow: 0px -4px 20px -1px rgba(0, 0, 0, 0.25);
    display: flex;
    overflow: hidden;
    padding: 15px 20px;
  }
  &__ok {
    flex: 1;
    border-radius: 8px;
    padding: 10px;
    font-size: $small-size;
    font-weight: bold;
  }
}
</style>
