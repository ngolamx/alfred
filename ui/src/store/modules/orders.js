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
  },
  async updateOrder ({ commit }, payload) {
    const order = await axios.patch(`/api/v1/orders/${payload.id}`, {
      [payload.key]: payload.value
    });
    commit('updateOrder', order.data.data.data)
  }
}

// mutations
const mutations = {
  setOrders (state, orders) {
    state.all = orders
  },
  updateOrder(state, data) {
    const order = state.all.find(item => item._id === data._id)
    Object.assign(order, data);
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
