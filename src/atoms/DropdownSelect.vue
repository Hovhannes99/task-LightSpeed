<template>
  <div class="">
    <div v-if="label" class="mb-2.5 font-medium text-[15px]">
      {{ label }}
    </div>
    <Listbox
        v-model="selectedItem"
        :disabled="isDisabled"
        @update:model-value="changeSelectedItem"
    >
      <div class="relative mt-1">
        <ListboxButton
            :class="
            twMerge(
              'relative',
              variant !== 'headless' &&
                'h-[48px] min-w-[200px] flex items-center font-bold border-primary-color p-[15px] w-full cursor-default rounded-[5px]  text-left focus:outline-none sm:text-sm',
              size === 'sm' && 'py-[5px] px-[10px]',
              variant === 'headless' && '!p-0',
              isBorder && 'border',
              isDisabled && 'cursor-not-allowed',
              !isDisabled && 'cursor-pointer',
              listboxButtonClass
            )
          "
        >
          <slot name="listbox-button">
            <template v-if="selectedItem">
              <img width="30px" height="30px" :src="selectedItem.icon" :alt="selectedItem.name">
              <span class="block truncate mr-auto min-w-[50px]">{{
                  selectedItem.name
                }}</span>
            </template>
            <template v-else>
              <span class="block truncate mr-auto min-w-[50px]">{{
                  placeholder
                }}</span>
            </template>
            <slot name="right">
              <ChevronDownIcon
                  class="-mr-1 ml-2 h-5 w-5 text-violet-200 hover:text-violet-100"
                  aria-hidden="true"
              />
            </slot>
          </slot>
        </ListboxButton>

        <transition
            leave-active-class="transition duration-100 ease-in"
            leave-from-class="opacity-100"
            leave-to-class="opacity-0"
        >
          <ListboxOptions
              class="w-full min-w-fit z-10 absolute max-h-60 overflow-auto rounded-md bg-accent-light-2 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm"
          >
            <ListboxOption
                v-for="u in items"
                v-slot="{ active }"
                :key="u.name"
                :value="u"
                as="template"
            >
              <li
                  :class="
                  twMerge(
                    'relative border-b border-accent-light cursor-default select-none p-[15px] flex items-center gap-2.5 text-primary-color cursor-pointer hover:bg-sky-700 hover:text-white',
                    active ? 'bg-primary-50' : '',
                    u.name === selectedItem?.name && 'bg-sky-400 text-white',
                    size === 'sm' && 'py-[5px] px-[10px]'
                  )
                "
              >
                <img width="30px" height="30px" :src="u.icon" :alt="u.name">
                <span :class="['block truncate font-medium']">{{
                    u.name
                  }}</span>
              </li>
            </ListboxOption>
            <div class="flex items-center justify-center py-2">
              <slot />
            </div>
          </ListboxOptions>
        </transition>
      </div>
    </Listbox>
  </div>
</template>

<script setup lang="ts">
import {PropType, ref, watch} from 'vue'
import {
  Listbox,
  ListboxButton,
  ListboxOptions,
  ListboxOption
} from '@headlessui/vue'
import { ChevronDownIcon } from '@heroicons/vue/20/solid'

import { twMerge } from 'tailwind-merge'

interface ItemsInterface {
  name: string
  icon?: string
}

type VariantType = 'default' | 'headless'

type SelectSize = 'sm' | 'md' | 'lg'

const props = defineProps({
  items: {
    type: Array as PropType<ItemsInterface[]>,
    default: () => []
  },
  size: {
    type: String as PropType<SelectSize>,
    default: 'md'
  },
  label: {
    type: String,
    default: ''
  },
  placeholder: {
    type: String,
    default: ''
  },
  variant: {
    type: String as PropType<VariantType>,
    default: 'default'
  },
  item: {
    type: Object as PropType<ItemsInterface>,
    default: undefined,
    required: false
  },
  isBorder: {
    type: Boolean,
    default: true
  },
  listboxButtonClass: {
    type: String,
    default: ''
  },
  isDisabled: {
    type: Boolean,
    default: false
  }
})
const selectedItem = ref(props.item)

watch(
    () => props.item,
    () => {
      selectedItem.value = props.item
    }
)

const emits = defineEmits(['change-selected-item', 'update:item'])

const changeSelectedItem = () => {
  emits('change-selected-item', selectedItem.value)
  emits('update:item', selectedItem.value)
}
</script>
