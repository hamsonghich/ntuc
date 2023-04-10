<template>
  <div class="h-100 w-100">
    <div class="bg-white d-flex flex-column wrapper__cart p--20 justify-content-between">
        <b-row>
          <b-col cols="12" md="12">
            <div class="text-18 text-NTUC-24 font-700 font__bold">
              {{ $t('dashboard.active_card') }}
            </div>
            <div class="mt-3">
              <ECardDetail :page="1"/>
            </div>
            <div class="mt--20">
              <div class="d-flex flex-row-reverse w-100">
                <div 
                  @click="_redirectCreateLog" 
                  class="border-radius-3 bg-NTUC-3 px--9 py--5 text-14 line-height-12 text-white cursor-pointer">
                  {{ $t('dashboard.new_claim') }}
                </div>
              </div>
            </div>
            <div class="mt--20" v-if="last_n_claims && last_n_claims.length > 0">
              <Transactions :list_claim="last_n_claims" :is_recent="true"/>
            </div>
            <div class="mt--20" v-if="last_n_panel_claims && last_n_panel_claims.length > 0">
              <Transactions :list_claim="last_n_panel_claims" :is_recent="false"/>
            </div>
          </b-col>
        </b-row>
    </div>
  </div>
</template>

<script>
import ECardDetail from '@/components/dashboard/eCardDetail.vue';
import Transactions from '@/components/dashboard/transactions.vue';

export default {
  props: ['last_n_panel_claims', 'last_n_claims'],
  components: {
    ECardDetail,
    Transactions
  },
  methods: {
    _redirectCreateLog: function () {
      this.$router.push('/claim/create');
    },
  }
};
</script>

<style scoped>
@import '@/assets/css/dashboard/cardActive.css';

.arrow-right-short {
  padding: 22px 0;
}

.arrow-up-short {
  padding: 22px 24px;
}

.border-radius-3 {
  border-radius: 3.2px;
}

.cursor-pointer {
  cursor: pointer;
}
</style>
