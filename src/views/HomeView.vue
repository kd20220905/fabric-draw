<script setup>
import { getCurrentInstance, ref, onMounted } from "vue";
import axios from "axios";
const { proxy } = getCurrentInstance();

let host = ref(false);
axios.get("https://fabric-2022-10-27.herokuapp.com/checkhost").then((res) => {
  host.value = res.data;
});
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
    class="bg-slate-400 p-3 rounded-md text-white"
    v-if="host"
    disabled
  >
    請重整測試
  </button>
  <button
    @click.prevent="toRoom('/drawroom')"
    class="bg-red-400 p-3 rounded-md text-white"
    v-else
  >
    畫方
  </button>
  <p class="font-xl">選擇你要的腳色</p>
</template>
