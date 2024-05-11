<template>
  <Modal :is-open="isOpen" @close-modal="onCloseModal">
    <div class="flex items-center justify-between mb-5 relative">
      <div class="cursor-pointer absolute right-[-10px] top-[-10px]" @click="onCloseModal">
        <img width="30" height="30" :src="closeSvg" alt="close-icon">
      </div>
      <div
          class="text-[20px] md:text-[24px] leading-[27px] text-black font-semibold mt-5"
      >
        Поздравляем, ваш заказ уже в пути.
      </div>
    </div>
    <div class="flex justify-center">
      <img  :src="doneSvg" alt="success-icon">
    </div>
  </Modal>
</template>

<script setup lang="ts">
import closeSvg from '../assets/icons/close-icon.svg'
import doneSvg from '../assets/icons/success.svg'
import Modal from "../atoms/Modal.vue";

defineProps({
  isOpen: {
    type: Boolean,
    required: true
  }
})


const emits = defineEmits(['closeModal', 'onChanged'])
const onCloseModal = () => emits('closeModal')
</script>
