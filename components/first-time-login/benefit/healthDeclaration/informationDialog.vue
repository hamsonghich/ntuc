<template>
  <div>
    <b-modal
      :id="idDialog"
      ref="modal"
      :title="checkNextStep ? 'Error!' : 'Saved!'"
      header-class="information-dialog-header bg-NTUC-3 text-white"
      centered
      size="lg"
      ok-only
      ok-title="Ok"
      @ok="_handleOk"
    >
      <div v-if="!checkNextStep" class="text-gray--800 text-20 font__regular line-height-16">
        {{ $t('benefit.title-skip') }}
      </div>
      <div
        v-else
        class="text-gray--800 text-20 font__regular line-height-16 text-center"
        v-html="$t('benefit.HDF_Alert')"
      ></div>
    </b-modal>
  </div>
</template>
<script>
export default {
  props: {
    idDialog: {
      type: String,
      required: true,
      default: ''
    },
    checkNextStep: {
      type: Boolean
    }
  },
  data: () => ({}),
  methods: {
    _handleOk() {
      this.$bvModal.hide(this.idDialog);
      this.$router.push({ name: 'first-time-login-dashboard' });
    }
  }
};
</script>
<style scoped>
@import '@/assets/css/first-time-login/benefit/familyForm.css';
</style>
