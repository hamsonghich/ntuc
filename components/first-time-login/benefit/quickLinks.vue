<template>
  <b-row>
    <b-col v-if="!isSaveAsDraft" cols="6" md="8">
      <div class="text-34 font__regular text-black mb--10">
        {{$t('benefit.welcome')}} 
      </div>
      <div>&nbsp;</div>
      <div class="text-20 text-gray--800 mb--5">
        {{$t('benefit.description_1')}}
      </div>
      <div class="text-20 text-gray--800 mb--5">
        {{$t('benefit.description_2')}}
      </div>
      <div class="text-20 text-gray--800">
        {{$t('benefit.description_3')}}
      </div>
    </b-col>
    <b-col v-else cols="6" md="8">
      <div class="text-34 font__regular text-black mb--10">
        {{$t('benefit.Welcome_back')}}
      </div>
      <div class="text-16 text-gray--800 mb--5">
        {{$t('benefit.description_1')}}
      </div>
      <div class="text-16 text-gray--800 mb--5">
        {{$t('benefit.These_are_the_benefits_that_you_have_saved')}}
      </div>
    </b-col>
    <b-col cols="6" md="4">
      <div class="wrapper__sidebar quickly__border--gray">
        <div class="text-14 font__bold text-NTUC-6 mb--20" style="letter-spacing: 8px">
          {{$t('benefit.QUICK_LINKS')}}
        </div>
        <a href="#/online-resources" class="d-block text-14 text-NTUC-5 mb--20 cursor_pointer">
          {{$t('benefit.Online_Resources')}}
        </a>
        <a href="#/first-time-login/contact-us" class="d-block text-14 text-NTUC-5 cursor_pointer">
          {{$t('benefit.Contact_Us')}}
        </a>
      </div>
    </b-col>
  </b-row>
</template>

<script>
export default {
  computed: {
    empName: function() {
      return localStorage.getItem('empName');
    }
  }
}
</script>

<style scoped>
@import '@/assets/css/first-time-login/benefit/cartBenefit.css';
</style>
