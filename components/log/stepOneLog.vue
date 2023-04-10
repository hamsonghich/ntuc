<template>
  <div class="d-flex justify-content-between w-100">
    <step-loading-page :show="showLoading" />
    <div class="wrapper__content__log p--20">
      <div class="wrapper__content__log__two">
        <div class="session__input pb--25 mt-0">
          <div>
            <div class="text__title__log text-20 mb--24 font__medium">
              {{ $t('log.log_request') }}
            </div>
            <div class="d-flex justify-content-between align-items-center">
              <div
                :class="{
                  'position-relative': true,
                  'wrapper__input__log mb--25': true,
                  input__disabled: isIsCheckSubmit,
                  'w-100 mr--24 letter-spacing-0-5': true
                }"
              >
                <DatetimePicker
                  :label="
                    !isIsCheckSubmit || $route.name == 'log-supp-id'
                      ? $t('log.admission_date')
                      : $t('log.incurred_date')
                  "
                  v-model="logTem.admissiondate"
                  :disabled="isIsCheckSubmit"
                  :placeholder="'Admission Date'"
                  :style="''"
                  :options="optionsAdmissionDate"
                  :showStar="true"
                  :isFontBold="true"
                  :isRequiredDate="objError.admissiondate.status"
                  :isConfigDatepickerStylesDefault="true"
                  :isBgUnset="true"
                  :isText12="true"
                  :isWarning="true"
                />
                <b-form-invalid-feedback v-if="objError.admissiondate.status" class="d-block">
                  {{ objError.admissiondate.error }}
                </b-form-invalid-feedback>
              </div>
              <div
                :class="{
                  'position-relative': true,
                  'wrapper__input__log mb--25': true,
                  input__disabled: isIsCheckSubmit,
                  ' w-100 letter-spacing-0-5': true
                }"
              >
                <DatetimePicker
                  :label="$t('log.date_of_illness')"
                  v-model="logTem.dateofillness"
                  :disabled="isIsCheckSubmit"
                  :placeholder="'Date Of Illness'"
                  :style="''"
                  :options="optionsDateOfIllness"
                  :showStar="true"
                  :isFontBold="true"
                  :isRequiredDate="objError.dateofillness.status"
                  :isConfigDatepickerStylesDefault="true"
                  :isBgUnset="true"
                  :isText12="true"
                  :isWarning="true"
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
                  input__disabled: true
                }"
              >
                <div
                  class="position-relative wrapper__input__log mb--25 w--100--percent disable-icon-x"
                >
                  <Autocomplete
                    :placeholder="$t('please_select')"
                    :value="logTem.employee"
                    :displayAttribute="'name'"
                    :valueAttribute="'id'"
                    :optionDropdowns="listEmployee"
                    :filter="true"
                    :isDisabled="false"
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
                  :optionDropdowns="listClaimantsLog"
                  :filter="true"
                  :isDisabled="false"
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
                  :isDisabled="isIsCheckSubmit"
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
                  :isDisabled="isIsCheckSubmit"
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
                  :isDisabled="isIsCheckSubmit"
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
                  :isDisabled="isIsCheckSubmit"
                  :isHeight50="true"
                  :isRequired="objError.hospital.status"
                  @changeValue="value => (this.logTem.hospital = value)"
                  :isStyleAutoCompleteLog="true"
                />
                <b-form-invalid-feedback v-if="objError.hospital.status" class="d-block">
                  {{ objError.hospital.error }}
                </b-form-invalid-feedback>
              </div>
            </div>
          </div>
          <div class="d-flex">
            <div v-if="logTem.policyclaimtypeclaimreason === 'null'" class="mr--24 w-100">
              <div class="d-flex">
                <div class="mr--24 w-100 letter-spacing-0-5">
                  <div class="label__log font__regular mb-8 text-12">
                    {{ $t('log.diagnosis_other') }} <span class="text-danger">(*)</span>
                  </div>
                  <div
                    :class="{
                      'position-relative': true,
                      'wrapper__input__log mb--25': true,
                      input__disabled: isIsCheckSubmit,
                      input__error: objError.policyclaimtypeclaimreasonother.status
                    }"
                  >
                    <div class="position-relative wrapper__input__log mb--25 w--100--percent">
                      <input
                        class="input_custom w-100 diagnois-other-input"
                        v-model="logTem.policyclaimtypeclaimreasonother"
                        :placeholder="$t('log.diagnosis_other')"
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
                <div class="w-100 letter-spacing-0-5"></div>
              </div>
            </div>
            <div v-if="logTem.hospital === '21'" class="w-100">
              <div class="label__log font__regular mb-8 text-12">
                {{ $t('log.hospital_other') }}
              </div>
              <div
                :class="{
                  'position-relative': true,
                  'wrapper__input__log mb--25': true,
                  input__disabled: isIsCheckSubmit,
                  input__error: objError.hospitalother.status
                }"
              >
                <input
                  class="input__custom w-100"
                  v-model="logTem.hospitalother"
                  :placeholder="$t('log.hospital_other')"
                />
                <b-form-invalid-feedback v-if="objError.hospitalother.status" class="d-block">
                  {{ objError.hospitalother.error }}
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
                  :isHeight50="true"
                  :isRequired="objError.surgery.status"
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
                  <div class="label__log font__regular mb-8 text-12">{{ $t('log.currency') }}</div>
                  <div class="position-relative w--100 h--40 input-currency-wrapper">
                    <Autocomplete
                      :placeholder="''"
                      :value="logTem.currencysurgery"
                      :displayAttribute="'name'"
                      :valueAttribute="'id'"
                      :optionDropdowns="listCurrency"
                      :filter="true"
                      :isDisabled="isIsCheckSubmit && !isSupp"
                      :isCurrency="false"
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
                        input_custom: true,
                        'w--100--percent px--8 py--10 out-line-none': true
                      }"
                      :precision="{ min: 2, max: 2 }"
                      :placeholder="$t('log.enter_amount')"
                      locale="en-US"
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
          :disabled="isLoading"
          type="button"
          @click="_next"
          class="btn button-next-log font__regular d-flex justify-content-center align-items-center text-16 text--capitalize text-white"
        >
          {{ !isIsCheckSubmit ? $t('next') : $t('confirm') }}
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
</template>

