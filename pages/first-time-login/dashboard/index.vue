<template>
  <div class="db-container w-100 bg-NTUC-7">
    <div class="db-wrapper m-auto d-flex flex-column justify-content-start align-items-start">
      <div class="mb--20">
        <b-row>
          <b-col cols="12" md="8">
            <div class="text-34 line-height-12 text-lg-36">{{ $t('benefit.welcome') }}</div>
            <div class="description-text text-16 line-height-15 mb--5 mt--10">
              {{ $t('benefit.dashboard_description_1') }}
            </div>
            <div class="description-text text-16 line-height-15 mb--5">
              {{ $t('benefit.dashboard_description_2') }}
            </div>
            <div class="description-text text-16 line-height-15 mb--5">
              {{ $t('benefit.dashboard_description_3') }}
            </div>
          </b-col>
          <b-col cols="12" md="4">
            <div class="wrapper__sidebar">
              <div class="text-14 font__bold text-NTUC-6 mb--20" style="letter-spacing: 8px">
                {{ $t('benefit.QUICK_LINKS') }}
              </div>
              <a
                href="#/online-resources"
                class="d-block text-14 text-NTUC-5 mb--20 cursor_pointer"
              >
                {{ $t('benefit.Online_Resources') }}
              </a>
              <a href="#/first-time-login/contact-us" class="d-block text-14 text-NTUC-5 cursor_pointer">
                {{ $t('benefit.Contact_Us') }}
              </a>
            </div>
          </b-col>
        </b-row>
      </div>
      <div class="mb--20">
        <div class="bg-NTUC-3 py--10 px--40 d-flex flex-row align-items-center confirm-benefit">
          <img src="@/assets/images/confirm.svg" alt="confirm" class="mr-2" />
          <div class="text-16 line-height-12 text-white">
            {{ $t('benefit.benefit_selection_for_benefit_year') }}
          </div>
        </div>
      </div>
      <div class="text-NTUC-1 text-16 font__regular" v-if="firsttimelogin.hdFormFlag">
        <p class="">
          {{ $t('benefit.have_not_complete_hdf') }}
          <span class="cursor_pointer text-NTUC-3" @click="_toHDF">here</span>
          {{ $t('benefit.complete_hdf') }}
        </p>
      </div>
      <b-row class="mb--20 w-100 mt-2">
        <b-col cols="12" md="8">
          <b-form-group
            id="example-input-group-1"
            label-for="example-input-1"
            class="input-group-form mb--20 w-100"
          >
          </b-form-group>
        </b-col>
        <b-col v-if="displayCountdown === true && newDependentEnrolment === false" cols="12" md="4">
          <!--display the countdown timer only in this scenario. The intention is to hide the timer in the event its a new enrolment because the timer doesn't work-->
          <Countdown />
        </b-col>
      </b-row>
      <div class="mb--20">
        <div class="text-NTUC-6 text-20 font-500 font__medium">
          {{ $t('benefit.your_benefits_at_a_glance') }}
        </div>
      </div>
      <div class="mb--20">
        <b-button @click="_checkGetListDependent" class="text-16 font__regular btn__NTUC--18">
          I would like to enrol my new Dependent for these benefits
        </b-button>
      </div>
      <div class="mb--0 d-flex justify-content-end w-100">
        <div class="font__bold text-black text-20">
          {{ $t('benefit.Total_Deduction_From_Payroll') }}
          <strong class="text-20 text-NTUC-13 font__bold">
            {{ _formatMoney(totalUtilisedPrice) }}
          </strong>
        </div>
      </div>
      <div class="mb--20 d-flex justify-content-end w-100">
        <div class="font__bold text-18 text-NTUC-6">
          {{ $t('benefit.total_on_hold_price') }}
          <strong class="text-18 font__bold">
            {{ _formatMoney(totalOnHoldPrice) }}
          </strong>
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
    </div>
    <b-modal
      id="hdformflag"
      title="Health Declaration Form (HDF)"
      header-class="information-dialog-header bg-NTUC-3 text-white"
      footer-class="information-dialog-footer"
      centered
      ok-only
      ok-title="Ok"
      @ok="hideModal"
      :no-close-on-backdrop="true"
    >
      <div class="text-gray--800 text-20 line-height-16">
        Hi,
        <br /><br />
        You have yet to submit your Health Declaration Form.
      </div>
      <div class="text-gray--800 text-20 line-height-16">
        <br />
        Please click <a class="cursor_pointer" @click="gotoHDF">here</a> to proceed with your HDF.
      </div>
    </b-modal>
    <b-modal
      v-model="modalWrong"
      content-class="border-0"
      title-class="text-white"
      header-class="bg-NTUC-3"
      :title="$t('dashboard.information')"
      :no-close-on-backdrop="true"
      centered
      size="lg"
    >
      <div class="text-24 text-NTUC-6">
        <div>Got it.</div>
        <br />
        <div class="text-16 text-gray--800">
          I understand that you would like to make changes to your personal / dependent’s data.
          <br />
          <br />
          Please proceed to update your HR Portal with the relevant details.
          <br />
          <br />
          As your details have not been updated, we will now be signing you out of this Benefit
          enrolment portal.
          <br />
          <br />
          Once you have updated your details with your HR Portal, please sign in again 24 hours
          later.
          <br />
          <br />
          See you soon.
        </div>
      </div>
      <template #modal-footer>
        <div class="w-100">
          <b-button variant="primary" class="float-right bg-NTUC-3" @click="modalWrong = false">
            {{ $t('btn.ok') }}
          </b-button>
        </div>
      </template>
    </b-modal>
    <Modal :modalShowBenefit="modalShowBenefit" v-if="modalShowBenefit" />
  </div>
