<template>
  <div class="wrapper__quote__log d--none bg__claim__image h-100">
    <div class="quote__log pt--352">
    </div>
    <div class="quote__log_2">
      <!-- <div class="wap-quote__log">
        <p class="checksize">"{{ this.quoteShow }}"</p>
        <p>{{ this.authorShow }}</p>
      </div> -->
    </div>
  </div>
</template>

<script>
  import { mapActions, mapGetters } from 'vuex';
  export default {
    data: () => ({
      quoteData: [],
      checkQuote: 0,
      quoteShow: '',
      authorShow: '',
    }),
    computed: {
      ...mapGetters('dashboard', ['checkMMBDashboard'])
    },
    async created() {
      setTimeout(() => {
        this.quoteData = this.checkMMBDashboard.data.filter(item => {
          if (item.state === '33' && item.category_id === "20253") {
            return { quote: item.quote, author: item.author};
          }
        });
        this.quoteShow = this.quoteData[0].quote;
        this.authorShow = this.quoteData[0].author;
      }, 1000);
    },
    methods: {
      ...mapActions('dashboard', ['fetchMMBDashboard'])
    },
    watch: {
      quoteShow: function () {
        setTimeout(() => {
          this.checkQuote = this.checkQuote + 1;
          if (this.checkQuote === this.quoteData.length) {
            this.checkQuote = 0;
            this.quoteShow = this.quoteData[this.checkQuote].quote;
            this.authorShow = this.quoteData[this.checkQuote].author;
          } else {
            this.quoteShow = this.quoteData[this.checkQuote].quote;
            this.authorShow = this.quoteData[this.checkQuote].author;
          }
        }, 4000);
      }
    }
  };
</script>

<style scoped>
  @import '@/assets/css/inputCustom/inputCustom.css';
  @import '@/assets/css/claim/stepOneLog.css';
  .checksize {
    overflow: hidden;
    display: -webkit-box;
    -webkit-line-clamp: 8;
    -webkit-box-orient: vertical;
  }
  .wap-quote__log{
      min-height: 260px;
  }
</style>
