<template>
  <div>
    <div class="d-flex justify-content-between w-100">
      <div class="wrapper__content__log p--20">
        <div class="wrapper__content__log__two">
          <div class="session__input pb--25 mt-0">
            <div>
              <div class="d-flex mb--24 align-items-center justify-content-start">
                <div class="text__title__log text-20 font__medium">
                  {{ $t('log.log_request') }}
                </div>
                <button
                  v-if="log.state_name_ind_field == 'Pending Approval'"
                  class="btn-edit-log border-0 d-flex justify-content-center align-items-center ml--10"
                  @click="isEditLog = false"
                >
                  <img src="@/assets/images/icon-edit-log.png" alt="icon-edit-log" />
                </button>
                <button
                  v-if="log.state_name_ind_field == 'Pending Approval'"
                  class="btn-edit-log border-0 d-flex justify-content-center align-items-center ml--10"
                  @click=""
                >
                  <img src="@/assets/images/icon-trash-log.png" alt="icon-edit-log" />
                </button>
                <button
                  v-if="log.state_name_ind_field == 'Pending Approval'"
                  class="btn-edit-log border-0 d-flex justify-content-center align-items-center ml--10"
                  @click=""
                >
                  <img src="@/assets/images/icon-print-log.png" alt="icon-edit-log" />
                </button>
              </div>

              <div class="d-flex justify-content-between align-items-center mb--25">
                <div
                  :class="{
                    'position-relative': true,
                    'wrapper__input__log mb--25': true,
                    input__disabled: isEditLog,
                    'w-100 letter-spacing-0-5': true,
                    'mr--24': true
                  }"
                >
                  <div class="label__log mb-2 text-12">{{ $t('log.reference_no') }}</div>
                  <div
                    :class="{
                      'position-relative': true,
                      wrapper__input__log: true,
                      input__disabled: true
                    }"
                  >
                    <input
                      v-model="log.referenceno"
                      :class="{
                        input__custom: true,
                        'w-100': true,
                        'input-log-detail': true
                      }"
                      placeholder=""
                    />
                  </div>
                </div>

                <div
                  :class="{
                    'position-relative': true,
                    'wrapper__input__log mb--25': true,
                    input__disabled: isEditLog,
                    ' w-100 letter-spacing-0-5': true,
                    'd-flex justify-content-between': true
                  }"
                >
                  <div class="d-flex wrapper-status-input">
                    <div class="w-100">
                      <div class="label__log mb-2 text-12">{{ $t('log.status') }}</div>
                      <div
                        :class="{
                          'position-relative': true,
                          wrapper__input__log: true,
                          input__disabled: true
                        }"
                      >
                        <input
                          v-model="log.state_name_ind_field"
                          :class="{
                            input__custom: true,
                            'w-100': true,
                            'input-log-detail': true
                          }"
                          placeholder=""
                        />
                      </div>
                    </div>
                  </div>
                  <div class="wrapper-icon mt--40">
                    <img
                      v-if="log.state_name_ind_field == 'Pending Approval'"
                      class="time__progress__light__claim mt-0 align-items-center"
                      src="@/assets/images/icon-arrow-pending.png"
                      alt="Time_progress_light"
                    />
                    <img
                      v-else-if="log.state_name_ind_field == 'Approved'"
                      class="time__progress__light__claim mt-0 align-items-center"
                      src="@/assets/images/icon-arrow-success.png"
                      alt="check2-circle"
                    />
                    <img
                      v-else
                      class="time__progress__light__claim mt-0 align-items-center"
                      src="@/assets/images/icon-arrow-remove.png"
                      alt="Remove_duotone_line"
                    />
                  </div>
                </div>
              </div>
              <div class="d-flex justify-content-between align-items-center">
                <div
                  :class="{
                    'position-relative': true,
                    'wrapper__input__log mb--25': true,
                    input__disabled: isEditLog,
                    'w-100 mr--24 letter-spacing-0-5': true
                  }"
                >
                  <DatetimePicker
                    :label="$t('log.admission_date')"
                    v-model="logTem.admissiondate"
                    :disabled="isEditLog"
                    :isText12="true"
                    :placeholder="'Admission Date'"
                    :style="''"
                    :options="options"
                    :showStar="true"
                    :isFontBold="true"
                    :isRequiredDate="objError.admissiondate.status"
                  />
                  <b-form-invalid-feedback v-if="objError.admissiondate.status" class="d-block">
                    {{ objError.admissiondate.error }}
                  </b-form-invalid-feedback>
                </div>
                <div
                  :class="{
                    'position-relative': true,
                    'wrapper__input__log mb--25': true,
                    input__disabled: isEditLog,
                    ' w-100 letter-spacing-0-5': true
                  }"
                >
                  <DatetimePicker
                    :label="$t('log.date_of_illness')"
                    v-model="logTem.dateofillness"
                    :disabled="isEditLog"
                    :isText12="true"
                    :placeholder="'Date Of Illness'"
                    :style="''"
                    :options="optionsDateOfIllness"
                    :showStar="true"
                    :isFontBold="true"
                    :isRequiredDate="objError.dateofillness.status"
                  />
                  <b-form-invalid-feedback v-if="objError.dateofillness.status" class="d-block">
                    {{ objError.dateofillness.error }}
                  </b-form-invalid-feedback>
                </div>
              </div>
            </div>
          </div>
          <div class="session__input mt--25">
            <div class="text__title__log text-20 mb--24 font__medium mt--25">
              {{ $t('log.claimant_information') }}
            </div>
            <div class="d-flex">
              <div class="mr--24 w-100 letter-spacing-0-5">
                <div class="label__log font__regular mb-8 text-12">
                  {{ $t('log.employee_name') }} <span class="text-danger">(*)</span>
                </div>
                <div
                  :class="{
                    'position-relative': true,
                    'wrapper__input__log mb--25': true,
                    input__disabled: isEditLog
                  }"
                >
                  <div class="position-relative wrapper__input__log mb--25 w--100--percent">
                    <Autocomplete
                      :placeholder="$t('please_select')"
                      :value="logTem.employee"
                      :displayAttribute="'name'"
                      :valueAttribute="'id'"
                      :optionDropdowns="listEmployee"
                      :filter="true"
                      :isDisabled="true"
                      :isHeight50="true"
                      @changeValue="value => (this.logTem.employee = value)"
                      :isStyleAutoCompleteLog="true"
                    />
                  </div>
                </div>
              </div>
              <div class="w-100 letter-spacing-0-5">
                <div class="label__log font__regular mb-8 text-12">
                  {{ $t('log.claimant_name') }} <span class="text-danger">(*)</span>
                </div>
                <div class="position-relative wrapper__input__log mb--25 w--100--percent">
                  <Autocomplete
                    :placeholder="$t('please_select')"
                    :value="logTem.employeedpdt"
                    :displayAttribute="'name'"
                    :valueAttribute="'id'"
                    :optionDropdowns="listClaimants"
                    :filter="true"
                    :isDisabled="isEditLog"
                    :isHeight50="true"
                    @changeValue="value => (this.logTem.employeedpdt = value)"
                    :isStyleAutoCompleteLog="true"
                  />
                  <b-form-invalid-feedback v-if="objError.employeedpdt.status" class="d-block">
                    {{ objError.employeedpdt.error }}
                  </b-form-invalid-feedback>
                </div>
              </div>
            </div>
          </div>
          <div class="session__input mt-0">
            <div class="text__title__log text-20 mb--24 font__medium">
              {{ $t('log.log_information') }}
            </div>
            <div class="d-flex">
              <div class="mr--24 w-100 letter-spacing-0-5">
                <div class="label__log font__regular mb-8 text-12">
                  {{ $t('log.policy') }} <span class="text-danger">(*)</span>
                </div>
                <div class="position-relative wrapper__input__log mb--25 w--100--percent">
                  <Autocomplete
                    :placeholder="$t('please_select')"
                    :value="logTem.policytype"
                    :displayAttribute="'name'"
                    :valueAttribute="'id'"
                    :optionDropdowns="listPolicy"
                    :filter="true"
                    :isDisabled="isEditLog"
                    :isHeight50="true"
                    :isRequired="objError.policytype.status"
                    @changeValue="value => (this.logTem.policytype = value)"
                    :isStyleAutoCompleteLog="true"
                  />
                  <b-form-invalid-feedback v-if="objError.policytype.status" class="d-block">
                    {{ objError.policytype.error }}
                  </b-form-invalid-feedback>
                </div>
              </div>
              <div class="w-100 letter-spacing-0-5">
                <div class="label__log font__regular mb-8 text-12">
                  {{ $t('log.policy_claim_type') }} <span class="text-danger">(*)</span>
                </div>
                <div class="position-relative wrapper__input__log mb--25 w--100--percent">
                  <Autocomplete
                    :placeholder="$t('please_select')"
                    :value="logTem.policyclaimtype"
                    :displayAttribute="'name'"
                    :valueAttribute="'id'"
                    :optionDropdowns="listPolicyClaimType"
                    :filter="true"
                    :isDisabled="isEditLog"
                    :isHeight50="true"
                    :isRequired="objError.policyclaimtype.status"
                    @changeValue="value => (this.logTem.policyclaimtype = value)"
                    :isStyleAutoCompleteLog="true"
                  />
                  <b-form-invalid-feedback v-if="objError.policyclaimtype.status" class="d-block">
                    {{ objError.policyclaimtype.error }}
                  </b-form-invalid-feedback>
                </div>
              </div>
            </div>
            <div class="d-flex">
              <div class="mr--24 w-100 letter-spacing-0-5">
                <div class="label__log font__regular mb-8 text-12">
                  {{ $t('log.diagnosis') }} <span class="text-danger">(*)</span>
                </div>
                <div class="position-relative wrapper__input__log mb--25 w--100--percent">
                  <Autocomplete
                    :placeholder="$t('please_select')"
                    :value="logTem.policyclaimtypeclaimreason"
                    :displayAttribute="'name'"
                    :valueAttribute="'id'"
                    :optionDropdowns="listPolicyclaimtypeclaimreason"
                    :filter="true"
                    :isDisabled="isEditLog"
                    :isHeight50="true"
                    :isRequired="objError.policyclaimtypeclaimreason.status"
                    @changeValue="value => (this.logTem.policyclaimtypeclaimreason = value)"
                    :isStyleAutoCompleteLog="true"
                  />
                  <b-form-invalid-feedback
                    v-if="objError.policyclaimtypeclaimreason.status"
                    class="d-block"
                  >
                    {{ objError.policyclaimtypeclaimreason.error }}
                  </b-form-invalid-feedback>
                </div>
              </div>
              <div class="w-100 letter-spacing-0-5">
                <div class="label__log font__regular mb-8 text-12">
                  {{ $t('log.hospital') }} <span class="text-danger">(*)</span>
                </div>
                <div class="position-relative wrapper__input__log mb--25 w--100--percent">
                  <Autocomplete
                    :placeholder="$t('please_select')"
                    :value="logTem.hospital"
                    :displayAttribute="'name'"
                    :valueAttribute="'id'"
                    :optionDropdowns="listHospital"
                    :filter="true"
                    :isDisabled="isEditLog"
                    :isHeight50="true"
                    :isRequired="objError.hospital.status"
                    @changeValue="value => (this.logTem.hospital = value)"
                    :isStyleAutoCompleteLog="true"
                  />
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
          <div class="session__input mt-0">
            <div class="text__title__log text-20 mb--24 font__medium">
              {{ $t('log.treatment_information') }}
            </div>
            <div class="d-flex">
              <div class="mr--24 w-100 letter-spacing-0-5">
                <div class="label__log font__regular mb-8 text-12">
                  Ward Type <span class="text-danger">(*)</span>
                </div>
                <div
                  :class="{
                    'position-relative': true,
                    'wrapper__input__log mb--25': true
                  }"
                >
                  <div class="position-relative wrapper__input__log mb--25 w--100--percent">
                    <Autocomplete
                      :placeholder="$t('please_select')"
                      :value="logTem.wardtype"
                      :displayAttribute="'name'"
                      :valueAttribute="'id'"
                      :optionDropdowns="listWardType"
                      :filter="true"
                      :isDisabled="isEditLog"
                      :isHeight50="true"
                      :isRequired="objError.wardtype.status"
                      @changeValue="value => (this.logTem.wardtype = value)"
                      :isStyleAutoCompleteLog="true"
                    />
                    <b-form-invalid-feedback v-if="objError.wardtype.status" class="d-block">
                      {{ objError.wardtype.error }}
                    </b-form-invalid-feedback>
                  </div>
                </div>
              </div>
              <div class="w-100 letter-spacing-0-5">
                <div class="label__log font__regular mb-8 text-12">
                  Admission Type <span class="text-danger">(*)</span>
                </div>
                <div class="position-relative wrapper__input__log mb--25 w--100--percent">
                  <Autocomplete
                    :placeholder="$t('please_select')"
                    :value="logTem.admissiontype"
                    :displayAttribute="'name'"
                    :valueAttribute="'id'"
                    :isDisabled="isEditLog"
                    :optionDropdowns="listAdmissionType"
                    :filter="true"
                    :isHeight50="true"
                    :isRequired="objError.admissiontype.status"
                    @changeValue="value => (this.logTem.admissiontype = value)"
                    :isStyleAutoCompleteLog="true"
                  />
                  <b-form-invalid-feedback v-if="objError.admissiontype.status" class="d-block">
                    {{ objError.admissiontype.error }}
                  </b-form-invalid-feedback>
                </div>
              </div>
            </div>
            <div class="d-flex">
              <div class="mr--24 w-100 letter-spacing-0-5">
                <div class="label__log font__regular mb-8 text-12">
                  {{ $t('log.surgical_code') }} <span class="text-danger">(*)</span>
                </div>
                <div class="position-relative wrapper__input__log mb--25 w--100--percen">
                  <Autocomplete
                    :placeholder="$t('please_select')"
                    :value="logTem.surgery"
                    :displayAttribute="'name'"
                    :valueAttribute="'id'"
                    :optionDropdowns="listSurgery"
                    :filter="true"
                    :isDisabled="isEditLog"
                    :isHeight50="true"
                    @changeValue="value => (this.logTem.surgery = value)"
                    :isStyleAutoCompleteLog="true"
                  />
                  <b-form-invalid-feedback v-if="objError.surgery.status" class="d-block">
                    {{ objError.surgery.error }}
                  </b-form-invalid-feedback>
                </div>
              </div>
              <div class="w-100 letter-spacing-0-5">
                <div class="d-flex justify-content-between flex-wrap">
                  <div class="position-relative wrapper__input__log mb--25 w--100 mr-2 currency">
                    <div class="label__log font__regular mb-8 text-12">
                      {{ $t('log.currency') }}
                    </div>
                    <div class="position-relative w--100 h--40 input-currency-wrapper">
                      <Autocomplete
                        :placeholder="''"
                        :value="logTem.currencysurgery"
                        :displayAttribute="'name'"
                        :valueAttribute="'id'"
                        :optionDropdowns="listCurrency"
                        :filter="true"
                        :isDisabled="isEditLog"
                        :isCurrency="true"
                        :isHeight50="true"
                        @changeValue="value => (this.logTem.currencysurgery = value)"
                        :isStyleAutoCompleteLog="true"
                      />
                    </div>
                  </div>
                  <div class="position-relative wrapper__input__log mb--25 estimated_amount">
                    <div class="label__log font__regular mb-8 text-12">
                      {{ $t('log.estimated_amount') }}
                    </div>
                    <div
                      class="wrapper-input-estimated_amount"
                      :class="{
                        input__disabled: isIsCheckSubmit && !isSupp,
                        stylesInputLog: true
                      }"
                    >
                      <currency-input
                        v-model="logTem.estimatedcostofsurgery"
                        :distraction-free="false"
                        :currency="null"
                        :min="0"
                        :max="null"
                        :class="{
                          input__custom: true,
                          'width--100--percent': true,
                          'disabled-input-log': isEditLog
                        }"
                        :precision="{ min: 0, max: 2 }"
                        :placeholder="$t('log.enter_amount')"
                        locale="en-US"
                        :disabled="isEditLog"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="divide-line-log w-100 mt-25"></div>
          </div>
          <div class="session__input mt-0 border-0 mb--70">
            <div class="d-flex justify-content-between flex-wrap">
              <div
                class="mb-24 mr--24 width--565 w-100 d-flex flex-column justify-content-center flex-wrap font__medium upload-img-log"
              >
                <UploadImg
                  :title="$t('log.financial_counselling_form_(Optional)')"
                  :files="filesFinancialCounsellingForm"
                  :isTooltip="true"
                  :textTooltip="$t('log.financial_counselling')"
                  :index="0"
                  @handleUploadSuccess="_handleUploadFinancialCounsellingFormSuccess"
                  @removeFile="_removeFileFinancialCounsellingForm"
                  :isFontMedium="true"
                  :isCheckSubmit="isEditLog"
                />
              </div>
            </div>
          </div>
        </div>
        <div class="wrapper__button__filter__one--one d-flex justify-content-between">
          <!-- :disabled="isLoading" -->
          <button
            type="button"
            @click="_back"
            class="btn bg-white button-back-log font__regular text--capitalize text-16"
          >
            {{ $t('back') }}
          </button>

          <button
            :disabled="isEditLog"
            type="button"
            @click="_next"
            class="btn button-next-log font__regular d-flex justify-content-center align-items-center text-16 text--capitalize text-white"
          >
            {{ $t('next') }}
          </button>
        </div>
        <b-modal v-model="isModel" ref="my-modal" size="xl" hide-footer title="Disclaimer">
          <div class="d-block text-left p-4">
            <b-form-group label="" v-slot="{ ariaDescribedby }">
              <b-form-checkbox-group
                id="checkbox-group-2"
                v-model="isCheckTerms"
                :aria-describedby="ariaDescribedby"
                name="flavour-2"
                class="d-flex"
                style="flex-direction: column"
              >
                <b-form-checkbox class="checkbox-size">
                  <div v-html="declaration" class="content--checkbox text-16 ml--30" />
                </b-form-checkbox>
              </b-form-checkbox-group>
            </b-form-group>
          </div>
          <div class="btn-popup-component">
            <b-button
              :disabled="!isCheckTerms"
              class="btn-oke"
              block
              @click="_okeBtn"
              :style="{ opacity: isCheckTerms ? 1 : 0.65 }"
              >Ok
            </b-button>
            <b-button class="btn-cancel_popup br--4 w--80 m-0" block @click="_cancelBtn"
              >Cancel
            </b-button>
          </div>
        </b-modal>
      </div>
    </div>
  </div>
