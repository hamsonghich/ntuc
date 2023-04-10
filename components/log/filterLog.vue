<template>
  <div v-if="isFilterClaim" class="cart__filter__log px--20 br--20 position-absolute">
    <div class="tittle__filter text-16 font__medium mb-0">{{ $t('claim.tittle') }}</div>
    <div class="d-flex wrapper__filter__log justify-content-between w-100">
      <div class="inner__filter__log w-100">
        <div
          class="d-flex align-items-center justify-content-between wrapper__input__filter__log mb-8"
        >
          <div class="label__filter__log font__regular text-16">{{ $t('claim.where') }}</div>
          <input class="input__custom input__custom__log text-14 br--4 font__regular" v-model="filters.wildcard" placeholder="Ref No" />
        </div>
        <div
          class="d-flex align-items-center justify-content-between wrapper__input__filter__log mb-8"
        >
          <div class="label__filter__log font__regular text-16">{{ $t('claim.and') }}</div>
          <div class="position-relative">
            <DatetimePicker
              :label="''"
              v-model="filters.admissionDateTo"
              :disabled="false"
              :placeholder="'Admission Date'"
              :style="''"
              :options="options"
              :isStyleLogFilter="true"
            />
          </div>
        </div>
        <div
          class="d-flex align-items-center justify-content-between wrapper__input__filter__log mb-8"
        >
          <div class="label__filter__log font__regular text-16">{{ $t('claim.and') }}</div>
          <div class="position-relative">
            <DatetimePicker
              :label="''"
              v-model="filters.issuedDateTo"
              :disabled="false"
              :placeholder="'Issued Date'"
              :style="''"
              :options="options"
              :isStyleLogFilter="true"
            />
          </div>
        </div>
        <div
          class="d-flex align-items-center justify-content-between wrapper__input__filter__log mb-8"
        >
          <div class="label__filter__log font__regular text-16">{{ $t('claim.and') }}</div>
          <div class="position-relative wrapper__select__custom__log">
            <Autocomplete
              :placeholder="$t('claim.Claimant')"
              :value="filters.employeeDpdt"
              :displayAttribute="'name'"
              :valueAttribute="'id'"
              :optionDropdowns="listClaimants"
              :filter="true"
              :isDisabled="false"
              @changeValue="value => (this.filters.employeeDpdt = value)"
              :isStyleLogFilter="true"
            />
          </div>
        </div>
        <div
          v-if="false"
          class="d-flex align-items-center justify-content-between wrapper__input__filter__log mb-8"
        >
          <div class="label__filter__log font__regular text-16">{{ $t('claim.and') }}</div>
          <div class="position-relative wrapper__select__custom__log">
            <Autocomplete
              :placeholder="$t('claim.Diagnosis')"
              :value="filters.diagnosis"
              :displayAttribute="'name'"
              :valueAttribute="'id'"
              :optionDropdowns="listPolicyClaimReason"
              :filter="true"
              :isDisabled="false"
              @changeValue="value => (this.filters.diagnosis = value)"
              :isStyleLogFilter="true"
            />
          </div>
        </div>
        <div
          class="d-flex align-items-center justify-content-between wrapper__input__filter__log mb-8"
        >
          <div class="label__filter__log font__regular text-16">{{ $t('claim.and') }}</div>
          <div class="position-relative wrapper__select__custom__log">
            <Autocomplete
              :placeholder="$t('claim.Hospital')"
              :value="filters.hospital"
              :displayAttribute="'name'"
              :valueAttribute="'id'"
              :optionDropdowns="listHospital"
              :filter="true"
              :isDisabled="false"
              @changeValue="value => (this.filters.hospital = value)"
              :isStyleLogFilter="true"
            />
          </div>
        </div>
        <div
          class="d-flex align-items-center justify-content-between wrapper__input__filter__log mb-8"
        >
          <div class="label__filter__log font__regular text-16">{{ $t('claim.and') }}</div>
          <div class="position-relative wrapper__select__custom__log">
            <Autocomplete
              :placeholder="$t('claim.Status')"
              :value="filters.state"
              :displayAttribute="'name'"
              :valueAttribute="'id'"
              :optionDropdowns="listStatus"
              :filter="true"
              :isDisabled="false"
              @changeValue="value => (this.filters.state = value)"
              :isStyleLogFilter="true"
            />
          </div>
        </div>

        <div @click="_searchClaim" class="btn-filter-search d-flex justify-content-end w-100">
          <button type="button" class="btn btn__log button__filter p-0">
            <img
              class="search__alt__light"
              src="@/assets/images/icon-search-popup.png"
              alt="Search_alt_light"
            />
          </button>
        </div>

      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';

export default {
  components: { },
  data: () => ({
    options: {
      format: 'DD MMM YYYY',
      useCurrent: false
    },
    filters: {
      wildcard: '',
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
    ...mapGetters('log', [
      'isFilterClaim',
      'listClaimants',
      'listStatus',
      'listHospital',
      'listPolicyClaimReason'
    ])
  },
  methods: {
    ...mapActions('log', [
      'getListClaim',
      'toggleIsFilterClaim',
      'getListClaimant',
      'getListStatus',
      'getListHospital',
      'getListPolicyClaimReason'
    ]),
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
              employeeDpdt: this.filters.employeeDpdt == 'null' ? null : this.filters.employeeDpdt,
              diagnosis: this.filters.diagnosis == 'null' ? null : this.filters.diagnosis,
              hospital: this.filters.hospital == 'null' ? null : this.filters.hospital,
              admissionDateFrom: this.filters.admissionDateTo
            }
          }
        });
        this.toggleIsFilterClaim(false);
      } catch (error) {}
    }
  },
  watch: {
    isFilterClaim: async function (newVal) {
      if (newVal) {
        try {
          await this.getListClaimant({
            invoke: 'System.execute',
            argc: '2',
            a0: 'Tools.GetEmployeeDpdt',
            a1: {
              employee: localStorage.getItem('empid')
            }
          });
          await this.getListStatus({
            invoke: 'System.execute',
            argc: '2',
            a0: 'API.Autocomplete.Select',
            a1: {
              module: 12
            }
          });
          await this.getListHospital({
            invoke: 'System.execute',
            argc: '2',
            a0: 'API.Autocomplete.Select',
            a1: {
              module: 13
            }
          });
          await this.getListPolicyClaimReason({
            invoke: 'System.execute',
            argc: '2',
            a0: 'API.LOG.getPolicyClaimReason',
            a1: {
              employee: localStorage.getItem('empid')
            }
          });
        } catch (error) {}
      }
    }
  },
};
</script>

<style scoped>
@import '@/assets/css/inputCustom/inputCustom.css';
@import '@/assets/css/log/filterLog.css';
</style>

