<template>
  <div class="mt--30 bg-white px-3 pt--20 card__dashboard">
    <div class="d-flex w-100 justify-content-between align-items-center pb--20">
      <div class="text-NTUC-1 text-18 font__medium card__header__text line-height-12">
        {{ $t('dashboard.employment_info') }}
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
              v-if="checkFieldUndefined(employeeInfo.staffid)"
            >
              <b-form-group
                id="example-input-group-1"
                :label="employeeInfo.staffid.label"
                label-for="example-input-1"
                class="mb--20"
                label-class="text-black text-12"
              >
                <b-form-input
                  v-model="employeeInfo.staffid.value"
                  class="input_custom"
                  :placeholder="`Indicate ${employeeInfo.staffid.label}`"
                  :disabled="employeeInfo.staffid.disabled == '0'"
                />
              </b-form-group>
            </b-col>
            <b-col
              cols="12"
              lg="6"
              class="dashboard__body__col"
              v-if="checkFieldUndefined(employeeInfo.datejoined)"
            >
              <DatetimePicker
                :label="employeeInfo.datejoined.label"
                :options="options"
                v-model="employeeInfo.datejoined.value"
                :isText12="true"
                :disabled="employeeInfo.datejoined.disabled == '0'"
                :classGroup="'mb--20'"
              />
            </b-col>
            <b-col
              cols="12"
              lg="6"
              class="dashboard__body__col"
              v-if="checkFieldUndefined(employeeInfo.employeecategory)"
            >
              <b-form-group
                id="example-input-group-1"
                :label="employeeInfo.employeecategory.label"
                label-for="example-input-1"
                class="mb--20"
                label-class="text-black text-12"
              >
                <Autocomplete
                  :value="employeeInfo.employeecategory.value"
                  :valueAttribute="'id'"
                  :displayAttribute="'text'"
                  @changeValue="value => (this.employeeInfo.employeecategory.value = value)"
                  class="set-width"
                  :placeholder="`Select ${employeeInfo.employeecategory.label}`"
                  :optionDropdowns="listCategory"
                  :isDisabled="employeeInfo.employeecategory.disabled == '0'"
                  :filter="true"
                />
              </b-form-group>
            </b-col>
            <b-col
              cols="12"
              lg="6"
              class="dashboard__body__col"
              v-if="checkFieldUndefined(employeeInfo.employmenttype)"
            >
              <b-form-group
                id="example-input-group-1"
                :label="employeeInfo.employmenttype.label"
                label-for="example-input-1"
                class="mb--20"
                label-class="text-black text-12"
              >
                <Autocomplete
                  :value="employeeInfo.employmenttype.value"
                  :valueAttribute="'id'"
                  :displayAttribute="'text'"
                  @changeValue="value => (this.employeeInfo.employmenttype.value = value)"
                  class="set-width"
                  :placeholder="`Select ${employeeInfo.employmenttype.label}`"
                  :optionDropdowns="listEmploymentType"
                  :isDisabled="employeeInfo.employmenttype.disabled == '0'"
                  :filter="true"
                />
              </b-form-group>
            </b-col>
            <b-col
              cols="12"
              lg="6"
              class="dashboard__body__col"
              v-if="checkFieldUndefined(employeeInfo.vendorcode)"
            >
              <b-form-group
                id="example-input-group-1"
                :label="employeeInfo.vendorcode.label"
                label-for="example-input-1"
                class="mb--20"
                label-class="text-black text-12"
              >
                <b-form-input
                  v-model="employeeInfo.vendorcode.value"
                  :disabled="employeeInfo.vendorcode.disabeld == '0'"
                  :placeholder="`Indicate ${employeeInfo.vendorcode.label}`"
                  class="input_custom"
                />
              </b-form-group>
            </b-col>
            <b-col
              cols="12"
              lg="6"
              class="dashboard__body__col"
              v-if="checkFieldUndefined(employeeInfo.designation)"
            >
              <b-form-group
                id="example-input-group-1"
                :label="employeeInfo.designation.label"
                label-for="example-input-1"
                class="mb--20"
                label-class="text-black text-12"
              >
                <b-form-input
                  v-model="employeeInfo.designation.value"
                  :disabled="employeeInfo.designation.disabled"
                  :placeholder="`Indicate ${employeeInfo.designation.label}`"
                  class="input_custom"
                />
              </b-form-group>
            </b-col>
            <b-col
              cols="12"
              lg="6"
              class="dashboard__body__col"
              v-if="checkFieldUndefined(employeeInfo.effectivedate)"
            >
              <DatetimePicker
                :label="employeeInfo.effectivedate.label"
                :options="options"
                v-model="employeeInfo.effectivedate.value"
                :isText12="true"
                :classGroup="'mb--20'"
                :disabled="employeeInfo.effectivedate.disabled == '0'"
              />
            </b-col>
            <b-col
              cols="12"
              lg="6"
              class="dashboard__body__col"
              v-if="checkFieldUndefined(employeeInfo.datetermnt)"
            >
              <DatetimePicker
                :label="employeeInfo.datetermnt.label"
                :options="options"
                v-model="employeeInfo.datetermnt.value"
                :isText12="true"
                :showIcon="false"
                :disabled="employeeInfo.datetermnt.disabled == '0'"
                :classGroup="'mb--20'"
              />
            </b-col>
            <b-col
              cols="12"
              lg="6"
              class="dashboard__body__col"
              v-if="checkFieldUndefined(employeeInfo.country)"
            >
              <b-form-group
                id="example-input-group-1"
                :label="employeeInfo.country.label"
                label-for="example-input-1"
                label-class="text-black text-12"
                class="mb--20"
              >
                <b-form-input
                  v-model="employeeInfo.country.value"
                  :disabled="employeeInfo.country.disabled == '0'"
                  class="input_custom"
                  :placeholder="`Indicate ${employeeInfo.country.label}`"
                />
              </b-form-group>
            </b-col>
            <b-col
              cols="12"
              lg="6"
              class="dashboard__body__col"
              v-if="checkFieldUndefined(employeeInfo.localforeginworker)"
            >
              <b-form-group
                id="example-input-group-1"
                :label="employeeInfo.localforeginworker.label"
                label-for="example-input-1"
                class="mb--20"
                label-class="text-black text-12"
              >
                <b-form-input
                  v-model="employeeInfo.localforeginworker.value"
                  :disabled="employeeInfo.localforeginworker.disabled == '0'"
                  class="input_custom"
                  :placeholder="`Indicate ${employeeInfo.localforeginworker.label}`"
                />
              </b-form-group>
            </b-col>
            <b-col
              cols="12"
              lg="6"
              class="dashboard__body__col"
              v-if="checkFieldUndefined(employeeInfo.salarysetting)"
            >
              <b-form-group
                id="example-input-group-1"
                :label="employeeInfo.salarysetting.label"
                label-for="example-input-1"
                label-class="text-black text-12"
                class="mb--20"
              >
                <Autocomplete
                  :value="employeeInfo.salarysetting.value"
                  :valueAttribute="'id'"
                  :displayAttribute="'text'"
                  @changeValue="value => (this.employeeInfo.salarysetting.value = value)"
                  class="set-width"
                  :placeholder="`Select ${employeeInfo.salarysetting.label}`"
                  :optionDropdowns="listSalarySetting"
                  :isDisabled="employeeInfo.salarysetting.disabled == '0'"
                  :filter="true"
                />
              </b-form-group>
            </b-col>
            <b-col
              cols="12"
              lg="6"
              class="dashboard__body__col"
              v-if="checkFieldUndefined(employeeInfo.division)"
            >
              <b-form-group
                id="example-input-group-1"
                :label="employeeInfo.division.label"
                label-for="example-input-1"
                label-class="text-black text-12"
                class="mb--20"
              >
                <b-form-input
                  v-model="employeeInfo.division.value"
                  :disabled="employeeInfo.division.disabled == '0'"
                  class="input_custom"
                  :placeholder="`Indicate ${employeeInfo.division.label}`"
                />
              </b-form-group>
            </b-col>
            <b-col
              cols="12"
              lg="6"
              class="dashboard__body__col"
              v-if="checkFieldUndefined(employeeInfo.department)"
            >
              <b-form-group
                id="example-input-group-1"
                :label="employeeInfo.department.label"
                label-for="example-input-1"
                class="mb--20"
                label-class="text-black text-12"
              >
                <b-form-input
                  v-model="employeeInfo.department.value"
                  :disabled="employeeInfo.department.disabled == '0'"
                  :placeholder="`Indicate ${employeeInfo.department.label}`"
                  class="input_custom"
                />
              </b-form-group>
            </b-col>
            <b-col
              cols="12"
              lg="6"
              class="dashboard__body__col"
              v-if="checkFieldUndefined(employeeInfo.insuredentity)"
            >
              <b-form-group
                id="example-input-group-1"
                :label="employeeInfo.insuredentity.label"
                label-for="example-input-1"
                class="mb--20"
                label-class="text-black text-12"
              >
                <Autocomplete
                  :value="employeeInfo.insuredentity.value"
                  :valueAttribute="'id'"
                  :displayAttribute="'text'"
                  @changeValue="value => (this.employeeInfo.insuredentity.value = value)"
                  class="set-width"
                  :placeholder="`Select ${employeeInfo.insuredentity.label}`"
                  :optionDropdowns="listInsuredEntity"
                  :isDisabled="employeeInfo.insuredentity.disabled == '0'"
                  :filter="true"
                />
              </b-form-group>
            </b-col>
            <b-col cols="12" lg="6" class="dashboard__body__col">
              <b-row class="m-0">
                <b-col
                  cols="12"
                  lg="6"
                  class="p-0 pr-lg-1"
                  v-if="checkFieldUndefined(employeeInfo.currency)"
                >
                  <b-form-group
                    id="example-input-group-1"
                    :label="employeeInfo.currency.label"
                    label-for="example-input-1"
                    label-class="text-black text-12"
                    class="mb--20"
                  >
                    <Autocomplete
                      :value="employeeInfo.currency.value"
                      :valueAttribute="'id'"
                      :displayAttribute="'text'"
                      @changeValue="value => (this.employeeInfo.currency.value = value)"
                      class="set-width"
                      :placeholder="`Select ${employeeInfo.currency.label}`"
                      :optionDropdowns="listCurrency"
                      :isDisabled="(employeeInfo.currency.disabled = '0')"
                      :filter="true"
                    />
                  </b-form-group>
                </b-col>
                <b-col
                  cols="12"
                  lg="6"
                  class="p-0 pl-lg-1"
                  v-if="checkFieldUndefined(employeeInfo.salary)"
                >
                  <b-form-group
                    id="example-input-group-1"
                    :label="employeeInfo.salary.label"
                    label-for="example-input-1"
                    class="mb--20 position-relative"
                    label-class="text-black text-12"
                  >
                    <b-form-input
                      v-model="employeeInfo.salary.value"
                      :type="showPassword ? 'text' : 'password'"
                      class="input_custom"
                      :disabled="employeeInfo.salary.disabled == '0'"
                      :placeholder="`Indicate ${employeeInfo.salary.label}`"
                    />
                    <span class="cursor_pointer position-absolute icon__watch">
                      <b-icon
                        @click="showPassword = !showPassword"
                        v-if="showPassword"
                        for="showPassword"
                        id="showPassword"
                        icon="eye"
                      />
                      <b-icon @click="showPassword = !showPassword" v-else icon="eye-slash" />
                    </span>
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
  props: ['employeeInfo'],
  data() {
    return {
      show: false,
      showPassword: false,
      options: {
        format: 'DD-MM-YYYY',
        useCurrent: false
      }
    };
  },
  computed: {
    ...mapGetters('list-options', [
      'listEmploymentType',
      'listLocal',
      'listCountryCode',
      'listSalarySetting'
    ]),
    ...mapGetters('autocomplete', ['listCurrency', 'listCategory', 'listInsuredEntity'])
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
.bg-card {
  background: linear-gradient(179.99deg, #0087e2 0.01%, rgba(0, 0, 0, 0) 108.24%);
}
</style>