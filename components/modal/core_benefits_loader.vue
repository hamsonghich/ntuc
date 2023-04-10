<template>
    <div>
      <b-modal
        id='modal__loading'
        v-model="modalShow"
        centered
        size="xl"
        hide-header
        hide-footer
        content-class="bg-transparent border-0"
        @hide="modalShow = true"
      >
        <div class="d-flex flex-column justify-content-start align-items-center">
          <img class="loading-rotate" src="@/assets/logo/loading-benefit.svg" alt="" />
          <div class="text-NTUC-3 text-32 font-500">{{ $t('One_sec_whilst_we_load_your_Core_Benefits') }}</div>
        </div>
      </b-modal>
    </div>
  </template>
  <script>
  export default {
    props: ['isLoading'],
    computed: {
      modalShow: {
        get: function () {
          return this.isLoading;
        },
        set: function (value) {
          this.$emit('_handleIsLoading', value);
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
  