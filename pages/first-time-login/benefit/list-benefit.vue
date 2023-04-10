<template>
  <div class="bg-NTUC-7 pt--30 pb--30">
    <div>
      <alert-success
        :alert="alertConfig.textAlert"
        :isShow="alertConfig.isShow"
        :type="alertConfig.typeAlert"
        @handleCloseAlert="_handleCloseAlert"
        class="mb-lg-4 mb-sm-2"
      />
    </div>
    <b-container>
      <b-row>
        <b-col cols="12" md="8">
          <div class="wrapper__checkbox benefit">
            <b-form-checkbox
              :checked="showDetailAll"
              @change="e => _showDetailAll(e)"
              name="check-button"
              switch
              size="lg"
              :class="{
                'mb--20': true,
                'check-button-benefit': true,
                active_button: showDetailAll == true ? true : false,
                unactive_button: showDetailAll == false ? true : false
              }"
            >
              <p class="text-16 text-NTUC-20 mt--5 mb-0 view-all">
                {{ $t('benefit.View_all_plans_for_selection') }}
              </p>
            </b-form-checkbox>
          </div>
          <b-form-group
            label=""
            :class="`${errorEnrolmentdisclaimer ? 'checkbox--error' : ''} mb-0`"
          >
            <b-form-checkbox
              :class="`text-16 font__regular ${
                errorEnrolmentdisclaimer ? 'text-NTUC-15' : 'text-NTUC-20'
              }`"
              @change="() => (errorEnrolmentdisclaimer = false)"
              v-model="isEnrolmentdisclaimer"
            >
              <div v-html="enrolmentdisclaimer" />
            </b-form-checkbox>
          </b-form-group>
          <div>&nbsp;</div>
          <!-- <b-form-group label="" :class="`${errorAgree ? 'checkbox--error' : ''} mb-0`">
            <b-form-checkbox
              :class="`text-16 font__regular ${errorAgree ? 'text-NTUC-15' : 'text-NTUC-20'}`"
              @change="() => (errorAgree = false)"
              v-model="isAgree"
            >
              <div v-html="$t('benefit.agree_benefit')" />
            </b-form-checkbox>
          </b-form-group>
          <div>&nbsp;</div>
          <b-form-group label="" :class="`${errorUnderstand ? 'checkbox--error' : ''} mb-0`">
            <b-form-checkbox
              :class="`text-16 font__regular ${errorUnderstand ? 'text-NTUC-15' : 'text-NTUC-20'}`"
              @change="() => (errorUnderstand = false)"
              v-model="isUnderstand"
            >
              <div v-html="$t('benefit.i_understand_the_additional')" />
            </b-form-checkbox>
          </b-form-group> -->
        </b-col>
        <b-col cols="12" md="4">
          <div class="wrapper__sidebar quickly__border--gray mb--20">
            <div class="text-16 font__bold text-NTUC-6 mb--20" style="letter-spacing: 8px">
              {{ $t('benefit.QUICK_LINKS') }}
            </div>
            <a href="#/online-resources" class="d-block text-16 text-NTUC-5 mb--20 cursor_pointer">
              {{ $t('benefit.Online_Resources') }}
            </a>
            <a href="#/first-time-login/contact-us" class="d-block text-16 text-NTUC-5 cursor_pointer">
              {{$t('benefit.Contact_Us')}}
            </a>
          </div>
        </b-col>
      </b-row>
      <b-row class="justify-content-end mb-5">
        <b-button class="text-16 font__regular mt--5 btn__reset btn__orange ml-2" @click="_reset">
          {{ $t('btn.reset') }}
        </b-button>
        <b-button
          @click="_handleModalTimeToThink(true)"
          class="text-16 font__regular mt--5 ml-2 btn__orange_mod mr--10"
        >
          {{ $t('benefit.Save_As_Draft') }}
        </b-button>
        <b-button
          @click="_handleConfirm"
          :variant="
            isEnrolmentdisclaimer ? 'primary' : 'outline-secondary'
          "
          :disabled="!(isEnrolmentdisclaimer)"
          class="text-16 font__regular mt--5"
        >
          {{ $t('benefit.I’m_happy_with_my_selection') }}
        </b-button>
      </b-row>
      <CartBenefit class="benefit" :isListBenefit="true" />
      <TimeToThink
        :modalTimeToThinkShow="modalTimeToThinkShow"
        @handleModalShow="handleModalShow"
      />
      <b-modal
        v-model="modalShow"
        content-class="border-0"
        title-class="text-white"
        header-class="bg-NTUC-3"
        :title="'Saved!'"
        centered
      >
        <div v-if="!isConfirm" class="text-14 text-gray--800">
          <div>Your selections have been saved successsfully.</div>
          <br />
          <div class="text-gray--800">
            When you are ready, you can return to these selections for submission.
          </div>
        </div>
        <div v-else class="text-14 text-gray--800">
          <div>
            Please note that you can you have read the Guide to Health Insurance, Product Summary
            and Benefits Schedule which can be downloaded from the Quick Links.
          </div>
        </div>
        <template #modal-footer>
          <div class="w-100">
            <b-button variant="primary" class="float-right bg-NTUC-3" @click="_hideModel">
              {{ $t('btn.ok') }}
            </b-button>
          </div>
        </template>
      </b-modal>
    </b-container>
    <b-modal
      v-model="modalGoToDashboard"
      content-class="border-0"
      title-class="text-white"
      header-class="bg-NTUC-3"
      :title="$t('dashboard.information')"
      :no-close-on-backdrop="true"
      :no-close-on-esc="true"
      :hideHeaderClose="true"
      centered
      size="md"
    >
      <div class="text-16 text-gray--800">
        <div>
          Congrats ! Your dependent(s) has been enrolled. Let’s bring you to your dashboard to view
          your benefits .
        </div>
      </div>
      <template #modal-footer>
        <div class="w-100">
          <b-button
            variant="primary"
            class="float-right bg-NTUC-3"
            @click="$router.push({ name: 'dashboard' })"
          >
            {{ $t('btn.ok') }}
          </b-button>
        </div>
      </template>
    </b-modal>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import CartBenefit from '~/components/first-time-login/benefit/cartBenefit.vue';
import QuickLinks from '~/components/first-time-login/benefit/quickLinks.vue';
import TimeToThink from '~/components/first-time-login/benefit/timeToThink.vue';
import AlertSuccess from '~/components/alertSuccess/index.vue';

export default {
  layout: 'first-time-login',
  components: {
    CartBenefit,
    QuickLinks,
    TimeToThink,
    AlertSuccess
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
      if (!resWebGetCountDownBarPeriod.displayflag) {
        this.changeModalGoToDashboard(true);
      }
      const resGetFlexEnrolmentMessage = await this.getFlexEnrolmentMessage({
        invoke: 'System.execute',
        argc: '2',
        a0: 'Tools.GetFlexEnrolmentMessage'
      });
      this.enrolmentdisclaimer = resGetFlexEnrolmentMessage.rows[0][0];
    } catch (error) {
      console.log('fetch: ' + error);
    }
  },
  data: () => ({
    enrolmentdisclaimer: '',
    modalGoToDashboard: false,
    isEnrolmentdisclaimer: false,
    isAgree: false,
    errorAgree: false,
    errorEnrolmentdisclaimer: false,
    isUnderstand: false,
    errorUnderstand: false,
    modalShow: false,
    isConfirm: false,
    modalTimeToThinkShow: false
  }),
  computed: {
    ...mapGetters('benefit', [
      'isClickSaveAsDraft',
      'selectionListing',
      'isClickConfirm',
      'isClickSaveAsDraftSuccess',
      'isClickConfirmSuccess',
      'isCheckHDF',
      'showDetailAll',
      'listCompulsory'
    ]),
    ...mapGetters('alert', ['alertConfig'])
  },
  methods: {
    ...mapActions('benefit', [
      '_showDetailAll',
      '_isClickSaveAsDraft',
      'submitSelection',
      '_isClickConfirm',
      '_isClickConfirmSuccess',
      'getFlexEnrolmentMessage',
      '_isCheckHDF',
      '_isReset',
      'setListCompulsory',
      'webGetCountDownBarPeriod'
    ]),
    ...mapActions('alert', ['_changeAlertConfig']),
    changeModalGoToDashboard(value) {
      this.modalGoToDashboard = value;
    },
    _reset() {
      this._isReset(true);
    },
    _goBack() {
      this.$router.go(-1);
    },
    _changeSelectionListing(value) {
      this.selectionListing = value;
    },
    async _hideModel() {
      if (!this.isConfirm) {
        this.isConfirm = false;
      } else {
        this._isClickConfirm(false);
        this.modalShow = true;
        this.isConfirm = false;

        if (this.isCheckHDF) {
          this._redirectHDForm();
        } else {
          this.$router.push({
            name: 'first-time-login-dashboard'
          });
        }
        this._isCheckHDF(false);
      }

      this.modalShow = false;
    },
    _redirectHDForm() {
      this.$router.push({
        name: 'first-time-login-benefit-health-declaration',
        params: { healthDeclarationStep: 2 }
      });
    },
    _handleConfirm() {
      // if (this.isEnrolmentdisclaimer && this.isAgree && this.isUnderstand) {
      if (this.isEnrolmentdisclaimer) {
        this._isClickConfirm(true);
      } else {
        this.errorEnrolmentdisclaimer = !this.isEnrolmentdisclaimer ? true : false;
        // this.errorAgree = !this.isAgree ? true : false;
        // this.errorUnderstand = !this.isUnderstand ? true : false;
      }
    },
    _handleSaveAsDraft() {
      this._isClickSaveAsDraft(true);
    },
    _handleModalTimeToThink(show) {
      this.modalTimeToThinkShow = true;
    },
    _handleCloseAlert() {
      this._changeAlertConfig({
        isShow: false,
        typeAlert: 'success',
        textAlert: ''
      });
    }
  },
  watch: {
    isClickSaveAsDraft: function (newValue) {
      if (!newValue) {
        this.modalShow = true;
      }
    },
    isClickConfirmSuccess: function (newValue) {
      if (newValue) {
        this._isClickConfirmSuccess(false);
        this.modalShow = true;
        this.isConfirm = true;
      }
    }
  },
  destroyed() {
    this.setListCompulsory([]);
    this._handleCloseAlert();
  }
};
</script>

<style scoped>
@import '@/assets/css/button/index.css';
@import '@/assets/css/first-time-login/benefit/cartBenefit.css';
.wrapper__checkbox {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
</style>
<style>
@import '@/assets/css/checkboxOrange';
.check-button-benefit.b-custom-control-lg .custom-control-label::before {
  width: 3.1875rem !important;
}
.view-all {
  margin-left: 15px;
}
.active_button.b-custom-control-lg .custom-control-label::after {
  left: calc(-1.8125rem + 2px) !important;
}
.unactive_button.b-custom-control-lg .custom-control-label::after {
  left: calc(-2.8125rem + 2px) !important;
}
</style>
