import axios from 'axios'
const state = () => ({
  all: []
})

// getters
const getters = {}

// actions
const actions = {
  async getAllOrders ({ commit }) {
    const orders = await axios('/api/v1/orders')
    commit('setOrders', orders.data.data.data)
  }
}

// mutations
const mutations = {
  setOrders (state, orders) {
    state.all = orders
  },
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
