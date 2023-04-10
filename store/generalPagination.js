import { postAxios } from '../services/callApi';
import { EXCEPTION } from '../utils/constants/statusResponse';
import { PAGINATE_10 } from '../utils/constants/paginate.js';

const state = () => ({
  list: [],
  listAll: 0,
  listPageCount: 1,
  currentPage: 1,
  listCountPage: 0
});

const getters = {
  currentPage: _state => _state.currentPage,
  listCountPage: _state => _state.listCountPage,
  list: _state => _state.list,
  listAll: _state => _state.listAll,
  listPageCount: _state => _state.listPageCount
};

const mutations = {
  SET_LIST_ALL: (_state, _listAll) => {
    _state.listAll = _listAll;
  },
  SET_LIST: (_state, _list) => {
    _state.list = _list;
  },
  SET_CURRENT_PAGE: (_state, _currentPage) => {
    _state.currentPage = _currentPage;
  },
  SET_PAGE_COUNT: (_state, _listPageCount) => {
    _state.listPageCount = _listPageCount;
  },
  SET_COUNT_PAGE: (_state, _listCountPage) => {
    _state.listCountPage = _listCountPage;
  },
};

const actions = {
  getList: async (_store, _payload) => {
    const resList = await postAxios(_payload);
    if (resList.data.data[0].dt !== EXCEPTION) {
      _store.commit('SET_LIST_ALL', [...JSON.parse(resList.data.data[0].value).data.data]);
      _store.commit(
        'SET_LIST',
        [...JSON.parse(resList.data.data[0].value).data.data].slice(0, PAGINATE_10.pageRange)
      );
      _store.commit(
        'SET_PAGE_COUNT',
        JSON.parse(resList.data.data[0].value).data.count%PAGINATE_10.pageRange  ? Math.floor(JSON.parse(resList.data.data[0].value).data.count/PAGINATE_10.pageRange ) + 1 : JSON.parse(resList.data.data[0].value).data.count/PAGINATE_10.pageRange
      );
      _store.commit(
        'SET_COUNT_PAGE',
        JSON.parse(resList.data.data[0].value).data.count
      );
    }
    return JSON.parse(resList.data.data[0].value).data.data.filter(el => el.state == '33');
  },
  handleCurrentPage: async (_store, page) => {
    _store.commit('SET_CURRENT_PAGE', page);
  }
};
export default {
  state,
  getters,
  actions,
  mutations
};
