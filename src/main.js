import { createApp } from "vue";
import "@fortawesome/fontawesome-free/css/all.css"; // Ensure your project is capable of handling css files
import "./style.css";
import App from "./App.vue";
import "vuetify/styles";
import { createVuetify } from "vuetify";
import * as components from "vuetify/components";
import * as directives from "vuetify/directives";
import { VueQueryPlugin } from "@tanstack/vue-query";
import { aliases, fa } from "vuetify/iconsets/fa";

const vuetify = createVuetify({
  components,
  directives,
  icons: {
    defaultSet: "fa",
    aliases,
    sets: {
      fa,
    },
  },
});

const app = createApp(App);

app.use(VueQueryPlugin);
app.use(vuetify);

app.mount("#app");