</template>

<script>
import BenefitCard from '~/components/first-time-login/benefit/healthDeclaration/benefitCard.vue';
import { formatMoney } from '@/utils/functions/formatMoney';
import { PAGINATE } from '~/utils/constants/paginate.js';
import { postAxios } from '~/services/callApi';
import Countdown from '~/components/first-time-login/benefit/countdown.vue';
import Modal from '~/components/login/Modal/index.vue';
import { mapActions, mapGetters } from 'vuex';
export default {
  layout: 'first-time-login',
  components: {
    BenefitCard,
    Countdown,
    Modal
  },
  data() {
    return {
      modalShowBenefit: false,
      modalWrong: false,
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
      newDependentEnrolment: true
    };
  },
  computed: {
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
  watch: {
    async year(value) {
      this.reRenderKey += 1;
      if (value) {
        await this._getDetailsBenefit(this.year, 0, this.dateperiod);
      }
    }
  },
  methods: {
    ...mapActions('login', ['fetchGetRelatedLoginInfo']),
    ...mapActions('benefit', ['getListDependent', 'webGetCountDownBarPeriod', 'checkAdjustment']),
    _toHDF() {
      this.$router.push({
        name: 'first-time-login-benefit-health-declaration'
      });
    },
    async _adjustCountdownDisplayFlagForNewDependent() {
      const resCheckAdjustment = await this.checkAdjustment({
        invoke: 'System.execute',
        argc: '2',
        a0: 'API.Flex.CheckAdjustment'
      });

      if (resCheckAdjustment?.data?.adjustmentenrolflag) {
        this.newDependentEnrolment = true;
      } else {
        this.newDependentEnrolment = false;
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
        this.isFirstEnrollFlag = localStorage.getItem('firstEnrollFlag') === 'true' ? true : false;
      } catch (e) {}
    },
    async _getDetailsBenefit(year, month, dateperiod) {
      let res = [];
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

        let resObj = JSON.parse(res.data.data[0].value);
        let combinedBenefitArrayLength = 0;
        for (const key in resObj) {
          if (resObj[key] && resObj[key].length > 0) {
            combinedBenefitArrayLength = +1;
          }
        }
        if (combinedBenefitArrayLength === 0) {
          res = await postAxios({
            invoke: 'System.execute',
            argc: '2',
            a0: 'API.GetMyBenefit',
            a1: {
              employee: localStorage.getItem('empid'),
              year: year - 1,
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
        name: 'first-time-login-benefit-health-declaration'
      });
    },
    forceRender() {
      this.BenefitCardKey += 1;
    },
    async _checkGetListDependent() {
      this.modalShowBenefit = true;
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
          this.modalShowBenefit = false;
        }
        if (!listDependent[0]) {
          this.modalWrong = true;
        } else {
          this.$router.push({
            name: 'first-time-login-benefit-create'
          });
        }
      } catch (error) {
        console.log(error);
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
