<template>
  <div :id="id" class="pos-rel">
    <div :class="{
      'input--dropdown': true,
      'input--focus': isShowDropdown,
    }">
      <div
        @click="_dropdownHandler"
        :class="{
          'search-form__selector': true,
          'search-form__selector--show': isShowDropdown,
          'input__disabled_select': isCheckDisabled,
        }"
      >
          <p
            class="search-form__label search-form__label--loc"
            :style="{
              color: value ? '#212529' : '#6C757D',
              'min-height': '24px',
            }"
          >
            {{
              value && itemText && itemValue
              ? optionDropdowns.find((item) => item[`${itemValue}`] == value) && optionDropdowns.find((item) => item[`${itemValue}`] == value)[`${itemText}`]
              : value ? value : placeholder
            }}
          </p>
        <b-icon @click.stop="_resetValue()" v-if="value && !isCheckDisabled && !isCheckHiddenIconDropdown && !currency" class="icon__close" icon="x-circle" />
        <img
          v-if="!isCheckHiddenIconDropdown"
          class="icon__date__picker"
          src="@/assets/images/icon-down.png" alt="icon-down"
        >
      </div>
    </div>
    <ul :class="{'search-form__dropdown': true, 'search-form__dropdown--show': isShowDropdown}">
      <li
        v-for="(optionDropdown, index) in optionDropdowns"
        :key="index"
        class="search-form__value"
        data-loc="search-form-loc"
        @click="_changeValue(itemText && itemValue ? optionDropdown[`${itemValue}`] : optionDropdown)"
      >
        {{ itemText && itemValue ? optionDropdown[`${itemText}`] : optionDropdown}}
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  props: {
    'optionDropdowns': [],
    'value': String | Function,
    'placeholder': String | Function,
    'id': String | Function,
    'itemText': {
      type: String,
      required: false
    },
    'itemValue': {
      type: String,
      required: false
    },
    'currency': {
      type: Boolean,
      required: false,
      default: false,
    },
    'isCheckHiddenIconDropdown': {
      type: Boolean,
      required: false,
      default: false,
    },
    'isCheckDisabled': Boolean,
  },
  data: () => ({
    isShowDropdown: false,
  }),
  methods: {
    _dropdownHandler() {
      if (!this.isCheckDisabled) {
        this.isShowDropdown = !this.isShowDropdown;
      }
    },
    _changeValue(value) {
      this.$emit('changeValue', value);
      this.isShowDropdown = false;
    },
    _resetValue() {
      this.$emit('changeValue', '');
      this.isShowDropdown = false;
    },
    _mouseup() {
      const _this = this;
      window.addEventListener("mouseup", function (event) { // Noncompliant: no checks are done on the origin property.
        if (event && event.origin !== "http://example.org") // Compliant
          return;
        const dropdown = document.querySelector(`#${_this.id} .search-form__dropdown`);

        if (event.target != dropdown) {
          _this.isShowDropdown = false;
        }
      });
    }
  },
  watch: {
    isCheckDisabled: function(newVal) {
      if (!newVal) {
        this._mouseup();
      }
    }
  },
  mounted() {
    if (!this.isCheckDisabled) {
      this._mouseup();
    }
  }
}
</script>

<style>
@import '@/assets/css/selectCustom/selectCustom.css';
</style>
