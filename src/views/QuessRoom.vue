<script setup>
import { ref } from "vue";
const svgNode = ref("");
//ws
// 接ws
const ws = new WebSocket("wss://fabric-2022-10-27.herokuapp.com/");
ws.onmessage = (event) => {
  let path = JSON.parse(event.data);
  svgNode.value = path.svg;
  console.log(path.svg);
};
</script>

<template>
  <div class="flex">
    <div class="rect">
      <div v-html="svgNode"></div>
    </div>
  </div>
</template>

<style scoped>
.rect {
  border: 1px rgb(150, 150, 150) solid;
}
svg {
  width: 300px !important;
  height: 200px !important;
}
</style>
