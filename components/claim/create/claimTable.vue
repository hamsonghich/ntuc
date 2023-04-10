<template>
  <div>
    <div class="wrapper-table">
      <div class="table">
        <div class="claim_table_title text-32">{{ $t('log.hi') }} {{ userName }},</div>
        <div class="claim_table_content">
          We noticed that you have  Insurance Inpatient claim/s recently (within 90 days). Would you like to check if its related?
        </div>
      </div>
      <div v-if="data.length !== 0">
        <div class="selected_claim text-40">Selected Inpatient Claim</div>
        <table class="table _selected_table" aria-describedby="mydesc">
          <tr class="d-none">
            <th scope="col"></th>
            <th scope="col"></th>
          </tr>
          <tr v-for="(item, index) in data" :key="index">
            <td class="td_claim align-middle">
              <div class="d-flex wrapper__supp__log">
                <div class="">
                  <b-button
                    :id="'time__progress__light__claim'"
                    variant="none__claim"
                  >
                    <b-icon icon="x-lg" @click="_handleCloseBtn"></b-icon>
                  </b-button>
                </div>
              </div>
            </td>
            <td class="td__claim padding-right--0">
              <div class="d-flex h-100">
                <div class="d-flex flex-column align-items-center justify-content-center">
                  <div
                    :class="{
                      day__text__claim: true,
                      'mt-12': isClaim ? false : true,
                      is_date_claim: true
                    }"
                  >
                    {{ _formatDay(item.inpatient_claim_admission_date) }}
                  </div>
                  <div class="mouth__text__claim is_date_item_spec">
                    {{ _formatMonthYear(item.inpatient_claim_admission_date) }}
                  </div>
                  <div class="mouth__text__claim is_date_item_created">
                    Created
                  </div>
                </div>
              </div>
            </td>
            <td class="td__claim mb-10 align-middle">
              <img
                class="align-items-center"
                src="@/assets/images/icon-schema-pink.png"
                alt="Time_progress_light"
                style="width: 24px"
              />
            </td>
            <td class="td__claim">
              <div class="d-flex h-100">
                <div class="d-flex flex-column align-items-start justify-content-center">
                  <div class="note__text__claim text--uppercase">
                    {{ item.inpatient_claim_reference_no }}
                  </div>
                  <b-button
                    class="text-align--start"
                    :id="'content__text__one' + index"
                    variant="none__claim"
                  >
                    <div class="limit__text content__text__claim">
                      {{ item.inpatient_claim_type_name }}
                    </div>
                  </b-button>
                  <b-tooltip :target="'content__text__one' + index" offset="50">
                    {{ item.inpatient_claim_type_name }}
                  </b-tooltip>
                  <div class="note__text__claim mt--12">
                    {{ $t('claim.claim_type') }}
                  </div>
                </div>
              </div>
            </td>
            <td class="td__claim">
              <div class="d-flex h-100">
                <div class="d-flex flex-column align-items-start justify-content-center">
                  <div
                    :class="{
                      note__text__claim: true,
                      'opacity--0': true,
                      display__none: true
                    }"
                  >
                    {{ $t('claim.hidden') }}
                  </div>
                  <b-button class="text-align--start" id="'content__text__two'" variant="none__claim">
                    <div class="limit__text content__text__claim text--black">
                      {{ item.inpatient_claim_claimant_name }}
                    </div>
                  </b-button>
                  <b-tooltip :target="'content__text__two'" offset="50">
                    {{ item.inpatient_claim_claimant_name }}
                  </b-tooltip>
                  <div class="note__text__claim">{{ $t('claim.claimant') }}</div>
                </div>
              </div>
            </td>
            <td class="td__claim mb-10 align-middle">
              <img
                v-if="item.inpatient_claim_state_name.includes('Pending')"
                width="36px"
                height="36px"
                src="@/assets/images/icon-question.png"
                alt="icon-uncomfortable"
              />
              <img
                v-else
                width="36px"
                height="36px"
                class="align-items-center"
                src="@/assets/images/status.png"
                alt="Time_progress_light"
              />
            </td>
          </tr>
        </table>
      </div>

      <table class="table table_claim" aria-describedby="mydesc">
        <tr class="d-none">
          <th scope="col"></th>
          <th scope="col"></th>
        </tr>
        <tr v-for="(item, index) in isdata" :key="index" @click="setData(item, index)">
          <td class="td_claim align-middle">
            <input type="radio" :checked="item.isCheck"  />
          </td>

          <td class="td__claim padding-right--0">
            <div class="d-flex h-100">
              <div class="d-flex flex-column align-items-center justify-content-center">
                <div
                  :class="{
                    day__text__claim: true,
                    'mt-12': isClaim ? false : true,
                    is_date_claim: true
                  }"
                >
                  {{ _formatDay(item.inpatient_claim_admission_date) }}
                </div>
                <div class="mouth__text__claim is_date_item_spec">
                  {{ _formatMonthYear(item.inpatient_claim_admission_date) }}
                </div>
                <div class="mouth__text__claim is_date_item_created">
                  Created
                </div>
              </div>
            </div>
          </td>
          <td class="td_claim align-middle">
            <div class="d-flex h-100">
              <div class="d-flex flex-column align-items-start justify-content-center">
                <div class="note__text__claim text--uppercase"> </div>
                <img
                  class="icon__wrapper__h__claim align-items-center icon__schema--desktop"
                  src="@/assets/images/icon-schema-pink.png"
                  alt="icon-wrapper-h"
                />
                <div class="note__text__claim mt--12"> </div>
              </div>
            </div>
          </td>
          <td class="td__claim">
            <div class="d-flex h-100">
              <div class="d-flex flex-column align-items-start justify-content-center">
                <div class="note__text__claim text--uppercase">
                  {{ item.inpatient_claim_reference_no }}
                </div>
                <b-button
                  class="text-align--start"
                  :id="'content__text__one' + index"
                  variant="none__claim"
                >
                  <div class="limit__text content__text__claim">
                    {{ item.inpatient_claim_type_name }}
                  </div>
                </b-button>
                <b-tooltip :target="'content__text__one' + index" offset="50">
                  {{ item.inpatient_claim_type_name }}
                </b-tooltip>
                <div class="note__text__claim mt--12">
                  {{ $t('claim.claim_type') }}
                </div>
              </div>
            </div>
          </td>
          <td class="td__claim">
            <div class="d-flex h-100">
              <div class="d-flex flex-column align-items-center justify-content-center">
                <div
                  :class="{
                    note__text__claim: true,
                    'opacity--0': true,
                    display__none: true
                  }"
                >
                  {{ $t('claim.hidden') }}
                </div>
                <b-button class="text-align--start" id="'content__text__two'" variant="none__claim">
                  <div class="limit__text content__text__claim text--black">
                    {{ item.inpatient_claim_claimant_name }}
                  </div>
                </b-button>
                <b-tooltip :target="'content__text__two'" offset="50">
                  {{ item.inpatient_claim_claimant_name }}
                </b-tooltip>
                <div class="note__text__claim">{{ $t('claim.claimant') }}</div>
              </div>
            </div>


          </td>
          <td class="td__claim mb-10 align-middle">
            <img
              v-if="item.inpatient_claim_state_name.includes('Pending')"
              width="36px"
              height="36px"
              src="@/assets/images/icon-question.png"
              alt="icon-uncomfortable"
            />
            <img
              v-else
              width="36px"
              height="36px"
              class="align-items-center"
              src="@/assets/images/status.png"
              alt="Time_progress_light"
            />
          </td>
        </tr>
      </table>
      <div class="create_claim_pagination">
        <paginate
          class="notification_pagination LOG-pagination"
          :page-count="originData.length"
          :page-range="paginateDefault.pageRange"
          :click-handler="_handlePagination"
          :prev-text="paginateDefault.prevText"
          :next-text="paginateDefault.nextText"
          :container-class="paginateDefault.containerClass"
          :page-class="paginateDefault.pageClass"
        />
      </div>
      <div
        class="quick-log-btn d-flex justify-content-between pt-4 next_step_table _claim_mobile_btn"
      >
        <button
          type="button"
          @click="_backStep"
          class="btn btn__claim button__log btn_back _btn_next_claim btn_back_claim"
        >
          Back
        </button>
        <button type="button" @click="_nextStep" class="btn btn__claim button__log _btn_next_claim">
          {{ data.length === 0 ? 'Select' : 'Next' }}
        </button>
      </div>
    </div>
  </div>
