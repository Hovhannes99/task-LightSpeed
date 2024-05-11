<template>
   <div class="flex items-center gap-3">
     <input type="text" class="border rounded-[5px] h-[48px] border-primary-color flex items-center p-[3px] gap-[8px]" />
     <Button color-scheme="secondary" >
       <img width="20px" height="20px" :src="searchSvg" alt="search-icon">
     </Button>
   </div>
</template>

<script setup lang="ts">
import searchSvg from '../assets/icons/search-icon.svg'
import Button from "../atoms/Button.vue";
</script>
