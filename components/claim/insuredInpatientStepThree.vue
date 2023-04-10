<template>
  <div class="wrapper__claim__three__one">
    <div class="title__claim">Claimant Details</div>
    <div class="d-flex justify-content-between wrapper__mobile__step">
      <div class="wrapper__form">
        <div :class="{ 'wrapper__content__one--one': true }">
          <div class="session__input">
            <div class="d-flex">
              <div class="margin-right--24 wrapper__input__claim">
                <div class="label__log">{{ $t('log.employee_name') }} <span class="label__alert__isured">(*)</span></div>
                <div
                  :class="{
                    'position-relative': true,
                    wrapper__input__log: true,
                    input__disabled: true
                  }"
                >
                  <div class="position-relative wrapper__input__log w-100 h--50">
                    <Autocomplete
                      class="input_custom"
                      :placeholder="$t('please_select')"
                      :value="claimTem.employee"
                      :displayAttribute="'name'"
                      :valueAttribute="'id'"
                      :optionDropdowns="listEmployee"
                      :filter="true"
                      :isDisabled="true"
                      :isHeight50="true"
                    />
                  </div>
                </div>
              </div>
              <div class="wrapper__input__claim">
                <div class="label__log">{{ $t('log.claimant_name') }} <span class="label__alert__isured">(*)</span></div>
                <div class="position-relative wrapper__input__log w-100 h--50">
                  <Autocomplete
                    class="input_custom"
                    :placeholder="$t('please_select')"
                    :value="claimTem.employeedpdt"
                    :displayAttribute="'name'"
                    :valueAttribute="'id'"
                    :optionDropdowns="listClaimants"
                    :filter="true"
                    :isDisabled="true"
                    :isHeight50="true"
                  />
                </div>
              </div>
            </div>
          </div>
          <div v-if="claimTem.log" class="session__input">
            <div>
              <div class="label__log">{{ $t('claim.letter_of_guarantee') }} <span class="label__alert__isured">(*)</span></div>
              <div
                :class="{
                  'position-relative': true,
                  wrapper__input__log: true,
                  input__disabled: true
                }"
              >
                <div class="position-relative wrapper__input__log w-100 h--50">
                  <Autocomplete
                    class="input_custom"
                    :placeholder="$t('please_select')"
                    :value="claimTem.log"
                    :displayAttribute="'logno'"
                    :valueAttribute="'logid'"
                    :optionDropdowns="dataClaims"
                    :filter="true"
                    :isDisabled="true"
                    :isHeight50="true"
                    @changeValue="value => (this.claimTem.log = value)"
                  />
                </div>
              </div>
            </div>
          </div>
          <div v-if="this.claimDynamicTem" class="session__input">
            <div class="label__log">{{ this.claimDynamicTem && this.claimDynamicTem.fieldslabel && this.claimDynamicTem.fieldslabel.label1 }} <span class="label__alert__isured">(*)</span></div>
            <DatetimePicker
              v-model="claimTem.admissiondate"
              :disabled="isCheckSubmit"
              :wrapperStyle="'margin-bottom: 26px'"
              :options="optionsAdmin"
            />
          </div>

          <div class="title__claim">Claim Details</div>

          <div class="session__input">

            <div class="d-flex">
              <div class="margin-right--24 wrapper__input__claim">
                <div class="label__log">{{ $t('claim.insurance_policy') }} <span class="label__alert__isured">(*)</span></div>
                <div
                  :class="{
                    'position-relative': true,
                    wrapper__input__log: true,
                    input__disabled: isCheckSubmit
                  }"
                >
                  <div class="position-relative wrapper__input__log w-100 h--50">
                    <Autocomplete
                      class="input_custom"
                      :placeholder="$t('please_select')"
                      :value="claimTem.policytype || outClaimSelected.inpatient_claim_product_type_id"
                      :displayAttribute="'name'"
                      :valueAttribute="'id'"
                      :optionDropdowns="listPolicy"
                      :filter="true"
                      :isDisabled="isCheckSubmit"
                      :isHeight50="true"
                      :isRequired="objError.policytype.status"
                      @changeValue="handleSetListPolicy"
                    />
                    <b-form-invalid-feedback v-if="objError.policytype.status" class="d-block">
                      {{ objError.policytype.error }}
                    </b-form-invalid-feedback>
                  </div>
                </div>
              </div>
              <div class="wrapper__input__claim">
                <div class="label__log">{{ $t('claim.invoice_no') }} <span class="label__alert__isured">(*)</span></div>
                <div
                  :class="{
                    'position-relative': true,
                    wrapper__input__log: true,
                    input__disabled: isCheckSubmit,
                    input__error: objError.invoiceno.status
                  }"
                >
                  <div class="position-relative wrapper__input__log w-100 h--50">
                    <b-input
                      class="w-100 input_custom h--50"
                      v-model="claimTem.invoiceno"
                      :placeholder="$t('claim.invoice_no')"
                    />
                    <b-form-invalid-feedback v-if="objError.invoiceno.status" class="d-block">
                      {{ objError.invoiceno.error }}
                    </b-form-invalid-feedback>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="session__input" v-if="listRefClaim.length !== 0">
            <div>
              <div class="label__log">{{ $t('claim.refno_claim') }} <span class="label__alert__isured">(*)</span></div>
              <div
                :class="{
                  'position-relative': true,
                  wrapper__input__log: true,
                  input__disabled: isCheckSubmit
                }"
              >
                <div class="position-relative wrapper__input__log w-100 h--50">
                  <Autocomplete
                    class="input_custom"
                    :placeholder="$t('please_select')"
                    :value="refclaim"
                    :displayAttribute="'referenceno'"
                    :valueAttribute="'id'"
                    :optionDropdowns="listRefClaim"
                    :filter="true"
                    :isDisabled="isCheckSubmit"
                    :isHeight50="true"
                    :isRequired="objError.refclaim.status"
                    @changeValue="value => (this.refclaim = value)"
                  />
                  <b-form-invalid-feedback v-if="objError.refclaim.status" class="d-block">
                    {{ objError.refclaim.error }}
                  </b-form-invalid-feedback>
                </div>
              </div>
            </div>
          </div>
          <div class="session__input">
            <div>
              <div class="label__log">{{ $t('claim.Claim_Type') }} <span class="label__alert__isured">(*)</span></div>
              <div
                :class="{
                  'position-relative': true,
                  wrapper__input__log: true,
                  input__disabled: isCheckSubmit
                }"
              >
                <div class="position-relative wrapper__input__log w-100 h--50">
                  <Autocomplete
                    class="input_custom"
                    :placeholder="$t('please_select')"
                    :value="
                      claimTem.policyclaimtype
                        ? claimTem.policyclaimtype
                        : outClaimSelected.inpatient_claim_type_id
                    "
                    :displayAttribute="'name'"
                    :valueAttribute="'id'"
                    :optionDropdowns="listClaimsType"
                    :filter="true"
                    :isDisabled="isCheckSubmit"
                    :isHeight50="true"
                    :isRequired="objError.policyclaimtype.status"
                    @changeValue="value => (this.claimTem.policyclaimtype = value)"
                  />
                  <b-form-invalid-feedback v-if="objError.policyclaimtype.status" class="d-block">
                    {{ objError.policyclaimtype.error }}
                  </b-form-invalid-feedback>
                </div>
              </div>
            </div>
          </div>
          <div v-if="this.claimDynamicTem" class="session__input">
            <div>
              <div class="label__log">
                {{ this.claimDynamicTem && this.claimDynamicTem.fieldslabel && this.claimDynamicTem.fieldslabel.label9 }} <span class="label__alert__isured">(*)</span>
              </div>
              <div
                :class="{
                  'position-relative': true,
                  wrapper__input__log: true,
                  input__disabled: isCheckSubmit
                }"
              >
                <div class="position-relative wrapper__input__log w-100 h--50">
                  <multiselect
                    class="input_custom h--50"
                    v-model="policyclaimtypeclaimreasonValue"
                    :options="listPolicyclaimtypeclaimreason"
                    :multiple="false"
                    group-values="data"
                    group-label="groups"
                    :group-select="true"
                    :placeholder="$t('please_select')"
                    track-by="id"
                    label="name"
                    :class="{
                      input__error_autocomplete: objError.policyclaimtypeclaimreason.status
                    }"
                    @input="
                      value => (this.claimTem.policyclaimtypeclaimreason = value ? value.id : null)
                    "
                    selectLabel=" "
                    deselectLabel=" "
                    selectedLabel=" "
                  >
                    <span slot="noResult">{{ $t('No_data') }}</span>
                  </multiselect>
                  <b-form-invalid-feedback
                    v-if="objError.policyclaimtypeclaimreason.status"
                    class="d-block"
                  >
                    {{ objError.policyclaimtypeclaimreason.error }}
                  </b-form-invalid-feedback>
                </div>
              </div>
            </div>
          </div>
          <div
            v-if="
              this.claimDynamicTem &&
              this.claimTem.policyclaimtypeclaimreason == 'null' &&
              this.claimDynamicTem.disableotherclaimreason != '1'
            "
            class="session__input"
          >
            <div>
              <div class="label__log">
                {{ this.claimDynamicTem && this.claimDynamicTem.fieldslabel && this.claimDynamicTem.fieldslabel.label9 }} ({{
                  $t('Other')
                }}) <span class="label__alert__isured">(*)</span>
              </div>
              <div
                :class="{
                  'position-relative': true,
                  wrapper__input__log: true,
                  input__disabled: isCheckSubmit,
                  input__error: objError.policyclaimtypeclaimreasonother.status
                }"
              >
                <div class="position-relative wrapper__input__log w-100 h--50">
                  <b-input
                    class="w-100 input_custom h--50"
                    v-model="claimTem.policyclaimtypeclaimreasonother"
                    :placeholder="`${
                      this.claimDynamicTem && this.claimDynamicTem.fieldslabel && this.claimDynamicTem.fieldslabel.label9
                    } (${$t('Other')})`"
                  />
                  <b-form-invalid-feedback
                    v-if="objError.policyclaimtypeclaimreasonother.status"
                    class="d-block"
                  >
                    {{ objError.policyclaimtypeclaimreasonother.error }}
                  </b-form-invalid-feedback>
                </div>
              </div>
            </div>
          </div>
          <div
            v-if="this.claimDynamicTem && claimTem.admissiontype == '513'"
            class="session__input"
          >
            <div class="label__log">{{ this.claimDynamicTem && this.claimDynamicTem.fieldslabel && this.claimDynamicTem.fieldslabel.label2 }} <span class="label__alert__isured">(*)</span></div>
            <DatetimePicker
              v-model="claimTem.dischargedate"
              :disabled="isCheckSubmit"
              :wrapperStyle="!objError.dischargedate.status ? 'margin-bottom: 26px' : ''"
              :options="options"
              :isRequiredDate="objError.dischargedate.status"
            />
            <b-form-invalid-feedback v-if="objError.dischargedate.status" class="d-block">
              {{ objError.dischargedate.error }}
            </b-form-invalid-feedback>
          </div>
          <div class="session__input" v-if="listReferenceClaim && listReferenceClaim[0]">
            <div>
              <div class="label__log">{{ $t('claim.reference_claim') }} <span class="label__alert__isured">(*)</span></div>
              <div
                :class="{
                  'position-relative': true,
                  wrapper__input__log: true,
                  input__disabled: isCheckSubmit
                }"
              >
                <div class="position-relative wrapper__input__log w-100 h--50">
                  <Autocomplete
                    class="input_custom"
                    :placeholder="$t('please_select')"
                    :value="claimTem.parent"
                    :displayAttribute="'referenceno'"
                    :valueAttribute="'id'"
                    :optionDropdowns="listReferenceClaim"
                    :filter="true"
                    :isDisabled="false"
                    :isHeight50="true"
                    :isRequired="objError.referenceClaim.status"
                    @changeValue="value => (this.claimTem.parent = value)"
                  />
                  <b-form-invalid-feedback v-if="objError.referenceClaim.status" class="d-block">
                    {{ objError.referenceClaim.error }}
                  </b-form-invalid-feedback>
                </div>
              </div>
            </div>
          </div>
          <div v-if="this.claimDynamicTem" class="session__input">
            <div>
              <div class="label__log">{{ $t('claim.admission_type') }} <span class="label__alert__isured">(*)</span></div>
              <div
                :class="{
                  'position-relative': true,
                  wrapper__input__log: true,
                  input__disabled: isCheckSubmit
                }"
              >
                <div class="position-relative wrapper__input__log w-100 h--50">
                  <Autocomplete
                    class="input_custom"
                    :placeholder="$t('please_select')"
                    :value="claimTem.admissiontype"
                    :displayAttribute="'name'"
                    :valueAttribute="'id'"
                    :optionDropdowns="listAdmissionType"
                    :filter="true"
                    :isDisabled="true"
                    :isHeight50="true"
                    @changeValue="value => (this.claimTem.admissiontype = value)"
                  />
                </div>
              </div>
            </div>
          </div>
          <div v-if="this.claimDynamicTem" class="session__input">
            <div class="d-flex flex__direction__column">
              <div class="position-relative wrapper__input__log width--100 mr--5">
                <div class="label__log">{{ $t('log.currency') }} <span class="label__alert__isured">(*)</span></div>
                <div class="position-relative width--100 h--50">
                  <Autocomplete
                    class="input_custom"
                    :placeholder="''"
                    :value="claimTem.currency"
                    :displayAttribute="'name'"
                    :valueAttribute="'id'"
                    :optionDropdowns="listCurrency"
                    :filter="true"
                    :isDisabled="isCheckSubmit"
                    :isHeight50="true"
                    :isRequired="objError.currency.status"
                    @changeValue="value => (this.claimTem.currency = value)"
                  />
                  <b-form-invalid-feedback v-if="objError.currency.status" class="d-block">
                    {{ objError.currency.error }}
                  </b-form-invalid-feedback>
                </div>
              </div>
              <div class="position-relative wrapper__input__log w-100">
                <div class="label__log">
                  {{ this.claimDynamicTem && this.claimDynamicTem.fieldslabel && this.claimDynamicTem.fieldslabel.label3 }} <span class="label__alert__isured">(*)</span>
                </div>
                <div
                  :class="{
                    input__disabled: isCheckSubmit,
                    input__error: objError.incurredamt.status
                  }"
                >
                  <currency-input
                    class="w-100 m-0 input_custom currency"
                    v-model="claimTem.incurredamt"
                    :distraction-free="false"
                    :currency="null"
                    :min="0"
                    :max="null"
                    :precision="{ min: 2, max: 2 }"
                    :placeholder="''"
                    locale="en-US"
                  />
                  <b-form-invalid-feedback v-if="objError.incurredamt.status" class="d-block">
                    {{ objError.incurredamt.error }}
                  </b-form-invalid-feedback>
                </div>
              </div>
            </div>
          </div>
          <div v-if="this.claimDynamicTem" class="session__input">
            <div class="d-flex flex__direction__column">
              <div class="position-relative wrapper__input__log w-100 mr--5">
                <div class="label__log">
                  {{ this.claimDynamicTem && this.claimDynamicTem.fieldslabel && this.claimDynamicTem.fieldslabel.label8 }}
                </div>
                <div class="position-relative w-100 h--50">
                  <Autocomplete
                    class="input_custom"
                    :placeholder="$t('please_select')"
                    :value="claimTem.referalletter"
                    :displayAttribute="'label'"
                    :valueAttribute="'id'"
                    :optionDropdowns="listReferral"
                    :filter="true"
                    :isDisabled="isCheckSubmit"
                    :isHeight50="true"
                    @changeValue="value => (this.claimTem.referalletter = value)"
                  />
                </div>
              </div>
              <div class="position-relative wrapper__input__log">
                <div class="label__log hidden-mobile" style="opacity: 0">
                  {{ $t('claim.hidden') }}
                </div>
                <button class="referral-btn" v-b-modal.refferal-modal>
                  <b-icon-box-arrow-in-up-right />{{ $t('claim.Add_New') }}
                </button>
              </div>
            </div>
          </div>
          <div v-if="this.claimDynamicTem" class="session__input">
            <div>
              <div class="label__log">
                {{ this.claimDynamicTem && this.claimDynamicTem.fieldslabel && this.claimDynamicTem.fieldslabel.label4 }} <span class="label__alert__isured">(*)</span>
              </div>
              <div
                :class="{
                  'position-relative': true,
                  wrapper__input__log: true,
                  input__disabled: isCheckSubmit
                }"
              >
                <div class="position-relative wrapper__input__log w-100 h--50">
                  <Autocomplete
                    class="input_custom"
                    :placeholder="$t('please_select')"
                    :value="claimTem.hospital"
                    :displayAttribute="'name'"
                    :valueAttribute="'id'"
                    :optionDropdowns="listHospital"
                    :filter="true"
                    :isDisabled="isCheckSubmit"
                    :isHeight50="true"
                    :isRequired="objError.hospital.status"
                    @changeValue="value => (this.claimTem.hospital = value)"
                  />
                  <b-form-invalid-feedback v-if="objError.hospital.status" class="d-block">
                    {{ objError.hospital.error }}
                  </b-form-invalid-feedback>
                </div>
              </div>
            </div>
          </div>
          <div v-if="this.claimDynamicTem && claimTem.hospital === '21'" class="session__input">
            <div>
              <div class="label__log">
                {{ this.claimDynamicTem && this.claimDynamicTem.fieldslabel && this.claimDynamicTem.fieldslabel.label4 }} ({{
                  $t('Other')
                }}) <span class="label__alert__isured">(*)</span>
              </div>
              <div
                :class="{
                  'position-relative': true,
                  wrapper__input__log: true,
                  input__disabled: isCheckSubmit,
                  input__error: objError.hospitalother.status
                }"
              >
                <div class="position-relative wrapper__input__log w-100 h--50">
                  <b-input
                    class="w-100 input_custom h--50"
                    v-model="claimTem.hospitalother"
                    :placeholder="`${
                      this.claimDynamicTem && this.claimDynamicTem.fieldslabel && this.claimDynamicTem.fieldslabel.label4
                    } (${$t('Other')})`"
                  />
                  <b-form-invalid-feedback v-if="objError.hospitalother.status" class="d-block">
                    {{ objError.hospitalother.error }}
                  </b-form-invalid-feedback>
                </div>
              </div>
            </div>
          </div>
          <div v-if="this.claimDynamicTem" class="session__input">
            <div>
              <div class="label__log">
                {{ this.claimDynamicTem && this.claimDynamicTem.fieldslabel && this.claimDynamicTem.fieldslabel.label5 }} <span class="label__alert__isured">(*)</span>
              </div>
              <div
                :class="{
                  'position-relative': true,
                  wrapper__input__log: true,
                  input__disabled: isCheckSubmit
                }"
              >
                <div class="position-relative wrapper__input__log w-100 h--50">
                  <Autocomplete
                    class="input_custom"
                    :placeholder="$t('please_select')"
                    :value="claimTem.hospitaltype"
                    :displayAttribute="'name'"
                    :valueAttribute="'id'"
                    :optionDropdowns="listHistoryType"
                    :filter="true"
                    :isDisabled="true"
                    :isHeight50="true"
                    @changeValue="value => (this.claimTem.hospitaltype = value)"
                  />
                </div>
              </div>
            </div>
          </div>
          <div v-if="this.claimDynamicTem" class="session__input">
            <div>
              <div class="label__log">
                {{ this.claimDynamicTem && this.claimDynamicTem.fieldslabel && this.claimDynamicTem.fieldslabel.label7 }}
              </div>
              <div
                :class="{
                  'position-relative': true,
                  wrapper__input__log: true,
                  input__disabled: isCheckSubmit
                }"
              >
                <div class="position-relative wrapper__input__log w-100 h--50">
                  <textarea
                    rows="4"
                    cols="50"
                    class="input_remarks w-100 input_custom"
                    v-model="claimTem.employeeremark"
                    :placeholder="$t('claim.placeholder_remark')"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div v-if="createStep == 3.1" class="wrapper__image__pdf__claim d-none d-md-block">
        <PreviewAttachment :claimId="createClaimStepInfor.claimid" :claimRefNo="createClaimStepInfor.referenceno" :claimGroup="'2'"/>
      </div>
    </div>
    <div
      class="wrapper__button__filter__one--one d-flex justify-content-between"
      style="margin-top: 68px"
    >
      <button
        :disabled="isCheckSubmit"
        type="button"
        @click="_back"
        class="btn btn__claim button__log btn_back"
      >
        {{ $t('back') }}
      </button>
      <!-- isCheckHollow -->
      <button
        :disabled="isCheckSubmit"
        type="button"
        @click="_next"
        class="btn btn__claim button__log"
        style="padding: 9px 32px"
      >
        {{ $t('submit') }}
      </button>
    </div>
    <RefferalLetterModal
      idModal="refferal-modal"
      :claimantid="createClaimStepInfor.claimantName"
      @createSuccessReferral="_createSuccessReferral"
      :key="referralKey"
    />
  </div>
</template>

<script>
  import { mapGetters, mapActions, mapMutations } from 'vuex';
  import selectCustom from '~/components/selectCustom/selectCustom.vue';
  import ChooseLog from '~/components/claim/chooseLog.vue';
  import UploadImg from '~/components/UploadImg';
  import { PAGINATE } from '~/utils/constants/paginate.js';
  import Autocomplete from '~/components/autocomplete';
  import RefferalLetterModal from '@/components/claim/create/refferalLetterModal.vue';
  import PreviewAttachment from '@/components/claim/previewAttachment.vue';
  import { postAxios } from '../../services/callApi';

  export default {
    components: {
      selectCustom,
      ChooseLog,
      UploadImg,
      Autocomplete,
      RefferalLetterModal,
      PreviewAttachment
    },
    data: () => ({
      paginateDefault: PAGINATE,
      optionsAdmin: {
        format: 'DD MMM YYYY',
        useCurrent: false,
        maxDate: new Date(),
        icons: {
          date: ''
        }
      },
      alert: {
        isShow: false,
        typeAlert: 'success',
        textAlert: ''
      },
      listRef: [],
      fileFinalSummaryHospitalBill: [],
      fileMedicalShieldSettlementLetter: [],
      fileFinalDetailItemizedHospitalBill: [],
      isCheckSubmit: false,
      listRefClaim: [],
      claimTem: {
        employee: '',
        employeedpdt: '',
        currency: '',
        incurredamt: null,
        referalletter: '',
        invoiceno: '',
        log: '',
        admissiondate: new Date(),
        policyclaimtype: '',
        parent: '',
        admissiontype: '',
        policyserviceproviderother: '',
        policyclaimtypeclaimreason: '',
        policyclaimtypeclaimreasonother: '',
        dischargedate: '',
        hospital: '',
        hospitaltype: '',
        hospitalother: '',
        policytype: '',
        employeeremark: ''
      },
      claimTemDefault: null,
      claimgroup: '4',
      filters: {
        claimant: '',
        diagnosis: '',
        hospital: '',
        status: '',
        referenceNo: '',
        state: '',
        role: '',
        issuedDateFrom: null,
        issuedDateTo: null,
        employee: Number(localStorage.getItem('empid')),
        employeeDpdt: null,
        admissionDateFrom: null,
        admissionDateTo: null
      },
      referenceno: '',
      listReferenceClaim: [],
      claimDynamicTem: null,
      listClaimsType: [],
      referralKey: 1, //re-render component when update referralKey
      isCheckHollow: true,
      listPolicyclaimtypeclaimreason: [],
      policyclaimtypeclaimreasonValue: null,
      refclaim: '',
      objError: {
        check: false,
        policytype: { error: 'Please select Insurance Policy.', status: false },
        refclaim: { error: 'Please enter Reference Claim.', status: false },
        invoiceno: { error: 'Please enter Invoice No.', status: false },
        policyclaimtype: { error: 'Please select Claim Type.', status: false },
        policyclaimtypeclaimreason: { error: 'Please select Claim Reason.', status: false },
        policyclaimtypeclaimreasonother: {
          error: 'Please enter Claim Reason (Other).',
          status: false
        },
        dischargedate: { error: 'Please enter Discharge Date.', status: false },
        currency: { error: 'Please enter Currency.', status: false },
        incurredamt: { error: 'Please enter Incurred Amount.', status: false },
        hospital: { error: 'Please select Hospital.', status: false },
        hospitalother: { error: 'Please enter Hospital (Other).', status: false },
        referenceClaim: { error: 'Please enter Hospital (Other).', status: false },
        isFormError: false
      }
    }),
    watch: {
      'claimTem.policyclaimtypeclaimreason'(val) {
        this._getRefClaim(val);
      },
      listPolicyclaimtypeclaimreason(val) {
        if (Object.keys(this.outClaimSelected).length !== 0) {
          if (val.length !== 0) {
            if(val.length == 1 && val[0].data.length == 1){
              this.claimTem.policyclaimtypeclaimreason = val[0].data[0].id;
              this.policyclaimtypeclaimreasonValue = val[0].data[0];
              return
            }

            let data = [];
            for (let i = 0; i < val.length; i++) {
              for (let j = 0; j < val[i].data.length; j++) {
                data = [...data, val[i].data[j]];
              }
            }
            this.policyclaimtypeclaimreasonValue = data.find(
              item => item.id === this.outClaimSelected.inpatient_claim_claim_reason_id
            );
          }
        }
      },
      'claimTem.hospital': function (newVal) {
        if (newVal) {
          this.claimTem.hospitaltype =
            this.listHospital.find(item => item.id == newVal) &&
            this.listHospital.find(item => item.id == newVal).hosptype;
        } else {
          this.claimTem.hospitaltype = '';
        }
      },
      async 'claimTem.policytype'(oldValue, newValue) {
        if(oldValue && !newValue) this.claimTem.policytype = oldValue;
        if(!newValue) return;
        await this.getPolicyClaimReason({
          invoke: 'System.execute',
          argc: '2',
          a0: 'PolicyClaimReason.getListing',
          a1: {
            employee: localStorage.getItem('empid'),
            employeedpdt:
              this.createClaimStepInfor.claimantName == 'null'
                ? null
                : this.createClaimStepInfor.claimantName,
            policytype: newValue,
            policyclaimtype:
              this.claimTem.policyclaimtype || this.outClaimSelected.inpatient_claim_type_id,
            date: this.createClaimStepInfor.incurreddate,
            disableotherclaimreason: true
          }
        });
      },
      claimDynamic(val) {
        if (this.outClaimSelected.inpatient_claim_type_id && val.length !== 0) {
          this.claimTem.admissiontype = this.outClaimSelected.inpatient_claim_admission_type;
          this.claimTem.policyclaimtype = this.outClaimSelected.inpatient_claim_type_id;
          this.claimDynamicTem = val.find(
            item => item.id == this.outClaimSelected.inpatient_claim_type_id
          );
        }
      },
      'claimTem.policyclaimtype': function (newVal) {
        if (this.outClaimSelected.inpatient_claim_type_id) return;
        this.claimDynamicTem = this.claimDynamic.find(item => item.id == newVal);
        if (this.claimDynamicTem && this.claimDynamicTem.disableotherserviceprovider != '1') {
          this.SET_LIST_SERVICE_PROVIDER([
            { id: 'null', name: 'Others' },
            ...this.listServiceProvider.filter(item => item.policyclaimtype == newVal)
          ]);
        } else {
          this.SET_LIST_SERVICE_PROVIDER([
            ...this.listServiceProvider.filter(item => item.policyclaimtype == newVal)
          ]);
        }

        this.claimTem.policyserviceproviderother =
          this.createClaimStepInfor.service_provider &&
          !this.listServiceProvider.find(
            item => item.name == this.createClaimStepInfor.service_provider
          )
            ? this.createClaimStepInfor.service_provider
            : '';

        if (!newVal && this.claimTemDefault) {
          this.claimTem = {
            ...this.claimTemDefault,
            invoiceno: this.claimTem.invoiceno,
            policytype: this.claimTem.policytype
          };
          this.policyclaimtypeclaimreasonValue = null;
        }
      },
      listCurrency: function () {
        if (this.listCurrency && this.listCurrency.length == 1) {
          this.claimTem.currency = this.listCurrency[0].id
        }
        this.claimTem.currency =
          this.listCurrency.find(item => item.name.toUpperCase() === 'SGD') &&
          this.listCurrency.find(item => item.name === 'SGD').id;
      },
      propertyLogAdmindate: async function (newValue) {
        if (newValue.admissiondate) {
          await this.getListPolicy({
            invoke: 'System.execute',
            argc: '2',
            a0: 'PolicyClaimApplied.GetEligiblePolicyTypeWeb',
            a1: {
              empid: localStorage.getItem('empid'),
              empdpdt:
                this.createClaimStepInfor.claimantName == 'null'
                  ? ''
                  : this.createClaimStepInfor.claimantName,
              admissiondate: this._formatTimeCallApi(newValue.admissiondate),
              log: newValue.log,
              isListPolicyClaim: true
            }
          });
        }
      },
      propertyCheckPrePostSubClaimType: async function (newValue) {
        try {
          if (this.outClaimSelected.inpatient_claim_admission_type) {
            this.claimTem.admissiontype = this.outClaimSelected.inpatient_claim_admission_type;
            return;
          }
          if (
            newValue.policytype &&
            newValue.policyclaimtype &&
            newValue.admissiondate &&
            newValue.policyclaimtypeclaimreason
          ) {
            const resCheckPrePostSubClaimType = await this.checkPrePostSubClaimType({
              invoke: 'System.execute',
              argc: '2',
              a0: 'PolicyClaimApplied.CheckPrePostSubClaimType',
              a1: {
                employee: localStorage.getItem('empid'),
                employeedpdt:
                  this.createClaimStepInfor.claimantName == 'null'
                    ? ''
                    : this.createClaimStepInfor.claimantName,
                policytype: newValue.policytype,
                policyclaimtype: newValue.policyclaimtype,
                policyclaimtypeclaimreason:
                  newValue.policyclaimtypeclaimreason == 'null'
                    ? ''
                    : newValue.policyclaimtypeclaimreason,
                date: this._formatTimeCallApi(newValue.admissiondate)
              }
            });
            let listReferenceClaimTem = [];

            if (resCheckPrePostSubClaimType && resCheckPrePostSubClaimType.preh[0]) {
              listReferenceClaimTem = [...resCheckPrePostSubClaimType.preh];
              this.claimTem.admissiontype = '514';
              this.claimTem.dischargedate = '';
            } else if (resCheckPrePostSubClaimType && resCheckPrePostSubClaimType.posth[0]) {
              listReferenceClaimTem = [...resCheckPrePostSubClaimType.posth];
              this.claimTem.admissiontype = '515';
              this.claimTem.dischargedate = '';
            } else {
              this.claimTem.admissiontype = '513';
            }
            this.claimTem.parent = '';

            this.listReferenceClaim = listReferenceClaimTem;
          }
          if (newValue.policytype && newValue.policyclaimtype && newValue.admissiondate) {
            await this.getPolicyClaimReason({
              invoke: 'System.execute',
              argc: '2',
              a0: 'PolicyClaimReason.getListing',
              a1: {
                employee: localStorage.getItem('empid'),
                employeedpdt:
                  this.createClaimStepInfor.claimantName == 'null'
                    ? ''
                    : this.createClaimStepInfor.claimantName,
                policytype: newValue.policytype,
                policyclaimtype: newValue.policyclaimtype,
                date: this._formatTimeCallApi(newValue.admissiondate),
                disableotherclaimreason: true
              }
            });
          }
        } catch (error) {
          console.log('propertyCheckPrePostSubClaimType ' + error);
        }
      },
      propertyGetEligibleClaimType: async function (newValue) {
        try {
          if (newValue.policytype && newValue.admissiondate) {
            const resEligibleClaimType = await this.getEligibleClaimType({
              invoke: 'System.execute',
              argc: '2',
              a0: 'PolicyClaimApplied.GetEligibleClaimType',
              a1: {
                employee: localStorage.getItem('empid'),
                employeedpdt:
                  this.createClaimStepInfor.claimantName == 'null'
                    ? ''
                    : this.createClaimStepInfor.claimantName,
                policytype: newValue.policytype,
                date: this._formatTimeCallApi(newValue.admissiondate),
                log: newValue.log ? newValue.log : ''
              }
            });

            this.listClaimsType = resEligibleClaimType;

            if (newValue.log) {
              this.claimTem.policyclaimtype = resEligibleClaimType.length
                ? resEligibleClaimType[0].id
                : '';
            }
          }
        } catch (error) {
          console.log('propertyGetEligibleClaimType ' + error);
        }
      },
      propertyHollow: function () {
        this.checkHollow('policytype');
        this.checkHollow('invoiceno');
        this.checkHollow('policyclaimtype');
        this.checkHollow('policyclaimtypeclaimreason');
        this.checkHollow('policyclaimtypeclaimreasonother');
        this.checkHollow('dischargedate');
        this.checkHollow('currency');
        this.checkHollow('incurredamt');
        this.checkHollow('hospital');
        this.checkHollow('hospitalother');
        this.checkHollow('referenceClaim');
      },
      listPolicyClaimReason: function (newValue) {
        let listPolicyclaimtypeclaimreasonTem = [];

        newValue.map(item => {
          const policyclaimtypeclaimreason = listPolicyclaimtypeclaimreasonTem.find(
            policyclaimtypeclaimreasonItem =>
              policyclaimtypeclaimreasonItem.groups == item.label && item.name != 'Others'
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

        const policyclaimtypeclaimreasonValueTem = newValue.find(
          item => this.chooseLog[0] && item.id == this.chooseLog[0].policyclaimtypeclaimreason
        ) || {
          id: 'null',
          name: 'Others'
        };

        if (
          !this.policyclaimtypeclaimreasonValue &&
          this.chooseLog[0] &&
          policyclaimtypeclaimreasonValueTem
        ) {
          this.policyclaimtypeclaimreasonValue = policyclaimtypeclaimreasonValueTem;
        }

        this.listPolicyclaimtypeclaimreason = listPolicyclaimtypeclaimreasonTem;
      },
      claimTem: {
        handler: function (newVal, oldVal) {
          if (newVal) {
            this.validateForm();
            this._changeAlertConfig({
              isShow: false,
              typeAlert: 'warning',
              textAlert: ""
            });
          }
        },
        deep: true
      },
      listPolicy(value){
        if(value && value.length == 1){
          this.handleSetListPolicy(value[0].id);
        }
      },
      listHospital(value) {
        if(value && value.length == 1){
          this.claimTem.hospital = value[0].id;
        }
      },
      listClaimsType(value) {
        if(value && value.length == 1){
          this.claimTem.policyclaimtype = value[0].id;
        }
      },

    },
    updated() {
      if (Object.keys(this.outClaimSelected).length !== 0) {
        this.claimTem.policyclaimtypeclaimreason =
          this.outClaimSelected.inpatient_claim_claim_reason_id;
      }
    },
    computed: {
      ...mapGetters('claim', [
        'createStep',
        'chooseLog',
        'createClaimStepInfor',
        'claimDynamic',
        'listReferral',
        'listHistoryType',
        'listServiceProvider',
        'listPolicyClaimReason',
        'listCurrency',
        'listAdmissionType',
        'isCreateClaim',
        'outClaimSelected',
        'listHospital',
        'listOutPatientClaim'
      ]),
      ...mapGetters('log', [
        'dataClaims',
        'isCancelLog',
        'step',
        'listPolicy',
        'listPolicyClaimType',
        'listClaimants',
        'listSurgery',
        'listEmployee'
      ]),
      ...mapGetters('upload', ['listFileClaims']),
      options() {
        return {
          format: 'DD MMM YYYY',
          useCurrent: false,
          minDate: new Date(
            new Date(`${this._formatTime(this.claimTem.admissiondate || new Date())} 00:00:00`)
          ),
          maxDate: new Date(new Date(`${this._formatTime(new Date())} 23:59:59`)),
          icons: {
            date: ''
          }
        };
      },
      getClaimantName() {
        return this.claimTem.employeedpdt && this.claimTem.employeedpdt != 'null'
          ? this.claimTem.employeedpdt
          : 'Self';
      },
      propertyPolicy() {
        const dataPolicy = {
          policytype: this.claimTem.policytype,
          admissiondate: this.claimTem.admissiondate
        };
        return JSON.stringify(dataPolicy);
      },
      propertyLogAdmindate() {
        const dataLogAdmindate = {
          log: this.claimTem.log,
          policyclaimtype: this.claimTem.policyclaimtype
        };
        return JSON.stringify(dataLogAdmindate);
      },
      propertyCheckPrePostSubClaimType() {
        return {
          policytype: this.claimTem.policytype,
          policyclaimtype: this.claimTem.policyclaimtype,
          policyclaimtypeclaimreason: this.claimTem.policyclaimtypeclaimreason,
          admissiondate: this.claimTem.admissiondate
        };
      },
      propertyGetEligibleClaimType() {
        return {
          policytype: this.claimTem.policytype,
          admissiondate: this.claimTem.admissiondate,
          log: this.claimTem.log
        };
      },
      propertyHollow() {
        return {
          employee: this.claimTem.employee,
          employeedpdt: this.claimTem.employeedpdt,
          currency: this.claimTem.currency,
          incurredamt: this.claimTem.incurredamt,
          referalletter: this.claimTem.referalletter,
          invoiceno: this.claimTem.invoiceno,
          admissiondate: this.claimTem.admissiondate,
          policyclaimtype: this.claimTem.policyclaimtype,
          admissiontype: this.claimTem.admissiontype,
          policyserviceproviderother: this.claimTem.policyserviceproviderother,
          policyclaimtypeclaimreason: this.claimTem.policyclaimtypeclaimreason,
          policyclaimtypeclaimreasonother: this.claimTem.policyclaimtypeclaimreasonother,
          dischargedate: this.claimTem.dischargedate,
          hospital: this.claimTem.hospital,
          hospitaltype: this.claimTem.hospitaltype,
          policytype: this.claimTem.policytype
        };
      }
    },
    methods: {
      ...mapActions('claim', [
        'setCreateClaimStep',
        'handleChooseLog',
        '_setStepList',
        'loadInitialData',
        'handleListReferral',
        'createClaim',
        'getListAdmissionType',
        'checkPrePostSubClaimType',
        'getEligibleClaimType',
        'getPolicyClaimReason',
        'handleListFileInpatient',
        'setOutClaimSelected'
      ]),
      ...mapActions('log', [
        'handleCurrentPage',
        'changeIsCancelLog',
        'getListPolicy',
        'getListPolicyClaimType',
        'getListClaimantLog',
        'getListSurgery',
        'getListEmployee',
        'getListClaim'
      ]),
      ...mapMutations('claim', ['SET_LIST_SERVICE_PROVIDER']),
      ...mapActions('upload', ['getNewUUID', 'uploadFile']),
      ...mapActions('notification', ['getBroker']),
      ...mapActions('alert', ['_changeAlertConfig']),
      async _handlePreSubmission() {
        const res = await postAxios({
          invoke: 'System.execute',
          argc: '2',
          a0: 'API.ClaimApplied.PreSubmission',
          a1: {
            employee: localStorage.getItem('empid'),
            employeedpdt:
              this.createClaimStepInfor.claimantName == 'null'
                ? null
                : this.createClaimStepInfor.claimantName,
            claimgroup: this.createClaimStepInfor.claimgroup,
            incurreddate: this.createClaimStepInfor.incurreddate,
            files: this.createClaimStepInfor.filePreSubmissArr
          }
        });

        if (res.status >= 400) return;

        if (res.data.data[0].dt == 'default') {
          const xmlValue = res.data.data[0].value;
          const value = JSON.parse(xmlValue);
          return {
            referenceNo: value.referenceNo,
            invoiceno: value.id
          };
        }
        return {
          referenceNo: '',
          invoiceno: ''
        };
      },
      handleSetListPolicy(value){
        if(this.listPolicy){
          this.claimTem.policytype = value;
        }
      },
      handleLoaded(instance) {
        console.log('PSPDFKit has loaded: ', instance);
        // Do something.
      },
      async _getRefClaim(val) {
        const data = await postAxios({
          invoke: 'System.execute',
          argc: '2',
          a0: 'PolicyClaimApplied.CheckPrePostSubClaimType',
          a1: {
            employee: localStorage.getItem('empid'),
            employeedpdt:
              this.createClaimStepInfor.claimantName === 'null'
                ? null
                : this.createClaimStepInfor.claimantName,
            policytype: this.outClaimSelected.inpatient_claim_product_type_id || '3',
            policyclaimtype: this.outClaimSelected.inpatient_claim_type_id,
            policyclaimtypeclaimreason: val,
            date: this.createClaimStepInfor.incurreddate
          }
        });
        const response = JSON.parse(data.data.data[0].value);
        if (response.preh.length !== 0 && response.posth.length === 0) {
          this.claimTem.admissiontype = '514';
          this.claimTem.dischargedate = '';
        } else if (response.preh.length === 0 && response.posth.length !== 0) {
          this.claimTem.admissiontype = '515';
          this.claimTem.dischargedate = '';
        } else {
          this.claimTem.admissiontype = '513';
        }
        const value = [...response.preh, ...response.posth];
        if (data.length === 0) return;
        this.listRefClaim = value;
      },
      checkHollow(key) {
        if (this.claimTem[`${key}`]) {
          this.objError[`${key}`].status = false;
        }
      },
      async _createSuccessReferral() {
        this.$bvToast.show('refferal-toast');
        await this._getRefferalListing();
        if (this.listReferral.at(-1)) this.claimTem.referalletter = this.listReferral.at(-1).id;
        this.referralKey += 1;
      },
      _formatTimeCallApi(time) {
        return this.$dayjs(time).format('YYYY-MM-DD');
      },
      _formatTime(time) {
        return this.$dayjs(time).format('DD MMM YYYY');
      },
      _handlePagination: function (_currentPage) {
        this.handleCurrentPage(_currentPage);
        window.scrollTo({ top: 0, behavior: 'smooth' });
      },
      _handleColeAlert() {
        this.alert.isShow = false;
        this.changeIsCancelLog(1);
      },
      _back() {
        if (this.createStep == 3.1) {
          this.setCreateClaimStep(2.1);
          this._setStepList(2);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        } else {
          this.setCreateClaimStep(2.1);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }
      },
      async _next() {
        try {
          this._changeAlertConfig({
            isShow: false,
            typeAlert: 'success',
            textAlert: ""
          });
          this.handleValidateForm();
          if (this.objError.isFormError) {
            this._changeAlertConfig({
              isShow: true,
              typeAlert: 'warning',
              textAlert: "Please fill in the missing fields"
            });
            window.scrollTo({ top: 0, behavior: 'smooth' });
            return;
          }

          if (this.createStep == 3.1) {
            this.isCheckSubmit = true;

            await this._callApiCreate();
            if (this.isCreateClaim == 2) {
              this._setStepList(4);
              this.setCreateClaimStep(4.1);
              this.handleListFileInpatient({});
              setTimeout(() => {
                this._changeAlertConfig({
                  isShow: false,
                  typeAlert: 'error',
                  textAlert: ''
                });
              }, 10000);
            } else {
              const resBroker = await this.getBroker({
                invoke: 'System.execute',
                argc: '2',
                a0: 'API.Broker.Get'
              });
              this._changeAlertConfig({
                isShow: true,
                typeAlert: 'error',
                textAlert: this.$t('claim.edit_error', {
                  supEmail: resBroker.email,
                  numberPhone: resBroker.contactnumber
                })
              });
              window.scrollTo({ top: 0, behavior: 'smooth' });
              this.isCheckSubmit = false;
              return;
            }
            this.isCheckSubmit = false;
          } else {
            this.setCreateClaimStep(3.1);
          }
        } catch (error) {
          this.isCheckSubmit = false;
          console.log('_next ' + error);
        }
      },
      async _callApiCreate() {
        return this.createClaim({
          invoke: 'System.execute',
          argc: '2',
          a0: 'API.ClaimApplied.SubmissionByReferenceNo',
          a1: {
            mode: '0',
            params: {
              ...this.claimTem,
              parent: this.refclaim || this.claimTem.parent,
              policyclaimtype:
                this.outClaimSelected.inpatient_claim_type_id || this.claimTem.policyclaimtype,
              policytype: this.claimTem.policytype || '3',
              employeedpdt:
                this.createClaimStepInfor.claimantName == 'null'
                  ? ''
                  : this.createClaimStepInfor.claimantName,
              admissiondate: this._formatTimeCallApi(this.claimTem.admissiondate),
              dischargedate: this.claimTem.dischargedate
                ? this._formatTimeCallApi(this.claimTem.dischargedate)
                : '',
              policyclaimtypeclaimreason:
                this.claimTem.policyclaimtypeclaimreason == 'null'
                  ? ''
                  : this.claimTem.policyclaimtypeclaimreason
            },
            referenceno: this.referenceno,
            claimgroup: '4'
          }
        });
      },
      async _getRefferalListing() {
        await this.handleListReferral({
          invoke: 'System.execute',
          argc: '2',
          a0: 'EmployeeReferalLetter.Get',
          a1: {
            employee: localStorage.getItem('empid'),
            employeedpdt:
              this.createClaimStepInfor.claimantName == 'null'
                ? ''
                : this.createClaimStepInfor.claimantName
          }
        });
      },
      validateForm() {
        try {
          if (this.objError.check) {
            this.objError.policytype.status = this.outClaimSelected.inpatient_claim_product_type_id
              ? !this.outClaimSelected.inpatient_claim_product_type_id
              : !this.claimTem.policytype;

              Object.keys(this.outClaimSelected).length !== 0
                ? true
                : !this.claimTem.policytype;
            this.objError.invoiceno.status = !this.claimTem.invoiceno;
            this.objError.policyclaimtype.status = this.outClaimSelected.inpatient_claim_id
              ? !this.outClaimSelected.inpatient_claim_id
              : !this.claimTem.policyclaimtype;
            this.objError.incurredamt.status = !this.claimTem.incurredamt;
            this.objError.policyclaimtypeclaimreason.status =
              !this.claimTem.policyclaimtypeclaimreason;
            this.objError.currency.status = !this.claimTem.currency;
            this.objError.hospital.status = !this.claimTem.hospital;
            this.objError.referenceClaim.status = this.listReferenceClaim[0]
              ? !this.claimTem.parent
              : false;

            if (this.claimTem.admissiontype == '513') {
              this.objError.dischargedate.status = !this.claimTem.dischargedate;
            }

            if (this.claimTem.policyclaimtypeclaimreason == 'null') {
              this.objError.policyclaimtypeclaimreasonother.status =
                !this.claimTem.policyclaimtypeclaimreasonother;
            } else this.objError.policyclaimtypeclaimreasonother.status = false;

            if (this.claimTem.hospital == '21') {
              this.objError.hospitalother.status = !this.claimTem.hospitalother;
            } else this.objError.hospitalother.status = false;

            this.objError.isFormError =
              this.objError.policytype.status ||
              this.objError.invoiceno.status ||
              // this.objError.policyclaimtype.status ||
              this.objError.policyclaimtypeclaimreason.status ||
              this.objError.policyclaimtypeclaimreasonother.status ||
              this.objError.dischargedate.status ||
              this.objError.currency.status ||
              this.objError.incurredamt.status ||
              this.objError.hospital.status ||
              this.objError.hospitalother.status ||
              this.objError.referenceClaim.status;
          }
          return;
        } catch (error) {
          console.log('validateForm', error);
        }
      },
      handleValidateForm() {
        this.objError.check = true;
        this.validateForm();
      }
    },
    created() {
      this.setCreateClaimStep(3.1);
      this._changeAlertConfig({
        isShow: false,
        typeAlert: 'warning',
        textAlert: ""
      });
    },
    mounted() {
      if (this.outClaimSelected && this.outClaimSelected.inpatient_claim_type_id) {
        this.claimTem.policytype = this.outClaimSelected.inpatient_claim_product_type_id;
        this.claimTem.admissiondate = this._formatTime(this.createClaimStepInfor.incurreddate);

        this.claimTem.admissiontype = this.outClaimSelected.inpatient_claim_admission_type;
      }
      window.scrollTo({ top: 0, behavior: 'smooth' });
    },
    destroyed() {
      this.setOutClaimSelected({});
      this.handleCurrentPage([]);
      this.handleChooseLog([]);
    },
    async fetch() {
      try {
        await this.getPolicyClaimReason({
          invoke: 'System.execute',
          argc: '2',
          a0: 'PolicyClaimReason.getListing',
          a1: {
            employee: localStorage.getItem('empid'),
            employeedpdt:
              this.createClaimStepInfor.claimantName == 'null'
                ? null
                : this.createClaimStepInfor.claimantName,
            policytype: this.outClaimSelected.inpatient_claim_product_type_id,
            policyclaimtype: this.outClaimSelected.inpatient_claim_type_id,
            date: this.createClaimStepInfor.incurreddate
          }
        });
        await this.loadInitialData({
          invoke: 'System.execute',
          argc: '2',
          a0: 'PolicyClaimApplied.LoadInitialData',
          a1: {
            emp: localStorage.getItem('empid'),
            empdpdt: ''
          }
        });
        await this.getListAdmissionType({
          invoke: 'System.execute',
          argc: '2',
          a0: 'API.List.Select',
          a1: {
            ListGroup: '17'
          }
        });
        await this.getListEmployee({
          invoke: 'System.execute',
          argc: '2',
          a0: 'ClaimApplied.getEmployeeList',
          a1: {}
        });
        await this.getListPolicy({
          invoke: 'System.execute',
          argc: '2',
          a0: 'PolicyClaimApplied.GetEligiblePolicyTypeWeb',
          a1: {
            empid: localStorage.getItem('empid'),
            empdpdt:
              this.createClaimStepInfor.claimantName == 'null'
                ? ''
                : this.createClaimStepInfor.claimantName,
            admissiondate: this._formatTimeCallApi(
              !this.chooseLog[0] ? new Date() : this.chooseLog[0].admissiondate
            ),
            log: !this.chooseLog[0] ? '' : this.chooseLog[0].logid,
            isListPolicyClaim: true
          }
        });
        await this.getListClaimantLog({
          invoke: 'System.execute',
          argc: '2',
          a0: 'API.getEmployeeADpdt.info',
          a1: {
            isClaim: true
          }
        });
        await this.getListSurgery({
          invoke: 'System.execute',
          argc: '2',
          a0: 'API.Autocomplete.Select',
          a1: {
            module: '14'
          }
        });

        await this._getRefferalListing();
        if (this.chooseLog[0]) {
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
        }

        let hospital;
        if(this.outClaimSelected.inpatient_claim_hospital_id){
          hospital = this.outClaimSelected.inpatient_claim_hospital_id
        }
        else if(!this.outClaimSelected.inpatient_claim_hospital_id && this.listHospital && this.listHospital.length == 1){
          hospital = this.listHospital[0].id;
        }
        this.refclaim =this.outClaimSelected.inpatient_claim_id
        this.claimTem = {
          ...this.claimTem,
          policyclaimtype: this.outClaimSelected.inpatient_claim_type_id,
          invoiceno: this.outClaimSelected.inpatient_claim_claim_invoice_num,
          log: !this.chooseLog[0] ? '' : this.chooseLog[0].logid,
          policyclaimtypeclaimreason: !this.chooseLog[0]
            ? ''
            : this.chooseLog[0].policyclaimtypeclaimreason,
          policytype: !this.chooseLog[0] ? '' : this.chooseLog[0].policytype,
          hospitaltype: !this.chooseLog[0] ? '' : this.chooseLog[0].hospitaltype,
          employee: localStorage.getItem('empid'),
          employeedpdt: this.createClaimStepInfor.claimantName,
          hospital: hospital,
          admissiondate: this._formatTime(this.createClaimStepInfor.incurreddate),
          incurredamt: !this.createClaimStepInfor.incurred_amount
            ? null
            : this.createClaimStepInfor.incurred_amount
        };
        this.referenceno = this.createClaimStepInfor.referenceno;
        this.claimTemDefault = { ...this.claimTem };

        if(!this.chooseLog[0] && this.listPolicy && this.listPolicy.length == 1){
          this.handleSetListPolicy(this.listPolicy[0].id);
        }

      } catch (error) {
        console.log('fetch ' + error);
      }
    }
  };
</script>

<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>
<style scoped>
  @import '@/assets/css/inputCustom/inputCustom.css';
  @import '@/assets/css/claim/stepTwo.css';
  @import '@/assets/css/claim/stepOne.css';
  @import '@/assets/css/claim/create/sameRecept.css';
  @import '@/assets/css/quick-log/stepContent.css';
  .btn_outpaitent {
    justify-content: flex-end !important;
  }
  .label__alert__isured{
    color: #DC3545;
  }
  ::v-deep .default-input{
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }
</style>
