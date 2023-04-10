<template>
  <div>
    <div v-for="(item, index) in dependentValue" :key="index" class="form-personal bg-white">
      <div class="personal_info_text text-18 font-500 text-NTUC-1 font__medium mb--20 d-flex">
        <img @click="_handleDelete(index)" src="@/assets/images/icon_trash.svg" class="cursor_pointer"/>
        <div class="ml-2"> {{item.name}}</div>
      </div>
      <b-row cols="12" class="form-container">
        <b-col v-if="item.hasOwnProperty('id')" lg="6" class="mb--20 col_item_personal">
          <div class="text_label text-12 font-400 font__regular text-black">{{dependentLabel.userid}}</div>
          <b-form-input disabled v-model="item.id" class="input_custom" placeholder="Indicate User Id" />
        </b-col>
        <b-col v-if="item.hasOwnProperty('name')" lg="6" class="mb--20 col_item_personal">
          <div class="text_label text-12 font-400 font__regular text-black">{{dependentLabel.name}}</div>
          <b-form-input :disabled="promtEmployee != '1'" v-model="item.name" class="input_custom" placeholder="Indicate Name" />
        </b-col>
        <b-col v-if="item.hasOwnProperty('nric')" lg="6" class="mb--20 col_item_personal">
          <div class="text_label text-12 font-400 font__regular text-black">{{dependentLabel.nric}}</div>
          <b-form-input :disabled="promtEmployee != '1'" v-model="item.nric" class="input_custom" placeholder="Indicate NRIC/FIN" />
        </b-col>
        <b-col v-if="item.hasOwnProperty('dob')" lg="6" class="mb--20 col_item_personal">
          <div class="text_label text-12 font-400 font__regular text-black">{{dependentLabel.dob}}</div>
          <DatetimePicker
            :placeholder="'Date of Birth'"
            :style="''"
            :options="options"
            :showStar="true"
            :isFontBold="true"
            v-model="item.dob"
            :disabled="promtEmployee != '1'"
          />
        </b-col>
        <b-col v-if="item.hasOwnProperty('gender')" lg="6" class="mb--20 col_item_personal">
          <div class="text_label text-12 font-400 font__regular text-black">{{dependentLabel.gender_name_ind_field}}</div>
          <Autocomplete
            :placeholder="'Select Gender'"
            :displayAttribute="'name'"
            :valueAttribute="'id'"
            :optionDropdowns="listGender"
            :filter="true"
            :isDisabled="promtEmployee != '1'"
            :value="item.gender"
            @changeValue="(value) => {
              _changeGender(value, index)
            }"
          />
        </b-col>
        <b-col v-if="item.hasOwnProperty('nationality')" lg="6" class="mb--20 col_item_personal">
          <div class="text_label text-12 font-400 font__regular text-black">{{dependentLabel.nationality_name_ind_field}}</div>
          <Autocomplete
            :placeholder="'Select Nationality'"
            :displayAttribute="'name'"
            :valueAttribute="'id'"
            :optionDropdowns="listNationality"
            :filter="true"
            :isDisabled="promtEmployee != '1'"
            :value="item.nationality"
            @changeValue="(value) => {
              _changeNationality(value, index)
            }"
          />
        </b-col>
        <b-col v-if="item.hasOwnProperty('maritalstatus')" lg="6" class="mb--20 col_item_personal">
          <div class="text_label text-12 font-400 font__regular text-black">{{dependentLabel.maritalstatus_name_ind_field}}</div>
          <Autocomplete
            :placeholder="'Select Marital Status'"
            :displayAttribute="'name'"
            :valueAttribute="'id'"
            :optionDropdowns="listMaritalStatus"
            :filter="true"
            :isDisabled="promtEmployee != '1'"
            :value="item.maritalstatus"
            @changeValue="(value) => {
              _changeMaritalStatus(value, index)
            }"
          />
        </b-col>
        <b-col v-if="item.hasOwnProperty('relationship')" lg="6" class="mb--20 col_item_personal">
          <div class="text_label text-12 font-400 font__regular text-black">{{dependentLabel.relationship_name_ind_field}}</div>
          <Autocomplete
            :placeholder="'Select Relationship'"
            :displayAttribute="'name'"
            :valueAttribute="'id'"
            :optionDropdowns="listRelationShip"
            :filter="true"
            :isDisabled="promtEmployee != '1'"
            :value="item.relationship"
            @changeValue="(value) => {
              _changeRelationShip(value, index)
            }"
          />
        </b-col>
        <b-col v-if="item.hasOwnProperty('mobilephone')" lg="6" class="mb--20 col_item_personal">
          <div class="text_label text-12 font-400 font__regular text-black">{{dependentLabel.mobilephone}}</div>
          <b-form-input :disabled="promtEmployee != '1'" v-model="item.mobilephone" class="input_custom" placeholder="Indicate Mobilephone" />
        </b-col>
        <b-col lg="6" class="mb--20 col_item_personal" v-if="item.hasOwnProperty('countrycode_name_ind_field')">
          <div class="text_label text-12 font-400 font__regular text-black">{{dependentLabel.countrycode_name_ind_field}}</div>
          <Autocomplete
            :placeholder="'Select Country of Residence'"
            :displayAttribute="'name'"
            :valueAttribute="'id'"
            :optionDropdowns="listCountryCode"
            :filter="true"
            :isDisabled="promtEmployee != '1'"
            :value="item.countrycode"
             @changeValue="(value) => {
              _changeCountryCode(value, index)
            }"
          />
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
      'dependentValue',
      'dependentLabel',
      'promtEmployee'
    ],
    data() {
      return {
        options: {
          format: 'DD-MM-YYYY',
          useCurrent: false
        },
        listGender: [],
        listNationality: [],
        listMaritalStatus: [],
        listRelationShip: [],
        listCountryCode: []
      };
    },
    created() {
      this._handleCallListOption(1)
      this._handleCallListOption(2)
      this._handleCallListOption(3)
      this._handleCallListOption(8)
      this._handleCallListOption(12)
    },
    methods: {
      _handleDelete(index) {
        this.dependentValue[index].changetype = '458'
        this.dependentValue[index].action = '458'
        this.dependentValue.splice(index, 1)
      },
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
          switch(mode) {
            case 1:
              this.listGender = data
              break
            case 2:
              this.listMaritalStatus = data
              break  
            case 3:
              this.listNationality = data
              break   
            case 8:
              this.listRelationShip = data
              break    
            case 12:
              this.listCountryCode = data
              break    
          }
        }
      },
      _changeGender(value, index) {
        if(this.dependentValue[index].gender == value)
          return
        this.dependentValue[index].gender = value
      },
      _changeNationality(value, index) {
        if(this.dependentValue[index].nationality == value)
          return
        this.dependentValue[index].nationality = value
      },
      _changeMaritalStatus(value, index) {
        if(this.dependentValue[index].maritalstatus == value)
          return
        this.dependentValue[index].maritalstatus = value
      },
      _changeRelationShip(value, index) {
        if(this.dependentValue[index].relationship == value)
          return
        this.dependentValue[index].relationship = value
      },
      _changeCountryCode (value, index) {
        if(this.dependentValue[index].countrycode == value)
          return
        this.dependentValue[index].countrycode = value
      }
    }
  };
</script>

<style>
  @import '@/assets/css/my-profile/index.css';
</style>

