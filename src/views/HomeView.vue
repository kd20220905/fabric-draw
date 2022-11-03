<script setup>
import { getCurrentInstance, ref, onMounted } from "vue";
import axios from "axios";
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
  axios
    .post("https://fabric-2022-10-27.herokuapp.com/InRoom", quessData.value)
    .then((res) => {
      if (res.data.states === 200) return proxy.$router.push(path);
      massage.value = res.data.massage;
      console.log(massage.value);
    });
};
const toDrawRoom = (path) => {
  axios
    .post("https://fabric-2022-10-27.herokuapp.com/newRoom", answerData.value)
    .then((res) => {
      if (res.data.states === "200") return proxy.$router.push(path);
      massage.value = res.data.massage;
      console.log(path);
    });
};
</script>
<template>
  <input
    type="text"
    name="name"
    id="name"
    v-model="quessData.name"
    class="border p-2"
    placeholder="遊戲名稱"
  />
  <input
    type="number"
    name="roomId"
    id="roomId"
    v-model="quessData.roomId"
    class="border p-2"
    placeholder="房間ID : 0000"
  />
  <button
    @click.prevent="
      toQuessRoom(`/quessroom/${quessData.roomId}/${quessData.memberId}`)
    "
    class="bg-red-400 p-3 rounded-md text-white mr-4"
  >
    猜方
  </button>
  <!-- <button
    @click.prevent="toDrawRoom('/drawroom')"
    class="bg-slate-400 p-3 rounded-md text-white"
    v-if="host"
    disabled
  >
    請重整測試
  </button> -->
  <button
    @click.prevent="toDrawRoom(`/drawroom/${answerData.roomId}`)"
    class="bg-red-400 p-3 rounded-md text-white"
  >
    畫方
  </button>
  <p class="font-xl">{{ massage }}</p>
</template>
