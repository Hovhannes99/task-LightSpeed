<template>
  <div>
    <FilterProducts />
    <ProductList />
  </div>
</template>

<script setup lang="ts">
import ProductList from '../templates/ProductList.vue'
import FilterProducts from "../organisms/FilterProducts.vue";
</script>
