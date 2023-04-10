<template>
  <div class="d-flex justify-content-between h-100" :class="{ LoaderClaim: loading }">
    <div class="wrapper__content__quick__log">
      <div class="wrapper__content" v-if="loading">
        <div class="title__quick__log">{{ $t('log.understood') }} ...</div>
        <div class="question__quick__log">{{ $t('log.please_wait') }}</div>
        <div class="wap-loader">
          <div class="d-flex justify-content-center loading-spinner margin-top--45">
            <img class="Loader" src="@/assets/images/Loader.png" alt="Loader" />
          </div>
        </div>
      </div>
      <div class="wrapper__content" v-else>
        <div class="title__quick__log">{{ $t('claim.bear_with_us') }}</div>
        <div class="question__quick__log" v-if="listActiveClaimGroup.length != 0">
          {{ $t('claim.select_your_claim') }}
        </div>
        <div class="question__quick__log" v-else>
          It seems like there is no eligible benefits based on selections made. Please go back and
          update your selections. Thank you.
        </div>
        <div class="wrapper_checkbox_log__supp wrapper_checkbox_quick_log wrapper_claim">
          <div class="first_claim_noti_content mb-2 w-100 d-flex align-items-start" v-if="listActiveClaimGroup.length != 0">
            <span class="first_claim_noti text-16 mr-2">You may need to provide different information based on your selection</span>
            <span class="text--danger">*</span>
          </div>
          <div class="d-flex flex-column">
            <b-form-group>
              <b-form-radio
                class="mb-2"
                size="lg"
                v-show="listActiveClaimGroup.includes(claimGroup.id)"
                v-for="(claimGroup, index) in listClaimGroup"
                :key="index"
                v-model="selected"
                :value="claimGroup.id"
                >{{ claimGroup.name }}
                <b-icon
                  class="ml-2"
                  v-b-tooltip.hover.html.right="claimGroup.description"
                  icon="info-circle"
                ></b-icon>
              </b-form-radio>
            </b-form-group>
          </div>
        </div>
      </div>
      <div class="quick-log-btn d-flex justify-content-between _claim_mobile_btn">
        <button
          type="button"
          @click="_backStep"
          class="btn btn__claim button__log btn_back"
          style="background: #a8afb5"
        >
          Back
        </button>
        <button
          v-if="listActiveClaimGroup.length != 0"
          type="button"
          @click="_nextStep"
          class="btn btn__claim button__log"
        >
          Next
        </button>
        <!-- :class="{ 'd-none': listClaimGroup.length === 0 }" -->
      </div>
    </div>
    <quoteClaim />
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import quoteClaim from '../quoteClaim.vue';
import { postAxios } from '@/services/callApi';
import thirdClaimVue from './thirdClaim.vue';
export default {
  components: {
    quoteClaim,
    thirdClaimVue
  },
  data: () => ({
    selected: 1,
    loading: false,
    listActiveClaimGroup: [],
    das: [
      { id: '1', name: 'Flexible Benefits', description: 'Flex Benefit for your enjoyment.' },
      {
        id: '2',
        name: 'Outpatient Benefits',
        description: 'Outpatient Benefit for your protection.'
      },
      { id: '4', name: 'Inpatient Claims', description: 'Inpatient Benefit for your life.' }
    ]
  }),
  computed: {
    ...mapGetters('claim', ['createStep', 'createClaimStepInfor', 'listClaimGroup']),
    ...mapGetters('log', ['listClaims']),
    empId: () => localStorage.getItem('empid')
  },
  created() {
    this._changeAlertConfig({
      isShow: false,
      typeAlert: 'success',
      textAlert: ''
    });
    this.setCreateStepClaimInfor({
      ...this.createClaimStepInfor,
      files: [],
      localFile: [],
      listFileClaims: []
    });
  },
  async fetch() {
    this.loading = true;
    await this._fetchClaimGroup();
    await this._fetchStatusClaimGroup();
    this.loading = false;
  },
  methods: {
    ...mapActions('claim', [
      'setCreateClaimStep',
      'changeStep',
      'setCreateStepClaimInfor',
      '_setStepList',
      'handleListClaimGroup',
      'setListClaimReason'
    ]),
    ...mapActions('log', ['getListClaim']),
    ...mapActions('alert', ['_changeAlertConfig']),
    async _fetchClaimGroup() {
      await this.handleListClaimGroup({
        invoke: 'System.execute',
        argc: '2',
        a0: 'API.Autocomplete.Select',
        a1: {
          module: '15'
        }
      });
    },
    async _fetchStatusClaimGroup() {
      const res = await postAxios({
        invoke: 'System.execute',
        argc: '2',
        a0: 'API.Employee.CheckEligibleClaimGroup',
        a1: {
          employee: localStorage.getItem('empid'),
          employeedpdt:
            this.createClaimStepInfor.claimantName === 'null'
              ? null
              : this.createClaimStepInfor.claimantName,
          incurreddate: this.createClaimStepInfor.incurreddate,
          module: '15'
        }
      });
      //console.log(JSON.parse(res.data.data[0].value))
      if (res.data.data[0].dt !== 'exception') {
        const statusClaimGroupObj = JSON.parse(res.data.data[0].value);
        for (const property in statusClaimGroupObj) {
          if (statusClaimGroupObj[property]) this.listActiveClaimGroup.push(property);
        }
      }
    },
    async _nextStep() {
      this.setCreateStepClaimInfor({
        ...this.createClaimStepInfor,
        claimgroup: parseInt(this.selected)
      });
      if (this.selected != 4) this.setCreateClaimStep(6);
      else {
        await this.getListClaim({
          invoke: 'System.execute',
          argc: '2',
          a0: 'PolicyClaimApplied.LoadLOG',
          a1: {
            emp: localStorage.getItem('empid'),
            dependant:
              this.createClaimStepInfor.claimantName == 'null'
                ? ''
                : this.createClaimStepInfor.claimantName
          }
        });
        if (!this.listClaims[0]) {
          this._setStepList(2);
          this.setCreateClaimStep(2.1);
        } else {
          this._setStepList(2);
          this.setCreateClaimStep(1.1);
        }
      }
    },
    _backStep() {
      this.setCreateClaimStep(1);
    }
  }
};
</script>

