<template>
  <div class="mt--30 bg-white px-3 pt--20 card__dashboard">
    <div class="d-flex w-100 justify-content-between align-items-center pb--20">
      <div class="text-NTUC-1 card__header__text text-18 font__medium line-height-12">
        {{ $t('dashboard.bank_info') }}
      </div>
      <button class="border-0 bg-white" @click="show = !show">
        <b-icon icon="chevron-up" v-if="show" class="showcolor" />
        <b-icon icon="chevron-down" v-else class="hidecolor" />
      </button>
    </div>
    <b-collapse v-model="show">
      <div class="mx-0 d-flex">
        <div class="d-flex mb-4 mr-3 justify-content-between bg-card align-items-center" />
        <div class="w-100">
          <b-row class="card__dashboard__body m-auto">
            <b-col cols="12" lg="6">
              <b-row>
                <b-col
                  cols="12"
                  class="dashboard__body__col"
                  v-if="checkFieldUndefined(bankInfo.bank)"
                >
                  <b-form-group
                    id="example-input-group-1"
                    :label="bankInfo.bank.label"
                    label-for="example-input-1"
                    class="input-group-form mb--20"
                    label-class="text-black text-12"
                  >
                    <Autocomplete
                      :value="bankInfo.bank.value"
                      :valueAttribute="'id'"
                      :displayAttribute="'text'"
                      @changeValue="value => (this.bankInfo.bank.value = value)"
                      class="set-width"
                      :optionDropdowns="listBank"
                      :placeholder="`Select ${bankInfo.bank.label}`"
                      :isDisabled="bankInfo.bank.disabled == '0'"
                      :filter="true"
                    />
                  </b-form-group>
                </b-col>
                <b-col
                  cols="12"
                  class="dashboard__body__col"
                  v-if="checkFieldUndefined(bankInfo.bankbranch)"
                >
                  <b-form-group
                    id="example-input-group-1"
                    :label="bankInfo.bankbranch.label"
                    label-for="example-input-1"
                    class="input-group-form mb--20"
                    label-class="text-black text-12"
                  >
                    <Autocomplete
                      :value="bankInfo.bankbranch.value"
                      :valueAttribute="'id'"
                      :displayAttribute="'text'"
                      @changeValue="value => (this.bankInfo.bankbranch.value = value)"
                      class="set-width"
                      :optionDropdowns="listBankBranch"
                      :placeholder="`Select ${bankInfo.bankbranch.label}`"
                      :isDisabled="bankInfo.bankbranch.disabled == '0'"
                      :filter="true"
                    />
                  </b-form-group>
                </b-col>
                <b-col
                  cols="12"
                  class="dashboard__body__col"
                  v-if="checkFieldUndefined(bankInfo.bankaccountno)"
                >
                  <b-form-group
                    id="example-input-group-1"
                    :label="bankInfo.bankaccountno.label"
                    label-for="example-input-1"
                    class="input-group-form mb--20"
                    label-class="text-black text-12"
                  >
                    <b-form-input
                      v-model="bankInfo.bankaccountno.value"
                      :disabled="bankInfo.bankaccountno.disabled == '0'"
                      :placeholder="`Indicate ${bankInfo.bankbranch.label}`"
                    />
                  </b-form-group>
                </b-col>
              </b-row>
            </b-col>
          </b-row>
        </div>
      </div>
    </b-collapse>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  props: ['bankInfo'],
  data() {
    return {
      show: false,
      options: {
        format: 'DD-MM-YYYY',
        useCurrent: false
      }
    };
  },
  computed: {
    ...mapGetters('list-options', ['listBank', 'listBankBranch'])
  },
  methods: {
    checkFieldUndefined(key) {
      return key !== undefined ? true : false;
    }
  }
};
</script>

<style scoped>
.card__header__text {
  letter-spacing: 0.2em;
}
.bg-card {
  background: linear-gradient(179.99deg, #0087e2 0.01%, rgba(0, 0, 0, 0) 108.24%);
  width: 100%;
  max-width: 230px;
}
.card__dashboard {
  box-shadow: inset 0px -1px 0px #d7d7d7;
}
.card__dashboard__body {
  width: 100%;
  max-width: 794px;
  transition: opacity 0.5s;
}
.dashboard__body__col {
  padding: 0 10px;
}
</style>