
<template>
<div>
  <div class="inactive-page">
    <div class="d-flex">
      <div class="d-flex">
        <div class="content-left mr--35">
          <div class="text-NTUC-4 font__bold font-500 title-inactive">{{ $t('exception.title_inactive') }}</div>
          <div class="font__regular font-400 text-24 line-height-10 text-NTUC-2">
              {{ $t('exception.title') }}
            </div>
          <div class="text-18 text-NTUC-2 font__regular mt--40">
            {{$t('exception.description_1')}}<br/>
            <span style="color: rgba(46, 200, 198, 1)">
                {{ $t('exception.email') }}
              </span>
            {{$t('exception.description_2')}}<br/> <br/>
            {{$t('exception.description_3')}}<br/> <br/>
            {{$t('exception.description_4')}}
          </div>
          <b-button class="bg-NTUC-6 border-0 text-20 mt--32" @click="handleChangePage">{{ $t('exception.return') }}</b-button>
        </div>
        <div class="ml--50">
          <img
            src="@/assets/logo/exception.svg"
            alt="spinning-vertex"
          />
        </div>
      </div>
    </div> 
  </div>
</div> 
</template>
<script>
export default {
  layout: 'first-time-login',
  methods: {
    handleChangePage() {
      this.$router.go(-1);
    }
  }
};
</script>

<style style="css" scoped>
@import '@/assets/css/inactive/index.css';
.inactive-page{
  margin: 143px 0px 125px 88px;
}
</style>