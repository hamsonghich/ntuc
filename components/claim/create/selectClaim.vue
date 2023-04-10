<template>
  <div class="claimCreate_step-7">
    <div class="wrapper__content__quick__log w-100 detail-claim-containter">
      <div class="wrapper__content">
        <div class="title__claim">Claimant Details</div>
        <div class="wrapper_checkbox_log__supp wrapper_checkbox_quick_log mb-4 mt-4">
          <div class="claimCreate_step-7--main p-0 container_select_claim">
            <b-row class="m-0 p-0 claimCreate_step-7--wap">
              <b-col class="pl-0 claimCreate_step-7--left">
                <b-row class="m-0 p-0 claimCreate_step-7-groupField">
                  <b-col
                    class="pl-0 p--sm-0 claimCreate_step-7--item"
                    sm="12"
                    md="12"
                    lg="6"
                    xl="6"
                  >
                    <b-form-group id="input-group-1" label-for="input-1">
                      <div class="label__log">
                        {{ $t('Employee Name') }} <span class="label__alert__isured">(*)</span>
                      </div>
                      <b-input
                        class="w-100 input-claim-cs input_custom h--50"
                        :placeholder="'Employee Name'"
                        :value="empName"
                        disabled
                      />
                    </b-form-group>
                  </b-col>
                  <b-col
                    class="pr-0 p--sm-0 claimCreate_step-7--item"
                    sm="12"
                    md="12"
                    lg="6"
                    xl="6"
                  >
                    <b-form-group id="input-group-1" label-for="input-1">
                      <div class="label__log mb-2">
                        {{ $t('Claimant Name') }} <span class="label__alert__isured">(*)</span>
                      </div>
                      <Autocomplete
                        :placeholder="'Claimant Name'"
                        :value="employeedpdtValue"
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
                <b-row class="m-0 p-0 claimCreate_step-7-groupField">
                  <b-col
                    class="pl-0 p--sm-0 claimCreate_step-7--item"
                    sm="12"
                    md="12"
                    lg="6"
                    xl="6"
                  >
                    <b-form-group id="input-group-1" label-for="input-1">
                      <div class="label__log mb-2">
                        {{ $t('Incurred Date') }} <span class="label__alert__isured">(*)</span>
                      </div>
                      <DateTimePicker
                        class="w-100 h-date-50px"
                        :value="new Date(createClaimStepInfor.incurreddate)"
                        placeholder="Select Date"
                        name="date"
                        :disabled="true"
                        :options="{ format: 'DD/MM/YYYY' }"
                      >
                      </DateTimePicker>
                    </b-form-group>
                  </b-col>
                  <b-col
                    class="pr-0 p--sm-0 claimCreate_step-7--item§"
                    sm="12"
                    md="12"
                    lg="6"
                    xl="6"
                  >
                  <b-form-group id="input-group-1" label-for="input-1">
                    <div class="label__log mb-2">
                      {{ $t('Claim Type') }} <span class="label__alert__isured">(*)</span>
                    </div>
                    <multiselect
                      v-b-tooltip.hover.html.top="handleClaimTypeName()"
                      v-model="claimType_display"
                      class="input_custom h--50"
                      :options="listPolicyclaimtypeclaimreason"
                      :multiple="false"
                      group-values="data"
                      group-label="groups"
                      :group-select="false"
                      :placeholder="$t('please_select')"
                      track-by="id"
                      label="name"
                      @input="value => (this.claimType = value.id)"
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
                </b-row>
                <div class="title__claim">Claim Details</div>
                <b-row class="m-0 p-0 claimCreate_step-7-groupField">
                  <b-col class="pl-0 p--sm-0 claimCreate_step-7--item"
                    sm="12"
                    md="12"
                    lg="6"
                    xl="6">
                    <b-form-group id="input-group-1" label-for="input-1">
                      <div class="label__log mb-2">
                        {{ $t('Invoice no.') }} <span class="label__alert__isured">(*)</span>
                      </div>
                      <b-input
                        class="w-100 input-claim-cs input_custom h--50"
                        :class="{ border_item: objError.invoiceno.status }"
                        :placeholder="'Invoice No'"
                        v-model="logTem.invoiceno"
                      />
                      <b-form-invalid-feedback v-if="objError.invoiceno.status" class="d-block">
                        {{ objError.invoiceno.error }}
                      </b-form-invalid-feedback>
                    </b-form-group>
                  </b-col>
                </b-row>

                <div v-if="claimType">
                  <b-row class="m-0 p-0 claimCreate_step-7-groupField" v-if="objectLabel.label3">
                    <b-col
                      class="pl-0 p--sm-0 claimCreate_step-7--item"
                      sm="12"
                      md="12"
                      lg="6"
                      xl="6"
                    >
                      <b-form-group id="input-group-1" label-for="input-1" class="w-100">
                        <div class="label__log mb-2">
                          {{ $t('Currency') }} <span class="label__alert__isured">(*)</span>
                        </div>
                        <Autocomplete
                          :placeholder="''"
                          :value="logTem.currencysurgery"
                          :displayAttribute="'name'"
                          :valueAttribute="'id'"
                          :optionDropdowns="listCurrency"
                          :filter="true"
                          :isCurrency="true"
                          :isHeight50="true"
                          :isError="objError.currency.status"
                          @changeValue="value => (this.logTem.currencysurgery = value)"
                        />
                        <b-form-invalid-feedback v-if="objError.currency.status" class="d-block">
                          {{ objError.currency.error }}
                        </b-form-invalid-feedback>
                      </b-form-group>
                    </b-col>
                    <b-col
                      class="pr-0 p--sm-0 claimCreate_step-7--item"
                      sm="12"
                      md="12"
                      lg="6"
                      xl="6"
                    >
                      <b-form-group id="input-group-1" label-for="input-1" class="w-100">
                        <div class="label__log mb-2">
                          {{ objectLabel.label3 }} <span class="label__alert__isured">(*)</span>
                        </div>
                        <currency-input
                          class="w-100 m-0 input_custom currency"
                          v-model="logTem.estimatedcostofsurgery"
                          :class="{
                            border_item: objError.incurredamt.status
                          }"
                          placeholder="Please select"
                          :distraction-free="false"
                          :currency="null"
                          :min="0"
                          :precision="{ min: 0, max: 2 }"
                          locale="en-US"
                        />
                        <b-form-invalid-feedback v-if="objError.incurredamt.status" class="d-block">
                          {{ objError.incurredamt.error }}
                        </b-form-invalid-feedback>
                      </b-form-group>
                    </b-col>
                  </b-row>
                  <div class="d-flex flex-row"
                    v-if="objectLabel.cpfpayable == '1' || objectLabel.taxable == '1'"
                  >
                    <div class="checkbox-label mb-2">Your claim category is liable for</div>
                    <img v-if="objectLabel.cpfpayable == '1'" height="16" width="16" class="mr-2" src="@/assets/images/cpf.svg"/>
                    <img v-if="objectLabel.taxable == '1'" height="16" width="16" src="@/assets/images/gst.svg"/>
                  </div>
                  <div class="d-flex flex-row mb-2" v-if="logTem.estimatedcostofsurgery != null">
                    <div class="checkbox-label">
                    Converted to wallet currency (SGD):  <span class="text-ntuc-3">{{ convertSGD() }}</span>
                  </div>
                  </div>

                  <b-row
                    class="m-0 p-0 claimCreate_step-7-groupField"
                    v-if="objectLabel.label8 && objectLabel.referralletter == 'true'"
                  >
                    <b-col class="p-0 claimCreate_step-7--item">
                      <b-form-group
                        id="input-group-1"
                        :label="objectLabel.label8"
                        label-for="input-1"
                      >
                        <div class="d-flex align-items-center isAutoComplete refer_reponsive">
                          <Autocomplete
                            :key="referralKey"
                            :placeholder="'Please select'"
                            :value="logTem.referralLetter"
                            :displayAttribute="'label'"
                            :valueAttribute="'id'"
                            :optionDropdowns="listReferral"
                            :filter="true"
                            :isHeight50="true"
                            @changeValue="value => (this.logTem.referralLetter = value)"
                          />
                          <b-button class="d-flex align-items-center" v-b-modal.refferal-modal>
                            <b-icon icon="box-arrow-in-up-right" />
                            <span class="claim_add_new_letter">Add New Referral</span>
                          </b-button>
                        </div>
                        <b-form-invalid-feedback
                          v-if="objError.referalletter.status"
                          class="d-block"
                        >
                          {{ objError.referalletter.error }}
                        </b-form-invalid-feedback>
                      </b-form-group>
                    </b-col>
                  </b-row>

                  <b-row class="m-0 p-0 claimCreate_step-7-groupField" v-if="objectLabel.label6">
                    <b-col class="pl-0 p--sm-0 claimCreate_step-7--item" sm="12" md="12" lg="12" xl="6">
                      <b-form-group id="input-group-1" label-for="input-1">
                        <div class="label__log mb-2">
                          {{ objectLabel.label6 }} <span class="label__alert__isured">(*)</span>
                        </div>
                        <div class="d-flex align-items-center isAutoComplete">
                          <Autocomplete
                            :placeholder="'Please select'"
                            :value="logTem.serviceProvider"
                            :displayAttribute="'name'"
                            :valueAttribute="'id'"
                            :optionDropdowns="listServiceProvider"
                            :filter="true"
                            :isHeight50="true"
                            :isError="objError.combinedserviceproviders.status"
                            @changeValue="value => (this.logTem.serviceProvider = value)"
                          />
                        </div>
                        <b-form-invalid-feedback
                          v-if="objError.combinedserviceproviders.status"
                          class="d-block"
                        >
                          {{ objError.combinedserviceproviders.error }}
                        </b-form-invalid-feedback>
                      </b-form-group>
                    </b-col>
                    <b-col v-if="objectLabel.disableotherserviceprovider == '0' && logTem.serviceProvider === 'null'" class="pr-0 p--sm-0 claimCreate_step-7--item" sm="12" md="12" lg="12" xl="6">
                      <b-form-group id="input-group-1" label-for="input-1">
                        <div class="label__log mb-2">
                          {{ `${objectLabel.label6} Others` }}
                          <span class="label__alert__isured">(*)</span>
                        </div>
                        <b-input
                          class="w-100 input-claim-cs input_custom h--50"
                          :placeholder="objectLabel.label6 + ' Others'"
                          v-model="logTem.serviceproviderother"
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

                  <b-row class="m-0 p-0 claimCreate_step-7-groupField" v-if="objectLabel.label9">
                    <b-col class="pl-0 p--sm-0 claimCreate_step-7--item" sm="12" md="12" lg="12" xl="6">
                      <b-form-group id="input-group-1" label-for="input-1">
                        <div class="label__log mb-2">
                          {{ objectLabel.label9 }} <span class="label__alert__isured">(*)</span>
                        </div>
                        <div class="d-flex align-items-center isAutoComplete">
                          <Autocomplete
                            :placeholder="'Please select'"
                            :value="claimreason"
                            :displayAttribute="'name'"
                            :valueAttribute="'id'"
                            :optionDropdowns="listClaimReason"
                            :filter="true"
                            :isHeight50="true"
                            :isError="objError.claimreason.status"
                            @changeValue="value => (this.claimreason = value)"
                          />
                        </div>
                        <b-form-invalid-feedback v-if="objError.claimreason.status" class="d-block">
                          {{ objError.claimreason.error }}
                        </b-form-invalid-feedback>
                      </b-form-group>
                    </b-col>

                    <b-col class="pr-0 p--sm-0 claimCreate_step-7--item" v-if="objectLabel.disableotherclaimreason == '0' && this.claimreason === 'null'" sm="12" md="12" lg="12" xl="6">
                      <b-form-group id="input-group-1" label-for="input-1">
                        <div class="label__log mb-2">
                          {{ `${objectLabel.label9} Others` }}
                          <span class="label__alert__isured">(*)</span>
                        </div>
                        <b-input
                          class="w-100 input-claim-cs input_custom h--50"
                          :placeholder="objectLabel.label9 + ' Others'"
                          v-model="logTem.claimreasonother"
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

                  <b-row class="m-0 p-0 claimCreate_step-7-groupField" v-if="objectLabel.label7">
                    <b-col class="p-0 claimCreate_step-7--item">
                      <b-form-group
                        id="input-group-1"
                        :label="objectLabel.label7"
                        label-for="input-1"
                      >
                        <textarea
                          class="w-100 input_remarks input_custom"
                          id="textarea"
                          placeholder="State any other information relating to your claim."
                          rows="3"
                          v-model="logTem.remake"
                          max-rows="6"
                        ></textarea>
                      </b-form-group>
                    </b-col>
                  </b-row>
                </div>
              </b-col>
              <b-col class="pr-0 claimCreate_step-7--right">
                <div class="wrapper__file__log">
                  <PreviewAttachment
                    :claimId="createClaimStepInfor.parentclaimid"
                    :claimRefNo="createClaimStepInfor.parentreferenceno"
                    :claimGroup="'1'"
                  />
                </div>
              </b-col>
            </b-row>
          </div>
        </div>
      </div>
      <div class="quick-log-btn d-flex justify-content-between pt-4 _claim_mobile_btn">
        <button
          type="button"
          @click="_backStep"
          class="btn btn__claim btn_back btnnn"
        >
          Back
        </button>
        <button type="button" @click="_nextStep" class="btn btn__claim button__log _btn_next_claim btnnn">
          Submit
        </button>
      </div>
    </div>
    <RefferalLetterModal
      idModal="refferal-modal"
      @createSuccessReferral="_createSuccessReferral"
      :key="referralKey"
    />
  </div>
