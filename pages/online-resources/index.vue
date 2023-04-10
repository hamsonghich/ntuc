<template>
  <div class="w-100">
    <div class="color-render">
      <div class="container container-reader px-0">
        <h2 class="font__medium mb--10 text-24 text-black font-500">{{ $t('online-resources.Browse') }}</h2>
        <div class="padding-responsive">
          <cardRenders :cardRenders="readerCardPublic" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import cardRenders from '../../components/card-renders/index.vue';
import { mapGetters, mapActions } from 'vuex';
export default {
  components: { cardRenders },
  data() {
    return {
      readerCardPublic: [],
      previewLink: ''
    };
  },
  computed: {
    ...mapGetters('readers', ['readerCard'])
  },
  created() {
    this.cardData();
  },
  methods: {
    ...mapActions('readers', ['handlereadersCard']),
    async cardData() {
      await this.handlereadersCard({
        invoke: 'System.execute',
        argc: '2',
        a0: 'API.QuickAccess.getListing'
      });
      this.readerCardPublic = [...this.readerCard];
      this.readerCardPublic = this.readerCard.filter(item => {
        if (item.state == 'Published') {
          return item;
        }
      });
    },
    handleBackToHome() {
      const consentagreementflag = localStorage.getItem('consentagreementflag') == 'true' ? true : false;
      const isPasswordChanged = localStorage.getItem('isPasswordChanged') == 'true' ? true: false;
      const isfirstEnrollFlag = localStorage.getItem('isfirstEnrollFlag') == 'true' ? true : false ;
      if(consentagreementflag && isPasswordChanged  && isfirstEnrollFlag){
        this.$router.push({ name: 'first-time-login-dashboard' });
      } else {
        this.$router.go(-1);
      }
    }
  }
};
</script>

<style scoped>
@import '@/assets/css/card-readers/index.css';
</style>
