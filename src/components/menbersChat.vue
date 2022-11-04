<script setup>
import { ref } from "vue";
const props = defineProps({
  title: { type: String },
  describe: { type: String || Number },
  chats: { type: Array },
  members: { type: Array },
  roomanswer: { type: String },
  hasanswer: { type: Boolean },
});

const emit = defineEmits(["answer", "roomanswer"]);
const pushanswer = () => {
  let data = {
    chat: myAnswer.value,
    member: props.describe,
  };
  let roomData = {
    hasAnswer: true,
    answer: myAnswer.value,
  };
  emit("answer", data);
  emit("roomanswer", roomData);
  myAnswer.value = "";
};
const myAnswer = ref("");
</script>

<template>
  <h2 class="font-bold text-xl mb-2">
    {{ props.title === "draw" ? "房間ID :" : "玩家名稱 :" }}
    <span>{{ props.describe }}</span>
  </h2>
  <div class="border inline-block rounded-md mb-2">
    <input
      type="text"
      name="answer"
      id="answer"
      class="p-2 rounded-l-md"
      placeholder="我的答案"
      v-model="myAnswer"
    />
    <button
      class="bg-red-400 text-white hover:bg-red-500 p-2 rounded-r-md"
      @click="pushanswer()"
    >
      送出
    </button>
  </div>
  <p
    class="md:inline block md:ml-5 m-0 text-red-400"
    v-if="props.title === 'draw'"
  >
    我的答案 : {{ props.roomanswer }}
  </p>
  <div
    class="text-md w-full border rounded-md resize-none p-2 chat overflow-y-scroll"
  >
    <p
      class="font-bold block break-words border-b p-2"
      v-for="chat in chats"
      :key="chat.member + chat.chat"
    >
      {{ chat.member + "：" }} <span> {{ chat.chat }} </span>
    </p>
  </div>
  <div class="font-bold text-xl mb-2">
    房內玩家:
    <p
      v-for="member in members"
      :key="member.memberId"
      class="font-normal text-base"
    >
      {{ member.name + ", " }}
    </p>
  </div>
</template>

<style>
.chat {
  height: 300px;
}
</style>
