const state = () => ({
  listGender: [],
  listMaritalStatus: [],
  listNationality: [],
  listDepartment: [],
  listDivision: [],
  listBank: [],
  listBankBranch: [],
  listRelationship: [],
  listEmploymentType: [],
  listLocal: [],
  listSalarySetting: [],
  listCountryCode: [],
  listCostCenter: [],
  listPolicyEntity: [],
  listClaimBenefitGroup: [],
  listMUDecision: [],
  listSubClaimType: [],
  listChangeType: [],
  listCountry: [],
  listDevision: []
})

const getters = {
  listGender: _state => _state.listGender,
  listMaritalStatus: _state => _state.listMaritalStatus,
  listCountryCode: _state => _state.listCountryCode,
  listRelationship: _state => _state.listRelationship,
  listChangeType: _state => _state.listChangeType,
  listNationality: _state => _state.listNationality,
  listBank: _state => _state.listBank,
  listBankBranch: _state => _state.listBankBranch,
  listCountry: _state => _state.listCountry,
  listDevision: _state => _state.listDevision,
  listEmploymentType: _state => _state.listEmploymentType,
  listLocal: _state => _state.listLocal,
  listSalarySetting: _state => _state.listSalarySetting
}

const mutations = {
  SET_LIST_GENDER(_state, payload) {
    _state.listGender = payload
  },
  SET_LIST_MARITAL_STATUS(_state, payload) {
    _state.listMaritalStatus = payload
  },
  SET_LIST_COUNTRY_CODE(_state, payload) {
    _state.listCountryCode = payload
  },
  SET_LIST_RELATIONSHIP(_state, payload) {
    _state.listRelationship = payload
  },
  SET_LIST_CHANGE_TYPE(_state, payload) {
    _state.listChangeType = payload
  },
  SET_LIST_NATIONALITY(_state, payload) {
    _state.listNationality = payload
  },
  SET_LIST_BANK(_state, payload) {
    _state.listBank = payload
  },
  SET_LIST_BANK_BRANCH(_state, payload) {
    _state.listBankBranch = payload
  },
  SET_LIST_COUNTRY(_state, payload) {
    _state.listCountry = payload
  },
  SET_LIST_DEVISION(_state, payload) {
    _state.listDevision = payload
  },
  SET_LIST_EMPLOYMENT_TYPE(_state, payload) {
    _state.listEmploymentType = payload
  },
  SET_LIST_LOCAL(_state, payload) {
    _state.listLocal = payload
  },
  SET_LIST_SALARY_SETTING(_state, payload) {
    _state.listSalarySetting = payload
  }
}
const actions = {
  handleListGender({ commit }, payload) {
    commit('SET_LIST_GENDER', payload)
  },
  handleListMaritalStatus({ commit }, payload) {
    commit('SET_LIST_MARITAL_STATUS', payload)
  },
  handleListCountryCode({ commit }, payload) {
    commit('SET_LIST_COUNTRY_CODE', payload)
  },
  handleListRelationship({ commit }, payload) {
    commit('SET_LIST_RELATIONSHIP', payload)
  },
  handleListChangeType({ commit }, payload) {
    commit('SET_LIST_CHANGE_TYPE', payload)
  },
  handleListNationality({ commit }, payload) {
    commit('SET_LIST_NATIONALITY', payload)
  },
  handleListBank({ commit }, payload) {
    commit('SET_LIST_BANK', payload)
  },
  handleListBankBranch({ commit }, payload) {
    commit('SET_LIST_BANK_BRANCH', payload)
  },
  handleListDevision({ commit }, payload) {
    commit('SET_LIST_DEVISION', payload)
  },
  handleListEmploymentType({ commit }, payload) {
    commit('SET_LIST_EMPLOYMENT_TYPE', payload)
  },
  handleListLocal({ commit }, payload) {
    commit('SET_LIST_LOCAL', payload)
  },
  handleListSalarySetting({ commit }, payload) {
    commit('SET_LIST_SALARY_SETTING', payload)
  },
  handleListCountry({ commit }, payload) {
    commit('SET_LIST_COUNTRY', payload)
  },
}

export default {
  state,
  getters,
  actions,
  mutations
}
