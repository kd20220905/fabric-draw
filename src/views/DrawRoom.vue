<script setup>
import { fabric } from "fabric";
import { ref, onMounted, onBeforeUnmount, onUnmounted } from "vue";
import axios from "axios";
import { useRouter } from "vue-router";
const router = useRouter();

// fabric
const canvas = ref(null);
const colorAry = ref([
  "#ffffff",
  "#000000",
  "#EA0000",
  "#FF8000",
  "#F9F900",
  "#019858",
  "#8600FF",
  "#7373B9",
]);
const color = ref("#000000");
const width = ref("10");
const clearEl = () => {
  canvas.value.clear();
};
// 單選 筆刷顏色
const selectColor = (colorEle) => {
  color.value = colorEle;
  drawingColor();
};
// 筆刷顏色
const drawingColor = () => {
  canvas.value.freeDrawingBrush.color = color.value;
};
//筆刷粗度, 裡面的 parseInt 很重要!!!! 不這樣宣告，繪畫位置會跑掉
const drawingWidth = () => {
  canvas.value.freeDrawingBrush.width = parseInt(width.value, 10);
};
onMounted(() => {
  // 可繪畫
  canvas.value = new fabric.Canvas("c", {
    isDrawingMode: true,
  });
  // 繪畫後渲染
  // 預設筆刷顏色與粗度
  canvas.value.freeDrawingBrush.color = color.value;
  canvas.value.freeDrawingBrush.width = parseInt(width.value, 10);
  // canvas.value.setBackgroundImage(
  //   "https://cdn-old.brawlify.com/map/Camping-Grounds.png",
  //   () => canvas.value.renderAll()
  // );
  //ws
  const ws = new WebSocket("wss://fabric-2022-10-27.herokuapp.com/");
  ws.onopen = () => {
    console.log("open connection");
  };
  ws.onclose = () => {
    console.log("close connection");
  };
  // 發送WS
  setInterval(function () {
    let path = canvas.value.toJSON();
    ws.send(JSON.stringify(path));
  }, 1000);
});
onBeforeUnmount(() => {
  const data = { host: false };
  axios.post("https://fabric-2022-10-27.herokuapp.com/host", data).then((res) => {
    console.log(res.data);
  });
});
window.onbeforeunload = () => {
  const data = { host: false };
  axios.post("https://fabric-2022-10-27.herokuapp.com/host", data);
  alert("退處逆?");
};
// api
// 如果有人在畫, 不能進入
axios.get("https://fabric-2022-10-27.herokuapp.com/checkhost").then((res) => {
  if (res.data) return router.push("/");
  const data = { host: true };
  axios.post("https://fabric-2022-10-27.herokuapp.com/host", data);
});
</script>

<template>
  <div class="flex items-end">
    <div class="relative range-bar -rotate-90 -translate-y-40 translate-x-24">
      <input
        class="translate-y-1/2 bottom-1/2"
        type="range"
        name="width"
        id="width"
        min="1"
        max="50"
        @change="drawingWidth"
        v-model="width"
      />
    </div>
    <div>
      <canvas id="c" class="rect" width="800" height="500"></canvas>
      <div class="my-5 flex items-center justify-between">
        <button
          class="border rounded-md p-2 text-slate-400 hover:text-black hover:border-black"
          @click.prevent="clearEl()"
        >
          清空
        </button>
        <div>
          <button
            class="border p-1 rounded-full mr-1 hover:border-slate-600"
            v-for="color in colorAry"
            :key="color"
            @click.prevent="selectColor(color)"
          >
            <div
              class="color-ball border rounded-full"
              :style="`background: ${color}`"
            ></div>
          </button>
        </div>
        <input
          class="h-10 my-auto"
          type="color"
          name="color"
          id="color"
          v-model="color"
          @change="drawingColor"
        />
      </div>
    </div>
  </div>
</template>

<style scoped>
input[type="range"] {
  -webkit-appearance: none;
  margin-right: 15px;
  width: 200px;
  height: 30px;
  z-index: 20;
  background-color: rgba(0, 0, 0, 0);
  position: absolute;
}
input[type="range"]::-webkit-slider-thumb {
  -webkit-appearance: none;
  width: 30px;
  height: 30px;
  background: rgb(255, 255, 255);
  border: 1px solid rgba(95, 95, 95, 0.5);
  border-radius: 50%;
}
.range-bar {
  content: "";
  width: 0;
  height: 0;
  border-style: solid;
  border-width: 15px 190px 15px 0;
  z-index: 10;
  border-color: transparent #f0f0f0 transparent transparent;
}
.rect {
  border: 1px rgb(150, 150, 150) solid;
}
.color-ball {
  width: 35px;
  height: 35px;
}
</style>
