<template>
  <div class="container__claim claim__list">
    <alert-success :alert="alert.textAlert" :isShow="alert.isShow"
      :type="alert.typeAlert" @handleCloseAlert="handleCloseAlert" />
    <div class="cart__claim cart--claim">
      <div class="title__claim">{{$t('claim.my_claims')}}</div>
      <div class="subtitle__claim">Create or view all of your past and ongoing Claims</div>
      <div>
        <tab-claim />
        <banner-claim :key="tab"/>
        <control-claim />
        <table-claim />
        <div v-if="listClaims[0]" class="d-flex justify-content-end mb-20 mt-10">
          <paginate
            :page-count="paginateDefault.pageCount"
            :page-range="paginateDefault.pageRange"
            :click-handler="_handlePagination"
            :prev-text="paginateDefault.prevText"
            :next-text="paginateDefault.nextText"
            :container-class="paginateDefault.containerClass"
            :page-class="paginateDefault.pageClass"
          >
          </paginate>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import controlClaim from '~/components/claim/controlClaim.vue';
import tabClaim from '~/components/claim/tabClaim.vue';
import bannerClaim from '~/components/claim/bannerClaim.vue';
import tableClaim from '~/components/claim/tableClaim.vue';
import { PAGINATE_CLAIM } from '~/utils/constants/paginate.js';

export default {
  components: {
    controlClaim,
    tabClaim,
    bannerClaim,
    tableClaim
  },
  data: () => ({
    paginateDefault: PAGINATE_CLAIM,
    eclaimaccess: JSON.parse(localStorage.getItem('eclaimaccess'))
  }),
  computed: {
    ...mapGetters('claim', [
      'listClaims',
      'listClaimsAll',
      'alert', 'tab'
    ])
  },
  mounted() {
    this.handleCloseAlert()
    window.scrollTo({ top: 0, behavior: 'smooth' });
  },
  methods: {
    ...mapActions('claim', [
      'handleCurrentPage',
      'handleCloseAlert',
      'changeTab'
    ]),
    _handlePagination: function (_currentPage) {
      this.handleCurrentPage(_currentPage);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  },
  watch: {
    listClaimsAll: function (newValue) {
      this.paginateDefault.pageCount = Math.ceil(newValue.length / PAGINATE_CLAIM.pageRange);
    },
  },
  created(){
    if(!this.$route.query.tab){
      let checkBenefitaccess = this.eclaimaccess.benefitaccess ? this.eclaimaccess.benefitaccess.access : false
      let checkExpenseaccess = this.eclaimaccess.expenseaccess ? this.eclaimaccess.expenseaccess.access : false
      if(checkBenefitaccess) {
        this.changeTab(1)
      }
      else if(!checkBenefitaccess && checkExpenseaccess) {
        this.changeTab(2)
      }
      else {
        this.changeTab(3)
      }
    }
  },
}
</script>

<style scoped>
@import '@/assets/css/claim/paginate.css';
@import '@/assets/css/claim/claimList.css';

::v-deep .pagination {
  gap: 10px
}

::v-deep .pagination li{
  background: #FFFFFF;
  box-shadow: 0px 1px 1px rgba(0, 0, 0, 0.2), 0px 2px 2px rgba(0, 0, 0, 0.14), 0px 1px 5px rgba(0, 0, 0, 0.12);
  border-radius: 4px;
  color: rgba(0, 0, 0, 0.87);
}
::v-deep .pagination li.active{
  background: var(--dark-blue);
  border: 1px solid var(--dark-blue);
  border-left: 0.5px solid var(--dark-blue);
  border-right: 0.5px solid var(--dark-blue);
}

::v-deep .pagination li.active a{
  background: var(--dark-blue);
}
</style>
