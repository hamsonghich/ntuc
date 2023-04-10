<template>
  <div class="text-center">
    <b-spinner label="Spinning" style="width: 9rem; height: 9rem" v-if="!show" />
    <div class="tableClaim text-left" v-else>
      <table class="table">
        <caption class="d-none">
          tableClaim
        </caption>
        <thead class="d-none"></thead>
        <th class="d-none" id=""></th>
        <tbody>
          <tr
            @dblclick="_redirectToLog(value)"
            class="tr_claim"
            v-for="(value, index) in listClaims"
            :key="index"
          >
            <td class="td__claim padding-right--0">
              <div class="d-flex h-100">
                <div class="d-flex flex-column align-items-center justify-content-center">
                  <div class="day__text__claim">
                    {{ _formatDay(value.admissiondate || value.incurreddate) }}
                  </div>
                  <div class="mouth__text__claim">
                    {{ _formatMonthYear(value.admissiondate || value.incurreddate) }}
                  </div>
                  <div class="text-created">Created</div>
                </div>
                <div class="td__claim padding-left--0">
                  <img
                    class="icon__wrapper__h__claim align-items-center icon__schema--mobile"
                    src="@/assets/images/icon-schema-pink.png"
                    alt="icon-wrapper-h"
                  />
                </div>
              </div>
            </td>
            <td class="td__claim">
              <div class="d-flex align-items-center justify-content-center h-100">
                <img
                  class="icon__wrapper__h__claim align-items-center icon__schema--desktop"
                  src="@/assets/images/icon-schema-pink.png"
                  alt="icon-wrapper-h"
                />
              </div>
            </td>
            <td class="td__claim">
              <div class="d-flex h-100 flex-column align-items-start justify-content-center">
                <div class="note__text__claim text--uppercase">
                  {{ value.referenceno }}
                </div>
                <b-button
                  class="text-align--start w-100"
                  :id="'content__text__one' + index"
                  variant="none__claim"
                >
                  <div class="limit__text content__text__claim fs-24">
                    {{ value.claimtype }}
                  </div>
                </b-button>
                <b-tooltip :target="'content__text__one' + index" offset="50">
                  {{ value.claimtype }}
                </b-tooltip>
                <div
                  class="note__text__claim mt--12"
                  :class="!value.claimtype ? 'custom-text__claim' : ''"
                >
                  {{ $t('claim.claim_type') }}
                </div>
              </div>
            </td>
            <td class="td__claim">
              <div class="d-flex h-100 flex-column align-items-start justify-content-end">
                <b-button
                  class="text-align--start w-100"
                  :id="'content__text__two' + index"
                  variant="none__claim"
                >
                  <div class="limit__text content__text__claim text--black fs-24">
                    {{ value.claimant }}
                  </div>
                </b-button>
                <b-tooltip :target="'content__text__two' + index" offset="50">
                  {{ value.claimant }}
                </b-tooltip>
                <div class="note__text__claim">{{ $t('claim.claimant') }}</div>
              </div>
            </td>
            <td class="td__claim">
              <div class="d-flex h-100 flex-column align-items-start justify-content-end">
                <b-button
                  class="text-align--start w-100"
                  :id="'content__text__three' + index"
                  variant="none__claim"
                >
                  <div class="limit__text content__text__claim text--black fs-24">
                    {{ _formatMoney(value.incurredamt || 0, '$') }}
                  </div>
                </b-button>
                <b-tooltip :target="'content__text__three' + index" offset="50">
                  {{ _formatMoney(value.incurredamt || 0, '$') }}
                </b-tooltip>
                <div class="note__text__claim">
                  {{ $t('claim.claimed') }} {{ value.currency ? `(${value.currency})` : '' }}
                </div>
              </div>
            </td>
            <td class="td__claim">
              <div class="d-flex h-100 flex-column align-items-start justify-content-end">
                <b-button
                  class="text-align--start w-100"
                  :id="'content__text__four' + index"
                  variant="none__claim"
                >
                  <div
                    v-if="
                      value.status &&
                      value.state &&
                      (value.status == 'Rejected' ||
                        value.state == 'Rejected' ||
                        value.status == 'Approved' ||
                        value.status == 'Paid' ||
                        value.state == 'Approved' ||
                        value.state == 'Paid')
                    "
                    class="limit__text content__text__claim text--black fs-24"
                  >
                    {{ _formatMoney(value.reimbursementamt || 0, '$') }}
                  </div>
                </b-button>
                <b-tooltip
                  v-if="
                    value.status &&
                    value.state &&
                    (value.status == 'Rejected' ||
                      value.state == 'Rejected' ||
                      value.status == 'Approved' ||
                      value.status == 'Paid' ||
                      value.state == 'Approved' ||
                      value.state == 'Paid')
                  "
                  :target="'content__text__four' + index"
                  offset="50"
                >
                  {{ _formatMoney(value.reimbursementamt || 0, '$') }}
                </b-tooltip>
                <div
                  class="note__text__claim"
                  :class="
                    value.status &&
                    value.state &&
                    (value.status == 'Rejected' ||
                      value.state == 'Rejected' ||
                      value.status == 'Approved' ||
                      value.status == 'Paid' ||
                      value.state == 'Approved' ||
                      value.state == 'Paid')
                      ? ''
                      : 'custom-text__claim'
                  "
                >
                  {{ $t('claim.reimbursed') }}
                  {{ value.currencyconverted ? `(${value.currencyconverted})` : '' }}
                </div>
              </div>
            </td>
            <td class="td__claim mb-10">
              <div class="d-flex h-100 flex-column align-items-start justify-content-center">
                <div
                  class="
                    wrapper__supp__log wrapper__supp__claim wrapper__icon__claim
                    d-flex
                    align-items-center
                    justify-content-center
                  "
                >
                  <div class="d-flex mr-2">
                    <b-icon
                      icon="envelope"
                      class="icon-mail text-NTUC-2 mr-2 cursor_pointer"
                      @click="_sentEmail(value)"
                    />
                    <b-icon
                      @click.stop="
                        _handlePrint(
                          value.id,
                          value.employeeid,
                          !!value.insurer ? value.insurer : null,
                          value
                        )
                      "
                      icon="printer"
                      class="icon-printer cursor_pointer mr-2 text-NTUC-2"
                      v-if="
                        !(
                          value.status == 'Pending Submission' ||
                          value.state == 'Pending Submission'
                        )
                      "
                    />
                  </div>
                  <b-button
                    class="d-flex"
                    :id="'time__progress__claim' + index"
                    variant="none__claim"
                  >
                    <img
                      v-if="value.status == 'Rejected' || value.state == 'Rejected'"
                      class="
                        time__progress__claim
                        icon__state__claim
                        d-flex
                        align-items-center
                      "
                      src="@/assets/images/activity-reject.png"
                      alt="icon-uncomfortable"
                    />
                    <img
                      v-else-if="
                        value.status == 'Approved' ||
                        value.status == 'Paid' ||
                        value.state == 'Approved' ||
                        value.state == 'Paid'
                      "
                      class="
                        time__progress__claim
                        icon__state__claim
                        d-flex
                        align-items-center
                      "
                      src="@/assets/images/activity-approve.png"
                      alt="icon-uncomfortable"
                    />
                    <img
                      v-else
                      class="
                        time__progress__claim
                        icon__state__claim
                        d-flex
                        align-items-center
                      "
                      src="@/assets/images/activity-pending.png"
                      alt="icon-uncomfortable"
                    />
                  </b-button>
                  <b-tooltip :target="'time__progress__claim' + index" offset="50">
                    {{ value.status || value.state }}
                  </b-tooltip>
                </div>
              </div>
            </td>
          </tr>
          <div class="d-flex justify-content-center" v-if="!listClaims[0]">
            <div>
              <img
                class="icon__no__data align-items-center cursor_pointer"
                src="@/assets/images/data_hollow.png"
                @click="$router.push({ name: 'claim-create' })"
                alt="data_hollow"
              />
              <div class="text__no__data">{{ $t('claim.no_data') }}</div>
            </div>
          </div>
        </tbody>
      </table>
      <form id="fmReport" method="post">
        <input type="hidden" name="csrf_token" id="fmReport_csrf" value="" />
        <input type="hidden" name="invoke" id="invoke" value="System.execute" />
        <input type="hidden" name="argc" id="argc" value="3" />
        <input type="hidden" name="a0" id="a0" value="report.print" />
        <input type="hidden" name="a1" id="fmReport_a1" value="" />
      </form>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import { formatMoney } from '../../utils/functions/formatMoney';
