<template>
  <div class="bg-NTUC-7 pt--25 pb--30">
    <b-container>
      <b-row>
        <b-col cols="12" md="12">
          <div class="text-16 text-gray--800 mb--5">
            {{ $t('benefit.description_5') }}
          </div>
          <div class="text-23 font__medium text-NTUC-6">
            {{ $t('benefit.My_Dependents') }}
          </div>
        </b-col>
      </b-row>
      <b-row>
        <b-col cols="12" md="12" class="mt--15">
          <b-button
            @click="goToBenefit(true)"
            class="text-16 font__regular mt--5 w-auto"
            :class="this.validateCountryofResidence ? 'btn__primary' : 'btn__orange'"
          >
            {{
              this.validateCountryofResidence
                ? $t('benefit.these_details_are_correct')
                : $t('benefit.these_details_are_correct')
            }}
          </b-button>
          <b-button
            @click="_handleDetailsAreWrong"
            class="text-16 font__regular mr--30 mt--5 btn__primary"
          >
            {{ $t('benefit.Some_wrong') }}
          </b-button>
        </b-col>
      </b-row>
      <div v-if="validateCountryofResidence" class="mt--20">
        <vue-typed-js
          :strings="[$t('benefit.please_fill_in_all')]"
          :typeSpeed="40"
          :backSpeed="0"
          :loop="true"
        >
          <div class="typing text-16 text-NTUC-6 line-height-15"></div>
        </vue-typed-js>
      </div>
      <CartBenefitCreate
        :listBenefit="listBenefit"
        :validateCountryofResidence="validateCountryofResidence"
      />
    </b-container>
    <b-modal
      v-model="modalShow"
      content-class="border-0"
      title-class="text-white"
      header-class="bg-NTUC-3"
      :title="$t('dashboard.information')"
      :no-close-on-backdrop="true"
      centered
    >
      <div class="text-14 text-gray--800">
        <div>Please update on the HR Portal before proceeding further</div>
        <br />
        <div class="text-gray--800">
          We will now be redirecting you back to the
          <span class="text-NTUC-6 font__medium">Sign In</span> page.
        </div>
        <div class="text-gray--800">
          Please login again after your details has been updated to continue with the Employee
          Benefits enrolment process
        </div>
      </div>
      <template #modal-footer>
        <div class="w-100">
          <b-button variant="primary" class="float-right bg-NTUC-3" @click="_redirectLogin">
            {{ $t('btn.ok') }}
          </b-button>
        </div>
      </template>
    </b-modal>
    <b-modal
      v-model="modalShowEnrolmentdisclaimer"
      content-class="border-0"
      title-class="text-white"
      header-class="bg-NTUC-3"
      :title="$t('dashboard.Important_Notes_please_read')"
      :no-close-on-backdrop="true"
      size="xl"
      centered
    >
      <div class="text-20 text-gray--800 line-height-15">{{ $t('benefit.create.question') }}</div>
      <ol class="mt-3">
        <li>
          <div class="text-20 text-gray--800 line-height-15 my-2">
            {{ $t('benefit.create.question-1') }}
          </div>
        </li>
        <li>
          <div class="text-20 text-gray--800 line-height-15 my-2">
            {{ $t('benefit.create.question-2') }}
          </div>
        </li>
        <li>
          <div class="text-20 text-gray--800 line-height-15 my-2">
            {{ $t('benefit.create.question-3') }}
          </div>
        </li>
        <li>
          <div class="text-20 text-gray--800 line-height-15 my-2">
            {{ $t('benefit.create.question-4') }}
          </div>
        </li>
        <li>
          <div class="text-20 text-gray--800 line-height-15 my-2">
            {{ $t('benefit.create.question-5') }}
          </div>
        </li>
        <li>
          <div class="text-20 text-gray--800 line-height-15 my-2">
            {{ $t('benefit.create.question-6') }}
          </div>
        </li>
        <li>
          <div class="text-20 text-gray--800 line-height-15 my-2">
            {{ $t('benefit.create.question-7') }}
          </div>
        </li>
      </ol>
      <template #modal-footer>
        <div class="w-100">
          <b-button variant="primary" class="float-right bg-NTUC-3" @click="_redirect">
            {{ $t('btn.ok') }}
          </b-button>
        </div>
      </template>
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
          <b-button variant="primary" class="float-right bg-NTUC-3" @click="_redirectBenefit">
            {{ $t('btn.ok') }}
          </b-button>
        </div>
      </template>
    </b-modal>
    <GoBackToHr :isShowModal="isShowModal" @_handleIsShowModal="_handleIsShowModal" />
    <b-modal
      v-model="modalCheckAdjustment"
      content-class="border-0"
      title-class="text-white"
      header-class="bg-NTUC-3"
      :title="$t('dashboard.information')"
      :no-close-on-backdrop="true"
      centered
      size="lg"
    >
      <div class="text-24 text-NTUC-6">
        <div>Oh.</div>
        <br />
        <div class="text-16 text-gray--800">
          II understand that you would like to enroll for your new dependant but looks like there
          isn't any new dependant with a birth date or marriage date within the last 60 days.
          <br />
          <br />
          If the information is incorrect, please proceed to update MyHR portal with the relevant
          details.
          <br />
          <br />
          Once you have updated your details in MyHR portal, please login to retrieve your dependant
          details again within 3 workdays.
          <br />
        </div>
      </div>
      <template #modal-footer>
        <div class="w-100">
          <b-button
            variant="primary"
            class="float-right bg-NTUC-3"
            @click="modalCheckAdjustment = false"
          >
            {{ $t('btn.ok') }}
          </b-button>
        </div>
      </template>
    </b-modal>
  </div>
