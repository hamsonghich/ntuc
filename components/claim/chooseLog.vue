<template>
  <div class="wrapper-table mb--30 tableClaim wrapper-table__choose__log">
    <table :class="{'table': true}" aria-describedby="choose-log">
      <tr style="display: none;"><th scope="col"></th></tr>
      <tr class="tr_claim" v-for="(value, index) in chooseLog" :key="index" style="border-bottom: 0">
        <td class="td__claim text-center display__mobile--hidden">
          <b-icon @click="handleChooseLog([])" icon="x-lg" class="icon-x" />
        </td>
        <td class="td__claim padding-right--0 pt-0">
          <div class="d-flex">
            <td class="td__claim text-center display__mobile--show mr-3">
              <b-icon @click="handleChooseLog([])" icon="x-lg" class="icon-x" />
            </td>
            <div>
              <div :class="{'day__text__claim': true, 'mt-12': true}">{{ _formatDay(value.admissiondate) }}</div>
              <div class="mouth__text__claim">{{ _formatMonthYear(value.admissiondate) }}</div>
              <div class="note__text__claim mt-0 w-105">{{ $t('claim.admission_date') }}</div>
            </div>
            <div :class="{'padding-left--0': true}">
              <img :class="{'icon__wrapper__file__claim': true, 'align-items-center': true}" src="@/assets/images/icon-file-claim.png"
                alt="icon-wrapper-h">
            </div>
            <div :class="{'padding-left--0': true}">
              <img :class="{'icon__wrapper__h__claim': true, 'align-items-center': true, 'mt-35': true}" src="@/assets/images/icon-wrapper-h.png"
                alt="icon-wrapper-h">
            </div>
          </div>
        </td>
        <td class="td__claim">
          <div :class="{'note__text__claim': true, 'text--uppercase': true, 'opacity-0': value.referenceno || value.logno ? false : true}">
            {{ value.referenceno || value.logno || $t('claim.hidden') }}
          </div>
          <b-button class="text-align--start" :id="'content__text__one' + index" variant="none__claim">
            <div class="limit__text content__text__claim">
              {{ value.policyclaimtype_name_ind_field || value.policyclaimtypename }}
            </div>
          </b-button>
          <b-tooltip :target="'content__text__one' + index" offset="50">
            {{ value.policyclaimtype_name_ind_field || value.policyclaimtypename }}
          </b-tooltip>
          <div class="note__text__claim mt--12">
            {{ $t('claim.claim_type') }}
          </div>
        </td>
        <td class="td__claim">
          <div :class="{'note__text__claim': true, 'opacity--0': true, 'display__none': true}">
            {{ $t('claim.hidden') }}
          </div>
          <b-button class="text-align--start" :id="'content__text__two' + index" variant="none__claim">
            <div class="limit__text content__text__claim text--black">
              {{ value.claimant }}
            </div>
          </b-button>
          <b-tooltip :target="'content__text__two' + index" offset="50">
            {{ value.claimant }}
          </b-tooltip>
          <div class="note__text__claim">{{ $t('claim.claimant') }}</div>
        </td>
        <td class="td__claim">
          <div :class="{'note__text__claim': true, 'opacity--0': true, 'display__none': true}">
            {{ $t('claim.hidden') }}
          </div>
          <b-button class="text-align--start" :id="'content__text__three' + index" variant="none__claim">
            <div class="limit__text content__text__claim text--black">
              {{ value.hospital_name_ind_field || value.hospitalname || value.hospitalother }}
            </div>
          </b-button>
          <b-tooltip :target="'content__text__three' + index" offset="50">
            {{ value.hospital_name_ind_field || value.hospitalname || value.hospitalother }}
          </b-tooltip>
          <div class="note__text__claim">{{ $t('claim.hospital') }}</div>
        </td>
        <td class="td__claim">
          <div :class="{'note__text__claim': true, 'opacity--0': true, 'display__none': true}">
            {{ $t('claim.hidden') }}
          </div>
          <b-button class="text-align--start" :id="'content__text__four' + index" variant="none__claim">
            <div class="limit__text content__text__claim text--black">
              {{ value.policyclaimtypeclaimreason_name_ind_field || value.policyclaimtypeclaimreasonname || value.claimreasonother }}
            </div>
          </b-button>
          <b-tooltip :target="'content__text__four' + index" offset="50">
            {{ value.policyclaimtypeclaimreason_name_ind_field || value.policyclaimtypeclaimreasonname || value.claimreasonother }}
          </b-tooltip>
          <div class="note__text__claim">{{ $t('claim.diagnosis') }}</div>
        </td>
        <td class="td__claim">
          <div :class="{'note__text__claim': true, 'opacity--0': true, 'display__none': true}">
            {{ $t('claim.hidden') }}
          </div>
          <b-button class="text-align--start width--130" :id="'content__text__four' + index" variant="none__claim">
            <div class="content__text__claim text--black">
              {{ _formatTime(value.createon) }}
            </div>
          </b-button>
          <div class="note__text__claim">{{ $t('claim.requested_date') }}</div>
        </td>
        <td class="td__claim mb-10">
          <div class="d-flex wrapper__supp__log">
            <div class="status__log__table">
              <b-button :class="{'text-align--start': true, 'margin-top--42': true, 'mt-35': true}" :id="'time__progress__light__claim' + index"
                variant="none__claim">
                <img v-if="value.state_name_ind_field == 'Pending Approval'"
                  class="time__progress__light__claim align-items-center"
                  src="@/assets/images/Time_progress_light.png" alt="Time_progress_light">
                <img v-if="value.state_name_ind_field == 'Approved'"
                  class="time__progress__light__claim align-items-center" src="@/assets/images/check2-circle.png"
                  alt="check2-circle">
                <img v-if="value.state_name_ind_field == 'Claim Submitted'"
                  class="time__progress__light__claim align-items-center"
                  src="@/assets/images/Remove_duotone_line.png" alt="Remove_duotone_line">
              </b-button>
              <b-tooltip :target="'time__progress__light__claim' + index" offset="50">
                {{ value.state_name_ind_field }}
              </b-tooltip>
            </div>
          </div>
        </td>
      </tr>
    </table>
  </div>

</template>

<script>
import { mapGetters, mapActions } from 'vuex';

export default {
  components: {},
  data: () => ({}),
  computed: {
    ...mapGetters('claim', [
      'chooseLog',
    ])
  },
  methods: {
    ...mapActions('claim', [
      'handleChooseLog',
    ]),
    _formatDay(time) {
      return this.$dayjs(time).format('DD');
    },
    _formatMonthYear(time) {
      return this.$dayjs(time).format("MMM 'YY");
    },
    _formatTime(time) {
      return this.$dayjs(time).format("DD MMM YYYY").toUpperCase();
    },
  },
}
</script>

<style>
@import '@/assets/css/claim/tableClaim.css';
</style>
