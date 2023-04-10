<template>
  <div>
    <div class="d-flex justify-content-between mb--28">
      <div class="text-18 text-NTUC-24 font-700 font__bold">
        {{ is_recent ? $t('dashboard.recent_transactions') : $t('dashboard.panel_transactions') }}
      </div>
      <div class="text-14 text-NTUC-22 font-500 font__medium" @click="seeAll()">
        {{ $t('dashboard.see_all') }}
      </div>
    </div>
    <div 
      class="mb--32"
      v-for="(item, index) in list_claim"
      :key="index"
      v-show="checkSeeAll(index)"
    >
      <b-row>
        <b-col cols="12" md="2">
          <div class="">
            <img :src="getStatusURL(item.status)" alt="confirm"/>
          </div>
        </b-col>
        <b-col cols="12" md="7">
          <div class="line-height-88 pt-1">
            <div class="text-NTUC-24 font-700 text-14">
              <div class="font__bold">{{ item.claimant }}</div>
            </div>
            <div class="text-NTUC-22 text-12">
              <div class="">{{ _formatTime(item.incurred_date) }}</div>
            </div>
          </div>
        </b-col>
        <b-col cols="12" md="3" class="d-flex align-items-center justify-content-end">
          <div class="text-NTUC-27 font-600 text-14 price-font">
            ${{ item.incurred_amount }}
          </div>
        </b-col>
      </b-row>
    </div>
  </div>
</template>

<script>
export default {
  props: ['list_claim', 'is_recent'],
  data: () => ({
    is_see_all: false
  }),
  methods: {
    _formatTime(time) {
      return this.$dayjs(time).format("DD MMM YYYY");
    },
    seeAll() {
      this.is_see_all = !this.is_see_all;
    },
    checkSeeAll(index) {
      return index > 1 && !this.is_see_all || this.is_see_all;
    },
    getStatusURL(status) {
      if (status.includes("Pending")) {
        return require('@/assets/images/activity-pending.png');
      }
      if (status.includes("Approved")) {
        return require('@/assets/images/activity-approve.png');
      }
      return require('@/assets/images/activity-reject.png');
    }
  }
}
</script>

<style scoped>
  .price-font {
    font-family: 'Inter';
  }
</style>
