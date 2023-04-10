import { getAxios, postAxios } from "../services/callApi";
import { postAxiosUpload } from "../services/callApiUpload";
import { EXCEPTION } from "../utils/constants/statusResponse";

export const state = () => ({
  listFileClaims: [],
})

export const getters = {
  listFileClaims: _state => _state.listFileClaims,
}

export const actions = {
  getNewUUID: async ({ commit }) => {
    const resNewUUID = await postAxios({
      "invoke": "System.execute",
      "argc": "2",
      "a0": "getNewUUID"
    });

    if (resNewUUID.data.data[0].dt !== EXCEPTION) {
      return resNewUUID.data.data[0].value
    }

    return null;
  },

  uploadFile: async ({ commit }, _payment) => {
    const resUpload = await postAxiosUpload(_payment);

    if (resUpload.data.files) {
      return resUpload.data.files;
    }

    return null;
  },

  deleteFile: async ({ commit }, _payment) => {
    await getAxios(_payment);
  },

  setListFileClaim: ({ commit }, _payload) => {
    commit('SET_LIST_FILE_CLAIM', _payload);
  },
}

export const mutations = {
  SET_LIST_FILE_CLAIM: (_state, _listFileClaims) => {
    _state.listFileClaims = _listFileClaims;
  },
}

