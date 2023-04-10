<template>
  <div class="d-flex justify-content-end tab_container">
    <div class="autocomplete__tab font__regular">
      <Autocomplete
        :placeholder="$t('Select Individual')"
        :value="individualSelect"
        :optionDropdowns="listIndividual"
        :valueAttribute="'id'"
        :displayAttribute="'name'"
        :filter="true"
        class="mr-2 select-custom-wallet"
        @changeValue="value => {
          handleIndividual(value)
        }"
      />
    </div>
    <div class="autocomplete__tab font__regular">
      <Autocomplete
        :placeholder="$t('Select Benefit Group')"
        :value="benefitSelect"
        :optionDropdowns="listBenefit"
        :valueAttribute="'id'"
        :displayAttribute="'name'"
        :filter="true"
        class="mr-2 select-custom-wallet"
        @changeValue="value => {
          handleClaimGroup(value)
        }"
      />
    </div>
    <div class="autocomplete__tab font__regular">
      <Autocomplete
        :placeholder="$t('Select Benefit Period')"
        :value="periodSelect"
        :optionDropdowns="listPeriod"
        :valueAttribute="'id'"
        :displayAttribute="'name'"
        :filter="true"
        class="select-custom-wallet"
        @changeValue="value => {
          handleBenefitPeriod(value)
        }"
      />
    </div>
  </div>
</template>

<script>
import { postAxios } from '~/services/callApi';
import { handleListCallApi } from "~/utils/functions/handleListCallApi";
export default {
  data(){
    return {
      individualSelect: null,
      listIndividual: [],
      benefitSelect: null,
      listBenefit: [{id: '1', name: 'Flexible Benefits'}, {id: '2', name: 'Outpatient Benefits'}],
      periodSelect: null,
      listPeriod: []
    }
  },
  created(){
    this.getDepChild()
    this.getListYear()
  },
  methods: {
    async getDepChild(){
      try {
        const response = await postAxios({
          invoke: "System.execute",
	        argc: "2",
	        a0: "Employee.getClaimateList",
	        a1: {
		        Emp: localStorage.getItem('userid')
	        }
        })
        if(response.data.data[0].dt == 'rs') {
          this.listIndividual = [...handleListCallApi(
            [...response.data.data[3].colNames],
            [...response.data.data[3].rows])
          ]
        }
      } catch(e) {}
    },
    async getListYear() {
      try {
        const data = await postAxios({
          invoke: "System.execute",
          argc: "2",
          a0: "API.getClaimPeriod",
          a1: {
          }
        })
        if (data.data.data[0].dt == "default") {
          this.listPeriod = JSON.parse(data.data.data[0].value).map(el => { return { id: `${el}`, name: `${el}` } })
          this.listPeriod.sort((a, b) => {
            return b.id - a.id
          })
          this.handleYears(`${new Date().getFullYear()}`)
        }
      } catch(e) {}
    },
    handleIndividual(value){
      if(this.individualSelect == value) return;
      this.individualSelect = value
      this.getWalletData()
    },
    handleClaimGroup(value){
      if(this.benefitSelect == value) return;
      this.benefitSelect = value
      this.getWalletData()
    },
    handleBenefitPeriod(value){
      if(this.periodSelect == value) return;
      this.periodSelect = value
      this.getWalletData()
    },
    getWalletData(){
      this.$emit('getWalletData', this.periodSelect ? this.periodSelect : '',this.benefitSelect ? this.benefitSelect : '',this.individualSelect ? this.individualSelect : '')
    },
  }
}
</script>
<style scoped>
@import '@/assets/css/wallets/tab.css';
</style>
