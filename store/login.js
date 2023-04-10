import { postAxios } from '../services/callApi';
import { handleListCallApi } from "../utils/functions/handleListCallApi";
import { EXCEPTION } from '../utils/constants/statusResponse';
const state = () => ({
  alldataClaims: [],
  getRelatedLoginInfo: [],
  quickAccessAuthOtp: [],
  check: '',
  firsttimelogin: {},
  checkQuickAccess: '',
  countryCode: [],
  isEmployeeVerified: '',
  checkBroker: '',
  benefitEnroll: {},
  benefitsSaved: '',
  checkSubmit: false
})
const getters = {
  alldataClaims: _state => _state.alldataClaims,
  getRelatedLoginInfo: _state => _state.getRelatedLoginInfo,
  quickAccessAuthOtp: _state => _state.quickAccessAuthOtp,
  check: _state => _state.check,
  firsttimelogin: _state => _state.firsttimelogin,
  checkQuickAccess: _state => _state.checkQuickAccess,
  countryCode: _state => _state.countryCode,
  isEmployeeVerified: _state => _state.isEmployeeVerified,
  checkBroker: _state => _state.checkBroker,
  benefitEnroll: _state => _state.benefitEnroll,
  benefitsSaved: _state => _state.benefitsSaved,
  checkSubmit: _state => _state.checkSubmit
}
const actions = {
  async fetchdataClaim({ commit }, _payment) {
    const response = await postAxios(_payment)
    let xmlArrRes = response.data.data[0].value
    if (response.data.data[0].dt !== EXCEPTION) {
      const res = JSON.parse(xmlArrRes)
      localStorage.setItem('appName', res.appName)
      localStorage.setItem('clientname', res.clientname)
      localStorage.setItem('menu', res.menu)
      localStorage.setItem('name', res.name)
      localStorage.setItem('properties', res.properties)
      localStorage.setItem('userid', res.userid)
      localStorage.setItem('empName', res.empName)
      commit('SET_CHECK', response.data.data[0])
    }
    commit('SET_IS_FILTER_CLAIM', _payment)
    commit('SET_CHECK', response.data.data[0])
  },
  async fetchGetRelatedLoginInfo({ commit }, _payment) {
    const response = await postAxios(_payment)
    commit('SET_IS_USER', _payment)
    let xmlArrRes = response.data.data[0].value
    if (response.data.data[0].dt !== EXCEPTION) {
      const firsttimelogin = JSON.parse(xmlArrRes)
      localStorage.setItem("isAuthen", true)
      localStorage.setItem('ContactNumberChanged', firsttimelogin.ContactNumberChanged)
      localStorage.setItem('role', firsttimelogin.role.role)
      localStorage.setItem('ReferralLetterLabel', firsttimelogin.ReferralLetterLabel)
      localStorage.setItem('brokerinfo', firsttimelogin.brokerinfo.brokercontactno)
      localStorage.setItem('callcode', firsttimelogin.callcode)
      localStorage.setItem('clientname', firsttimelogin.clientname)
      localStorage.setItem('cliniclocatoraccess', firsttimelogin.cliniclocatoraccess)
      localStorage.setItem('consentagreementitle', JSON.stringify(firsttimelogin.consentagreement.consentagreementtitle))
      localStorage.setItem('consentagreement', JSON.stringify(firsttimelogin.consentagreement.consentagreementcontent))
      localStorage.setItem('countrycode', firsttimelogin.countrycode)
      localStorage.setItem('disclaimer', JSON.stringify(firsttimelogin.disclaimer))
      localStorage.setItem('claimapprovalaccess', JSON.stringify(firsttimelogin.claimapprovalaccess))
      localStorage.setItem('docuploadaccess', JSON.stringify(firsttimelogin.docuploadaccess))
      localStorage.setItem('eclaimaccess', JSON.stringify(firsttimelogin.eclaimaccess))
      localStorage.setItem('emailaddress', firsttimelogin.emailaddress)
      localStorage.setItem('empid', firsttimelogin.empid)
      localStorage.setItem('firstEnrollFlag', firsttimelogin.firstEnrollFlag)
      localStorage.setItem('consentagreementflag', firsttimelogin.consentagreement.consentagreementflag)
      localStorage.setItem('employeeaccess', JSON.stringify(firsttimelogin.employeeaccess))
      localStorage.setItem('isUsernameChanged', firsttimelogin.isUsernameChanged)
      localStorage.setItem('isPasswordChanged', firsttimelogin.isPasswordChanged)
      localStorage.setItem('isemployee', firsttimelogin.isemployee)
      localStorage.setItem('logaccess', JSON.stringify(firsttimelogin.logaccess))
      localStorage.setItem('passwordpolicy', JSON.stringify(firsttimelogin.passwordpolicy))
      localStorage.setItem('mobilephone', firsttimelogin.mobilephone)
      localStorage.setItem('first_time_login', firsttimelogin.first_time_login == '0' ? false : true)
      localStorage.setItem('vvip', firsttimelogin.vvip)
      localStorage.setItem('thirdpartyredirectprompt', firsttimelogin.thirdpartyredirectprompt)
      localStorage.setItem('pdpaprompt', firsttimelogin.pdpaprompt)
      localStorage.setItem('hdFormFlag', firsttimelogin.hdFormFlag)
      localStorage.setItem('staffid', firsttimelogin.staffid)
      commit('SET_CHECK_FIRST_TIME', firsttimelogin)
    }
  },
  async fetchQuickAccessAuthOTP({ commit }, _payment) {
    const response = await postAxios(_payment)
    let xmlArrRes = response.data.data[0].value
    const checkQuickAccess = JSON.parse(xmlArrRes)
    commit('SET_CHECK_QUICK_ACCESS', checkQuickAccess)
    commit('SET_QUICK_ACCESS_AUTH_OTP', _payment)
  },
  async fetchCountryCode({ commit }, _payment) {
    const response = await postAxios(_payment)
    let countryCode = response.data.data[0].rows
    commit('SET_CHECK_COUNTRY', countryCode)
  },
  async fetchEmpVerification({ commit }, payload) {
    const res = await postAxios(payload)
    if (res.data.data[0].dt === 'rs') {
      let resObj = handleListCallApi(
        [...res.data.data[0].colNames],
        [...res.data.data[0].rows],
      )
      let _isEmployeeVerified = resObj[0].prompt === '0' ? true : false
      localStorage.setItem('isemployeeverified', _isEmployeeVerified)
      commit('SET_IS_EMPLOYEE_VERIFIED', _isEmployeeVerified)
    } else {
      //throw error message
    }
  },
  async fetchBroker({ commit }, _payment) {
    const response = await postAxios(_payment)
    let xmlArrRes = response.data.data[0].value
    const checkBroker = JSON.parse(xmlArrRes)
    commit('SET_CHECK_BROKER', checkBroker)
  },
  async fetchBenefit({ commit }, _payment) {
    const response = await postAxios(_payment)
    commit('SET_BENEFIT_ENROLL', response.data.data[0])
  },
  async fetchBenefitSaved({ commit }, _payment) {
    const response = await postAxios(_payment)
    let xmlArrRes = response.data.data[0].value
    const benefitsSaved = JSON.parse(xmlArrRes)
    commit('SET_BENEFIT_SAVED', benefitsSaved)
  },
  handleCheckSubmit: async ({ commit }, payload) => {
    commit('SET_CHECK_SUBMIT', payload);
  },
}
const mutations = {
  SET_BENEFIT_SAVED: (_state, benefitsSaved) => {
    _state.benefitsSaved = benefitsSaved
  },
  SET_IS_FILTER_CLAIM: (_state, _alldataClaims) => {
    _state.alldataClaims = _alldataClaims
  },
  SET_CHECK: (_state, check) => {
    _state.check = check
  },
  SET_IS_USER: (_state, getRelatedLoginInfo) => {
    _state.getRelatedLoginInfo = getRelatedLoginInfo
  },
  SET_CHECK_FIRST_TIME: (_state, firsttimelogin) => {
    _state.firsttimelogin = firsttimelogin
  },
  SET_QUICK_ACCESS_AUTH_OTP: (_state, quickAccessAuthOtp) => {
    _state.quickAccessAuthOtp = quickAccessAuthOtp
  },
  SET_CHECK_QUICK_ACCESS: (_state, checkQuickAccess) => {
    _state.checkQuickAccess = checkQuickAccess
  },
  SET_CHECK_COUNTRY: (_state, countryCode) => {
    _state.countryCode = countryCode
  },
  SET_IS_EMPLOYEE_VERIFIED: (_state, isEmployeeVerified) => {
    _state.isEmployeeVerified = isEmployeeVerified
  },
  SET_CHECK_BROKER: (_state, checkBroker) => {
    _state.checkBroker = checkBroker
  },
  SET_BENEFIT_ENROLL: (_state, benefitEnroll) => {
    _state.benefitEnroll = benefitEnroll
  },
  SET_CHECK_SUBMIT: (_state, checkSubmit ) => {
    _state.checkSubmit = checkSubmit;
  },
}
export default {
  state,
  getters,
  actions,
  mutations
}
