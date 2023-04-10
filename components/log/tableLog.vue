<template>
  <div
    :class="{
      'wrapper-table-log p-0 ': true,
      'tableClaim w-100 overflow-hidden': isClaim ? true : false
    }"
  >
    <table class="w-100 my-0 mx-auto" :class="{ table: true }" aria-describedby="table-log">
      <tr style="display: none">
        <th scope="col"></th>
      </tr>
      <tr
        @dblclick="_redirectToLog(value)"
        @click="_chooseLog(value)"
        class="tr_claim py-9"
        v-for="(value, index) in listClaims"
        :key="index"
      >
        <td v-if="isClaim" class="td__claim text-center d-block p-0 border-top-0">
          <img
            v-if="chooseLog[0] && value.logid == chooseLog[0].logid"
            class="icon-circle mt-40"
            src="@/assets/images/icon-check-log-claim.png"
            alt="icon-check-log-claim"
          />
          <b-icon v-else icon="circle" class="icon-circle mt-40" />
        </td>
        <!-- col-1 -->
        <td class="td__claim pr-0 w--140 p-0">
          <div class="d-flex">
            <div v-if="isClaim">
              <img
                v-if="chooseLog[0] && value.logid == chooseLog[0].logid"
                class="icon-circle mt-40 d-none mr-3"
                src="@/assets/images/icon-check-log-claim.png"
                alt="icon-check-log-claim"
              />
              <b-icon v-else icon="circle" class="icon-circle mt-40 d-none mr-3" />
            </div>
            <div class="w--135">
              <div
                :class="{
                  'day__text--log  font__medium text-18 d-flex align-item-center justify-content-center': true,
                  'mt-12': isClaim ? false : true
                }"
              >
                {{ _formatDay(value.admissiondate) }}
              </div>
              <div
                class="mouth__text--log text-uppercase text-11 font__regular d-flex justify-content-center align-item-center"
              >
                {{ _formatMonthYear(value.admissiondate) }}
              </div>
              <div
                class="note__text__claim--log font__regular text-11 d-flex align-item-center justify-content-center mt-0"
              >
                {{ $t('claim.admission_date') }}
              </div>
            </div>
            <div
              v-if="isClaim"
              :class="{ td__claim: isClaim ? false : true, 'pl-0 h--30 mt--30': true }"
            >
              <img
                :class="{
                  'icon__wrapper__file__claim mt--45 mr--15': true,
                  'align-items-center': true
                }"
                src="@/assets/images/icon-file-claim.png"
                alt="icon-wrapper-h"
              />
            </div>
            <div :class="{ td__claim: isClaim ? false : true, 'pl-0 pl-0 h-30 mt--30': true }">
              <img
                :class="{
                  'icon__wrapper__h__log w--30 h--30': true,
                  'align-items-center': true,
                  'mt-35': isClaim ? true : false
                }"
                src="@/assets/images/icon-wrapper-l.png"
                alt="icon-wrapper-h"
              />
            </div>
          </div>
        </td>
        <!-- col-2 -->
        <td class="td__claim w--135 p-0 border-top-0 td_log">
          <div
            :class="{
              'note__text__claim--log--start font__regular text-11 d-flex justify-content-start align-item-center mt--10': true,
              'text-uppercase': true,
              'mt-0': isClaim ? true : false,
              'opacity-0': value.referenceno || value.logno ? false : true
            }"
          >
            {{ value.referenceno || value.logno || $t('claim.hidden') }}
          </div>
          <b-button class="text-left" :id="'content__text__one' + index" variant="none__claim">
            <div
              class="limit__text-log overflow-hidden content__text__claim--log font__medium text-14"
            >
              {{ value.policyclaimtype_name_ind_field || value.policyclaimtypename }}
            </div>
          </b-button>
          <b-tooltip :target="'content__text__one' + index" offset="50">
            {{ value.policyclaimtype_name_ind_field || value.policyclaimtypename }}
          </b-tooltip>
          <div class="note__text__claim--log--start font__regular text-11 mt--12">
            {{ $t('claim.claim_type') }}
          </div>
        </td>
        <td class="td__claim w--100 py--10 px-0 border-top-0 td_log">
          <div
            :class="{
              'note__text__claim mt-0 text-11': true,
              'opacity--0': true,
              'd-none': true,
              'mt-0': isClaim ? true : false
            }"
          >
            {{ $t('claim.hidden') }}
          </div>
          <b-button class="text-left" :id="'content__text__three' + index" variant="none__claim">
            <div
              class="limit__text-log overflow-hidden content__text__log log font__medium text--14 text-left"
            >
              {{ value.hospital_name_ind_field || value.hospitalname || value.hospitalother }}
            </div>
          </b-button>
          <b-tooltip :target="'content__text__three' + index" offset="50">
            {{ value.hospital_name_ind_field || value.hospitalname || value.hospitalother }}
          </b-tooltip>
          <div class="note__text__claim mt-0 text-11 font__regular text-left">
            {{ $t('claim.hospital') }}
          </div>
        </td>
        <!-- col-5 -->
        <td class="td__claim w--100 py--10 px-0 border-top-0 td_log">
          <div
            :class="{
              'note__text__claim mt-0 text-11': true,
              'opacity--0': true,
              'd-none': true,
              'mt-0': isClaim ? true : false
            }"
          >
            {{ $t('claim.hidden') }}
          </div>
          <b-button class="text-left" :id="'content__text__four' + index" variant="none__claim">
            <div
              class="limit__text-log overflow-hidden w--80 content__text__log text-14 log font__medium"
            >
              {{
                value.policyclaimtypeclaimreason_name_ind_field ||
                value.policyclaimtypeclaimreasonname ||
                value.claimreasonother
              }}
            </div>
          </b-button>
          <b-tooltip :target="'content__text__four' + index" offset="50">
            {{
              value.policyclaimtypeclaimreason_name_ind_field ||
              value.policyclaimtypeclaimreasonname ||
              value.claimreasonother
            }}
          </b-tooltip>
          <div class="note__text__claim mt-0 text-11 font__regular text-left">
            {{ $t('claim.diagnosis') }}
          </div>
        </td>
        <!-- col-6 -->
        <td class="td__claim w--90 py--10 px-0 border-top-0" td_log>
          <div
            :class="{
              'note__text__claim mt-0 text-11': true,
              'opacity--0': true,
              'd-none': true,
              'mt-0': isClaim ? true : false
            }"
          >
            {{ $t('claim.hidden') }}
          </div>
          <b-button
            class="text-left width--90"
            :id="'content__text__four' + index"
            variant="none__claim"
          >
            <div class="content__text_log text-14 text--black font__medium text-left">
              {{ _formatTimeStrikethrough(value.createon) }}
            </div>
          </b-button>
          <div class="note__text__claim mt-0 text-11 font__regular text_l">
            {{ $t('claim.requested_date') }}
          </div>
        </td>
        <!-- col-7 -->
        <td class="td__claim mb-10 w--130 p-0 border-top-0">
          <div class="wrapper__supp__log w--115 ml--15 h-100 py--10">
            <div class="status__log__table mr-0 d-flex justify-content-between">
              <div class="d-flex justify-content-between w--50 mr--15">
                <div
                  class="d-flex col-icon-top mt-0 justify-content-center align-items-center mt--12"
                >
                  <b-icon
                    style="color: var(--NTUC-2)"
                    font-scale="1.2"
                    @click="_handlePrint(value.id)"
                    icon="envelope"
                    class="icon-envelope cursor_pointer"
                  />
                </div>

                <div class="d-flex col-icon-top mt-0 justify-content-center align-items-center">
                  <b-icon
                    style="color: var(--NTUC-2)"
                    font-scale="1.2"
                    @click="_handlePrint(value.id)"
                    icon="printer"
                    class="icon-printer cursor_pointer"
                  />
                </div>
              </div>

              <b-button
                :class="{
                  'd-flex justify-content-center align-items-center': true,
                  'btn-time-progress br--8': true,
                  text_l: true,
                  'mt--10': value.state_name_ind_field == 'Approved' ? false : true,
                  'mt--10': value.state_name_ind_field == 'Approved' ? true : false,
                  'mt--10': isClaim ? true : false
                }"
                :id="'time__progress__light__claim mt-0' + index"
                variant="none__claim"
              >
                <img
                  v-if="value.state_name_ind_field == 'Pending Approval'"
                  class="time__progress__light__claim mt-0 align-items-center"
                  src="@/assets/images/icon-arrow-pending.png"
                  alt="Time_progress_light"
                />
                <img
                  v-else-if="value.state_name_ind_field == 'Approved'"
                  class="time__progress__light__claim mt-0 align-items-center"
                  src="@/assets/images/icon-arrow-success.png"
                  alt="check2-circle"
                />
                <img
                  v-else
                  class="time__progress__light__claim mt-0 align-items-center"
                  src="@/assets/images/icon-arrow-remove.png"
                  alt="Remove_duotone_line"
                />
              </b-button>
              <b-tooltip :target="'time__progress__light__claim mt-0' + index" offset="50">
                {{ value.state_name_ind_field }}
              </b-tooltip>
            </div>
          </div>
        </td>
      </tr>
      <div class="d-flex justify-content-center" v-if="!listClaims[0]">
        <div>
          <nuxt-link to="/log/create">
            <img
              class="icon__no__data mt--100 align-items-center"
              src="@/assets/images/data_hollow.png"
              alt="data_hollow"
            />
          </nuxt-link>

          <div class="text__no__data mb--140 text__no__data font__regular text--32 text-center">
            {{ $t('log.no_data') }}
          </div>
        </div>
      </div>
    </table>
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

  export default {
    components: {},
    props: ['isClaim'],
    data: () => ({
      filters: {
        wildcard: '',
        claimant: '',
        diagnosis: '',
        hospital: '',
        status: '',
        referenceNo: '',
        state: '',
        role: '',
        issuedDateFrom: null,
        issuedDateTo: null,
        employee: Number(localStorage.getItem('empid')),
        employeeDpdt: null,
        admissionDateFrom: null,
        admissionDateTo: null
      }
    }),
    computed: {
      ...mapGetters('log', ['listClaims']),
      ...mapGetters('claim', ['chooseLog', 'createClaimStepInfor'])
    },
    async fetch() {
      try {
        if (this.isClaim) {
          await this.getListClaim({
            invoke: 'System.execute',
            argc: '2',
            a0: 'PolicyClaimApplied.LoadLOG',
            a1: {
              emp: localStorage.getItem('empid'),
              dependant:
                this.createClaimStepInfor.claimantName == 'null'
                  ? ''
                  : this.createClaimStepInfor.claimantName
            }
          });
        } else {
          await this.getListClaim({
            invoke: 'System.execute',
            argc: '2',
            a0: 'LOG.getListing',
            a1: {
              filters: this.filters
            }
          });
        }
      } catch (error) {}
    },
    methods: {
      ...mapActions('log', ['getListClaim', 'getLinkPrint']),
      ...mapActions('claim', ['handleChooseLog']),
      _formatDay(time) {
        return this.$dayjs(time).format('DD');
      },
      _formatMonthYear(time) {
        return this.$dayjs(time).format("MMM 'YY");
      },
      _formatTime(time) {
        return this.$dayjs(time).format('DD MMM YYYY').toUpperCase();
      },
      _formatTimeStrikethrough(time) {
        return this.$dayjs(time).format('DD-MM-YYYY').toUpperCase();
      },
      _redirectToLogSupp(value) {
        this.$router.push({ name: 'log-supp-id', params: { id: value.id } });
      },
      _redirectToLog(value) {
        if (!this.isClaim) {
          this.$router.push({ name: 'log-id', params: { id: value.id } });
        }
      },
      _redirectCreateLog() {
        this.$router.push({ name: 'log' });
      },
      _chooseLog(value) {
        this.handleChooseLog([value]);
      },
      async _handlePrint(id) {
        try {
          const reportData = await this.getLinkPrint({
            invoke: 'System.execute',
            argc: '2',
            a0: 'API.preparePrint',
            a1: {
              id: id,
              mode: 3
            }
          });

          document.getElementById('fmReport_a1').value = JSON.stringify(reportData.report_data);
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
        } catch (error) {}
      }
    }
  };
</script>

<style>
  @import '@/assets/css/log/tableLog.css';
</style>
<style scoped>
  ::v-deep .td__claim {
    height: 44px !important;
  }
</style>
