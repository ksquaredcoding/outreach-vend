<template>
  <div class="container bg-dark my-2">
    <div class="row justify-content-evenly row-cols-6">
      <div class="bg-light mt-4">
        <p>Total Sales: ${{ vend?.sales?.toFixed(2) }}</p>
      </div>
      <div class="bg-light mt-4">
        <p>Funds: ${{ funds }}</p>
      </div>
    </div>
    <div class="row justify-content-evenly row-cols-4">
      <slot></slot>
    </div>
    <div class="row justify-content-evenly row-cols-4 m-2 p-2">
      <button class="btn btn-success" @click="addFunds(0.25)">$0.25</button>
      <button class="btn btn-success" @click="addFunds(1.00)">$1.00</button>
      <button class="btn btn-success" @click="addFunds(5.00)">$5.00</button>
    </div>
  </div>
</template>


<script>
import { computed } from "vue";
import { AppState } from "../AppState.js";
import Pop from "../utils/Pop.js";

export default {
  props: {
    vend: { type: Object, required: true }
  },
  setup(props) {
    return {
      props,
      funds: computed(() => AppState.funds.toFixed(2)),
      addFunds(num) {
        if (num % 0.25 == 0) {
          if (AppState.funds < 5) {
            AppState.funds += num
          } else {
            Pop.error('Can only add up to $5.00 per session')
          }
        }
      }
    }
  }
}
</script>


<style lang="scss" scoped></style>
