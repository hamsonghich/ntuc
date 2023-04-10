<template>
  <div>
    <b-modal
      id='modal__benefit'
      v-model="_modalShowBenefit"
      centered
      size="xl"
      hide-header
      hide-footer
      content-class="bg-transparent border-0"
      @hide="_modalShow = true"
    >
      <div class="d-flex flex-column justify-content-start align-items-center">
        <img class="loading-rotate" src="@/assets/logo/loading-benefit.svg" alt="loading"/>
        <div class="completed-benefit-text text-32">{{ $t('employee_verification.modal_benefit_content') }}</div>
        <div class="benefit-more text-20">
          {{ $t('employee_verification.modal_benefit_text') }}
          <span class="benefit-link cursor_pointer" @click="_handleViewBenefit">{{
            $t('benefit.here')
          }}</span>
        </div>
      </div>
    </b-modal>
  </div>
</template>
<script>
export default {
  props: ['modalShowBenefit'],
  computed: {
    _modalShowBenefit: {
      get: function () {
        return this.modalShowBenefit;
      },
      set: function (value) {
        this.$emit('handleModalShow', value);
      }
    }
  },
  mounted(){
    setTimeout(()=>{
      this._handleViewBenefit()
    },3000)
  },
  methods: {
    _handleViewBenefit(){
      this._modalShowBenefit = false
      this.$router.push({name:"first-time-login-benefit"})
    }
  }
};
</script>

<style scoped>
@import '@/assets/css/first-time-login/benefit/familyForm.css';
div:has(#modal__benefit.modal) >>> .modal-backdrop{
  opacity: 0.86;
}
</style>
