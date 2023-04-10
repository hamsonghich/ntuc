import { postAxios } from "../services/callApi";
import { EXCEPTION } from "../utils/constants/statusResponse";
import { PAGINATE_10 } from '../utils/constants/paginate.js';
import { handleListCallApi, handleListCallApiDataToArray } from "../utils/functions/handleListCallApi";

const state = {
  logDetail: [],
  listLOG: [],
  step: 1.1,
  isFilterClaim: false,
  dataClaims: 0,
  colNameClaims: [],
  listClaims: [],
  currentPageClaim: 1,
  listClaimants: [],
  listClaimantsLog: [],
  listStatus: [],
  listHospital: [],
  listCurrency: [],
  listPolicy: [],
  isLoadingLog: false,
  isCreateLog: 1,
  log: {},
  listPolicyClaimType: [],
  listPolicyClaimReason: [],
  isCancelLog: 1,
  listEligibleDependant: [],
  listSurgery: [],
  isEdit: false,
  listEmployee: [],
  linkPrint: '',
  claimName: [],
  isEdited: false,
  listAdmissionType: [],
  listWardType: []
}

const getters = {
  getLogDetail: _state => _state.logDetail,
  getListLOG: _state => _state.listLOG,
  step: (_state) => _state.step,
  isFilterClaim: (_state) => _state.isFilterClaim,
  dataClaims: (_state) => _state.dataClaims,
  colNameClaims: (_state) => _state.colNameClaims,
  listClaims: (_state) => _state.listClaims,
  currentPageClaim: (_state) => _state.currentPageClaim,
  listClaimants: (_state) => _state.listClaimants,
  listClaimantsLog: (_state) => _state.listClaimantsLog,
  listStatus: (_state) => _state.listStatus,
  listCurrency: (_state) => _state.listCurrency,
  listHospital: (_state) => _state.listHospital,
  listPolicy: (_state) => _state.listPolicy,
  isLoadingLog: (_state) => _state.isLoadingLog,
  isCreateLog: (_state) => _state.isCreateLog,
  log: (_state) => _state.log,
  listPolicyClaimType: (_state) => _state.listPolicyClaimType,
  listPolicyClaimReason: (_state) => _state.listPolicyClaimReason,
  isCancelLog: (_state) => _state.isCancelLog,
  listEligibleDependant: (_state) => _state.listEligibleDependant,
  listSurgery: (_state) => _state.listSurgery,
  listEmployee: (_state) => _state.listEmployee,
  getIsEdit: _state => _state.isEdit,
  dataClaims: (_state) => _state.dataClaims,
  linkPrint: _state => _state.linkPrint,
  claimName: _state => _state.claimName,
  isEdited: _state => _state.isEdited,
  listAdmissionType: (_state) => _state.listAdmissionType,
  listWardType: (_state) => _state.listWardType,
}

