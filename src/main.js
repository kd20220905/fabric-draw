import { createApp } from "vue";
import { createPinia } from "pinia";

import App from "./App.vue";
import router from "./router";
import axios from "axios";
import "./assets/main.css";

const app = createApp(App);
// app.use(axios);
app.use(createPinia());
app.use(router);
app.config.globalProperties.$http = axios;
app.config.globalProperties.$router = router;
app.mount("#app");
