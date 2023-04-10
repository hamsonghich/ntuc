<template>
  <div class="cart__filter__log px--20 br--20 position-absolute" v-click-outside="closeFilter">
    <div class="tittle__filter text-16 font__medium mb-0">{{ $t('claim.tittle') }}</div>
    <div class="d-flex wrapper__filter__log justify-content-between w-100">
      <div class="inner__filter__log w-100">
        <div
          class="d-flex align-items-center justify-content-between wrapper__input__filter__log mb-8"
        >
          <div class="label__filter__log font__regular text-16">{{ $t('claim.where') }}</div>
          <div class="position-relative wrapper__select__custom__log">
            <input
              class="input__custom input__custom__log text-14 br--4 font__regular"
              v-model="a1.name"
              placeholder="Clinic Name"
            />
          </div>
        </div>
        <div
          class="d-flex align-items-center justify-content-between wrapper__input__filter__log mb-8"
        >
          <div class="label__filter__log font__regular text-16">{{ $t('claim.and') }}</div>
          <div class="position-relative wrapper__select__custom__log">
            <input
              class="input__custom input__custom__log text-14 br--4 font__regular"
              v-model="a1.postal_code"
              placeholder="Postal Code"
            />
          </div>
        </div>
        <div
          class="d-flex align-items-center justify-content-between wrapper__input__filter__log mb-8"
        >
          <div class="label__filter__log font__regular text-16">{{ $t('claim.and') }}</div>
          <div class="position-relative wrapper__select__custom__log">
            <input
              class="input__custom input__custom__log text-14 br--4 font__regular"
              v-model="a1.service_info"
              placeholder="Specialty"
            />
          </div>
        </div>
        <div
          class="d-flex align-items-center justify-content-between wrapper__input__filter__log mb-8"
        >
          <div class="label__filter__log font__regular text-16">{{ $t('claim.and') }}</div>
          <div class="position-relative wrapper__select__custom__log">
            <Autocomplete
              class="input-ecard"
              :value="a1.category"
              :placeholder="$t('employee.category')"
              :optionDropdowns="listCategory"
              :valueAttribute="'id'"
              :displayAttribute="'name'"
              :filter="true"
              @changeValue="value => (a1.category = value)"
              :isStyleLogFilter="true"
            />
          </div>
        </div>

        <div @click="_searchClinic" class="btn-filter-search d-flex justify-content-end w-100">
          <button type="button" class="btn btn__log button__filter p-0">
            <img
              class="search__alt__light"
              src="@/assets/images/icon-search-popup.png"
              alt="Search_alt_light"
            />
          </button>
        </div>

      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: ['a1', 'typeList','listCategory'],
  methods: {
    _searchClinic() {
      this.$emit('_searchClinic', this.a1);
    },
    closeFilter(){
      this.$emit('closeFilter')
    }
  }
};
</script>

<style scoped>
@import '@/assets/css/inputCustom/inputCustom.css';
@import '@/assets/css/log/filterLog.css';

.cart__filter__log {
  top: 220px;
}
</style>

<style>
input.input__custom__log::placeholder {
  color: #B0BEC5 !important;
  -webkit-text-fill-color: #B0BEC5 !important;
}

::v-deep .input__custom__log {
  border: 1px solid rgba(0, 0, 0, 0.42) !important;
}

.styleLogFilter {
  border: 1px solid rgba(0, 0, 0, 0.42) !important;
  border-radius: 4px !important;
  background: var(--white) !important;
  padding: 8px 12px;
  height: 32px !important;
  font-size: 14px;
  width: 240px !important;
}

.styleLogFilter input {
  position: absolute;
  top: 0;
  left: 0;
  height: 32px !important;
  border-bottom: 0 !important;
  font-size: 14px;
  background: unset !important;
}

.bg-white {
  background: 'white';
}

.text-ct-gray {
  color: var(--gray-700);
}

.container__claim-log--support-mb {
  height: 177px;
  background: var(--white);
  margin-bottom: 24px;
}
</style>

