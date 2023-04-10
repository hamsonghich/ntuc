import { postAxios } from "../services/callApi";
import { EXCEPTION } from "../utils/constants/statusResponse";
import { handleListCallApi } from "../utils/functions/handleListCallApi";

const state = () => ({
  claimsFlex: [],
  claimsOutpatient: [],
  claimsInpatient: [],
  panelClinic: [],
  checkMMBDashboard: {},
  isShowGuideTour: false,
  isShowCountDownGuideTour: false,
  entitiesNotification: [],
  timeEnd: new Date(),
  showCountDown: Number,
  hideComponent: true,
  wallets: null,
  quotes: [],
  module_access: null,
  last_n_panel_claims: [],
  last_n_claims: [],
  myBenefits: {},
  isEnrolled: {},
  checkReload: {}
});
const getters = {
  checkReload: (_state) => _state.checkReload,
  claimsFlex: (_state) => _state.claimsFlex,
  claimsOutpatient: (_state) => _state.claimsOutpatient,
  claimsInpatient: (_state) => _state.claimsInpatient,
  panelClinic: (_state) => _state.panelClinic,
  checkMMBDashboard: (_state) => _state.checkMMBDashboard,
  isShowGuideTour: (_state) => _state.isShowGuideTour,
  isShowCountDownGuideTour: (_state) => _state.isShowCountDownGuideTour,
  entitiesNotification: (_state) => _state.entitiesNotification,
  timeEnd: (_state) => _state.timeEnd,
  showCountDown: (_state) => _state.showCountDown,
  hideComponent: (_state) => _state.hideComponent,
  wallets: (_state) => _state.wallets,
  quotes: (_state) => _state.quotes,
  module_access: (_state) => _state.module_access,
  last_n_panel_claims: (_state) => _state.last_n_panel_claims,
  last_n_claims: (_state) => _state.last_n_claims,
  myBenefits: (_state) => _state.myBenefits,
  isEnrolled: _state => _state.isEnrolled
};
const mutations = {
  SET_CHECK_RELOAD(_state, payload) {
    _state.checkReload = payload
  },
  SET_CLAIMS_FLEX(_state, payload) {
    _state.claimsFlex = payload
  },
  SET_WALLETS(_state, payload) {
    _state.wallets = payload
  },
  SET_QUOTES(_state, payload) {
    _state.quotes = payload
  },
  SET_MODULE_ACCESS(_state, payload){
    _state.module_access = payload
  },
  SET_LAST_N_PANEL_CLAIMS(_state, payload){
    _state.last_n_panel_claims = payload
  },
  SET_LAST_N_CLAIMS(_state, payload){
    _state.last_n_claims = payload
  },
  SET_MY_BENEFIT(_state, payload){
    _state.myBenefits = payload
  },
  SET_IS_ENROLLED: (_state,payload) => {
    _state.isEnrolled = payload
  },
  SET_CLAIMS_OUTPATIENT(_state, payload) {
    _state.claimsOutpatient = payload
  },
  SET_CLAIMS_INPATIENT(_state, payload) {
    _state.claimsInpatient = payload
  },
  SET_PANEL_CLINIC(_state, payload){
    _state.panelClinic = payload
  },
  SET_CHECK_MMB_DASHBOARD(_state, payload) {
    _state.checkMMBDashboard = payload
  },
  SET_IS_SHOW_GUIDE_TOUR(_state, payload) {
    _state.isShowGuideTour = payload
  },
  SET_IS_SHOW_COUNT_DOWN_GUIDE_TOUR(_state, payload){
    _state.isShowCountDownGuideTour = payload
  },
  SET_ENTITIES_NOTIFICATION(_state, payload) {
    _state.entitiesNotification = payload
  },
  SET_TIME_END(_state, payload) {
    _state.timeEnd = payload
  },
  SET_COUNT_DOWN(_state, payload){
    _state.showCountDown = payload
  },
  SET_HIDE_COMPONENT(_state, payload){
    _state.hideComponent = payload
  }
};
const actions = {
  sethideComponent({commit},hideComponent){
    commit('SET_HIDE_COMPONENT',hideComponent)
  },
  backToHome({commit}){
    commit('SET_HIDE_COMPONENT',false)
    this.$router.push('/dashboard')
  },
  async handleSetClaimsFlex({ commit }, payload) {
    const resLog = await postAxios(payload);
    if (resLog.data.data[0].dt !== EXCEPTION) {
      commit('SET_CLAIMS_FLEX', handleListCallApi(
        [...resLog.data.data[0].colNames],
        [...resLog.data.data[0].rows],
      )[0]);
    }
  },
  async handleSetClaimsOutpatient({ commit }, payload) {
    const resLog = await postAxios(payload);
    if (resLog.data.data[0].dt !== EXCEPTION) {
      commit('SET_CLAIMS_OUTPATIENT', handleListCallApi(
        [...resLog.data.data[0].colNames],
        [...resLog.data.data[0].rows],
      )[0]);
    }
  },
  async handleSetClaimsInpatient({ commit }, payload) {
    const resLog = await postAxios(payload);
    if (resLog.data.data[0].dt !== EXCEPTION) {
      commit('SET_CLAIMS_INPATIENT', handleListCallApi(
        [...resLog.data.data[0].colNames],
        [...resLog.data.data[0].rows],
      )[0]);
    }
  },
  async handleSetPanelClinic({commit}, payload){
    const resLog = await postAxios(payload);
    if(resLog.data.data[0].dt !== EXCEPTION){
      commit('SET_PANEL_CLINIC', handleListCallApi(
        [...resLog.data.data[0].colNames],
        [...resLog.data.data[0].rows],
      ))
    }
  },
  async fetchAPIMMBDashboard({ commit }, payload) {
    try{
    const resLog = await postAxios({
      invoke: 'System.execute',
      argc: '2',
      a0: 'API.MMB.Dashboard'
    })
    const xmlArrRes = resLog.data.data[0].value
    const checkMMBDashboard = JSON.parse(xmlArrRes)
    const checkReload = resLog.data.data[0].dt
    commit('SET_CHECK_RELOAD',checkReload)
    commit('SET_CHECK_MMB_DASHBOARD', checkMMBDashboard)
    commit('SET_WALLETS', checkMMBDashboard.data.wallets)
    commit('SET_QUOTES', checkMMBDashboard.data.quotes)
    commit('SET_MODULE_ACCESS', checkMMBDashboard.data.module_access)
    commit('SET_LAST_N_PANEL_CLAIMS', checkMMBDashboard.data.last_n_panel_claims)
    commit('SET_LAST_N_CLAIMS', checkMMBDashboard.data.last_n_claims)
    commit('SET_MY_BENEFIT', checkMMBDashboard.data.my_benefit)
  } catch (error) {}
  },
  fetchMMBDashboard: async ({ commit }, payload) => {
    const resLog = await postAxios(payload)
    const xmlArrRes = resLog.data.data[0].value
    const checkMMBDashboard = JSON.parse(xmlArrRes)
    commit('SET_CHECK_MMB_DASHBOARD', checkMMBDashboard)
  },
  async handleChangeShowGuide({ commit }, payload) {
    commit('SET_IS_SHOW_GUIDE_TOUR', payload)
  },
  async handleChangeShowCountDownGuide({ commit }, payload){
    commit('SET_IS_SHOW_COUNT_DOWN_GUIDE_TOUR', payload)
  },
  async fetchEntitiesNotification({ commit }, payload) {
    const res = await postAxios({
      invoke: 'System.execute',
      argc: '2',
      a0: 'API.EmployeeInbox',
      a1: {
        empid: localStorage.getItem('empid')
      }
    });
    let xmlArrRes = res.data.data[0];
    if (xmlArrRes.value) {
      const notifications = JSON.parse(xmlArrRes.value).filter(e => e.isRead == 'false');
      const unReadNotifications = notifications.filter(e => e.isRead == 'false').slice(0, 3);
      commit('SET_ENTITIES_NOTIFICATION', unReadNotifications)
    }
  },
  async handleSetTimeEnd({ commit }, payload) {
    const res = await postAxios({
      invoke: "System.execute",
      argc: "2",
      a0: "Flex.WebGetCountDownBarPeriod",
      a1: {
        employee: localStorage.getItem('empid')
      }
    });
    let xmlArrRes = res.data.data[0];
    if (xmlArrRes.value) {
      commit('SET_TIME_END', JSON.parse(xmlArrRes.value).enddate)
      commit('SET_COUNT_DOWN',JSON.parse(xmlArrRes.value).displayflag)
      localStorage.setItem('isEnrolled',JSON.stringify(JSON.parse(xmlArrRes.value)))
      commit('SET_IS_ENROLLED', JSON.parse(xmlArrRes.value))
    }
  },
};


export default {
  state, getters, actions, mutations
}