<template>
  <div class="content">
    <div>
      <div class="d-sm-flex">
        <div class="content-left">
          <div class="text-24 font__medium font-500 mb--40 d-sm-block d-md-block d-lg-none d-xl-none text-center text-NTUC-6">
            {{ $t('telemed.heyally') }}
          </div>
          <div class="text-24 font__medium font-500 mb--10 d-none d-sm-none d-md-none d-lg-block d-xl-block text-NTUC-6">
            {{ $t('telemed.heyally') }}
          </div>
          <div>
            <div class="text-20 font-500 font__medium mb-2 d-none d-sm-none d-md-none d-lg-block d-xl-block text-NTUC-4">
              {{ $t('telemed.what_is_benefit') }}
            </div>
            <div class="font__regular text-16 font-400 text-gray--900 mb-2 d-none d-sm-none d-md-none d-lg-block d-xl-block">
              {{ $t('telemed.Access_to_heyally') }}
            </div>
            <div class="font__regular text-16 font-400 text-gray--900 mb-2 d-none d-sm-none d-md-none d-lg-block d-xl-block">
              {{ $t('telemed.Download_HeyAlly_App') }}
            </div>
            <div class="text-20 font-500 font__medium mb--10 d-sm-block d-md-block d-lg-none d-xl-none text-NTUC-4">
              {{ $t('telemed.Access_to') }}
            </div>
            <div class="font__regular text-16 font-400 mb--10 d-sm-block d-md-block d-lg-none d-xl-none text-gray--700">
              {{ $t('telemed.connect_with_registered') }}
            </div>
            <div class="text-20 font-500 font__medium mb--10 d-none d-sm-none d-md-none d-lg-block d-xl-block text-NTUC-4">
              {{ $t('telemed.how_do_i_use_heyAlly') }}
            </div>
            <div class="font__regular text-16 font-400 text-gray--900 mb-2 d-none d-sm-none d-md-none d-lg-block d-xl-block">
              {{ $t('telemed.Download_HeyAlly') }}
            </div>
            <div class="m-0 d-sm-block d-md-block d-lg-none d-xl-none">
              <div class="p-0 m-1 mx-auto">
                <button
                  class="text-left button-employee mb--10 text-NTUC-7 justify-content-between d-flex w-100 align-items-center bg-NTUC-3 text-20 font__medium font-500"
                  @click="handleShowDialog('')"
                >
                <div class="text-long text-left text-NTUC-7 bg-NTUC-3 text-20 font__medium font-500">{{ $t('telemed.myself') }}</div>
                  <img src="@/assets/images/chevron-right.png" class="mr-2" alt="">
                </button>
              </div>
              <div class="p-0 m-1 mx-auto" v-for="(item, index) in listDependants" :key="index" v-if="checkDependent">
                <div 
                  class="text-left button-employee mb--10 text-NTUC-7 justify-content-between w-100 d-flex align-items-center bg-NTUC-3 text-20 font__medium font-500"
                  @click="handleShowDialog(item)"
                  v-if="checkDependent"
                >
                  <div class="text-long text-left text-NTUC-7 bg-NTUC-3 text-20 font__medium font-500">{{ $t('telemed.Tele-consult') }} {{item.name}}</div>
                  <img src="@/assets/images/chevron-right.png" class="mr-2" alt="">
              </div>
              </div>
            </div>
            <div class="mt--10">
              <div class="text-20 font-500 font__regular mb--10 d-none text-NTUC-4">
                {{ $t('telemed.how_do_i_use_heyAlly') }}
              </div>
              <div class="text-20 font-500 font__medium mb--10 d-sm-none text-NTUC-4 mt-44">
                {{ $t('telemed.how_do_i_use_heyAlly') }}
              </div>
              <div class="font__regular text-16 font-500 mb--10 text-gray--900 d-none">
                {{ $t('telemed.please_access') }}
              </div>
              <div class="font__regular text-16 font-400 mb--10 d-sm-block d-md-block d-lg-none d-xl-none text-gray--700">
                {{ $t('telemed.please_access') }}
              </div>
            </div>
            <div class="mb-2 d-none d-sm-none d-md-none d-lg-block d-xl-block">
              <div>
                <div class="font__medium text-16 font-500 text-gray--900 mb-2">
                  {{ $t('telemed.Monday_Friday') }}
                </div>
                <ul class="pl--20">
                  <li class="font__regular text-16 font-400 mb-2 ml-2 text-gray--900">
                    {{ $t('telemed.8am_to_8pm') }}
                  </li>
                </ul>
                <div class="font__medium text-16 font-500 text-gray--900 mb-2">
                  {{ $t('telemed.Saturday_Sunday') }}
                </div>
                <ul class="pl--20">
                  <li class="font__regular text-16 font-400 mb-2 ml-2 text-gray--900">
                    {{ $t('telemed.8am_to_12noon') }}
                  </li>
                </ul>
                <div class="font__medium text-16 font-500 text-gray--900 mb-2">
                  {{ $t('telemed.public_holidays') }}
                </div>
                <ul class="pl--20">
                  <li class="font__regular text-16 font-400 mb-2 ml-2 text-gray--900">
                    {{ $t('telemed.Closed') }}
                  </li>
                </ul>
              </div>
            </div>
            <div class="d-sm-none">
              <b-row class="m-0 mb-1 mb-sm-0 ">
                <b-col cols="6" sm="12" class="text-18 font-500 text-nowrap font__medium p-0 text-gray--900">
                  {{ $t('telemed.Monday_Friday') }}
                </b-col>
                <b-col cols="6" sm="12" class="font__regular font-400 p-0 text-gray--900">
                    {{ $t('telemed.8am_to_8pm') }}
                </b-col>
              </b-row>
              <b-row class="m-0 mb-1 mb-sm-0">
                <b-col cols="6" sm="12" class="text-18 font-500 text-nowrap font__medium p-0 text-gray--900">
                  {{ $t('telemed.Saturday_Sunday') }}
                </b-col>
                <b-col cols="6" sm="12" class="font__regular font-400 p-0 text-gray--900">
                  {{ $t('telemed.8am_to_12noon') }}
                </b-col>
              </b-row>
              <b-row class="m-0 mb-1 mb-sm-0">
                <b-col cols="6" sm="12" class="text-18 font-500 text-nowrap font__medium p-0 text-gray--900">
                  {{ $t('telemed.public_holidays') }}
                </b-col>
                <b-col cols="6" sm="12" class="font__regular font-400 p-0 text-gray--900">
                    {{ $t('telemed.Closed') }}
                </b-col>
              </b-row>
            </div>
            <div class="mt--10">
              <div class="text-20 font-500 font__medium mb-2 text-NTUC-4 d-none d-sm-none d-md-none d-lg-block d-xl-block">
                {{ $t('telemed.Frequently_Asked_Questions') }}
              </div>
              <div class="text-20 font-500 font__medium mb-2 text-NTUC-4 d-sm-block d-md-block d-lg-none d-xl-none mt-44">
                {{ $t('telemed.Frequently_Asked_Questions') }}
              </div>
              <div class="text-18 font-500 font__medium mb-2 d-none d-sm-none d-md-none d-lg-block d-xl-block text-gray--900">
                {{ $t('telemed.Is_this') }}
              </div>
              <div class="font__regular text-16 font-400 mb--10 d-none d-sm-none d-md-none d-lg-block d-xl-block text-gray--900">
                {{ $t('telemed.Yes_this') }}
              </div>
              <div class="font__regular text-16 font-400 mb--10 d-sm-block d-md-block d-lg-none d-xl-none text-gray--700">
                {{ $t('telemed.all_charge') }}
              </div>
              <div class="text-18 font-500 font__medium mb-2 text-gray--900">
                {{ $t('telemed.How_long') }}
              </div>
              <div class="font__regular text-16 font-400 mb--10 d-none d-sm-none d-md-none d-lg-block d-xl-block text-gray--900">
                {{ $t('telemed.Your_medication') }}
              </div>
              <div class="font__regular text-16 font-400 mb--10 d-sm-block d-md-block d-lg-none d-xl-none text-gray--700">
                {{ $t('telemed.Your_medication') }}
              </div>
              <div class="text-18 font-500 font__medium mb-2 text-gray--900">
                {{ $t('telemed.can_i_access') }}
              </div>
              <div class="font__regular text-16 font-400 mb--10 d-none d-sm-none d-md-none d-lg-block d-xl-block">
                {{ $t('telemed.no_this_service') }}
              </div>
              <div class="font__regular text-16 font-400 mb--10 d-sm-block d-md-block d-lg-none d-xl-none text-gray--700">
                {{ $t('telemed.no_this_service') }}
              </div>
              <div class="text-18 font-500 font__medium mb-2 text-gray--900">
                {{ $t('telemed.if_i_need') }}
              </div>
              <div class="font__regular text-16 font-400 mb--10 d-sm-block d-md-block d-lg-none d-xl-none text-gray--700">
                {{ $t('telemed.you_may_contact') }}
              </div>
              <div class="d-flex mb-2">
                <ul class="pl--20 d-sm-block d-md-block d-lg-none d-xl-none">
                  <li class="font__regular text-16 font-400 mb-2 ml-2 text-gray--900">
                    {{ $t('telemed.Email') }}
                  </li>
                  <li class="font__regular text-16 font-400 mb-2 ml-2 text-gray--900">
                    {{ $t('telemed.Phone') }}
                  </li>
                </ul>
                <ul class="pl--20 d-none d-sm-none d-md-none d-lg-block d-xl-block">
                  <li class="font__regular text-16 font-400 mb-2 ml-2 text-gray--900">
                    {{ $t('telemed.Email') }}
                  </li>
                  <li class="font__regular text-16 font-400 mb-2 ml-2 text-gray--900">
                    {{ $t('telemed.Phone') }}
                  </li>
                </ul>
                <div>
                  <div class="font__regular text-16 font-400 mb-2 ml-2 d-none d-sm-none d-md-none d-lg-block d-xl-block text-gray--900">
                    : {{ $t('telemed.MMB@rhythmasia') }}
                  </div>
                  <div class="font__regular text-16 font-400 mb-2 ml-2 d-none d-sm-none d-md-none d-lg-block d-xl-block text-gray--900">
                    : {{ $t('telemed.+6566640868') }}
                  </div>
                </div>
                <div>
                  <div class="font__regular text-16 font-400 mb-2 ml-2 d-sm-block d-md-block d-lg-none d-xl-none text-gray--700">
                    : {{ $t('telemed.MMB@rhythmasia') }}
                  </div>
                  <div class="font__regular text-16 font-400 mb-2 ml-2 d-sm-block d-md-block d-lg-none d-xl-none text-gray--700">
                    : {{ $t('telemed.+6566640868') }}
                  </div>
                </div>
              </div>
              <div class="text-18 font-500 font__medium mb-2 text-gray--900">
                {{ $t('telemed.Important') }}
              </div>
              <div class="text-16 font-400 font__regular mb-2 text-gray--700 d-sm-block d-md-block d-lg-none d-xl-none">
                {{ $t('telemed.dependants') }}
              </div>
              <div class="text-16 font-400 font__regular mb-2 text-gray--700 d-sm-block d-md-block d-lg-none d-xl-none">
                {{ $t('telemed.clicking') }} <br> <span class="text-NTUC-4">"{{ $t('telemed.New_Account') }}"</span> <br> {{ $t('telemed.HeyAlly_app') }}
              </div>
              <div class="text-16 font-400 font__regular mb-4 text-gray--700 d-sm-block d-md-block d-lg-none d-xl-none">
                {{ $t('telemed.teleconsultation') }}
              </div>

              <div class="text-16 font-400 font__regular mb-2 text-gray--900 d-none d-sm-none d-md-none d-lg-block d-xl-block">
                {{ $t('telemed.dependants') }}
              </div>
              <div class="text-16 font-400 font__regular mb-2 text-gray--900 d-none d-sm-none d-md-none d-lg-block d-xl-block">
                {{ $t('telemed.clicking') }} <span class="text-NTUC-4">"{{ $t('telemed.New_Account') }}"</span> {{ $t('telemed.HeyAlly_app') }}
              </div>
              <div class="text-16 font-400 font__regular text-gray--900 mb-4 d-none d-sm-none d-md-none d-lg-block d-xl-block">
                {{ $t('telemed.teleconsultation') }}
              </div>
            </div>
          </div>
        </div>
        <div class="d-none d-sm-none d-md-none d-lg-block d-xl-block">
          <img class="img-telemed" src="@/assets/logo/telemed.png" alt="img-telemed" />
        </div>
      </div>
    </div>
    <ConsultDoctor :showDialog="showDialog" :dependants="dependants" :checkDependent="checkDependent" :close="closeDailog" v-if="showDialog"/>
  </div>
</template>

<script>
import ConsultDoctor from '../../components/telemed/modal/consult-doctor.vue';
import { postAxios } from '@/services/callApi';
import { EXCEPTION } from '@/utils/constants/statusResponse';

export default {
  components: { ConsultDoctor },
  data() {
    return {
      checkDependent: localStorage.getItem('isemployee')=='true',
      showDialog: false,
      listDependants: [],
      dependantsId:""
    };
  },
  created() {
    this.getDependants();
    this.url =
      process.env.API_URL +
      'servlet/ProcessAttachment?invoke=QuickAccess_Reference.displayReference&argc=1&a0=49426';
  },
  methods: {
    closeDailog(){
      this.showDialog = false
    },
    handleShowDialog(value) {
      this.showDialog = true;
      this.dependants= value
    },
    async getDependants() {
      const res = await postAxios({
        invoke: 'System.execute',
        argc: '2',
        a0: 'API.EmployeeDpdt.Get'
      });
      if (res.data.data[0].dt !== EXCEPTION) {
        this.listDependants = JSON.parse(res.data.data[0].value).data.dependants;
      }
    }
  }
};
</script>

<style scoped>
@import '@/assets/css/telemed/index.css';
</style>
