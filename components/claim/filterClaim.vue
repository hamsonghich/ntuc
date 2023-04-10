<template>
  <div v-if="isFilterClaim" class="cart__filter__claim pd--38">
    <div class="tittle__filter mb--27">{{$t('claim.tittle')}}</div>
    <div class="d-flex wrapper__filter__log">
      <div class="inner__filter__log">
        <div class="d-flex align-items-center justify-content-between wrapper__input__filter__claim">
          <div class="label__filter__claim">{{$t('claim.where')}}</div>
          <div class="position-relative">
            <date-picker v-model="dateAdm" type="date" range :placeholder="placeholderDate" value-type="DD MMM YYYY" format="DD MMM YYYY" class="input__custom input__date" ></date-picker>
            <img v-if="!dateAdm[0]" class="icon__date__picker hide__mobile" src="@/assets/images/calendar.png" alt="icon-date-picker" style="left: 110px" />
            <b-icon @click.stop="dateAdm = []" v-if="dateAdm == []" class="icon__close" icon="x-circle" />
            <img class="icon__date__picker" src="@/assets/images/calendar.png" alt="icon-date-picker" />
          </div>
        </div>
        <div class="d-flex align-items-center justify-content-between wrapper__input__filter__claim">
          <div class="label__filter__claim">{{$t('claim.and')}}</div>
          <input class="input__custom input__custom__mobile__filter" v-model="filters.referenceNo" placeholder="Ref No" />
        </div>
        <div class="d-flex align-items-center justify-content-between wrapper__input__filter__claim">
          <div class="label__filter__claim">{{$t('claim.and')}}</div>
          <div class="position-relative wrapper__select__custom">
            <Autocomplete
              v-if="tab == 3"
              :placeholder="$t('claim.claimant_type')"
              :value="filters.claimType"
              :displayAttribute="'name'"
              :valueAttribute="'id'"
              :optionDropdowns="listClaimsType"
              :filter="true"
              :isDisabled="false"
              @changeValue="(value) => this.filters.claimType = value"
            />
            <Autocomplete
              v-else
              :placeholder="$t('claim.claimant_type')"
              :value="filters.claimtype"
              :displayAttribute="'name'"
              :valueAttribute="'id'"
              :optionDropdowns="listClaimsType"
              :filter="true"
              :isDisabled="false"
              @changeValue="(value) => this.filters.claimtype = value"
            />
          </div>
        </div>
        <div class="d-flex align-items-center justify-content-between wrapper__input__filter__claim">
          <div class="label__filter__claim">{{$t('claim.and')}}</div>
          <div class="position-relative wrapper__select__custom">
            <Autocomplete
              :placeholder="$t('claim.Claimant')"
              :value="filters.employeeDpdt"
              :displayAttribute="'name'"
              :valueAttribute="'id'"
              :optionDropdowns="listClaimants"
              :filter="true"
              :isDisabled="false"
              @changeValue="(value) => this.filters.employeeDpdt = value"
            />
          </div>
        </div>
        <div class="d-flex align-items-center justify-content-between wrapper__input__filter__claim">
          <div class="label__filter__claim">{{$t('claim.and')}}</div>
          <input class="input__custom input__custom__mobile__filter" type="number" v-model="incurredamt" :placeholder="$t('claim.claimant_amount')" />
        </div>
        <div class="d-flex align-items-center justify-content-between wrapper__input__filter__claim mb--19">
          <div class="label__filter__claim">{{$t('claim.and')}}</div>
          <div class="position-relative wrapper__select__custom">
            <Autocomplete
              :placeholder="$t('claim.Status')"
              :value="filters.computed_status"
              :displayAttribute="'name'"
              :valueAttribute="'name'"
              :optionDropdowns="statusList"
              :filter="true"
              :isDisabled="false"
              @changeValue="(value) => this.filters.computed_status = value"
            />
          </div>
        </div>
        <div class="d-flex align-items-center justify-content-between wrapper__input__filter__claim">
          <div class="label__filter__claim">{{$t('claim.attachments')}}</div>
          <div class="position-relative wrapper__select__custom d-flex">
            <div class="mr--16 wrapper__checkbox">
              <input v-model="filters.withattachment" value="1" id="yes" class="checkbox_log input__filter__claim" type="radio" />
              <label for="yes" class="label_checkbox_log fz--16">{{$t('yes')}}</label>
            </div>
            <div class="mr--16 wrapper__checkbox">
              <input v-model="filters.withattachment" value="0" id="no" class="checkbox_log input__filter__claim" type="radio" />
              <label for="no" class="label_checkbox_log fz--16">{{$t('no')}}</label>
            </div>
            <div class="wrapper__checkbox">
              <input v-model="filters.withattachment" value="" id="both" class="checkbox_log input__filter__claim" type="radio" />
              <label for="both" class="label_checkbox_log fz--16">{{$t('both')}}</label>
            </div>
          </div>
        </div>
      </div>
      <div @click="_searchClaim" class="wrapper__button__filter mb-0">
        <button type="button" class="btn btn__claim button__filter">
          <img class="search__alt__light" src="@/assets/images/Search_alt_light.png" alt="Search_alt_light" >
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import DatePicker from 'vue2-datepicker';
import 'vue2-datepicker/index.css';

import 'bootstrap/dist/css/bootstrap.css';
import 'pc-bootstrap4-datetimepicker/build/css/bootstrap-datetimepicker.css';

