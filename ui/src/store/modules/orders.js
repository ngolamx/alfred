const state = () => ({
  all: []
})

// getters
const getters = {}

// actions
const actions = {
  async getAllOrders ({ commit }) {
    const orders = await this.$http('/orders')
    commit('setOrders', orders)
  },
  async createOrder ({ commit }, payload) {
    const order = await this.$http.post('/orders', payload.data)
    commit('pushOrder', order)
    return order;
  },
  async updateOrder ({ commit }, payload) {
    const order = await this.$http.patch(`/orders/${payload.id}`, payload.data);
    commit('updateOrder', order)
  },
  async deleteOrder ({ commit }, payload) {
    await this.$http.delete(`/orders/${payload.id}`);
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
  pushOrder(state, data) {
    state.all.unshift(data)
  },
  deleteOrder(state, id) {
    const index = state.all.findIndex(item => item._id === id)
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
