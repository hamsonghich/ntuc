<template>
  <div class="d-flex flex-column align-items-end">
    <div class="d-flex align-items-center">
      <div class="text-23 text-NTUC-6 mr--10 font__medium">{{days | twoDigits}}</div>
      <div class="mr--10 text-16 text-gray--800 font__medium">{{$t('days')}}</div>
      <div class="text-23 text-NTUC-6 mr--10 font__medium">{{hours | twoDigits}}</div>
      <div class="mr--10 text-16 text-gray--800 font__medium">{{$t('hours')}}</div>
      <div class="text-23 text-NTUC-6 mr--10 font__medium">{{mins | twoDigits}}</div>
      <div class="text-16 text-gray--800 font__medium">{{$t('mins')}}</div>
    </div>
    <div>
      <div class="text-16 text-NTUC-6 font__medium">{{$t('Enrolment_Countdown')}}</div>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex';

export default {
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
