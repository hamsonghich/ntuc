<template>
  <div class="bg-NTUC-7">
    <div class="m-auto d-flex flex-column justify-content-start align-items-start">
      <b-row>
        <b-col cols="12" md="8">
        <div class="mb--30 w-100">
          <b-row v-if="wallets">
            <b-col cols="12" lg="4" md="6" sm="12" class="pr-0">
              <CardCredit 
                :balance="Math.abs(wallets.flex_credit[0].balance)"
                :title="wallets.flex_credit[0].name"
                :entitlement="wallets.flex_credit[0].entitlement"
                :is_flex_credit="true"
              />
            </b-col>
            <b-col cols="12" lg="4" md="6" sm="12" class="pr-0">
              <CardCredit  
                :title="$t('dashboard.outpatient')"
                :balance="wallets.outpatient_wallet[0].balance"
              />
            </b-col>
            <b-col cols="12" lg="4" md="6" sm="12" class="pr-0">
              <CardCredit 
                :title="$t('dashboard.inpatient')"
                :balance="wallets.inpatient_wallet[0].balance"
              />
            </b-col>
          </b-row>
        </div>
        <div class="mb--18">
          <div class="bg-NTUC-3 py--6 px--40 d-flex flex-row align-items-center confirm-benefit w-60">
            <div class="text-16 text-white">
              {{ $t('benefit.benefit_selection_for_benefit_year') }}
            </div>
          </div>
        </div>
        <div class="mb--28">
            <div class="text-16 text-NTUC-23 line-height-20px">
              {{ $t('dashboard.you_have_first_part') }}<a class="text-NTUC-3 text-decoration-underline-ntuc" href="#"> {{ $t('dashboard.here') }} </a> {{ $t('dashboard.you_have_last_part') }}
            </div>
        </div>
        <b-row class="mb--30 w-100 mt--20 ml-0">
          <b-col cols="12" md="5" class="pl-0">
            <div class="text-NTUC-6 text-20 font-500 font__medium">
              {{ $t('benefit.your_benefits_at_a_glance') }}
            </div>
          </b-col>
          <b-col cols="12" md="7" class="pr-0">
            <Countdown />
          </b-col>
        </b-row>
        <div class="mb--20 d-flex flex-row-reverse align-items-end">
          <div v-if="flexvalue">
            <div class="text-right text-NTUC-26 font-700 text-20 mt-2 line-height-13" v-if="flexvalue.totalallocation">
              <div class="mr--5 ml-2 font__bold">${{ flexvalue.totalallocation ?? 0 }}</div>
            </div>
            <div class="text-right text-NTUC-25 font-500 text-14 mt-2 line-height-10">
              <div class="mr--5 ml--25 font__medium">${{ flexvalue.lessutilized > 0 ? flexvalue.lessutilized ? flexvalue.lessutilized : 0 : Math.abs(flexvalue.lessutilized) }}</div>
            </div>
            <div class="text-right text-NTUC-25 text-12 mt-2 line-height-10">
              <div class="mr--5 ml--25">${{ flexvalue.flexpendingutilised > 0 ? flexvalue.flexpendingutilised ? flexvalue.flexpendingutilised : 0 : Math.abs(flexvalue.flexpendingutilised) }}</div>
            </div>
            <div class="text-right text-NTUC-25 text-12 mt-2 line-height-10">
              <div class="mr--5 ml--25">${{ flexvalue.balance }}</div>
            </div>
          </div>
          <div v-if="flexvalue">
            <div class="text-right text-black text-20 font-700 mt-2 line-height-13" v-if="flexvalue.totalallocation">
              <div class="mr--5 ml-2 font__bold">
                  {{ $t('dashboard.flex_allocation') }}
                  <img src="@/assets/images/info.svg" alt="confirm" class="ml-1" />
              </div>
            </div>
            <div class="text-right text-NTUC-25 font-500 text-14 mt-2 line-height-10">
              <div class="mr--5 ml-2 font__medium">{{ flexvalue.lessutilized > 0 ? $t('dashboard.flex_utilisation') : $t('dashboard.earned') }}</div>
            </div>
            <div class="text-right text-NTUC-25 text-12 mt-2 line-height-10">
              <div class="mr--5 ml-2">{{ flexvalue.flexpendingutilised > 0 ? $t('dashboard.pending_utilisation') : $t('dashboard.earned') }}</div>
            </div>
            <div class="text-right text-NTUC-25 text-12 mt-2 line-height-10">
              <div class="mr--5 ml-2">{{ $t('dashboard.balance') }}</div>
            </div>
          </div>
        </div>
        <b-row class="w-100 m-0 m-sm-auto">
          <b-col
            cols="12"
            md="6"
            class="mb--30 pd-child"
            v-for="(item, index) in listBenefit"
            :key="forceRender"
          >
            <BenefitCard :benefit="item" :key="forceRender" />
          </b-col>
        </b-row>
        </b-col>
        <b-col cols="12" md="4" v-if="last_n_panel_claims && last_n_claims">
          <CardActive :last_n_panel_claims="last_n_panel_claims" :last_n_claims="last_n_claims" />
        </b-col>
      </b-row>
    </div>
  </div>
