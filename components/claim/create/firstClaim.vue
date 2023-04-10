<template>
  <div class="d-flex justify-content-between h-100">
    <div class="wrapper__content__quick__log">
      <div class="wrapper__content">
        <div class="title__quick__log text-NTUC-1">{{ $t('log.hi') }} {{ userName }},</div>
        <div class="question__quick__log text-NTUC-1">{{ $t('claim.second_content') }}</div>
        <div
          class="wrapper_checkbox_log__supp wrapper_checkbox_quick_log"
          style="margin-bottom: 66px"
        >
          <div class="d-flex flex-column font__light">
            <b-form-group>
              <b-form-radio
                size="lg"
                v-for="(item, index) in listClaimMate"
                v-if="item.name"
                :key="index"
                :value="item.id"
                class="mb-2 radio-custom"
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
            <DateTimePicker
              ref="datePickerRef"
              class="width--356"
              placeholder="Select date"
              v-model="form.incurreddate"
              name="date"
              :options="options"
            >
            </DateTimePicker>
          </div>
        </div>
      </div>
      <div class="quick-log-btn mt--50">
        <button type="button" @click="_nextStep" class="btn btn__claim button__log _btn_next_claim bg-primary m-0">
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
    userName: localStorage.getItem('empName'),
    options: {
      format: 'DD-MM-YYYY',
      maxDate: new Date()
    },
    form: {
      claimantName: 'null',
      incurreddate: null
    }
  }),
  computed: {
    ...mapGetters('claim', ['createStep', 'createClaimStepInfor', 'listClaimMate'])
  },
  created() {
    this.setCreateClaimStep(1);
    this._changeAlertConfig({
      isShow: false,
      typeAlert: 'success',
      textAlert: ''
    });
    this._initClaimInfo();
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
    ...mapActions('claim', [
      'setCreateClaimStep',
      'setCreateStepClaimInfor',
      'setListClaimMate',
      '_setStepList',
      'setEntityActiveClaim',
      'setEntitiesClaim'
    ]),
    ...mapActions('alert', ['_changeAlertConfig']),
    _iconDatePickerClick() {
      this.$refs.datePickerRef.dp.toggle();
    },
    _nextStep() {
      if (!this.form.incurreddate || !this.form.claimantName) {
        this._changeAlertConfig({
          isShow: true,
          typeAlert: 'warning',
          textAlert: this.$t('claim.event_treatment')
        });
      } else {
        const formatDate = this.form.incurreddate.split('-').reverse().join('-');
        const EMPID = localStorage.getItem('empid');
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
    _initClaimInfo() {
      this.setCreateStepClaimInfor({});
      this._setStepList(1);
      this.setEntitiesClaim([]);
      this.setEntityActiveClaim(0);
    }
  }
};
</script>

<style scoped>
@import '@/assets/css/inputCustom/inputCustom.css';
@import '@/assets/css/claim/create/firstClaim.css';
@import '@/assets/css/quick-log/stepContent.css';

.checkbox-claim >>> .custom-checkbox {
  padding: 0;
}

.checkbox-claim >>> .custom-control-label {
  font-family: Ubuntu-Light, Tahoma, sans-serif;
  font-style: normal;
  font-weight: 300;
  font-size: 20px;
  line-height: 150%;
  color: var(--NTUC-8);
}
.check_box_claim {
  margin-left: 6px;
}

::v-deep .custom-radio {
  color: #212529;
}
::v-deep .custom-control-label,
.custom-control-input[disabled] ~ .custom-control-label,
.custom-control-input:disabled ~ .custom-control-label {
  color: #212529;
}
</style>
