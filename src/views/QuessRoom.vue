<script setup>
import { fabric } from "fabric";
import { getCurrentInstance, ref, onMounted } from "vue";
// fabric
const canvas2 = ref(null);
onMounted(() => {
  // 繪畫後渲染
  canvas2.value = new fabric.StaticCanvas("b");
});

//ws
// 接ws
const ws = new WebSocket("wss://fabric-2022-10-27.herokuapp.com/");
ws.onmessage = (event) => {
  // console.log(JSON.parse(event.data), event.data);
  let path = JSON.parse(event.data);
  canvas2.value.loadFromJSON(path);
  console.log(canvas2.value)
};
</script>

<template>
  <canvas id="b" class="rect" width="500" height="500"></canvas>
</template>

<style scoped>
.rect {
  border: 1px rgb(150, 150, 150) solid;
}
</style>
