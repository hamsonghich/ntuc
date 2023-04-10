import { postAxios } from '../services/callApi';
import { handleListCallApi } from "../utils/functions/handleListCallApi";
import { EXCEPTION } from '../utils/constants/statusResponse';
const state = () => ({
  dataContactUs: [],
  dataPayload: [],
  dataShow:[],
});
const getters = {
  dataContactUs: _state => _state.dataContactUs,
  dataPayload: _state => _state.dataPayload,
  dataShow: _state => _state.dataShow,
}
const actions = {
  async getDataContactUs({ commit }, _payment){
    const response = await postAxios(_payment)
    if(response.data.data[0].dt !== EXCEPTION){
      commit('SET_DATA_CONTACT_US', JSON.parse(response.data.data[0].value))
    }
    if(response.data.data[1].dt == 'rs'){
      commit('SET_DATA_PAYLOAD', handleListCallApi(
        [...response.data.data[1].colNames],
        [...response.data.data[1].rows]
      ))
    }
    if(response.data.data[2].dt == 'rs'){
      commit('SET_DATA_SHOW', handleListCallApi(
        [...response.data.data[2].colNames],
        [...response.data.data[2].rows]
      ))
    }
  }
}
const mutations = {
  SET_DATA_CONTACT_US:(_state, dataContactUs) => {
    _state.dataContactUs = dataContactUs
  },
  SET_DATA_PAYLOAD: (_state, dataPayload) => {
    _state.dataPayload = dataPayload
  },
  SET_DATA_SHOW:(_state, dataShow) => {
    _state.dataShow = dataShow
  },
}
export default {
  state,
  getters,
  actions,
  mutations
}