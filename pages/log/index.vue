<template>
  <div class="wrapper-box-log-main w-100">
    <div class="container__claim-log--support-mb w-100 br--15 pt--20 pl--10">
      <p class="title text-18 font__bold mb--20 w--235">
        {{ $t('claim.log_support') }}
      </p>
      <p class="title__item text-13 mb-0">
        {{ $t('claim.log_technical_issues') }}
      </p>
      <a class="text-13 mb-0" href="mailto:support@benefitsolutions.com.sg">
        support@benefitsolutions.com.sg
      </a>
      <p class="title__item text-13 mb-0">
        {{ $t('claim.log_all_other_matters') }}
      </p>
      <a class="text-13 mb-0" href="mailto:support@income.com.sg"> support@income.com.sg </a>
    </div>
    <div class="d-flex justify-content-between w-100 container-log-list">
      <div class="container__log w-100 bg-NTUC-7 my-0 mx-auto bg-white p--20">
        <div class="d-flex align-items-center">
          <div class="text-24 font-500 font__regular mb--25">
            {{ $t('claim.my_log_requests') }}
          </div>
        </div>
        <div class="d-flex text-16 font-400 line-height-15 mb--25">
          <div class="text-ct-gray font-400 text-16">
            {{ $t('claim.my_log_requests_subtitle_1') }}
          </div>
        </div>
        <div class="mt-25">
          <div class="">
            <ControlLog />
            <div class="block--25 w-100"></div>
            <TableLog />
          </div>
        </div>
        <div v-if="listClaims[0]" class="d-flex justify-content-end mb-20 mt--30">
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
      <div class="container__claim-log--support w-100 br--15 pt--20 pl--10 box-log-support-des">
        <p class="title text-18 font__bold mb--20 w--235">
          {{ $t('claim.log_support') }}
        </p>
        <p class="title__item text-13 mb-0">
          {{ $t('claim.log_technical_issues') }}
        </p>
        <a class="text-13 mb-0" href="mailto:support@benefitsolutions.com.sg">
          support@benefitsolutions.com.sg
        </a>
        <p class="title__item text-13 mb-0">
          {{ $t('claim.log_all_other_matters') }}
        </p>
        <a class="text-13 mb-0" href="mailto:support@income.com.sg"> support@income.com.sg </a>
      </div>
    </div>
  </div>
</template>

<script>
  import { mapGetters, mapActions } from 'vuex';
  import TableLog from '~/components/log/tableLog.vue';
  import ControlLog from '~/components/log/controlLog.vue';
  import { PAGINATE_10 } from '~/utils/constants/paginate.js';

  export default {
    components: {
      TableLog,
      ControlLog
    },
    data: () => ({
      paginateDefault: PAGINATE_10,
      alert: {
        isShow: false,
        typeAlert: 'success',
        textAlert: ''
      },
      textTooltipTitle:
        'You can view your past Letter of Guarantee requests here and whether they have have been approved or not',
      resBroker: {}
    }),
    computed: {
      ...mapGetters('log', ['dataClaims', 'listClaims', 'isCancelLog', 'information', 'listlogAll']),
      ...mapGetters('alert', ['alertConfig'])
    },
    async created() {
      this.handleBrokerDetails();
      this.changeInformation({
        invoke: 'System.execute',
        argc: '2',
        a0: 'API.LOG.getInformation'
      });
      if (this.isCancelLog == 2) {
        this._changeAlertConfig({
          isShow: true,
          typeAlert: 'success',
          textAlert: this.$t('log.successful_cancel')
        });
        window.scrollTo({ top: 0, behavior: 'smooth' });
        this.changeIsCancelLog(1);
      } else if (this.isCancelLog == 3) {
        const resBroker = await this.getBroker({
          invoke: 'System.execute',
          argc: '2',
          a0: 'API.Broker.Get'
        });
        this._changeAlertConfig({
          isShow: true,
          typeAlert: 'error',
          textAlert: this.$t('log.cancel_error', { supEmail: resBroker.email })
        });
        window.scrollTo({ top: 0, behavior: 'smooth' });
        this.changeIsCancelLog(1);
      }
    },
    mounted() {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    },
    methods: {
      ...mapActions('log', ['handleCurrentPage', 'changeIsCancelLog', 'changeInformation']),
      ...mapActions('notification', ['getBroker']),
      ...mapActions('alert', ['_changeAlertConfig', 'handleCloseCreateAlert']),
      _handlePagination: function (_currentPage) {
        this.handleCurrentPage(_currentPage);
        window.scrollTo({ top: 0, behavior: 'smooth' });
      },
      _handleColeAlert() {
        this.alert.isShow = false;
        this.changeIsCancelLog(1);
      },
      async handleBrokerDetails() {
        this.resBroker = await this.getBroker({
          invoke: 'System.execute',
          argc: '2',
          a0: 'API.Broker.Get'
        });
      }
    },
    watch: {
      dataClaims: function (newValue) {
        if (newValue) {
          this.paginateDefault.pageCount = Math.ceil(newValue.length / PAGINATE_10.pageRange);
        }
      }
    },
    destroyed() {
      this.alert.isShow = false;
      this.handleCloseCreateAlert();
      this._changeAlertConfig({
        isShow: false,
        typeAlert: 'success',
        textAlert: ''
      });
    }
  };
</script>

<style>
  @import '@/assets/css/log/paginateLog.css';
  @import '@/assets/css/log/logList.css';
  @import '@/assets/css/log/controlLog.css';

  .styleLogFilter {
    border: 1px solid rgba(0, 0, 0, 0.42) !important;
    border-radius: 4px !important;
    background: var(--white) !important;
    padding: 8px 12px;
    height: 32px !important;
    font-size: 14px;
    width: 240px !important;
  }

  .styleLogFilter input {
    position: absolute;
    top: 0;
    left: 0;
    height: 32px !important;
    border-bottom: 0 !important;
    font-size: 14px;
    background: unset !important;
  }

  .bg-white {
    background: 'white';
  }
  .text-ct-gray {
    color: var(--gray-700);
  }
  .container__claim-log--support-mb {
    height: 177px;
    background: var(--white);
    margin-bottom: 24px;
  }

  @media screen and (max-width: 1365px) {
    .box-log-support-des {
      display: none !important;
    }
    .wrapper-box-log-main {
      width: calc(100% - 290px) !important;
    }
  }
  @media screen and (min-width: 1366px) {
    .container__claim-log--support-mb {
      display: none !important;
    }
  }
</style>
