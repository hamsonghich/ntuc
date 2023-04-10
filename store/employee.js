import { postAxios } from '../services/callApi'
import { EXCEPTION } from "../utils/constants/statusResponse";
import { handleListCallApi } from "../utils/functions/handleListCallApi";
import dayjs from 'dayjs'
export const state = () => ({
  personalDetails: [],
  bankInfo: {},
  employeeList: [],
  ecardList: [],
  ecardBase: [],
  depentdentBase: [],
  personalInfo: {},
  employee: {},
  employeeEdit: {},
  labelEmployee: {},
  disabledEmployee: {},
  listDependentEdit: [],
  listDependent: [],
  labelDependent: {},
  disabledDependent: {},
  firstTimeLogOption: {},
  verificationPrompt: [],
  isEdit: true,
  isShow: false,
  isSave: true,
  showVerification: false,
  isSetDisabaleEmployee: {},
  isSetDisableDependent: {},
  number: 1,
  isEditbankInfo: true,
  ecardId: 0,
  insurerCards: [],
  entitiesClinicResource: [],
  page: 3,
  isBenefit: false,
  dependantHasAllValues: [],
});


export const getters = {
  personalDetails: (_state) => _state.personalDetails,
  entitiesClinicResource: (_state) => _state.entitiesClinicResource,
  bankInfo: (_state) => _state.bankInfo,
  ecardList: (_state) => _state.ecardList,
  ecardBase: (_state) => _state.ecardBase,
  depentdentBase: (_state) => _state.depentdentBase,
  employeeList: (_state) => _state.employeeList,
  personalInfo: (_state) => _state.personalInfo,
  employee: (_state) => _state.employee,
  employeeEdit: (_state) => _state.employeeEdit,
  labelEmployee: (_state) => _state.labelEmployee,
  disabledEmployee: (_state) => _state.disabledEmployee,
  listDependent: (_state) => _state.listDependent,
  listDependentEdit: (_state) => _state.listDependentEdit,
  labelDependent: (_state) => _state.labelDependent,
  disabledDependent: (_state) => _state.disabledDependent,
  firstTimeLogOption: (_state) => _state.firstTimeLogOption,
  verificationPrompt: (_state) => _state.verificationPrompt,
  isEdit: (_state) => _state.isEdit,
  isSave: (_state) => _state.isSave,
  isShow: (_state) => _state.isShow,
  showVerification: (_state) => _state.showVerification,
  isSetDisabaleEmployee: _state => _state.isSetDisabaleEmployee,
  isSetDisableDependent: _state => _state.isSetDisableDependent,
  number: _state => _state.number,
  isEditbankInfo: _state => _state.isEditbankInfo,
  ecardId: _state => _state.ecardId,
  insurerCards: _state => _state.insurerCards,
  page: _state => _state.page,
  isBenefit: _state => _state.isBenefit,
  dependantHasAllValues: _state => _state.dependantHasAllValues
};

