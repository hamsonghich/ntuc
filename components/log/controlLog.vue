<template>
  <div class="d-flex align-items-center justify-content-between">
    <div class="wrapper-search br--4 d-flex justify-content-start align-items-center">
      <button class="btn-filter py--6 px--8 h-100 bra-left-4 border-0 d-flex justify-content-between align-items-center" @click="_handleToggleFilterClaim()">
        <p class="text--16 font__regular font-400 mb-0">Filters</p>
        <img class="icon-down-ct" src="@/assets/images/icon-down.png" alt="" />
      </button>
      <FilterLog />
      <div class="wrapper__input--search--log position-relative w-100 h-100 border-0">
        <span class="input__search--claim-log">
          <input class="w-100 h-100 pl--10 pr--45 border-0 search__log"
            type="text" v-model="filters.wildcard" :placeholder="$t('log.search')" />
          <span></span>
        </span>
        <img
          @click="_searchClaim"
          class="search__alt__light--log position-absolute cursor_pointer"
          src="@/assets/images/icon-search-bar.png"
          alt="search alt light"
        />
      </div>
    </div>
    <button
      type="button"
      @click="_redirectCreateLog"
      class="btn-create-new-log text-14 font__regular border-0 text-white"
    >
      <div class="">
        <div class="">
          {{ $t('claim.log') }}
        </div>
      </div>
    </button>
  </div>
</template>

<script scoped>
  import { mapGetters, mapActions } from 'vuex';
  import FilterLog from '~/components/log/filterLog.vue';

  export default {
    components: {
      FilterLog
    },
    data: () => ({
      filters: {
        wildcard: '',
        claimant: '',
        diagnosis: '',
        hospital: '',
        referenceNo: '',
        state: '',
        role: '', // role login
        issuedDateFrom: null,
        issuedDateTo: null,
        employee: Number(localStorage.getItem('empid')), // employee login
        employeeDpdt: null,
        admissionDateFrom: null,
        admissionDateTo: null
      }
    }),
    computed: {
      ...mapGetters('log', ['isFilterClaim'])
    },
    created() {
      this.toggleIsFilterClaim(false);
    },
    methods: {
      ...mapActions('log', ['toggleIsFilterClaim', 'getListClaim']),
      _handleToggleFilterClaim: function () {
        this.toggleIsFilterClaim(!this.isFilterClaim);
      },
      _redirectCreateLog: function () {
        this.$router.push({ name: 'log-create' });
      },
      async _searchClaim() {
        try {
          await this.getListClaim({
            invoke: 'System.execute',
            argc: '2',
            a0: 'LOG.getListing',
            a1: {
              filters: {
                ...this.filters,
                issuedDateFrom: this.filters.issuedDateTo,
                admissionDateFrom: this.filters.admissionDateTo
              }
            }
          });
          this.toggleIsFilterClaim(false);
        } catch (error) {}
      }
    },
    watch: {
      'filters.wildcard': function () {
        this._searchClaim();
      }
    },
  };
</script>

<style scoped>
@import '@/assets/css/log/controlLog.css';
  .bra-left-4{
      border-radius: 4px 0px 0px 4px;
  }

</style>
