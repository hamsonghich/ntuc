<template>
  <div>
    <div class="form-personal bg-white">
      <div class="personal_info_text text-18 font-500 text-NTUC-1 font__medium mb--20">
        {{ $t('profile.bank_info') }}
      </div>
      <b-row v-if="bankInfoValue.hasOwnProperty('bank')" cols="12" class="form-container">
        <b-col lg="6" class="mb--20 col_item_personal">
          <div class="text_label text-12 font-400 font__regular text-black">{{personInfolabel.bank_name_ind_field}}</div>
          <Autocomplete
            :placeholder="'Select Bank Name'"
            :displayAttribute="'name'"
            :valueAttribute="'id'"
            :optionDropdowns="listBankName"
            :filter="true"
            :isDisabled="promtEmployee != '1'"
            :value="bankInfoValue.bank"
            @changeValue="(value) => bankInfoValue.bank = value"
          />
        </b-col>
      </b-row>
      <b-row v-if="bankInfoValue.hasOwnProperty('bankbranch')" cols="12" class="form-container">
        <b-col lg="6" class="mb--20 col_item_personal">
          <div class="text_label text-12 font-400 font__regular text-black">{{personInfolabel.bankbranch_name_ind_field}}</div>
          <Autocomplete
            :placeholder="'Select Bank Branch'"
            :displayAttribute="'name'"
            :valueAttribute="'id'"
            :optionDropdowns="listBankBrank"
            :filter="true"
            :isDisabled="promtEmployee != '1'"
            :value="bankInfoValue.bankbranch"
            @changeValue="(value) => bankInfoValue.bankbranch = value"
          />
        </b-col>
      </b-row>
      <b-row v-if="bankInfoValue.hasOwnProperty('bankaccountno')" cols="12" class="form-container">
        <b-col lg="6" class="mb--20 col_item_personal">
          <div class="text_label text-12 font-400 font__regular text-black">{{personInfolabel.bankaccountno}}</div>
          <b-form-input :disabled="promtEmployee != '1'" v-model="bankInfoValue.bankaccountno" class="input_custom" placeholder="Indicate Bank Account" />
        </b-col>
      </b-row>
    </div>
  </div>
</template>

<script>
  import { handleListCallApi } from '@/utils/functions/handleListCallApi';
  import { postAxios } from '~/services/callApi';
  import { EXCEPTION } from '~/utils/constants/statusResponse';
  export default {
    props: [
      'personInfolabel',
      'bankInfoValue',
      'promtEmployee'
    ],
    data () {
      return {
        listBankName: [],
        listBankBrank: []
      }
    },
    async created() {
      this._handleCallListOption(6)
      this._handleCallListOption(7)
      this._callApiDetail()
    },
    methods: {
      async _handleCallListOption (mode) {
        const res = await postAxios({
          "invoke": "System.execute",
          "argc": "2",
          "a0": "API.List.Select",
          "a1": {
            "ListGroup": mode
          }
        })
        if(res.data.data[0].dt !== EXCEPTION) {
          let data = handleListCallApi(
            [...res.data.data[0].colNames],
            [...res.data.data[0].rows],
          )
          if(mode == 6) {
            this.listBankName = data
          } else {
            this.listBankBrank = data
          }
        }
      },
      _callApiDetail () {
        this.$emit('_callApiDetail')
      }
    }
  };
</script>

<style scoped>
  @import '@/assets/css/my-profile/index.css';
</style>

