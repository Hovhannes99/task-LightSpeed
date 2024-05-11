<template>
  <div class="flex items-center gap-5 text-lg font-bold">
    <div>
      <div
          v-for="page in displayedPages"
          :key="page"
          class="hover:text-black cursor-pointer"
          :class="{ 'text-primary-color': page === modelValue }"
          @click="() => onClickPage(page)"
      >
        {{ page }}
      </div>
    </div>
    <div
        v-for="i in [5, 10, 30, 50, 100]"
        :key="i"
        class="lg:py-1 lg:px-2 md:px-2 md:py-1 px-1 font-medium rounded-[5px] border-2 border-primary-color text-primary-color leading-[18px] cursor-pointer"
        :class="{
                'bg-primary-color text-white': i === tableItemsPerPage
              }"
        @click="emit('changeLimit', i)"
    >
      {{ i }}
    </div>
  </div>
</template>

<script setup lang="ts">
import {computed} from "vue";

const props = defineProps({
  modelValue: {
    type: Number,
    default: 0
  },
  itemCount: {
    type: Number,
    default: 0,
    required: false
  },
  itemsPerPage: {
    type: Number,
    required: true
  },
  tableItemsPerPage: {
    type: Number,
    required: true
  },
  max: {
    type: Number,
    default: 7
  },
  divider: {
    type: String,
    default: '…'
  }
})

const emit = defineEmits(['update:modelValue', 'onChangePage', 'changeLimit'])

const currentPage = computed({
  get() {
    return props.modelValue
  },
  set(value) {
    emit('update:modelValue', value)
    emit('onChangePage', value)
  }
})

const pages = computed(() =>
    Array.from(
        { length: Math.ceil(props.itemCount / props.itemsPerPage) },
        (_, i) => i + 1
    )
)

const displayedPages = computed(() => {
  if (pages.value.length <= 6) {
    return pages.value
  }

  const current = currentPage.value
  const max = pages.value.length

  const r = Math.floor((Math.min(props.max, max) - 5) / 2)
  const r1 = current - r
  const r2 = current + r

  const beforeWrapped = r1 - 1 > 1
  const afterWrapped = r2 + 1 < max

  const items: Array<number | string> = [1]

  if (beforeWrapped) items.push(props.divider)

  if (!afterWrapped) {
    const addedItems = current + r + 2 - max
    for (let i = current - r - addedItems; i <= current - r - 1; i++) {
      items.push(i)
    }
  }

  for (let i = r1 > 2 ? r1 : 2; i <= Math.min(max, r2); i++) {
    items.push(i)
  }

  if (!beforeWrapped) {
    const addedItems = 1 - (current - r - 2)
    for (let i = current + r + 1; i <= current + r + addedItems; i++) {
      items.push(i)
    }
  }

  if (afterWrapped) items.push(props.divider)

  if (r2 < max) items.push(max)

  if (items.length >= 3 && items[1] === props.divider && items[2] === 3) {
    items[1] = 2
  }

  if (
      items.length >= 3 &&
      items[items.length - 2] === props.divider &&
      items[items.length - 1] === items.length
  ) {
    items[items.length - 2] = items.length - 1
  }
  return items
})

function onClickPage(page: number | string) {
  if (typeof page === 'string') {
    return
  }

  currentPage.value = page
}
</script>
