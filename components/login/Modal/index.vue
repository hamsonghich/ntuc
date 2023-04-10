<template>
  <div>
    <b-modal
      id="modal__loading"
      v-model="_modalShowBenefit"
      centered
      size="xl"
      hide-header
      hide-footer
      content-class="bg-transparent border-0"
      @hide="_modalShow = true"
    >
      <div class="d-flex flex-column justify-content-start align-items-center">
        <img class="loading-rotate" src="@/assets/logo/loading-benefit.svg" alt="" />
        <div class="text-NTUC-3 text-32 font-500">{{ $t('employee_verification.modal_login_content') }}</div>
        <div class="text-NTUC-3 text-20 font-300">
          {{ $t('employee_verification.modal_login_text') }}
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
};
</script>
<style scoped>
@import '@/assets/css/first-time-login/benefit/familyForm.css';
div:has(#modal__loading.modal) >>> .modal-backdrop {
  opacity: 0.86;
}
</style>
