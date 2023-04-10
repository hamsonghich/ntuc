<template>
  <div class="d-flex flex-row-reverse align-items-end">
    <div class="d-flex flex-row enrol-box bg-NTUC-1">
      <div class="d-flex align-items-center enrol-inside">
        <img src="@/assets/images/rotate_90_degrees_cw.svg" alt="confirm" class="mr-1" />
        <div class="text-NTUC-9 text-10 font__medium">{{ $t('dashboard.enrol') }}<br/>{{ $t('dashboard.now') }}</div>
      </div>
    </div>
    <div class="line-height-88 pt-1">
      <div class="text-right text-gray--800 text-18 font-500">
        <div class="mr--5 ml-2 font__medium">{{mins | twoDigits}}</div>
      </div>
      <div class="text-right text-NTUC-28 text-8">
        <div class="mr--5 ml-2">{{$t('minutes')}}</div>
      </div>
    </div>
    <div class="line-height-88 pt-1">
      <div class="text-right text-gray--800 text-18 font-500">
        <div class="mr--5 ml-2 font__medium">{{hours | twoDigits}}</div>
      </div>
      <div class="text-right text-NTUC-28 text-8">
        <div class="mr--5 ml-2">{{$t('hours')}}</div>
      </div>
    </div>
    <div class="line-height-88 pt-1">
      <div class="text-right text-gray--800 text-18 font-500">
        <div class="mr--5 ml-2 font__medium">{{days | twoDigits}}</div>
      </div>
      <div class="text-right text-NTUC-28 text-8">
        <div class="mr--5 ml-2">{{$t('days')}}</div>
      </div>
    </div>
    <div class="line-height-95">
      <div class="text-16 text-NTUC-6 font__medium text-right">{{ $t('dashboard.your_remaining') }}<br/>{{ $t('dashboard.time') }}</div>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex';

export default {

  data: (() => ({
    endDate: 0,
  })),
  computed: {
    days: function() {
      if (this.endDate < 0) return 0;
      return Math.trunc(this.endDate / 1000 / 60 / 60 / 24);
    },
    hours: function() {
      if (this.endDate < 0) return 0;
      return Math.trunc(this.endDate / 1000 / 60 / 60) % 24;
    },
    mins: function() {
      if (this.endDate < 0) return 0;
      return Math.trunc(this.endDate / 1000 / 60) % 60;
    }
  },
  async fetch() {
    try {
      const resWebGetCountDownBarPeriod = await this.webGetCountDownBarPeriod({
        "invoke": "System.execute",
        "argc": "2",
        "a0": "API.Flex.WebGetCountDownBarPeriod",
        "a1": {
          "employee": localStorage.getItem('empid'),
        }
      });
      this.endDate = (new Date(resWebGetCountDownBarPeriod.enddate).getTime() - new Date().getTime());
    } catch (error) {
      console.log('fetch: ' + error);
    }
  },
  filters: {
    twoDigits(value) {
      if (value.toString().length <= 1) {
        return '0' + value.toString();
      }
      return value.toString();
    }
  },
  methods: {
    ...mapActions('benefit', [
      'webGetCountDownBarPeriod',
    ]),
  },
  watch: {
    'endDate': function(newValue) {
      setTimeout(() => {
        if (newValue > 0) {
          this.endDate = newValue - 1000;
        } else {
          this.endDate = 0;
        }
      }, 1000);
    }
  }
}
</script>

<style scoped>
  @import '@/assets/css/dashboard/countdown.css';
</style>
