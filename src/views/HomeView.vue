<script setup>
import { getCurrentInstance, ref } from "vue";
import { apiNewRoom, apiInRoom } from "../assets/API";
const { proxy } = getCurrentInstance();
const date = new Date();
let massage = ref("選擇你要的角色");
let quessData = ref({
  roomId: null,
  memberId: date.getTime(),
  name: "",
});
let answerData = ref({
  roomId: date.getTime(),
  host: "",
  members: [],
  answer: "",
  chat: [],
  svg: "",
  hasAnswer: false,
});
const toQuessRoom = (path) => {
  apiInRoom(quessData.value).then((res) => {
    if (res.data.states === 200) return proxy.$router.push(path);
    massage.value = res.data.massage;
    console.log(massage.value);
  });
};
const toDrawRoom = (path) => {
  apiNewRoom(answerData.value).then((res) => {
    if (res.data.states === "200") return proxy.$router.push(path);
    massage.value = res.data.massage;
    console.log(path);
  });
};
</script>
<template>
  <div
    class="main flex flex-col px-5 py-8 absolute translate-x-1/2 -translate-y-1/2 right-1/2 top-1/2 bg-white/80 backdrop-blur-md rounded-xl"
  >
    <h1 class="font-bold text-xl text-sky-900">{{ massage }}</h1>
    <span class="text-sm text-sky-900 mb-5">(猜方必填遊戲名稱與房間ID)</span>
    <input
      type="text"
      name="name"
      id="name"
      v-model="quessData.name"
      class="border rounded-md p-2 mb-2"
      placeholder="遊戲名稱"
    />
    <input
      type="number"
      name="roomId"
      id="roomId"
      v-model="quessData.roomId"
      class="border rounded-md p-2 mb-3"
      placeholder="房間ID : 0000"
    />
    <button
      @click.prevent="
        toQuessRoom(`/quessroom/${quessData.roomId}/${quessData.memberId}`)
      "
      class="btn-3d bg-sky-500 p-3 rounded-full text-white font-bold mb-10 before:bg-sky-700 before:rounded-full after:bg-sky-600 after:rounded-full"
    >
      進房猜畫
    </button>
    <!-- <span class="text-red-400 text-sm">畫方不用填、點擊開房</span> -->
    <button
      @click.prevent="toDrawRoom(`/drawroom/${answerData.roomId}`)"
      class="btn-3d bg-red-500 p-3 rounded-full text-white font-bold mb-3 before:bg-red-700 before:rounded-full after:bg-red-600 after:rounded-full"
    >
      開房繪畫
    </button>
  </div>
</template>
<style scoped>
.main {
  width: 300px;
}
.btn-3d {
  transform-style: preserve-3d;
  position: relative;
  text-shadow: 2px 2px #0000003d;
}
.btn-3d::before {
  transform: translateZ(-1px);
  top: 10px;
  right: 0px;
  position: absolute;
  display: block;
  width: 100%;
  height: 100%;
}
.btn-3d::after {
  transform: translateZ(-1px);
  top: 5px;
  right: 0px;
  position: absolute;
  display: block;
  width: 100%;
  height: 100%;
}
.btn-3d:active {
  top: 5px;
}
.btn-3d:active::before {
  top: 0px;
}
</style>
