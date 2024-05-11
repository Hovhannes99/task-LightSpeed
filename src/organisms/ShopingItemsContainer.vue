<template>
  <section>
    <div class="bg-white">
      <div class="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
        <div v-if="!isLoading && cartItems" class="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
          <CartItemsContainer
              v-for="item in cartItems"
              :key="item.id"
              :id="item.id"
              :title="item.name"
              :price="item.defaultDisplayedPriceFormatted"
              :image="item.thumbnailUrl"
              @removeFromCart="removeFromCart"
              @orderItem="orderProduct"
          />
        </div>
        <div v-else class="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
          <ItemSceleton v-for="item in 5" :key="item"/>
        </div>
        <p v-if="error" class="text-custom-red-600">{{error}}</p>
      </div>
    </div>
    <CongratsModal :is-open="isOpen" @closeModal="isOpen = false"/>
  </section>
</template>

<script lang="ts" setup>
import {onMounted, ref, watch} from 'vue'
import {storeToRefs} from 'pinia'
import {useProductsStore} from "../store/products/index.ts";
import ItemSceleton from "../atoms/ItemSceleton.vue";
import CartItemsContainer from "../molecules/CartItemsContainer.vue";
import CongratsModal from "./CongratsModal.vue";
import {useRouter} from "vue-router";

const productsStore = useProductsStore()
const {isLoading, error, cartItems} = storeToRefs(productsStore)
const isOpen = ref(false)
const router = useRouter()
onMounted(async ()=>{
  await productsStore.GetCartsProducts()
})


watch(()=>cartItems.value, ()=>{
   if (!cartItems.value?.length){
     router.push('/')
   }
})
const removeFromCart = (id) => {
  productsStore.RemoveFromCart(id)

}
const orderProduct = () => {
  isOpen.value = true
}
</script>
