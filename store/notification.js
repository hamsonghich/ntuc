import notificationService from '~/services/InboxMessage/notificationService'
import { postAxios } from '../services/callApi';
import { EXCEPTION } from '../utils/constants/statusResponse';

export const state = () => ({
  entitiesTemplate: [],
  entitiesFilterTemplate: [],
  page:1,
  currentTemplate: null,
  filterOption: {
    searchText: null,
    totalPage: 0,
    curPage: 1,
    perPage: 5
  },
  isDisplay:true,
});

export const getters = {
  entitiesTemplate: _state => _state.entitiesTemplate,
  entitiesFilterTemplate: _state => _state.entitiesFilterTemplate,
  currentTemplate: _state => _state.currentTemplate,
  filterOption: _state => _state.filterOption,
  isDisplay: _state => _state.isDisplay,
  page: _state => _state.page
}


export const mutations = {
  SET_ENTITIES_TEMPLATE(_state, payload) {
    _state.entitiesTemplate = payload;
  },
  SET_ENTITIES_FILTER_TEMPLATE(_state, payload) {
    _state.entitiesFilterTemplate = payload;
  },
  SET_CURRENT_TEMPLATE(_state, payload) {
    _state.currentTemplate = payload;
  },
  SET_FILTER_OPTION(_state, payload) {
    _state.filterOption = payload;
  },
  SET_DISPLAY(_state, payload) {
    _state.isDisplay = payload;
  },
  SET_PAGE(_state, payload) {
    _state.page = payload;
  },
};


export const actions = {

  async handleFetchAllEntitiesTemplate({ commit, dispatch }, payload) {
    try {
      await notificationService.fetchAllNotification().then(async res => {
        let xmlArrRes = res.data.data[0]
        if (xmlArrRes.value) {
          const notificationTemplates = JSON.parse(xmlArrRes.value);
          commit('SET_ENTITIES_TEMPLATE', notificationTemplates);
        }
      })
    } catch (e) {

    }

  },

  async handleSetCurrentTemplate({ commit }, payload) {
    commit('SET_CURRENT_TEMPLATE', payload);
  },
  async handleSetisDisplay({ commit }, payload) {
    commit('SET_DISPLAY', payload);
  },
  async handleSetPage({ commit }, payload) {
    commit('SET_PAGE', payload);
  },

  async handleUpdateStatusNotification({ commit }, notificationId) {
    try {
      await notificationService.updateStatusNotification(notificationId)
    } catch (e) {

    }

  },

  getBroker: async ({ commit }, _payment) => {
    const resBroker = await postAxios(_payment);

    if (resBroker.data.data[0].dt !== EXCEPTION) {
      return JSON.parse(resBroker.data.data[0].value);
    }

    return null;
  },
}

