<template>
  <div class="claimCreate_step-7">
    <div class="wrapper__content__quick__log w-100 detail-claim-containter">
      <div class="wrapper__content">
        <div class="title__claim">Claimant Details</div>
        <div class="wrapper_checkbox_log__supp wrapper_checkbox_quick_log mb-4 mt-4">
          <div class="claimCreate_step-7--main p-0">
            <b-row class="m-0 p-0 claimCreate_step-7--wap">
              <b-col class="pl-0 claimCreate_step-7--left">
                <b-row class="m-0 p-0 claimCreate_step-7-groupField">
                  <b-col
                    class="pl-0 p--md-0 claimCreate_step-7--item"
                    sm="12"
                    md="12"
                    lg="12"
                    xl="6"
                  >
                    <b-form-group
                      id="input-group-1"
                      label-for="input-1"
                      class="claim-label require"
                    >
                      <div class="label__log mb-2">
                        Employee Name <span class="label__alert__isured">(*)</span>
                      </div>
                      <b-input
                        class="w-100 input-claim-cs input_custom m-0 h--50"
                        :placeholder="'Employee Name'"
                        :value="empName"
                        disabled
                      />
                    </b-form-group>
                  </b-col>
                  <b-col
                    class="pr-0 p--md-0 claimCreate_step-7--item"
                    sm="12"
                    md="12"
                    lg="12"
                    xl="6"
                  >
                    <b-form-group
                      id="input-group-1"
                      label-for="input-1"
                      class="claim-label require"
                    >
                      <div class="label__log mb-2">
                        Claimant Name <span class="label__alert__isured">(*)</span>
                      </div>
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
                  <b-col
                    class="pl-0 p--md-0 claimCreate_step-7--item"
                    sm="12"
                    md="12"
                    lg="12"
                    xl="6"
                  >
                    <b-form-group
                      id="input-group-1"
                      label-for="input-1"
                      class="claim-label require"
                    >
                      <div class="label__log mb-2">
                      Incurred Date <span class="label__alert__isured">(*)</span>
                      </div>
                      <DateTimePicker
                        class="w-100 h-date-50px"
                        :value="new Date(createClaimStepInfor.incurreddate)"
                        placeholder="Select Date"
                        name="date"
                        :disabled="true"
                        :options="{ format: 'DD-MM-YYYY' }"
                      >
                      </DateTimePicker>
                    </b-form-group>
                  </b-col>
                  <b-col
                    class="pr-0 p--md-0 claimCreate_step-7--item"
                    sm="12"
                    md="12"
                    lg="12"
                    xl="6"
                  >
                    <b-form-group
                      id="input-group-1"
                      label-for="input-1"
                      class="claim-label require"
                    >
                      <div class="label__log mb-2">
                        Claim Type <span class="label__alert__isured">(*)</span>
                      </div>
                      <multiselect
                        v-b-tooltip.hover.html.top="handleClaimTypeName()"
                        placeholder="Select Claim Type"
                        class="input_custom h--50"
                        :class="{ 'is-invalid': objError.claimtype.status }"
                        v-model="activeClaimGroup"
                        :options="claimGroupList"
                        :multiple="false"
                        group-values="data"
                        group-label="groups"
                        :group-select="false"
                        track-by="claimtype"
                        label="claimtypename"
                        @input="value => (this.activeClaimGroup = value)"
                        selectLabel=" "
                        deselectLabel=" "
                        selectedLabel=" "
                      >
                        <span slot="noResult">{{ $t('No_data') }}</span>
                      </multiselect>
                      <b-form-invalid-feedback v-if="objError.claimtype.status" class="d-block">
                        {{ objError.claimtype.error }}
                      </b-form-invalid-feedback>
                    </b-form-group>
                  </b-col>

                  <div class="title__claim">Claim Details</div>
                </b-row>
                <b-row v-if="claimForm.claimtype" class="m-0 p-0 claimCreate_step-7-groupField">
                  <b-col
                    class="pl-0 p--md-0 claimCreate_step-7--item"
                    sm="12"
                    md="12"
                    lg="12"
                    xl="6"
                  >
                    <b-form-group
                      id="input-group-1"
                      label-for="input-1"
                      class="claim-label require"
                    >
                      <div class="label__log mb-2">
                        Invoice No.<span class="label__alert__isured">(*)</span>
                      </div>
                      <b-input
                        class="w-100 input-claim-cs input_custom m-0 h--50"
                        :class="{ 'is-invalid': objError.invoiceno.status }"
                        :placeholder="'Enter Invoice No.'"
                        v-model="claimForm.invoiceno"
                      />
                      <b-form-invalid-feedback v-if="objError.invoiceno.status" class="d-block">
                        {{ objError.invoiceno.error }}
                      </b-form-invalid-feedback>
                    </b-form-group>
                  </b-col>
                </b-row>
                <b-row v-if="objLabel.label2" class="m-0 p-0 claimCreate_step-7-groupField">
                  <b-col
                    class="pl-0 p--md-0 claimCreate_step-7--item"
                    sm="12"
                    md="12"
                    lg="12"
                    xl="6"
                  >
                    <b-form-group
                      id="input-group-1"
                      label-for="input-1"
                      class="claim-label require"
                    >
                    <div class="label__log mb-2">
                      Currency<span class="label__alert__isured">(*)</span>
                      </div>
                      <Autocomplete
                        :placeholder="'Currency'"
                        :class="{ 'is-invalid': objError.currency.status }"
                        :value="claimForm.currency"
                        :displayAttribute="'name'"
                        :valueAttribute="'id'"
                        :optionDropdowns="listCurrency"
                        :filter="true"
                        :isHeight50="true"
                        @changeValue="
                          value => (this.claimForm = { ...this.claimForm, currency: value })
                        "
                      />
                      <b-form-invalid-feedback v-if="objError.currency.status" class="d-block">
                        {{ objError.currency.error }}
                      </b-form-invalid-feedback>
                    </b-form-group>
                  </b-col>
                  <b-col
                    class="pr-0 p--md-0 claimCreate_step-7--item"
                    sm="12"
                    md="12"
                    lg="12"
                    xl="6"
                  >
                    <b-form-group
                      id="input-group-1"
                      label-for="input-1"
                      class="claim-label require w-100"
                    >
                    <div class="label__log mb-2">
                      {{ objLabel.label2 }}<span class="label__alert__isured">(*)</span>
                      </div>
                      <currency-input
                        v-model="claimForm.incurredamt"
                        placeholder="Enter Incurred Amount"
                        class="w-100 m-0 input_custom currency"
                        :class="{ 'is-invalid': objError.incurredamt.status }"
                        :min="0"
                        locale="en-US"
                        :precision="{ min: 0, max: 2 }"
                        :currency="null"
                        :distraction-free="false"
                      />
                      <b-form-invalid-feedback v-if="objError.incurredamt.status" class="d-block">
                        {{ objError.incurredamt.error }}
                      </b-form-invalid-feedback>
                    </b-form-group>
                  </b-col>
                </b-row>
                <div
                  class="d-flex flex-row"
                  v-if="objLabel.cpfpayable == '1' || objLabel.taxable == '1'"
                >
                  <div class="checkbox-label mb-2">Your claim category is liable for</div>
                  <img v-if="objLabel.cpfpayable == '1'" height="16" width="16" class="mr-2" src="@/assets/images/cpf.svg"/>
                  <img v-if="objLabel.taxable == '1'" height="16" width="16" src="@/assets/images/gst.svg"/>
                </div>
                <div class="d-flex flex-row mb-2" v-if="claimForm.incurredamt != null">
                  <div class="checkbox-label">
                    Converted to wallet currency ({{ walletCurrency() }}):  <span class="text-NTUC-3">{{ convertSGD() }}</span>
                  </div>
                </div>

                <b-row class="m-0 p-0 claimCreate_step-7-groupField">
                  <b-col v-if="objLabel.label1" class="pl-0 p--md-0 claimCreate_step-7--item"
                    sm="12"
                    md="12"
                    lg="12"
                    xl="6"
                  >
                    <b-form-group class="claim-label require">
                      <div class="label__log mb-2">
                      {{ objLabel.label1 }}<span class="label__alert__isured">(*)</span>
                      </div>
                      <Autocomplete
                        :placeholder="objLabel.label1"
                        :value="claimForm.combinedserviceproviders"
                        :class="{ 'is-invalid': objError.combinedserviceproviders.status }"
                        :displayAttribute="'name'"
                        :valueAttribute="'id'"
                        :optionDropdowns="label1DataList"
                        :filter="true"
                        :isHeight50="true"
                        @changeValue="
                          value =>
                            (this.claimForm = {
                              ...this.claimForm,
                              combinedserviceproviders: value
                            })
                        "
                      />
                      <b-form-invalid-feedback
                        v-if="objError.combinedserviceproviders.status"
                        class="d-block"
                      >
                        {{ objError.combinedserviceproviders.error }}
                      </b-form-invalid-feedback>
                    </b-form-group>
                  </b-col>

                  <b-col v-show="objLabel.label1 && claimForm.combinedserviceproviders == 'null'" class="pr-0 p--md-0 claimCreate_step-7--item"
                    sm="12"
                    md="12"
                    lg="12"
                    xl="6"
                  >
                    <b-form-group class="claim-label require">
                      <div class="label__log mb-2">
                      {{ objLabel.label1 + ' (Others)' }}<span class="label__alert__isured">(*)</span>
                      </div>
                      <b-input
                        :class="{ 'is-invalid': objError.serviceproviderother.status }"
                        class="w-100 input-claim-cs input_custom m-0 h--50"
                        :placeholder="objLabel.label1 + ' (Others)'"
                        v-model="claimForm.serviceproviderother"
                      />
                      <b-form-invalid-feedback
                        v-if="objError.serviceproviderother.status"
                        class="d-block"
                      >
                        {{ objError.serviceproviderother.error }}
                      </b-form-invalid-feedback>
                    </b-form-group>
                  </b-col>
                </b-row>

                <b-row class="m-0 p-0 claimCreate_step-7-groupField">
                  <b-col v-if="objLabel.label3" class="pl-0 p--md-0 claimCreate_step-7--item" sm="12" md="12" lg="12" xl="6">
                    <b-form-group class="claim-label require">
                      <div class="label__log mb-2">
                      {{ objLabel.label3 }}<span class="label__alert__isured">(*)</span>
                      </div>
                      <Autocomplete
                        :placeholder="objLabel.label3"
                        :class="{ 'is-invalid': objError.claimreason.status }"
                        :value="claimForm.claimreason"
                        :displayAttribute="'name'"
                        :valueAttribute="'id'"
                        :optionDropdowns="label3DataList"
                        :filter="true"
                        :isHeight50="true"
                        @changeValue="
                          value => (this.claimForm = { ...this.claimForm, claimreason: value })
                        "
                      />
                      <b-form-invalid-feedback v-if="objError.claimreason.status" class="d-block">
                        {{ objError.claimreason.error }}
                      </b-form-invalid-feedback>
                    </b-form-group>
                  </b-col>

                  <b-col v-if="objLabel.label3 && claimForm.claimreason == 'null'" class="pr-0 p--md-0 claimCreate_step-7--item" sm="12" md="12" lg="12" xl="6">
                    <b-form-group class="claim-label require">
                    <div class="label__log mb-2">
                      {{ objLabel.label3 + ' (Others)' }}<span class="label__alert__isured">(*)</span>
                      </div>
                      <b-input
                        class="w-100 input-claim-cs input_custom m-0 h--50"
                        :class="{ 'is-invalid': objError.claimreasonother.status }"
                        :placeholder="objLabel.label3 + ' (Others)'"
                        v-model="claimForm.claimreasonother"
                      />
                      <b-form-invalid-feedback
                        v-if="objError.claimreasonother.status"
                        class="d-block"
                      >
                        {{ objError.claimreasonother.error }}
                      </b-form-invalid-feedback>
                    </b-form-group>
                  </b-col>
                </b-row>

                <b-row v-if="objLabel.label6 && objLabel.referalletter == 'true'">
                  <b-col class="d-flex col-custome">
                    <b-form-group class="claim-label require w-100">
                      <div class="label__log mb-2">
                      {{ objLabel.label6 }}<span class="label__alert__isured">(*)</span>
                      </div>
                      <div class="d-flex flex-row align-items-start referral-group">
                        <Autocomplete
                          :key="referralKey"
                          :value="claimForm.referalletter"
                          class="referral-input w-100 mr-2"
                          :placeholder="'Please select'"
                          :displayAttribute="'label'"
                          :valueAttribute="'id'"
                          :optionDropdowns="listReferral"
                          :isHeight50="true"
                          @changeValue="value => (this.claimForm.referalletter = value)"
                        />
                        <button class="referral-btn" v-b-modal.refferal-modal>
                          <b-icon-box-arrow-in-up-right />Add New
                        </button>
                      </div>
                    </b-form-group>
                  </b-col>
                </b-row>

                <b-row v-if="objLabel.label5" class="m-0 p-0 claimCreate_step-7-groupField">
                  <b-col class="p-0 claimCreate_step-7--item">
                    <b-form-group class="claim-label">
                      <div class="label__log mb-2">
                        {{ objLabel.label6 }}
                        </div>
                      <textarea
                        class="w-100 input_remarks input_custom"
                        v-model="claimForm.remarkbyemployee"
                        placeholder="State any other information relating to your claim."
                        rows="3"
                        max-rows="6"
                      ></textarea>
                    </b-form-group>
                  </b-col>
                </b-row>

              </b-col>
              <b-col class="pr-0 claimCreate_step-7--right">
                <div class="wrapper__file__log">
                  <PreviewAttachment
                    :claimId="createClaimStepInfor.parentclaimid"
                    :claimRefNo="createClaimStepInfor.parentreferenceno"
                    :claimGroup="'0'"
                  />
                </div>
              </b-col>
            </b-row>
          </div>
        </div>
      </div>
      <div class="quick-log-btn d-flex justify-content-between pt-4">
        <button type="button" @click="_backStep" class="btn btn__claim btn_back btnnn">Back</button>
        <button type="button" @click="_nextStep" class="btn btn__claim button__log btnnn">
          {{ entitiesClaim.length > 1 ? 'Finish' : 'Submit' }}
        </button>
      </div>

      <RefferalLetterModal
        idModal="refferal-modal"
        :claimantid="createClaimStepInfor.claimantName"
        @createSuccessReferral="_createSuccessReferral"
        :key="referralKey"
      />

      <b-toast id="refferal-toast" variant="primary" solid title="Referral Letter">
        <div v-html="getReferralToast"></div>
      </b-toast>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import { postAxios } from '@/services/callApi';
