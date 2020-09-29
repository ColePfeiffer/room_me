import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify';
import router from './router';
import store from './store'
import 'material-design-icons-iconfont/dist/material-design-icons.css';


Vue.config.productionTip = false

//require("./assets/global.css")
//import "@/assets/global.css"

new Vue({
    icons: {
        iconfont: 'md',
      },
    vuetify,
    router,
    store,
    render: h => h(App)
}).$mount('#app')
