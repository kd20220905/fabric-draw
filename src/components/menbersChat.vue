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
  <div class="grid md:grid-cols-2 grid-cols-1 max-w-screen-lg md:mx-auto mx-2">
    <div class="col-span-1">
      <h2 class="font-bold text-xl mb-2 text-white">
        {{ props.title === "draw" ? "房間ID :" : "玩家名稱 :" }}
        <span>{{ props.describe }}</span>
      </h2>
      <div class="border inline-block rounded-md mb-2">
        <input
          type="text"
          name="answer"
          id="answer"
          class="p-2 rounded-l-md"
          placeholder="輸入答案"
          v-model="myAnswer"
        />
        <button
          class="bg-red-400 text-white hover:bg-red-500 py-2 px-3 rounded-r-md"
          @click="pushanswer()"
        >
          <font-awesome-icon icon="play" />
        </button>
      </div>
      <div class="font-bold text-xl text-white">
        <h2 class="mb-3">房內玩家:</h2>
        <div
          class="bg-white/80 w-60 p-3 rounded-md mb-5"
          v-for="member in members"
          :key="member.memberId"
        >
          <p class="font-normal text-xl text-black">
            <span class="mr-3">
              <font-awesome-icon icon="circle-user" />
            </span>
            {{ member.name }}
          </p>
        </div>
      </div>
    </div>
    <div
      class="text-md w-full border rounded-md resize-none p-2 chat overflow-y-scroll mb-10 col-span-1 bg-white"
    >
      <p
        class="font-bold block break-words border-b p-2 text-red-400"
        v-if="props.title === 'draw'"
      >
        我的答案 : {{ props.roomanswer }}
      </p>
      <p
        class="font-bold block break-words border-b p-2"
        v-for="chat in chats"
        :key="chat.member + chat.chat"
      >
        {{ chat.member + "：" }} <span> {{ chat.chat }} </span>
      </p>
    </div>
  </div>
</template>

<style>
.chat {
  height: 300px;
}
</style>