import RefferalLetterModal from '@/components/claim/create/refferalLetterModal.vue';
import PDFReader from '@/components/WebViewer.vue';
import PreviewAttachment from '@/components/claim/previewAttachment.vue';
export default {
  components: {
    RefferalLetterModal,
    PDFReader,
    PreviewAttachment
  },
  data() {
    return {
      claimForm: {
        claimtype: ''
      },
      objLabel: {},
      activeClaimGroup: {},
      claimGroupList: [],
      label1DataList: [],
      label3DataList: [],
      referralKey: 1, //re-render component when update referralKey
      objError: {
        check: false,
        invoiceno: { error: 'Please enter Invoice No.', status: false },
        claimtype: { error: 'Please select Claim Type.', status: false },
        currency: { error: 'Please select Currency.', status: false },
        incurredamt: { error: 'Please enter Incurred Amount.', status: false },
        combinedserviceproviders: { error: 'Please select Service Provider.', status: false },
        serviceproviderother: { error: 'Please enter Service Provider Others.', status: false },
        claimreason: { error: 'Please select Claim Reason', status: false },
        claimreasonother: { error: 'Please enter Claim Reason Others', status: false },
        isFormError: false
      },
      messageError: null
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
      'entityActiveClaim',
      'createClaimError'
    ]),
    empName: () => localStorage.getItem('empName'),
    empId: () => localStorage.getItem('empid'),
    getReferralToast() {
      return (this.objLabel.referalprompt ?? '').replace(/\\n\\r|\\r\\n|\\n|\\r/g, '<br/>');
    }
  },
  async fetch() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    await this._getBrokerValue();
    await this._getEligibleClaimType();
    await this._getCurrencyListing();
    await this._getReferralListing();
  },
  mounted() {
    this._changeAlertConfig({
      isShow: false,
      typeAlert: 'success',
      textAlert: ''
    });
    const el = document.getElementById('lightgallery');
    window.lightGallery(el);

    if (this.createClaimStepInfor.incurredamt)
      this.claimForm.incurredamt = this.createClaimStepInfor.incurredamt;
    if (this.createClaimStepInfor.combinedserviceproviders) {
      this.claimForm.combinedserviceproviders = 'null';
      this.claimForm.serviceproviderother = this.createClaimStepInfor.combinedserviceproviders;
    }
  },
  watch: {
    'claimForm.claimtype'(newVal, oldVal) {
      if (newVal) {
        let claimList = [];
        this.claimGroupList.forEach(e => {
          claimList = claimList.concat(e.data);
        });
        this.activeClaimGroup = claimList.find(e => e.claimtype == newVal);
        this.claimForm = {
          claimtype: newVal,
          invoiceno: this.claimForm.invoiceno,
          currency: this.claimForm.currency
        };
      }
      this._getRelatedListing(newVal);
    },
    entityActiveClaim: {
      handler: function (newVal, oldVal) {
        if (newVal >= 0) {
          this.claimForm = this.entitiesClaim[newVal];

          if (this.createClaimError.length) {
            this._changeAlertConfig({
              isShow: true,
              typeAlert: 'error',
              textAlert: this.createClaimError[this.entityActiveClaim]
            });
          }
        }
      },
      deep: true
    },
    claimForm: {
      handler: function (newVal, oldVal) {
        if (newVal) {
          const entitiesClaimCopy = [...this.entitiesClaim];
          entitiesClaimCopy[this.entityActiveClaim] = newVal;
          this.setEntitiesClaim(JSON.parse(JSON.stringify(entitiesClaimCopy)));
          this.validateForm();
          this._changeAlertConfig({
            isShow: false,
            typeAlert: 'warning',
            textAlert: ''
          });
        }
      },
      deep: true
    },
    entitiesClaim: {
      handler: function (newVal, oldVal) {
        if (newVal.length < oldVal.length) {
          this.claimForm = this.entitiesClaim[0];
        }
      },
      deep: true
    },
    activeClaimGroup(newVal, oldVal) {
      if (newVal) {
        if (newVal.claimtype == this.claimForm.claimtype) return;
        this.changeClaimType(newVal.claimtype);
      } else {
        this.changeClaimType(null);
      }
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
      'setMoreClaimStep',
      '_setStepList',
      'setCreateClaimError'
    ]),
    ...mapActions('alert', ['_changeAlertConfig']),
    walletCurrency() {
      let walletCurrencyName = this.listEligibleClaimType.find(
        e => e.claimtype == this.claimForm.claimtype
      ).currencyName;
      return walletCurrencyName;
    },
    async _getBrokerValue() {
      try {
        const res = await postAxios({
          invoke: 'System.execute',
          argc: '2',
          a0: 'API.Broker.Get'
        });
        const valueBroker = JSON.parse(res.data.data[0].value);
        this.messageError = `<p> Your Claim could not be submitted at this time. Please contact <a style="color: #000000" href="tel: ${valueBroker.contactnumber}">${valueBroker.contactnumber}</a> or email us at <a style="color: #000000" href="mailto: ${valueBroker.email}">${valueBroker.email}</a> if you require urgent assistance. </p>`;
      } catch (error) {
        console.log('_getBrokerValue', error);
      }
    },
    async _getRelatedListing(id) {
      try {
        const res = await postAxios({
          invoke: 'System.execute',
          argc: '2',
          a0: 'ClaimType.getRelatedListing',
          a1: { id: id }
        });
        this._handleObjLabel(res);
        this._handleLabel1DataList(res);
        this._handleLabel3DataList(res);
      } catch (error) {
        console.log('_getRelatedListing', error);
      }
    },
    _handleObjLabel(res) {
      const xmlArrRes = res.data.data[0];
      let obj = {};
      if (xmlArrRes.dt != 'exception') {
        const colNames = xmlArrRes.colNames;
        const rows = xmlArrRes.rows[0] ?? [];
        colNames.forEach((ele, index) => {
          obj[ele] = rows[index];
        });
      }
      this.objLabel = obj;
      this.objError = {
        ...this.objError,
        invoiceno: { error: 'Please enter Invoice No.', status: false },
        claimtype: { error: 'Please select Claim Type.', status: false },
        currency: { error: 'Please select Currency.', status: false },
        incurredamt: { error: `Please enter ${obj.label2}`, status: false },
        combinedserviceproviders: { error: `Please select ${obj.label1}`, status: false },
        serviceproviderother: { error: `Please enter ${obj.label1} Others`, status: false },
        claimreason: { error: `Please select ${obj.label3}`, status: false },
        claimreasonother: { error: `Please enter ${obj.label3} Others`, status: false }
      };
      if (
        this.objLabel.disableotherserviceprovider == 'false' &&
        this.createClaimStepInfor.combinedserviceproviders
      ) {
        this.claimForm.combinedserviceproviders = 'null';
        this.claimForm.serviceproviderother = this.createClaimStepInfor.combinedserviceproviders;
      }
    },
    _handleLabel1DataList(res) {
      const xmlArrRes = res.data.data[1];
      this.label1DataList = [];

      if (
        this.objLabel.disableotherserviceprovider == 'false' ||
        this.objLabel.disableotherserviceprovider == null
      ) {
        this.label1DataList = [{ id: 'null', name: 'Others' }];
      } else if (xmlArrRes) {
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

      if (this.label1DataList && this.label1DataList.length == 1 && this.label1DataList[0].id) {
        this.claimForm = { ...this.claimForm, combinedserviceproviders: this.label1DataList[0].id };
      }
    },
    _handleLabel3DataList(res) {
      const xmlArrRes = res.data.data[2];
      this.label3DataList = [];
      if (
        this.objLabel.disableotherclaimreason == 'false' ||
        this.objLabel.disableotherclaimreason == null
      ) {
        this.label3DataList = [{ id: 'null', name: 'Others' }];
      } else if (xmlArrRes) {
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

      if (this.label3DataList && this.label3DataList.length == 1 && this.label3DataList[0].id) {
        this.claimForm = { ...this.claimForm, claimreason: this.label3DataList[0].id };
      }
    },
    async _getEligibleClaimType() {
      try {
        await this.handleListEligibleClaimType({
          invoke: 'System.execute',
          argc: '2',
          a0: 'Claim.Apply.GetEligibleClaimType',
          a1: {
            employee: this.empId,
            employeedpdt:
              this.createClaimStepInfor.claimantName == 'null'
                ? null
                : this.createClaimStepInfor.claimantName,
            incurreddate: this.createClaimStepInfor.incurreddate,
            accessfrom: 'web'
          }
        });
        const group = this.listEligibleClaimType.reduce((acc, item, index) => {
          if (!acc[item.claimlabel]) {
            acc[item.claimlabel] = [];
          }
          acc[item.claimlabel].push(item);
          return acc;
        }, {});

        for (const property in group) {
          const groupName = property;
          this.claimGroupList.push({
            groups: groupName,
            data: group[property]
          });
        }
      } catch (error) {
        console.log('_getEligibleClaimType', error);
      }
    },
    async _getCurrencyListing() {
      try {
        await this.handleListCurrency({
          invoke: 'System.execute',
          argc: '2',
          a0: 'InsuranceClaim.GetCurrencyListing',
          a1: {
            incurreddate: this.createClaimStepInfor.incurreddate
          }
        });
        if (this.listCurrency.length) {
          if (this.listCurrency.length == 1) {
            this.claimForm.currency = this.listCurrency[0].id;
          } else {
            const currency = this.listCurrency.find(e => e.name == 'SGD');
            if (currency) this.claimForm.currency = currency.id;
            else this.claimForm.currency = this.listCurrency.first().id;
          }
        }
      } catch (error) {
        console.log('_getCurrencyListing', error);
      }
    },
    async _getReferralListing() {
      try {
        await this.handleListReferral({
          invoke: 'System.execute',
          argc: '2',
          a0: 'EmployeeReferalLetter.Get',
          a1: {
            employee: this.empId,
            employeedpdt:
              this.createClaimStepInfor.claimantName == 'null'
                ? null
                : this.createClaimStepInfor.claimantName
          }
        });
      } catch (error) {
        console.log('_getReferralListing', error);
      }
    },
    async _createSuccessReferral() {
      this.$bvToast.show('refferal-toast');
      await this._getReferralListing();
      if (this.listReferral.at(-1)) this.claimForm.referalletter = this.listReferral.at(-1).id;
      this.referralKey += 1;
    },
    async _createMoreClaim() {
      this.handleValidateForm();
      if (this.objError.isFormError) {
        window.scrollTo({ top: 0, behavior: 'smooth' });
        this._changeAlertConfig({
          isShow: true,
          typeAlert: 'warning',
          textAlert: 'Please fill in the missing fields'
        });
      } else {
        this.objError.check = false;
        const entitiesClaim = [...this.entitiesClaim];
        const index = entitiesClaim.findIndex(e => !e.claimtype);
        this.activeClaimGroup = null;
        if (index < 0) entitiesClaim.push({});

        this.setEntityActiveClaim(entitiesClaim.length - 1); // set active for last of array claims
        this.setEntitiesClaim(entitiesClaim);

        if (this.listCurrency.length) {
          const currency = this.listCurrency.find(e => e.name == 'SGD');

          if (currency) this.claimForm.currency = currency.id;
          else this.claimForm.currency = this.listCurrency.first().id;
        }
        this.$router.push('/claim/create/more-claim');
      }
    },
    changeClaimType(value) {
      this.claimForm = { ...this.claimForm, claimtype: value };
    },
    _nextStep() {
      this.handleValidateForm();
      window.scrollTo({ top: 0, behavior: 'smooth' });
      this._changeAlertConfig({
        isShow: false,
        typeAlert: 'success',
        textAlert: ''
      });
      if (this.objError.isFormError) {
        this._changeAlertConfig({
          isShow: true,
          typeAlert: 'warning',
          textAlert: 'Please fill in the missing fields'
        });
      } else {
        if (this.entitiesClaim.length < 2) {
          this._handleSubmitSingleClaim();
        } else {
          this._handleSubmitMultiClaim();
        }
      }
    },
    _backStep() {
      const path = this.$router.history.current.path;
      this.setCreateClaimStep(6);
      this._setStepList(2);
      if (path.includes('more-claim')) {
        this.$router.push('/claim/create');
      }
    },
    validateForm() {
      try {
        if (this.objError.check) {
          this.objError.invoiceno.status = !this.claimForm.invoiceno;
          this.objError.claimtype.status = !this.claimForm.claimtype;
          this.objError.currency.status = !this.claimForm.currency;
          this.objError.incurredamt.status = !this.claimForm.incurredamt;
          this.objError.combinedserviceproviders.status = !this.claimForm.combinedserviceproviders;
          this.objError.claimreason.status = !this.claimForm.claimreason;

          if (
            this.objLabel.disableotherserviceprovider == 'false' ||
            this.objLabel.disableotherserviceprovider == null
          ) {
            this.objError.serviceproviderother.status = !this.claimForm.serviceproviderother;
          } else this.objError.serviceproviderother.status = false;

          if (
            this.objLabel.disableotherclaimreason == 'false' ||
            this.objLabel.disableotherclaimreason == null
          ) {
            this.objError.claimreasonother.status = !this.claimForm.claimreasonother;
          } else this.objError.claimreasonother.status = false;

          this.objError.isFormError =
            this.objError.invoiceno.status ||
            this.objError.claimtype.status ||
            this.objError.currency.status ||
            this.objError.incurredamt.status ||
            this.objError.combinedserviceproviders.status ||
            this.objError.claimreason.status ||
            this.objError.serviceproviderother.status ||
            this.objError.claimreasonother.status;
        }
        return;
      } catch (error) {
        console.log('validateForm', error);
      }
    },
    handleValidateForm() {
      this.objError.check = true;
      this.validateForm();
    },
    _formatSubmitPayment(claim) {
      let formatClaim = { ...claim };
      for (const property in formatClaim) {
        if (formatClaim[property] == 'null') formatClaim[property] = null;
      }
      return formatClaim;
    },
    async _handleSubmitSingleClaim() {
      const claim = this._formatSubmitPayment(this.entitiesClaim[0]);
      const _payment = {
        invoke: 'System.execute',
        argc: '2',
        a0: 'API.ClaimApplied.SubmissionByReferenceNo',
        a1: {
          params: {
            invoiceno: claim.invoiceno,
            employee: this.empId,
            employeedpdt:
              this.createClaimStepInfor.claimantName == 'null'
                ? null
                : this.createClaimStepInfor.claimantName,
            currency: claim.currency,
            incurredamt: claim.incurredamt,
            referalletter: claim.referalletter,
            incurreddate: this.createClaimStepInfor.incurreddate,
            serviceproviderother: claim.serviceproviderother,
            combinedserviceproviders: claim.combinedserviceproviders,
            claimreasonother: claim.claimreasonother,
            remarkbyemployee: claim.remarkbyemployee,
            claimtype: claim.claimtype,
            claimreason: claim.claimreason
          },
          referenceno: this.createClaimStepInfor.parentreferenceno,
          claimgroup: this.createClaimStepInfor.claimgroup,
          mode: 0
        }
      };
      this.claimForm = {
        ...this.claimForm,
        referenceno: this.createClaimStepInfor.parentreferenceno
      };
      try {
        window.scrollTo({ top: 0, behavior: 'smooth' });
        const res = await postAxios(_payment);
        const value = res.data.data[0].value;
        const dt = res.data.data[0].dt;
        if (dt == 'exception') {
          this._changeAlertConfig({
            isShow: true,
            typeAlert: 'error',
            textAlert: this.messageError
          });
        } else {
          const parseVal = JSON.parse(value);
          const successClaim = {
            ...this.claimForm,
            id: parseVal.claim_data.id,
            message: parseVal.claim_response.message
          };
          const entitiesClaimCopy = [...this.entitiesClaim];
          entitiesClaimCopy[this.entityActiveClaim] = successClaim;
          this.setEntitiesClaim(JSON.parse(JSON.stringify(entitiesClaimCopy)));
          const path = this.$router.history.current.path;
          this.setCreateClaimStep(9.1);
          if (path.includes('more-claim')) {
            this.$router.push('/claim/create');
          }
          await this._getEligibleClaimType();
        }
      } catch (e) {
        console.log('_handleSubmitSingleClaim', e);
      }
    },
    async _handleSubmitMultiClaim() {
      try {
        const listCreateClaim = [];
        this.setCreateClaimError([]);
        for (const claim of this.entitiesClaim) {
          const index = this.entitiesClaim.indexOf(claim);
          if (index == 0) {
            const formatClaim = this._formatSubmitPayment(claim);
            const _payment = {
              invoke: 'System.execute',
              argc: '2',
              a0: 'API.ClaimApplied.SubmissionByReferenceNo',
              a1: {
                params: {
                  invoiceno: formatClaim.invoiceno,
                  employee: this.empId,
                  employeedpdt:
                    this.createClaimStepInfor.claimantName == 'null'
                      ? null
                      : this.createClaimStepInfor.claimantName,
                  currency: formatClaim.currency,
                  incurredamt: formatClaim.incurredamt,
                  referalletter: formatClaim.referalletter,
                  incurreddate: this.createClaimStepInfor.incurreddate,
                  combinedserviceproviders: formatClaim.combinedserviceproviders,
                  serviceproviderother: formatClaim.serviceproviderother,
                  claimreasonother: formatClaim.claimreasonother,
                  remarkbyemployee: formatClaim.remarkbyemployee,
                  claimtype: formatClaim.claimtype,
                  claimreason: formatClaim.claimreason
                },
                referenceno: this.createClaimStepInfor.parentreferenceno,
                claimgroup: this.createClaimStepInfor.claimgroup,
                mode: 0
              }
            };
            const res = await postAxios(_payment);
            const value = res.data.data[0].value;
            const dt = res.data.data[0].dt;
            if (dt == 'exception') {
              this.setCreateClaimError([...this.createClaimError, ...[value]]);
              listCreateClaim.push({
                ...claim,
                isError: true,
                messageError: value
              });
            } else {
              const parseVal = JSON.parse(value);
              listCreateClaim.push({
                ...claim,
                referenceno: this.createClaimStepInfor.parentreferenceno,
                id: parseVal.claim_data.id
              });
            }
          } else {
            const preSubmitObj = await this._handlePreSubmission();
            const formatClaim = this._formatSubmitPayment(claim);
            const _payment = {
              invoke: 'System.execute',
              argc: '2',
              a0: 'API.ClaimApplied.SubmissionByReferenceNo',
              a1: {
                params: {
                  invoiceno: formatClaim.invoiceno,
                  employee: this.empId,
                  employeedpdt:
                    this.createClaimStepInfor.claimantName == 'null'
                      ? null
                      : this.createClaimStepInfor.claimantName,
                  currency: formatClaim.currency,
                  incurredamt: formatClaim.incurredamt,
                  referalletter: formatClaim.referalletter,
                  incurreddate: this.createClaimStepInfor.incurreddate,
                  combinedserviceproviders: formatClaim.combinedserviceproviders,
                  serviceproviderother: formatClaim.serviceproviderother,
                  claimreasonother: formatClaim.claimreasonother,
                  remarkbyemployee: formatClaim.remarkbyemployee,
                  claimtype: formatClaim.claimtype,
                  claimreason: formatClaim.claimreason
                },
                parentreferenceno: this.createClaimStepInfor.parentreferenceno,
                referenceno: preSubmitObj.referenceNo,
                claimgroup: this.createClaimStepInfor.claimgroup,
                mode: 0
              }
            };
            const res = await postAxios(_payment);
            const value = res.data.data[0].value;
            const dt = res.data.data[0].dt;
            if (dt == 'exception') {
              this.setCreateClaimError([...this.createClaimError, ...[value]]);
              listCreateClaim.push({
                ...claim,
                isError: true,
                messageError: value
              });
            } else {
              const parseVal = JSON.parse(value);
              listCreateClaim.push({
                ...claim,
                referenceno: preSubmitObj.referenceNo,
                id: parseVal.claim_data.id
              });
            }
          }
        }
        await this._getEligibleClaimType();
        this.setEntitiesClaim(listCreateClaim);
        this.$router.push('/claim/create');
        this.setCreateClaimStep(10);
        this.setCreateClaimError([]);

        // if(listDt.includes('default')){
        //   await this._getEligibleClaimType();
        //   this.setEntitiesClaim(listCreateClaim);
        //   this.$router.push('/claim/create');
        //   this.setCreateClaimStep(10);
        //   this.setCreateClaimError([]);
        // } else {
        //   this._changeAlertConfig({
        //     isShow: true,
        //     typeAlert: 'error',
        //     textAlert: this.createClaimError[this.entityActiveClaim]
        //   });
        // }
      } catch (e) {
        console.log('_handleSubmitSingleClaim', e);
      }
    },
    async _handlePreSubmission() {
      const res = await postAxios({
        invoke: 'System.execute',
        argc: '2',
        a0: 'API.ClaimApplied.PreSubmission',
        a1: {
          employee: this.empId,
          employeedpdt:
            this.createClaimStepInfor.claimantName == 'null'
              ? null
              : this.createClaimStepInfor.claimantName,
          claimgroup: this.createClaimStepInfor.claimgroup,
          incurreddate: this.createClaimStepInfor.incurreddate,
          files: []
        }
      });
      if (res.data.data[0].dt == 'default') {
        const xmlValue = res.data.data[0].value;
        const value = JSON.parse(xmlValue);
        return {
          referenceNo: value.referenceNo
        };
      }
      return {
        referenceNo: ''
      };
    },
    formatMoney(value) {
      if (Number.isInteger(value)) {
        return Number(value)
          .toFixed(0)
          .replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
      }
      return Number(value)
        .toFixed(2)
        .replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
    },
    convertSGD() {
      if (this.claimForm.claimtype && this.claimForm.currency) {
        const baseCurrency = this.listEligibleClaimType.find(
          e => e.claimtype == this.claimForm.claimtype
        ).currency;
        const baseRate = this.listCurrency.find(e => e.id == baseCurrency).rate;
        const currentRate = this.listCurrency.find(e => e.id == this.claimForm.currency).rate;
        const sgdConvert = (this.claimForm.incurredamt * currentRate) / baseRate;
        return this.formatMoney(sgdConvert);
      }
      return this.formatMoney(0);
    },
    handleClaimTypeName() {
      if (this.activeClaimGroup && this.activeClaimGroup.claimtypename) {
        return this.activeClaimGroup.claimtypename;
      }
      return null;
    }
  },
  destroyed() {
    this.claimForm = {
      claimtype: ''
    };
    this.setEntitiesClaim([])
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
.is-invalid {
  border: 1px solid #dc3545;
  border-radius: 5px;
}

.is-invalid :deep(input.default-input) {
  border: none !important;
}

::v-deep .claim-label label {
  font-family: Ubuntu-Regular, Tahoma, sans-serif;
  font-style: normal;
  font-weight: 400;
  font-size: 12px;
  line-height: 120%;
  color: var(--gray-scale-700);
}

::v-deep .claim-label.require label::after {
  font-family: Ubuntu-Regular, Tahoma, sans-serif;
  font-style: normal;
  font-weight: 400;
  content: '(*)';
  margin-left: 10px;
  font-size: 12px;
  color: var(--color-danger);
}

::v-deep .claim-label legend {
  font-family: Ubuntu-Regular, Tahoma, sans-serif;
  font-style: normal;
  font-weight: 400;
  font-size: 12px;
  line-height: 120%;
  color: var(--gray-scale-700);
}

::v-deep .claim-label.require legend::after {
  font-family: Ubuntu-Regular, Tahoma, sans-serif;
  font-style: normal;
  font-weight: 500;
  content: '(*)';
  margin-left: 10px;
  font-size: 12px;
  color: var(--color-danger);
}
::v-deep .multiselect__tags,
::v-deep .multiselect__single,
::v-deep .multiselect__input {
  background: #fafafa !important;
}
@media (max-width: 1440px) {
  ::v-deep .wrapper__content__quick__log {
    padding: 20px;
  }
}

.btn__claim.btn_back {
  background: var(--white) !important;
  border: 1px solid var(--NTUC-3);
  color: var(--NTUC-3);
}

.label__log {
  font-family: Ubuntu-Regular, Tahoma, sans-serif;
  font-style: normal;
  font-weight: 400;
  font-size: 12px;
  line-height: 120%;
  color: var(--gray-scale-700);
}

.label__alert__isured {
  color: #dc3545;
}

@media (max-width: 768px) {
  .btnnn {
    width: 100%;
    margin: auto;
  }
}

</style>
<style>
@import '@/assets/css/inputCustom/inputCustom.css';
</style>
