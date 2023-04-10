<template>
  <div class="benefit-card bg-white w-100 d-flex flex-column">
    <div class="d-flex align-items-start justify-content-between mb--20">
      <div class="d-flex align-items-center">
        <div class="text-20 line-height-12 font-700 benefit-card-label">
          {{ benefit['Benefit Type'] }}
        </div>
      </div>
      <div class="d-flex ml--5">
        <div
          v-if="benefit['Flex$ Pending']"
          class="mr--10 d-flex flex-column text-blue-grey text-12 text-right"
        >
          <div class=" text-20 line-height-12 font-700 text-break price-flex">
            ${{ benefit['Flex$ Pending'] }}
          </div>
          Pending
        </div>
        <div
          v-if="benefit['Flex$ Utilised']"
          class="text-NTUC-13 text-right d-flex flex-column text-12">
          <div class="text-20 line-height-12 font-700 text-break price-flex">
            ${{ benefit['Flex$ Utilised'] }}
          </div>
          Utilized
        </div>
      </div>

    </div>
    <div>
      <b-row>
        <b-col cols="12" lg="6" class="mt-2 d-inline-block align-self-end">
          <label for="Benefit_Plan" class="text-12 text-gray--700 font-500">{{
            $t('benefit.Benefit_Plan')
          }}</label>
          <b-form-group class="m-0" :id="'Benefit_Plan' + key">
            <b-form-input
              class="text-14 text-NTUC-3"
              id="Benefit_Plan"
              :value="benefit['Plan Selected'] || 'N.A'"
              :disabled="true"
              :placeholder="''"
            />
          </b-form-group>
          <b-tooltip
            v-if="benefit['Plan Selected']"
            :target="'Benefit_Plan' + key"
            offset="50"
            triggers="hover"
          >
            {{ benefit['Plan Selected'] }}
          </b-tooltip>
        </b-col>
        <b-col cols="12" lg="6" class="mt-2 d-inline-block align-self-end">
          <label for="Coverage" class="text-12 text-gray--700">{{ $t('benefit.Coverage') }}</label>
          <b-form-group class="m-0" :id="'Benefit_Coverage' + key">
            <b-form-input
              class="text-14 text-NTUC-3"
              id="Coverage"
              :value="benefit.Coverage || 'N.A'"
              :disabled="true"
              :placeholder="''"
            />
          </b-form-group>
          <b-tooltip
            v-if="benefit.Coverage"
            :target="'Benefit_Coverage' + key"
            offset="50"
            triggers="hover"
          >
            {{ benefit.Coverage }}
          </b-tooltip>
        </b-col>
        <b-col cols="12" lg="6" class="mt-2 d-inline-block align-self-end">
          <label for="Coverage" class="text-12 text-gray--700">{{
            $t('benefit.coverPendingMedicalUnderwriting')
          }}</label>
          <b-form-group class="m-0" :id="'Benefit_CoverPending' + key">
            <b-form-input
              class="text-14 text-NTUC-1"
              id="Cover Pending Medical Underwriting"
              :value="benefit['Cover Pending MU'] || 'N.A'"
              :disabled="true"
              :placeholder="''"
            />
          </b-form-group>
          <b-tooltip
            v-if="benefit['Cover Pending MU']"
            :target="'Benefit_CoverPending' + key"
            offset="50"
            triggers="hover"
          >
            {{ benefit['Cover Pending MU'] }}
          </b-tooltip>
        </b-col>
        <b-col cols="12" lg="6" class="mt-2 d-inline-block align-self-end">
          <label for="Coverage" class="text-12 text-gray--700">{{
            $t('benefit.presentCover')
          }}</label>
          <b-form-group class="m-0" :id="'Benefit_PresentCover' + key">
            <b-form-input
              class="text-14 text-NTUC-1"
              id="Pending Coverage"
              :value="benefit['Present Cover'] || 'N.A'"
              :disabled="true"
              :placeholder="''"
            />
          </b-form-group>
          <b-tooltip
            v-if="benefit['Present Cover']"
            :target="'Benefit_PresentCover' + key"
            offset="50"
            triggers="hover"
          >
            {{ benefit['Present Cover'] }}
          </b-tooltip>
        </b-col>
      </b-row>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    benefit: {
      type: Object,
      default: {
        'Benefit Type': '',
        'Flex$ Utilised': '',
        'Plan Selected': '',
        Coverage: '',
        'Cover Pending MU': '',
        'Present Cover': ''
      }
    }
  },
  data: () => ({}),
  computed: {
    key() {
      return this.$vnode.key;
    }
  },
  methods: {}
};
</script>
<style scoped>
@import '@/assets/css/first-time-login/benefit/healthDeclaration.css';
.bnb {
  left: -20px !important;
}
.bnb :deep(.arrow) {
  display: none;
}
.tooltip :deep(.arrow) {
  display: none;
}
</style>
