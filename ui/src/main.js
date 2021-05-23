import { createApp } from 'vue'
import store from './store'
import App from './App.vue'
import { svgSpriteDirectivePlugin } from 'vue-svg-sprite'


const app = createApp(App)
app.use(store);
app.use(svgSpriteDirectivePlugin, {
  url: require('./assets/img/sprite.svg')
} /* options */)
app.mount('#app')
