import Vuex, { createStore, createLogger } from 'vuex'
import orders from './modules/orders'
import clients from './modules/clients'
import axios from 'axios'

const debug = process.env.NODE_ENV !== 'production'

const instance = axios.create({
  baseURL: '/api/v1',
  timeout: 5000,
});

instance.interceptors.response.use(function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response.data.data.data;
  }, function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    localStorage.loggedIn = false;
    if (error.response.status === 401) { // NOT logged in
      location.reload(true);
    }
    return Promise.reject(error);
});

Vuex.Store.prototype.$http = instance;

export default createStore({
  http: "http",
  modules: {
    orders,
    clients,
  },
  strict: debug,
  plugins: debug ? [createLogger()] : []
})
