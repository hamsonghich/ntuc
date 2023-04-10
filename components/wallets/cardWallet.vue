<template>
  <div class="card_container">
    <div class="position-relative">
      <b-img :src="inforCard.img" class="img_card" />
      <div class="type_wallet position-absolute">
        <div class="text-32 font-500 text-white type_wallet letter-spacing-wallet">{{inforCard.typeWallet}}</div>
        <div class="text-20 font-500 text-white beneficiary letter-spacing-wallet">{{inforCard.beneficiary}}</div>
        <div class="text-16 font-500 text-white wallet_group letter-spacing-wallet">{{inforCard.walletGroup}}</div>
      </div>
    </div>
    <div class="d-flex">
      <div class="ml-3 mr-2 label_card">
        <div class="text-12 font-400 text-NTUC-25 benefit_period letter-spacing-wallet">{{inforCard.labelBenefit}}</div>
        <div class="text-12 font-400 text-NTUC-25 mt-2 letter-spacing-wallet space-balance">{{inforCard.labelBalance}}</div>
        <div class="text-12 font-400 text-NTUC-25 mt-2 letter-spacing-wallet">{{inforCard.labelEntitlement}}</div>
        <div class="text-12 font-400 text-NTUC-25 mt-2 letter-spacing-wallet">{{inforCard.labelReimbursed}}</div>
        <div class="text-12 font-400 text-NTUC-25 mt-2 letter-spacing-wallet">{{inforCard.labelPending}}</div>
      </div>
      <div class="mt-2">
        <div class="text-16 font-400 text-gray--900 letter-spacing-wallet">{{inforCard.valueBenefit}}</div>
        <div class="text-16 font-400 text-gray--900 money_card letter-spacing-wallet">{{inforCard.moneyBalance}}</div>
        <div class="text-16 font-400 text-gray--900 money_card letter-spacing-wallet">{{inforCard.moneyEntitlement}}</div>
        <div class="text-16 font-400 text-gray--900 money_card letter-spacing-wallet">{{inforCard.moneyReimbursed}}</div>
        <div class="text-16 font-400 text-gray--900 money_card letter-spacing-wallet">{{inforCard.moneyPending}}</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props:{
    cardContent: {
      type: Object,
      default: {
        img: '',
        typeWallet: 'Dental',
        beneficiary: 'Employee, Spouse, Children',
        walletGroup: 'Non-Flex',
        labelBenefit: 'Benefit period',
        labelBalance: 'Balance',
        labelEntitlement: 'Entitlement',
        labelReimbursed: 'Reimbursed',
        labelPending: 'Pending',
        valueBenefit: '10-May-2022 to 31-Dec-2022',
        moneyBalance: '$2,000',
        moneyEntitlement: '$2,150.00',
        moneyReimbursed: '$0.00',
        moneyPending: '$0.00'
      }
    }
  },
  computed:{
    inforCard(){
      return{
        ...this.cardContent
      }
    }
  },
}
</script>

<style scoped>
@import '@/assets/css/wallets/card.css';
</style>