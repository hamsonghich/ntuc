<template>
  <div class="h-100 w-100">
    <div class="bg-white d-flex flex-column wrapper__cart width_card justify-content-between">
        <b-row>
          <b-col cols="12" md="12">
            <div class="text-NTUC-22 text-14">
              {{ title }}
            </div>
          </b-col>
        </b-row>
        <b-row class="mt-2">
          <b-col cols="12" md="6">
            <div class="text-NTUC-24 text-21 fw-bolder font__bold">
              ${{balance ?? 0}}
            </div>
          </b-col>
          <b-col cols="12" md="6">
            <div class="text-right line-height-28 float-right">
              <div class="text-percent text-NTUC-27 text-14" v-if="is_flex_credit">
                {{ calculatePercent() }}%
              </div>
            </div>
          </b-col>
        </b-row>
        <b-row class="text-center mt-3">
          <b-col cols="12" md="6">
            <a class="text-12 text-NTUC-1" href="#/wallets">
              {{ $t('dashboard.wallet') }}
            </a>
          </b-col>
          <b-col cols="12" md="6">
            <a class="text-12 text-NTUC-22" href="#/claim">
              {{ $t('dashboard.claims') }}
            </a>
          </b-col>
        </b-row>
    </div>
  </div>
</template>

<script>

export default {
  props: ['title', 'balance', 'is_flex_credit', 'entitlement'],
  methods: {
    calculatePercent() {
      if (!(this.entitlement && this.balance)) {
        return 0;
      }
      return Math.abs(((this.entitlement - this.balance) / this.entitlement)) * 100;
    }
  }
};
</script>

<style scoped>
@import '@/assets/css/dashboard/cardCredit.css';

.arrow-right-short {
  padding: 22px 0;
}

.arrow-up-short {
  padding: 22px 24px;
}
</style>
