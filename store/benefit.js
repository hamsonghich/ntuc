import { postAxios } from "../services/callApi";
import { EXCEPTION } from "../utils/constants/statusResponse";
import { handleListCallApi, handleListCallApiDataToArray } from "../utils/functions/handleListCallApi";

export const state = () => ({
  healthDeclarationStep: 1,
  showDetailAll: false,
  isClickSaveAsDraft: false,
  isClickSaveAsDraftSuccess: false,
  selectionListing: {},
  isClickConfirm: false,
  isClickConfirmSuccess: false,
  isCheckHDF: false,
  isReset: false,
  listDependent: [],
  listCompulsory: [],
  pageStored:1,
})

export const getters = {
  healthDeclarationStep: (_state) => _state.healthDeclarationStep,
  showDetailAll: (_state) => _state.showDetailAll,
  isClickSaveAsDraft: (_state) => _state.isClickSaveAsDraft,
  isClickSaveAsDraftSuccess: (_state) => _state.isClickSaveAsDraftSuccess,
  selectionListing: (_state) => _state.selectionListing,
  isClickConfirm: (_state) => _state.isClickConfirm,
  isClickConfirmSuccess: (_state) => _state.isClickConfirmSuccess,
  isCheckHDF: (_state) => _state.isCheckHDF,
  isReset: (_state) => _state.isReset,
  listDependent: (_state) => _state.listDependent,
  listCompulsory: (_state) => _state.listCompulsory,
  pageStored: (_state) => _state.pageStored
}

export const mutations = {
  SET_HD_STEP: (_state, _step) => {
    _state.healthDeclarationStep = _step;
  },
  SET_SHOW_DETAIL_ALL: (_state, _showDetailAll) => {
    _state.showDetailAll = _showDetailAll;
  },
  SET_IS_CLICK_SAVE_DRAFT: (_state, _isClickSaveAsDraft) => {
    _state.isClickSaveAsDraft = _isClickSaveAsDraft;
  },
  SET_IS_CLICK_SAVE_DRAFT_SUCCESS: (_state, _isClickSaveAsDraftSuccess) => {
    _state.isClickSaveAsDraftSuccess = _isClickSaveAsDraftSuccess;
  },
  SET_SELECTION_LISTING: (_state, _selectionListing) => {
    _state.selectionListing = _selectionListing;
  },
  SET_IS_CLICK_CONFIRM: (_state, _isClickConfirm) => {
    _state.isClickConfirm = _isClickConfirm;
  },
  SET_IS_CLICK_CONFIRM_SUCCESS: (_state, _isClickConfirmSuccess) => {
    _state.isClickConfirmSuccess = _isClickConfirmSuccess;
  },
  SET_IS_CHECK_HDF: (_state, _isCheckHDF) => {
    _state.isCheckHDF = _isCheckHDF;
  },
  SET_IS_RESET: (_state, _isReset) => {
    _state.isReset = _isReset;
  },
  SET_LIST_DEPENDENT: (_state, payload) => {
    _state.listDependent = payload;
  },
  SET_LIST_COMPULSORY: (_state, _listCompulsory) => {
    _state.listCompulsory = _listCompulsory;
  },
  SET_PAGE: (_state,payload) => {
    _state.pageStored = payload
  }
}

