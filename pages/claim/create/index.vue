<template>
  <div class="fullwidth create__claim">
    <div class="wrapper">
      <div class="inner">
        <div>
          <div class="m-auto alert-claim">
          </div>
          <alert-success :class="{'mt-2 mx-3': alertConfig.isShow }" :alert="alertConfig.textAlert" :isShow="alertConfig.isShow" :type="alertConfig.typeAlert" @handleCloseAlert="_handleCloseAlert" />
          <div class="container__log d-flex">
            <div>
              <stepClaim />
            </div>
            <div class="cart__log">
              <!-- Flex claim -->
              <firstClaim v-if="createStep == 1" />
              <secretary-access v-if="createStep == '1.1.1'" />
              <emp-select v-if="createStep === '1.1.2'" />
              <secondClaim v-if="createStep == 2" />
              <thirdClaim v-if="createStep == 3" />
              <fourthClaim v-if="createStep == 4" />
              <outPatient v-if="createStep == 5" />
              <uploadFile v-if="createStep == 6" />
              <firstDetailClaim v-if="createStep == 7" />
              <selectClaim v-if="createStep == 7.1" @openAlert="openAlert" />
              <sameReceptClaim v-if="createStep == 7.2" />
              <successMultipleClaim v-if="createStep == 7.3" />
              <firstSpeClaim v-if="createStep == '7.1.3'" />
              <claimTable v-if="createStep == '7.1.4'" />

              <successMultipleClaim v-if="createStep == 9" />
              <successFlexClaim v-if="createStep == 10" />
              <successSingleClaim v-if="createStep == 9.1" />

              <InsuredInpatientStepOne v-if="createStep == 1.1 || createStep == 1.2" />
              <InsuredInpatientStepTwo v-if="createStep == 2.1" />
              <InsuredInpatientStepThree v-if="createStep == 3.1" />
              <InsuredInpatientStepFour v-if="createStep == 4.1" />

              <InsuranceOutpatientStepOne v-if="createStep == 1.6" />

              <FlexClaimStepOne v-if="createStep == 1.5" />
            </div>

            <div @click="handleClose"><img class="cursor_pointer close-btn position-sticky top-100" src="@/assets/images/Vector.png"/></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions, mapMutations } from 'vuex';
import stepClaim from '~/components/claim/create/stepClaim.vue';
import firstClaim from '~/components/claim/create/firstClaim.vue';
import secondClaim from '~/components/claim/create/secondClaim.vue';
import thirdClaim from '~/components/claim/create/thirdClaim.vue';
import fourthClaim from '~/components/claim/create/fourthClaim.vue';
import outPatient from '~/components/claim/create/outPatient.vue';
import uploadFile from '~/components/claim/create/uploadFile.vue';
import firstDetailClaim from '~/components/claim/create/firstDetailClaim.vue';
import listDetailClaim from '~/components/claim/create/listDetailClaim.vue';
import successMultipleClaim from '~/components/claim/create/successMultipleClaim.vue';
import firstSpeClaim from '~/components/claim/create/firstSpeClaim.vue';
import successSingleClaim from '~/components/claim/create/successSingleClaim.vue';
import selectClaim from '~/components/claim/create/selectClaim.vue';
import claimTable from '~/components/claim/create/claimTable.vue';
import AlertSuccess from '~/components/alertSuccess/index.vue';

import sameReceptClaim from '~/components/claim/create/sameReceptClaim.vue';
import successFlexClaim from '~/components/claim/create/successFlexClaim.vue';
import InsuredInpatientStepOne from '~/components/claim/insuredInpatientStepOne.vue';
import InsuredInpatientStepTwo from '~/components/claim/insuredInpatientStepTwo.vue';
import InsuredInpatientStepThree from '~/components/claim/insuredInpatientStepThree.vue';
import InsuredInpatientStepFour from '~/components/claim/insuredInpatientStepFour.vue';
import FlexClaimStepOne from '~/components/claim/create/flexClaimStepOne.vue';
import InsuranceOutpatientStepOne from '~/components/claim/create/insuranceOutpatientStepOne.vue';
import SecretaryAccess from '../../../components/claim/create/secretaryAccess.vue';
import EmpSelect from '../../../components/claim/create/empSelect.vue';

