<template>
  <div class="">
    <div class="wrapper__content__quick__log w-100 detail-claim-containter">
      <div class="wrapper__content">
        <div class="wrapper_checkbox_log__supp wrapper_checkbox_quick_log mb-4 mt-4">
          <b-row class="body__quick__log">
            <div class="question__quick__log mb-0 d-flex align-items-center w-100">
              <div class="question__title">Claimant Details</div>
              <button class="btn__edit border-0 d-flex justify-content-center align-items-center">
                <b-icon icon="pencil-fill" />
              </button>
            </div>
            <b-col cols="12" lg="6">
              <b-form-group id="input-group-1" label="Ref No" label-for="input-1">
                <b-input
                  class="w-100 input-claim-cs"
                  :placeholder="'Ref No'"
                  :value="myClaimInfo.referenceno"
                  disabled
                />
              </b-form-group>
            </b-col>
            <b-col class="d-flex w-100" cols="12" lg="6">
              <b-form-group
                class="mr-4 input__status"
                id="input-group-1"
                label="Status"
                label-for="input-1"
              >
                <b-input
                  class="w-100 input-claim-cs"
                  :placeholder="'Status'"
                  :value="myClaimInfo.state"
                  disabled
                />
              </b-form-group>
              <div class="d-flex align-items-center">
                <img src="@/assets/images/icon-question.png" width="36px" height="36px" alt="" />
              </div>
            </b-col>
            <b-col cols="12" lg="6">
              <b-form-group id="input-group-1" label="Employee Name" label-for="input-1">
                <b-input
                  class="w-100 input-claim-cs"
                  :placeholder="'Employee Name'"
                  :value="myClaimInfo.employee"
                  disabled
                />
              </b-form-group>
            </b-col>
            <b-col cols="12" lg="6">
              <b-form-group id="input-group-1" label="Claimant Name" label-for="input-1">
                <Autocomplete
                  :placeholder="'Please select'"
                  :value="myClaimInfo.claimantid"
                  :displayAttribute="'name'"
                  :valueAttribute="'id'"
                  :optionDropdowns="listClaimsName"
                  :filter="true"
                  :isDisabled="true"
                  :isHeight50="true"
                />
              </b-form-group>
            </b-col>
            <b-col cols="12" lg="6">
              <b-form-group id="input-group-1" label="Incurred Date" label-for="input-1">
                <div :class="{ 'position-relative': true, input__disabled: !getIsEdit }">
                  <date-picker
                    class="input__custom input__date w-100"
                    v-model="myClaimInfo.incurreddate"
                    placeholder="Select Date"
                    name="date"
                    :disabled="true"
                    :config="options"
                  />
                  <img
                    class="icon__date__picker"
                    src="@/assets/images/icon-date-picker.png"
                    alt="icon-date-picker"
                  />
                </div>
              </b-form-group>
            </b-col>
            <b-col cols="12" lg="6">
              <b-form-group id="input-group-1" label="Claim Type" label-for="input-1">
                <Autocomplete
                  :placeholder="'Please select'"
                  :value="myClaimInfo.claimtypeid"
                  :displayAttribute="'claimtypename'"
                  :valueAttribute="'claimtype'"
                  :optionDropdowns="listClaimType"
                  :filter="true"
                  :isDisabled="true"
                  :isHeight50="true"
                />
              </b-form-group>
            </b-col>
            <div class="line w-100" />
            <div class="w-100">Claimant Details</div>
            <b-col cols="12" lg="6" class="d-flex col-custome">
              <b-form-group id="input-group-1" label="Currency" label-for="input-1" class="">
                <Autocomplete
                  :placeholder="'Currency'"
                  :displayAttribute="'name'"
                  :valueAttribute="'id'"
                  :value="myClaimInfo.currencyid"
                  :optionDropdowns="[]"
                  :filter="true"
                  :isDisabled="true"
                  :isCurrency="true"
                  :isHeight50="true"
                />
              </b-form-group>
              <b-form-group id="input-group-1" label="Incurred Amount" label-for="input-1" class="">
                <currency-input
                  class="w-100"
                  v-model="myClaimInfo.incurredamt"
                  :class="{ input__custom: true, disabled: true }"
                  :disabled="true"
                  placeholder="Please indicate"
                  :distraction-free="false"
                  :currency="null"
                  :min="0"
                  :max="null"
                  :precision="{ min: 0, max: 2 }"
                  locale="en-US"
                />
              </b-form-group>
            </b-col>
            <b-col cols="12" lg="6">
              <b-form-group id="input-group-1" label="Clinic or Hospital" label-for="input-1">
                <Autocomplete
                  :placeholder="'Please select'"
                  :displayAttribute="'name'"
                  :valueAttribute="'id'"
                  :optionDropdowns="[]"
                  :filter="true"
                  :isDisabled="true"
                  :isHeight50="true"
                />
              </b-form-group>
            </b-col>
            <b-col cols="12">
              <div class="converted">
                Converted amount
                <b-icon-arrow-left-right class="converted-icon" />
                <span class="converted-unit">MYR 1,526.92</span>
              </div>

              <div class="d-flex flex-row">
                <div class="checkbox-label">Your claim category is liable for</div>
                <b-form-checkbox>CPF</b-form-checkbox>
                <b-form-checkbox>TAX</b-form-checkbox>
              </div>
            </b-col>
            <b-col cols="12">
              <b-form-group
                id="input-group-1"
                label="Clinic or Hospital (Other)"
                label-for="input-1"
              >
                <Autocomplete
                  :placeholder="'Please select'"
                  :displayAttribute="'name'"
                  :valueAttribute="'id'"
                  :optionDropdowns="[]"
                  :filter="true"
                  :isHeight50="true"
                  :isDisabled="true"
                />
              </b-form-group>
            </b-col>
            <b-col cols="12" lg="6" class="d-flex col-custome">
              <b-form-group
                id="input-group-1"
                label="Type of Screening"
                label-for="input-1"
                class="w-100"
              >
                <div class="d-flex flex-row align-items-start">
                  <Autocomplete
                    class="referral-input w-100"
                    :placeholder="'Please select'"
                    :displayAttribute="'name'"
                    :valueAttribute="'id'"
                    :optionDropdowns="[]"
                    :filter="true"
                    :isHeight50="true"
                    :isDisabled="true"
                  />
                  <button class="referral-btn"><b-icon-box-arrow-in-up-right />Referral</button>
                </div>
              </b-form-group>
            </b-col>
            <b-col cols="12" lg="6">
              <b-form-group
                id="input-group-1"
                label="Type of Screening (Other)"
                label-for="input-1"
              >
                <Autocomplete
                  :placeholder="'Please select'"
                  :displayAttribute="'name'"
                  :valueAttribute="'id'"
                  :optionDropdowns="[]"
                  :filter="true"
                  :isDisabled="true"
                  :isHeight50="true"
                />
              </b-form-group>
            </b-col>
            <b-col cols="12">
              <b-form-group id="input-group-1" label="Diagnosis (Other) " label-for="input-1">
                <Autocomplete
                  :placeholder="'Please select'"
                  :displayAttribute="'name'"
                  :valueAttribute="'id'"
                  :optionDropdowns="[]"
                  :filter="true"
                  :isHeight50="true"
                  :isDisabled="true"
                />
              </b-form-group>
            </b-col>
            <b-col cols="12">
              <b-form-group id="input-group-1" label="Remarks" label-for="input-1">
                <b-textarea
                  :rows="3"
                  max-rows="6"
                  placeholder="State any other information relating to your claim."
                >
                </b-textarea>
              </b-form-group>
            </b-col>
            <div class="line w-100" />
            <div>
              <div>Attachments</div>
              <b-icon />
            </div>
          </b-row>
        </div>
      </div>

      <!-- Button Group -->
      <div class="quick-log-btn d-flex justify-content-end pt-4">
        <button type="button" class="btn btn__claim button__log">Save</button>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';

