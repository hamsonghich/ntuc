<template>
  <div>
    <b-modal
      v-model="_modalShowHome"
      centered
      size="xl"
      hide-header
      hide-footer
      content-class="bg-transparent border-0"
      
    >
      <div class="d-flex flex-column justify-content-start align-items-center">
        <img class="loading-rotate" src="@/assets/logo/loading-benefit.svg" alt="" />
        <div class="text-white text-32 font-500 text-center completed-home-text">{{$t('contact_us.modal_home_text')}}</div>
        <div class="text-16 text-white">{{$t('contact_us.modal_text_back_home')}}<span class="text-NTUC-3">{{count}} secs.</span></div>
      </div>
    </b-modal>
  </div>
</template>
<script>
export default {
  props: ['modalShowHome'],
  data(){
    return{
      count: 5,
      myToid: null
    }
  },
  computed: {
    _modalShowHome: {
      get: function () {
        return this.modalShowHome;
      },
      set: function (value) {
        this.$emit('handleModalShow', value);
      }
    }
  },
  mounted(){
    setTimeout(()=>{
      this._handleViewHome()
    },5000)
  },
  created(){
    this.countDown()
  },
  methods: {
    _handleViewHome(){
      this._modalShowHome = false
      this.$router.go(-1);
    },
    countDown(){
      if(this.count > 0){
        this.myToid = setTimeout(() => {
          this.count--;
          this.countDown()
        },1000)
      }
      else{
        clearTimeout(this.myToid)
      }
    }
  }
};
</script>

<style scoped>
@import '@/assets/css/first-time-login/benefit/familyForm.css';
.completed-home-text{
  max-width: 491px;
}
</style>
