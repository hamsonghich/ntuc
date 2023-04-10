<template>
  <div>
    <div class="box_clinic bg-white d-flex flex-row h-100">
      <div class="pr-1">
          <img src="../../../assets/images/home-icon.png" alt="map" />
      </div>
      <div class="d-block w-100">
        <h3 class="font-400 text-16 text-NTUC-6 line-height-19 text-MMB-2 w-75 text-truncate">{{ data.clinic }}</h3>
        <div class="d-block align-items-center pb-2">
          <p class="font__regular text-gray--900 font-400 text-14 mb-1">{{ data.detailsofservice ? data.detailsofservice : 'General Medical' }}</p>
          <p class="font__regular text-NTUC-25 font-400 text-12 mb-0">{{ $t('clinic.service') }}</p>
        </div>
        <div class="d-block align-items-center pb-2">
          <p class="font__regular text-gray--900 font-400 text-14 mb-1 w-75 text-truncate">{{ data.address }}</p>
          <p class="font__regular text-NTUC-25 font-400 text-12 mb-0">{{ $t('clinic.address') }}</p>
        </div>
        <div class="d-flex align-items-center pb-2">
          <div class="d-block w-50 align-items-center">
            <p class="font__regular text-gray--900 font-400 text-14 mb-1">{{ data.postalcode }}</p>
            <p class="font__regular text-NTUC-25 font-400 text-12 mb-0">{{ $t('clinic.postal_code') }}</p>
          </div>
          <div class="d-block w-50 align-items-center">
            <p class="font__regular text-gray--900 font-400 text-14 mb-1">{{ data.phoneno }}</p>
            <p class="font__regular text-NTUC-25 font-400 text-12 mb-0">{{ $t('clinic.phone_number') }}</p>
          </div>
        </div>
        <div v-if="iPhone===true" class="d-flex mb-4 d-lg-none d-block justify-content-between align-items-end">
          <div class="item ">
            <div class="tag bg-MMB-2" v-if="!!data.distance">
              <span class="text-center font__regular font-400 line-height-15 text-16">
                {{ data.distance }}
              </span>
            </div>
          </div>
          <div class="view_map_mobile justify-content-center align-items-center text-nowrap">
            <a
              :href="`https://maps.google.com/maps?q=${data.address.replace('#','')}`"
              target="_blank"
              class="font__regular font-400 text-16 line-height-15"
              >View Map</a
            >
          </div>
        </div>
        <div v-if="androidPhoneOrDesktop===true" class="d-flex mb-4 d-lg-none d-block justify-content-between align-items-end">
          <div class="item ">
            <div class="tag bg-MMB-2" v-if="!!data.distance">
              <span class="text-center font__regular font-400 line-height-15 text-16">
                {{ data.distance }}
              </span>
            </div>
          </div>
          <div class="view_map_mobile justify-content-center align-items-center text-nowrap">
            <a
              :href="`https://maps.google.com/maps?q=${data.address.replace('#','')}`"
              target="_blank"
              class="font__regular font-400 text-16 line-height-15"
              >View Map</a
            >
          </div>
        </div>
        <div class="d-lg-none d-block">
          <div class="d-flex">
          <b-button @click="visible = !visible" class="view_map_mobile text-white mb-3 ">{{ $t('dashboard.ClinicResource.Opening_Days') }}</b-button>
          </div>
          <b-collapse v-model="visible">
            <b-row class="item d-flex">
              <b-col cols="12" sm="6" class="operat__time" v-if="data.operatingtime.Monday">
                <b-row class="w-100">
                  <b-col cols="4" class="fz-20 text-12 mx-0 pr-0">{{$t('day_time.Monday')}}</b-col>
                  <b-col cols="8" class="operat__time">
                    <div
                      class="font__regular font-400 text-12 line-height-15 text-NTUC-9 mb-2"
                      v-for="(item, index) in data.operatingtime.Monday"
                      :key="index"
                    >
                      {{ convertTime12to24(item.starttime) }} {{item.endtime ? '-' : ''}} {{ convertTime12to24(item.endtime) }}
                    </div>
                  </b-col>
                </b-row>
              </b-col>
              <b-col cols="12" sm="6" class="operat__time operat__time__custom" v-if="data.operatingtime.Tuesday">
                <b-row class="w-100">
                  <b-col cols="4" class="fz-20 text-12 mx-0 pr-0">{{$t('day_time.Tuesday')}}</b-col>
                  <b-col cols="8" class="operat__time">
                    <div
                      class="d-flex font__regular font-400 text-12 line-height-15 text-NTUC-9  mb-2"
                      v-for="(item, index) in data.operatingtime.Tuesday"
                      :key="index"
                    >
                      {{ convertTime12to24(item.starttime) }} {{item.endtime ? '-' : ''}} {{ convertTime12to24(item.endtime) }}
                    </div>
                  </b-col>
                </b-row>
              </b-col>
              <b-col cols="12" sm="6" class="operat__time" v-if="data.operatingtime.Wednesday">
                <b-row class="w-100">
                  <b-col cols="4" class="fz-20 text-12 mx-0 pr-0">{{$t('day_time.Wednesday')}}</b-col>
                  <b-col cols="8" class="operat__time">
                    <div
                      class="font__regular font-400 text-12 line-height-15 text-NTUC-9 mb-2"
                      v-for="(item, index) in data.operatingtime.Wednesday"
                      :key="index"
                    >
                      {{ convertTime12to24(item.starttime) }} {{item.endtime ? '-' : ''}} {{ convertTime12to24(item.endtime) }}
                    </div>
                  </b-col>
                </b-row>
              </b-col>
              <b-col cols="12" sm="6" class="operat__time operat__time__custom" v-if="data.operatingtime.Thursday">
                <b-row class="w-100">
                  <b-col cols="4" class="fz-20 text-12 mx-0 pr-0">{{$t('day_time.Thursday')}}</b-col>
                  <b-col cols="8" class="operat__time">
                    <div
                      class="d-flex font__regular font-400 text-12 line-height-15 text-NTUC-9 mb-2"
                      v-for="(item, index) in data.operatingtime.Thursday"
                      :key="index"
                    >
                      {{ convertTime12to24(item.starttime) }} {{item.endtime ? '-' : ''}} {{ convertTime12to24(item.endtime) }}
                    </div>
                  </b-col>
                </b-row>
              </b-col>
              <b-col cols="12" sm="6" class="operat__time" v-if="data.operatingtime.Friday">
                <b-row class="w-100">
                  <b-col cols="4" class="fz-20 text-12 mx-0 pr-0">{{$t('day_time.Friday')}}</b-col>
                  <b-col cols="8" class="operat__time">
                    <div
                      class="d-flex font__regular font-400 text-12 line-height-15 text-NTUC-9 mb-2"
                      v-for="(item, index) in data.operatingtime.Friday"
                      :key="index"
                    >
                      {{ convertTime12to24(item.starttime) }} {{item.endtime ? '-' : ''}} {{ convertTime12to24(item.endtime) }}
                    </div>
                  </b-col>
                </b-row>
              </b-col>
              <b-col cols="12" sm="6" class="operat__time operat__time__custom" v-if="data.operatingtime.Saturday">
                <b-row class="w-100">
                  <b-col cols="4" class="fz-20 text-12 mx-0 pr-0">{{$t('day_time.Saturday')}}</b-col>
                  <b-col cols="8" class="operat__time">
                    <div
                      class="d-flex font__regular font-400 text-12 line-height-15 text-NTUC-9 mb-2"
                      v-for="(item, index) in data.operatingtime.Saturday"
                      :key="index"
                    >
                      {{ convertTime12to24(item.starttime) }} {{item.endtime ? '-' : ''}} {{ convertTime12to24(item.endtime) }}
                    </div>
                  </b-col>
                </b-row>
              </b-col>
              <b-col cols="12" sm="6" class="operat__time" v-if="data.operatingtime.Sunday">
                <b-row class="w-100">
                  <b-col cols="4" class="fz-20 text-12 mx-0 pr-0">{{$t('day_time.Sunday')}}</b-col>
                  <b-col cols="8" class="operat__time">
                    <div
                      class="d-flex font__regular font-400 text-12 line-height-15 text-NTUC-9  mb-2"
                      v-for="(item, index) in data.operatingtime.Sunday"
                      :key="index"
                    >
                      {{ convertTime12to24(item.starttime) }} {{item.endtime ? '-' : ''}} {{ convertTime12to24(item.endtime) }}
                    </div>
                  </b-col>
                </b-row>
              </b-col>
              <b-col cols="12" sm="6" class="operat__time operat__time__custom" v-if="data.operatingtime['Public Holiday']">
                <b-row class="w-100">
                  <b-col cols="4" class="fz-20 text-12 mx-0 pr-0">{{$t('day_time.Holiday')}}</b-col>
                  <b-col cols="8" class="operat__time">
                    <div
                      class="d-flex font__regular font-400 text-12 line-height-15 text-NTUC-9 mb-2"
                      v-for="(item, index) in data.operatingtime['Public Holiday']"
                      :key="index"
                    >
                      {{ convertTime12to24(item.starttime) }} {{item.endtime ? '-' : ''}} {{ convertTime12to24(item.endtime) }}
                    </div>
                  </b-col>
                </b-row>
              </b-col>
              <b-col cols="12" sm="6" class="operat__time" v-for="(item, key) in otherDate(data.operatingtime)" :key="key">
                <b-row class="w-100" v-if="key">
                  <b-col cols="4" class="fz-20 text-12 mx-0 pr-0">{{key}}</b-col>
                  <b-col cols="8" class="operat__time">
                    <div
                      class="d-flex font__regular font-400 text-12 line-height-15 text-NTUC-9"
                      v-for="(el, index) in item"
                      :key="index"
                    >
                      {{ el.starttime }} {{el.endtime ? '-' : ''}} {{ el.endtime }}
                    </div>
                  </b-col>
                </b-row>
              </b-col>
            </b-row>
          </b-collapse>
        </div>
        <div class="mt--8">
          <button
            v-if="isShow"
            class="btn-show bg-NTUC-1 py--6 px--8 h-100 bra-left-4 border-0 d-flex justify-content-between align-items-center"
            @click="showOpeningHours()"
            >
            <p class="text-12 font__regular font-400 mb-0 text-NTUC-9">{{ $t('clinic.opening_hours') }}</p>
            <img class="ml-2 icon-down-ct icon-size rounded-circle" src="@/assets/images/arrow-down-icon.png" alt="" />
          </button>
          <button
            v-if="!isShow"
            class="btn-show bg-NTUC-3 py--6 px--8 h-100 bra-left-4 border-0 d-flex justify-content-between align-items-center"
            @click="showOpeningHours()"
            >
            <p class="text-12 font__regular font-400 mb-0 text-NTUC-9">{{ $t('clinic.opening_hours') }}</p>
            <img class="ml-2 icon-down-ct icon-size rounded-circle" src="@/assets/images/arrow-down-icon.png" alt="" />
          </button>
          <!-- <div class="footing d-none d-lg-flex justify-content-between align-items-end">
            <div class="item d-none d-lg-block">
              <div class="tag bg-MMB-2" v-if="!!data.distance">
                <span class="text-center font__regular font-400 line-height-15 text-16">
                  {{ data.distance }}
                </span>
              </div>
            </div>
            <div class="view_map d-none d-lg-flex justify-content-center align-items-center text-nowrap">
              <a
                :href="`https://google.com/maps?q=${data.address.replace('#','')}`"
                target="_blank"
                class="font__regular font-400 text-16 line-height-15"
                >View Map</a
              >
            </div>
            <div v-if="data.ispanel==='1'" class="tag d-block d-lg-none bg-MMB-1 type__sub mt-4" :class="{ non: !data.typeId }">
              <span class="d-flex justify-content-center font__regular font-400 line-height-15 text-16">{{
                data.type
              }}</span>
            </div>
          </div> -->
        </div>
      </div>
    </div>
    <div v-if="isShow" class="box_clinic d-flex flex-row bg-NTUC-6 py-3">
      <div class="pr-1 invisible">
          <img src="../../../assets/images/home-icon.png" alt="map" />
      </div>
      <div>
        <b-row class="item d-flex">
        <b-col cols="12" sm="12" class="operat__time" v-if="data.operatingtime.Monday">
          <b-row class="w-100">
            <b-col cols="4" class="text-12 mx-0 text-NTUC-18 pr-0">{{$t('day_time.Monday')}}</b-col>
            <b-col cols="8" class="operat__time">
              <span
                class="font__regular font-400 text-12 line-height-15 mb-2 text-NTUC-9"
                v-for="(item, index) in data.operatingtime.Monday"
                :key="index"
              >
                {{ convertTime12to24(item.starttime) }}{{item.endtime ? '-' : ''}}{{ convertTime12to24(item.endtime) }}{{ index + 1 != data.operatingtime.Monday.length ? ',' : '' }}
              </span>
            </b-col>
          </b-row>
        </b-col>
        <b-col cols="12" sm="12" class="operat__time operat__time__custom" v-if="data.operatingtime.Tuesday">
          <b-row class="w-100">
            <b-col cols="4" class="text-12 mx-0 text-NTUC-18 pr-0">{{$t('day_time.Tuesday')}}</b-col>
            <b-col cols="8" class="operat__time">
              <span
                class="font__regular font-400 text-12 line-height-15 mb-2 text-NTUC-9"
                v-for="(item, index) in data.operatingtime.Tuesday"
                :key="index"
              >
                {{ convertTime12to24(item.starttime) }}{{item.endtime ? '-' : ''}}{{ convertTime12to24(item.endtime) }}{{ index + 1 != data.operatingtime.Tuesday.length ? ',' : '' }}
              </span>
            </b-col>
          </b-row>
        </b-col>
        <b-col cols="12" sm="12" class="operat__time" v-if="data.operatingtime.Wednesday">
          <b-row class="w-100">
            <b-col cols="4" class="text-12 mx-0 text-NTUC-18 pr-0">{{$t('day_time.Wednesday')}}</b-col>
            <b-col cols="8" class="operat__time">
              <span
                class="font__regular font-400 text-12 line-height-15 mb-2 text-NTUC-9"
                v-for="(item, index) in data.operatingtime.Wednesday"
                :key="index"
              >
                {{ convertTime12to24(item.starttime) }}{{item.endtime ? '-' : ''}}{{ convertTime12to24(item.endtime) }}{{ index + 1 != data.operatingtime.Wednesday.length ? ',' : '' }}
              </span>
            </b-col>
          </b-row>
        </b-col>
        <b-col cols="12" sm="12" class="operat__time operat__time__custom" v-if="data.operatingtime.Thursday">
          <b-row class="w-100">
            <b-col cols="4" class="text-12 mx-0 text-NTUC-18 pr-0">{{$t('day_time.Thursday')}}</b-col>
            <b-col cols="8" class="operat__time">
              <span
                class="font__regular font-400 text-12 line-height-15 mb-2 text-NTUC-9"
                v-for="(item, index) in data.operatingtime.Thursday"
                :key="index"
              >
                {{ convertTime12to24(item.starttime) }}{{item.endtime ? '-' : ''}}{{ convertTime12to24(item.endtime) }}{{ index + 1 != data.operatingtime.Thursday.length ? ',' : '' }}
              </span>
            </b-col>
          </b-row>
        </b-col>
        <b-col cols="12" sm="12" class="operat__time" v-if="data.operatingtime.Friday">
          <b-row class="w-100">
            <b-col cols="4" class="text-12 mx-0 text-NTUC-18 pr-0">{{$t('day_time.Friday')}}</b-col>
            <b-col cols="8" class="operat__time">
              <span
                class="font__regular font-400 text-12 line-height-15 mb-2 text-NTUC-9"
                v-for="(item, index) in data.operatingtime.Friday"
                :key="index"
              >
                {{ convertTime12to24(item.starttime) }}{{item.endtime ? '-' : ''}}{{ convertTime12to24(item.endtime) }}{{ index + 1 != data.operatingtime.Friday.length ? ',' : '' }}
              </span>
            </b-col>
          </b-row>
        </b-col>
        <b-col cols="12" sm="12" class="operat__time operat__time__custom" v-if="data.operatingtime.Saturday">
          <b-row class="w-100">
            <b-col cols="4" class="text-12 mx-0 text-NTUC-18 pr-0">{{$t('day_time.Saturday')}}</b-col>
            <b-col cols="8" class="operat__time">
              <span
                class="font__regular font-400 text-12 line-height-15 mb-2 text-NTUC-9"
                v-for="(item, index) in data.operatingtime.Saturday"
                :key="index"
              >
                {{ convertTime12to24(item.starttime) }}{{item.endtime ? '-' : ''}}{{ convertTime12to24(item.endtime) }}{{ index + 1 != data.operatingtime.Saturday.length ? ',' : '' }}
              </span>
            </b-col>
          </b-row>
        </b-col>
        <b-col cols="12" sm="12" class="operat__time" v-if="data.operatingtime.Sunday">
          <b-row class="w-100">
            <b-col cols="4" class="text-12 mx-0 text-NTUC-18 pr-0">{{$t('day_time.Sunday')}}</b-col>
            <b-col cols="8" class="operat__time">
              <span
                class="font__regular font-400 text-12 line-height-15 mb-2 text-NTUC-9"
                v-for="(item, index) in data.operatingtime.Sunday"
                :key="index"
              >
                {{ convertTime12to24(item.starttime) }}{{item.endtime ? '-' : ''}}{{ convertTime12to24(item.endtime) }}{{ index + 1 != data.operatingtime.Sunday.length ? ',' : '' }}
              </span>
            </b-col>
          </b-row>
        </b-col>
        <b-col cols="12" sm="12" class="operat__time operat__time__custom" v-if="data.operatingtime['Public Holiday']">
          <b-row class="w-100">
            <b-col cols="4" class="text-12 mx-0 text-NTUC-18 pr-0">{{$t('day_time.Holiday')}}</b-col>
            <b-col cols="8" class="operat__time">
              <span
                class="font__regular font-400 text-12 line-height-15 mb-2 text-NTUC-9"
                v-for="(item, index) in data.operatingtime['Public Holiday']"
                :key="index"
              >
                {{ convertTime12to24(item.starttime) }}{{item.endtime ? '-' : ''}}{{ convertTime12to24(item.endtime) }}{{ index + 1 != data.operatingtime['Public Holiday'].length ? ',' : '' }}
              </span>
            </b-col>
          </b-row>
        </b-col>
        <b-col cols="12" sm="12" class="operat__time" v-for="(item, key) in otherDate(data.operatingtime)" :key="key">
          <b-row class="w-100" v-if="key">
            <b-col cols="4" class="text-12 mx-0 pr-0">{{key}}</b-col>
            <b-col cols="8" class="operat__time">
              <span
                class="font__regular font-400 text-12 line-height-15 text-NTUC-9"
                v-for="(el, index) in item"
                :key="index"
              >
                {{ el.starttime }} {{el.endtime ? '-' : ''}} {{ el.endtime }} {{ index + 1 != item.length ? ',' : '' }}
              </span>
            </b-col>
          </b-row>
        </b-col>
        </b-row>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ['data','idx'],
  data () {
    return {
      isShow: false,
      visible: false,
      androidPhoneOrDesktop: false,
      iPhone : true //default iPhone is always true because 
    }
  },
  created () {
    this.isIOSPhone()
  },
  methods:{
    showOpeningHours() {
      this.isShow = !this.isShow;
      this.$forceUpdate();
    },
    convertTime12to24(time12h) {
      const [time, modifier] = time12h.split(' ');
      let [hours, minutes] = time.split(':');
      if (hours == '12') {
        hours = '00';
      }
      if (modifier == 'PM' || modifier === 'pm') {
        hours = parseInt(hours, 10) + 12;
      }
      return `${hours}${minutes}`;
    },
    otherDate(data) {
      let time = JSON.parse(JSON.stringify(data));
      delete time.Monday;
      delete time.Tuesday;
      delete time.Wednesday;
      delete time.Thursday;
      delete time.Friday;
      delete time.Saturday;
      delete time.Sunday;
      delete time['Public Holiday'];
      return time
    },
    isIOSPhone () {
        let userAgent = navigator.userAgent
        if ((userAgent.indexOf('iPhone') != -1) || (userAgent.indexOf('iPad') != -1) ) {
          this.androidPhoneOrDesktop = false //iPhone already defaulted to true
        } else {
          this.androidPhoneOrDesktop = true
          this.iPhone = false
        }
      },
  }
};
</script>

<style scoped>
@import '@/assets/css/clinic/item-clinic.css';
.fz-20{
  color: #54575B;
}
.line-row {
  height: 3px;
  background: rgba(0, 0, 0, 0.12);
}
</style>