export default {
  props: ['myClaim'],
  data: () => ({
    selected: 1,
    options: {
      format: 'DD-MM-YYYY',
      useCurrent: false
    },
    myClaimInfo: {},
    logTem: {
      state: '',
      estimatedcostofsurgery: '',
      referenceno: '',
      files: [{}, {}]
    }
  }),
  computed: {
    ...mapGetters('claim', ['listClaimsName','listClaimType'])
  },
  created() {
    this.myClaimInfo = JSON.parse(JSON.stringify(this.myClaim));
    this.handleListClaimsName({
      invoke: 'System.execute',
      argc: '2',
      a0: 'Employee.getClaimateList',
      a1: {
        Emp: '111628'
      }
    });
    this.handleListClaimType({
      invoke: 'System.execute',
      argc: '2',
      a0: 'Claim.Apply.GetEligibleClaimType',
      a1: {
        employee: '111628',
        employeedpdt: '',
        incurreddate: this.$dayjs(this.myClaimInfo.incurreddate).format('YYYY-MM-DD'),
        accessfrom: 'web'
      }
    });
  },
  methods: {
    ...mapActions('claim', ['handleListClaimsName', 'handleListClaimType'])
  },
  watch: {
    myClaim: function () {
      this.myClaimInfo = JSON.parse(JSON.stringify(this.myClaim));
      this.myClaimInfo.incurreddate = new Date(this.myClaimInfo.incurreddate);
    }
  }
};
</script>

<style scoped>
@import '@/assets/css/claim/create/sameRecept.css';
@import '@/assets/css/claim/edit/bodyClaim.css';
</style>
