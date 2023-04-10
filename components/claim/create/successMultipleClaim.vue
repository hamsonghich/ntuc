<template>
  <div class="d-flex justify-content-between h-100">
    <div class="wrapper__content__quick__log">
      <div class="wrapper__content">
        <div class="title__quick__log">
          {{ createStep == 7.3 ? 'Excellent !...' : $t('claim.Completed') }}
        </div>
        <div class="question__quick__log mb-3">
          {{ $t('claim.ref_claim') }} <span style="color: var(--NTUC-1);">{{createdOneClaim.claim_data.name }}</span>
        </div>
        <div class="question__quick__log_ref">{{ createdOneClaim.claim_response.message }}</div>
        <div class="wrapper_checkbox_log__supp wrapper_checkbox_quick_log">
          <div class="first_claim_noti_content" @click="_handlePrint">
            <span class="claim_print text-NTUC-1"
              >{{ $t('claim.print_copy') }}<b-icon class="pl-2 text-20" icon="printer"
            /></span>
          </div>
          <div v-if="createClaimStepInfor.oneOrMul !== 0" class="pt-4">
            {{ $t('claim.end_session') }}
          </div>
        </div>
      </div>
      <div class="quick-log-btn d-flex justify-content-between pt-4">
        <button
          type="button"
          @click="_createMore"
          class="btn btn__claim button__log ml-0"
        >
          <b-icon class="icon__house" icon="plus-square"></b-icon>
          Add More
        </button>
        <button
          v-if="createClaimStepInfor.oneOrMul === 0"
          type="button"
          @click="_closeClaim"
          class="btn btn__claim button__log"
        >
          Close
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
    data: () => ({
      checkEmail: false,
      checkMobilePhone: false,
      checkBoth: false,
      listCheckBox: [],
      isNext: false,
      value: '',
      email: {
        isCheck: false,
        value: ''
      },
      mobilePhone: {
        isCheck: false,
        value: ''
      }
    }),
    computed: {
      ...mapGetters('claim', ['createStep', 'createClaimStepInfor', 'createdOneClaim'])
    },
    created() {
      this._setStepList(4);
    },
    methods: {
      ...mapActions('claim', ['setCreateClaimStep', 'setCreateStepClaimInfor', '_setStepList']),
      ...mapActions('log', ['getLinkPrint']),
      _goHome() {
        this.$router.push('/dashboard');
      },
      _createMore() {
        this.setCreateStepClaimInfor({});
        this._setStepList(1);
        this.setCreateClaimStep(1);
      },
      _closeClaim() {
        this.$router.push('/claim/claim-list');
      },
      async _handlePrint() {
        try {
          const id = this.createdOneClaim.claim_data.id;
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
        } catch (error) {
          console.log('_handlePrint' + error);
        }
      }
    }
  };
</script>

<style scoped>
  @import '@/assets/css/inputCustom/inputCustom.css';
  @import '@/assets/css/claim/create/firstClaim.css';
  @import '@/assets/css/quick-log/stepContent.css';

  .question__quick__log {
    color: var(--color-black);
    white-space: pre-line;
  }
  .question__quick__log_ref {
    padding: 10px 0 20px;
    font-family: Ubuntu-Light, Tahoma, sans-serif;
    font-style: normal;
    font-weight: 300;
    font-size: 16px;
    line-height: 120%;
    color: #000000;
  }
  ._text_ref_claim {
    color: #000000;
  }
  .btn_goHome:hover {
    color: #fff !important;
    text-decoration: inherit !important;
  }
  .icon__house {
  width: 16px;
  height: 16px;
  margin-right: 8px;
}
@media (max-width: 991px) {
  .wrapper__content {
    padding: 0
  }
}
  @media (max-width: 991px) {
    .wrapper__content {
      padding: 0;
    }
  }
</style>
