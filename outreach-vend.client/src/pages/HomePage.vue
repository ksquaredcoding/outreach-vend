<template>
  <VendingMachine :vend="vend">
    <div v-for="p in products">
      <button class="btn btn-primary px-5 m-2" :key="p.id" @click="purchaseProduct(p)">
        <p>{{ p.name }}</p>
        <p>${{ p.price }}</p>
        <p>x{{ p.quantity }}</p>
      </button>
    </div>
  </VendingMachine>
</template>

<script>
import { onMounted, computed } from "vue";
import { AppState } from "../AppState.js";
import VendingMachine from "../components/VendingMachine.vue";
import { vendingMachineService } from "../services/VendingMachineService.js";
import { productsService } from "../services/ProductsService.js";

export default {
  setup() {
    async function getVendingMachine() {
      try {
        await vendingMachineService.getVendingMachine();
      }
      catch (error) {
        console.error("[ERROR RETRIEVING VENDING MACHINE]", error);
      }
    }
    onMounted(() => {
      getVendingMachine();
    });
    return {
      vend: computed(() => AppState.vendingMachine),
      products: computed(() => AppState.products),
      async purchaseProduct(productData) {
        try {
          await productsService.purchaseProduct(productData)
        } catch (error) {
          console.error('[ERROR PURCHASING PRODUCT]', error)
        }
      }
    };
  },
  components: { VendingMachine }
}
</script>

<style scoped lang="scss"></style>
