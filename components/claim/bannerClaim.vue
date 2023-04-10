<template>
  <div class="content__banner d-flex justify-content-between">
    <div class="d-flex wrapper_cart_banner justify-content-start">
      <div class="d-flex algin-items-center justify-content-center flex-column">
        <div class="text-NTUC-2 text-24 text-center">
          {{ approve.count }}
        </div>
        <div class="d-flex flex-column justify-content-center align-items-center">
          <div class="text__status__banner--green">Approved</div>
        </div>
      </div>
      <div class="d-flex algin-items-center justify-content-center flex-column">
        <div class="text-NTUC-2 text-24 text-center">
          {{ pendding.count }}
        </div>
        <div class="d-flex flex-column justify-content-center align-items-center">
          <div class="text__status__banner--orange">Pending</div>
        </div>
      </div>
      <div class="d-flex algin-items-center justify-content-center flex-column">
        <div class="text-NTUC-2 text-24 text-center">
          {{ reject.count }}
        </div>
        <div class="d-flex flex-column justify-content-center align-items-center">
          <div class="text__status__banner--red">Rejected</div>
        </div>
      </div>
    </div>
    <div class="mb-hide">
      <div>
        <img src="@/assets/images/Amp_logo.png"/>
        <img src="@/assets/images/Amplify.png"/>
      </div>
      <div>
        <img src="@/assets/images/Amp_logo.png"/>
        <img src="@/assets/images/Amplify.png"/>
      </div>
      <div>
        <img src="@/assets/images/Amp_logo.png"/>
        <img src="@/assets/images/Amplify.png"/>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import { formatMoneyClaim } from '../../utils/functions/formatMoney';

export default {
  components: {},
  data: () => ({
    approve: {
      count: 0,
      percent: 0
    },
    pendding: {
      count: 0,
      percent: 0
    },
    reject: {
      count: 0,
      percent: 0
    },
    incurredamt: 0,
    reimbursementamt: 0
  }),
  watch: {
    listStatus: function (newValue) {
      if (newValue[0]) {
        let panddingCount = 0;
        let approveCount = 0;
        let totalCount = 0;
        newValue.map(item => {
          if (item.name == 'Approved' || item.name == 'Paid') {
            approveCount = approveCount + item.count;
          } else if (item.name == 'Rejected') {
            this.reject.count = item.count;
          } else {
            panddingCount = panddingCount + item.count;
          }
          totalCount = totalCount + item.count;
        });

        this.pendding.count = panddingCount;
        this.approve.count = approveCount;
        this.approve.percent = (this.approve.count / totalCount) * 100;
        this.pendding.percent = (this.pendding.count / totalCount) * 100;
        this.reject.percent = (this.reject.count / totalCount) * 100;
      } else {
        this.pendding.count = 0;
        this.pendding.percent = 0;
        this.approve.count = 0;
        this.approve.percent = 0;
        this.reject.count = 0;
        this.reject.percent = 0;
      }
    },
    listClaimsAll: function (newValue) {
      let incurredamt = 0;
      let reimbursementamt = 0;
      newValue.map(item => {
        incurredamt = incurredamt + Number(item.incurredamtconverted || item.incurredamt);
        reimbursementamt = this.checkApprovedPaidClaims(item.status)
          ? reimbursementamt + Number(item.reimbursementamt)
          : reimbursementamt + 0;
      });
      this.incurredamt = incurredamt || 0;
      this.reimbursementamt = reimbursementamt || 0;
    }
  },
  computed: {
    ...mapGetters('claim', ['listStatus', 'listClaimsAll'])
  },
  methods: {
    _formatMoneyClaim(n) {
      return formatMoneyClaim(n);
    },
    checkApprovedPaidClaims(claimApprovedPaidStatus) {
      if (claimApprovedPaidStatus === 'Approved' || claimApprovedPaidStatus === 'Paid') {
        return true;
      }
    }
  }
};
</script>

<style scoped>
@import '@/assets/css/claim/bannerClaim.css';
</style>