</template>

<script>
  import { PAGINATE } from '~/utils/constants/paginate.js';
  import { mapGetters, mapActions } from 'vuex';
  export default {
    data() {
      return {
        data: [],
        selectData: [],
        isdata: [],
        paginateDefault: PAGINATE,
        originData: [],
        userName: localStorage.getItem('empName'),
      };
    },
    computed: {
      ...mapGetters('claim', [
        'createStep',
        'isBalance',
        'createClaimStepInfor',
        'listClaimType',
        'listClaimReason',
        'listClaimMate',
        'listServiceProvider',
        'listReferral',
        'listCurrency',
        'listOutPatientClaim'
      ])
    },
    created() {
      this.originData = this.chunkArray(this.listOutPatientClaim, 5);

      this.isdata = this.chunkArray(this.listOutPatientClaim, 5)[0];
    },
    methods: {
      ...mapActions('claim', ['setCreateClaimStep', 'setOutClaimSelected']),
      _formatMoney(value) {
        return Number(value)
        .toFixed(2)
        .replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
      },
      _formatDay(time) {
        return this.$dayjs(time).format('DD');
      },
      _handleCloseBtn() {
        this.data = [];
      },
      _formatMonthYear(time) {
        return this.$dayjs(time).format("MMM 'YY");
      },
      chunkArray(myArray, chunk_size) {
        var arrayLength = myArray.length;
        var tempArray = [];
        for (let index = 0; index < arrayLength; index += chunk_size) {
          let myChunk = myArray.slice(index, index + chunk_size);
          tempArray.push(myChunk);
        }

        return tempArray;
      },
      _backStep() {
        this.setCreateClaimStep(7.1);
      },
      setData(item, index) {
        this.isdata = this.isdata.map(el => {
          return {
            ...el,
            isCheck: false
          };
        });
        this.isdata[index].isCheck = true;
        this.setOutClaimSelected(item);
        this.selectData = [item];
      },
      _handlePagination(currentPage) {
        this.isdata = this.originData[currentPage - 1];
      },
      _nextStep() {
        if (this.data.length === 0) {
          this.isdata = this.isdata.map(item => {
            return {
              ...item,
              isCheck: false
            };
          });
          this.data = this.selectData;
          return;
        }

        return this.setCreateClaimStep(2.1);
      }
    }
  };
