import Vue from 'vue';
import VueRouter from 'vue-router';
import './scss/main.scss'
import MintUI from 'mint-ui'
import 'mint-ui/lib/style.css'

Vue.use(MintUI)
Vue.use(VueRouter);

import App from './md/App.vue';
import routes from './routes/routes.js';

var  router=new VueRouter({
    routes
})

new Vue({
    router:router,
    el:'#app',
    components:{
        'v-app':App
    }
})