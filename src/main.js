import Vue from "vue";
import App from "./App.vue";
import vuetify from "./plugins/vuetify";
import router from "./router";
import store from "./store";
import UUID from "vue-uuid";

import "material-design-icons-iconfont/dist/material-design-icons.css";

Vue.config.productionTip = false;

new Vue({
  icons: {
    iconfont: "md"
  },
  vuetify,
  UUID,
  router,
  store,
  render: h => h(App)
}).$mount("#app");
