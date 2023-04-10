import { postAxios } from '../services/callApi'
const state = () => ({
  readerCard: '',
})
const getters = {
  readerCard: _state => _state.readerCard,
}
const actions = {
  async handlereadersCard({ commit }, _payment) {
    const response = await postAxios(_payment)
    let xmlArrRes = response.data.data[0].value
    const readerCard = JSON.parse(xmlArrRes)
    const data = readerCard.data.data.map((item) => {
      return {
        ...item,
        state: item.state == 'Active' ? 'Published' : 'Unpublished'
      }
    })
    commit('SET_READERS', data)
  },
}
const mutations = {
  SET_READERS: (_state, readerCard) => {
    _state.readerCard = readerCard
  },
}
export default {
  state,
  getters,
  actions,
  mutations
}
