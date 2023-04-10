import { postAxios } from '../services/callApi'
const state = () => ({
  resetPassword: [],
  changeUserID: []
});
const getters = {
  resetPassword: _state => _state.resetPassword,
  changeUserID: _state => _state.changeUserID,
}
const mutations = {
  SET_RESET_PASSWORD: (_state, resetPassword) => {
    _state.resetPassword = resetPassword
  },
  SET_CHANGE_USERID: (_state, changeUserID) => {
    _state.changeUserID = changeUserID
  },
}
const actions = {
  async fetchresetPassword({ commit }, _payment) {
    const response = await postAxios(_payment)
    commit('SET_RESET_PASSWORD', response.data.data[0])
  },
  async fetchchangeUserid({ commit }, _payment) {
    const response = await postAxios(_payment)
    commit('SET_CHANGE_USERID', response.data.data[0])
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
