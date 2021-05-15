import { createStore, createLogger } from 'vuex'
import orders from './modules/orders'

const debug = process.env.NODE_ENV !== 'production'

export default createStore({
  modules: {
    orders,
  },
  strict: debug,
  plugins: debug ? [createLogger()] : []
})
