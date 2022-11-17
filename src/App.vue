<script setup>
import { RouterView } from "vue-router";
</script>

<template>
  <div class="bg min-h-screen mx-auto relative bg-cover">
    <div class="backdrop-blur-sm bg-sky-900/70 absolute w-full h-full"></div>
    <RouterView />
  </div>
</template>

<style scoped>
.bg {
  background-image: url("./assets/bg.jpg");
}
</style>
