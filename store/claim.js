import { postAxios } from '../services/callApi';
import { EXCEPTION } from '../utils/constants/statusResponse';
import { PAGINATE_CLAIM } from '../utils/constants/paginate.js';
import { handleListCallApi } from '../utils/functions/handleListCallApi';
export const state = () => ({
  step: 1,
  tab: 1,
  listClaimsAll: 0,
  listClaims: [],
  listClaimsType: [],
  isBalance: false,
  colNameClaims: [],
  createClaimStepInfor: {},
  listClaimsName: [],
  chooseLog: [],
  currentPageClaim: 1,
  createStep: 1,
  stepList: 1,
  listStatus: [],
  isPreSubmission: false,
  attachmentType: null,
  listClaimMate: [],
  listClaimType: [],
  listCurrency: [],
  listReferral: [],
  listEligibleClaimType: [],
  entitiesClaim: [],
  entityActiveClaim: 0,
  moreClaimStep: 1,
  claimDynamic: [],
  listClaimReason: [],
  infoClaimCreated: {},
  listHistoryType: [],
  listHospital: [],
  listServiceProvider: [],
  listPolicyClaimReason: [],
  isCreateClaim: 1,
  myClaim: {},
  listOutpatientClaimType: [],
  insuranceOutpatient: {},
  listOutPatientClaim: [],
  listClaimCreated: [],
  isMultiOutPatient: false,
  listAdmissionType: [],
  activeOutpaitent: {},
  outClaimSelected: {},
  resOutMulClaim: [],
  claim: {},
  myAttachments: [],
  createClaimError: [],
  listClaimGroup: [],
  outpaitent_claim_object: {},
  listFileInpatient:{},
	alert: {
		isShow: false,
		typeAlert: 'success',
		textAlert: ''
	},
  slectedOutpaitent: {},
  valueActiveClaimOutpaitent: {},
  statusList: [],
  createdOneClaim: {},
  reimbursementDetail: {},
  refrNoOutpaitent:{},
  showLoading: false
});

