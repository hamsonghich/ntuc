<template>
  <div class="d-flex wrapper__claim__tab text__medium">
    <div @click="changeTab(1); toggleIsFilterClaim(false);" :class="{'claim__tab': true, 'claim__tab__active': tab == 1 ? true :false}" v-if="eclaimaccess.benefitaccess ? eclaimaccess.benefitaccess.access : false">
      {{listTab.find(item => item.id == 1) && listTab.find(item => item.id == 1).name}}
    </div>
    <div @click="changeTab(2); toggleIsFilterClaim(false);" :class="{'claim__tab': true, 'claim__tab__active': tab == 2 ? true :false} " v-if="eclaimaccess.expenseaccess ? eclaimaccess.expenseaccess.access : false">
      {{listTab.find(item => item.id == 2) && listTab.find(item => item.id == 2).name}}
    </div>
    <div @click="changeTab(3); toggleIsFilterClaim(false);" :class="{'claim__tab': true, 'claim__tab__active': tab == 3 ? true :false} " v-if="eclaimaccess.ghsaccess ? eclaimaccess.ghsaccess.access : false">
      {{listTab.find(item => item.id == 4) && listTab.find(item => item.id == 4).name}}
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';

export default {
  data: () => ({
    listTab: [],
    eclaimaccess: JSON.parse(localStorage.getItem('eclaimaccess'))
  }),
  computed: {
    ...mapGetters('claim', [
      'tab',
    ])
  },
  methods: {
    ...mapActions('log', [
      'toggleIsFilterClaim',
    ]),
    ...mapActions('claim', [
      'changeTab',
      'getListTab',
    ])
  },
  async fetch() {
    try {
      const resListTab = await this.getListTab({
        "invoke": "System.execute",
        "argc": "2",
        "a0": "API.Autocomplete.Select",
        "a1": {
          "module": "15"
        }
      });
      this.listTab = resListTab;
    } catch (error) {
      console.log('fetch ' + error);
    }
  }
}
</script>

<style scoped>
@import '@/assets/css/claim/tabClaim.css';
</style>
