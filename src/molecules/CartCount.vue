<template>
        <RouterLink :to="cartIds.length?  '/shopping-cart' : '/'" class="cart relative">
          <img :src="carSvg" alt="cart-icon"/>
          <span v-if="cartIds.length" class="bg-custom-orange-500 px-2  flex absolute rounded-[50px] top-3 left-5 text-white">{{ cartIds.length }}</span>
        </RouterLink>
</template>

<script setup lang="ts">
import { RouterLink } from 'vue-router'
import carSvg from '../assets/icons/cart-icon.svg?url'
import { storeToRefs } from 'pinia'
import {useProductsStore} from "../store/products/index.ts";
const productsStore = useProductsStore()
const { cartIds } = storeToRefs(productsStore)
</script>
