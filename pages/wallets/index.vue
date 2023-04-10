<template>
  <div class="wallet_container bg-white w-100">
    <div class="text-24 font-500 text-black mt-2 title_wallet">My Wallets</div>
    <div class="text-16 font-400 text-gray--700 quick_wallet">Have a quick look at the Wallets that you can claim from.</div>
    <div>
      <TabWallet @getWalletData="getWalletData" />
      <div class="card_list">
        <div class="row">
          <div class="col-4 mb-3 card_item" v-for="(item, index) in cardList" :key="index">
            <CardWallet :cardContent="item" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import TabWallet from '@/components/wallets/tabWallet.vue'
import CardWallet from '@/components/wallets/cardWallet.vue'
import { postAxios } from '~/services/callApi';
export default {
  components: {TabWallet, CardWallet},
  data(){
    return {
      cardList:[]
    }
  },
  created(){
    this.getWalletData()
  },
  methods: {
    async getWalletData(year, claimgroup, individual){
      const response = await postAxios({
        invoke: "System.execute",
        argc: "2",
        a0: "ClaimSummary.getListing",
        a1: {
          empId: localStorage.getItem('userid'),
          terminatedempId: "",
          year: year,
          month: "",
          claimgroup: claimgroup,
          dependent: localStorage.getItem('userid') == individual? '-1' : individual
        }
      })
      if(response.data.data[0].dt == 'default'){
        let walletData = JSON.parse(response.data.data[0].value)
        this.cardList = walletData.map(item => {
          return {
            img: this.handleImage(item.banner_image),
            typeWallet: item.claimtype,
            beneficiary: item.claimantname,
            walletGroup: item.claimgroup,
            labelBenefit: 'Benefit period',
            labelBalance: 'Balance',
            labelEntitlement: 'Entitlement',
            labelReimbursed: 'Reimbursed',
            labelPending: 'Pending',
            valueBenefit: item.benefitperiod,
            moneyBalance: item.balance,
            moneyEntitlement: item.entitlement,
            moneyReimbursed: item.reimbursed,
            moneyPending: item.pendingreimbursement
          }
        })
      }
    },
    handleImage(image) {
      return `${process.env.IMAGE_URL}` + image;
    }
  }
}
</script>

<style scoped>
@import '@/assets/css/wallets/index.css';
</style>