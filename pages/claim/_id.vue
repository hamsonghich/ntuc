<template>
  <div>
    <alert-success
      :alert="alert.textAlert"
      :isShow="alert.isShow"
      :type="alert.typeAlert"
      @handleCloseAlert="_handleCloseAlert"
    />
    <div class="container__log">
      <div class="cart__title text-40">{{ title }}</div>
      <div class="d-flex">
        <div class="cart__log">
          <div>
            <img
              @click="$router.push({ name: 'claim-claim-list' })"
              class="icon__close__dark icon__mobile cursor--pointer"
              src="@/assets/images/icon-close-dark.png"
              alt="icon-close-dark"
            />
          </div>
          <NonInsuranceClaimVer2
            :handleSetAlert="_handleSetAlert"
            v-if="group == '1'"
            :key="isLoading"
          />
          <InsuranceOutpatientClaim
            :myClaim="myClaim"
            :myAttachments="myAttachments"
            :handleSetAlert="_handleSetAlert"
            v-if="group == '2'"
          />
          <InsuranceInpatientClaim
            :myClaim="myClaim"
            :handleSetAlert="_handleSetAlert"
            v-if="group == '3'"
          />
        </div>
        <div style="cursor: pointer">
          <img
            @click="$router.push({ name: 'claim-claim-list' })"
            class="icon__close__dark"
            src="@/assets/images/icon-close-dark.png"
            alt="icon-close-dark"
          />
        </div>
      </div>
    </div>
    <step-loading-page :show="showLoading"/>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import NonInsuranceClaim from '~/components/claim/edit/nonInsuranceClaim.vue';
import NonInsuranceClaimVer2 from '~/components/claim/edit/nonInsuranceClaimVer2.vue';
import InsuranceOutpatientClaim from '~/components/claim/edit/insuranceOutpatientClaim.vue';
import InsuranceInpatientClaim from '~/components/claim/edit/insuranceInpatientClaim.vue';
import stepLoadingPage from '@/components/stepLoadingPage/index.vue';
export default {
  components: {
    NonInsuranceClaim,
    InsuranceOutpatientClaim,
    InsuranceInpatientClaim,
    NonInsuranceClaimVer2,
    stepLoadingPage
  },
  layout: 'first-time-login',
  data: () => ({
    alert: {
      isShow: false,
      typeAlert: 'success',
      textAlert: ''
    },
    group: 0,
    isLoading: false,
    title: '',
    payment: null
  }),
  computed: {
    ...mapGetters('claim', ['myClaim', 'myAttachments', 'showLoading'])
  },
  created(){
    this.setMyClaimEdit({});
  },
  async fetch() {
    this.handleSetLoading(true)
    const resListTab = await this.getListTab({
      invoke: 'System.execute',
      argc: '2',
      a0: 'API.Autocomplete.Select',
      a1: {
        module: '15'
      }
    });
    resListTab.forEach(item => {
      if (this.$route.query.group == 3 && item.id == 4) {
        this.title = item.name;
      }
      if (this.$route.query.group == 2 && item.id == 2) {
        this.title = item.name;
      }
      if (this.$route.query.group == 1 && item.id == 1) {
        this.title = item.name;
      }
    });
    this.isLoading = true;
    this.payment = this.$route.query.payment;
    this.group = this.$route.query.group;
    await this.showdataQuote(this.group.toString());
    this.isLoading = false;
  },
  methods: {
    ...mapActions('claim', ['handleMyClaim', 'handleMyAttachments', 'getListTab', 'handleLoadSettlement', 'setMyClaimEdit', 'handleSetLoading']),
    _handleCloseAlert() {
      this.alert.isShow = false;
    },
    openAlert(e) {
      this.alert.isShow = true;
      this.alert.typeAlert = e.type;
      this.alert.textAlert = e.title;
    },
    _handleSetAlert(alert) {
      this.alert = alert;
    },
    async showdataQuote(tab) {
      switch (tab) {
        case '1': {
          await this.handleMyClaim({
            invoke: 'System.execute',
            argc: '2',
            a0: 'ClaimApplied.getClaimDetail',
            a1: {
              claimappliedid: this.$route.params.id,
              attachments: '1'
            }
          });
          await this.handleMyAttachments({
            invoke: 'System.execute',
            argc: '2',
            a0: 'API.ClaimApplied.GetClaims',
            a1: {
              id: this.$route.params.id,
              mode: '0'
            }
          });
          break;
        }
        case '2': {
          await this.handleMyClaim({
            invoke: 'System.execute',
            argc: '2',
            a0: 'InsuranceClaim.getClaimDetail',
            a1: {
              claimappliedid: this.$route.params.id,
              attachments: '1'
            }
          });
          await this.handleMyAttachments({
            invoke: 'System.execute',
            argc: '2',
            a0: 'API.ClaimApplied.GetClaims',
            a1: {
              id: this.$route.params.id,
              mode: '1'
            }
          });
          break;
        }
        case '3': {
          await this.handleMyClaim({
            invoke: 'System.execute',
            argc: '2',
            a0: 'PolicyClaimApplied.getClaimDetail',
            a1: {
              claimappliedid: this.$route.params.id,
              attachments: '1'
            }
          });
          if (this.payment) {
            await this.handleLoadSettlement({
              invoke: 'System.execute',
              argc: '2',
              a0: 'PolicyClaimApplied.LoadSettlement',
              a1: {
                paymentid: this.payment
              }
            });
          }
          break;
        }
      }
    }
  },
  watch: {
    alert(val) {
      if(val.isShow) window.scrollTo({ top: 0, behavior: 'smooth' });
    },
  }
};
</script>

<style scoped>
@import '@/assets/css/claim/id.css';
</style>
