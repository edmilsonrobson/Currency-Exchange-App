import Vue from 'vue'
import App from './App.vue'
import KonamiCode from 'vue-konami-code'
import swal from 'sweetalert'

new Vue({
    el: '#app',
    render: h => h(App)
});

Vue.use(KonamiCode, {
    callback: function () {
        swal('Snake? Snake!? Snaaaake!', "You're awesome!", 'success');
    }
});