<script>
  import { mapGetters, mapActions, mapMutations } from 'vuex';
  import { _handleMinMaxDay } from '~/utils/functions/formatTime';
  import stepLoadingPage from '@/components/stepLoadingPage/index.vue';
  import UploadImg from '~/components/UploadImg';
  import { postAxios } from '../../services/callApi';

  export default {
    components: {
      UploadImg,
      stepLoadingPage
    },
    props: ['isSupp'],
    data: () => ({
      showLoading: false,
      isLoading: false,
      isShowDropdown: false,
      valueDropdown: '',
      isCheckTerms: false,
      isModel: false,
      modal: '',
      declaration: '',
      optionDropdowns: [
        'Gleneagles Hospital',
        'Singapore General Hospital',
        'Changi General Hospital',
        'KK Women & Children Hospital'
      ],
      options: {
        format: 'DD MMM YYYY',
        useCurrent: false,
        ..._handleMinMaxDay()
      },
      isShowPre: false,
      logTem: {
        admissiontype: '',
        wardtype: '',
        admissiondate: '',
        issueddate: '',
        employee: '',
        updatectr: '',
        employeedpdt: '',
        policytype: '',
        policyclaimtype: null,
        policyclaimtypeclaimreason: '',
        policyclaimtypeclaimreasonother: '',
        hospital: '',
        hospitalother: null,
        surgery: '',
        currencysurgery: '',
        estimatedcostofsurgery: null,
        dateofillness: '',
        files: []
      },
      filesFinancialCounsellingForm: [],
      filesPreAuthCertificate: [],
      isIsCheckSubmit: false,
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
        employee: localStorage.getItem('empid'),
        employeeDpdt: null,
        admissionDateFrom: null,
        admissionDateTo: null
      },
      isCheckDatePast: false,
      listPolicyclaimtypeclaimreason: [],
      policyclaimtypeclaimreasonValue: null,
      objError: {
        check: false,
        isFormError: false,
        admissiondate: { error: 'Please enter admission date.', status: false },
        dateofillness: { error: 'Please enter date of illness.', status: false },
        employeedpdt: { error: 'Please select date of claimant name.', status: false },
        policytype: { error: 'Please select policy.', status: false },
        policyclaimtype: { error: 'Please select policy claim type.', status: false },
        policyclaimtypeclaimreason: { error: 'Please select diagnosis.', status: false },
        policyclaimtypeclaimreasonother: { error: 'Please select diagnosis other.', status: false },
        hospital: { error: 'Please select hospital.', status: false },
        hospitalother: { error: 'Please select hospital other.', status: false },
        wardtype: { error: 'Please select ward type.', status: false },
        admissiontype: { error: 'Please select admission type.', status: false },
        surgery: { error: 'Please select surgery.', status: false }
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
        'listClaimants',
        'isCreateLog',
        'listSurgery',
        'listEmployee',
        'listClaims',
        'listWardType',
        'listAdmissionType',
        'listClaimantsLog'
      ]),
      optionsAdmissionDate() {
        return {
          format: 'DD MMM YYYY',
          useCurrent: false,
          minDate: this.$dayjs().add(4, 'd').format('DD MMM YYYY')
        };
      },
      optionsDateOfIllness() {
        return {
          format: 'DD MMM YYYY',
          useCurrent: false,
          maxDate: this.$dayjs().add(0, 'd').format('DD MMM YYYY')
        };
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
      }
    },
    async fetch() {
      try {
        this.isSupp &&
          (await this.getLog({
            invoke: 'System.execute',
            argc: '2',
            a0: 'API.LOG.Load',
            a1: {
              id: this.$route.params.id
            }
          }));
        await this.getListClaimantLogLog({
          invoke: 'System.execute',
          argc: '2',
          a0: 'Employee.getClaimateList',
          a1: {
            Emp: localStorage.getItem('empid')
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
        await this.getListClaimantLog({
          invoke: 'System.execute',
          argc: '2',
          a0: 'LOG.getEligibleDependant',
          a1: {
            employee: localStorage.getItem('empid'),
            admissiondate: this._formatTimeCallApi(this.logTem.admissiondate),
            web: true
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
        if (this.listWardType.length == 1) {
          this.logTem.wardtype = this.listWardType[0].id;
        }
        await this.setListAdmissionType({
          invoke: 'System.execute',
          argc: '2',
          a0: 'API.List.Select',
          a1: {
            ListGroup: '26'
          }
        });
        if (this.listAdmissionType.length == 1) {
          this.logTem.admissiontype = this.listAdmissionType[0].id;
        }
        await this.getListSurgery({
          invoke: 'System.execute',
          argc: '2',
          a0: 'API.Autocomplete.Select',
          a1: {
            module: '14'
          }
        });
        if (this.listSurgery.length == 1) {
          this.logTem.surgery = this.listSurgery[0].id;
        }
        this.isIsCheckSubmit = this.isSupp || false;
        this.logTem = {
          ...this.logTem,
          ...this.log,
          employeedpdt: this.logTem.employeedpdt ? 'null' : this.logTem.employeedpdt,
          logparent: this.$route.params.id || '',
          admissiondate: this._formatTime(this.logTem.admissiondate),
          issueddate: this._formatTime(this.logTem.issueddate),
          employee: localStorage.getItem('empid')
        };
        const resData = await postAxios({
          invoke: 'System.execute',
          argc: '2',
          a0: 'API.LOG.getEligiblePolicyTypeSetting',
          a1: {
            employee: localStorage.getItem('empid'),
            employeedpdt: this.logTem.employeedpdt === 'null' ? null : this.logTem.employeedpdt,
            admission_date: this._formatTimeCallApi(this.logTem.admissiondate)
          }
        });
        const resPresub = JSON.parse(resData.data.data[0].value);
        if (resPresub.data.show_pre_auth_attachment['3'].is_show) {
          this.isShowPre = true;
        }
      } catch (error) {}

      this.logTem.admissiondate = '';
      this.logTem.dateofillness = '';
      this.logTem.employeedpdt = '';
      this.logTem.policytype = '';
      this.logTem.policyclaimtype = '';
      this.logTem.hospital = '';
      this.logTem.wardtype = '';
      this.logTem.admissiontype = '';
      this.logTem.surgery = '';
      this.logTem.currencysurgery =
        this.listCurrency.find(item => item.name.toUpperCase() === 'SGD') &&
        this.listCurrency.find(item => item.name === 'SGD').id;
      this.logTem.estimatedcostofsurgery = null;
    },
    mounted() {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    },
    methods: {
      ...mapActions('log', [
        'changeStep',
        'getListCurrency',
        'getListHospital',
        'getListPolicy',
        'getListPolicyClaimType',
        'getListPolicyClaimReason',
        'getLog',
        'getListClaimant',
        'getListClaimantLog',
        'getListClaimantLogLog',
        'createLog',
        'changeLog',
        'getListSurgery',
        'getListEmployee',
        'getListClaim',
        'setListAdmissionType',
        'setListWardType'
      ]),
      ...mapActions('upload', ['getNewUUID', 'uploadFile']),
      ...mapMutations('log', ['SET_IS_CREATE_LOG']),
      ...mapActions('alert', ['_changeAlertConfig']),
      validateForm() {
        if (this.objError.check) {
          this.objError.admissiondate.status = !this.logTem.admissiondate;
          if (this.logTem.admissiondate === 'Invalid Date') {
            this.objError.admissiondate.status = true;
          }
          this.objError.dateofillness.status = !this.logTem.dateofillness;
          this.objError.employeedpdt.status = !this.logTem.employeedpdt;
          this.objError.policytype.status = !this.logTem.policytype;
          this.objError.policyclaimtype.status = !this.logTem.policyclaimtype;
          this.objError.policyclaimtypeclaimreason.status = !this.logTem.policyclaimtypeclaimreason;
          this.objError.hospital.status = !this.logTem.hospital;
          this.objError.wardtype.status = !this.logTem.wardtype;
          this.objError.admissiontype.status = !this.logTem.admissiontype;
          this.objError.surgery.status = !this.logTem.surgery;
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
            this.objError.employeedpdt.status ||
            this.objError.policytype.status ||
            this.objError.policyclaimtype.status ||
            this.objError.policyclaimtypeclaimreason.status ||
            this.objError.policyclaimtypeclaimreasonother.status ||
            this.objError.hospital.status ||
            this.objError.hospitalother.status ||
            this.objError.wardtype.status ||
            this.objError.admissiontype.status ||
            this.objError.surgery.status;
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
      async _okeBtn() {
        this.showLoading = true;
        await this.sendData();
        this.isCheckTerms = false;
        this.isModel = false;
        setTimeout(() => {
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }, 500);
      },
      _cancelBtn() {
        this.isLoading = false;
        this.isModel = false;
      },
      _back() {
        this.$router.push('/log');
      },
      _formatTimeCallApi(time) {
        return this.$dayjs(time).format('YYYY-MM-DD');
      },
      async _next() {
        this.handleValidateForm();

        if (this.objError.isFormError) {
          window.scrollTo({ top: 0, behavior: 'smooth' });
          return;
        }

        const data = await postAxios({
          invoke: 'System.execute',
          argc: '2',
          a0: 'API.Employee.LogAgreement',
          a1: {
            log_id: '',
            product_type: this.logTem.policytype,
            employee: this.logTem.employee,
            employeedpdt: this.logTem.employeedpdt == 'null' ? '' : this.logTem.employeedpdt,
            admission_date: this._formatTimeCallApi(this.logTem.admissiondate)
          }
        });

        if (data.data.data[0].dt === 'default') {
          const response = JSON.parse(data.data.data[0].value);
          if (response.data.show_disclaimer) {
            const resGetDisclaimerStmt = await postAxios({
              invoke: 'System.execute',
              argc: '2',
              a0: 'API.getDisclaimerStmt',
              a1: {}
            });
            this.declaration = resGetDisclaimerStmt.data.data[0].rows[0][0];
            this.declaration = this.declaration.replaceAll('\\r\\n', '<br />');
            this.isModel = true;
            return;
          }
        }
        this.sendData();
      },
      async sendData() {
        try {
          this.isLoading = true;
          let newUUIDFile;
          let listFiles = [];
          for (let file of this.filesFinancialCounsellingForm) {
            const resNewUUID = await this.getNewUUID();
            newUUIDFile = `${resNewUUID}-0-${file.name}`;
            if (file.name) {
              const dataFile = new FormData();
              dataFile.append('file', file, `${newUUIDFile}`);
              await this.uploadFile(dataFile);
            }
            listFiles.push(newUUIDFile);
          }

          for (let file of this.filesPreAuthCertificate) {
            const resNewUUID = await this.getNewUUID();
            newUUIDFile = `${resNewUUID}-1-${file.name}`;
            if (file.name) {
              const dataFile = new FormData();
              dataFile.append('file', file, `${newUUIDFile}`);
              await this.uploadFile(dataFile);
              listFiles.push(newUUIDFile);
            }
          }

          delete this.logTem.referenceno;
          const resCreateLog = await this.createLog({
            invoke: 'System.execute',
            argc: '2',
            a0: 'API.Employee.LOG.Apply',
            a1: {
              param: {
                ...this.logTem,
                employeedpdt: this.logTem.employeedpdt == 'null' ? '' : this.logTem.employeedpdt,
                employee: localStorage.getItem('empid'),
                policyclaimtypeclaimreason:
                  this.logTem.policyclaimtypeclaimreason == 'null'
                    ? ''
                    : this.logTem.policyclaimtypeclaimreason,
                issueddate: this._formatTimeCallApi(new Date()),
                admissiondate: this._formatTimeCallApi(this.logTem.admissiondate),
                dateofillness: this.logTem.dateofillness
                  ? this._formatTimeCallApi(this.logTem.dateofillness)
                  : '',
                empemail: '1',
                empletter: '1',
                files: JSON.stringify(listFiles)
              }
            }
          });
          if (resCreateLog.dt) {
            this.showLoading = false;
          }
          this.changeStep(2);
          if (this.isCreateLog == 2) {
            this.changeLog({
              ...this.logTem,
              ...JSON.parse(resCreateLog.value).data
            });
            this.changeStep(2);
            this.isIsCheckSubmit = false;
          }
          this.isLoading = false;

          window.scrollTo({ top: 0, behavior: 'smooth' });
        } catch (error) {
          this.isLoading = false;
        }
      },
      _dropdownHandler() {
        this.isShowDropdown = !this.isShowDropdown;
      },
      _formatTime(time) {
        return this.$dayjs(time).format('DD MMM YYYY');
      },
      _handleUploadFinancialCounsellingFormSuccess(file) {
        this.filesFinancialCounsellingForm = [...this.filesFinancialCounsellingForm, file];
      },
      _removeFileFinancialCounsellingForm(index) {
        this.filesFinancialCounsellingForm.splice(index, 1);
      },
      _handleUploadPreAuthCertificateSuccess(file) {
        this.filesPreAuthCertificate = [...this.filesPreAuthCertificate, file];
      },
      _removeFilePreAuthCertificate(index) {
        this.filesPreAuthCertificate.splice(index, 1);
      }
    },
    watch: {
      'logTem.admissiondate': async function (newVal) {
        if (!newVal) return;
        try {
          if (newVal === 'Invalid Date') {
            this.logTem.admissiondate = '';
          }
          if (newVal) {
            await this.getListPolicy({
              invoke: 'System.execute',
              argc: '2',
              a0: 'LOG.getEligiblePolicyType',
              a1: {
                employee: localStorage.getItem('empid'),
                employeedpdt: null,
                web: true,
                admissiondate: this._formatTimeCallApi(newVal)
              }
            });
            const resData = await postAxios({
              invoke: 'System.execute',
              argc: '2',
              a0: 'API.LOG.getEligiblePolicyTypeSetting',
              a1: {
                employee: localStorage.getItem('empid'),
                employeedpdt: this.logTem.employeedpdt === 'null' ? null : this.logTem.employeedpdt,
                admission_date: this._formatTimeCallApi(newVal)
              }
            });
            const resPresub = JSON.parse(resData.data.data[0].value);
            if (resPresub.data.show_pre_auth_attachment['3'].is_show) {
              this.isShowPre = true;
            }
            if (this.getListPolicyClaimType.length == 1) {
              this.logTem.policyclaimtype = this.getListPolicyClaimType[0].id;
            } else {
              this.logTem.policyclaimtype = null;
            }
            this.logTem.policyclaimtypeclaimreason = '';
            this.logTem.policyclaimtypeclaimreasonother = '';
          }
        } catch (error) {}
      },
      listCurrency: function () {
        this.logTem.currencysurgery =
          this.listCurrency.find(item => item.name.toUpperCase() === 'SGD') &&
          this.listCurrency.find(item => item.name === 'SGD').id;
      },
      'logTem.policytype': async function (newVal) {
        try {
          if (newVal) {
            await this.getListPolicyClaimType({
              invoke: 'System.execute',
              argc: '2',
              a0: 'LOG.FilterPolicyClaimType',
              a1: {
                employee: localStorage.getItem('empid'),
                employeedpdt: this.logTem.employeedpdt === 'null' ? null : this.logTem.employeedpdt,
                policytype: newVal,
                web: true
              }
            });
            this.logTem.policyclaimtype = null;
          }
        } catch (error) {}
      },
      propertyPolicy: async function (newVal) {
        try {
          if (this.logTem.policytype && this.logTem.policyclaimtype) {
            await this.getListPolicyClaimReason({
              invoke: 'System.execute',
              argc: '2',
              a0: 'PolicyClaimReason.getListing',
              a1: {
                employee: localStorage.getItem('empid'),
                employeedpdt: this.logTem.employeedpdt === 'null' ? null : this.logTem.employeedpdt,
                policytype: this.logTem.policytype,
                policyclaimtype: this.logTem.policyclaimtype,
                date: this._formatTimeCallApi(this.logTem.admissiondate)
              }
            });
            this.logTem.policyclaimtypeclaimreason = '';
            this.logTem.policyclaimtypeclaimreasonother = '';
          }
        } catch (error) {}
      },
      propertyLogTem: async function () {
        this.checkHollow('admissiondate');
        this.checkHollow('dateofillness');
        this.checkHollow('employeedpdt');
        this.checkHollow('policytype');
        this.checkHollow('policyclaimtype');
        this.checkHollow('policyclaimtypeclaimreason');
        this.checkHollow('policyclaimtypeclaimreasonother');
        this.checkHollow('hospital');
        this.checkHollow('hospitalother');
        this.checkHollow('wardtype');
        this.checkHollow('admissiontype');
        this.checkHollow('surgery');
      },
      listPolicyClaimReason: function (newValue) {
        this.listPolicyclaimtypeclaimreason = newValue;
      }
    },
    destroyed() {
      this.SET_IS_CREATE_LOG(1);
    }
  };
</script>

<style scoped>
  @import '@/assets/css/inputCustom/inputCustom.css';
  @import '@/assets/css/log/stepOneLog.css';
</style>
<style>
  .styleAutoCompleteLog {
    border: none;
    height: 40px !important;
  }
  .styleAutoCompleteLog input {
    border: none;
    border-bottom: 1px solid rgba(0, 0, 0, 0.42);
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
  .disable-icon-x .b-icon.bi {
    display: none;
  }
</style>