export const mutations = {
  SET_PERSONAL_DETAILS: (_state, payload) => {
    _state.personalDetails = payload
  },
  SET_ENTITIES_CLINIC_RESOURCE: (_state, payload) => {
    _state.entitiesClinicResource = payload
  },
  SET_iNSURER_CARDS: (_state, payload) => {
    _state.insurerCards = payload
  },
  SET_ECARD_ID: (_state, payload) => {
    _state.ecardId = payload
  },
  SET_ECARD: (_state, payload) => {
    _state.ecardList = payload
  },
  SET_ECARD_BASE: (_state, payload) => {
    _state.ecardBase = payload
  },
  SET_BANK_INFO: (_state, payload) => {
    _state.bankInfo = payload
  },
  SET_DEPENDENT_BASE: (_state, payload) => {
    _state.depentdentBase = payload
  },
  SET_EMPLOYEELIST: (_state, payload) => {
    _state.employeeList = payload
  },
  SET_PERSONAL_INFO: (_state, payload) => {
    _state.personalInfo = payload
  },
  SET_EMPLOYEE: (_state, payload) => {
    _state.employee = payload
  },
  SET_EMPLOYEE_EDIT: (_state, payload) => {
    _state.employeeEdit = payload
  },
  SET_LIST_DEPENDENT_EDIT: (_state, payload) => {
    _state.listDependentEdit = payload
  },
  SET_LABEL_EMPLOYEE: (_state, payload) => {
    _state.labelEmployee = payload
  },
  SET_DISABLE_EMPLOYEE: (_state, payload) => {
    _state.disabledEmployee = payload
  },
  SET_LIST_DEPENDENT: (_state, payload) => {
    _state.listDependent = payload
  },
  SET_LABEL_DEPENDENT: (_state, payload) => {
    _state.labelDependent = payload
  },
  SET_DISABLE_DEPENDENT: (_state, payload) => {
    _state.disabledDependent = payload
  },
  SET_FIRST_TIME_LOGIN_OPTION: (_state, payload) => {
    _state.firstTimeLogOption = payload
  },
  SET_ISEDIT: (_state, payload) => {
    _state.isEdit = payload
  },
  SET_IS_SAVE: (_state, payload) => {
    _state.isSave = payload
  },
  SET_VERIFICATION_PROMPT: (_state, payload) => {
    _state.verificationPrompt = payload
  },
  SET_ISSHOW: (_state, payload) => {
    _state.isShow = payload
  },
  SET_SHOWVERIFICATION: (_state, payload) => {
    _state.showVerification = payload
  },
  IS_SETDISABLEDEMPLOYEE: (_state, payload) => {
    _state.isSetDisabaleEmployee = payload
  },
  IS_SETDISABLEDDEPENDENT: (_state, payload) => {
    _state.isSetDisableDependent = payload
  },
  SET_NUMBER: (_state, payload) => {
    _state.number = payload
  },
  SET_EDIT_BANK_INFO: (_state, payload) => {
    _state.isEditbankInfo = payload
  },
  SET_PAGE: (_state, payload) => {
    _state.page = payload
  },
  SET_IS_BENEFIT: (_state, payload) => {
    _state.isBenefit = payload
  },
  SET_DEPENDANT_HAS_ALL_VALUES: (_state,payload) => {
    _state.dependantHasAllValues.push(payload)
  },
  SET_RESET_DEPENDENT_HAS_ALL_VALUES: (_state,payload) => {
    _state.dependantHasAllValues = payload
  }
};