export const actions = {
  changeHealthDeclarationStep: async ({ commit }, payload) => {
    commit('SET_HD_STEP', payload);
  },
  _showDetailAll: async ({ commit }, payload) => {
    commit('SET_SHOW_DETAIL_ALL', payload);
  },
  _isClickSaveAsDraft: async ({ commit }, payload) => {
    commit('SET_IS_CLICK_SAVE_DRAFT', payload);
  },
  _isClickSaveAsDraftSuccess: async ({ commit }, payload) => {
    commit('SET_IS_CLICK_SAVE_DRAFT_SUCCESS', payload);
  },
  _selectionListing: async ({ commit }, payload) => {
    commit('SET_SELECTION_LISTING', payload);
  },
  _isClickConfirm: async ({ commit }, payload) => {
    commit('SET_IS_CLICK_CONFIRM', payload);
  },
  _isClickConfirmSuccess: async ({ commit }, payload) => {
    commit('SET_IS_CLICK_CONFIRM_SUCCESS', payload);
  },
  _isCheckHDF: async ({ commit }, payload) => {
    commit('SET_IS_CHECK_HDF', payload);
  },
  _isReset: async ({ commit }, payload) => {
    commit('SET_IS_RESET', payload);
  },
  setListCompulsory: async ({ commit }, payload) => {
    commit('SET_LIST_COMPULSORY', payload);
  },
  setPageStored:({commit}, payload) => {
    commit('SET_PAGE_STORED', payload);
  },
  getClaimateList: async ({ commit }, payload) => {
    const resGetClaimateList = await postAxios(payload);

    if (resGetClaimateList.data.data[0].dt !== EXCEPTION) {
      return handleListCallApi(
        [...resGetClaimateList.data.data[0].colNames],
        [...resGetClaimateList.data.data[0].rows]
      )
    }

    return [];
  },
  getEmpPersonalDetails: async ({ commit }, payload) => {
    const resGetEmpPersonalDetails = await postAxios(payload);

    if (resGetEmpPersonalDetails.data.data[0].dt !== EXCEPTION) {
      return JSON.parse(resGetEmpPersonalDetails.data.data[3].value);
    }

    return [];
  },
  listOptions: async ({ commit }, payload) => {
    const resListOptions = await postAxios(payload);

    if (resListOptions.data.data[0].dt !== EXCEPTION) {
      return handleListCallApi(
        [...resListOptions.data.data[0].colNames],
        [...resListOptions.data.data[0].rows]
      )
    }

    return [];
  },
  getSelectionListing: async ({ commit }, payload) => {
    const resGetSelectionListing = await postAxios(payload);

    if (resGetSelectionListing.data.data[0].dt !== EXCEPTION) {
      return JSON.parse(resGetSelectionListing.data.data[0].value);
    }

    return null;
  },
  getFlexAllocationInfo: async ({ commit }, payload) => {
    const resGetFlexAllocationInfo = await postAxios(payload);

    if (resGetFlexAllocationInfo.data.data[0].dt !== EXCEPTION) {
      return JSON.parse(resGetFlexAllocationInfo.data.data[0].value);
    }

    return null;
  },
  onChangeSelectionListing: async ({ commit }, payload) => {
    const resOnChangeSelectionListing = await postAxios(payload);

    if (resOnChangeSelectionListing.data.data[0].dt !== EXCEPTION) {
      return JSON.parse(resOnChangeSelectionListing.data.data[0].value);
    }

    return null;
  },
  getBenefitInformation: async ({ commit }, payload) => {
    const resGetBenefitInformation = await postAxios(payload);

    if (resGetBenefitInformation.data.data[0].dt !== EXCEPTION) {
      return JSON.parse(resGetBenefitInformation.data.data[0].value);
    }

    return null;
  },
  onChangeRelationship: async ({ commit }, payload) => {
    const resOnChangeRelationship = await postAxios(payload);

    if (resOnChangeRelationship.data.data[0].dt !== EXCEPTION) {
      return JSON.parse(resOnChangeRelationship.data.data[0].value);
    }

    return null;
  },
  webTemporarySave: async ({ commit }, payload) => {
    const resWebTemporarySave = await postAxios(payload);

    if (resWebTemporarySave.data.data[0].dt !== EXCEPTION) {
      return true;
    }

    return false;
  },
  webLoadSave: async ({ commit }, payload) => {
    const resWebLoadSave = await postAxios(payload);

    if (resWebLoadSave.data.data[0].dt !== EXCEPTION) {
      return JSON.parse(resWebLoadSave.data.data[0].value);
    }

    return null;
  },
  submitSelection: async ({ commit }, payload) => {
    const resSubmitSelection = await postAxios(payload);

    if (resSubmitSelection.data.data[0].dt !== EXCEPTION) {
      return JSON.parse(resSubmitSelection.data.data[0].value);
    }
    return resSubmitSelection.data.data[0].value;
  },
  webGetCountDownBarPeriod: async ({ commit }, payload) => {
    const resWebGetCountDownBarPeriod = await postAxios(payload);

    if (resWebGetCountDownBarPeriod.data.data[0].dt !== EXCEPTION) {
      return JSON.parse(resWebGetCountDownBarPeriod.data.data[0].value);
    }

    return null;
  },
  getFlexEnrolmentMessage: async ({ commit }, payload) => {
    const resGetFlexEnrolmentMessage = await postAxios(payload);

    if (resGetFlexEnrolmentMessage.data.data[0].dt !== EXCEPTION) {
      return resGetFlexEnrolmentMessage.data.data[0];
    }

    return null;
  },
  getListDependent: async ({ commit }, payload) => {
    try {
      const res = await postAxios(payload);
      if (res.data.data[0].dt !== EXCEPTION) {
        const employee = JSON.parse(res.data.data[0].value).data.Employee;
        if(Array.isArray(employee)) {
          return employee;
        }
        if(employee) return [employee];
      }
      return [];
    } catch (error) {
      return null;
    }
  },

  checkAdjustment: async ({ commit }, payload) => {
    try {
      const res = await postAxios(payload);
      if (res.data.data[0].dt !== EXCEPTION) {
        return JSON.parse(res.data.data[0].value);
      }
      return null;
    } catch (error) {
      return null;
    }
  },

  getEmployeeList: async ({ commit }, payload) => {
    try {
      const res = await postAxios(payload);
      if (res.data.data[0].dt !== EXCEPTION) {
        return handleListCallApi(
          [...res.data.data[0].colNames],
          [...res.data.data[0].rows]
        )
      }
      return [];
    } catch (error) {
      return [];
    }
  },
}