</template>

<script>
import { mapGetters, mapActions, mapMutations } from 'vuex';
import { postAxios } from '../../../services/callApi';
import RefferalLetterModal from '@/components/claim/create/refferalLetterModal.vue';
import { handleListCallApi } from '../../../utils/functions/handleListCallApi';
import PreviewAttachment from '@/components/claim/previewAttachment.vue';

export default {
  components: {
    RefferalLetterModal,
    PreviewAttachment
  },
  data: () => ({
    claimType: '',
    claimInforSubmit: {
      referenceNo: '',
      invoiceno: ''
    },
    listPolicyclaimtypeclaimreason: [],
    selected: 1,
    label1DataList: [],
    _handleObjLabel: {},
    refferalKey: 0,
    muitiData: [],
    objectLabel: {},
    title1: 'Medical Certificate',
    title2: 'Invoice',
    empName: localStorage.getItem('empName'),
    empId: localStorage.getItem('empid'),
    isShow: false,
    resetModal: true,
    claimreason: null,
    logTem: {
      currencysurgery: '3',
      hospital: '',
      hospitalType: '',
      referralLetter: null,
      serviceProvider: '',
      diagnosis: '',
      remake: '',
      state: '',
      serviceproviderother: '',
      claimreasonother: '',
      invoiceno: ''
    },
    claimType_display: null,
    objError: {
      check: false,
      invoiceno: { error: 'Please enter Invoice No.', status: false },
      claimtype: { error: 'Please select Claim Type.', status: false },
      currency: { error: 'Please select Currency.', status: false },
      incurredamt: { error: 'Please enter Incurred Amount.', status: false },
      referalletter: { error: 'Please select or add Referral Letter.', status: false },
      combinedserviceproviders: { error: 'Please select Service Provider.', status: false },
      serviceproviderother: { error: 'Please enter Service Provider Other.', status: false },
      claimreason: { error: 'Please select Claim Reason', status: false },
      claimreasonother: { error: 'Please enter Claim Reason Other', status: false },
      isFormError: false
    },
    referralKey: 1 //re-render component when update referralKey
  }),
  watch: {
    listClaimType: function (newValue) {
      let listPolicyclaimtypeclaimreasonTem = [];

      newValue.map(item => {
        const policyclaimtypeclaimreason = listPolicyclaimtypeclaimreasonTem.find(
          value => value.groups == item.label && item.name != 'Others'
        );
        if (policyclaimtypeclaimreason) {
          policyclaimtypeclaimreason.data.push(item);
        } else {
          if (item.label == localStorage.getItem('empName')) {
            listPolicyclaimtypeclaimreasonTem.unshift({
              groups: item.label,
              data: [item]
            });
          } else {
            listPolicyclaimtypeclaimreasonTem.push({
              groups: item.label ? item.label : 'Others',
              data: [item]
            });
          }
        }
      });

      this.listPolicyclaimtypeclaimreason = listPolicyclaimtypeclaimreasonTem;
    },
    slectedOutpaitent(val, oldVal) {
      if (oldVal == this.listClaimCreated.length) {
        this.setValueActiveCLaimOutpaitent({
          employee: this.empId,
          employeedpdt: this.getValue(this.createClaimStepInfor.claimantName),
          combinedserviceproviders: this.getValue(this.logTem.serviceProvider),
          currency: this.logTem.currencysurgery,
          incurredamt: `${this.logTem.estimatedcostofsurgery}`,
          referalletter: this.logTem.referralLetter,
          invoiceno: this.logTem.invoiceno,
          incurreddate: this.createClaimStepInfor.incurreddate,
          hasreceipt: null,
          serviceproviderother:
            this.logTem.serviceProvider === 'null' ? this.logTem.serviceproviderother : '',
          claimreasonother: this.claimreason === 'null' ? this.logTem.claimreasonother : '',
          remarkbyemployee: this.logTem.remake,
          policyclaimtype: this.claimType,
          policyclaimtypeclaimreason: this.getValue(this.claimreason)
        });
      }
      if (val == this.listClaimCreated.length) {
        this.claimType = this.valueActiveClaimOutpaitent.policyclaimtype;
        this.logTem.serviceProvider =
          this.valueActiveClaimOutpaitent.combinedserviceproviders == null
            ? 'null'
            : this.valueActiveClaimOutpaitent.combinedserviceproviders;
        this.logTem.estimatedcostofsurgery = this.valueActiveClaimOutpaitent.incurredamt;
        this.logTem.serviceproviderother = this.valueActiveClaimOutpaitent.serviceproviderother;
        this.claimreason = this.valueActiveClaimOutpaitent.policyclaimtypeclaimreason;
        this.logTem.claimreasonother = this.valueActiveClaimOutpaitent.claimreasonother;
        this.logTem.remake = this.valueActiveClaimOutpaitent.remarkbyemployee;
        this.logTem.referralLetter = this.valueActiveClaimOutpaitent.referalletter;
        return;
      }
      this.claimType = this.listClaimCreated[val].policyclaimtype;
      this.logTem.serviceProvider =
        this.listClaimCreated[val].combinedserviceproviders === null
          ? 'null'
          : this.listClaimCreated[val].combinedserviceproviders;
      this.logTem.estimatedcostofsurgery = this.listClaimCreated[val].incurredamt;
      this.logTem.serviceproviderother = this.listClaimCreated[val].serviceproviderother;
      this.claimreason =
        this.listClaimCreated[val].policyclaimtypeclaimreason == null
          ? 'null'
          : this.listClaimCreated[val].policyclaimtypeclaimreason;
      this.logTem.referralLetter = this.listClaimCreated[val].referalletter;
      this.logTem.claimreasonother = this.listClaimCreated[val].claimreasonother;
      this.logTem.remake = this.listClaimCreated[val].remarkbyemployee;
    },
    'logTem.estimatedcostofsurgery'(val) {
      if (this.listClaimCreated.length === this.slectedOutpaitent) {
        this.setActiveOutpaitent({
          ...this.activeOutpaitent,
          currencysurgery: val
        });
      }
    },
    async claimType(val) {
      this.validateForm();
      this._changeAlertConfig({
        isShow: false,
        typeAlert: 'warning',
        textAlert: ''
      });
      await this._setActiveOutpaitent();
      this.getData(val);
      this.getBalance(val);
      const data = await postAxios({
        invoke: 'System.execute',
        argc: '2',
        a0: 'API.ClaimApplied.GetInpatientClaims',
        a1: {
          claim_group_id: '2',
          employee_id: this.empId,
          claimant_id:
            this.createClaimStepInfor.claimantName == 'null'
              ? null
              : this.createClaimStepInfor.claimantName,
          incurred_date: this.createClaimStepInfor.incurreddate,
          claim_type_id: val
        }
      });
      if (data.data.data[0].dt === 'default') {
        const res = JSON.parse(data.data.data[0].value);
        if (res.data.length !== 0) {
          let allInpatientClaims = [...res.data.post, ...res.data.pre];
          if (allInpatientClaims.length === 0) return;
          this.setListOutPatientClaim(allInpatientClaims);
          const invalidCurrentClaimType = this.listClaimCreated.find(
            item => item.policyclaimtype == val
          );
          if (
            (Object.keys(this.outpaitent_claim_object).length !== 0 &&
              this.outpaitent_claim_object.claimType == val) ||
            invalidCurrentClaimType
          )
            return;
          this.setOutpaitentClaimObject({
            claimType: val,
            text: this.claimType_display
          });
          this.setCreateClaimStep('7.1.4');
        }
      }
    },
    claimreason(val) {
      this.validateForm();
      this._changeAlertConfig({
        isShow: false,
        typeAlert: 'warning',
        textAlert: ''
      });
    },
    logTem: {
      handler: function (newVal, oldVal) {
        if (newVal) {
          this.validateForm();
          this._changeAlertConfig({
            isShow: false,
            typeAlert: 'warning',
            textAlert: ''
          });
          const listClaimCreated = [...this.listClaimCreated];
          console.log('slectedOutpaitent', this.slectedOutpaitent);
          console.log('listClaimCreated', listClaimCreated);
        }
      },
      deep: true
    },
    listServiceProvider(value) {
      if (value && value.length == 1) {
        this.logTem.serviceProvider = value[0].id;
      }
    },
    listClaimReason(value) {
      if (value && value.length == 1) {
        this.claimreason = value[0].id;
      }
    },
    listCurrency: function () {
      if (this.listCurrency && this.listCurrency.length == 1) {
        this.logTem.currencysurgery = this.listCurrency[0].id;
      }
    }
  },
  async created() {
    this.employeedpdtValue =
      this.createClaimStepInfor.claimantName === 'null'
        ? this.listClaimMate[0].id
        : this.createClaimStepInfor.claimantName;
    this.saveRefNo();
    this.claimType = '';
    await this.handleListCurrency({
      invoke: 'System.execute',
      argc: '2',
      a0: 'InsuranceClaim.GetCurrencyListing',
      a1: {
        incurreddate: this.createClaimStepInfor.incurreddate
      }
    });
    if (Object.keys(this.outpaitent_claim_object).length !== 0) {
      this.claimType = this.outpaitent_claim_object.claimType;
      this.claimType_display = this.outpaitent_claim_object.text;
    }
  },
  methods: {
    ...mapActions('claim', [
      'setCreateClaimStep',
      '_setStepList',
      'setIsBlance',
      'setListClaimType',
      'setListClaimReason',
      'setInfoClaimCreated',
      'setInsuranceOutpatient',
      'loadInitialData',
      'handleListReferral',
      'handleListCurrency',
      'setCreateStepClaimInfor',
      'setListOutPatientClaim',
      'setListClaimCreated',
      'setIsMulteOutpaitent',
      'setActiveOutpaitent',
      'setResOutMulClaim',
      'setOutClaimSelected',
      'setEntitiesClaim',
      'setOutpaitentClaimObject',
      'setListProvider',
      'setSelectedOutpaitent',
      'handleSetListOutPaitentClaim',
      'setValueActiveCLaimOutpaitent',
      'setCreatedOneClaim',
      'setValueRefNoOutpaitent'
    ]),
    ...mapActions('log', ['getListCurrency', 'getListHospital']),
    ...mapActions('alert', ['_changeAlertConfig']),
    ...mapMutations('claim', ['SET_LIST_CLAIM_REASON']),
    async saveRefNo() {
      this.setValueRefNoOutpaitent({ referenceNo: this.createClaimStepInfor.parentreferenceno });
    },
    getValue(value) {
      return value === 'null' ? null : value;
    },
    _setActiveOutpaitent() {
      if (this.listClaimCreated.length === this.slectedOutpaitent) {
        const claimName = this.listClaimType.filter(item => item.id == this.claimType);
        if (claimName.length !== 0) {
          this.setActiveOutpaitent({
            ...this.activeOutpaitent,
            claimName: claimName[0].name
          });
        }
      }
      if (this.createClaimStepInfor.incurredamt) {
        this.logTem.estimatedcostofsurgery = this.createClaimStepInfor.incurredamt;
      }
      if (this.createClaimStepInfor.combinedserviceproviders) {
        const isData = this.listServiceProvider.find(
          item => item.name == this.createClaimStepInfor.combinedserviceproviders
        );
        if (isData) {
          this.logTem.serviceProvider = isData.id;
        } else {
          if (this.objectLabel.disableotherserviceprovider == '1') {
            return this._changeAlertConfig({
              isShow: true,
              typeAlert: 'error',
              textAlert:
                'Please select “Others” as a claim type if you are unable to find the service provider name in the list'
            });
          }
          this.logTem.serviceProvider = 'null';
          this.logTem.serviceproviderother = this.createClaimStepInfor.combinedserviceproviders;
        }
      }
    },
    async getBalance(value) {
      const responseBalance = await postAxios({
        invoke: 'System.execute',
        argc: '2',
        a0: 'InsuranceClaim.Apply.getEligibleClaimant',
        a1: {
          employee: localStorage.getItem('empid'),
          claimtype: value,
          claimgroup: '2',
          incurreddate: this.createClaimStepInfor.incurreddate
        }
      });

      if (responseBalance.data.data[0].dt == 'default') {
        const balance = JSON.parse(responseBalance.data.data[0].value);
        const claimTypeName = this.listClaimType.find(item => item.id == this.claimType);
        if (claimTypeName) {
          this.setCreateStepClaimInfor({
            ...this.createClaimStepInfor,
            claimTypeNameBalance: claimTypeName.name,
            balance: balance.claimants[0].balance || 0
          });
        }
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

      if (res.status >= 400) return;

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
    addNewClaim() {
      this.handleValidateForm();
      window.scrollTo({ top: 0, behavior: 'smooth' });
      if (this.objError.isFormError) {
        this._changeAlertConfig({
          isShow: true,
          typeAlert: 'warning',
          textAlert: 'Please fill in the missing fields'
        });
        return;
      }
      this.objError.check = false;
      this.muitiData = [
        ...this.listClaimCreated,
        {
          employee: this.empId,
          employeedpdt:
            this.createClaimStepInfor.claimantName === 'null'
              ? null
              : this.createClaimStepInfor.claimantName,
          combinedserviceproviders:
            this.logTem.serviceProvider === 'null' ? null : this.logTem.serviceProvider,
          currency: this.logTem.currencysurgery,
          incurredamt: `${this.logTem.estimatedcostofsurgery}`,
          referalletter: this.logTem.referralLetter,
          invoiceno: this.logTem.invoiceno,
          incurreddate: this.createClaimStepInfor.incurreddate,
          hasreceipt: null,
          serviceproviderother:
            this.logTem.serviceProvider === 'null' ? this.logTem.serviceproviderother : '',
          claimreasonother: this.claimreason === 'null' ? this.logTem.claimreasonother : '',
          remarkbyemployee: this.logTem.remake,
          policyclaimtype: this.claimType,
          policyclaimtypeclaimreason: this.claimreason === 'null' ? null : this.claimreason
        }
      ];
      this.claimType_display = null;
      this.setSelectedOutpaitent(this.listClaimCreated.length + 1);
      this.setActiveOutpaitent({});
      this.setListClaimCreated([
        ...this.listClaimCreated,
        {
          employee: this.empId,
          employeedpdt:
            this.createClaimStepInfor.claimantName == 'null'
              ? null
              : this.createClaimStepInfor.claimantName,
          combinedserviceproviders:
            this.logTem.serviceProvider === 'null' ? null : this.logTem.serviceProvider,
          currency: this.logTem.currencysurgery,
          incurredamt: `${this.logTem.estimatedcostofsurgery}`,
          referalletter: this.logTem.referralLetter,
          invoiceno: this.logTem.invoiceno,
          incurreddate: this.createClaimStepInfor.incurreddate,
          hasreceipt: null,
          serviceproviderother:
            this.logTem.serviceProvider === 'null' ? this.logTem.serviceproviderother : '',
          claimreasonother: this.claimreason === 'null' ? this.logTem.claimreasonother : '',
          remarkbyemployee: this.logTem.remake,
          policyclaimtype: this.claimType,
          policyclaimtypeclaimreason: this.claimreason === 'null' ? null : this.claimreason
        }
      ]);
      this.logTem = {
        currencysurgery: '3',
        hospital: '',
        hospitalType: '',
        referralLetter: null,
        serviceProvider: '',
        diagnosis: '',
        estimatedcostofsurgery: '',
        remake: '',
        state: ''
      };
      this.claimType = '';
      this.claimreason = '';
    },
    async getData(val) {
      const data = await postAxios({
        invoke: 'System.execute',
        argc: '2',
        a0: 'InsuranceClaimType.getRelatedListing',
        a1: {
          id: val,
          employee: this.empId
        }
      });
      this._handleObjLabel(data);
      const providerList = handleListCallApi(
        [...data.data.data[1].colNames],
        [...data.data.data[1].rows]
      );
      const claimreasonList = handleListCallApi(
        [...data.data.data[2].colNames],
        [...data.data.data[2].rows]
      );

      if (data.data.data[0].rows[0][12] == '0') {
        this.setListProvider([...providerList, { id: 'null', name: 'Others' }]);
      } else {
        this.setListProvider(providerList);
      }
      if (data.data.data[0].rows[0][11] == '0') {
        this.handleSetListOutPaitentClaim([...claimreasonList, { id: 'null', name: 'Others' }]);
      } else {
        this.handleSetListOutPaitentClaim(claimreasonList);
      }
    },
    checkValue(value) {
      return value == 'null' ? null : value;
    },
    handleClaimTypeName() {
      if (this.listClaimType && this.listClaimType.length) {
        const activeClaim = this.listClaimType.find(e => e.id == this.claimType);
        if(activeClaim) return activeClaim.name;
      }
      return null;
    },
    async _nextStep() {
      try {
        this.handleValidateForm();
        window.scrollTo({ top: 0, behavior: 'smooth' });
        if (this.objError.isFormError) {
          this._changeAlertConfig({
            isShow: true,
            typeAlert: 'warning',
            textAlert: 'Please fill in the missing fields'
          });
          return;
        }

        if (this.listClaimCreated.length !== 0) {
          let listDataRes = [];
          const listCreateClaim = [];
          if (this.listClaimCreated.length !== 0) {
            listDataRes = [
              ...this.listClaimCreated,
              {
                employee: this.empId,
                employeedpdt: this.checkValue(this.createClaimStepInfor.claimantName),
                combinedserviceproviders: this.checkValue(this.logTem.serviceProvider),
                currency: this.logTem.currencysurgery,
                incurredamt: `${this.logTem.estimatedcostofsurgery}`,
                referalletter: this.logTem.referralLetter,
                invoiceno: this.logTem.invoiceno,
                incurreddate: this.createClaimStepInfor.incurreddate,
                hasreceipt: null,
                serviceproviderother:
                  this.logTem.serviceProvider === 'null' ? this.logTem.serviceproviderother : '',
                claimreasonother: this.claimreason === 'null' ? this.logTem.claimreasonother : '',
                remarkbyemployee: this.logTem.remake,
                policyclaimtype: this.claimType,
                policyclaimtypeclaimreason: this.checkValue(this.claimreason)
              }
            ];
          }

          for (let index in listDataRes) {
            if (index == 0) {
              const res = await postAxios({
                invoke: 'System.execute',
                argc: '2',
                a0: 'API.ClaimApplied.SubmissionByReferenceNo',
                a1: {
                  mode: '0',
                  params: listDataRes[index],
                  referenceno: this.createClaimStepInfor.parentreferenceno,
                  claimgroup: '2'
                }
              });
              if (res.data.data[0].dt === 'default') {
                listCreateClaim.push({
                  ...listDataRes[index],
                  claimtypename: this.getNameOfClaimType(listDataRes[index].policyclaimtype),
                  referenceno: this.createClaimStepInfor.parentreferenceno,
                  id: JSON.parse(res.data.data[0].value).claim_data.id
                });
              } else {
                listCreateClaim.push({
                  ...listDataRes[index],
                  claimtypename: this.getNameOfClaimType(listDataRes[index].policyclaimtype),
                  referenceno: this.createClaimStepInfor.parentreferenceno,
                  isError: true,
                  messageError: res.data.data[0].value
                });
              }
            } else {
              const dataPre = await this._handlePreSubmission();
              const res = await postAxios({
                invoke: 'System.execute',
                argc: '2',
                a0: 'API.ClaimApplied.SubmissionByReferenceNo',
                a1: {
                  mode: '0',
                  params: listDataRes[index],
                  parentreferenceno: this.createClaimStepInfor.parentreferenceno,
                  referenceno: dataPre.referenceNo,
                  claimgroup: '2'
                }
              });
              if (res.data.data[0].dt === 'default') {
                listCreateClaim.push({
                  ...listDataRes[index],
                  claimtypename: this.getNameOfClaimType(listDataRes[index].policyclaimtype),
                  referenceno: dataPre.referenceNo,
                  id: JSON.parse(res.data.data[0].value).claim_data.id
                });
              } else {
                listCreateClaim.push({
                  ...listDataRes[index],
                  claimtypename: this.getNameOfClaimType(listDataRes[index].policyclaimtype),
                  referenceno: dataPre.referenceNo,
                  isError: true,
                  messageError: res.data.data[0].value
                });
              }
            }
          }
          this.setEntitiesClaim(listCreateClaim);
          this.setCreateClaimStep(10);
          return;
        }

        const data = await postAxios({
          invoke: 'System.execute',
          argc: '2',
          a0: 'API.ClaimApplied.SubmissionByReferenceNo',
          a1: {
            mode: '0',
            params: {
              employee: this.empId,
              employeedpdt:
                this.createClaimStepInfor.claimantName == 'null'
                  ? null
                  : this.createClaimStepInfor.claimantName,
              combinedserviceproviders:
                this.logTem.serviceProvider === 'null' ? null : this.logTem.serviceProvider,
              currency: this.logTem.currencysurgery,
              incurredamt: `${this.logTem.estimatedcostofsurgery}`,
              referalletter: this.logTem.referralLetter,
              invoiceno: this.logTem.invoiceno,
              incurreddate: this.createClaimStepInfor.incurreddate,
              hasreceipt: null,
              serviceproviderother:
                this.logTem.serviceProvider === 'null' ? this.logTem.serviceproviderother : '',
              claimreasonother: this.claimreason === 'null' ? this.logTem.claimreasonother : '',
              remarkbyemployee: this.logTem.remake,
              policyclaimtype: this.claimType,
              policyclaimtypeclaimreason: this.claimreason === 'null' ? null : this.claimreason
            },
            referenceno: this.createClaimStepInfor.parentreferenceno,
            claimgroup: '2'
          }
        });
        if (data.data.data[0].dt === 'default') {
          this._changeAlertConfig({
            isShow: true,
            typeAlert: 'success',
            textAlert: 'Your claim submission is successful'
          });
          this.setCreatedOneClaim(JSON.parse(data.data.data[0].value));
          return this.setCreateClaimStep(7.3);
        }
        const responseError = await postAxios({
          invoke: 'System.execute',
          argc: '2',
          a0: 'API.Broker.Get'
        });
        const messageErrorValue = JSON.parse(responseError.data.data[0].value);
        this._changeAlertConfig({
          isShow: true,
          typeAlert: 'error',
          textAlert: `Your Claim could not be submitted at this time. Please contact <a style="color: #000000" href="tel:${messageErrorValue.contactnumber}">${messageErrorValue.contactnumber}</a>  or email us at <a style="color: #000000" href="mailto: ${messageErrorValue.email}">${messageErrorValue.email}</a> if you require urgent assistance. `
        });
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } catch (error) {
        console.log('_nextStep', error);
      }
    },
    async _getRefferalListing() {
      await this.handleListReferral({
        invoke: 'System.execute',
        argc: '2',
        a0: 'EmployeeReferalLetter.Get',
        a1: {
          employee: this.empId,
          employeedpdt: ''
        }
      });
      this.refferalKey += 1;
      this.logTem.referralLetter = null;
    },
    _handleObjLabel(res) {
      try {
        const xmlArrRes = res.data.data[0];
        const colNames = xmlArrRes.colNames;
        const rows = xmlArrRes.rows[0] ?? [];
        let obj = {};
        colNames.forEach((ele, index) => {
          obj[ele] = rows[index];
        });

        this.objectLabel = obj;

        this.objError = {
          ...this.objError,
          claimtype: { error: 'Please select Claim Type.', status: false },
          currency: { error: 'Please select Currency.', status: false },
          incurredamt: { error: `Please enter ${obj.label3}`, status: false },
          referalletter: { error: `Please select or add ${obj.label8}`, status: false },
          combinedserviceproviders: { error: `Please select ${obj.label6}`, status: false },
          serviceproviderother: { error: `Please enter ${obj.label6} Other`, status: false },
          claimreason: { error: `Please select ${obj.label9}`, status: false },
          claimreasonother: { error: `Please enter ${obj.label9} Other`, status: false }
        };
      } catch (error) {
        console.log('_handleObjLabel', error);
      }
    },
    validateForm() {
      try {
        if (this.objError.check) {
          this.objError.invoiceno.status = !this.logTem.invoiceno;
          this.objError.claimtype.status = !this.claimType;
          this.objError.currency.status = !this.logTem.currencysurgery;
          this.objError.incurredamt.status = !this.logTem.estimatedcostofsurgery;
          this.objError.combinedserviceproviders.status = !this.logTem.serviceProvider;
          this.objError.claimreason.status = !this.claimreason;

          if (
            this.objectLabel.disableotherserviceprovider == 'false' ||
            this.objectLabel.disableotherserviceprovider == 0 ||
            this.objectLabel.disableotherserviceprovider == null
          ) {
            this.objError.serviceproviderother.status = !this.logTem.serviceproviderother;
          } else this.objError.serviceproviderother.status = false;

          if (
            this.objectLabel.disableotherclaimreason == 'false' ||
            this.objectLabel.disableotherclaimreason == 0 ||
            this.objectLabel.disableotherclaimreason == null
          ) {
            this.objError.claimreasonother.status = !this.logTem.claimreasonother;
          } else this.objError.claimreasonother.status = false;

          if (this.objectLabel.referalletter == 'true') {
            this.objError.referalletter.status = !this.logTem.referralLetter;
          } else this.objError.referalletter.status = false;
          this.objError.isFormError =
            this.objError.invoiceno.status ||
            this.objError.claimtype.status ||
            this.objError.currency.status ||
            this.objError.incurredamt.status ||
            this.objError.referalletter.status ||
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
    _backStep() {
      this.setCreateClaimStep(6);
    },
    async _createSuccessReferral() {
      await this._getRefferalListing();
      if (this.listReferral.at(-1)) this.logTem.referralLetter = this.listReferral.at(-1).id;
      this.referralKey += 1;
    },
    formatMoney(value) {
      if (!value) return 0;
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
      try {
        if (this.claimType && this.logTem.currencysurgery && this.claimType_display) {
          const baseCurrency = this.claimType_display.currencyid;
          const baseRate = this.listCurrency.find(e => e.id == baseCurrency).rate;
          const currentRate = this.listCurrency.find(e => e.id == this.logTem.currencysurgery).rate;
          const sgdConvert = (this.logTem.estimatedcostofsurgery * currentRate) / baseRate;
          return this.formatMoney(sgdConvert);
        }
        return this.formatMoney(0);
      } catch (error) {
        return this.formatMoney(0);
      }
    },
    getNameOfClaimType(claimtype) {
      let claimList = [];
      this.listPolicyclaimtypeclaimreason.forEach(e => {
        claimList = claimList.concat(e.data);
      });
      const claim = claimList.find(e => e.id == claimtype);
      return claim.name;
    }
  },
  computed: {
    ...mapGetters('claim', [
      'createStep',
      'isBalance',
      'createClaimStepInfor',
      'listClaimType',
      'listClaimReason',
      'listClaimMate',
      'listServiceProvider',
      'listReferral',
      'listCurrency',
      'listClaimCreated',
      'activeOutpaitent',
      'listClaimCreated',
      'outpaitent_claim_object',
      'selectOutpaitent',
      'slectedOutpaitent',
      'valueActiveClaimOutpaitent'
    ]),
    ...mapGetters('log', ['listHospital', ''])
  },
  // destroyed() {
  //   this.setListClaimCreated([]);
  // },
  async fetch() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    await this.setListClaimType({
      invoke: 'System.execute',
      argc: '2',
      a0: 'InsuranceClaimType.getListing',
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
    await this.handleListReferral({
      invoke: 'System.execute',
      argc: '2',
      a0: 'EmployeeReferalLetter.Get',
      a1: {
        employee: this.empId,
        employeedpdt: ''
      }
    });
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

@media (max-width: 991px) {
  .p--sm-0 {
    padding: 0 !important;
  }
}
@media (max-width: 768px) {
  .btnnn {
    width: 100%;
    margin: auto;
  }
}

@media (max-width: 1440px) {
  ::v-deep .wrapper__content__quick__log {
    padding: 20px;
  }
}

.border_item {
  border-color: red;
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
</style>
