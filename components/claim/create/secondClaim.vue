<template>
  <div class="d-flex justify-content-between h-100">
    <div class="wrapper__content__quick__log">
      <div class="wrapper__content">
        <div class="title__quick__log">{{ $t('log.thank_you') }}</div>
        <div class="question__quick__log">{{ $t('claim.second_content') }}</div>
        <div class="wrapper_checkbox_log__supp wrapper_checkbox_quick_log" style="margin-bottom: 66px">
          <div class="d-flex flex-column font__light">
            <b-form-group>
              <b-form-radio
                size="lg"
                v-for="(item, index) in listClaimMate"
                v-if="item.name"
                :key="(index)"
                :value="item.id"
                class="mb-2"
                v-model="form.claimantName"
              >
                {{ item.name }}
              </b-form-radio>
            </b-form-group>
          </div>
          <div class="first_claim_noti_content">
            <span class="first_claim_noti">{{ $t('claim.first_claim_noti') }}</span>
          </div>
          <div>
            <div class="question__log__one--one">
              {{ $t('claim.claim_question') }}
            </div>
            <div class="position-relative wrapper__input__log__one--one width--356" style="margin-bottom: 66px">
              <date-picker
                ref="datePickerRef"
                class="input__custom input__date width--356"
                placeholder="Select date"
                v-model="form.incurreddate"
                name="date"
                :config="options"
              >
              </date-picker>
              <img class="icon__date__picker" @click="_iconDatePickerClick" src="@/assets/images/calendar.png" alt="calendar" />
            </div>
          </div>
        </div>
      </div>
      <div class="quick-log-btn d-flex justify-content-between _claim_mobile_btn">
        <button type="button" @click="_backStep" class="btn btn__claim button__log btn_back _btn_next_claim">
          Back
        </button>
        <button
          type="button"
          @click="_nextStep"
          class="btn btn__claim button__log _btn_next_claim bg-primary"
        >
          Next
        </button>
      </div>
    </div>
    <quoteClaim />
  </div>
</template>

<script>
  import { mapGetters, mapActions } from 'vuex';
  import quoteClaim from '../quoteClaim.vue';
  export default {
    components: {
      quoteClaim
    },
    data: () => ({
      options: {
        format: 'DD-MM-YYYY',
        maxDate: new Date()
      },
      form: {
        claimantName: 'null',
        incurreddate: null
      },
    }),
    computed: {
      ...mapGetters('claim', ['createStep', 'createClaimStepInfor', 'listClaimMate'])
    },
    async fetch() {
      this._changeAlertConfig({
        isShow: false,
        typeAlert: 'success',
        textAlert: ''
      });
      await this.setListClaimMate({
        invoke: 'System.execute',
        argc: '2',
        a0: 'Employee.getClaimateList',
        a1: {
          Emp: localStorage.getItem('empid')
        }
      });
    },
    methods: {
      ...mapActions('claim', ['setCreateClaimStep', 'setCreateStepClaimInfor', 'setListClaimMate']),
      ...mapActions('alert', ['_changeAlertConfig']),
      _iconDatePickerClick() {
        this.$refs.datePickerRef.dp.toggle();
      },
      _nextStep() {
        if(!this.form.incurreddate || !this.form.claimantName){
          this._changeAlertConfig({
            isShow: true,
            typeAlert: 'warning',
            textAlert: this.$t('claim.event_treatment')
          });
        }else{
          const formatDate = this.form.incurreddate.split("-").reverse().join("-");
          const EMPID =localStorage.getItem('empid')
          this.setCreateStepClaimInfor({
            ...this.createClaimStepInfor,
            claimantName: this.form.claimantName === EMPID ? 'null' : this.form.claimantName,
            incurreddate: formatDate
          });
          this._changeAlertConfig({
            isShow: false,
            typeAlert: 'warning',
            textAlert: ''
          });
          this.setCreateClaimStep(4);
        }
      },
      _backStep() {
        this.setCreateClaimStep(1);
      },
    },
  };
</script>

<style scoped>
  @import '@/assets/css/inputCustom/inputCustom.css';
  @import '@/assets/css/claim/create/firstClaim.css';
  @import '@/assets/css/quick-log/stepContent.css';
  @import '@/assets/css/claim/stepOneLog.css';
</style>
