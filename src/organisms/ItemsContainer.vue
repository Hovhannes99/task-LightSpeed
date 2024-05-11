<template>
  <section>
    <div class="bg-white">
      <div class="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
        <h2 class="text-2xl font-bold tracking-tight text-gray-900">Сопутствующие товары с бесплатной доставкой для соответствующих заказов</h2>

        <div v-if="!isLoading" class="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
          <ProductContainer
              v-for="item in items"
              :key="item.id"
              :id="item.id"
              :title="item.name"
              :price="item.defaultDisplayedPriceFormatted"
              :image="item.thumbnailUrl"
              @add-to-cart="handleAddToCart"
          />
        </div>
        <div v-else class="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
          <ItemSceleton v-for="item in 5" :key="item"/>
        </div>
        <p v-if="error" class="text-custom-red-600">{{error}}</p>
      </div>
    </div>
  </section>
</template>

<script lang="ts" setup>
import {onMounted} from 'vue'
import {storeToRefs} from 'pinia'
import ProductContainer from "../molecules/ProductContainer.vue";
import {useProductsStore} from "../store/products/index.ts";
import ItemSceleton from "../atoms/ItemSceleton.vue";

const productsStore = useProductsStore()
const {isLoading, error, items} = storeToRefs(productsStore)

onMounted(async ()=>{
  await productsStore.GetProducts()
})


const handleAddToCart = (id) => {
  productsStore.AddToCart(id.toString())
}
</script>
