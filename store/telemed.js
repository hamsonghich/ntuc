import { postAxios } from '../services/callApi'


const state = () => ({
});

const getters = {
}
const actions = {
  async _getLink({ commit }, _payment) {
    const res = await postAxios(_payment);
    if(JSON.parse(res.data.data[0].value).link){
      return [true,JSON.parse(res.data.data[0].value).link];
    }else{
      return [false,JSON.parse(res.data.data[0].value).ValidateMessage];
    }
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