import { postAxios } from '@/services/callApi';
import { _handleFormatTime } from '@/utils/functions/formatTime';

export default {
  data: () => ({
    show: true,
    filters: {
      wildcard: '',
      claimant: '',
      claimType: '',
      diagnosis: '',
      hospital: '',
      referenceNo: '',
      state: '',
      role: '', // role login
      issuedDateFrom: null,
      issuedDateTo: null,
      employee: Number(localStorage.getItem('empid')), // employee login
      empId: Number(localStorage.getItem('empid')),
      employeeDpdt: null,
      admissionDateFrom: null,
      admissionDateTo: null,
      createDateFrom: '',
      createDateTo: '',
      paidDateFrom: '',
      paidDateTo: '',
      computed_status: '',
      withattachment: '',
      incurredamt: "{ 'min': 0, 'max': 2000000000 }",
      hrflag: false
    },
    claimEmailActive: null,
    clientname: localStorage.getItem('clientname'),
    employeename: localStorage.getItem('empName')
  }),
  watch: {
    tab: async function (newValue) {
      await this._getListClaim(newValue);
    }
  },
  computed: {
    ...mapGetters('claim', ['listClaims', 'tab'])
  },
  methods: {
    ...mapActions('claim', ['getListClaim', 'getStatusList', 'handleChangeAlert', 'getListStatus']),
    ...mapActions('log', ['getLinkPrint']),
    _formatDay(time) {
      return time ? this.$dayjs(_handleFormatTime(time, '/')).format('DD') : '';
    },
    _formatMonthYear(time) {
      return time ? this.$dayjs(_handleFormatTime(time, '/')).format("MMM 'YY") : '';
    },
    _formatTime(time) {
      return time ? this.$dayjs(time).format('DD MMM YYYY').toUpperCase() : '';
    },
    _redirectToLog(value) {
      if (this.tab == 3 && value.state == 'Paid') {
        this.$router.push({
          name: 'claim-id',
          params: { id: value.id },
          query: { group: this.tab, payment: value.payment }
        });
      } else {
        this.$router.push({
          name: 'claim-id',
          params: { id: value.id },
          query: { group: this.tab }
        });
      }
    },
    _redirectCreateLog() {
      this.$router.push({ name: 'claim' });
    },
    _formatMoney(n, s) {
      return formatMoney(n, s);
    },
    async _handlePrint(id, empID, insurer, value) {
      // try {
      //   await this.getLinkPrint({
      //     "invoke": "System.execute",
      //     "argc": "2",
      //     "a0": "API.preparePrint",
      //     "a1": {
      //       "id": id,
      //       "empid": empID,
      //       "mode": 1,
      //     }
      //   });
      // } catch (error) {
      //   console.log('_handlePrint' + error);
      // }
      let a1 = {};
      if (this.tab == 1 || this.tab == 2) {
        a1 = {
          reportName: 'claim_form',
          parameters: { WHERE: [{ field: 'ca.Id', op: '=', value: id }] },
          format: 'pdf'
        };
      } else if (this.tab == 3) {
        a1 = {
          reportName: 'policy_claim_form',
          parameters: {
            WHERE: [{ field: 'pca.id', op: '=', value: id }],
            insurer: parseInt(insurer)
          },
          format: 'pdf'
        };
      } else {
        this.handleChangeAlert({
          isShow: true,
          typeAlert: 'warning',
          textAlert: 'Invalid claim group'
        });
      }
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
    },
    formatStringUrl(value) {
      if (value) {
        return encodeURIComponent(value) + '%0D%0A';
      }
      return '%0D%0A';
    },
    formatLabelStringUrl(value) {
      if (value) {
        return encodeURIComponent(value) + ':%20';
      }
      return '';
    },
    _formatDate(value) {
      if (value) {
        return this.$dayjs(new Date(value)).format('DD-MM-YYYY');
      }
      return '';
    },
    _formatadmissionDate(value) {
      if (value) {
        var newdate = value.split('/').reverse().join('-');
        return this.$dayjs(new Date(newdate)).format('DD-MM-YYYY');
      }
      return '';
    },
    async _sentEmail(value) {
      try {
        const res = await postAxios({
          invoke: 'System.execute',
          argc: '2',
          a0: 'API.Broker.Get'
        });
        const valueBroker = JSON.parse(res.data.data[0].value);
        const emailto = valueBroker.email;
        const emailsubject = `Enquiry on ${value.referenceno}`;
        const clientname =
          this.formatLabelStringUrl('𝗖𝗼𝗺𝗽𝗮𝗻𝘆') + this.formatStringUrl(this.clientname);
        const employeeName =
          this.formatLabelStringUrl('𝗘𝗺𝗽𝗹𝗼𝘆𝗲𝗲 𝗡𝗮𝗺𝗲') + this.formatStringUrl(this.employeename);
        const claimType =
          this.formatLabelStringUrl('𝗖𝗹𝗮𝗶𝗺 𝗧𝘆𝗽𝗲') + this.formatStringUrl(value.claimtype);
        const incurredDate =
          this.formatLabelStringUrl('𝗜𝗻𝗰𝘂𝗿𝗿𝗲𝗱 𝗗𝗮𝘁𝗲') +
          this.formatStringUrl(this._formatDate(value.incurreddate));
        const admissionDate =
          this.formatLabelStringUrl('𝗔𝗱𝗺𝗶𝘀𝘀𝗶𝗼𝗻 𝗗𝗮𝘁𝗲') +
          this.formatStringUrl(this._formatadmissionDate(value.admissiondate));
        const userQuery =
          this.formatLabelStringUrl('𝗣𝗹𝗲𝗮𝘀𝗲 𝗶𝗻𝗱𝗶𝗰𝗮𝘁𝗲 𝘆𝗼𝘂𝗿 𝗾𝘂𝗲𝗿𝘆 𝗵𝗲𝗿𝗲') + '%0D%0A-%20';

        const body =
          clientname +
          employeeName +
          claimType +
          (this.tab == 3 ? admissionDate : incurredDate) +
          '%0D%0A' +
          userQuery;
        window.location.href = `mailto:${emailto}?subject=${emailsubject}&body=${body}`;
      } catch (e) {
        console.log('error', e);
        window.scroll({ top: 0, behavior: 'smooth' });
      }
    },
    async _getListClaim(newValue) {
      try {
        this.show = false;
        switch (newValue) {
          case 1: {
            await this.getStatusList({
              invoke: 'System.execute',
              argc: '2',
              a0: 'API.ClaimApplied.GetInfoByStatus',
              a1: {
                id: '',
                mode: '0',
                hrflag: 'false'
              }
            });

            await this.getListStatus({
              invoke: 'System.execute',
              argc: '2',
              a0: 'API.ClaimApplied.GetStatusList',
              a1: {
                mode: '0'
              }
            });

            let filtersTem = JSON.parse(JSON.stringify(this.filters));
            delete filtersTem.employee;
            await this.getListClaim({
              invoke: 'System.execute',
              argc: '2',
              a0: 'API.ClaimApplied.GetListing',
              a1: {
                ...filtersTem,
                claimgroup: 1
              }
            });
            break;
          }
          case 2: {
            await this.getStatusList({
              invoke: 'System.execute',
              argc: '2',
              a0: 'API.ClaimApplied.GetInfoByStatus',
              a1: {
                id: '',
                mode: '1',
                hrflag: 'false'
              }
            });

            await this.getListStatus({
              invoke: 'System.execute',
              argc: '2',
              a0: 'API.ClaimApplied.GetStatusList',
              a1: {
                mode: '1'
              }
            });

            let filtersTem = JSON.parse(JSON.stringify(this.filters));
            delete filtersTem.employee;
            await this.getListClaim({
              invoke: 'System.execute',
              argc: '2',
              a0: 'API.ClaimApplied.GetListing',
              a1: {
                ...filtersTem,
                claimgroup: 2
              }
            });
            break;
          }
          case 3: {
            await this.getStatusList({
              invoke: 'System.execute',
              argc: '2',
              a0: 'API.ClaimApplied.GetInfoByStatus',
              a1: {
                id: '',
                mode: '2',
                hrflag: 'false'
              }
            });

            await this.getListStatus({
              invoke: 'System.execute',
              argc: '2',
              a0: 'API.ClaimApplied.GetStatusList',
              a1: {
                mode: '2'
              }
            });

            let filtersTem = JSON.parse(JSON.stringify(this.filters));
            delete filtersTem.empId;
            await this.getListClaim({
              invoke: 'System.execute',
              argc: '2',
              a0: 'API.PolicyClaimApplied.getListing',
              a1: {
                filters: filtersTem
              }
            });
            break;
          }
        }
        this.show = true;
      } catch (error) {
        console.log('getListClaim ' + error);
      }
    }
  },
  async fetch() {
    try {
      await this._getListClaim(this.tab);
    } catch (error) {
      console.log('fetch ' + error);
    }
  }
};
</script>
<style>
@import '@/assets/css/claim/tableClaim.css';
</style>
