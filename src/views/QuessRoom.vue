<script setup>
import { ref, onUpdated } from "vue";
const svgNode = ref("");
const test = ref();


//ws
// 接ws
const ws = new WebSocket("wss://fabric-2022-10-27.herokuapp.com/");
ws.onmessage = (event) => {
  let path = JSON.parse(event.data);
  svgNode.value = path.svg;
  if (!test.value) return;
  const svgW = window.innerWidth > 800 ? "800" : window.innerWidth;
  test.value.childNodes[0].setAttribute("width", svgW);
};
</script>

<template>
  <div class="flex">
    <div class="rect">
      <div v-html="svgNode" ref="test"></div>
    </div>
  </div>
</template>

<style scoped>
.rect {
  border: 1px rgb(150, 150, 150) solid;
}
</style>
