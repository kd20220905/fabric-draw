<script setup>
import axios from "axios";
import { apiRoomChat } from "../assets/API";
import { ref } from "vue";
import { useRoute } from "vue-router";
import MembersChat from "../components/menbersChat.vue";

const route = useRoute();
const svgNode = ref("");

// room content
const roomTitle = ref(null);
const roomChat = ref([]);
const roomMembers = ref([]);
//ws
// 接ws
const ws = new WebSocket(
  "wss://fabric-2022-10-27.herokuapp.com/gameRoom/" + route.params.id
);

ws.onmessage = (event) => {
  let { chat, svg, members } = JSON.parse(event.data);
  svgNode.value = svg;
  roomTitle.value = members.find(
    (member) => member.memberId === parseInt(route.params.memberId)
  ).name;
  roomChat.value = chat;
  roomMembers.value = members;
  JSON.parse(event.data);
  console.log(JSON.parse(event.data).chat);
};

const emitAnswer = (answer) => {
  apiRoomChat(route.params.id, answer).then((res) => {
    console.log(res);
  });
};
</script>

<template>
  <div class="flex items-center justify-center">
    <div class="rect m-5">
      <div v-html="svgNode"></div>
    </div>
  </div>
  <div class="m-5">
    <MembersChat
      title="quess"
      :describe="String(roomTitle)"
      :chats="roomChat"
      :members="roomMembers"
      @answer="emitAnswer"
    />
  </div>
</template>

<style scoped>
.rect {
  border: 1px rgb(150, 150, 150) solid;
  width: 800px;
}
</style>