export const actions = {
  async fetcheCard({ commit }, _payment) {
    const response = await postAxios(_payment)
    let xmlArrRes = response.data.data[0].value
    const ecardList = JSON.parse(xmlArrRes)
    commit('SET_ECARD', ecardList)
  },
  async fetchInsurerCards({ commit }, _payment) {
    const response = await postAxios({
      invoke: 'System.execute',
      argc: '2',
      a0: 'MedicalCard.getImage',
      a1: {
        dependent: -1
      }
    })
    let xmlArrRes = response.data.data[0].value
    const ecardList = JSON.parse(xmlArrRes)
    commit('SET_iNSURER_CARDS', ecardList)
  },
  changeEcardId({ commit }, _payload) {
    commit('SET_ECARD_ID', _payload)
  },
  async pelcherCard({ commit }, _payment) {
    const response = await postAxios(_payment)
    let xmlArrRes = response.data.data[0].value
    const ecardBase = JSON.parse(xmlArrRes)
    commit('SET_ECARD_BASE', ecardBase)
  },
  handleDependentDetails: async ({ commit }, payload) => {
    const res = await postAxios(payload)
    if (res.data.data[0].dt !== EXCEPTION) {
      let arr = [...handleListCallApi(
        [...res.data.data[3].colNames],
        [...res.data.data[3].rows],
      )]
      commit('SET_DEPENDENT_BASE', arr)
    }
  },
  handleDependentList: async ({ commit }, payload) => {
    const res = await postAxios(payload)
    if (res.data.data[0].dt !== EXCEPTION) {
      let arr = handleListCallApi(
        [...res.data.data[1].colNames],
        [...res.data.data[1].rows],
      )
      commit('SET_DEPENDENT_BASE', arr)
    }
  },
  handleDependentNamesandIdsOnly: async ({ commit }, payload) => {
    const res = await postAxios(payload)
    if (res.data.data[0].dt !== EXCEPTION) {
      let arr = handleListCallApi(
        [...res.data.data[0].colNames],
        [...res.data.data[0].rows],
      )
      commit('SET_DEPENDENT_BASE', arr)
    }
  },

  handlePersonalDetails: async ({ commit }, payload) => {
    const res = await postAxios(payload)
    if (res.data.data[0].dt !== EXCEPTION) {
      commit('SET_PERSONAL_DETAILS', handleListCallApi(
        [...res.data.data[0].colNames],
        [...res.data.data[0].rows],
      ));
    }
  },
  handleVerificationPrompt: async ({ commit }, payload) => {
    const res = await postAxios(payload)
    if (res.data.data[0].dt !== EXCEPTION) {
      commit('SET_VERIFICATION_PROMPT', handleListCallApi(
        [...res.data.data[0].colNames],
        [...res.data.data[0].rows],
      ));
    }
  },
  handleSetPermission: async ({ commit }, payload) => {
    const res = await postAxios(payload)
    const data = res.data.data.map(el => JSON.parse(el.value))
    commit('SET_PERSONAL_INFO', data[0])
    commit('SET_BANK_INFO', data[2])
    commit('SET_EMPLOYEE', data[1])
    commit('SET_LABEL_EMPLOYEE', data[4])
    commit('SET_LIST_DEPENDENT', data[3].map(el=>{return{
      ...el,
      dob: new Date(dayjs(el.dob))
    }}))
    commit('SET_LABEL_DEPENDENT', data[5])
    commit('SET_DISABLE_EMPLOYEE', data[6])
    commit('SET_DISABLE_DEPENDENT', data[7])
    commit('SET_FIRST_TIME_LOGIN_OPTION', data[8])

    commit('SET_EMPLOYEELIST', res.data.data)
  },
  handleSetIsDisableEmployee: async ({ commit }, _payload) => {
    const res = await postAxios({
      "invoke": "System.execute",
      "argc": "2",
      "a0": "PersonalDetails.getEmpPersonalDetails",
      "a1": {
        "empId": _payload,
        "mode": 1
      }
    })
    if (res.data.data[0].dt !== "exception") {
      const data = res.data.data.map(el => JSON.parse(el.value))
      commit('IS_SETDISABLEDEMPLOYEE', data[6])
      commit('IS_SETDISABLEDDEPENDENT', data[7])
    }
  },
  handlePersonalInfo({ commit }, payload) {
    commit('SET_PERSONAL_INFO', payload)
  },
  handleEmployee({ commit }, payload) {
    commit('SET_EMPLOYEE', payload)
  },
  handleLabelEmployee({ commit }, payload) {
    commit('SET_LABEL_EMPLOYEE', payload)
  },
  handleDisableEmployee({ commit }, payload) {
    commit('SET_DISABLE_EMPLOYEE', payload)
  },
  handleListDependent({ commit }, payload) {
    commit('SET_LIST_DEPENDENT', payload)
  },
  handleLabelDependent({ commit }, payload) {
    commit('SET_LABEL_DEPENDENT', payload)
  },
  handleDisableDependent({ commit }, payload) {
    commit('SET_DISABLE_DEPENDENT', payload)
  },
  handleSetIsedit({ commit }, payload) {
    commit('SET_ISEDIT', payload)
  },
  handleSetIsSave({ commit }, payload) {
    commit('SET_IS_SAVE', payload)
  },
  handleSetIsShow({ commit }, payload) {
    commit('SET_ISSHOW', payload)
  },
  handleSetVerification: async ({ commit }, payload) => {
    const res = await postAxios(payload)
    commit('SET_SHOWVERIFICATION', res.data.data)
  },
  handleSetNumber({ commit }, payload) {
    commit('SET_NUMBER', payload)
  },
  handleSetEditBankInfo({ commit }, payload) {
    commit('SET_EDIT_BANK_INFO', payload)
  },
  handlePage({ commit }, payload) {
    commit('SET_PAGE', payload)
  },
  handleFetchClinicResource: async ({ commit }, _payment) => {
    const res = await postAxios(_payment)
    const dt = res.data.data[0].dt;
    if (dt != EXCEPTION) {
      let entitiesClinicResource = handleListCallApi(
        [...res.data.data[0].colNames],
        [...res.data.data[0].rows]
      ) || [];
      entitiesClinicResource = entitiesClinicResource.filter(e => e.state == '33')
      commit('SET_ENTITIES_CLINIC_RESOURCE', entitiesClinicResource);
    }
  },
  handleIsBenefit({commit}, payload){
    commit('SET_IS_BENEFIT', payload)
  },
  handleDependantHasAllValues({commit}, payload) {
    commit('SET_DEPENDANT_HAS_ALL_VALUES', payload)
    
  },
  handleResetDependentHasAllValues({commit}) {
    commit('SET_RESET_DEPENDENT_HAS_ALL_VALUES',[])
    
  }
}
