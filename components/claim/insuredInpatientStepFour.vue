<template>
  <div class="d-flex justify-content-between wrapper__mobile__step h-100">
    <div class="wrapper__content__log__three w-100">
      <div>
        <div class="title__log title__log__three">{{$t('claim.Excellent')}} !...</div>
        <div class="question__quick__log text-NTUC-1">Your claim is underway ...</div>
        <p class="question__log__three mt--60">{{$t('claim.claim_ref')}}<strong class="question__log__bold">{{claim.claim_data.name}}</strong>.</p>
        <p class="question__log__three">{{claim.claim_response.message}}</p>
        <div @click="_handlePrint(claim.claim_data.id, claim.claim_data.employee, claim.claim_data.claimgroup, claim.claim_data.insurer)" class="d-flex wrapper__print">
          <div class="text__print__log cursor--pointer">{{$t('log.print_a_copy')}}</div>
          <img
            class="icon__printer cursor--pointer text-NTUC-1"
            src="@/assets/images/printer.svg" alt="printer"
          >
        </div>
        <p v-if="this.createClaimStepInfor && this.createClaimStepInfor.oneOrMul == 1" class="question__log__three" style="margin-bottom: 172px">{{$t('claim.content_four')}}</p>
      </div>
      <div class="wrapper__button__filter__one--one d-flex justify-content-between">
        <button type="button" @click="_addMoreOrClose" class="btn btn-primary button__log btn__claim__home d-flex align-items-center ml-0">
          <b-icon class="icon__house" icon="plus-square"></b-icon>
            {{$t('claim.add_more')}}
        </button>
      </div>
    </div>
    <quoteClaim/>
    <form id="fmReport" method="post">
      <input type="hidden" name="csrf_token" id="fmReport_csrf" value="">
      <input type="hidden" name="invoke" id="invoke" value="System.execute">
      <input type="hidden" name="argc" id="argc" value="3">
      <input type="hidden" name="a0" id="a0" value="report.print">
      <input type="hidden" name="a1" id="fmReport_a1" value="">
    </form>
  </div>
</template>

<script>
import { mapGetters, mapActions, mapMutations } from 'vuex';
import selectCustom from '~/components/selectCustom/selectCustom.vue';
import quoteClaim from './quoteClaim.vue'

export default {
  components: {
    selectCustom,
    quoteClaim,
  },
  data: () => ({}),
  computed: {
    ...mapGetters('claim', [
      'createStep',
      'claim',
      'createClaimStepInfor',
      'isCreateClaim',
    ]),
    ...mapMutations('claim', [
      'SET_IS_CREATE_CLAIM',
    ]),
  },
  methods: {
    ...mapActions('log', [
      'getLinkPrint',
    ]),
    ...mapActions('claim', [
      'setCreateClaimStep',
      '_setStepList',
    ]),
    ...mapActions('alert', ['_changeAlertConfig']),
    ...mapActions('claim', ['setCreateStepClaimInfor']),
    _redirectHome() {
      this.$router.push({ name: 'dashboard' });
      this.setCreateClaimStep(1);
      this._setStepList(1);
    },
    _addMoreOrClose() {
      this.setCreateStepClaimInfor({
        claimantName: this.createClaimStepInfor.claimantName,
        incurreddate: this.createClaimStepInfor.incurreddate
      });
      this._setStepList(2);
      this.setCreateClaimStep(4);
    },
    _close () {
      this.$router.push({ name: 'claim-claim-list' });
      this.setCreateClaimStep(1.1);
      this._setStepList(1);
    },
    async _handlePrint(id, empID, claimgroup, insurer=null) {
      // try {
      //  await this.getLinkPrint({
      //     "invoke": "System.execute",
      //     "argc": "2",
      //     "a0": "API.preparePrint",
      //     "a1": {
      //       "id": id,
      //       "empid": localStorage.getItem('empid'),
      //       "mode": 1,
      //     }
      //   });
      // } catch (error) {
      //   console.log('_handlePrint' + error);
      // }
      let a1 = {}
      if( claimgroup == 1 || claimgroup == 2 ){
        a1 = {
          "reportName": 'claim_form',
          "parameters": { "WHERE":[{ "field":"ca.Id", "op":"=", "value":id }] },
          "format": 'pdf'
        };
      }else if( claimgroup == 4 ){
        a1 = {
          "reportName": 'policy_claim_form',
          "parameters":{ "WHERE": [{ "field":"pca.id", "op":"=", "value":id }], "insurer":parseInt( insurer ) },
          "format": 'pdf'
        };
      }else{
        this.handleChangeAlert({
          isShow: true,
          typeAlert: 'warning',
          textAlert: "Invalid claim group"
        })
      }
      document.getElementById("fmReport_a1").value = JSON.stringify(a1);
      var fm = document.getElementById('fmReport');
      fm.action = `${process.env.API_URL}/out/report.pdf`;
      window.open('about:blank', 'Reports', 'location=no,menubar=no,resizable=yes,scrollbars=no,status=no,toolbar=no,width=800,height=600');
      fm.target = 'Reports';
      var csrftoken = localStorage.getItem('sxcsrftoken');
      if (csrftoken == null)
        csrftoken = "";
      document.getElementById("fmReport_csrf").value = csrftoken;
      fm.submit();
      document.getElementById("fmReport_csrf").value = "";
    },
  },
  created(){
    this._changeAlertConfig({
      isShow: false,
      typeAlert: 'warning',
      textAlert: ""
    });
  }
}
</script>

<style scoped>
@import '@/assets/css/inputCustom/inputCustom.css';
@import '@/assets/css/claim/stepThree.css';
@import '@/assets/css/claim/stepOne.css';
.question__log__three{
  white-space: pre-line;
}
</style>
