<template>
  <b-row>
    <b-col cols="12" md="6" class="mt--20" v-for="( item, itemIdx ) in listBenefit" :key="'itemIdx_'+itemIdx">
      <div class="mt--10 bg-white wrapper__cart">
        <div class="cart__custom">
          <div class="d-flex align-items-center">
            <div class="text-20 text-NTUC-19 font__bold">{{item.Name}}</div>
          </div>
          <b-collapse v-model="item.isShowDetail">
            <b-row class="mt--16">
              <b-col cols="12" md="6">
                <b-form-group
                  id="example-input-group-1"
                  :label="$t('benefit.employee_id')"
                  label-for="example-input-1"
                  class="input-group-form mb--20"
                >
                  <b-form-input
                    v-model="item.EmployeeID"
                    class="text-16 text-NTUC-10 form__input--NTUC-11"
                    :disabled="true"
                    :placeholder="''"
                  />
                </b-form-group>
              </b-col>
              <b-col cols="12" md="6">
                <b-form-group
                  id="example-input-group-1"
                  :label="$t('benefit.Name')"
                  label-for="example-input-1"
                  class="input-group-form mb--20"
                >
                  <b-form-input
                    v-model="item.Name"
                    class="text-16 text-NTUC-10 form__input--NTUC-11"
                    :disabled="true"
                    :placeholder="''"
                  />
                </b-form-group>
              </b-col>
              <b-col cols="12" md="6">
                <b-form-group
                  id="example-input-group-1"
                  :label="$t('benefit.Gender')"
                  label-for="example-input-1"
                  class="input-group-form mb--20"
                >
                  <b-form-input
                    v-model="item.Gender"
                    class="text-16 text-NTUC-10 form__input--NTUC-11"
                    :disabled="true"
                    :placeholder="''"
                  />
                </b-form-group>
              </b-col>
              <b-col cols="12" md="6">
                <b-form-group
                  id="example-input-group-1"
                  :label="$t('benefit.Nationality')"
                  label-for="example-input-1"
                  class="input-group-form mb--20"
                >
                  <b-form-input
                    v-model="item.Nationality"
                    class="text-16 text-NTUC-10 form__input--NTUC-11"
                    id="Name"
                    :disabled="true"
                    :placeholder="''"
                  />
                </b-form-group>
              </b-col>
              <b-col cols="12" md="6">
                <b-form-group
                  id="example-input-group-1"
                  :label="$t('benefit.Relationship')"
                  label-for="example-input-1"
                  class="input-group-form mb--20"
                >
                  <b-form-input
                    v-model="item.Relationship"
                    class="text-16 text-NTUC-10 form__input--NTUC-11"
                    id="Name"
                    :disabled="true"
                    :placeholder="''"
                  />
                </b-form-group>
              </b-col>
              <b-col cols="12" md="6">
                <b-form-group
                  id="example-input-group-1"
                  :label="$t('benefit.child_type')"
                  label-for="example-input-1"
                  class="input-group-form mb--20"
                >
                  <b-form-input
                    v-model="item.ChildTypeNew"
                    class="text-16 text-NTUC-10 form__input--NTUC-11"
                    id="Name"
                    :disabled="true"
                    :placeholder="''"
                  />
                </b-form-group>
              </b-col>
              <b-col cols="12" md="6">
                <b-form-group
                  id="example-input-group-1"
                  :label="$t('benefit.NRIC')"
                  label-for="example-input-1"
                  class="input-group-form mb--20"
                >
                  <b-form-input
                    v-model="item.NRIC"
                    class="text-16 text-NTUC-10 form__input--NTUC-11"
                    id="Name"
                    :disabled="true"
                    :placeholder="''"
                  />
                </b-form-group>
              </b-col>
              <b-col cols="12" md="6">
                <b-form-group
                  id="example-input-group-1"
                  :label="$t('benefit.Date_of_Birth')"
                  label-for="example-input-1"
                  class="input-group-form mb--20"
                >
                  <DatetimePicker
                    :placeholder="''"
                    v-model="item.dob"
                    :options="options"
                    :disabled="true"
                  />
                </b-form-group>
              </b-col>
              <b-col cols="12" md="6">
                <b-form-group
                  id="example-input-group-1"
                  :label="$t('benefit.country_of_residence')"
                  label-for="example-input-1"
                  class="input-group-form mb--20"
                >
                  <VueSelect
                    :placeholder="''"
                    v-model="item.CountryOfResidence"
                    :options="listCountry"
                    :class="`${(validateCountryofResidence && (!item.CountryOfResidence|| typeof item.CountryOfResidence=='object'))?'border border-danger rounded-lg':''}`"
                  />
                </b-form-group>
              </b-col>
            </b-row>
          </b-collapse>
        </div>
        <div v-if="!item.isShowDetail" @click="item.isShowDetail = !item.isShowDetail" class="d-flex align-items-center mt--20 bg-NTUC-9 cursor_pointer" style="padding: 22px 24px;">
          <div class="text-14 text-NTUC-3 more__detail">{{$t('benefit.View_Dependent_details')}}</div>
          <b-icon class="text-NTUC-3 icon--plus" icon="arrow-right-short"></b-icon>
        </div>
        <div v-else @click="item.isShowDetail = !item.isShowDetail" class="d-flex align-items-center justify-content-center mt--20 bg-NTUC-3 cursor_pointer" style="padding: 22px 24px;">
          <div class="text-14 text-white more__detail">{{$t('benefit.Collapse_Details')}}</div>
          <b-icon class="text-white icon--plus" icon="arrow-up-short"></b-icon>
        </div>
      </div>
    </b-col>
    <Loading
      :isLoading="isLoading"
    />
  </b-row>
</template>

<script>
import { mapActions } from 'vuex';
import Autocomplete from '~/components/autocomplete';
import Loading from '~/components/modal/loading.vue';

export default {
  components: {
    Autocomplete,
    Loading,
  },
  props:{
    listBenefit:{
      type: Array,
      default: []
    },
    validateCountryofResidence:{
      default: "",
    }
  },
  data: () => ({
    isLoading: false,
    options: {
      format: 'DD-MM-YYYY',
      useCurrent: false,
    },
    listRelationship: [],
    listGender: [],
    listMarital: [],
    listCountry:[]
  }),
  async fetch() {
    this.isLoading = true;
    this.listRelationship = await this.getListOptions(8);
    this.listCountry = await this.getListAutocomplete(3);
    this.listGender = await this.getListOptions(1);
    this.listMarital = await this.getListOptions(2);
    setTimeout(() => {
      this.isLoading = false;
    }, 1000);
  },
  methods: {
    ...mapActions('benefit', [
      'getEmpPersonalDetails',
      'listOptions',
      'getListDependent'
    ]),
    async getListOptions(listGroup) {
      return this.listOptions({
        "invoke": "System.execute",
        "argc": "2",
        "a0": "API.List.Select",
        "a1": {
          "ListGroup": listGroup,
        }
      });
    },
    async getListAutocomplete(listGroup) {
      const resGetgetListAutocomplete = await this.listOptions({
        "invoke": "System.execute",
        "argc": "2",
        "a0": "API.Autocomplete.Select",
        "a1": {
          "module": listGroup,
        }
      });
      return resGetgetListAutocomplete.map(el=> { return{id:el.id,text:el.name}});
    }
  },
}
</script>

<style scoped>
@import '@/assets/css/first-time-login/benefit/cartBenefit.css';
@import '@/assets/css/inputCustom/inputCustom.css';
</style>