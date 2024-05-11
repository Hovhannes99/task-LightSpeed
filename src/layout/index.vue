<template>
  <div>
    <header >
      <Navbar/>
    </header>
    <main class="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
      <slot />
    </main>
  </div>
</template>

<script setup lang="ts">
import Navbar from "../organisms/Navbar.vue";

</script>
