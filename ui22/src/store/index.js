import Vue from 'vue'
import Vuex from 'vuex'
import orders from './modules/orders'
import clients from './modules/clients'
import axios from 'axios'
import { createLogger } from 'vuex'

Vue.use(Vuex)

const debug = process.env.NODE_ENV !== 'production'

const instance = axios.create({
  baseURL: '/api/v1',
  timeout: 5000,
});

instance.interceptors.response.use(function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    if (response.data)
      return response.data.data.data;
    return response;
  }, function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    if (error.response.status === 401) { // NOT logged in
      localStorage.loggedIn = false;
      location.reload(true);
    }
    return Promise.reject(error.response.data);
});

Vuex.Store.prototype.$http = instance;

export default new Vuex.Store({
  http: "http",
  modules: {
    orders,
    clients,
  },
  strict: debug,
  plugins: debug ? [createLogger()] : []
})
