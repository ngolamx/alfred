import Vue from 'vue'
import App from './App.vue'
import Home from './components/Home.vue'
import VueRouter from 'vue-router'
import ClientManager from './components/ClientManager.vue'
import OrderManager from './components/OrderManager.vue'
import Login from './components/Login.vue';
import SvgSprite from 'vue-svg-sprite';
import vSelect from 'vue-select'
import VCalendar from 'v-calendar';
import store from './store'

Vue.config.productionTip = false

const routes = [
  { path: '/login', name: 'Login', component: Login },
  { path: '/', component: Home,
    children: [
      { path: '', component: OrderManager },
      { path: '/orders', name: 'Orders', component: OrderManager },
      { path: '/clients', name: 'Client', component: ClientManager }
    ]
  }
]

const router = new VueRouter({
  routes // short for `routes: routes`
})

router.beforeEach((to, from, next) => {
 if (to.name !== 'Login' && !(localStorage.loggedIn === 'true')) next({ name: 'Login' })
 else next()
})

Vue.use(VueRouter)
Vue.component('v-select', vSelect)
Vue.use(VCalendar, {
  datePicker: {
    popover: {
      visibility: 'focus'
    }
 }
});

Vue.use(SvgSprite, {
  url: require('./assets/img/sprite.svg')
});


new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
