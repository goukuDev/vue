import Home from './../md/Home.vue';
import Kind from './../md/Kind.vue';
import Cart from './../md/Cart.vue';
import More from './../md/More.vue';
import User from './../md/User.vue';
import Content from './../md/Content.vue';
import Detail from './../md/detail.vue';
import Liebiao from './../md/liebiao.vue';
import Findwords from './../md/findwords.vue';
import Login from './../md/login.vue';
import Buy from './../md/buys.vue';
import Localtion from './../md/localtion.vue';

var  routes = [
  { path: '/home', component: Home },
  { path: '/kind', component: Kind },
	{ path: '/cart', component: Cart },
  { path: '/more', component: More },
  { path: '/user', component: User },
  { path: '/localtion', component: Localtion },
  { path: '/content', component: Content },
  { path: '/detail',component: Detail },
  { path: '/', component: Home },
  { path: '/liebiao',component: Liebiao },
  { path: '/findwords',component: Findwords },
  { path: '/login',component: Login },
  { path: '/login',component: Login },
  { path: '/buys',name:'buys',component: Buy },
]

export default routes;