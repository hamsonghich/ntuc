<template>
  <div class="d-flex justify-content-between h-100">
    <div class="wrapper__content__quick__log">
      <div class="wrapper__content">
        <div class="title__quick__log">Ah...</div>
        <div class="question__quick__log">We noticed that you have an Insurance Inpatient Claim recently. Would you like to check if its related?</div>
        <div class="wrapper_checkbox_log__supp wrapper_checkbox_quick_log">
          <div class="d-flex flex-column">
            <div class="mr-4">
              <input
                :checked="check"
                class="checkbox_log"
                type="checkbox"
                @change="selectChecBox('yes')"
              />
              <label for="email" class="label_checkbox_log">Yes</label>
            </div>
            <div>
              <input
                :checked="!check"
                type="checkbox"
                class="checkbox_log"
                @change="selectChecBox('no')"
              />
              <label for="mobile_phone" class="label_checkbox_log">No</label>
            </div>
          </div>

        </div>
      </div>
      <div class="quick-log-btn">
        <button type="button" @click="_nextStep" class="btn btn__claim button__log _btn_next_claim">Next</button>
      </div>
    </div>
    <quoteClaim />
  </div>
</template>

<script>
  import quoteClaim from '../quoteClaim.vue';
  import { mapActions } from 'vuex';
  export default {
    components: {
      quoteClaim
    },
    data(){
        return{
            checkVal: 'yes',
            check: true
        }
    },
    methods: {
      ...mapActions('claim',['setCreateClaimStep','setOutpaitentClaimObject']),
      selectChecBox(value) {
        this.checkVal = value;
        this.check = !this.check;
      },
      _nextStep(){
        if(this.checkVal == 'yes'){
          return this.setCreateClaimStep('7.1.4')
        }
        return this.setCreateClaimStep(7.1)
      }
    }
  };
</script>

<style scoped>
  @import '@/assets/css/inputCustom/inputCustom.css';
  @import '@/assets/css/quick-log/stepContent.css';
  @import '@/assets/css/login/OTP/otp.css';
</style>
