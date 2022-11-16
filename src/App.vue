<script setup>
import { RouterView } from "vue-router";
</script>

<template>
  <div class="bg h-screen mx-auto relative bg-cover">
    <div class="backdrop-blur-sm absolute w-full h-full"></div>
    <RouterView />
  </div>
</template>

<style scoped>
.bg {
  background-image: url("./assets/bg.jpg");
}
</style>
