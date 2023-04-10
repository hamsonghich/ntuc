<template>
  <div>
    <div class="form-personal bg-white">
      <div class="personal_info_text text-18 font-500 text-NTUC-1 font__medium mb--20">
        {{ $t('profile.Employment_Info') }}
      </div>
      <b-row cols="12" class="form-container">
        <b-col lg="6" class="mb--20 col_item_personal" v-if="employmentValue.hasOwnProperty('staffid')">
          <div class="text_label text-12 font-400 font__regular text-black">{{personInfolabel.staffid}}</div>
          <b-form-input :disabled="promtEmployee != '1'" v-model="employmentValue.staffid" class="input_custom" placeholder="Indicate Employee ID" />
        </b-col>
        <b-col lg="6" class="mb--20 col_item_personal" v-if="employmentValue.hasOwnProperty('datejoined')">
          <div class="text_label text-12 font-400 font__regular text-black">{{personInfolabel.datejoined}}</div>
          <DatetimePicker
            :placeholder="'Date of Hire'"
            :style="''"
            :options="options"
            :showStar="true"
            :isFontBold="true"
            v-model="employmentValue.datejoined"
            :disabled="promtEmployee != '1'"
          />
        </b-col>
        <b-col lg="6" class="mb--20 col_item_personal" v-if="employmentValue.hasOwnProperty('employeecategory')">
          <div class="text_label text-12 font-400 font__regular text-black">{{personInfolabel.employeecategory_name_ind_field}}</div>
          <Autocomplete
            :placeholder="'Select Employee Category'"
            :displayAttribute="'name'"
            :valueAttribute="'id'"
            :optionDropdowns="listCategory"
            :filter="true"
            :isDisabled="promtEmployee != '1'"
            :value="employmentValue.employeecategory"
            @changeValue="(value) => employmentValue.employeecategory = value"
          />
        </b-col>
        <b-col lg="6" class="mb--20 col_item_personal" v-if="employmentValue.hasOwnProperty('employmenttype')">
          <div class="text_label text-12 font-400 font__regular text-black">{{personInfolabel.employmenttype_name_ind_field}}</div>
          <Autocomplete
            :placeholder="'Select Employee Type'"
            :displayAttribute="'name'"
            :valueAttribute="'id'"
            :optionDropdowns="listEmployType"
            :filter="true"
            :isDisabled="promtEmployee != '1'"
            :value="employmentValue.employmenttype"
            @changeValue="(value) => employmentValue.employmenttype = value"
          />
        </b-col>
        <b-col lg="6" class="mb--20 col_item_personal" v-if="employmentValue.hasOwnProperty('vendorcode')">
          <div class="text_label text-12 font-400 font__regular text-black">
            {{personInfolabel.vendorcode}}
          </div>
          <b-form-input :disabled="promtEmployee != '1'" v-model="employmentValue.vendorcode" class="input_custom" placeholder="Indicate Vendor Code" />
        </b-col>
        <b-col lg="6" class="mb--20 col_item_personal" v-if="employmentValue.hasOwnProperty('designation')">
          <div class="text_label text-12 font-400 font__regular text-black">{{personInfolabel.designation}}</div>
          <b-form-input :disabled="promtEmployee != '1'" v-model="employmentValue.designation" class="input_custom" placeholder="Indicate Designation" />
        </b-col>
        <b-col lg="6" class="mb--20 col_item_personal" v-if="employmentValue.hasOwnProperty('effectivedate')">
          <div class="text_label text-12 font-400 font__regular text-black">{{personInfolabel.effectivedate}}</div>
          <DatetimePicker
            :placeholder="'Confirmation Date'"
            :style="''"
            :options="options"
            :showStar="true"
            :isFontBold="true"
            v-model="employmentValue.effectivedate"
            :disabled="promtEmployee != '1'"
          />
        </b-col>
        <b-col lg="6" class="mb--20 col_item_personal" v-if="employmentValue.hasOwnProperty('datetermnt')">
          <div class="text_label text-12 font-400 font__regular text-black">{{personInfolabel.datetermnt}}</div>
          <DatetimePicker
            :placeholder="'Termination Date'"
            :style="''"
            :options="options"
            :showStar="true"
            :isFontBold="true"
            v-model="employmentValue.datetermnt"
            :disabled="promtEmployee != '1'"
          />
        </b-col>
        <b-col lg="6" class="mb--20 col_item_personal" v-if="employmentValue.hasOwnProperty('countrycode')">
          <div class="text_label text-12 font-400 font__regular text-black">{{personInfolabel.countrycode_name_ind_field}}</div>
          <Autocomplete
            :placeholder="'Select Country'"
            :displayAttribute="'name'"
            :valueAttribute="'id'"
            :optionDropdowns="listCountryCode"
            :filter="true"
            :isDisabled="promtEmployee != '1'"
            :value="employmentValue.countrycode"
            @changeValue="(value) => employmentValue.countrycode = value"
          />
        </b-col>
        <b-col lg="6" class="mb--20 col_item_personal" v-if="employmentValue.hasOwnProperty('insuredentity')">
          <div class="text_label text-12 font-400 font__regular text-black">{{personInfolabel.policyinsured_name_ind_field}}</div>
          <Autocomplete
            :placeholder="'Select Insured Entity'"
            :displayAttribute="'name'"
            :valueAttribute="'id'"
            :optionDropdowns="listInsurance"
            :filter="true"
            :isDisabled="promtEmployee != '1'"
            :value="employmentValue.insuredentity"
            @changeValue="(value) => employmentValue.insuredentity = value"
          />
        </b-col>
        <b-col lg="6" class="mb--20 col_item_personal" v-if="employmentValue.hasOwnProperty('department')">
          <div class="text_label text-12 font-400 font__regular text-black">{{personInfolabel.department_name_ind_field}}</div>
          <Autocomplete
            :placeholder="'Select Department'"
            :displayAttribute="'name'"
            :valueAttribute="'id'"
            :optionDropdowns="listDepartment"
            :filter="true"
            :isDisabled="promtEmployee != '1'"
            :value="employmentValue.department"
            @changeValue="(value) => employmentValue.department = value"
          />
        </b-col>
        <b-col lg="6" class="mb--20 col_item_personal" v-if="employmentValue.hasOwnProperty('localforeginworker')">
          <div class="text_label text-12 font-400 font__regular text-black">{{personInfolabel.localforeginworker}}</div>
          <Autocomplete
            :placeholder="'Select Local / Foreign'"
            :displayAttribute="'name'"
            :valueAttribute="'id'"
            :optionDropdowns="listLocalFore"
            :filter="true"
            :isDisabled="promtEmployee != '1'"
            :value="employmentValue.localforeginworker"
            @changeValue="(value) => employmentValue.localforeginworker = value"
          />
        </b-col>
        <b-col lg="6" class="mb--20 col_item_personal" v-if="employmentValue.hasOwnProperty('salarysetting')">
          <div class="text_label text-12 font-400 font__regular text-black">{{personInfolabel.salarysetting_name_ind_field}}</div>
          <Autocomplete
            :placeholder="'Select Salary Setting'"
            :displayAttribute="'name'"
            :valueAttribute="'id'"
            :optionDropdowns="listSlarySeting"
            :filter="true"
            :isDisabled="promtEmployee != '1'"
            :value="employmentValue.salarysetting"
            @changeValue="(value) => employmentValue.salarysetting = value"
          />
        </b-col>
        <b-col lg="6" class="mb--20 col_item_personal">
          <b-row cols="12">
            <b-col lg="5" class="col_item_personal" v-if="employmentValue.hasOwnProperty('currency')">
              <div class="text_label text-12 font-400 font__regular text-black">{{personInfolabel.currency_name_ind_field}}</div>
              <Autocomplete
                :placeholder="'Select Currency'"
                :displayAttribute="'name'"
                :valueAttribute="'id'"
                :optionDropdowns="listCurrency"
                :filter="true"
                :isDisabled="promtEmployee != '1'"
                :value="employmentValue.currency"
                @changeValue="(value) => employmentValue.currency = value"
              />
            </b-col>
            <b-col lg="7" class="col_item_personal" v-if="employmentValue.hasOwnProperty('salary')">
              <div class="text_label text-12 font-400 font__regular text-black">{{personInfolabel.salary}}</div>
              <b-form-input :disabled="promtEmployee != '1'" v-model="employmentValue.salary" class="input_custom" placeholder="Indicate Amount" />
            </b-col>
          </b-row>
        </b-col>
      </b-row>
    </div>
  </div>
