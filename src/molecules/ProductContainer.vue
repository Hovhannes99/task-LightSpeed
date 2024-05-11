<template>
  <div class="group relative">
    <div @click="onDetails" class="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none group-hover:opacity-75 lg:h-80 cursor-pointer">
        <img :src="image" :alt="title" class="h-full w-full object-cover object-center lg:h-full lg:w-full">
    </div>
    <div class="mt-4 flex justify-between">
      <div>
        <h3 class="text-sm text-gray-700">
          <p  @click="onDetails"  class="cursor-pointer">
            <span aria-hidden="true" class="inset-0"></span>
            {{title}}
          </p>
        </h3>
        <p class="text-sm font-medium text-gray-900">{{price}}</p>
      </div>
      <Button color-scheme="secondary" @click="addToCart">В корзину</Button>
    </div>
  </div>
</template>

<script setup lang="ts">
import Button from "../atoms/Button.vue";
import { useRouter } from "vue-router";

const router = useRouter()
const emits = defineEmits(['addToCart'])
const props = defineProps({
  id:{
    type: Number,
    required: true
  },
  image:{
    type: String,
    required: true
  },
  price:{
    type: String,
    required: true
  },
  title:{
    type: String,
    required: true
  }
})

const addToCart = () => {
 emits('addToCart', props.id)
}
const onDetails = () => {
  router.push(`/product-detail/${props.id}`)
}
</script>