export default {
  components: {
    stepClaim,
    firstClaim,
    secondClaim,
    thirdClaim,
    fourthClaim,
    outPatient,
    uploadFile,
    firstDetailClaim,
    InsuredInpatientStepOne,
    InsuredInpatientStepTwo,
    InsuredInpatientStepThree,
    successMultipleClaim,
    successSingleClaim,
    selectClaim,
    sameReceptClaim,
    successFlexClaim,
    InsuredInpatientStepFour,
    firstSpeClaim,
    claimTable,
    listDetailClaim,
    FlexClaimStepOne,
    InsuranceOutpatientStepOne,
    AlertSuccess,
    SecretaryAccess,
    EmpSelect,
  },
  data: () => ({
    stepInput: 1
  }),
  layout: 'first-time-login',
  created() {
    this._handleCloseAlert();
  },
  fetch() {
    this.showdataQuote();
  },
  computed: {
    ...mapGetters('claim', ['createStep', 'isCreateClaim']),
    ...mapGetters('alert', ['alertConfig'])
  },
  methods: {
    ...mapActions('claim', [
      'setCreateClaimStep',
      '_setStepList',
      'setEntitiesClaim',
      'setEntityActiveClaim'
    ]),
    ...mapActions('notification', ['getBroker']),
    ...mapActions('alert', ['_changeAlertConfig']),
    ...mapActions('dashboard', ['fetchMMBDashboard']),
    ...mapMutations('claim', ['SET_IS_CREATE_CLAIM']),
    _handleCloseAlert() {
      this._changeAlertConfig({
        isShow: false,
        typeAlert: 'success',
        textAlert: ''
      });
    },
    handleClose() {
      this.$router.push({name: 'claim'})
    },
    async showdataQuote() {
      await this.fetchMMBDashboard({
        invoke: 'System.execute',
        argc: '2',
        a0: 'API.Quotes.CRUD',
        a1: {
          id: '',
          category: '20253',
          durationfrom: '',
          durationto: '',
          wildcard: '',
          mode: '1',
          fields: '',
          values: ''
        }
      });
    }
  },
  watch: {
    isCreateClaim: async function (newValue) {
      if (newValue == 3) {
        const resBroker = await this.getBroker({
          invoke: 'System.execute',
          argc: '2',
          a0: 'API.Broker.Get'
        });
        this._changeAlertConfig({
          isShow: true,
          typeAlert: 'error',
          textAlert: this.$t('claim.create_error', { supEmail: resBroker.email })
        });
        this.SET_IS_CREATE_CLAIM(1);
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else if (newValue == 2) {
        this._changeAlertConfig({
          isShow: true,
          typeAlert: 'success',
          textAlert: this.$t('claim.your_claim_submission_is_successful')
        });
      }
    }
  },
  destroyed() {
    this.setCreateClaimStep(1);
    this.SET_IS_CREATE_CLAIM(1);
    this._changeAlertConfig({
      isShow: false,
      typeAlert: 'success',
      textAlert: ''
    });
  }
};
</script>

<style>
@import '@/assets/css/claim/controlClaim.css';
@import '@/assets/css/claim/log.css';
@import '@/assets/css/inputCustom/inputCustom.css';
@import '@/assets/css/claim/stepOneLog.css';

.top-100{
  top: 100px;
}

@media screen and (max-width: 991px) {
  .close-btn {
    display: none;
  }
}

@media screen and (max-width: 1440px) {
  .alert-claim {
    max-width: 1000px;
    width: 100%;
  }
}
</style>
