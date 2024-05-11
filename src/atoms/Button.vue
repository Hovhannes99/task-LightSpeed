<template>
  <div class="h-[44px]">
    <button
        :class="
        twMerge(
          'flex h-full outline-none w-full justify-center items-center gap-2.5 py-1.5 px-2 transition duration-200 bg-primary-color text-white rounded-[10px] font-bold text-lg color-white leading-[21px] hover:shadow-lg active:bg-primary-800 disabled:opacity-40 disabled:cursor-not-allowed',
          `${colorScheme === 'green' && 'bg-green active:bg-custom-green-600'}`,
          colorScheme === 'dark-green' &&
            'bg-[#4C9D2F] active:bg-custom-green-600',
          colorScheme === 'red' && 'bg-red active:bg-custom-red-700',
          colorScheme === 'orange' && 'bg-orange active:bg-custom-orange-700',

          colorScheme === 'secondary' && `${active ? 'bg-custom-gray-800' : 'bg-custom-gray-500 hover:bg-custom-gray-600 active:bg-custom-gray-800'}`
        )
      "
        :disabled="disabled"
        @click="$emit('click')"
    >
      <slot name="left-icon" />

      <div class="text-[13px] md:text-[15px] whitespace-nowrap">
        <slot />
      </div>
    </button>
  </div>
</template>

<script setup lang="ts">
import { twMerge } from 'tailwind-merge'
import {PropType} from "vue";

type colorSchemeType = 'default' | 'green' | 'dark-green' | 'red' | 'orange' | 'secondary'

defineEmits(['click'])

defineProps({
  disabled: {
    type: Boolean,
    default: false
  },
  colorScheme: {
    type: String as PropType<colorSchemeType>,
    default: 'default'
  },
  active:{
    type: Boolean,
    default: false
  }
})
</script>