export default {
  components: {
    DatePicker,
  },
  data: () => ({
    options: {
      format: 'DD MMM YYYY',
      useCurrent: false,
    },
    isCheckYesNo: false,
    incurredamt: '',
    dateAdm: [],
    placeholderDate: 'Start date              End date',
    filters: {
      wildcard: '',
      claimant: '',
      claimType: '',
      claimtype: '',
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
      withattachment: '',
			createDateFrom: "",
			createDateTo: "",
			paidDateFrom: "",
			paidDateTo: "",
			computed_status: "",
			incurredamt: "{ 'min': 0, 'max': 2000000000 }",
      hrflag: false,
    },
  }),
  computed: {
    ...mapGetters('log', [
      'isFilterClaim',
      'listClaimants',
    ]),
    ...mapGetters('claim', [
      'tab',
      'listClaimsType',
      'tab',
      'statusList',
    ]),
  },
  watch: {
    'isFilterClaim': async function(newVal) {
      if (newVal) {
        try {
          await this.getListClaimant({
            invoke: 'System.execute',
            argc: '2',
            a0: 'Tools.GetEmployeeDpdt',
            a1: {
              employee: localStorage.getItem('empid'),
            }
          });
          switch(this.tab) {
            case 1: {
              await this.getListClaimsType({
                "invoke": "System.execute",
                "argc": "2",
                "a0": "API.CS.GetClaimTypesList",
                "a1": {
                  "claimgroup": 1
                }
              });
              break;
            }
            case 2: {
              await this.getListClaimsType({
                "invoke": "System.execute",
                "argc": "2",
                "a0": "API.CS.GetClaimTypesList",
                "a1": {
                  "claimgroup": 2
                }
              });
              break;
            }
            case 3: {
              await this.getListClaimsType({
                "invoke": "System.execute",
                "argc": "2",
                "a0": "API.PolicyClaimApplied.List.GetFilters"
              });
              break;
            }
          }
        } catch (error) {
          console.log('isFilterClaim ' + error);
        }
      }
    }
  },
  methods: {
    ...mapActions('log', [
      'toggleIsFilterClaim',
      'getListClaimant',
    ]),
    ...mapActions('claim', [
      'getListClaim',
      'getStatusList',
      'getListClaimsType',
    ]),
     _formatTimeCallApi(time) {
      return this.$dayjs(time).format("YYYY-MM-DD");
    },
    async _searchClaim() {
      try {
        switch(this.tab) {
          case 1: {
            await this.getListClaimFlex();
            break;
          }
          case 2: {
            await this.getListClaimOut();
            break;
          }
          case 3: {
            await this.getListClaimIn()
            break;
          }
        }
        this.toggleIsFilterClaim(false);
      } catch (error) {
        console.log('_searchClaim ' + error);
      }
    },
    async getListClaimFlex () {
      await this.getListClaim({
        "invoke": "System.execute",
        "argc": "2",
        "a0": "API.ClaimApplied.GetListing",
        "a1": {
          ...this.filters,
          claimgroup: 1,
          employeeDpdt: this.filters.employeeDpdt == 'null' ? "-1" : this.filters.employeeDpdt,
          incurredDateFrom: this.dateAdm[0] ? this._formatTimeCallApi(this.dateAdm[0]) : '',
          incurredDateTo: this.dateAdm[1] ? this._formatTimeCallApi(this.dateAdm[1]) : '',
          incurredamt: this.incurredamt ? `{ 'min': 0, 'max': ${Number(this.incurredamt)} }` : "{ 'min': 0, 'max': 2000000000 }",
        },
      });
    },
    async getListClaimOut () {
      await this.getListClaim({
        "invoke": "System.execute",
        "argc": "2",
        "a0": "API.ClaimApplied.GetListing",
        "a1": {
          ...this.filters,
          claimgroup: 2,
          employeeDpdt: this.filters.employeeDpdt == 'null' ? "-1" : this.filters.employeeDpdt,
          incurredDateFrom: this.dateAdm[0] ? this._formatTimeCallApi(this.dateAdm[0]) : '',
          incurredDateTo: this.dateAdm[1] ? this._formatTimeCallApi(this.dateAdm[1]) : '',
          incurredamt: this.incurredamt ? `{ 'min': 0, 'max': ${Number(this.incurredamt)} }` : "{ 'min': 0, 'max': 2000000000 }",
        },
      });
    },
    async getListClaimIn () {
      await this.getListClaim({
        "invoke": "System.execute",
        "argc": "2",
        "a0": "API.PolicyClaimApplied.getListing",
        "a1": {
          "filters": {
            ...this.filters,
            employeeDpdt: this.filters.employeeDpdt == 'null' ? "-1" : this.filters.employeeDpdt,
            admissionDateFrom: this.dateAdm[0] ? this._formatTimeCallApi(this.dateAdm[0]) : '',
            admissionDateTo: this.dateAdm[1] ? this._formatTimeCallApi(this.dateAdm[1]) : '',
            incurredamt: this.incurredamt ? `{ 'min': 0, 'max': ${Number(this.incurredamt)} }` : "{ 'min': 0, 'max': 2000000000 }",
          },
        },
      });
    },
  },
  created() {
    if (window.innerWidth < 1366) {
      this.placeholderDate = 'Start date  End date';
    }
  }
}
</script>

<style scoped>
@import '@/assets/css/inputCustom/inputCustom.css';
@import '@/assets/css/selectCustom/selectCustom.css';
@import '@/assets/css/claim/filterClaim.css';

::v-deep .mx-input-wrapper {
  height: auto;
}
::v-deep .mx-icon-calendar {
  display: none;
}
::v-deep .mx-input {
  border: none;
  box-shadow: inherit;
  padding: 0px;
  font-family: Ubuntu-Light,Tahoma,sans-serif;
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 150%;
  color: var(--NTUC-disable);
  margin: 0;
}
</style>
