<template>
  <div class="control__claim d-flex align-items-center justify-content-between">
    <div class="d-flex align-items-center wrapper_control mt-2">
      <div class="position-relative mb-hide filter_claim">
        <div class="text__filter__claim d-flex align-items-center" @click="_handleToggleFilterClaim()">Filters <b-icon-chevron-down class="ml-2" font-scale="0.5"/></div>
        <filter-claim />
      </div>
      <div class="position-relative input__search__claim">
        <input type="text" v-model="filters.wildcard" :placeholder="$t('claim.search')" />
      </div>
      <div class="icon-search-wrapper">
        <img
          @click="_searchClaim"
          class="search__alt__light__claim"
          src="@/assets/images/magnifying_glass.png"
          alt="search alt light"
        />
      </div>
    </div>
    <div class="d-flex justify-content-between align-items-center mt-2">
      <div class="position-relative mb-show filter_claim">
        <div class="text__filter__claim d-flex align-items-center" @click="_handleToggleFilterClaim()">Filters <b-icon-chevron-down class="ml-2" font-scale="0.5"/></div>
        <filter-claim />
      </div>
      <button
        type="button"
        @click="_redirectCreateLog"
        class="btn btn__claim"
      >
        <div class="btn__text__claim">I would like to create a new Claim</div>
      </button>
    </div>
  </div>
</template>

<script scoped>
import { mapGetters, mapActions } from 'vuex';
import filterClaim from '~/components/claim/filterClaim.vue';

export default {
  components: {
    filterClaim
  },
  data: () => ({
    filters: {
      wildcard: '',
      claimant: '',
      claimType: '',
      diagnosis: '',
      hospital: '',
      referenceNo: '',
      state: '',
      role: '', // role login
      issuedDateFrom: null,
      issuedDateTo: null,
      employee: Number(localStorage.getItem('empid')), // employee login
      empId: Number(localStorage.getItem('empid')),
      employeeDpdt: null,
      admissionDateFrom: null,
      admissionDateTo: null,
      withattachment: 'false',
      createDateFrom: '',
      createDateTo: '',
      paidDateFrom: '',
      paidDateTo: '',
      computed_status: '',
      incurredamt: "{ 'min': 0, 'max': 2000000000 }",
      hrflag: false
    }
  }),
  computed: {
    ...mapGetters('log', ['isFilterClaim']),
    ...mapGetters('claim', ['tab'])
  },
  watch: {
    'filters.wildcard': function () {
      this._searchClaim();
    }
  },
  methods: {
    ...mapActions('log', ['toggleIsFilterClaim']),
    ...mapActions('claim', ['getListClaim', 'handleListFileInpatient']),
    _handleToggleFilterClaim: function () {
      this.toggleIsFilterClaim(!this.isFilterClaim);
    },
    _redirectCreateLog: function () {
      this.handleListFileInpatient({});
      this.$router.push('/claim/create');
    },
    async _searchClaim() {
      try {
        switch (this.tab) {
          case 1: {
            await this.getListClaim({
              invoke: 'System.execute',
              argc: '2',
              a0: 'API.ClaimApplied.GetListing',
              a1: {
                ...this.filters,
                claimgroup: '1',
                employeeDpdt:
                  this.filters.employeeDpdt == 'null' ? null : this.filters.employeeDpdt,
                withattachment: this.filters.withattachment == 'true' ? '1' : ''
              }
            });
            break;
          }
          case 2: {
            await this.getListClaim({
              invoke: 'System.execute',
              argc: '2',
              a0: 'API.ClaimApplied.GetListing',
              a1: {
                ...this.filters,
                claimgroup: '2',
                employeeDpdt:
                  this.filters.employeeDpdt == 'null' ? null : this.filters.employeeDpdt,
                withattachment: this.filters.withattachment == 'true' ? '1' : ''
              }
            });
            break;
          }
          case 3: {
            await this.getListClaim({
              invoke: 'System.execute',
              argc: '2',
              a0: 'API.PolicyClaimApplied.getListing',
              a1: {
                filters: {
                  ...this.filters,
                  employeeDpdt:
                    this.filters.employeeDpdt == 'null' ? null : this.filters.employeeDpdt,
                  withattachment: this.filters.withattachment == 'true' ? '1' : ''
                }
              }
            });
            break;
          }
        }
        this.toggleIsFilterClaim(false);
      } catch (error) {
        console.log('_searchClaim ' + error);
      }
    }
  },
  created() {
    this.toggleIsFilterClaim(false);
  }
};
</script>

<style>
@import '@/assets/css/claim/controlClaim.css';
</style>