</template>

<script>
  import DatetimePicker from '~/components/datetimePicker';
  import { handleListCallApi } from '@/utils/functions/handleListCallApi';
  import { postAxios } from '~/services/callApi';
  import { EXCEPTION } from '~/utils/constants/statusResponse';
  export default {
    components: {
      DatetimePicker
    },
    props: [
      'employmentValue',
      'personInfolabel',
      'promtEmployee'
    ],
    data() {
      return {
        options: {
          format: 'DD-MM-YYYY',
          useCurrent: false
        },
        listCategory: [],
        listEmployType: [],
        listCountryCode: [],
        listLocalFore: [],
        listSlarySeting: [],
        listCurrency: [],
        listDepartment: [],
        listInsurance: []
      };
    },
    async created() {
      this._handleCallListOption(2)
      this._handleCallListOption(4)
      this._handleCallListOption(5)
      this._handleCallListSelect(4)
      this._handleCallListSelect(9)
      this._handleCallListSelect(10)
      this._handleCallListSelect(11)
      this._handleCallListSelect(12)
      this._callApiDetail()
    },
    methods: {
      async _handleCallListOption (mode) {
        const res = await postAxios({
          "invoke": "System.execute",
          "argc": "2",
          "a0": "API.Autocomplete.Select",
          "a1": {
            "module": mode
          }
        })
        if(res.data.data[0].dt !== EXCEPTION) {
          let data = handleListCallApi(
            [...res.data.data[0].colNames],
            [...res.data.data[0].rows],
          )
          switch(mode) {
            case 2:
              this.listInsurance = data
              break
            case 4:
              this.listCategory = data
              break
            case 5:
              this.listCurrency = data
              break     
          }
        }
      },
      async _handleCallListSelect (mode) {
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
          switch(mode) {
            case 4:
              this.listDepartment = data
              break
            case 9:
              this.listEmployType = data
              break
            case 10:
              this.listLocalFore = data
              break  
            case 11:
              this.listSlarySeting = data
              break   
            case 12:
              this.listCountryCode = data
              break       
          }
        }
      },
      _callApiDetail () {
        this.$emit('_callApiDetail')
      }
    }
  };
</script>

<style>
  @import '@/assets/css/my-profile/index.css';
</style>

