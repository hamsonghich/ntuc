<template>
  <div class="d-flex justify-content-between h-100 LoaderClaim">
    <div class="wrapper__content__quick__log">
      <div class="wrapper__content">
        <div class="title__quick__log text-NTUC-1">{{ $t('claim.Excellent') }}</div>
        <div class="question__quick__log text-NTUC-1">Your claim is underway ...</div>
        <div class="question__quick__log_2 mb-3">
          <span style="color: var(--gray-900)">{{ $t('claim.ref_claim') }} <span style="color: var(--NTUC-1)">{{ entitiesClaim[0].referenceno }}</span></span>
        </div>
        <div
          class="question__quick__log_2"
          style="white-space: pre-line, color: var(--gray-900)"
          v-if="entitiesClaim[0].message"
        >
          {{ entitiesClaim[0].message }}
        </div>
        <div class="question__quick__log_2">
          <div class="first_claim_noti_content">
            <span class="claim_print" @click="_handlePrint()"
              >{{ $t('claim.print_copy') }}&ensp;<b-icon icon="printer"
            /></span>
          </div>
        </div>
        <div
          v-if="createClaimStepInfor.oneOrMul == 1"
          class="wrapper_checkbox_quick_log question__quick__log_2"
        >
          {{ $t('claim.content_four') }}
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
export default {
  components: {
    quoteClaim
  },
  computed: {
    ...mapGetters('claim', ['createClaimStepInfor', 'entitiesClaim', 'entityActiveClaim']),
    empId: () => localStorage.getItem('empid')
  },
  mounted() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    this._changeAlertConfig({
      isShow: true,
      typeAlert: 'success',
      textAlert: 'Your claims submission is successful'
    });
    this._setStepList(4);
  },
  methods: {
    ...mapActions('log', ['getLinkPrint']),
    ...mapActions('alert', ['_changeAlertConfig']),
    ...mapActions('claim', [
      '_setStepList',
      'setCreateClaimStep',
      'setCreateStepClaimInfor',
      'entitiesClaim'
    ]),
    _goHome() {
      this.$router.push('/dashboard');
    },
    _closeForm() {
      this.$router.push('/claim/claim-list');
    },
    _addMore() {
      this.setCreateStepClaimInfor({
        claimantName: this.createClaimStepInfor.claimantName,
        incurreddate: this.createClaimStepInfor.incurreddate
      });
      this._setStepList(1);
      this.setCreateClaimStep(4);
    },
    // async _handlePrint() {
    //   if (!this.entitiesClaim) return;

    //   try {
    //     const id = this.entitiesClaim[this.entityActiveClaim].id;
    //     await this.getLinkPrint({
    //       invoke: 'System.execute',
    //       argc: '2',
    //       a0: 'API.preparePrint',
    //       a1: {
    //         id: id,
    //         empid: this.empId,
    //         mode: 1
    //       }
    //     });
    //   } catch (error) {
    //     console.log('_handlePrint' + error);
    //   }
    // },
    async _handlePrint() {
      if (!this.entitiesClaim) return;
      const id = this.entitiesClaim[this.entityActiveClaim].id;
      var a1 = {
        reportName: 'claim_form',
        parameters: { WHERE: [{ field: 'ca.Id', op: '=', value: id }] },
        format: 'pdf'
      };
      document.getElementById('fmReport_a1').value = JSON.stringify(a1);
      var fm = document.getElementById('fmReport');
      fm.action = `${process.env.API_URL}/out/report.pdf`;
      window.open(
        'about:blank',
        'Reports',
        'location=no,menubar=no,resizable=yes,scrollbars=no,status=no,toolbar=no,width=800,height=600'
      );
      fm.target = 'Reports';
      var csrftoken = localStorage.getItem('sxcsrftoken');
      if (csrftoken == null) csrftoken = '';
      document.getElementById('fmReport_csrf').value = csrftoken;
      fm.submit();
      document.getElementById('fmReport_csrf').value = '';
    }
  }
};
</script>

<style scoped>
@import '@/assets/css/claim/create/successClaim.css';
@import '@/assets/css/inputCustom/inputCustom.css';
@import '@/assets/css/claim/create/firstClaim.css';
@import '@/assets/css/quick-log/stepContent.css';
@import '@/assets/css/claim/create/loader-claim.css';
.icon__house {
  width: 16px;
  height: 16px;
  margin-right: 8px;
}

.question__quick__log_2 {
  color: var(--color-black);
  white-space: pre-line;
}

@media (max-width: 991px) {
  .wrapper__content {
    padding: 0;
  }
}
</style>