export const getters = {
  showLoading: _state => _state.showLoading,
  step: _state => _state.step,
  tab: _state => _state.tab,
  listClaimsAll: _state => _state.listClaimsAll,
  colNameClaims: _state => _state.colNameClaims,
  listClaims: _state => _state.listClaims,
  listClaimsName: _state => _state.listClaimsName,
  listClaimsType: _state => _state.listClaimsType,
  currentPageClaim: _state => _state.currentPageClaim,
  createStep: _state => _state.createStep,
  stepList: _state => _state.stepList,
  chooseLog: _state => _state.chooseLog,
  listStatus: _state => _state.listStatus,
  isBalance: _state => _state.isBalance,
  createClaimStepInfor: _state => _state.createClaimStepInfor,
  isPreSubmission: _state => _state.isPreSubmission,
  attachmentType: _state => _state.attachmentType,
  listClaimMate: _state => _state.listClaimMate,
  listClaimType: _state => _state.listClaimType,
  listCurrency: _state => _state.listCurrency,
  listReferral: _state => _state.listReferral,
  listEligibleClaimType: _state => _state.listEligibleClaimType,
  entitiesClaim: _state => _state.entitiesClaim,
  entityActiveClaim: _state => _state.entityActiveClaim,
  moreClaimStep: _state => _state.moreClaimStep,
  claimDynamic: _state => _state.claimDynamic,
  listClaimReason: _state => _state.listClaimReason,
  infoClaimCreated: _state => _state.infoClaimCreated,
  listHistoryType: _state => _state.listHistoryType,
  listHospital: _state => _state.listHospital,
  listServiceProvider: _state => _state.listServiceProvider,
  listPolicyClaimReason: _state => _state.listPolicyClaimReason,
  isCreateClaim: _state => _state.isCreateClaim,
  myClaim: _state => _state.myClaim,
  listOutpatientClaimType: _state => _state.listOutpatientClaimType,
  insuranceOutpatient: _state => _state.insuranceOutpatient,
  listOutPatientClaim: _state => _state.listOutPatientClaim,
  listClaimCreated: _state => _state.listClaimCreated,
  isMultiOutPatient: _state => _state.isMultiOutPatient,
  listAdmissionType: _state => _state.listAdmissionType,
  activeOutpaitent: _state => _state.activeOutpaitent,
  outClaimSelected: _state => _state.outClaimSelected,
  resOutMulClaim: _state => _state.resOutMulClaim,
  claim: _state => _state.claim,
  myAttachments: _state => _state.myAttachments,
  createClaimError: _state => _state.createClaimError,
  listClaimGroup: _state => _state.listClaimGroup,
  outpaitent_claim_object: _state => _state.outpaitent_claim_object,
	alert: (_state) => _state.alert,
  listFileInpatient: (_state) => _state.listFileInpatient,
  slectedOutpaitent: (_state) => _state.slectedOutpaitent,
  valueActiveClaimOutpaitent: (_state) => _state.valueActiveClaimOutpaitent,
  statusList: (_state) => _state.statusList,
  createdOneClaim: (_step) => _step.createdOneClaim,
  reimbursementDetail: (_step) => _step.reimbursementDetail,
  refrNoOutpaitent: (_state) => _state.refrNoOutpaitent
};
export const mutations = {
  SET_LOADING: (_state, _payload) => {
    _state.showLoading = _payload
  },
  SET_CREATED_ONE_CLAIM: (_state, _payload) =>{
    _state.createdOneClaim = _payload
  },
  SET_REFNO_OUTPAITENT: (_state, _payload) =>{
    _state.refrNoOutpaitent = _payload
  },
  SET_REIMBURSEMENT_DETAIL: (_state, _payload) =>{
    _state.reimbursementDetail = _payload
  },
  SET_VALUE_ACTIVE_CLAIM_OUTPAITENT: (_state,_payload) =>{
    _state.valueActiveClaimOutpaitent = _payload
  },
  SET_SELECTED_OUTPAITENT: (_state,_payload) =>{
    _state.slectedOutpaitent = _payload
  },
  SET_LIST_FILE_INPATIENT: (_state,_payload) =>{
    _state.listFileInpatient = _payload
  },
  SET_OUTPAITENT_CLAIM_OBJECT: (_state,_payload) =>{
    _state.outpaitent_claim_object = _payload
  },
  SET_RES_OUT_MUL_CLAIM: (_state,_payload) =>{
    _state.resOutMulClaim = _payload
  },
  SET_ACTIVE_OUTPAITENT: (_state, _payload) =>{
    _state.activeOutpaitent = _payload
  },
  SET_IS_MULTI_OUTPAITENT: (_state, _payload) => {
    _state.isMultiOutPatient = _payload;
  },
  SET_LIST_CLAIM_GROUP: (_state, _payload) => {
    _state.listClaimGroup = _payload;
  },
  SET_CREATE_CLAIM_ERROR: (_state, _payload) => {
    _state.createClaimError = _payload;
  },
  SET_LIST_CLAIM_CREATE: (_state, _payload) => {
    _state.listClaimCreated = _payload;
  },
  SET_LIST_OUT_PATIENT_CLAIM: (_state, payload) => {
    _state.listOutPatientClaim = payload;
  },
  SET_INFO_CLAIM_CREATED: (_state, _payload) => {
    _state.infoClaimCreated = _payload;
  },
  SET_LIST_CLAIM_REASON: (_state, payload) => {
    _state.listClaimReason = payload;
  },
  SET_MORE_CLAIM_STEP: (_state, payload) => {
    _state.moreClaimStep = payload;
  },
  SET_ENTITIES_CLAIM: (_state, payload) => {
    _state.entitiesClaim = payload;
  },
  SET_ENTITY_ACTIVE_CLAIM: (_state, payload) => {
    _state.entityActiveClaim = payload;
  },
  SET_LIST_CURRENCY: (_state, payload) => {
    _state.listCurrency = payload;
  },
  SET_LIST_ELIGIBLE_CLAIM_TYPE: (_state, payload) => {
    _state.listEligibleClaimType = payload;
  },
  SET_LIST_REFERRAL: (_state, payload) => {
    _state.listReferral = payload;
  },
  SET_LIST_CLAIM_MATE: (_state, payload) => {
    _state.listClaimMate = payload;
  },
  SET_CREATE_ALERT: (_state, payload) => {
    _state.createAlert = payload;
  },
  SET_CREATE_STEP_CLAIM_INFOR: (_state, payload) => {
    _state.createClaimStepInfor = payload;
  },
  SET_BALANCE: (_state, payload) => {
    _state.isBalance = payload;
  },
  SET_STEP_LIST: (_state, _step) => {
    _state.stepList = _step;
  },
  SET_STEP: (_state, _step) => {
    _state.step = _step;
  },
  SET_TAB(_state, _tab) {
    _state.tab = _tab;
  },
  SET_LIST_CLAIMS_ALL: (_state, _listClaimsAll) => {
    _state.listClaimsAll = _listClaimsAll;
  },
  SET_LIST_CLAIMS: (_state, _listClaims) => {
    _state.listClaims = _listClaims;
  },
  SET_LIST_CLAIMS_NAME: (_state, payload) => {
    _state.listClaimsName = payload;
  },
  SET_LIST_CLAIMS_TYPE: (_state, _listClaimsType) => {
    _state.listClaimsType = _listClaimsType;
  },
  SET_CURRENT_PAGE_CLAIMS: (_state, _currentPageClaim) => {
    _state.currentPageClaim = _currentPageClaim;
  },
  SET_CREATE_CLAIM_STEP: (_state, _stepCreateClaim) => {
    _state.createStep = _stepCreateClaim;
  },
  SET_CHOOSE_LOG: (_state, _chooseLog) => {
    _state.chooseLog = _chooseLog;
  },
  SET_LIST_STATUS: (_state, _listStatus) => {
    _state.listStatus = _listStatus;
  },
  SET_STATUS_LIST: (_state, _statusList) => {
    _state.statusList = _statusList;
  },
  SET_IS_PRE_SUBMISSION: (_state, _isPreSubmission) => {
    _state.isPreSubmission = _isPreSubmission;
  },
  SET_ATTACHMENT_TYPE: (_state, _attachmentType) => {
    _state.attachmentType = _attachmentType;
  },
  SET_CLAIM_DYNAMIC: (_state, _claimDynamic) => {
    _state.claimDynamic = _claimDynamic;
  },
  SET_LIST_CLAIM_TYPE: (_state, payload) => {
    _state.listClaimType = payload;
  },
  SET_LIST_HISTORY_TYPE: (_state, _listHistoryType) => {
    _state.listHistoryType = _listHistoryType;
  },
  SET_LIST_HOSPITAL: (_state, _listHospital) => {
    _state.listHospital = _listHospital;
  },
  SET_LIST_SERVICE_PROVIDER: (_state, _listServiceProvider) => {
    _state.listServiceProvider = _listServiceProvider;
  },
  SET_LIST_POLICY_CLAIM_REASON: (_state, _listPolicyClaimReason) => {
    _state.listPolicyClaimReason = _listPolicyClaimReason;
  },
  SET_IS_CREATE_CLAIM: (_state, _isCreateClaim) => {
    _state.isCreateClaim = _isCreateClaim;
  },
  SET_MY_CLAIM: (_state,payload) =>{
    _state.myClaim =payload
  },
  SET_LIST_OUTPATIENT_CLAIM_TYPE: (_state, listOutpatientClaimType) => {
    _state.listOutpatientClaimType = listOutpatientClaimType;
  },
  SET_INSURANCE_OUTPATIENT: (_state, _payload) => {
    _state.insuranceOutpatient = _payload;
  },
  SET_LIST_ADMISSION_TYPE: (_state, _listAdmissionType) => {
    _state.listAdmissionType = _listAdmissionType;
  },
  SET_OUT_CLAIM_SELECTED: (_state,_payload) =>{
    _state.outClaimSelected = _payload
  },
  SET_CLAIM: (_state, _claim) => {
    _state.claim = _claim;
  },
  SET_MY_ATTACHMENTS: (_state, myAttachments) => {
    _state.myAttachments = myAttachments;
  },
	SET_ALERT: (_state, alert) => {
		_state.alert = alert;
	},
};
export const actions = {
  handleSetLoading: ({commit}, _payload) => {
    commit('SET_LOADING', _payload)
  },
  setValueRefNoOutpaitent: ({commit},_payload)=>{
    commit('SET_REFNO_OUTPAITENT',_payload)
  },
  setValueActiveCLaimOutpaitent: ({commit},_payload)=>{
    commit('SET_VALUE_ACTIVE_CLAIM_OUTPAITENT',_payload)
  },
  setSelectedOutpaitent:({commit}, _payload) =>{
    commit('SET_SELECTED_OUTPAITENT',_payload)
  },
  handleSetListOutPaitentClaim:({commit},_payload) =>{
    commit('SET_LIST_CLAIM_REASON',_payload)
  },
  setOutpaitentClaimObject : ({commit},_payload) =>{
    commit('SET_OUTPAITENT_CLAIM_OBJECT', _payload)
  },
  setResOutMulClaim: ({commit},_payload) =>{
    commit('SET_RES_OUT_MUL_CLAIM',_payload)
  },
  setOutClaimSelected: ({commit},_payload)=>{
    commit('SET_OUT_CLAIM_SELECTED',_payload)
  },
  setActiveOutpaitent: ({commit},_payload) =>{
    commit('SET_ACTIVE_OUTPAITENT',_payload)
  },
  setIsMulteOutpaitent: ([commit], _payload) => {
    commit('SET_IS_MULTI_OUTPAITENT', _payload);
  },
  setListClaimGroup: async ([commit], _payment) => {
    const listClaimType = await postAxios(_payment);
    const data = JSON.parse(listClaimType.data.data[0].value);
    commit('SET_LIST_CLAIM_GROUP', data);
  },
  setListClaimCreated: ({ commit }, _payload) => {
    commit('SET_LIST_CLAIM_CREATE', _payload);
  },
  setListOutPatientClaim: ({ commit }, _payload) => {
    commit('SET_LIST_OUT_PATIENT_CLAIM', _payload);
  },
  setInsuranceOutpatient: ({ commit }, _payload) => {
    commit('SET_INSURANCE_OUTPATIENT', _payload);
  },
  setInfoClaimCreated: ({ commit }, _payload) => {
    commit('SET_INFO_CLAIM_CREATED', _payload);
  },
  setListClaimReason: async ({ commit }, _payment) => {
    const listClaimType = await postAxios(_payment);
    const data = JSON.parse(listClaimType.data.data[0].value);
    commit('SET_LIST_CLAIM_REASON', data);
  },
  setListClaimType: async ({ commit }, _payment) => {
    const listClaimType = await postAxios(_payment);
    commit(
      'SET_LIST_CLAIM_TYPE',
      handleListCallApi(
        [...listClaimType.data.data[0].colNames],
        [...listClaimType.data.data[0].rows]
      )
    );
  },
  handleListClaimType: async ({ commit }, _payment) => {
    const listClaimType = await postAxios(_payment);
    commit(
      'SET_LIST_CLAIM_TYPE',
      JSON.parse(listClaimType.data.data[0].value).summaries
    );
  },
  setMoreClaimStep: ({ commit }, _payment) => {
    commit('SET_MORE_CLAIM_STEP', _payment);
  },
  setEntitiesClaim: ({ commit }, _payment) => {
    commit('SET_ENTITIES_CLAIM', _payment);
  },
  setEntityActiveClaim: ({ commit }, _payment) => {
    commit('SET_ENTITY_ACTIVE_CLAIM', _payment);
  },
  setListClaimMate: async ({ commit }, _payment) => {
    const res = await postAxios(_payment);
    let data = handleListCallApi(
      [...res.data.data[3].colNames],
      [...res.data.data[3].rows]
    )
    if(data && data.length) {
      data[0].id = "null";
      commit('SET_LIST_CLAIM_MATE',[...data]);
    } else {
      commit('SET_LIST_CLAIM_MATE',[]);
    }
  },
  setIsBlance: ({ commit }, _payment) => {
    commit('SET_BALANCE', _payment);
  },
  setCreateClaimStep: ({ commit }, _payment) => {
    commit('SET_CREATE_CLAIM_STEP', _payment);
  },
  changeLog: async ({ commit }, _payment) => {
    commit('SET_LOG', _payment);
  },
  changeTab: async ({ commit }, _payment) => {
    commit('SET_TAB', _payment);
  },
  getListClaim: async ({ commit }, _payment) => {
    const resListClaim = await postAxios(_payment);
    if (resListClaim.data.data[0].dt !== EXCEPTION) {
      commit('SET_LIST_CLAIMS_ALL', [...JSON.parse(resListClaim.data.data[0].value)]);
      commit(
        'SET_LIST_CLAIMS',
        [...JSON.parse(resListClaim.data.data[0].value)].slice(0, PAGINATE_CLAIM.pageRange)
      );
    }
  },
  handleCurrentPage: async (_store, _payment) => {
    _store.commit('SET_CURRENT_PAGE_CLAIMS', _payment);
    _store.commit(
      'SET_LIST_CLAIMS',
      [..._store.getters.listClaimsAll].slice(
        (_payment - 1) * PAGINATE_CLAIM.pageRange,
        _payment * PAGINATE_CLAIM.pageRange
      )
    );
  },
  setCreateStepClaimInfor: ({ commit }, payload) => {
    commit('SET_CREATE_STEP_CLAIM_INFOR', payload);
  },
  _setStepList: ({ commit }, payload) => {
    commit('SET_STEP_LIST', payload);
  },
  handleChooseLog: async ({ commit }, _payment) => {
    commit('SET_CHOOSE_LOG', _payment);
  },
  getStatusList: async ({ commit }, _payment) => {
    const resStatusList = await postAxios(_payment);
    if (resStatusList.data.data[0].dt !== EXCEPTION) {
      commit('SET_LIST_STATUS', JSON.parse(resStatusList.data.data[0].value));
    }
  },
  getListStatus: async ({ commit }, _payment) => {
    const resStatusList = await postAxios(_payment);
    if (resStatusList.data.data[0].dt !== EXCEPTION) {
      const data = JSON.parse(resStatusList.data.data[0].value);
      data.map(item => {
        item.name = Object.keys(item)[0];
      })

      commit('SET_STATUS_LIST', data);
    }
  },
  getListClaimsType: async ({ commit }, _payment) => {
    const resListClaimsType = await postAxios(_payment);
    if (resListClaimsType.data.data[0].dt !== EXCEPTION) {
      if (_payment.a1 && _payment.a1.isCreateClaim) {
        commit('SET_LIST_CLAIMS_TYPE', JSON.parse(resListClaimsType.data.data[0].value).summaries);
      } else if (_payment.a1) {
        commit('SET_LIST_CLAIMS_TYPE', handleListCallApi(
          [...resListClaimsType.data.data[0].colNames],
          [...resListClaimsType.data.data[0].rows]
        ));
      } else {
        commit('SET_LIST_CLAIMS_TYPE', JSON.parse(resListClaimsType.data.data[0].value).data.data);
      }
    }
  },
  getInpatientClaims: async ({ commit }, _payment) => {
    const resInpatientClaims = await postAxios(_payment);
    if (resInpatientClaims.data.data[0].dt !== EXCEPTION) {
      return JSON.parse(resInpatientClaims.data.data[0].value).data;
    }
    return [];
  },
  preSubmission: async ({ commit }, _payment) => {
    const resPreSubmission = await postAxios(_payment);
    if (resPreSubmission.data.data[0].dt !== EXCEPTION) {
      commit('SET_IS_PRE_SUBMISSION', true);
      return JSON.parse(resPreSubmission.data?.data[0].value);
    }
    return null;
  },
  getAttachmentType: async ({ commit }, _payment) => {
    const resAttachmentType = await postAxios(_payment);
    if (resAttachmentType.data.data[0].dt !== EXCEPTION) {
      commit('SET_ATTACHMENT_TYPE', JSON.parse(resAttachmentType.data.data[0].value));
    }
  },
  getPolicyClaimReason: async ({ commit }, _payment) => {
    const resPolicyClaimReason = await postAxios(_payment);
    if (resPolicyClaimReason.data.data[0].dt !== EXCEPTION) {
      if (_payment.a1.disableotherclaimreason) {
        commit('SET_LIST_POLICY_CLAIM_REASON', handleListCallApi(
          [...resPolicyClaimReason.data.data[0].colNames],
          [['null', 'Others'], ...resPolicyClaimReason.data.data[0].rows]
        ));
      } else {
        commit('SET_LIST_POLICY_CLAIM_REASON', handleListCallApi(
          [...resPolicyClaimReason.data.data[0].colNames],
          [...resPolicyClaimReason.data.data[0].rows]
        ));
      }
    }
  },
  loadInitialData: async ({ commit }, _payment) => {
    const resLoadInitialData = await postAxios(_payment);
    if (resLoadInitialData.data.data[0].dt !== EXCEPTION) {
      commit(
        'SET_LIST_HOSPITAL',
        handleListCallApi(
          [...resLoadInitialData.data.data[0].colNames],
          [...resLoadInitialData.data.data[0].rows]
        )
      );
      commit(
        'SET_LIST_HISTORY_TYPE',
        handleListCallApi(
          [...resLoadInitialData.data.data[1].colNames],
          [...resLoadInitialData.data.data[1].rows]
        )
      );
      commit(
        'SET_LIST_SERVICE_PROVIDER',
        handleListCallApi(
          [...resLoadInitialData.data.data[4].colNames],
          [...resLoadInitialData.data.data[4].rows]
        )
      );
      commit(
        'SET_LIST_CURRENCY',
        handleListCallApi(
          [...resLoadInitialData.data.data[7].colNames],
          [...resLoadInitialData.data.data[7].rows]
        )
      );
    }
    return null;
  },
  handleListCurrency: async ({ commit }, _payment) => {
    const res = await postAxios(_payment);
    const xmlArrRes = res.data.data[0];
    const colNames = xmlArrRes.colNames;
    const rows = xmlArrRes.rows;
    commit('SET_LIST_CURRENCY', handleListCallApi([...colNames], [...rows]));
  },
  handleListReferral: async ({ commit }, _payment) => {
    const res = await postAxios(_payment);
    if(res.status > 400) return;
    if (res.data.data[0].dt !== EXCEPTION) {
      const xmlArrRes = res.data.data[0];
      const colNames = xmlArrRes.colNames;
      const rows = xmlArrRes.rows;
      commit('SET_LIST_REFERRAL', handleListCallApi([...colNames], [...rows]));
    }
  },
  handleListClaimGroup: async ({ commit, dispatch }, _payment) => {
    const res = await postAxios(_payment);
    if(res.status > 400) return;
    if (res.data.data[0].dt !== EXCEPTION) {
      const xmlArrRes = res.data.data[0];
      const colNames = xmlArrRes.colNames;
      const rows = xmlArrRes.rows;
      const listClaimGroup = handleListCallApi([...colNames], [...rows]);
      listClaimGroup.sort((a, b) => a.id > b.id ? 1 : -1);
      commit('SET_LIST_CLAIM_GROUP', listClaimGroup);
    }
  },

  handleListEligibleClaimType: async ({ commit }, _payment) => {
    const res = await postAxios(_payment);
    const xmlArrRes = res.data.data[0].value;
    const eligibleClaimType = JSON.parse(xmlArrRes).summaries;
    commit('SET_LIST_ELIGIBLE_CLAIM_TYPE', eligibleClaimType);
  },
  handleListOutpatientClaimType: async ({ commit }, _payment) => {
    const res = await postAxios(_payment);
    const xmlArrRes = res.data.data[0];
    let listClaimType = [];
    if(xmlArrRes){
      const colNames = xmlArrRes.colNames;
      const rows = xmlArrRes.rows ?? [];
      rows.forEach((element, index) => {
        let obj = {};
        colNames.forEach((ele, i) => {
          obj[ele] = element[i];
        });
        listClaimType.push(obj);
      });
      let listClaimTypeFormat = [];
      listClaimType.forEach((claimType, index) => {
        const isExist = listClaimTypeFormat.findIndex(e => e.id == claimType.id) > 0;
        if (!isExist) listClaimTypeFormat.push(claimType);
      });
      commit('SET_LIST_OUTPATIENT_CLAIM_TYPE', listClaimTypeFormat);
    }
  },
  createClaim: async ({ commit }, _payment) => {
    const resCreateClaim = await postAxios(_payment);
    if (resCreateClaim.data.data[0].dt !== EXCEPTION) {
      commit('SET_IS_CREATE_CLAIM', 2);
      commit('SET_CLAIM', JSON.parse(resCreateClaim.data.data[0].value));
      return resCreateClaim.data;
    } else {
      commit('SET_IS_CREATE_CLAIM', 3);
      return resCreateClaim.data;
    }
  },
  handleMyClaim: async ({ commit }, _payment) => {
    const res = await postAxios(_payment);
    const xmlArrRes = res.data.data[0];
    let myClaim = {};
    xmlArrRes.colNames.forEach((el,i)=>{
      myClaim[el] = xmlArrRes.rows[0][i]
    })
    commit('SET_MY_CLAIM', myClaim);
  },
  getMyClaim: async ({ commit }, _payment) => {
    const res = await postAxios(_payment);
    commit('SET_MY_ATTACHMENTS', JSON.parse(res.data.data[0].value)[0].attachments);
  },
  setListProvider:({commit},_payload) =>{
    commit('SET_LIST_SERVICE_PROVIDER',_payload)
  },
  setMyClaimEdit: async ({ commit }, myClaim) => {
    commit('SET_MY_CLAIM', myClaim);
  },
  handleListClaimsName: async ({ commit }, _payment) => {
    const res = await postAxios(_payment);
    commit('SET_LIST_CLAIMS_NAME',[...handleListCallApi(
      [...res.data.data[0].colNames],
      [...res.data.data[0].rows]
    ),{id:"null",name:"Self"}]);
  },
  getListAdmissionType: async ({ commit }, _payment) => {
    const listAdmissionType = await postAxios(_payment);
    commit(
      'SET_LIST_ADMISSION_TYPE',
      handleListCallApi(
        [...listAdmissionType.data.data[0].colNames],
        [...listAdmissionType.data.data[0].rows]
      )
    );
  },
  checkPrePostSubClaimType: async ({ commit }, _payment) => {
    const resCheckPrePostSubClaimType = await postAxios(_payment);
    if (resCheckPrePostSubClaimType.data.data[0].dt !== EXCEPTION) {
      return JSON.parse(resCheckPrePostSubClaimType.data?.data[0].value);
    }
    return null;
  },
  getEligibleClaimType: async ({ commit }, _payment) => {
    const resGetEligibleClaimType = await postAxios(_payment);
    if (resGetEligibleClaimType.data.data[0].dt !== EXCEPTION) {
      commit('SET_CLAIM_DYNAMIC', JSON.parse(resGetEligibleClaimType.data?.data[0].value));
      return JSON.parse(resGetEligibleClaimType.data?.data[0].value);
    }
    return null;
  },
  setCreateClaimError: async ({ commit }, _payment) => {
    commit('SET_CREATE_CLAIM_ERROR',_payment);
  },
  getListTab: async ({ commit }, _payment) => {
    const resListTab = await postAxios(_payment);
    if (resListTab.data.data[0].dt !== EXCEPTION) {
      return handleListCallApi(
        [...resListTab.data.data[0].colNames],
        [...resListTab.data.data[0].rows]
      );
    }
    return null;
  },
  ocrProcess: async ({ commit }, _payment) => {
    const resOcrProcess = await postAxios(_payment);
    if (resOcrProcess.data.data[0].dt !== EXCEPTION) {
      return JSON.parse(resOcrProcess.data?.data[0].value);
    }
    return null;
  },
	handleCloseAlert: async ({ commit }) => {
		commit('SET_ALERT', {
			isShow: false,
			typeAlert: 'success',
			textAlert: ''
		});
	},
	handleChangeAlert: async ({ commit }, payload) => {
		commit('SET_ALERT', payload);
	},
  handleListFileInpatient: async ({ commit }, payload) => {
		commit('SET_LIST_FILE_INPATIENT', payload);
	},

  handleMyAttachments: async ({ commit }, _payment) => {
    const res = await postAxios(_payment);
    const xmlArrRes = res.data.data[0];
    const value = JSON.parse(xmlArrRes.value);
    commit('SET_MY_ATTACHMENTS', value[0].attachments);
  },
  setMyAttachments: async ({ commit }, payload) => {
    commit('SET_MY_ATTACHMENTS', payload);
  },
  detailClaim: async ({ commit }, _payment) => {
    const resDetailClaim = await postAxios(_payment);
    if (resDetailClaim.data.data[0].dt !== EXCEPTION) {
      return JSON.parse(resDetailClaim.data?.data[0].value);
    }
    return null;
  },
  setCreatedOneClaim: ({commit},_payload) =>{
    commit('SET_CREATED_ONE_CLAIM',_payload)
  },
  deleteClaim: async ({ commit }, _payment) => {
    const resDeleteClaim = await postAxios(_payment);
    if (resDeleteClaim.data.data[0].dt !== EXCEPTION) {
      return true;
    }
    return false;
  },
  handleLoadSettlement: async ({ commit }, _payment) => {
    const resListTab = await postAxios(_payment);
    if (resListTab.data.data[0].dt !== EXCEPTION) {
      commit('SET_REIMBURSEMENT_DETAIL', handleListCallApi(
        [...resListTab.data.data[0].colNames],
        [...resListTab.data.data[0].rows]
      )[0]);
    }
  },

  vipCallBackTrigger: async ({ commit }, _payment) => {
    const resVipCallBackTrigger = await postAxios(_payment);
    return resVipCallBackTrigger.data;
  },
}
