<template>
  <div>
    <b-modal
      :id="idDialog"
      centered
      ref="modal"
      size="xl"
      hide-header
      hide-footer
      content-class="bg-transparent border-0"
      :no-close-on-backdrop="true"
    >
      <div class="d-flex flex-column justify-content-start align-items-center">
        <img alt="loading-benefit" class="loading-rotate" src="@/assets/logo/loading-benefit.svg" />
        <div class="benefit-title text-lg-25">{{ $t('benefit.completed_benefit_enrolment') }}</div>
        <div class="benefit-more text-16">
          {{ $t('benefit.view_the_benefits_you_personalized') }}
          <span class="benefit-link cursor_pointer" @click="_handleViewBenefit">{{
            $t('benefit.here')
          }}</span>
        </div>
        <div class="benefit-more text-16">
          {{ $t('benefit.will_be_re_directed') }} {{ timerCount }} sec
        </div>
      </div>
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
    }
  },
  data: () => ({
    timerCount: 5
  }),
  mounted() {
    this.$root.$on('bv::modal::show', (bvEvent, modalId) => {
      if (modalId == this.idDialog) {
        this._handleTimeOut();
      }
    });
  },
  watch: {
    timerCount: {
      handler(value) {
        this._handleTimeOut();
      }
    }
  },
  methods: {
    _handleViewBenefit() {
      this.$bvModal.hide(this.idDialog);
      this.$router.push({ name: 'first-time-login-dashboard' });
    },
    _handleTimeOut() {
      if (this.timerCount > 0) {
        setTimeout(() => {
          this.timerCount--;
        }, 1000);
      } else {
        this.$bvModal.hide(this.idDialog);
        this.$router.push({ name: 'first-time-login-dashboard' });
      }
    }
  }
};
</script>

<style scoped>
@import '@/assets/css/first-time-login/benefit/familyForm.css';
</style>
