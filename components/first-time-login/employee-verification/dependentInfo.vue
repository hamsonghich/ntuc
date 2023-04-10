<template>
  <div class="mt--30 bg-white px-3 pt--20 card__dashboard">
    <div class="d-flex w-100 justify-content-between align-items-center pb--20">
      <div class="text-NTUC-1 card__header__text text-18 font__medium line-height-12">
        <b-icon icon="trash" class="mr-2 cursor_pointer" @click="removeDependent" />
        {{ dependent.name }}
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
              v-if="checkFieldUndefined(dependent.id)"
            >
              <b-form-group
                id="example-input-group-1"
                :label="listLabelDependent.userid"
                label-for="example-input-1"
                class="mb--20 "
                label-class="text-black text-12"
              >
                <b-form-input
                  v-model="dependent.id"
                  class="input_custom"
                  :disabled="listDisabledDependent.userid == '0' && dependent.id"
                  :placeholder="`Indicate ${listLabelDependent.userid}`"
                />
              </b-form-group>
            </b-col>
            <b-col
              cols="12"
              lg="6"
              class="dashboard__body__col"
              v-if="checkFieldUndefined(dependent.name)"
            >
              <b-form-group
                :id="objError.name.id"
                :label="listLabelDependent.name"
                label-for="example-input-1"
                class="mb--20"
                label-class="text-black text-12"
              >
                <b-form-input
                  v-model="dependent.name"
                  class="input_custom"
                  :placeholder="`Indicate ${listLabelDependent.name}`"
                  :disabled="listDisabledDependent.name == '0' && dependent.id"
                />
                <b-form-invalid-feedback v-if="objError.name.status" class="d-block">
                  {{objError.name.error}}
                </b-form-invalid-feedback>
              </b-form-group>
            </b-col>
            <b-col
              cols="12"
              lg="6"
              class="dashboard__body__col"
              v-if="checkFieldUndefined(dependent.nric)"
            >
              <b-form-group
                :id="objError.nric.id"
                :label="listLabelDependent.nric"
                label-for="example-input-1"
                label-class="text-black text-12"
                class="mb--20"
              >
                <b-form-input
                  v-model="dependent.nric"
                  class="input_custom"
                  :placeholder="`Indicate ${listLabelDependent.nric}`"
                  :disabled="listDisabledDependent.nric == '0' && dependent.id"
                />
                <b-form-invalid-feedback v-if="objError.nric.status" class="d-block">
                  {{objError.nric.error}}
                </b-form-invalid-feedback>
              </b-form-group>
            </b-col>
            <b-col
              cols="12"
              lg="6"
              class="dashboard__body__col"
              :id="objError.dob.id"
              v-if="checkFieldUndefined(dependent.dob)"
            >
              <DatetimePicker
                :label="listLabelDependent.dob"
                :options="options"
                v-model="dependent.dob"
                :isText12="true"
                :classGroup="'mb--20'"
                :disabled="listDisabledDependent.dob == '0' && dependent.id"
              />
              <b-form-invalid-feedback v-if="objError.dob.status" class="d-block">
                {{objError.dob.error}}
              </b-form-invalid-feedback>
            </b-col>
            <b-col
              cols="12"
              lg="6"
              class="dashboard__body__col"
              v-if="checkFieldUndefined(dependent.maritalstatus)"
            >
              <b-form-group
                :id="objError.maritalstatus.id"
                :label="listLabelDependent.maritalstatus_name_ind_field"
                label-for="example-input-1"
                class="mb--20"
                label-class="text-black text-12"
              >
                <Autocomplete
                  :value="dependent.maritalstatus"
                  :valueAttribute="'id'"
                  :displayAttribute="'text'"
                  @changeValue="value => (this.dependent.maritalstatus = value)"
                  class="set-width"
                  :optionDropdowns="listMaritalStatus"
                  :isDisabled="
                    listDisabledDependent.maritalstatus_name_ind_field == '0' && dependent.id
                  "
                  :placeholder="`Select ${listLabelDependent.maritalstatus_name_ind_field}`"
                  :filter="true"
                />
                <b-form-invalid-feedback v-if="objError.maritalstatus.status" class="d-block">
                  {{objError.maritalstatus.error}}
                </b-form-invalid-feedback>
              </b-form-group>
            </b-col>
            <b-col
              cols="12"
              lg="6"
              class="dashboard__body__col"
              v-if="checkFieldUndefined(dependent.gender)"
            >
              <b-form-group
                :id="objError.gender.id"
                :label="listLabelDependent.gender_name_ind_field"
                label-for="example-input-1"
                label-class="text-black text-12"
                class="mb--20"
              >
                <Autocomplete
                  :value="dependent.gender"
                  :valueAttribute="'id'"
                  :displayAttribute="'text'"
                  @changeValue="value => (this.dependent.gender = value)"
                  class="set-width"
                  :optionDropdowns="listGender"
                  :placeholder="`Select ${listLabelDependent.gender_name_ind_field}`"
                  :isDisabled="listDisabledDependent.gender_name_ind_field == '0' && dependent.id"
                  :filter="true"
                />
                <b-form-invalid-feedback v-if="objError.gender.status" class="d-block">
                  {{objError.gender.error}}
                </b-form-invalid-feedback>
              </b-form-group>
            </b-col>

            <b-col
              cols="12"
              lg="6"
              class="dashboard__body__col"
              v-if="checkFieldUndefined(dependent.relationship)"
            >
              <b-form-group
                :id="objError.relationship.id"
                :label="listLabelDependent.relationship_name_ind_field"
                label-for="example-input-1"
                label-class="text-black text-12"
                class="mb--20"
              >
                <Autocomplete
                  :value="dependent.relationship"
                  :valueAttribute="'id'"
                  :displayAttribute="'text'"
                  @changeValue="value => (this.dependent.relationship = value)"
                  class="set-width"
                  :optionDropdowns="listRelationship"
                  :placeholder="`Select ${listLabelDependent.relationship_name_ind_field}`"
                  :isDisabled="
                    listDisabledDependent.relationship_name_ind_field == '0' && dependent.id
                  "
                  :filter="true"
                />
                <b-form-invalid-feedback v-if="objError.relationship.status" class="d-block">
                  {{objError.relationship.error}}
                </b-form-invalid-feedback>
              </b-form-group>
            </b-col>
            <b-col
              cols="12"
              lg="6"
              class="dashboard__body__col"
              v-if="checkFieldUndefined(dependent.countrycode)"
            >
              <b-form-group
                :id="objError.countrycode.id"
                :label="listLabelDependent.countrycode_name_ind_field"
                label-for="example-input-1"
                label-class="text-black text-12"
                class="mb--20"
              >
                <Autocomplete
                  :value="dependent.countrycode"
                  :valueAttribute="'id'"
                  :displayAttribute="'text'"
                  @changeValue="value => (this.dependent.countrycode = value)"
                  class="set-width"
                  :optionDropdowns="listCountryCode"
                  :placeholder="`Select ${listLabelDependent.countrycode_name_ind_field}`"
                  :isDisabled="
                    listDisabledDependent.countrycode_name_ind_field == '0' && dependent.id
                  "
                  :filter="true"
                />
                <b-form-invalid-feedback v-if="objError.countrycode.status" class="d-block">
                  {{objError.countrycode.error}}
                </b-form-invalid-feedback>
              </b-form-group>
            </b-col>
            <b-col
              cols="12"
              lg="6"
              class="dashboard__body__col"
              v-if="checkFieldUndefined(dependent.mobilephone)"
            >
              <b-form-group
                :id="objError.mobilephone.id"
                :label="listLabelDependent.mobilephone"
                label-for="example-input-1"
                label-class="text-black text-12"
                class="mb--20"
              >
                <b-form-input
                  v-model="dependent.mobilephone"
                  :disabled="listDisabledDependent.mobilephone == '0' && dependent.id"
                  class="input_custom"
                  :placeholder="`Indicate ${listLabelDependent.mobilephone}`"
                />
                <b-form-invalid-feedback v-if="objError.mobilephone.status" class="d-block">
                  {{objError.mobilephone.error}}
                </b-form-invalid-feedback>
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
  props: ['dependent', 'index', 'listLabelDependent', 'listDisabledDependent', 'submitKey'],
  data() {
    return {
      show: false,
      showPassword: false,
      options: {
        format: 'DD-MM-YYYY',
        useCurrent: false
      },
      objError: {
        check: false,
        name: {error: 'Please enter Name.', status: false, id: `name-${this.index}`},
        nric: {error: 'Please enter NRIC/ FIN.', status: false, id: `nric-${this.index}`},
        dob: {error: 'Please enter Date of Birth.', status: false, id: `dob-${this.index}`},
        maritalstatus: {error: 'Please enter Marital Status.', status: false, id: `maritalstatus-${this.index}`},
        gender: {error: 'Please enter Gender.', status: false, id: `gender-${this.index}`},
        relationship: {error: 'Please enter Relationship.', status: false, id: `relationship-${this.index}`},
        countrycode: {error: 'Please enter Mobile Country Code.', status: false, id: `countrycode-${this.index}`},
        mobilephone: {error: 'Please enter Mobile No.', status: false, id: `mobilephone-${this.index}`},
        isFormError: false
      },
    };
  },
  computed: {
    ...mapGetters('list-options', [
      'listEmploymentType',
      'listLocal',
      'listCountryCode',
      'listSalarySetting',
      'listGender',
      'listMaritalStatus',
      'listRelationship'
    ]),
    ...mapGetters('autocomplete', ['listCurrency', 'listCategory'])
  },
  created() {
    if (!this.dependent.id) {
      this.show = true;
      setTimeout(()=>{
        window.scrollTo({ top: 9999, behavior: 'smooth' });
      },500)
    }
  },
  watch: {
    submitKey(val) {
      this.handleValidateForm();
      this.$emit('handleListStatusDependent', !this.objError.isFormError);
      if(this.objError.isFormError) this.show = true;
      this.handleErrorFieldId();
    },
    dependent: {
      handler: function (val, oldVal) {
        this.validateForm();
      },
      deep: true
    }
  },
  methods: {
    checkFieldUndefined(key) {
      return key !== undefined ? true : false;
    },
    removeDependent() {
      this.$emit('removeDependent', this.index);
    },
    validateForm(){
      try {
        if(this.objError.check){
          this.objError.name.status = !this.dependent.name;
          this.objError.nric.status = !this.dependent.nric;
          this.objError.dob.status = !this.dependent.dob;
          this.objError.maritalstatus.status = !this.dependent.maritalstatus;
          this.objError.gender.status = !this.dependent.gender;
          this.objError.relationship.status = !this.dependent.relationship;
          this.objError.countrycode.status = !this.dependent.countrycode;
          this.objError.mobilephone.status = !this.dependent.mobilephone;

          this.objError.isFormError =
            this.objError.name.status ||
            this.objError.nric.status ||
            this.objError.dob.status ||
            this.objError.maritalstatus.status ||
            this.objError.gender.status ||
            this.objError.relationship.status ||
            this.objError.countrycode.status ||
            this.objError.mobilephone.status;
        }
        return;
      } catch (error) {
        console.log('validateForm', error);
      }
    },
    handleValidateForm(){
      this.objError.check = true;
      this.validateForm();
    },
    async handleErrorFieldId(){
      const abc = Object.entries(this.objError).map(e => e[1])
      let arrayId = abc.map(e => {
        if(e.status == true) return e.id;
      });
      arrayId = arrayId.filter( Boolean );
      this.$emit('handleListErrorFieldId', arrayId);
    },
  },

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

.icon__watch {
  top: 40px;
  right: 12px;
}
</style>
