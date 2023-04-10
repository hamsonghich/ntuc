<template>
<div>
  <div class="inactive-page-custom inactive-page">
    <div class="text-NTUC-4 font__bold font-500 title-inactive">{{$t('inactive.title')}}</div>
    <div class="d-flex">
      <div class="content-left">
        <div class="text-24 text-NTUC-2 font__regular">{{$t('inactive.diagnostic')}}</div>
        <div class="text-20 text-NTUC-2 font__regular description">
          {{$t('inactive.description_1')}}<br/>
          {{$t('inactive.description_2')}}<br/> <br/>
          {{$t('inactive.description_3')}}<br/> <br/>
          {{$t('inactive.description_4')}}
        </div>
      </div>
      <div>
        <img
          class="spinning-img"
          src="@/assets/images/spining-vertex.png"
          alt="spinning-vertex"
        />
      </div>
    </div>
    <b-button class="bg-NTUC-6 pring-back border-0 text-20 font-300" @click="$router.push({name: 'login'})">{{ $t('exception.return') }}</b-button>
  </div>
</div> 
</template>
<script>
export default {
  layout: 'default'
};
</script>

<style style="css" scoped>
@import '@/assets/css/inactive/index.css';
.back-step{
  margin-top: 62px;
}
.inactive-page-custom{
  margin: 108px 155px 125px 155px;
}

</style>