</template>

<script>
  import BenefitCard from '~/components/first-time-login/benefit/healthDeclaration/benefitCard.vue';
  import CardCredit from '~/components/dashboard/cardCredit.vue';
  import CardActive from '~/components/dashboard/cardActive.vue';
  import { formatMoney } from '../../utils/functions/formatMoney';
  import { PAGINATE } from '~/utils/constants/paginate.js';
  import { postAxios } from '~/services/callApi';
  import Countdown from '~/components/dashboard/countdown.vue';
  import Modal from '../../components/login/Modal/index.vue';
  import { mapActions, mapGetters } from 'vuex';
  import { EXCEPTION } from '~/utils/constants/statusResponse';
  export default {
    components: {
      BenefitCard,
      Countdown,
      Modal,
      CardCredit,
      CardActive
    },
    data() {
      return {
        modalShowBenefit: false,
        modalWrong: false,
        flexvalue: null,
        perPage: 4,
        curPage: 1,
        paginateDefault: PAGINATE,
        listBenefit: [],
        dateperiod: new Date().getFullYear() + 1,
        year: new Date().getFullYear() + 1,
        listBoc: [],
        listFlexinsurance: [],
        listFlexnoninsurance: [],
        listFlexothersbenefit: [],
        listNonBenfit: [],
        periodDataList: [],
        reRenderKey: 0,
        BenefitCardKey: 0,
        settings: {
          minimumResultsForSearch: -1
        },
        isFirstEnrollFlag: localStorage.getItem('firstEnrollFlag') == 'true' ? true : false,
        displayCountdown: true,
        newDependentEnrolment:true
      };
    },
    computed: {
      ...mapGetters('dashboard', ['wallets', 'last_n_panel_claims', 'last_n_claims']),
      ...mapGetters('benefit', ['healthDeclarationStep', 'isCheckHDF']),
      ...mapGetters('login', ['firsttimelogin']),
      totalPage: function () {
        return Math.ceil(this.listBenefit.length / this.perPage);
      },
      listBenefitPagination: function () {
        let start = (this.curPage - 1) * this.perPage;
        let end = this.curPage * this.perPage;
        return this.listBenefit.slice(start, end);
      },
      totalUtilisedPrice() {
        return this.listBenefit.reduce(
          (previousValue, currentValue) =>
            parseFloat(previousValue) + (parseFloat(currentValue['Flex$ Utilised']) || 0),
          0
        );
      },
      totalOnHoldPrice() {
        return this.listBenefit.reduce(
          (previousValue, currentValue) =>
            parseFloat(previousValue) + (parseFloat(currentValue['Flex$ Pending']) || 0),
          0
        );
      }
    },
    async fetch() {
      await this.getBenefit();
      await this.fetchAPIMMBDashboard();
      await this._getCountdownDisplayFlag();
      await this._getDetailsBenefit(this.year, 0, this.dateperiod);
      await this._getDataPeriod();
      await this._adjustCountdownDisplayFlagForNewDependent();
    },
    created() {
      this.refreshLocalStorage();
    },
    mounted() {
      this.showModal();
    },
    methods: {
      ...mapActions('dashboard', ['fetchAPIMMBDashboard']),
      ...mapActions('login', ['fetchGetRelatedLoginInfo']),
      ...mapActions('benefit', ['getListDependent', 'webGetCountDownBarPeriod','checkAdjustment']),
      _toHDF() {
        this.$router.push({
          name: 'benefit-health-declaration'
        });
      },
      async getBenefit() {
        try {
          const text = await postAxios({
            invoke: 'System.execute',
            argc: '2',
            a0: 'Flex.WebSummaryHeader',
            a1: {
              employee: localStorage.getItem('empid'),
              flex: true
            }
          });
          if (text.data.data[0].dt !== EXCEPTION) {
            this.flexvalue = JSON.parse(text.data.data[0].value);
            this.flexvalue.totalallocation = this.flexvalue.totalallocation ?? 0;
            this.flexvalue.lessutilized = this.flexvalue.lessutilized ?? 0;
            this.flexvalue.flexpendingutilised = this.flexvalue.flexpendingutilised ?? 0;
            this.flexvalue.balance = this.flexvalue.totalallocation - this.flexvalue.lessutilized;
          }
        } catch (e) {
          console.log(e);
        }
      },
      async _adjustCountdownDisplayFlagForNewDependent() {
          
          const resCheckAdjustment = await this.checkAdjustment({
            "invoke": "System.execute",
            "argc": "2",
            "a0": "API.Flex.CheckAdjustment",
          })
          
          if (resCheckAdjustment?.data?.adjustmentenrolflag) {
            this.newDependentEnrolment = true
          } else {
            this.newDependentEnrolment = false
          }
      },
      async _getCountdownDisplayFlag() {
        try {
          let resWebGetCountDownBarPeriod = await this.webGetCountDownBarPeriod({
            invoke: 'System.execute',
            argc: '2',
            a0: 'API.Flex.WebGetCountDownBarPeriod',
            a1: {
              employee: localStorage.getItem('empid')
            }
          });
          if (typeof resWebGetCountDownBarPeriod == 'string')
            resWebGetCountDownBarPeriod = JSON.parse(resWebGetCountDownBarPeriod);
          this.displayCountdown = resWebGetCountDownBarPeriod.displayflag === 0 ? false : true;
        } catch (error) {
          console.log('fetch: ' + error);
        }
      },
      async refreshLocalStorage() {
        try {
          await this.fetchGetRelatedLoginInfo({
            invoke: 'System.execute',
            argc: '2',
            a0: 'User.getRelatedLoginInfo',
            a1: {
              empid: localStorage.getItem('userid')
            }
          });
          this.isFirstEnrollFlag =
            localStorage.getItem('firstEnrollFlag') === 'true' ? true : false;
        } catch (e) {}
      },
      async _getDetailsBenefit(year, month, dateperiod) {
        let res = []
        try {
            res = await postAxios({
            invoke: 'System.execute',
            argc: '2',
            a0: 'API.GetMyBenefit',
            a1: {
              employee: localStorage.getItem('empid'),
              year: year,
              month: month,
              dateperiod: dateperiod,
              noninsured: true,
              flex: true
            }
          });
          
          let resObj = JSON.parse(res.data.data[0].value)
          let combinedBenefitArrayLength = 0
          for (const key in resObj) {
            if (resObj[key] && resObj[key].length > 0){
              combinedBenefitArrayLength =+ 1
            } 
          } 
          if (combinedBenefitArrayLength === 0) {
            res = await postAxios({
            invoke: 'System.execute',
            argc: '2',
            a0: 'API.GetMyBenefit',
            a1: {
              employee: localStorage.getItem('empid'),
              year: year-1,
              month: month,
              dateperiod: dateperiod,
              noninsured: true,
              flex: true
            }
          });
          }
          if (res.data.data[0].dt == 'default') {
            this.listBoc = JSON.parse(res.data.data[0].value).boc.map(item => {
              return {
                ...item,
                isBlue: false,
                isPink: false
              };
            });
            this.listFlexinsurance = JSON.parse(res.data.data[0].value).flexinsurance.map(item => {
              return {
                ...item,
                isBlue: false,
                isPink: false
              };
            });
            this.listFlexnoninsurance = JSON.parse(res.data.data[0].value).flexnoninsurance.map(
              item => {
                return {
                  ...item,
                  isBlue: false,
                  isPink: false
                };
              }
            );
            this.listFlexothersbenefit = JSON.parse(res.data.data[0].value).flexothersbenefit.map(
              item => {
                return {
                  ...item,
                  isBlue: false,
                  isPink: false
                };
              }
            );
            this.listNonBenfit = JSON.parse(res.data.data[0].value).nonBenfit.map(item => {
              return {
                ...item,
                isBlue: false,
                isPink: false
              };
            });
            this.listBenefit = [
              ...this.listBoc,
              ...this.listFlexinsurance,
              ...this.listFlexnoninsurance,
              ...this.listFlexothersbenefit,
              ...this.listNonBenfit
            ];
          }
        } catch (e) {}
      },
      async _getDataPeriod() {
        try {
          const res = await postAxios({
            invoke: 'System.execute',
            argc: '2',
            a0: 'API.getClaimPeriod',
            a1: {}
          });
          this.periodDataList = JSON.parse(res.data.data[0].value).map(item => {
            return {
              id: item,
              text: item
            };
          });
          this.year = Array.from(this.periodDataList).pop().id;
        } catch (e) {
          console.log('_getDataPeriod', e);
        }
      },
      _formatMoney(price) {
        return formatMoney(price);
      },
      showModal() {
        const hdFormFlag = localStorage.getItem('hdFormFlag') == 'true';
        if (hdFormFlag) this.$bvModal.show('hdformflag');
      },
      hideModal() {
        localStorage.setItem('isShowFlagHDF', false);
        this.$bvModal.hide('hdformflag');
      },
      gotoHDF() {
        localStorage.setItem('isShowFlagHDF', false);
        this.$bvModal.hide('hdformflag');
        this.$router.push({
          name: 'benefit-health-declaration'
        });
      },
      forceRender() {
        this.BenefitCardKey += 1;
      },
      async _checkGetListDependent() {
        this.modalShowBenefit = true
        try {
          const listDependent = await this.getListDependent({
            invoke: 'System.execute',
            argc: '2',
            a0: 'API.FPG.EmployeeDpdt.GetInfo',
            a1: {
              employee_id: localStorage.getItem('staffid')
            }
          });
          if (listDependent) {
            this.modalShowBenefit = false
          }
          if (!listDependent[0]) {
            this.modalWrong = true;
          } else {
            this.$router.push({
              name: 'benefit-create'
            });
          }
        } catch (error) {
          console.log(error);
        }
      }
    },
    watch: {
      async year(value) {
        this.reRenderKey += 1;
        if (value) {
          await this._getDetailsBenefit(this.year, 0, this.dateperiod);
        }
      }
    }
  };
</script>

<style scoped>
  @import '@/assets/css/first-time-login/benefit/healthDeclaration.css';
  @import '@/assets/css/button';

  .input-group-form {
    max-width: 250px;
  }
  .benefit__pagination__page {
    display: flex;
    justify-content: flex-end;
  }
  .benefit__length__paginate {
    padding-top: 5px;
    padding-right: 8px;
  }
  .benefit_pagination {
    list-style: none;
    border-radius: 0.25rem;
  }

  .select2-search--dropdown .select2-search__field {
    color: #000;
  }
</style>
