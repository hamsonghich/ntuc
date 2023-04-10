const state = () => ({
  listCurrency: [],
  listCategory: [],
  listInsuredEntity: []
})

const getters = {
  listCurrency: _state => _state.listCurrency,
  listCategory: _state => _state.listCategory,
  listInsuredEntity: _state => _state.listInsuredEntity
}

const mutations = {
  SET_LIST_CURRENCY(_state, payload) {
    _state.listCurrency = payload
  },
  SET_LIST_CATEGORY(_state, payload) {
    _state.listCategory = payload
  },
  SET_LIST_INSURED_ENTITY(_state, payload) {
    _state.listInsuredEntity = payload
  }
}
const actions = {
  handleListCurrency({ commit }, payload) {
    commit('SET_LIST_CURRENCY', payload)
  },
  handleListCategory({ commit }, payload) {
    commit('SET_LIST_CATEGORY', payload)
  },
  handleListInsuredEntity({ commit }, payload) {
    commit('SET_LIST_INSURED_ENTITY', payload)
  },
}

export default {
  state,
  getters,
  actions,
  mutations
}