</script>
<style>
  @import '@/assets/css/claim/tableClaim.css';
  .is_date_claim {
    font-family: Ubuntu-Regular,Tahoma,sans-serif;
    font-weight: 400;
    line-height: 120%;
    color: var(--text-color-default);
    font-size: 18px;
  }
  .claim_table_header {
    font-style: normal;
    font-weight: 300;
    line-height: 120%;
    color: #fcfdff;
    padding: 10px 0 10px 20px;
    background: var(--NTUC-2);
    border-radius: 10px 10px 0px 0px;
  }
  .claim_table_content {
    font-style: normal;
    font-weight: 300;
    font-size: 20px;
    line-height: 150%;
    padding-bottom: 30px;
    color: var(--color-black);
  }
  .claim_table_title {
    font-style: normal;
    font-weight: 300;
    line-height: 120%;
    padding: 50px 50px 50px 0;
    color: var(--NTUC-1);
  }
  .is_date_item_spec {
    font-family: Ubuntu-Regular,Tahoma,sans-serif;
    font-weight: 400;
    font-size: 11px;
    line-height: 150%;
    display: flex;
    align-items: center;
    color: var(--text-color-default);
  }
  .is_date_item_created {
    font-family: Ubuntu-Regular,Tahoma,sans-serif;
    font-weight: 400;
    font-size: 11px;
    line-height: 150%;
    display: flex;
    align-items: center;
    color: var(--NTUC-28);
  }
  .next_step_table {
    padding: 60px 20px;
  }
  .is_margin_table {
    margin: 20px 0;
  }
  .wrapper__supp__log{
    width: 39px;
  }
  .wrapper-table{
    padding: 0 40px !important;
  }
  .selected_claim {
    font-style: normal;
    font-weight: 300;
    line-height: 120%;
    color: var(--NTUC-1);
  }
  ._selected_table {
    background: linear-gradient(#ffffff 0 0) padding-box,
      linear-gradient(to left bottom, var(--NTUC-1), var(--NTUC-2)) border-box;
    border: 2px solid transparent;
    border-radius: 4px;
    margin: 30px 0 !important;
    width: 100% !important;
  }
  .create_claim_pagination {
    display: flex;
    padding: 40px 20px 20px 20px;
    justify-content: flex-end;
  }

  .table_claim {
    background: #fff;
    filter: none;
  }
</style>
