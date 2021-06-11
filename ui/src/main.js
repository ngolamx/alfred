import { createApp } from 'vue/dist/vue.esm-bundler'
import store from './store'
import { createRouter, createWebHashHistory } from 'vue-router';
import App from './App.vue'
import Login from './components/Login.vue';
import { svgSpriteDirectivePlugin } from 'vue-svg-sprite'

const routes = [
  { path: '/', name: 'App', component: App },
  { path: '/login', name: 'Login', component: Login }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes,
})

router.beforeEach((to, from, next) => {
 if (to.name !== 'Login' && !(sessionStorage.loggedIn === 'true')) next({ name: 'Login' })
 else next()
})


const app = createApp({})
app.use(store);
app.use(router);
app.use(svgSpriteDirectivePlugin, {
  url: require('./assets/img/sprite.svg')
} /* options */)
app.mount('#app')
