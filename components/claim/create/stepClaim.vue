<template>
  <div class="stepper position-sticky sticky-top d-flex flex-column top-80 ">
    <div class="stepper d-flex flex-column">
      <div class="sidebar-card-body" v-if="listClaimCreated.length !== 0 && createStep == '7.1'">
        <div
          class="sidebar-card-border position-relative"
          v-for="(claim, index) in listClaimCreated"
          :key="index"
          @click="selectOutpaitent(index)"
        >
          <div :class=" slectedOutpaitent == index ? 'sidebar-card-item-active' : 'sidebar-card-item' ">{{ activeClaimName(claim.policyclaimtype)}} - ${{ claim.incurredamt }}</div>
        </div>
        <div
          class="sidebar-card-border position-relative"
          @click="selectOutpaitent(listClaimCreated.length)"
        >

          <div :class=" slectedOutpaitent === listClaimCreated.length ? 'sidebar-card-item-active' : 'sidebar-card-item' ">{{ activeOutpaitent.claimName ||'New Claim' }} - ${{ activeOutpaitent.currencysurgery || 0 }}</div>
        </div>

      </div>
    </div>
    <div class="abc">
      <div class="step_claim_mobile" v-if="listClaimCreated.length === 0 || createStep != '7.1'">
      <div class="title__log__step">{{ $t('claim.your_claim') }}</div>
      <div class="d-flex  title_step_claim">
        <div class="d-flex flex-column pr-16 align-items-center _is_step_claim">
          <div
            :class="{
              'rounded-circle': true,
              'py-2': true,
              'px-3': true,
              'text-white': true,
              text__step__log: true,
              bg__primary:
                stepList == 1 || stepList == 2 || stepList == 3 || stepList == 4 ? true : false,
              bg__disabled:
                stepList == 1 || stepList == 2 || stepList == 3 || stepList == 4 ? false : true
            }"
          >
            1
          </div>
          <div
            :class="{
              line: true,
              'h-100': true,
              bg__primary:
                stepList == 1 || stepList == 2 || stepList == 3 || stepList == 4 ? true : false,
              bg__disabled:
                stepList == 1 || stepList == 2 || stepList == 3 || stepList == 4 ? false : true
            }"
          />
        </div>
        <div>
          <div class="title__step__log">{{ $t('claim.your_claim') }}</div>
          <p class="content__step__log">{{ $t('claim.content_step_1') }}</p>
        </div>
      </div>
      <div class="d-flex  title_step_claim">
        <div class="d-flex flex-column pr-16 align-items-center _is_step_claim">
          <div
            :class="{
              'rounded-circle': true,
              'py-2': true,
              'px-3': true,
              'text-white': true,
              text__step__log: true,
              bg__primary: stepList == 2 || stepList == 3 || stepList == 4 ? true : false,
              bg__disabled: stepList == 2 || stepList == 3 || stepList == 4 ? false : true
            }"
          >
            2
          </div>
          <div
            :class="{
              line: true,
              'h-100': true,
              bg__primary: stepList == 2 || stepList == 3 || stepList == 4 ? true : false,
              bg__disabled: stepList == 2 || stepList == 3 || stepList == 4 ? false : true
            }"
          />
        </div>
        <div>
          <div class="title__step__log">{{ $t('claim.upload') }}</div>
          <p class="content__step__log">{{ $t('claim.content_step_2') }}</p>
        </div>
      </div>
      <div class="d-flex title_step_claim">
        <div class="d-flex flex-column pr-16 align-items-center _is_step_claim">
          <div
            :class="{
              'rounded-circle': true,
              'py-2': true,
              'px-3': true,
              'text-white': true,
              text__step__log: true,
              bg__primary: stepList == 3 || stepList == 4 ? true : false,
              bg__disabled: stepList == 3 || stepList == 4 ? false : true
            }"
          >
            3
          </div>
          <div
            :class="{
              line: true,
              'h-100': true,
              bg__primary: stepList == 3 || stepList == 4 ? true : false,
              bg__disabled: stepList == 3 || stepList == 4 ? false : true
            }"
          />
        </div>
        <div>
          <div class="title__step__log">{{ $t('claim.details') }}</div>
          <p class="content__step__log">{{ $t('claim.content_step_3') }}</p>
        </div>
      </div>
      <div class="d-flex  title_step_claim">
        <div class="d-flex flex-column pr-16 align-items-center _is_step_claim">
          <div
            :class="{
              'rounded-circle': true,
              'py-2': true,
              'px-3': true,
              'text-white': true,
              text__step__log: true,
              bg__primary: stepList == 4 ? true : false,
              bg__disabled: stepList == 4 ? false : true
            }"
          >
            4
          </div>
          <div
            :class="{
              'd-none': true,
              line: true,
              'h-100': true,
              bg__primary: stepList == 4 ? true : false,
              bg__disabled: stepList == 4 ? false : true
            }"
          />
        </div>
        <div>
          <div class="title__step__log">{{ $t('claim.complete') }}</div>
          <p class="content__step__log">{{ $t('claim.content_step_4') }}</p>
        </div>
      </div>
      </div>
      <div class="step_claim_mobile mt-3" v-if="listClaimCreated.length === 0 || createStep != '7.1'">
        <div v-if="stepList == 3 && (createClaimStepInfor.balance || createClaimStepInfor.claimgroup == 1) && createStep != '3.1'">
          <div
            class="title__log__step mb-0"
            v-if="isShowBalance || createClaimStepInfor.claimTypeNameBalance"
          >
            {{ $t('claim.balance') }}
          </div>
          <div class="title__claim__money" v-if="isShowBalance || createClaimStepInfor.balance">
            {{_formatMoneyClaim(createClaimStepInfor.balance || getBalance())}}
          </div>
          <div class="title__claim__wallet" v-if="isShowBalance || createClaimStepInfor.balance">
            {{ getClaimTypeName() || createClaimStepInfor.claimTypeNameBalance }}
          </div>
        </div>
      </div>
    </div>
    <div class="d-flex justify-content-between align-items-center">
      <div class="title__log__step is_title_mobile_claim">{{ $t('claim.your_claim') }}</div>
      <div class="cursor_pointer title__log__step is_title_mobile_claim" @click="handleClose"><img width="20" src="@/assets/images/Vector.png"/></div>
    </div>
  </div>
