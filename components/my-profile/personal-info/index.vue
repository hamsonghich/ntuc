<template>
  <div>
    <div class="d-flex justify-content-between action-personal">
      <div @click="_handleAddDependent" class="d-flex cursor_pointer align-items-center">
        <img src="@/assets/images/add_circle.svg" />
        <div class="add-depentden-btn text-20 font-400 font__regular ml-2">
          {{ $t('profile.Dependent') }}
        </div>
      </div>
      <div
        v-if="promtEmployee == '1'"
        @click="_handleVerify()"
        class="my_details_are_correct bg-NTUC-3 cursor_pointer text-white text-14 font-400 font__regular"
      >
        {{ $t('profile.My_details_are_correct') }}
      </div>
    </div>
    <div class="form-personal bg-white">
      <div class="personal_info_text text-18 font-500 text-NTUC-1 font__medium mb--20">
        {{ $t('profile.Personal_Info') }}
      </div>
      <b-row cols="12" class="form-container">
        <b-col lg="6" class="mb--20 col_item_personal" v-if="personValue.hasOwnProperty('name')">
          <div class="text_label text-12 font-400 font__regular text-black">{{personInfolabel.name}}</div>
          <b-form-input :disabled="promtEmployee != '1'" v-model="personValue.name" class="input_custom" placeholder="Indicate Name" />
        </b-col>
        <b-col lg="6" class="mb--20 col_item_personal" v-if="personValue.hasOwnProperty('nric')">
          <div class="text_label text-12 font-400 font__regular text-black">{{personInfolabel.nric}}</div>
          <b-form-input :disabled="promtEmployee != '1'" v-model="personValue.nric" class="input_custom" placeholder="Indicate NRIC/FIN" />
        </b-col>
        <b-col lg="6" class="mb--20 col_item_personal" v-if="personValue.hasOwnProperty('dob')">
          <div class="text_label text-12 font-400 font__regular text-black">{{personInfolabel.dob}}</div>
          <DatetimePicker
            :placeholder="'Date of Birth'"
            :style="''"
            :options="options"
            :showStar="true"
            :isFontBold="true"
            v-model="personValue.dob"
            :disabled="promtEmployee != '1'"
          />
        </b-col>
        <b-col lg="6" class="mb--20 col_item_personal" v-if="personValue.hasOwnProperty('gender_name_ind_field')">
          <div class="text_label text-12 font-400 font__regular text-black">{{personInfolabel.gender_name_ind_field}}</div>
          <Autocomplete
            :placeholder="'Select Gender'"
            :displayAttribute="'name'"
            :valueAttribute="'id'"
            :optionDropdowns="listGender"
            :filter="true"
            :isDisabled="promtEmployee != '1'"
            :value="personValue.gender"
            @changeValue="(value) => personValue.gender = value"
          />
        </b-col>
        <b-col lg="6" class="mb--20 col_item_personal" v-if="personValue.hasOwnProperty('maritalstatus_name_ind_field')">
          <div class="text_label text-12 font-400 font__regular text-black">{{personInfolabel.maritalstatus_name_ind_field}}</div>
          <Autocomplete
            :placeholder="'Select Marital Status'"
            :displayAttribute="'name'"
            :valueAttribute="'id'"
            :optionDropdowns="listMaritalStatus"
            :filter="true"
            :isDisabled="promtEmployee != '1'"
            :value="personValue.maritalstatus"
            @changeValue="(value) => personValue.maritalstatus = value"
          />
        </b-col>
        <b-col lg="6" class="mb--20 col_item_personal" v-if="personValue.hasOwnProperty('marriageregistrationdate_name_ind_field')">
          <div class="text_label text-12 font-400 font__regular text-black">
            {{personInfolabel.marriageregistrationdate_name_ind_field}}
          </div>
          <DatetimePicker
            :placeholder="'Marriage Registration Date'"
            :style="''"
            :options="options"
            :showStar="true"
            :isFontBold="true"
            v-model="personValue.marriageregistrationdate_name_ind_field"
            :disabled="promtEmployee != '1'"
          />
        </b-col>
        <b-col lg="6" class="mb--20 col_item_personal" v-if="personValue.hasOwnProperty('countrycode_name_ind_field')">
          <div class="text_label text-12 font-400 font__regular text-black">{{personInfolabel.countrycode_name_ind_field}}</div>
          <Autocomplete
            :placeholder="'Select Country Code (M)'"
            :displayAttribute="'name'"
            :valueAttribute="'id'"
            :optionDropdowns="listCountryCode"
            :filter="true"
            :isDisabled="promtEmployee != '1'"
            :value="personValue.countrycode"
            @changeValue="(value) => personValue.countrycode = value"
          />
        </b-col>
        <b-col lg="6" class="mb--20 col_item_personal" v-if="personValue.hasOwnProperty('mobilephone')">
          <div class="text_label text-12 font-400 font__regular text-black">{{personInfolabel.mobilephone}}</div>
          <b-form-input :disabled="promtEmployee != '1'" v-model="personValue.mobilephone" class="input_custom" placeholder="Indicate Mobile Phone" />
        </b-col>
        <b-col lg="6" class="mb--20 col_item_personal" v-if="personValue.hasOwnProperty('countrycodehomephone_name_ind_field')">
          <div class="text_label text-12 font-400 font__regular text-black">{{ personInfolabel.countrycodehomephone_name_ind_field }}</div>
          <Autocomplete
            :placeholder="'Select Country Code (H)'"
            :displayAttribute="'name'"
            :valueAttribute="'id'"
            :optionDropdowns="listCountryCode"
            :filter="true"
            :isDisabled="promtEmployee != '1'"
            :value="personValue.countrycodehomephone_name_ind_field"
            @changeValue="(value) => personValue.countrycodehomephone_name_ind_field = value"
          />
        </b-col>
        <b-col lg="6" class="mb--20 col_item_personal" v-if="personValue.hasOwnProperty('homephone')">
          <div class="text_label text-12 font-400 font__regular text-black">{{personInfolabel.homephone}}</div>
          <b-form-input :disabled="promtEmployee != '1'" v-model="personValue.homephone" class="input_custom" placeholder="Indicate Home Phone" />
        </b-col>
        <b-col lg="6" class="mb--20 col_item_personal" v-if="personValue.hasOwnProperty('emailaddress')">
          <div class="text_label text-12 font-400 font__regular text-black">{{personInfolabel.emailaddress}}</div>
          <b-form-input :disabled="promtEmployee != '1'" v-model="personValue.emailaddress" class="input_custom" placeholder="Indicate Email Address" />
        </b-col>
        <b-col lg="6" class="mb--20 col_item_personal" v-if="personValue.hasOwnProperty('homeaddress')">
          <div class="text_label text-12 font-400 font__regular text-black">{{personInfolabel.homeaddress}}</div>
          <b-form-textarea
            class="input_custom"
            id="textarea-no-resize"
            placeholder="Indicate Home Address"
            rows="4"
            no-resize
            v-model="personValue.homeaddress"
            :disabled="promtEmployee != '1'"
          ></b-form-textarea>
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
      'personInfolabel',
      'personValue',
      'promtEmployee'
    ],
    data() {
      return {
        options: {
          format: 'DD-MM-YYYY',
          useCurrent: false
        },
        listGender: [],
        listMaritalStatus: [],
        listCountryCode: []
      };
    },
    async created() {
      this._handleCallListOption(1)
      this._handleCallListOption(2)
      this._handleCallListOption(12)
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
          switch(mode) {
            case 1:
              this.listGender = data
              break
            case 2:
              this.listMaritalStatus = data
              break  
            case 12:
              this.listCountryCode = data
              break    
          }
        }
      },
      _callApiDetail () {
        this.$emit('_callApiDetail')
      },
      _handleAddDependent() {
        this.$emit('_handleAddDependent')
      },
      _handleVerify() {
        this.$emit('_handleVerify')
      }
    }
  };
</script>

<style>
  @import '@/assets/css/my-profile/index.css';
  @import '@/assets/css/inputCustom/inputCustom.css';
</style>

