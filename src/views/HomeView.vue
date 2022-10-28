<script setup>
import { getCurrentInstance } from "vue";
const { proxy } = getCurrentInstance();

const toRoom = (path) => {
  proxy.$router.push(path);
};
</script>
<template>
  <button
    @click.prevent="toRoom('/quessroom')"
    class="bg-red-400 p-3 rounded-md text-white mr-4"
  >
    猜方
  </button>
  <button
    @click.prevent="toRoom('/drawroom')"
    class="bg-red-400 p-3 rounded-md text-white"
  >
    畫方
  </button>
  <p class="font-xl">選擇你要的腳色</p>
</template>