<style scoped>
@import '@/assets/css/inputCustom/inputCustom.css';
@import '@/assets/css/claim/create/firstClaim.css';
@import '@/assets/css/claim/create/fourthClaim.css';
@import '@/assets/css/quick-log/stepContent.css';
@import '@/assets/css/claim/stepOneLog.css';
@import '@/assets/css/claim/create/loader-claim.css';
.wrapper_claim {
  margin-bottom: 98px;
}

::v-deep.bs-tooltip-right {
  left: 10px !important;
  max-width: 250px;
}
::v-deep .modal-header {
  border: none;
}
::v-deep .modal-content {
  background: none;
  border: none;
}
::v-deep .modal-footer {
  display: none;
}
::v-deep .close {
  display: none;
}

::v-deep .custom-control-input:checked ~ .custom-control-label::before {
  border-color: var(--NTUC-1) !important;
  background-color: var(--NTUC-1) !important;
}

::v-deep .custom-radio {
  color: #212529;
}
::v-deep .custom-control-label,
.custom-control-input[disabled] ~ .custom-control-label,
.custom-control-input:disabled ~ .custom-control-label {
  color: #212529;
  display: flex;
  align-items: center;
  word-break: break-word;
}
@media screen and (max-width: 768px) {
  ::v-deep .custom-control-label,
.custom-control-input[disabled] ~ .custom-control-label,
.custom-control-input:disabled ~ .custom-control-label {
  display: block;
}
}
</style>
