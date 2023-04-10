<template>
  <div class="d-flex justify-content-between h-100">
    <div class="wrapper__content__quick__log">
      <div class="wrapper__content">
        <div class="title__quick__log text-NTUC-1">{{ $t('claim.Excellent') }}</div>
        <div class="question__quick__log text-NTUC-1">Your claim is underway ...</div>
        <div class="wrapper_checkbox_log__supp wrapper_checkbox_quick_log">
          <div class="success_claim_menu" v-for="(claim, index) in entitiesClaim" :key="index">
            <div class="menu_label_bd">
              <div class="mn_bdb">
                <div class="menu_label">{{ claim.claimtypename || formatClaimName(claim) }}</div>
              </div>
            </div>
            <div class="w-100" v-if="claim.isError">
              <div class="mn_bdb">
                <div class="menu_content menu_content_error">Claim failed to be submitted</div>
              </div>
            </div>
            <div class="w-100" v-else>
              <div class="mn_bdb">
                <div class="menu_content">{{ claim.name || claim.referenceno }}</div>
              </div>
            </div>
          </div>
          <div class="first_claim_noti_content">
            <span class="claim_print" @click="_handlePrint()"
              >{{ $t('claim.print_copy') }}&ensp;<b-icon-printer
            /></span>
          </div>
        </div>
      </div>
      <div class="quick-log-btn d-flex justify-content-between pt-4">
        <button type="button" @click="_addMore" class="btn btn__claim button__log">
          {{ $t('claim.add_more') }}
        </button>
      </div>
    </div>
    <quoteClaim />
    <form id="fmReport" method="post">
      <input type="hidden" name="csrf_token" id="fmReport_csrf" value="" />
      <input type="hidden" name="invoke" id="invoke" value="System.execute" />
      <input type="hidden" name="argc" id="argc" value="3" />
      <input type="hidden" name="a0" id="a0" value="report.print" />
      <input type="hidden" name="a1" id="fmReport_a1" value="" />
    </form>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import quoteClaim from '../quoteClaim.vue';
import { formatMoneyClaim } from '@/utils/functions/formatMoney';

export default {
  components: {
    quoteClaim
  },
  data() {
    return {
      reRenderSidebar: 0
    };
  },
  computed: {
    ...mapGetters('claim', [
      'entitiesClaim',
      'entityActiveClaim',
      'listEligibleClaimType',
      'createClaimStepInfor'
    ]),
    empName: () => localStorage.getItem('empName'),
    empId: () => localStorage.getItem('empid')
  },
  mounted() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    this.handleShowAlert();
    this._setStepList(4);
  },
  methods: {
    ...mapActions('claim', [
      'setCreateClaimStep',
      'setCreateStepClaimInfor',
      'handleListCurrency',
      'handleListReferral',
      'handleListEligibleClaimType',
      'setEntitiesClaim',
      'setEntityActiveClaim',
      '_setStepList',
      'setListClaimCreated'
    ]),
    ...mapActions('log', ['getLinkPrint']),
    ...mapActions('alert', ['_changeAlertConfig']),

    formatClaimIncurredamt(claim) {
      if (claim.incurredamt) return formatMoneyClaim(claim.incurredamt);
      return 0;
    },
    formatClaimName(claim) {
      const found = this.listEligibleClaimType.find(
        element => element.claimtype == claim.claimtype
      );
      if (found) return found.claimtypename ?? 'New claim';
      return 'New Claim';
    },
    async _handlePrintById(id) {
      if (!this.entitiesClaim) return;
      var a1 = {
        reportName: 'claim_form',
        parameters: { WHERE: [{ field: 'ca.Id', op: 'IN', value: id }] },
        format: 'pdf'
      };
      document.getElementById('fmReport_a1').value = JSON.stringify(a1);
      var fm = document.getElementById('fmReport');
      fm.action = `${process.env.API_URL}/out/report.pdf`;
      window.open(
        'about:blank',
        `Reports ${id}`,
        'location=no,menubar=no,resizable=yes,scrollbars=no,status=no,toolbar=no,width=800,height=600'
      );
      fm.target = `Reports ${id}`;
      var csrftoken = localStorage.getItem('sxcsrftoken');
      if (csrftoken == null) csrftoken = '';
      document.getElementById('fmReport_csrf').value = csrftoken;
      fm.submit();
      document.getElementById('fmReport_csrf').value = '';
    },
    async _handlePrint() {
      if (!this.entitiesClaim) return;
      try {
        // for await (const claim of this.entitiesClaim) {
        //   if(!claim.isError) await this._handlePrintById(claim.id);
        // }
        const arrId = Array.from(this.entitiesClaim, claim => claim.id);
        var a1 = {
          reportName: 'claim_form',
          parameters: { WHERE: [{ field: 'ca.Id', op: 'IN', value: arrId }] },
          format: 'pdf'
        };
        document.getElementById('fmReport_a1').value = JSON.stringify(a1);
        var fm = document.getElementById('fmReport');
        fm.action = `${process.env.API_URL}/out/report.pdf`;
        window.open(
          'about:blank',
          `Reports`,
          'location=no,menubar=no,resizable=yes,scrollbars=no,status=no,toolbar=no,width=800,height=600'
        );
        fm.target = `Reports`;
        var csrftoken = localStorage.getItem('sxcsrftoken');
        if (csrftoken == null) csrftoken = '';
        document.getElementById('fmReport_csrf').value = csrftoken;
        fm.submit();
        document.getElementById('fmReport_csrf').value = '';
      } catch (error) {
        console.log('_handlePrint' + error);
      }
    },
    handleShowAlert() {
      const errorClaimCount = this.entitiesClaim.filter(e => e.isError).length;
      if (errorClaimCount == 0) {
        this._changeAlertConfig({
          isShow: true,
          typeAlert: 'success',
          textAlert: 'Your claims submission is successful'
        });
      } else if (errorClaimCount == 1) {
        this._changeAlertConfig({
          isShow: true,
          typeAlert: 'error',
          textAlert:
            'One of your claims was unable to be created. Please try to submit the claim again.'
        });
      } else if (errorClaimCount > 1 && errorClaimCount < this.entitiesClaim.length) {
        this._changeAlertConfig({
          isShow: true,
          typeAlert: 'error',
          textAlert:
            'Some of your claims was unable to be created. Please try to submit the claim again.'
        });
      } else {
        this._changeAlertConfig({
          isShow: true,
          typeAlert: 'error',
          textAlert:
            'All of your claims was unable to be created. Please try to submit the claim again.'
        });
      }
    },
    _addMore() {
      this.setCreateStepClaimInfor({
        claimantName: this.createClaimStepInfor.claimantName,
        incurreddate: this.createClaimStepInfor.incurreddate
      });
      this._setStepList(2);
      this.setCreateClaimStep(4);
    },
    _goHome() {
      this.$router.push('/dashboard');
    },
    _closeForm() {
      this.$router.push('/claim/claim-list');
    }
  }
};
</script>

<style scoped>
@import '@/assets/css/claim/create/successClaim.css';
@import '@/assets/css/inputCustom/inputCustom.css';
@import '@/assets/css/claim/create/firstClaim.css';
@import '@/assets/css/quick-log/stepContent.css';

.menu_content_error {
  background: var(--negative-100);
  color: var(--negative-600);
}

@media (max-width: 991px) {
  .wrapper__content {
    padding: 0;
  }
}

.icon__house {
  width: 16px;
  height: 16px;
  margin-right: 8px;
}
</style>
