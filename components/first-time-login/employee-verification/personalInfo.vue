<template>
  <div class="mt--30 bg-white px-3 card__dashboard">
    <div class="d-flex w-100 justify-content-between align-items-center pt--20 pb--20">
      <div class="text-NTUC-1 card__header__text text-18 font__medium line-height-12">
        {{ $t('dashboard.personal_info') }}
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
            <b-col
              cols="12"
              lg="6"
              class="dashboard__body__col"
              v-if="checkFieldUndefined(personalInfo.name)"
            >
              <b-form-group
                id="example-input-group-1"
                :label="personalInfo.name.label"
                label-for="example-input-1"
                class="mb--20"
                label-class="text-black text-12"
              >
                <b-form-input
                  v-model="personalInfo.name.value"
                  :disabled="personalInfo.name.disabled=='0'"
                  class="input_custom"
                  :placeholder="`Indicate ${personalInfo.name.label}`"
                />
              </b-form-group>
            </b-col>
            <b-col
              cols="12"
              lg="6"
              class="dashboard__body__col"
              v-if="checkFieldUndefined(personalInfo.nric)"
            >
              <b-form-group
                id="example-input-group-1"
                :label="personalInfo.nric.label"
                label-for="example-input-1"
                label-class="text-black text-12"
                class="mb--20"
              >
                <b-form-input
                  v-model="personalInfo.nric.value"
                  :disabled="personalInfo.nric.disabled=='0'"
                  class="input_custom"
                  :placeholder="`Indicate ${personalInfo.nric.label}`"
                />
              </b-form-group>
            </b-col>
            <b-col
              cols="12"
              lg="6"
              class="dashboard__body__col"
              v-if="checkFieldUndefined(personalInfo.dob)"
            >
              <DatetimePicker
                :label="personalInfo.dob.label"
                v-model="personalInfo.dob.value"
                :options="options"
                :isText12="true"
                :disabled="personalInfo.dob.disabled=='0'"
                :classGroup="'mb--20'"
              />
            </b-col>
            <b-col
              cols="12"
              lg="6"
              class="dashboard__body__col"
              v-if="checkFieldUndefined(personalInfo.gender)"
            >
              <b-form-group
                id="example-input-group-1"
                :label="personalInfo.gender.label"
                label-for="example-input-1"
                class="mb--20"
                label-class="text-black text-12"
              >
                <Autocomplete
                  :value="personalInfo.gender.value"
                  :valueAttribute="'id'"
                  :displayAttribute="'text'"
                  @changeValue="value => (this.personalInfo.gender.value = value)"
                  class="set-width"
                  :placeholder="`Select ${personalInfo.gender.label}`"
                  :isDisabled="personalInfo.gender.disabled=='0'"
                  :optionDropdowns="listGender"
                  :filter="true"
                />
              </b-form-group>
            </b-col>
            <b-col
              cols="12"
              lg="6"
              class="dashboard__body__col"
              v-if="checkFieldUndefined(personalInfo.maritalstatus)"
            >
              <b-form-group
                id="example-input-group-1"
                :label="personalInfo.maritalstatus.label"
                label-for="example-input-1"
                label-class="text-black text-12"
                class="mb--20"
              >
                <Autocomplete
                  :value="personalInfo.maritalstatus.value"
                  :valueAttribute="'id'"
                  :displayAttribute="'text'"
                  @changeValue="value => (this.personalInfo.maritalstatus.value = value)"
                  class="set-width"
                  :placeholder="`Select ${personalInfo.maritalstatus.label}`"
                  :isDisabled="personalInfo.maritalstatus.disabled=='0'"
                  :optionDropdowns="listMaritalStatus"
                  :filter="true"
                />
              </b-form-group>
            </b-col>
            <b-col
              cols="12"
              lg="6"
              class="dashboard__body__col"
              v-if="checkFieldUndefined(personalInfo.marriagedate)"
            >
              <DatetimePicker
                :label="personalInfo.marriagedate.label"
                :options="options"
                :classGroup="'mb--20'"
                :isText12="true"
                :isDisabled="personalInfo.marriagedate.disabled=='0'"
                v-model="personalInfo.marriagedate.value"
              />
            </b-col>
            <b-col
              cols="12"
              lg="6"
              class="dashboard__body__col"
              v-if="checkFieldUndefined(personalInfo.countrycode)"
            >
              <b-form-group
                id="example-input-group-1"
                :label="personalInfo.countrycode.label"
                label-for="example-input-1"
                class="mb--20"
                label-class="text-black text-12"
              >
                <Autocomplete
                  :value="personalInfo.countrycode.value"
                  :valueAttribute="'id'"
                  :displayAttribute="'text'"
                  @changeValue="value => (this.personalInfo.countrycode.value = value)"
                  class="set-width"
                  :placeholder="`Select ${personalInfo.countrycode.label}`"
                  :isDisabled="personalInfo.countrycode.disabled=='0'"
                  :optionDropdowns="listCountryCode"
                  :filter="true"
                />
              </b-form-group>
            </b-col>
            <b-col
              cols="12"
              lg="6"
              class="dashboard__body__col"
              v-if="checkFieldUndefined(personalInfo.mobilephone)"
            >
              <b-form-group
                id="example-input-group-1"
                :label="personalInfo.mobilephone.label"
                label-for="example-input-1"
                class="mb--20"
                label-class="text-black text-12"
              >
                <b-form-input
                  v-model="personalInfo.mobilephone.value"
                  :disabled="personalInfo.mobilephone.disabled=='0'"
                  :placeholder="`Indicate ${personalInfo.mobilephone.label}`"
                  class="input_custom"
                />
              </b-form-group>
            </b-col>
            <b-col
              cols="12"
              lg="6"
              class="dashboard__body__col"
              v-if="checkFieldUndefined(personalInfo.countrycodehomephone)"
            >
              <b-form-group
                id="example-input-group-1"
                :label="personalInfo.countrycodehomephone.label"
                label-for="example-input-1"
                label-class="text-black text-12"
                class="mb--20"
              >
                <Autocomplete
                  :value="personalInfo.countrycodehomephone.value"
                  :valueAttribute="'id'"
                  :displayAttribute="'text'"
                  @changeValue="value => (this.personalInfo.countrycodehomephone.value = value)"
                  class="set-width"
                  :isDisabled="personalInfo.countrycodehomephone.disabled=='0'"
                  :optionDropdowns="listCountryCode"
                  :placeholder="`Select ${personalInfo.countrycodehomephone.label}`"
                  :filter="true"
                />
              </b-form-group>
            </b-col>
            <b-col
              cols="12"
              lg="6"
              class="dashboard__body__col"
              v-if="checkFieldUndefined(personalInfo.homephone)"
            >
              <b-form-group
                id="example-input-group-1"
                :label="personalInfo.homephone.label"
                label-for="example-input-1"
                label-class="text-black text-12"
                class="mb--20"
              >
                <b-form-input
                  v-model="personalInfo.homephone.value"
                  :disabled="personalInfo.homephone.disabled=='0'"
                  class="input_custom"
                  :placeholder="`Indicate ${personalInfo.homephone.label}`"
                />
              </b-form-group>
            </b-col>
            <b-col
              cols="12"
              lg="6"
              class="dashboard__body__col"
              v-if="checkFieldUndefined(personalInfo.emailaddress)"
            >
              <b-form-group
                id="example-input-group-1"
                :label="personalInfo.emailaddress.label"
                label-for="example-input-1"
                class="mb--20"
                label-class="text-black text-12"
              >
                <b-form-input
                  v-model="personalInfo.emailaddress.value"
                  :disabled="personalInfo.emailaddress.disabled=='0'"
                  class="input_custom"
                  :placeholder="`Indicate ${personalInfo.emailaddress.label}`"
                />
              </b-form-group>
            </b-col>
            <b-col
              cols="12"
              lg="6"
              class="dashboard__body__col"
              v-if="checkFieldUndefined(personalInfo.homeaddress)"
            >
              <b-form-group
                id="example-input-group-1"
                :label="personalInfo.homeaddress.label"
                label-for="example-input-1"
                label-class="text-black text-12"
                class="mb--20"
              >
                <b-form-textarea
                  id="textarea-small"
                  v-model="personalInfo.homeaddress.value"
                  :disabled="personalInfo.homeaddress.disabled=='0'"
                  :placeholder="`Indicate ${personalInfo.homeaddress.label}`"
                />
              </b-form-group>
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
  props: ['personalInfo'],
  data() {
    return {
      show: true,
      options: {
        format: 'DD-MM-YYYY',
        useCurrent: false
      }
    };
  },
  computed: {
    ...mapGetters('list-options', ['listGender', 'listMaritalStatus', 'listCountryCode'])
  },
  methods: {
    checkFieldUndefined(key) {
      return key !== undefined ? true : false;
    }
  }
};
</script>

<style scoped>
.card__header__text{
  letter-spacing: 0.2em;
}
.emp_profile_img {
  width: 120px;
}
.emp_profile_container {
  flex-grow: 0;
  justify-content: center;
  align-items: end;
  align-self: stretch;
  flex-direction: column;
  gap: 10px;
  flex: none;
  order: 0;
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
.bg-card {
  background: linear-gradient(179.99deg, #0087e2 0.01%, rgba(0, 0, 0, 0) 108.24%);
  width: 100%;
  max-width: 230px;
}
</style>