const state = () => ({
  all: []
})

// getters
const getters = {

}

// actions
const actions = {
  async getAllClients ({ commit }) {
    const clients = await this.$http('/clients')
    commit('setClients', clients)
  },
  async createClient ({ commit }, payload) {
    const client = await this.$http.post('/clients', payload.data)
    commit('pushClient', client)
    return client
  },
  async updateClient ({ commit }, payload) {
    const order = await this.$http.patch(`/clients/${payload.id}`, {
      [payload.key]: payload.value
    });
    commit('updateClient', order)
  },
  async deleteClient ({ commit }, payload) {
    await this.$http.delete(`/clients/${payload.id}`);
    commit('deleteClient', payload.id)
  }
}

// mutations
const mutations = {
  setClients (state, clients) {
    state.all = clients
  },
  updateClient(state, data) {
    const order = state.all.find(item => item._id === data._id)
    Object.assign(order, data);
  },
  pushClient(state, data) {
    state.all.unshift(data)
  },
  deleteClient(state, id) {
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
