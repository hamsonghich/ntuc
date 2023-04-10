<template>
  <div class="">
    <div class="wrapper__content__quick__log w-100 detail-claim-containter claimCreate_step-7">
      <div class="wrapper__content">
        <div class="title__quick__log">{{ $t('quick_log.thank_you') }}</div>
        <div class="question__quick__log mb-4">{{ $t('claim.claim_notice') }}</div>
        <div class="wrapper_checkbox_log__supp wrapper_checkbox_quick_log mb-4 mt-4">
          <div class="claimCreate_step-7--main">
            <b-row class="claimCreate_step-7--wap m-0 p-0">
              <b-col class="claimCreate_step-7--right pl-0 pr-2">
                <b-row class="claimCreate_step-7--row m-0 p-0">
                  <b-col class="claimCreate_step-7--col m-0 pl-0" cols="12" md="12" lg="6" xl="6">
                    <b-form-group id="input-group-1" label="Employee Name" label-for="input-1">
                      <b-input
                        class="w-100 input-claim-cs"
                        :placeholder="'Employee Name'"
                        :value="empName"
                        disabled
                      />
                    </b-form-group>
                  </b-col>
                  <b-col class="claimCreate_step-7--col m-0 pr-0" cols="12" md="12" lg="6" xl="6">
                    <b-form-group id="input-group-1" label="Claimant Name" label-for="input-1">
                      <Autocomplete
                        :placeholder="'Claimant Name'"
                        :value="createClaimStepInfor.claimantName"
                        :displayAttribute="'name'"
                        :valueAttribute="'id'"
                        :optionDropdowns="listClaimMate"
                        :filter="true"
                        :isHeight50="true"
                        :isDisabled="true"
                      />
                    </b-form-group>
                  </b-col>
                </b-row>
                <b-row class="claimCreate_step-7--row m-0 p-0">
                  <b-col class="claimCreate_step-7--col m-0 pl-0" cols="12" md="12" lg="6" xl="6">
                    <b-form-group id="input-group-1" label="Incurred Date" label-for="input-1">
                      <div :class="{ 'position-relative': true, input__disabled: true }">
                        <date-picker
                          class="input__custom input-claim-cs input__date w-100"
                          :value="new Date(createClaimStepInfor.dateCreate)"
                          placeholder="Select Date"
                          name="date"
                          :disabled="true"
                          :config="{ format: 'DD/MM/YYYY' }"
                        >
                        </date-picker>
                        <img
                          alt="icon__date__picker"
                          class="icon__date__picker"
                          src="@/assets/images/icon-date-picker.png"
                        />
                      </div>
                    </b-form-group>
                  </b-col>
                  <b-col class="claimCreate_step-7--col m-0 pr-0" cols="12" md="12" lg="6" xl="6">
                    <b-form-group id="input-group-1" label="Claim Type" label-for="input-1">
                      <Autocomplete
                        :placeholder="'Please select'"
                        :value="claimForm.claimType"
                        :displayAttribute="'claimtypename'"
                        :valueAttribute="'claimtype'"
                        :optionDropdowns="listEligibleClaimType"
                        :filter="true"
                        :isHeight50="true"
                        @changeValue="value => changeClaimType(value)"
                      />
                    </b-form-group>
                  </b-col>
                </b-row>
                <b-row v-if="objLabel.label2" class="claimCreate_step-7--row m-0 p-0">
                  <b-col class="mw-25">
                    <b-form-group id="input-group-1" label="Currency" label-for="input-1">
                      <Autocomplete
                        :placeholder="'Currency'"
                        :value="claimForm.currency"
                        :displayAttribute="'name'"
                        :valueAttribute="'id'"
                        :optionDropdowns="listCurrency"
                        :filter="true"
                        :isHeight50="true"
                        @changeValue="value => (this.claimForm.currency = value)"
                      />
                    </b-form-group>
                  </b-col>
                  <b-col>
                    <b-form-group
                      id="input-group-1"
                      :label="objLabel.label2"
                      label-for="input-1"
                      class="w-100"
                    >
                      <currency-input
                        v-model="claimForm.incurredamt"
                        class="w-100 input__custom input-claim-cs"
                        :placeholder="objLabel.label2"
                        :min="0"
                        locale="en-US"
                      />
                    </b-form-group>
                  </b-col>
                </b-row>
                <b-row v-if="objLabel.label1">
                  <b-col>
                    <b-form-group :label="objLabel.label1">
                      <Autocomplete
                        :placeholder="objLabel.label1"
                        :value="claimForm.label1"
                        :displayAttribute="'name'"
                        :valueAttribute="'id'"
                        :optionDropdowns="label1DataList"
                        :filter="true"
                        :isHeight50="true"
                        @changeValue="value => (this.claimForm.label1 = value)"
                      />
                    </b-form-group>
                  </b-col>
                </b-row>
                <b-row v-if="objLabel.label3 && isShowClaimReason">
                  <b-col>
                    <b-form-group :label="objLabel.label3">
                      <Autocomplete
                        :placeholder="objLabel.label3"
                        :value="claimForm.label3"
                        :displayAttribute="'name'"
                        :valueAttribute="'id'"
                        :optionDropdowns="label3DataList"
                        :filter="true"
                        :isHeight50="true"
                        @changeValue="value => (this.claimForm.label3 = value)"
                      />
                    </b-form-group>
                  </b-col>
                </b-row>
                <b-row v-if="objLabel.label4">
                  <b-col>
                    <b-form-group :label="objLabel.label4">
                      <Autocomplete
                        :placeholder="objLabel.label4"
                        :value="claimForm.label4"
                        :displayAttribute="'name'"
                        :valueAttribute="'id'"
                        :optionDropdowns="label4DataList"
                        :filter="true"
                        :isHeight50="true"
                        @changeValue="value => (this.claimForm.label4 = value)"
                      />
                    </b-form-group>
                  </b-col>
                </b-row>
                <b-row v-if="objLabel.label6 && objLabel.referalletter == 'true'">
                  <b-col class="d-flex col-custome">
                    <b-form-group :label="objLabel.label6" class="w-100">
                      <div class="d-flex flex-row align-items-start">
                        <Autocomplete
                          :key="refferalKey"
                          :value="claimForm.referalletter"
                          class="referral-input w-100"
                          :placeholder="'Please select'"
                          :displayAttribute="'label'"
                          :valueAttribute="'id'"
                          :optionDropdowns="listReferral"
                          :isHeight50="true"
                          @changeValue="value => (this.claimForm.referalletter = value)"
                        />
                        <button class="referral-btn" v-b-modal.refferal-modal>
                          <b-icon-box-arrow-in-up-right />Referral
                        </button>
                      </div>
                    </b-form-group>
                  </b-col>
                </b-row>
                <b-row v-if="objLabel.label5">
                  <b-col>
                    <b-form-group :label="objLabel.label5">
                      <textarea
                        class="w-100 input_remarks"
                        v-model="claimForm.remarkbyemployee"
                        placeholder="State any other information relating to your claim."
                        rows="3"
                        max-rows="6"
                      ></textarea>
                    </b-form-group>
                  </b-col>
                </b-row>
              </b-col>
              <b-col>
                <div class="wrapper__file__log claimCreate_step-7--left pr-0 pl-3" id="lightgallery">
                  <a
                    :href="url + '/' + image.url"
                    v-for="(image, index) in createClaimStepInfor.files"
                    :key="index"
                  >
                    <img :src="url + '/' + image.thumbnailUrl" alt="icon__date__picker"/>
                  </a>
                </div>
              </b-col>
            </b-row>
          </div>
        </div>
        <div class="d-flex pb-4 align-items-center">
          <div class="mr-2">
            <div class="same_receipt" @click="_createMoreClaim">
              {{ $t('claim.same_receipt') }}
              <b-icon icon="plus-circle-fill" style="color: var(--NTUC-3)" />
            </div>
            <div>
              <span class="claim_save_lab">{{ $t('claim.we_will_save_claim') }}</span>
            </div>
          </div>
        </div>
      </div>
      <div class="quick-log-btn d-flex justify-content-between pt-4">
        <button type="button" @click="_backStep" class="btn btn__claim button__log btn_back _btn_next_claim">
          Back
        </button>
        <button type="button" @click="_nextStep" class="btn btn__claim button__log _btn_next_claim">{{entitiesClaim.length > 1 ? 'Finish' : 'Save'}}</button>
      </div>

      <RefferalLetterModal
        idModal="refferal-modal"
        @handleRefferalList="_getRefferalListing"
        :key="refferalKey"
      />
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import { postAxios } from '@/services/callApi';
import RefferalLetterModal from '@/components/claim/create/refferalLetterModal.vue';
export default {
  components: {
    RefferalLetterModal
  },
  data() {
    return {
      claimForm: {
        claimType: ''
      },
      objLabel: {},
      eligibleClaimType: [],
      label1DataList: [],
      label3DataList: [],
      label4DataList: [],
      url: null,
      refferalKey: 1 //re-render component when update refferalKey
    };
  },
  computed: {
    ...mapGetters('claim', [
      'createClaimStepInfor',
      'listClaimMate',
      'listCurrency',
      'listReferral',
      'listEligibleClaimType',
      'entitiesClaim',
      'entityActiveClaim'
    ]),
    empName: () => localStorage.getItem('empName'),
    empId: () => localStorage.getItem('empid'),
    isShowClaimReason() {
      if (this.objLabel.label3) {
        if (
          this.objLabel.label3.includes('Claim Reason') &&
          this.objLabel.disableotherclaimreason !== 'false'
        ) {
          return false;
        }
      }
      return true;
    }
  },
  async created() {
    await this._getEligibleClaimType();
    await this._getCurrencyListing();
    await this._getRefferalListing();
    this.url = process.env.IMAGE_URL
  },
  mounted() {
    const el = document.getElementById('lightgallery')
    window.lightGallery(el)
  },
  watch: {
    'claimForm.claimType'(newVal, oldVal) {
      this._getRelatedListing(newVal);
    },
    entityActiveClaim(newVal, oldVal) {
      if(newVal >= 0){
        this.claimForm = this.entitiesClaim[newVal];
      }
    },
    claimForm: {
      handler: function (newVal, oldVal) {
        const entitiesClaimCopy = [...this.entitiesClaim];
        entitiesClaimCopy[this.entityActiveClaim] = newVal;
        this.setEntitiesClaim(JSON.parse(JSON.stringify(entitiesClaimCopy)));
      },
      deep: true
    }
  },
  methods: {
    ...mapActions('claim', [
      'setCreateClaimStep',
      'setCreateStepClaimInfor',
      'handleListCurrency',
      'handleListReferral',
      'handleListEligibleClaimType',
      'setEntitiesClaim',
      'setEntityActiveClaim',
      'setMoreClaimStep'
    ]),
    async _getRelatedListing(id) {
      const res = await postAxios({
        invoke: 'System.execute',
        argc: '2',
        a0: 'ClaimType.getRelatedListing',
        a1: { id: id }
      });
      this._handleObjLabel(res);
      this._handleLabel1DataList(res);
      this._handleLabel3DataList(res);
    },
    _handleObjLabel(res) {
      const xmlArrRes = res.data.data[0];
      let obj = {};
      if(xmlArrRes.dt != 'exception'){
        const colNames = xmlArrRes.colNames;
        const rows = xmlArrRes.rows[0] ?? [];
        colNames.forEach((ele, index) => {
          obj[ele] = rows[index];
        });
      }
      this.objLabel = obj;
    },
    _handleLabel1DataList(res) {
      const xmlArrRes = res.data.data[1];
      this.label1DataList = [];
      if(xmlArrRes){
        const colNames = xmlArrRes.colNames;
        const rows = xmlArrRes.rows ?? [];
        rows.forEach((element, index) => {
          let obj = {};
          colNames.forEach((ele, i) => {
            obj[ele] = element[i];
          });
          this.label1DataList.push(obj);
        });
      }
    },
    _handleLabel3DataList(res) {
      const xmlArrRes = res.data.data[2];
      this.label3DataList = [];
      if(xmlArrRes){
        const colNames = xmlArrRes.colNames;
        const rows = xmlArrRes.rows ?? [];
        rows.forEach((element, index) => {
          let obj = {};
          colNames.forEach((ele, i) => {
            obj[ele] = element[i];
          });
          this.label3DataList.push(obj);
        });
      }
    },
    async _getEligibleClaimType() {
      this.handleListEligibleClaimType({
        invoke: 'System.execute',
        argc: '2',
        a0: 'Claim.Apply.GetEligibleClaimType',
        a1: {
          employee: this.empId,
          employeedpdt: '',
          incurreddate: this.createClaimStepInfor.incurredDate,
          accessfrom: 'web'
        }
      });
    },
    async _getCurrencyListing() {
      await this.handleListCurrency({
        invoke: 'System.execute',
        argc: '2',
        a0: 'InsuranceClaim.GetCurrencyListing',
        a1: {
          incurreddate: this.createClaimStepInfor.incurredDate
        }
      });
    },
    async _getRefferalListing() {
      await this.handleListReferral({
        invoke: 'System.execute',
        argc: '2',
        a0: 'API.referralLetter',
        a1: {
          empid: this.empId
        }
      });
      this.refferalKey += 1;
    },
    _createMoreClaim() {
      const entitiesClaim = [...this.entitiesClaim];
      const index = entitiesClaim.findIndex(e => !e.claimType)
      if(index < 0) entitiesClaim.push({});

      this.setEntityActiveClaim(entitiesClaim.length - 1) // set active for last of array claims
      this.setEntitiesClaim(entitiesClaim);
      this.$router.push('/claim/create/more-claim');
    },
    changeClaimType(value){
      this.claimForm = {...this.claimForm, claimType: value};
    },
    _nextStep() {
      if (this.entitiesClaim.length < 2) {
        return this.setCreateClaimStep(8);
      } else {
        this.setMoreClaimStep(2)
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
@import '@/assets/css/claim/create/firstDetailClaim.css';
@import '@/assets/css/claim/create/fourthClaim.css';
@import '@/assets/css/quick-log/stepContent.css';
@import '@/assets/css/claim/stepOneLog.css';
@import '@/assets/css/claim/create/sameRecept.css';
.wrapper__file__log {
  display: inline-flex;
  gap: 10px;
}
</style>