const actions = {
  setLogDetail({ commit }, payload) {
    commit('setLogDetail', payload)
  },
  setListLog({ commit }, payload) {
    commit('setListLog', payload)
  },
  changeStep: async ({ commit }, _payment) => {
    commit('SET_STEP', _payment);
  },
  changeInformation: async ({ commit }, _payment) => {
    const res = await postAxios(_payment);
    commit('SET_INFORMATION', JSON.parse(res.data.data[0].value));
  },
  toggleIsFilterClaim: async ({ commit }, _payment) => {
    commit('SET_IS_FILTER_CLAIM', _payment);
  },
  getListClaim: async ({ commit }, _payment) => {
    const resListClaim = await postAxios(_payment);

    if (resListClaim.data.data[0].dt !== EXCEPTION) {
      commit('SET_DATA_CLAIMS', handleListCallApi(
        [...resListClaim.data.data[0].colNames],
        [...resListClaim.data.data[0].rows],
      ));
      commit('SET_LIST_CLAIMS', handleListCallApi(
        [...resListClaim.data.data[0].colNames],
        [...resListClaim.data.data[0].rows].slice(0, PAGINATE_10.pageRange),
      ));
    }
  },
  handleCurrentPage: async ({ commit, getters }, _payment) => {
    commit('SET_CURRENT_PAGE_CLAIMS', _payment);
    commit('SET_LIST_CLAIMS',
      [...getters.dataClaims].slice((_payment - 1) * PAGINATE_10.pageRange, _payment * PAGINATE_10.pageRange),
    );
  },
  getListClaimant: async ({ commit }, _payment) => {
    try {
      const resListClaimant = await postAxios(_payment);
      if (resListClaimant.data.data[0].dt !== EXCEPTION) {
        commit('SET_LIST_CLAIMANTS', handleListCallApi(
          [...resListClaimant.data.data[0].colNames],
          [['null', 'Self'], ...resListClaimant.data.data[0].rows],
        ));
      }
    } catch (error) {
    }
  },

    getListClaimantLogLog: async ({ commit }, _payment) => {
    try {
      const resListClaimant = await postAxios(_payment);
      if (resListClaimant.data.data[0].dt !== EXCEPTION) {
        commit('SET_LIST_CLAIMANTS_LOG', handleListCallApi(
          [...resListClaimant.data.data[0].colNames],
          [['null', 'Self'], ...resListClaimant.data.data[0].rows],
        ));
      }
    } catch (error) {
    }
  },

  clearListClaimant: async ({ commit }) => {
    try {
      commit('SET_LIST_CLAIMANTS', []);
    } catch (error) {
    }

  },
  getListClaimantLog: async ({ commit }, _payment) => {
    const resListClaimant = await postAxios(_payment);

    if (resListClaimant.data.data[0].dt !== EXCEPTION) {
      commit('SET_LIST_CLAIMANTS', [
        ...handleListCallApiDataToArray(resListClaimant.data.data[0].value),
        { id: 'null', name: 'Self' },
      ]);
    }
  },
  getListStatus: async ({ commit }, _payment) => {
    const resListClaimant = await postAxios(_payment);

    if (resListClaimant.data.data[0].dt !== EXCEPTION) {
      commit('SET_LIST_STATUS', handleListCallApi(
        [...resListClaimant.data.data[0].colNames],
        [...resListClaimant.data.data[0].rows],
      ));
    }
  },

  getListHospital: async ({ commit }, _payment) => {
    const resListHospital = await postAxios(_payment);

    if (resListHospital.data.data[0].dt !== EXCEPTION) {
      commit('SET_LIST_HOSPITAL', handleListCallApi(
        [...resListHospital.data.data[0].colNames],
        [...resListHospital.data.data[0].rows],
      ));
    }
  },

  getListCurrency: async ({ commit }, _payment) => {
    const resListCurrency = await postAxios(_payment);

    if (resListCurrency.data.data[0].dt !== EXCEPTION) {
      commit('SET_LIST_CURRENCY', handleListCallApi(
        [...resListCurrency.data.data[0].colNames],
        [...resListCurrency.data.data[0].rows],
      ));
    }
  },

  createLog: async ({ commit }, _payment) => {
    const resCreateLog = await postAxios(_payment);
    if (resCreateLog.data.data[0].dt !== EXCEPTION) {
      commit('SET_IS_CREATE_LOG', 2);
      return resCreateLog.data.data[0];
    } else {
      commit('SET_IS_CREATE_LOG', 3);
      return resCreateLog.data.data[0].value;
    }
  },
  editLog: async ({ commit }, _payment) => {
    const editLog = await postAxios(_payment);
  },

  changeLog: async ({ commit }, _payment) => {
    commit('SET_LOG', _payment);
  },

  getListPolicy: async ({ commit }, _payment) => {
    const resListPolicy = await postAxios(_payment);

    if (!_payment.a1.isListPolicyClaim && resListPolicy.data.data[0].dt !== EXCEPTION) {
      commit('SET_LIST_POLICY', handleListCallApiDataToArray(resListPolicy.data.data[0].value));
    } else {
      commit('SET_LIST_POLICY', JSON.parse(resListPolicy.data.data[0].value));
    }
  },
  getClaimName: async ({ commit }, _payment) => {
    const resListPolicy = await postAxios(_payment);

    if (resListPolicy.data.data[0].dt !== EXCEPTION) {
      commit('SET_CLAIM_NAME', [
        ...handleListCallApiDataToArray(resListPolicy.data.data[0].value),
        { id: 'null', name: 'Self' },
      ]);
    }
  },

  getListPolicyClaimType: async ({ commit }, _payment) => {
    const resListPolicyClaimType = await postAxios(_payment);

    if (resListPolicyClaimType.data.data[0].dt !== EXCEPTION) {
      commit('SET_LIST_POLICY_CLAIM_TYPE', handleListCallApiDataToArray(resListPolicyClaimType.data.data[0].value));
    }
  },

  getListPolicyClaimReason: async ({ commit }, _payment) => {
    const resListPolicyClaimReason = await postAxios(_payment);

    if (resListPolicyClaimReason.data.data[0].dt !== EXCEPTION) {
      commit('SET_LIST_POLICY_CLAIM_REASON', handleListCallApi(
        [...resListPolicyClaimReason.data.data[0].colNames],
        [...resListPolicyClaimReason.data.data[0].rows, ['null', 'Others']],
      ));
    }
  },

  cancelLog: async ({ commit }, _payment) => {
    const resListPolicyClaimReason = await postAxios(_payment);

    if (resListPolicyClaimReason.data.data[0].dt !== EXCEPTION) {
      commit('SET_IS_CANCEL_LOG', 2);
    } else {
      commit('SET_IS_CANCEL_LOG', 3);
    }
  },

  changeIsCancelLog: async ({ commit }, _payment) => {
    commit('SET_IS_CANCEL_LOG', _payment);
  },

  getLog: async ({ commit }, _payment) => {
    const resLog = await postAxios(_payment);

    if (resLog.data.data[0].dt !== EXCEPTION) {
      commit('SET_LOG', {
        ...JSON.parse(resLog.data.data[0].value)[0],
        files: JSON.parse(resLog.data.data[0].value)[1],
      });
    }
  },

  getListEligibleDependant: async ({ commit }, _payment) => {
    const resListEligibleDependant = await postAxios(_payment);

    if (resListEligibleDependant.data.data[0].dt !== EXCEPTION) {
      commit('SET_LIST_ELIGIBLE_DEPENDANT', [
        ...handleListCallApiDataToArray(resListEligibleDependant.data.data[0].value),
        { id: 'null', name: 'Self' },
      ]);
    }
  },

  getListSurgery: async ({ commit }, _payment) => {
    const resListSurgery = await postAxios(_payment);

    if (resListSurgery.data.data[0].dt !== EXCEPTION) {
      commit('SET_LIST_SURGERY', handleListCallApi(
        [...resListSurgery.data.data[0].colNames],
        [...resListSurgery.data.data[0].rows],
      ));
    }
  },

  getListEmployee: async ({ commit }, _payment) => {
    const resListEmployee = await postAxios(_payment);

    if (resListEmployee.data.data[0].dt !== EXCEPTION) {
      commit('SET_LIST_EMPLOYEE', handleListCallApi(
        [...resListEmployee.data.data[0].colNames],
        [...resListEmployee.data.data[0].rows],
      ));
    }
  },
  getIsEdit: async ({ commit }, _payment) => {
    commit('SET_IS_EDIT', _payment)
  },
  searchListLog: async ({ commit }, _payment) => {
    const resListEmployee = await postAxios(_payment);
  },
  getLinkPrint: async ({ commit }, _payment) => {
    const resDataPrint = await postAxios(_payment);

    if (resDataPrint.data.data[0].dt !== EXCEPTION) {
      const uri = `${process.env.API_URL}/out/report.pdf?invoke=System.execute&argc=3&a0=report.print&a1=${JSON.stringify(JSON.parse(resDataPrint.data.data[0].value).report_data)}`;
      const encoded = encodeURI(uri);

      window.open(encoded);
    }
  },
  filterLog: ({ commit }, _payment) => {
    commit('setListLog', _payment)
  },
  setIsEdited: ({ commit }, _payment) => {
    commit('SET_IS_EDITED', _payment)
  },
  setListAdmissionType: async ({ commit }, _payment) => {
    const resListClaimant = await postAxios(_payment);
    if (resListClaimant.data.data[0].dt !== EXCEPTION) {
      commit('SET_LIST_ADMISSION_TYPE', handleListCallApi(
        [...resListClaimant.data.data[0].colNames],
        [...resListClaimant.data.data[0].rows],
      ));
    }
  },
  setListWardType: async ({ commit }, _payment) => {
    const resListClaimant = await postAxios(_payment);
    if (resListClaimant.data.data[0].dt !== EXCEPTION) {
      commit('SET_LIST_WARD_TYPE', handleListCallApi(
        [...resListClaimant.data.data[0].colNames],
        [...resListClaimant.data.data[0].rows],
      ));
    }
  }
}
const mutations = {
  SET_LIST_WARD_TYPE: (_state, payment) => {
    _state.listWardType = payment
  },
  SET_LIST_ADMISSION_TYPE: (_state, _payment) => {
    _state.listAdmissionType = _payment
  },
  SET_IS_EDITED(state, payload) {
    state.isEdited = payload
  },
  setLogDetail(state, payload) {
    state.logDetail = payload
  },
  setListLog(state, payload) {
    state.listLOG = payload
  },
  SET_STEP: (_state, _step) => {
    _state.step = _step;
  },
  SET_IS_FILTER_CLAIM: (_state, _isFilterClaim) => {
    _state.isFilterClaim = _isFilterClaim;
  },
  SET_DATA_CLAIMS: (_state, _dataClaims) => {
    _state.dataClaims = _dataClaims;
  },
  SET_LIST_CLAIMS: (_state, _listClaims) => {
    _state.listClaims = _listClaims;
  },
  SET_CURRENT_PAGE_CLAIMS: (_state, _currentPageClaim) => {
    _state.currentPageClaim = _currentPageClaim;
  },
  SET_LIST_CLAIMANTS: (_state, _listClaimants) => {
    _state.listClaimants = _listClaimants;
  },
   SET_LIST_CLAIMANTS_LOG: (_state, _listClaimantsLog) => {
    _state.listClaimantsLog = _listClaimantsLog;
  },
  SET_LIST_STATUS: (_state, _listStatus) => {
    _state.listStatus = _listStatus;
  },
  SET_LIST_HOSPITAL: (_state, _listHospital) => {
    _state.listHospital = _listHospital;
  },
  SET_LOG: (_state, _log) => {
    _state.log = _log;
  },
  SET_IS_LOADING_LOG: (_state, _isLoadingLog) => {
    _state.isLoadingLog = _isLoadingLog;
  },
  SET_IS_CREATE_LOG: (_state, _isCreateLog) => {
    _state.isCreateLog = _isCreateLog;
  },
  SET_LIST_CURRENCY: (_state, _listCurrency) => {
    _state.listCurrency = _listCurrency;
  },
  SET_LIST_POLICY: (_state, _listPolicy) => {
    _state.listPolicy = _listPolicy;
  },
  SET_LIST_POLICY_CLAIM_TYPE: (_state, _listPolicyClaimType) => {
    _state.listPolicyClaimType = _listPolicyClaimType;
  },
  SET_LIST_POLICY_CLAIM_REASON: (_state, _listPolicyClaimReason) => {
    _state.listPolicyClaimReason = _listPolicyClaimReason;
  },
  SET_IS_CANCEL_LOG: (_state, _isCancelLog) => {
    _state.isCancelLog = _isCancelLog;
  },
  SET_LIST_ELIGIBLE_DEPENDANT: (_state, _listEligibleDependant) => {
    _state.listEligibleDependant = _listEligibleDependant;
  },
  SET_LIST_SURGERY: (_state, _listSurgery) => {
    _state.listSurgery = _listSurgery;
  },
  SET_LIST_EMPLOYEE: (_state, _listEmployee) => {
    _state.listEmployee = _listEmployee;
  },
  SET_IS_EDIT: (_state, isEdit) => {
    _state.isEdit = isEdit
  },
  SET_DATA_CLAIMS: (_state, _dataClaims) => {
    _state.dataClaims = _dataClaims;

  },
  SET_LINK_PRINT: (_state, _linkPrint) => {
    _state.linkPrint = _linkPrint
  },
  SET_CLAIM_NAME: (_state, _claimName) => {
    _state.claimName = _claimName
  }
}
export default {
  state,
  getters,
  actions,
  mutations
}