</template>

<script>
  import { mapGetters, mapActions } from 'vuex';
  import { postAxios } from '../../services/callApi';

  export default {
    components: {},
    data: () => ({
      isShowAlertSuccess: false,
      isShowAlertFail: false,
      isShowPre: false,
      isLoading: true,
      isEditLog: true,
      isShowDropdown: false,
      valueDropdown: '',
      optionDropdowns: [
        'Gleneagles Hospital',
        'Singapore General Hospital',
        'Changi General Hospital',
        'KK Women & Children Hospital'
      ],
      logNoChang: {
        currencysurgery: '',
        estimatedcostofsurgery: null
      },
      filesFinancialCounsellingForm: [],
      filesPreAuthCertificate: [],
      filesRemove: [],
      logTem: {
        admissiondate: '',
        currency: '',
        issueddate: '',
        logamt: null,
        employee: '',
        updatectr: '',
        employeedpdt: '',
        policytype: '',
        policyclaimtype: null,
        policyclaimtypeclaimreason: '',
        policyclaimtypeclaimreasonother: null,
        hospital: '',
        hospitalother: null,
        surgery: '',
        currencysurgery: '',
        estimatedcostofsurgery: null,
        dateofillness: '',
        files: []
      },
      listPolicyclaimtypeclaimreason: [],
      policyclaimtypeclaimreasonValue: null,
      objError: {
        check: false,
        isFormError: false,
        admissiondate: { error: 'Please enter admission date.', status: false },
        dateofillness: { error: 'Please enter date of illness.', status: false },
        employeedpdt: { error: 'Please enter date of claimant name.', status: false },
        policytype: { error: 'Please enter policy.', status: false },
        policyclaimtype: { error: 'Please enter policy claim type.', status: false },
        policyclaimtypeclaimreason: { error: 'Please enter diagnosis.', status: false },
        policyclaimtypeclaimreasonother: { error: 'Please enter diagnosis other.', status: false },
        hospital: { error: 'Please enter hospital.', status: false },
        hospitalother: { error: 'Please enter hospital other.', status: false },
        wardtype: { error: 'Please enter ward type.', status: false },
        admissiontype: { error: 'Please enter admission type.', status: false },
        surgery: { error: 'Please enter surgery.', status: false }
      }
    }),
    computed: {
      ...mapGetters('log', [
        'step',
        'listCurrency',
        'listHospital',
        'listPolicy',
        'listPolicyClaimType',
        'listPolicyClaimReason',
        'log',
        'listSurgery',
        'isCreateLog',
        'listEmployee',
        'listClaimants',
        'listWardType',
        'listAdmissionType'
      ]),
      options() {
        let result = {
          format: 'DD MMM YYYY',
          useCurrent: false
        };

        if (!this.isEditLog) {
          result = {
            format: 'DD MMM YYYY',
            useCurrent: false,
            minDate: this.$dayjs().add(4, 'd').format('DD MMM YYYY')
          };
        }
        return result;
      },
      propertyPolicy() {
        const dataPolicy = {
          policytype: this.logTem.policytype,
          policyclaimtype: this.logTem.policyclaimtype
        };
        return JSON.stringify(dataPolicy);
      },
      propertyLogTem() {
        return JSON.stringify(this.logTem);
      },
      optionsDateOfIllness() {
        return {
          format: 'DD MMM YYYY',
          useCurrent: false,
          maxDate: this.$dayjs().add(0, 'd').format('DD MMM YYYY')
        };
      }
    },
    async fetch() {
      try {
        this.isLoading = true;
        await this.getLog({
          invoke: 'System.execute',
          argc: '2',
          a0: 'API.LOG.Load',
          a1: {
            id: this.$route.params.id
          }
        });
        await this.getListEmployee({
          invoke: 'System.execute',
          argc: '2',
          a0: 'ClaimApplied.getEmployeeList',
          a1: {}
        });
        await this.getListCurrency({
          invoke: 'System.execute',
          argc: '2',
          a0: 'API.Autocomplete.Select',
          a1: {
            module: 5
          }
        });
        await this.getListHospital({
          invoke: 'System.execute',
          argc: '2',
          a0: 'API.Autocomplete.Select',
          a1: {
            module: 13
          }
        });
        await this.getListPolicy({
          invoke: 'System.execute',
          argc: '2',
          a0: 'LOG.getEligiblePolicyType',
          a1: {
            employee: localStorage.getItem('empid'),
            employeedpdt: null,
            web: true,
            admissiondate: this._formatTimeCallApi(this.log.admissiondate)
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
        await this.setListWardType({
          invoke: 'System.execute',
          argc: '2',
          a0: 'API.List.Select',
          a1: {
            ListGroup: '25'
          }
        });
        await this.setListAdmissionType({
          invoke: 'System.execute',
          argc: '2',
          a0: 'API.List.Select',
          a1: {
            ListGroup: '26'
          }
        });
        await this.getListClaimantLog({
          invoke: 'System.execute',
          argc: '2',
          a0: 'LOG.getEligibleDependant',
          a1: {
            employee: localStorage.getItem('empid'),
            admissiondate: this._formatTimeCallApi(this.log.admissiondate),
            web: true
          }
        });
        this.logTem = {
          ...this.logTem,
          ...this.log,
          dateofillness: this._formatTime(this.log.dateofillness),
          employeedpdt: !this.log.employeedpdt ? 'null' : this.log.employeedpdt,
          admissiondate: this._formatTime(this.log.admissiondate),
          issueddate: this._formatTime(this.log.issueddate)
          // employee: this.log.employee,
        };
        this.filesFinancialCounsellingForm = JSON.parse(JSON.stringify(this.log.files)).filter(
          item => {
            if (item.name.slice(0, 2) == '0-' || item.name.slice(0, 2) == '1-') {
              item.name = item.name.slice(2);
              return item;
            }
          }
        );
        this.filesPreAuthCertificate = JSON.parse(JSON.stringify(this.log.files)).filter(item => {
          if (item.name.slice(0, 2) == '1-') {
            item.name = item.name.slice(2);
            return item;
          }
        });
        this.logNoChang.currencysurgery = this.log.currencysurgery;
        this.logNoChang.estimatedcostofsurgery = this.log.estimatedcostofsurgery;
        const resData = await postAxios({
          invoke: 'System.execute',
          argc: '2',
          a0: 'API.LOG.getEligiblePolicyTypeSetting',
          a1: {
            employee: localStorage.getItem('empid'),
            employeedpdt: this.log.employeedpdt === 'null' ? null : this.log.employeedpdt,
            admission_date: this._formatTimeCallApi(this.log.admissiondate)
          }
        });
        const resPresub = JSON.parse(resData.data.data[0].value);
        if (
          resPresub.data.show_pre_auth_attachment['3'] &&
          resPresub.data.show_pre_auth_attachment['3'].is_show
        ) {
          this.isShowPre = true;
        }
        this.isLoading = false;
      } catch (error) {}
    },
    mounted() {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    },
    methods: {
      ...mapActions('log', [
        'getListCurrency',
        'getListHospital',
        'getListPolicy',
        'getListPolicyClaimType',
        'getListPolicyClaimReason',
        'cancelLog',
        'getLog',
        'getLoadUpdateLog',
        'changeLog',
        'createLog',
        'getListSurgery',
        'getListEmployee',
        'getListClaimantLog',
        'setListAdmissionType',
        'setListWardType'
      ]),
      ...mapActions('upload', ['getNewUUID', 'uploadFile']),
      _back() {
        this.$router.push({name: 'log'})
      },
      _formatTimeCallApi(time) {
        return this.$dayjs(time).format('YYYY-MM-DD');
      },
      validateForm() {
        if (this.objError.check) {
          this.objError.admissiondate.status = !this.logTem.admissiondate;
          this.objError.dateofillness.status = !this.logTem.dateofillness;
          this.objError.policytype.status = !this.logTem.policytype;
          this.objError.policyclaimtype.status = !this.logTem.policyclaimtype;
          this.objError.policyclaimtypeclaimreason.status = !this.logTem.policyclaimtypeclaimreason;
          this.objError.hospital.status = !this.logTem.hospital;
          this.objError.wardtype.status = !this.logTem.wardtype;
          this.objError.admissiontype.status = !this.logTem.admissiontype;

          if (this.logTem.policyclaimtypeclaimreason == 'null') {
            this.objError.policyclaimtypeclaimreasonother.status =
              !this.logTem.policyclaimtypeclaimreasonother;
          } else this.objError.policyclaimtypeclaimreasonother.status = false;

          if (this.logTem.hospital == '21') {
            this.objError.hospitalother.status = !this.logTem.hospitalother;
          } else this.objError.hospitalother.status = false;

          this.objError.isFormError =
            this.objError.admissiondate.status ||
            this.objError.dateofillness.status ||
            this.objError.policytype.status ||
            this.objError.policyclaimtype.status ||
            this.objError.policyclaimtypeclaimreason.status ||
            this.objError.policyclaimtypeclaimreasonother.status ||
            this.objError.hospital.status ||
            this.objError.hospitalother.status ||
            this.objError.wardtype.status ||
            this.objError.admissiontype.status;
        }
      },
      handleValidateForm() {
        this.objError.check = true;
        this.validateForm();
      },
      checkHollow(key) {
        if (this.logTem[`${key}`]) {
          this.objError[`${key}`].status = false;
        }
      },
      async _next() {
        try {
          this.handleValidateForm();

          if (this.objError.isFormError) {
            window.scrollTo({ top: 0, behavior: 'smooth' });
            return;
          }

          if (this.isEditLog) {
            this.isEditLog = false;
            this.$emit('_handleCheckEditLog', true);
            return;
          }
          this.$emit('_handleCheckEditLog', false);
          this.isEditLog = true;
          this.isLoading = true;
          let listFiles = await this._handleFile();

          const res = await this.createLog({
            invoke: 'System.execute',
            argc: '2',
            a0: 'API.Employee.LOG.Apply',
            a1: {
              param: {
                updatectr: this.logTem.updatectr,
                policytype: this.logTem.policytype,
                policyclaimtype: this.logTem.policyclaimtype,
                policyclaimtypeclaimreasonother: this.logTem.policyclaimtypeclaimreasonother,
                hospital: this.logTem.hospital,
                hospitalother: this.logTem.hospitalother,
                logparent: this.logTem.logparent,
                surgery: this.logTem.surgery,
                currencysurgery: this.logTem.currencysurgery,
                estimatedcostofsurgery: this.logTem.estimatedcostofsurgery,
                admissiontype: this.logTem.admissiontype,
                wardtype: this.logTem.wardtype,
                employeeremarks: this.logTem.employeeremarks,
                id: this.$route.params.id,
                name: this.name_ind_field,
                employeedpdt: this.logTem.employeedpdt == 'null' ? '' : this.logTem.employeedpdt,
                policyclaimtypeclaimreason:
                  this.logTem.policyclaimtypeclaimreason == 'null'
                    ? ''
                    : this.logTem.policyclaimtypeclaimreason,
                dateofillness: this.logTem.dateofillness
                  ? this._formatTimeCallApi(this.logTem.dateofillness)
                  : '',
                employee: localStorage.getItem('empid'),
                issueddate: this._formatTimeCallApi(this.logTem.issueddate),
                admissiondate: this._formatTimeCallApi(this.logTem.admissiondate),
                empemail: '1',
                empletter: '1',
                files: JSON.stringify(listFiles)
              }
            }
          });
          if (JSON.parse(res.value).data.success === 1) {
            this.$emit('_handleShowAlertSuccess');
          } else {
            this.$emit('_handleShowAlertFail');
          }
          if (this.isCreateLog == 2) {
            await this._reloadLog();
            this.isIsCheckSubmit = false;
          }
          this.isLoading = false;
          window.scrollTo({ top: 0, behavior: 'smooth' });
        } catch (error) {}
      },
      async _handleFile() {
        let newUUIDFile;
        let listFiles = [];
        for (let file of this.filesRemove) {
          if (file.deleteUrl) {
            await postAxios({
              invoke: 'System.execute',
              argc: '2',
              a0: 'API.Module.DeleteAttachment',
              a1: {
                record_id: file.id,
                mode: 3
              }
            });
          }
        }

        for (let file of this.filesFinancialCounsellingForm) {
          const resNewUUID = await this.getNewUUID();
          newUUIDFile = `${resNewUUID}-0-${file.name}`;

          if (!file.url && file.name) {
            const dataFile = new FormData();
            dataFile.append('file', file, `${newUUIDFile}`);

            await this.uploadFile(dataFile);
          }
          listFiles.push(newUUIDFile);
        }

        for (let file of this.filesPreAuthCertificate) {
          const resNewUUID = await this.getNewUUID();
          newUUIDFile = `${resNewUUID}-1-${file.name}`;

          if (!file.url && file.name) {
            const dataFile = new FormData();
            dataFile.append('file', file, `${newUUIDFile}`);

            await this.uploadFile(dataFile);
          }
          listFiles.push(newUUIDFile);
        }

        return listFiles;
      },
      _dropdownHandler() {
        this.isShowDropdown = !this.isShowDropdown;
      },
      _handleUploadFinancialCounsellingFormSuccess(file) {
        this.filesFinancialCounsellingForm = [...this.filesFinancialCounsellingForm, file];
      },
      _removeFileFinancialCounsellingForm(index) {
        this.filesRemove = [...this.filesRemove, this.filesFinancialCounsellingForm[index]];
        this.filesFinancialCounsellingForm.splice(index, 1);
      },
      _handleUploadPreAuthCertificateSuccess(file) {
        this.filesPreAuthCertificate = [...this.filesPreAuthCertificate, file];
      },
      _removeFilePreAuthCertificate(index) {
        this.filesRemove = [...this.filesRemove, this.filesPreAuthCertificate[index]];
        this.filesPreAuthCertificate.splice(index, 1);
      },
      _formatTime(time) {
        return this.$dayjs(time).format('DD MMM YYYY');
      },
      async _reloadLog() {
        await this.getLog({
          invoke: 'System.execute',
          argc: '2',
          a0: 'API.LOG.Load',
          a1: {
            id: this.$route.params.id
          }
        });
        this.logTem = {
          ...this.logTem,
          ...this.log,
          admissiondate: this._formatTime(this.log.admissiondate),
          issueddate: this._formatTime(this.log.issueddate),
          files: [
            this.log.files[this.log.files.length - 2],
            this.log.files[this.log.files.length - 1]
          ]
        };
      },
      async _cancelLog() {
        this.isLoading = true;
        await this.cancelLog({
          invoke: 'System.execute',
          argc: '2',
          a0: 'LOG.Cancel',
          a1: {
            id: this.$route.params.id
          }
        });
        await this._reloadLog();
        this.isLoading = false;
        this.$router.push({ name: 'log-log-list' });
      }
    },
    watch: {
      'logTem.policytype': async function (newVal) {
        try {
          await this.getListPolicyClaimType({
            invoke: 'System.execute',
            argc: '2',
            a0: 'LOG.FilterPolicyClaimType',
            a1: {
              employee: localStorage.getItem('empid'),
              employeedpdt: null,
              policytype: newVal,
              web: true
            }
          });
          if (!this.isEditLog) {
            this.logTem.policyclaimtype = '';
          }
        } catch (error) {}
      },
      propertyPolicy: async function (newVal) {
        try {
          const dataPolicy = JSON.parse(newVal);

          if (dataPolicy.policytype && dataPolicy.policyclaimtype) {
            await this.getListPolicyClaimReason({
              invoke: 'System.execute',
              argc: '2',
              a0: 'PolicyClaimReason.getListing',
              a1: {
                employee: localStorage.getItem('empid'),
                employeedpdt: '',
                policytype: dataPolicy.policytype,
                policyclaimtype: dataPolicy.policyclaimtype,
                date: ''
              }
            });
            if (!this.isEditLog) {
              this.logTem.policyclaimtypeclaimreason = '';
              this.logTem.policyclaimtypeclaimreasonother = '';
            }
          }
        } catch (error) {}
      },
      propertyLogTem: async function () {
        this.checkHollow('admissiondate');
        this.checkHollow('dateofillness');
        this.checkHollow('policytype');
        this.checkHollow('policyclaimtype');
        this.checkHollow('policyclaimtypeclaimreason');
        this.checkHollow('policyclaimtypeclaimreasonother');
        this.checkHollow('hospital');
        this.checkHollow('hospitalother');
        this.checkHollow('wardtype');
        this.checkHollow('admissiontype');
      },
      listPolicyClaimReason: function (newValue) {
        this.listPolicyclaimtypeclaimreason = newValue;
      }
    }
  };
</script>

<style scoped>
  @import '@/assets/css/inputCustom/inputCustom.css';
  @import '@/assets/css/log/stepOneLog.css';
  @import '@/assets/css/log/logDetail.css';

  .styleAutoCompleteLog {
    border: none;
    height: 40px !important;
  }

  .styleAutoCompleteLog input {
    border: none;
    border-bottom: 1px solid rgba(0, 0, 0, 0.42) !important;
    height: 40px !important;
    border-radius: 0;
  }

  .input__disabled .vue-simple-suggest.designed.styleAutoCompleteLog .input-wrapper .input_custom {
    background: #eeeeee !important;
  }

  .stylesInputLog {
    background: #fafafa;
    border: none;
    height: 40px !important;
  }

  .stylesInputLog input {
    border: none !important;
    border-bottom: 1px solid rgba(0, 0, 0, 0.42) !important;
    background: unset !important;
    height: 40px !important;
    border-radius: 0;
    width: 100%;
  }
</style>
