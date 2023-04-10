<template>
  <div :class="classGroup">
    <div :class="{
      text__lable_info_step_2: true,
      'line-height-15': true,
      'mb-2': true,
      'font-400': true,
      'font-bold': isFontBold,
      'text-12': isText12,
      'd-none': label === '' ? true : false,
      'text-black': textBlack
    }">
      {{ label }}
         <span v-if="isWarning" class="text-danger">(*)</span>
    </div>
    <div :class="{ 'position-relative': true, input__disabled: disabled }" :style="wrapperStyle">
      <date-picker
        ref="datePickerRef"
        v-model="value"
        @input="e => _updateValue(e)"
        :disabled="disabled"
        class="input_custom w-100 text-16"
        :placeholder="placeholder || $t('select_date')"
        name="date"
        :config="options || optionDefaults"
        :class="{'styleLogFilter': isStyleLogFilter}"
      >
      </date-picker>
      <b-icon @click.stop="_resetValue()" v-if="value && !disabled" class="icon__close cursor_pointer"
        icon="x-circle" />
      <img class="icon__date__picker" @click="_iconDatePickerClick" src="@/assets/images/date.png" alt="calendar"
        v-if="showIcon" />
    </div>
  </div>
</template>

<script>
import datePicker from 'vue-bootstrap-datetimepicker';
import { _handleMinMaxDay } from '~/utils/functions/formatTime';
import 'pc-bootstrap4-datetimepicker/build/css/bootstrap-datetimepicker.css';

export default {
  components: {
    datePicker
  },
  props: {
    disabled: {
      type: Boolean,
      required: false,
      default: false
    },
    textBlack: {
      type: Boolean,
      required: false,
      default: true
    },
    label: {
      type: String,
      required: false
    },
    value: Date | String,
    wrapperStyle: {
      type: String,
      required: false
    },
    placeholder: {
      type: String,
      required: false
    },
    options: {
      type: Object,
      required: false
    },
    isFontBold: {
      type: Boolean,
      required: false,
      default: false
    },
    classGroup: {
      type: String,
      default: ''
    },
    showIcon: {
      type: Boolean,
      default: true
    },
    isBgUnset: {
      type: Boolean,
      default: false,
      required: false
    },
    isText12: {
      type: Boolean,
      default: false,
      required: false
    },
    isWarning: {
      type: Boolean,
      default: false,
      required: false
    },
    isStyleLogFilter: {
      type: Boolean,
      default: false,
      required: false
    }
  },
  data: () => ({
    optionDefaults: {
      format: 'DD MMM YYYY',
      useCurrent: false,
      ..._handleMinMaxDay(),
      icons: {
        date: ''
      }
    }
  }),
  methods: {
    _iconDatePickerClick() {
      this.$refs.datePickerRef.dp.toggle();
    },
    _updateValue(event) {
      this.$emit('input', event);
    },
    _resetValue() {
      this.$emit('input', '');
    }
  }

};
</script>

<style>
@import '@/assets/css/inputCustom/inputCustom.css';
</style>
