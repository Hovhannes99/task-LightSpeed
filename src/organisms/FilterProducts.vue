<template>
  <div class="w-full flex items-center pt-3 border-t-2 gap-3">
    <DropdownSelect
        :item="items[0]"
        :items="items"
        label="Выберите тип Категории"
        @update:item="handleItem"
        :isDisabled="isLoading"
    />
  </div>
</template>
<script setup lang="ts">
import DropdownSelect from "../atoms/DropdownSelect.vue";
import {useCategoriesStore} from "../store/categories/index.ts";
import {storeToRefs} from "pinia";
import {computed, onMounted} from "vue";
import {useProductsStore} from "../store/products/index.ts";

const productsStore = useProductsStore()

const categoriesStore = useCategoriesStore()
const { isLoading, categories } = storeToRefs(categoriesStore)
const items = computed(()=>{
  let defaultItem = [{
    name: 'Все',
    icon: 'https://pic.onlinewebfonts.com/thumbnails/icons_186842.svg'
  }]
  defaultItem.push(...categories.value?.map(item => {
       return {
         ...item,
        icon: item.thumbnailUrl
       }
  }))
  return defaultItem
})
onMounted(async ()=>{
  await categoriesStore.GetCategories({})
})
const handleItem = async (item)=>{
  if (item.name === 'Все'){
   await productsStore.GetProducts()
  }else {
    await productsStore.GetProductsByCategory({id:item.id.toString()})
  }
}
</script>
