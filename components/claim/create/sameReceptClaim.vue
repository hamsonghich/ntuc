<template>
  <div class="">
    <div class="wrapper__content__quick__log w-100 detail-claim-containter">
      <div class="wrapper__content">
        <div class="title__quick__log">
          {{ createStep == 7.2 ? 'Thank you. ' : $t('claim.next_one') }}
        </div>
        <div class="question__quick__log mb-4">{{ $t('claim.claim_notice_receipt') }}</div>
        <div class="wrapper_checkbox_log__supp wrapper_checkbox_quick_log mb-4 mt-4">
          <b-col>
            <b-row>
              <b-col>
                <b-form-group id="input-group-1" label="Employee Name" label-for="input-1">
                  <b-input
                    class="w-100 input-claim-cs"
                    :placeholder="'Employee Name'"
                    :value="infoClaimCreated.claim_data.employeename"
                    disabled
                  />
                </b-form-group>
              </b-col>
              <b-col>
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
            <b-row>
              <b-col>
                <b-form-group id="input-group-1" label="Incurred Date" label-for="input-1">
                  <div :class="{ 'position-relative': true, input__disabled: !getIsEdit }">
                    <date-picker
                      class="input__custom input__date w-100"
                      :value="new Date(infoClaimCreated.claim_data.incurreddate)"
                      placeholder="Select Date"
                      name="date"
                      :disabled="true"
                      :config="{ format: 'DD-MM-YYYY' }"
                    >
                    </date-picker>

                    <img
                      class="icon__date__picker"
                      src="@/assets/images/icon-date-picker.png"
                      alt="icon-date-picker"
                    />
                  </div>
                </b-form-group>
              </b-col>
              <b-col>
                <b-form-group id="input-group-1" label="Claim Type" label-for="input-1">
                  <b-input
                    class="w-100 input-claim-cs"
                    :placeholder="'Employee Name'"
                    :value="infoClaimCreated.claim_data.claimtypename"
                    disabled
                  />
                </b-form-group>
              </b-col>
            </b-row>
            <b-row>
              <b-col class="d-flex col-custome">
                <b-form-group
                  id="input-group-1"
                  label="Currency"
                  label-for="input-1"
                  class="currency-type"
                >
                  <b-input
                    class="w-100 input-claim-cs"
                    :placeholder="'Employee Name'"
                    :value="infoClaimCreated.claim_data.currencyname"
                    disabled
                  />
                </b-form-group>
                <b-form-group
                  id="input-group-1"
                  label="Incurred Amount"
                  label-for="input-1"
                  class="w-100"
                >
                  <currency-input
                    class="w-100"
                    :class="{ input__custom: true, disabled: true }"
                    :value="infoClaimCreated.claim_data.incurredamt"
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
              <b-col>
                <b-form-group id="input-group-1" label="Service Provider" label-for="input-1">
                  <b-input
                    class="w-100 input-claim-cs"
                    :placeholder="'Employee Name'"
                    :value="infoClaimCreated.claim_data.serviceprovidersname"
                    disabled
                  />
                </b-form-group>
              </b-col>
            </b-row>
            <b-row>
              <b-col>
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
            </b-row>
            <b-row>
              <b-col
                v-if="infoClaimCreated.claim_data.referrallettername"
                class="d-flex col-custome"
              >
                <b-form-group
                  id="input-group-1"
                  label="Referral Letter"
                  label-for="input-1"
                  class="w-100"
                >
                  <div class="d-flex flex-row align-items-start">
                    <b-input
                      class="w-100 input-claim-cs"
                      :placeholder="'Employee Name'"
                      :value="infoClaimCreated.claim_data.referrallettername"
                      disabled
                    />
                    <button class="referral-btn"><b-icon-box-arrow-in-up-right />Referral</button>
                  </div>
                </b-form-group>
              </b-col>
              <b-col>
                <b-form-group
                  id="input-group-1"
                  label="Diagnosis (Pls select from List)"
                  label-for="input-1"
                >
                  <b-input
                    class="w-100 input-claim-cs"
                    :placeholder="'Employee Name'"
                    :value="infoClaimCreated.claim_data.claimreasonname"
                    disabled
                  />
                </b-form-group>
              </b-col>
            </b-row>
            <b-row>
              <b-col>
                <b-form-group id="input-group-1" label="Remarks" label-for="input-1">
                  <b-textarea
                    :rows="3"
                    max-rows="6"
                    class="w-100 input-claim-cs"
                    placeholder="State any other information relating to your claim."
                    :value="infoClaimCreated.claim_data.employeeremark"
                    disabled
                  >
                  </b-textarea>
                </b-form-group>
              </b-col>
            </b-row>
          </b-col>
        </div>
        <div class="pb-4 text-footer">
          Upon submission of claim, I consent to our appointed administrator verifying my medical
          information from the doctor who has attended to me or my dependants concerning the claims
          submitted.
        </div>
      </div>

      <!-- Button Group -->
      <div class="quick-log-btn d-flex justify-content-between pt-4">
        <button type="button" @click="_backStep" class="btn btn__claim button__log btn_back">
          Back
        </button>
        <button type="button" @click="_nextStep" class="btn btn__claim button__log">Confirm</button>
      </div>
    </div>
  </div>
</template>

<script>
  import { mapGetters, mapActions } from 'vuex';
  import { postAxios } from '../../../services/callApi';

  export default {
    components: {},
    data: () => ({
      selected: 1,
      title1: 'Medical Certificate',
      title2: 'Invoice',

      logTem: {
        state: '',
        estimatedcostofsurgery: '',
        referenceno: '',
        files: [{}, {}]
      }
    }),
    methods: {
      ...mapActions('claim', ['setCreateClaimStep', '_setStepList', 'setIsBlance']),
      async _nextStep() {
        await postAxios(this.insuranceOutpatient);
        this.setCreateClaimStep(7.3);
      },
      _backStep() {
        this.setCreateClaimStep(1);
      }
    },
    computed: {
      ...mapGetters('claim', ['createStep', 'isBalance', 'infoClaimCreated', 'insuranceOutpatient'])
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
</style>
