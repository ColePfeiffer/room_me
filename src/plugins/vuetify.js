import Vue from 'vue';
import Vuetify from 'vuetify/lib';
import '@mdi/font/css/materialdesignicons.css';

Vue.use(Vuetify);

export default new Vuetify({
    iconfont: 'md',
    theme: {
        darkblue: '#241c24',
        green: "#315458",
        orange: '#B1493C',
    }
});
