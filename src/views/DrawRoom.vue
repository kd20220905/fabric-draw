<script setup>
import { fabric } from "fabric";
import { ref, onMounted } from "vue";
import { useRoute } from "vue-router";
import { apiRoomAnswer, apiRoomChat } from "../assets/API";
import MembersChat from "../components/menbersChat.vue";
const route = useRoute();

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
const editModel = ref(false);

const clearEl = () => {
  canvas.value.clear();
};
const undoEl = () => {
  // console.log(canvas.value.getObjects()[canvas.value.getObjects().length - 1]);
  const lastDraw = canvas.value.getObjects().length - 1;
  canvas.value.remove(canvas.value.getObjects()[lastDraw]);
};
const editEl = () => {
  canvas.value.isDrawingMode = !canvas.value.isDrawingMode;
  editModel.value = !editModel.value;
};
const imageEl = (e) => {
  const fileReader = new FileReader();
  fileReader.readAsDataURL(e.target.files[0]);
  fileReader.addEventListener("load", () => {
    let res = fileReader.result;
    const imgEl = document.createElement("img");
    imgEl.src = res;
    imgEl.onload = () => {
      // height: window.innerWidth > 800 ? 600 : (window.innerWidth * 3) / 4,
      // width: window.innerWidth > 800 ? 800 : window.innerWidth,
      // imgW * 3 < imgH * 4 imgH = canvaH / 3 || (imgW = canvaH /imgH * imgW) / 3
      // imgW * 3 < imgH * 4 imgW = (canvaH /imgH * imgW) 4 || (canvaW) / 4
      const scalePercent = ( imgEl.width * 3 < imgEl.height * 4 ) ? canvas.value.height / imgEl.height : canvas.value.width / imgEl.width 
      const image = new fabric.Image(imgEl, {
        scaleX: scalePercent,
        scaleY: scalePercent,
        top: 160,
        left: 100,
      });
      canvas.value.add(image);
    };
  });
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

// room content
const roomTitle = ref(null);
const roomChat = ref([]);
const roomMembers = ref([]);
const roomAnswer = ref("");
const roomHasAnswer = ref(false);

onMounted(() => {
  // 可繪畫
  canvas.value = new fabric.Canvas("c", {
    // isDrawingMode: roomHasAnswer.value,
    // RWD
    height: window.innerWidth > 800 ? 600 : (window.innerWidth * 3) / 4,
    width: window.innerWidth > 800 ? 800 : window.innerWidth,
  });
  canvas.value.freeDrawingBrush.color = color.value;
  canvas.value.freeDrawingBrush.width = parseInt(width.value, 10);
  //ws
  const ws = new WebSocket(
    "wss://fabric-2022-10-27.herokuapp.com/gameRoom/" + route.params.id
  );
  ws.onmessage = (event) => {
    let { roomId, chat, members, answer, hasAnswer } = JSON.parse(event.data);
    roomTitle.value = roomId;
    roomChat.value = chat;
    roomMembers.value = members;
    roomAnswer.value = answer;
    roomHasAnswer.value = hasAnswer;
    console.log(JSON.parse(event.data));
  };
  ws.onopen = () => {
    console.log(
      "wss://fabric-2022-10-27.herokuapp.com/gameRoom/" + route.params.id
    );
  };
  ws.onclose = () => {
    console.log("close connection");
  };
  // 發送WS
  setInterval(function () {
    // let path = canvas.value.toJSON();
    const svgData = canvas.value.toSVG({
      svgViewportTransformation: false,
      suppressPreamble: true,
      width: "100%",
      height: "100%",
    });
    let data = {
      svg: svgData,
    };
    ws.send(JSON.stringify(data));
  }, 800);
});

// api
const emitAnswer = (answer) => {
  let roomBulletin = {
    chat: "房主已經送出新答案",
    member: "房間公告",
  };
  apiRoomAnswer(route.params.id, answer).then(() => {
    apiRoomChat(route.params.id, roomBulletin);
  });
};
</script>

<template>
  <div class="flex flex-col">
    <div class="mx-auto">
      <div class="range-bar -rotate-90 translate-y-28 -translate-x-24">
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
      <canvas id="c" class="rect"></canvas>
    </div>
    <div class="my-5 flex flex-col items-center justify-between">
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
        <input
          class="h-10 my-auto"
          type="color"
          name="color"
          id="color"
          v-model="color"
          @change="drawingColor"
        />
      </div>
      <div class="md:flex block mt-5">
        <button
          class="border rounded-md m-2 p-2 text-slate-400 hover:text-black hover:border-black"
          @click.prevent="editEl()"
          v-if="roomHasAnswer"
        >
          {{ editModel ? "切換編輯模式" : "切換筆刷模式" }}
        </button>
        <p class="border rounded-md m-2 p-2 text-slate-400" v-else>請先送出答案</p>
        <button
          class="border rounded-md m-2 p-2 text-slate-400 hover:text-black hover:border-black"
          @click.prevent="undoEl()"
        >
          上一步
        </button>
        <button
          class="border rounded-md m-2 p-2 text-slate-400 hover:text-black hover:border-black"
          @click.prevent="clearEl()"
        >
          清空
        </button>
        <input
          type="file"
          class="border rounded-md m-2 p-2 text-slate-400 file:text-slate-400 file:bg-white file:px-4 file:border-0"
          @change.prevent="imageEl"
        />
      </div>
    </div>
  </div>
  <div class="m-5">
    <MembersChat
      title="draw"
      :describe="String(roomTitle)"
      :chats="roomChat"
      :members="roomMembers"
      :roomanswer="roomAnswer"
      :hasanswer="roomHasAnswer"
      @roomanswer="emitAnswer"
    />
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
