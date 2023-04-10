<template>
  <div class="d-flex justify-content-between wrapper__mobile__step h-100">
    <div :class="{'wrapper__content__log__one--one': true, 'wrapper__content__one--two': createStep == 1.2 ? true : false}">
      <div :class="{'wrapper__content__one--one': true}">
        <div v-if="createStep == 1.1">
          <div class="title__log title__log__one text-40">
            {{$t('log.great')}} ...
          </div>
          <div class="question__log__one--one question__claim__one--one">{{$t('claim.question_one')}}</div>
          <div class="wrapper_checkbox_log__supp">
            <div>
              <input v-model="isCheckYesNo" value="1" id="Myself" class="checkbox_log" type="radio" />
              <label for="Myself" class="label_checkbox_log">{{$t('yes')}}</label>
            </div>
            <div>
              <input v-model="isCheckYesNo" value="0" id="Elizabeth Mary Chan" class="checkbox_log" type="radio" />
              <label for="Elizabeth Mary Chan" class="label_checkbox_log">{{$t('no')}}</label>
            </div>
          </div>
        </div>
        <div v-if="createStep == 1.2">
          <div class="title__log title__log__one text-40">
            {{$t('ok')}} ...
          </div>
          <div class="question__log__one--one question__claim__one--one">{{$t('claim.question_two')}}</div>
          <div :class="{'wrapper_checkbox_log__supp': true, 'mb--50': createStep == 1.2 ? true : false}">
            <div v-if="chooseLog[0]" class="title__selector">
              {{$t('claim.selected_letter_of_guarantee')}}
            </div>
            <ChooseLog v-if="chooseLog[0]" :isClaim="true" />
            <div class="title__log title__log__one title__claim__table">
              {{$t('claim.your_log')}}
            </div>
            <!-- <TableClaim :isClaim="true" /> -->
            <div v-if="listClaims[0]" class="d-flex justify-content-end mt-30">
              <paginate
                :page-count="paginateDefault.pageCount"
                :page-range="paginateDefault.pageRange"
                :click-handler="_handlePagination"
                :prev-text="paginateDefault.prevText"
                :next-text="paginateDefault.nextText"
                :container-class="paginateDefault.containerClass"
                :page-class="paginateDefault.pageClass"
              >
              </paginate>
            </div>
          </div>
        </div>
      </div>
      <div class="wrapper__button__filter__one--one d-flex justify-content-between">
        <button type="button" @click="_back" class="btn btn__claim button__log btn__claim__back">
          {{$t('back')}}
        </button>
        <button type="button" @click="_next" class="btn btn__claim button__log">
          {{
            createStep == 1.2 && !chooseLog[0]
              ? $t('select')
              : $t('next')
          }}
        </button>
      </div>
    </div>
    <quoteClaim v-if="createStep == 1.1"/>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import selectCustom from '~/components/selectCustom/selectCustom.vue';
import datePicker from 'vue-bootstrap-datetimepicker';
// import TableClaim from '~/components/log/tableClaim.vue';
import ChooseLog from '~/components/claim/chooseLog.vue';
import { PAGINATE } from '~/utils/constants/paginate.js';
import quoteClaim from './quoteClaim.vue'

import 'bootstrap/dist/css/bootstrap.css';
import 'pc-bootstrap4-datetimepicker/build/css/bootstrap-datetimepicker.css';

export default {
  components: {
    selectCustom,
    datePicker,
    // TableClaim,
    ChooseLog,
    quoteClaim,
  },
  data: () => ({
    options: {
      format: 'DD MMM YYYY',
      useCurrent: false,
    },
    isCheckYesNo: 1,
    paginateDefault: PAGINATE,
    alert: {
      isShow: false,
      typeAlert: 'success',
      textAlert: '',
    },
  }),
  watch: {
    dataClaims: function (newValue) {
      if (newValue) {
        this.paginateDefault.pageCount = Math.ceil(newValue.length / PAGINATE.pageRange);
      }
    },
  },
  computed: {
    ...mapGetters('claim', [
      'createStep',
      'chooseLog',
    ]),
    ...mapGetters('log', [
      'dataClaims',
      'listClaims',
      'isCancelLog',
    ]),
  },
  methods: {
    ...mapActions('claim', [
      'setCreateClaimStep',
      'handleChooseLog',
      '_setStepList',
      'getInpatientClaims',
    ]),
    ...mapActions('log', [
      'handleCurrentPage',
      'changeIsCancelLog',
    ]),
    ...mapActions('notification', [
      'getBroker',
    ]),
    ...mapActions('alert', [
      '_changeAlertConfig',
    ]),
    _handlePagination: function (_currentPage) {
      this.handleCurrentPage(_currentPage);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    },
    _handleColeAlert() {
      this.alert.isShow = false;
      this.changeIsCancelLog(1);
    },
    _back() {
      switch(this.createStep) {
        case 1.1: {
          this.setCreateClaimStep(4);
          window.scrollTo({ top: 0, behavior: 'smooth' });
          break;
        }
        case 1.2: {
          this.setCreateClaimStep(1.1);
          window.scrollTo({ top: 0, behavior: 'smooth' });
          break;
        }
      }
    },
    async _next () {
      switch(this.createStep) {
        case 1.1: {
          if (Number(this.isCheckYesNo)) {
            this.setCreateClaimStep(1.2);
            window.scrollTo({ top: 0, behavior: 'smooth' });
          } else {
            this._setStepList(2);
            this.setCreateClaimStep(2.1);
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }
          this.handleChooseLog([]);
          break;
        }
        case 1.2: {
            if (this.chooseLog[0]) {
              this._setStepList(2);
              this.setCreateClaimStep(2.1);
            }
          break;
        }
        default: {
          this.setCreateClaimStep(1.1);
          break;
        }
      }
    },
  },
  mounted() {
    this.handleChooseLog([]);
    this._changeAlertConfig({
      isShow: false,
      typeAlert: 'warning',
      textAlert: ""
    });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  },
  destroyed() {
    this.handleCurrentPage([]);
  }
}
</script>

<style scoped>
@import '@/assets/css/inputCustom/inputCustom.css';
@import '@/assets/css/claim/stepOneLog.css';
@import '@/assets/css/claim/stepOne.css';
</style>
