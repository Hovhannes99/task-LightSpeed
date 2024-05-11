<template>
    <section class="text-gray-700 body-font">
      <Loader v-if="isLoading || !currentItem"/>
      <div v-else class="container mx-auto flex px-5 py-24 md:flex-row flex-col items-center">
        <div class="lg:flex-grow md:w-1/2 lg:pr-24 md:pr-16 flex flex-col md:items-start md:text-left mb-16 md:mb-0 items-center text-center">
          <h1 class="title-font sm:text-4xl text-3xl mb-4 font-medium text-gray-900">{{ currentItem.name }}</h1>
          <p class="mb-8 leading-relaxed" v-html="currentItem.description"/>
          <p>Цена: {{ currentItem.defaultDisplayedPriceFormatted }}</p>
          <div class="flex justify-center">
            <Button color-scheme="secondary"   @click="productsStore.AddToCart(String(currentItem.id))">Купить</Button>
          </div>
        </div>
        <div class="lg:max-w-lg lg:w-full md:w-1/2 w-5/6">
          <img class="object-cover object-center rounded" :src="currentItem.thumbnailUrl" :alt="currentItem.name">
        </div>
      </div>
      <p v-if="error" class="text-custom-red-600"> {{ error }}</p>
    </section>
</template>

<script setup lang="ts">
import {onMounted} from 'vue'
import { useRoute } from 'vue-router'
import { storeToRefs } from 'pinia'
import Loader from "../atoms/Loader.vue";
import Button from "../atoms/Button.vue";
import {useProductsStore} from "../store/products/index.ts";

const route = useRoute()
const productsStore = useProductsStore()
const { isLoading, error, currentItem } = storeToRefs(productsStore)

onMounted( async ()=>{
  await  productsStore.GetCurrenProduct({id:route.params.id.toString()})
})

</script>