</template>

<script>
  import { mapGetters, mapActions } from 'vuex';
  import { formatMoney } from '../../../utils/functions/formatMoney';

  export default {
    data: () => ({
      stepMobile: 1
    }),
    computed: {
      ...mapGetters('claim', [
        'stepList',
        'isBalance',
        'listClaimCreated',
        'listEligibleClaimType',
        'entitiesClaim',
        'entityActiveClaim',
        'activeOutpaitent',
        'listClaimGroup',
        'createClaimStepInfor',
        'listClaimType',
        'slectedOutpaitent',
        'createStep'
      ]),
      isShowBalance() {
        try {
          if (!this.entitiesClaim || !this.listEligibleClaimType) return false;
          if (!this.entitiesClaim[this.entityActiveClaim]) return false;
          const activeClaimType = this.listEligibleClaimType.find(
            e => e.claimtype == this.entitiesClaim[this.entityActiveClaim].claimtype
          );
          if (activeClaimType) {
            if (activeClaimType.balance == null) return false;
            return true;
          }
          return false;
        } catch (error) {
          return false;
        }
      }
    },
    watch: {
      stepList: function (newVal) {
        switch (newVal) {
          case 1.1:
          case 1.2:
          case 1.3:
          case 1.4:
          case 1: {
            this.stepMobile = 1;
            break;
          }
          case 2: {
            this.stepMobile = 2;
            break;
          }
          case 3: {
            this.stepMobile = 3;
            break;
          }
        }
      }
    },
    methods: {
      ...mapActions('claim',['setSelectedOutpaitent']),
      handleClose() {
        this.$router.push({name: 'claim'})
      },
      _previous() {
        if (this.stepMobile === 1) return;
        this.stepMobile = this.stepMobile - 1;
      },
      _next() {
        if (this.stepMobile === 3) return;
        this.stepMobile = this.stepMobile + 1;
      },
      _formatMoneyClaim(n) {
        return formatMoney(n, '$');
      },
      selectOutpaitent(id){
        this.setSelectedOutpaitent(id)
      },
      getBalance() {
        try {
          if (!this.entitiesClaim || !this.listEligibleClaimType) return;
          if (!this.entitiesClaim[this.entityActiveClaim]) return;
          const activeClaimType = this.listEligibleClaimType.find(
            e => e.claimtype == this.entitiesClaim[this.entityActiveClaim].claimtype
          );
          if (activeClaimType) return activeClaimType.balance;
          return 0;
        } catch (error) {
          console.log('getBalance', error);
          return 0;
        }
      },
      activeClaimName(val){
        if(val === '')
        {
          return 'New Claim'
        }
        const claimName = this.listClaimType.find(item => item.id == val);
        if(claimName) return claimName.name
        return ''
      },
      getClaimTypeName() {
        try {
          if (!this.entitiesClaim || !this.listEligibleClaimType) return;
          if (!this.entitiesClaim[this.entityActiveClaim]) return;
          const activeClaimType = this.listEligibleClaimType.find(
            e => e.claimtype == this.entitiesClaim[this.entityActiveClaim].claimtype
          );
          if (activeClaimType) return activeClaimType.claimtypename;
          return '';
        } catch (error) {
          return '';
        }
      },
      getClaimGroup() {
        const activeClaimGroup = this.listClaimGroup.find(
          e => e.id == this.createClaimStepInfor.claimgroup
        );
        if (activeClaimGroup) return activeClaimGroup.name;
        return '';
      }
    }
  };
</script>

<style scoped>
  @import '@/assets/css/claim/stepVertical.css';
  @import '@/assets/css/claim/create/sidebarMoreClaim.css';
  .is_title_mobile_claim{
    display: none;
  }
  .top-80 {
    top: 80px
  }

  .abc {
    display: flex;
    flex-direction: column-reverse;
  }
  @media screen and (max-width: 991px) {
    .abc {
      flex-direction: column;
    }

    .title__log__step{
      display: none;
    }
    .step_claim_mobile{
      display: flex;
    }
    .title_step_claim{
      flex-direction: column;
    width: 100%;
    align-items: center;
    }
    ._is_step_claim{
    width: 100%;
    position: relative;
    }
    .line{
    width: 100% !important;
    height: 3px !important;
    position: absolute;
    top: 50%;
    transform: translateX(50%);
    }
    .content__step__log{
      display: none;
    }
    .is_title_mobile_claim{
      display: block;
      padding-top: 30px;
    }
  }
</style>
