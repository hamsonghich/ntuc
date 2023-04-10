
const state = () => ({
  alertConfig: {
    isShow: false,
    typeAlert: 'success',
    textAlert: '',
  },
});

const getters = {
  alertConfig: _state => _state.alertConfig,
}
const actions = {
  _changeAlertConfig({ commit }, _payment) {
    commit('SET_ALERT_CONFIG', _payment)
  },
  handleCloseCreateAlert: ({ commit }, _payment) => {
    commit('SET_ALERT_CONFIG', {
      isShow: false,
      typeAlert: 'success',
      textAlert: ''
    });
  },
}
const mutations = {
  SET_ALERT_CONFIG: (_state, _alertConfig) => {
    _state.alertConfig = _alertConfig
  },
}
export default {
  state,
  getters,
  actions,
  mutations
}
