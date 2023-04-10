<template>
  <div class="stepper d-flex flex-column" v-if="createClaimStepInfor.claimgroup == 2 || createClaimStepInfor.claimgroup == 1">
    <div>
      <div class="mb-4 claim_balance">{{ $t('claim.balance') }}</div>
      <div class="mb-2 claim_buget">{{_formatMoneyClaim(getBalance())}}</div>
      <div class="claim_wallet_name">{{getClaimGroup()}}</div>
    </div>

    <div class="sidebar-card-body" :key="reRenderSidebar">
      <div
        class="sidebar-card-border position-relative"
        v-for="(claim, index) in entitiesClaim"
        :key="index"
        @click="changeActiveClaim(index)"
      >
        <div :class="index == entityActiveClaim ? 'sidebar-card-item-active' : 'sidebar-card-item'">
          {{ formatClaimName(claim) }} {{ formatClaimIncurredamt(claim) }}
        </div>
        <b-icon-x
          class="position-absolute icon-remove"
          v-if="index == entityActiveClaim"
          font-scale="1.5"
          @click="_removeClaim(index)"
        />
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import { formatMoneyClaim, formatMoney } from '@/utils/functions/formatMoney';
export default {
  data() {
    return {
      reRenderSidebar: 0
    };
  },
  watch: {
    entitiesClaim: {
      handler: function () {
        this.reRenderSidebar += 1;
      },
      deep: true
    }
  },
  computed: {
    ...mapGetters('claim', [
      'entitiesClaim',
      'entityActiveClaim',
      'listEligibleClaimType',
      'listClaimGroup',
      'createClaimStepInfor'
    ])
  },
  methods: {
    ...mapActions('claim', [
      'setCreateClaimStep',
      'setCreateStepClaimInfor',
      'handleListCurrency',
      'handleListReferral',
      'handleListEligibleClaimType',
      'setEntitiesClaim',
      'setEntityActiveClaim'
    ]),
    formatClaimName(claim) {
      const found = this.listEligibleClaimType.find(
        element => element.claimtype == claim.claimtype
      );
      if (found) return found.claimtypename ?? 'New Claim';
      return 'New Claim';
    },

    formatClaimIncurredamt(claim) {
      if (claim.incurredamt) return '- $' + formatMoneyClaim(claim.incurredamt);
      return '';
    },

    changeActiveClaim(index) {
      this.setEntityActiveClaim(index);
    },

    _removeClaim(index) {
      if (this.entitiesClaim.length > 1) {
        const entitiesClaim = [...this.entitiesClaim];
        entitiesClaim.splice(index, 1);
        this.setEntitiesClaim(entitiesClaim);
        this.setEntityActiveClaim(0);
      }
    },

    _formatMoneyClaim(n) {
      return formatMoney(n, '$');
    },

    getBalance() {
      if (!this.entitiesClaim || !this.listEligibleClaimType || !this.entitiesClaim[this.entityActiveClaim]) return 0;
      const activeClaimType = this.listEligibleClaimType.find(
        e => e.claimtype == this.entitiesClaim[this.entityActiveClaim].claimtype
      );
      if (activeClaimType) return activeClaimType.balance;
      return 0;
    },

    getClaimGroup() {
      const activeClaimGroup = this.listClaimGroup.find(
        e => e.id == this.createClaimStepInfor.claimgroup
      );
      if (activeClaimGroup) return activeClaimGroup.name;
      return '';
    }
  }
};
</script>

<style scoped>
@import '@/assets/css/claim/stepVertical.css';
@import '@/assets/css/claim/create/sidebarMoreClaim.css';
</style>
