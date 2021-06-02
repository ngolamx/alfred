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
  },
  async deleteOrder ({ commit }, payload) {
    await axios.delete(`/api/v1/orders/${payload.id}`);
    commit('deleteOrder', payload.id)
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
  },
  deleteOrder(state, data) {
    const index = state.all.findIndex(item => item._id === data._id)
    state.all.splice(index, 1);
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