</template>

<script>
import { mapActions } from 'vuex';
import CartBenefitCreate from '~/components/first-time-login/benefit/cartBenefitCreate.vue';
import { _handleFormatTime } from '@/utils/functions/formatTime';
import { postAxios } from '@/services/callApi';
import { EXCEPTION } from '@/utils/constants/statusResponse';
import GoBackToHr from './modal/go-back-to-hr.vue';

export default {
  layout: 'first-time-login',
  components: {
    CartBenefitCreate,
    GoBackToHr
  },
  async fetch() {
    try {
      const resWebGetCountDownBarPeriod = await this.webGetCountDownBarPeriod({
        invoke: 'System.execute',
        argc: '2',
        a0: 'API.Flex.WebGetCountDownBarPeriod',
        a1: {
          employee: localStorage.getItem('empid')
        }
      });
      this.enrolmentdisclaimer = resWebGetCountDownBarPeriod.enrolmentdisclaimer.replaceAll(
        '\n',
        '<br />'
      );
      const info = await postAxios({
        invoke: 'System.execute',
        argc: '2',
        a0: 'API.Broker.Get'
      });
      this.info = JSON.parse(info.data.data[0].value);
    } catch (error) {
      console.log('fetch: ' + error);
    }
  },
  data: () => ({
    modalWrong: false,
    modalCheckAdjustment: false,
    modalShow: false,
    modalShowEnrolmentdisclaimer: false,
    enrolmentdisclaimer: '',
    listBenefit: [],
    validateCountryofResidence: false,
    isShowModal: false,
    info: {}
  }),
  methods: {
    ...mapActions('benefit', ['webGetCountDownBarPeriod', 'getListDependent', 'checkAdjustment']),
    _handleIsShowModal(value) {
      this.isShowModal = value;
    },
    _formatTime(time) {
      const timeNew = _handleFormatTime(time, '-');
      return timeNew ? this.$dayjs(timeNew).format('DD-MM-YYYY') : '';
    },
    async getListDependentFromFPGServer() {
      const listDependent = await this.getListDependent({
        invoke: 'System.execute',
        argc: '2',
        a0: 'API.FPG.EmployeeDpdt.GetInfo',
        a1: {
          employee_id: localStorage.getItem('staffid')
        }
      });
      if (Array.isArray(listDependent)) {
        this.listBenefit = listDependent.map(item => {
          item.dob = this._formatTime(item.DateOfBirth);
          item.isShowDetail = true;
          return {
            ...item,
            ChildTypeNew: typeof item.ChildType == 'object' ? '' : item.ChildType,
            CountryOfResidence: item.CountryOfResidence ? item.CountryOfResidence : ''
          };
        });
      } else {
        for (var key in listDependent) {
          if (listDependent.hasOwnProperty(key === 'DateofBirth')) {
            listDependent.DateOfBirth = this._formatTime(listDependent.DateOfBirth);
          }
          if (listDependent.hasOwnProperty(key === 'ChildType')) {
            listDependent.ChildTypeNew = listDependent.ChildType;
          }
        }
        listDependent.isShowDetail = true;

        this.listBenefit = [...this.listBenefit, listDependent];
      }
    },
    async goToBenefit(check) {
      const validateCountryofResidence = this.listBenefit.find(
        el => !el.CountryOfResidence || typeof el.CountryOfResidence == 'object'
      );
      this.validateCountryofResidence = validateCountryofResidence ? true : false;
      if (!validateCountryofResidence) {
        const res = await postAxios({
          invoke: 'System.execute',
          argc: '2',
          a0: 'API.FPG.EmployeeDpdtCreateUpdate',
          a1: {
            param: JSON.stringify({
              Employee: this.listBenefit.map(el => {
                delete el.isShowDetail;
                delete el.dob;
                delete el.ChildTypeNew;
                return {
                  ...el
                };
              })
            })
          }
        });

        if (res.data.data[0].dt !== EXCEPTION) {
          const resCheckAdjustment = await this.checkAdjustment({
            invoke: 'System.execute',
            argc: '2',
            a0: 'API.Flex.CheckAdjustment'
          });
          if (resCheckAdjustment?.data?.adjustmentenrolflag) {
            this.$router.push({ name: 'first-time-login-benefit-congratulations' });
          } else {
            this.modalCheckAdjustment = true;
          }
        } else {
          this.isShowModal = true;
        }
      }
    },
    _handleDetailsAreWrong() {
      this.modalWrong = true;
    },
    _redirect() {
      this.$router.push({ name: 'first-time-login-benefit-list-benefit' });
    },
    _redirectLogin() {
      localStorage.clear();
      this.$router.push({ name: 'login' });
      this.modalShow = false;
    },
    _redirectBenefit() {
      localStorage.clear();
      this.$router.push({ name: 'login' });
      this.modalShow = false;
      this.modalWrong = false;
    }
  },
  created() {
    this.getListDependentFromFPGServer();
  }
};
</script>

<style scoped>
@import '@/assets/css/button/index.css';
.typewriter {
  overflow: hidden; /* Ensures the content is not revealed until the animation */
  white-space: nowrap; /* Keeps the content on a single line */
  animation: typing 2s steps(20, end), blink-caret 1s step-end infinite;
}

/* The typing effect */
@keyframes typing {
  from {
    width: 0;
  }
  to {
    width: 100%;
  }
}
</style>