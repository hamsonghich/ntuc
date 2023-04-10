<template>
  <div class="autocomplete position-relative">
    <VueSimpleSuggest
      ref="VueSimpleSuggest"
      :value="valueAttribute && displayAttribute && value ? getValue(value) : value"
      :list="list"
      :value-attribute="valueAttribute"
      :display-attribute="displayAttribute"
      :filter-by-query="filter"
      :placeholder="placeholder"
      :max-suggestions="maxSuggestions"
      @blur="onBlurEvent"
      :min-length="0"
      :controls="{
        selectionUp: [38, 33],
        selectionDown: [40, 34],
        select: [13, 36],
        showList: [40],
        hideList: [27, 35],
        autocomplete: [32, 13]
      }"
      class="w-100 h-100"
      :class="{'styleLogFilter': isStyleLogFilter, 'styleAutoCompleteLog': isStyleAutoCompleteLog}"
      :styles="{
        inputWrapper: `w-100 h-100 ${this.isHeight50 && 'h--50'}`,
        defaultInput: `w-100 text-16 input_custom border-0 bg-none ${this.isHeight50 && 'h--50'} ${
          this.isDisabled ? 'autocomplete-input-disabled' : ''
        }`,
        suggestions: 'autocomplete-list-item text-16'
      }"
      :disabled="isDisabled"
      @select="onSelectEvent"
      @input="onInputEvent"
    >
    </VueSimpleSuggest>
    <b-icon
      icon="x-circle"
      class="position-absolute autocomplete-icon cursor_pointer"
      style="color: rgba(0, 0, 0, 0.44);"
      v-if="value && !isDisabled"
      @click="clearValue"
    />
    <b-icon
      icon="caret-down-fill"
      class="position-absolute autocomplete-icon"
      style="color: rgba(0, 0, 0, 0.44);"
      @click="handleIconClick"
      v-if="(!value && !isShowList && !isCurrency) || isDisabled"
    />
    <b-icon
      icon="caret-up-fill"
      class="position-absolute autocomplete-icon"
      style="color: rgba(0, 0, 0, 0.44);"
      @click="handleIconClick"
      v-if="!value && isShowList && !isCurrency && !isDisabled"
    />
  </div>
</template>

<script>
export default {
  props: {
    optionDropdowns: Array,
    value: String | Function,
    placeholder: String | Function,
    valueAttribute: {
      type: String,
      default: 'title'
    },
    displayAttribute: {
      type: String,
      default: 'id'
    },
    filter: {
      type: Boolean,
      required: false
    },
    isHeight50: {
      type: Boolean,
      default: false
    },
    maxSuggestions: {
      type: Number,
      default: 0
    },
    isDisabled: {
      type: Boolean,
      default: false
    },
    isCurrency: {
      type: Boolean,
      default: false
    },
    isStyleLogFilter: {
      type: Boolean,
      default: false
    },
    isStyleAutoCompleteLog: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      list: []
    };
  },
  computed: {
    isShowList() {
      if (this.$refs.VueSimpleSuggest) {
        return this.$refs.VueSimpleSuggest.listShown;
      } else {
        return false;
      }
    }
  },
  created() {
    this.list = JSON.parse(JSON.stringify(this.optionDropdowns));
  },
  mounted(){
    if(!this.$refs.VueSimpleSuggest.suggestions.length){
      this.$refs.VueSimpleSuggest.suggestions= this.list
    }
  },
  methods: {
    getValue(value) {
      return this.list.find(el => el[this.valueAttribute] === value);
    },
    onSelectEvent(value) {
      this.$emit(
        'changeValue',
        this.valueAttribute && this.displayAttribute ? value[this.valueAttribute] : value
      );
      setTimeout(() => {
        this.$refs.VueSimpleSuggest.listShown = false;
      }, 5);
    },
    onBlurEvent(e) {
      if (!this.list.find(el => el[this.displayAttribute] == e.target.value)) {
        this.$emit('changeValue', null);
        this.$refs.VueSimpleSuggest.setText('');
      }
    },
    onInputEvent(e) {
      if (!e) {
        this.$emit('changeValue', null);
      }
    },
    clearValue() {
      this.$emit('changeValue', null);
      this.$refs.VueSimpleSuggest.setText('');
    },
    handleIconClick() {
      if(!this.isDisabled){
        this.$refs.VueSimpleSuggest.listShown = !this.$refs.VueSimpleSuggest.listShown;
      }
    }
  },
  watch: {
    optionDropdowns: function (newValue) {
      this.list = JSON.parse(JSON.stringify(newValue));
      this.$refs.VueSimpleSuggest.suggestions= this.list
    }
  }
};
</script>

<style scoped>

.autocomplete-icon {
  top: calc(50% - 8px);
  right: 15px;
}
</style>
<style>
.autocomplete-input-disabled {
  background: #e9ecef !important;
}
.autocomplete-list-item {
  max-height: 200px;
  width: 100%;
  overflow: hidden;
  overflow-x: auto;
  white-space: nowrap;
  text-overflow: ellipsis;
}
input.default-input.bg-none {
  padding: 8px 12px !important;
  margin: 0;
  height: 40px;
}

input.default-input.bg-none::placeholder{
  width: 100%;
  height: 50px;
  font-style: normal;
  letter-spacing: 0.5px;
  color: #BDBDBD !important;
}
::v-deep .classAutoComplete_StepOneLog .vue-simple-suggest.designed {
  width: 474px !important;
  background: #fafafa !important;
  padding: 8px 12px !important;
  height: 40px !important;
  border-top: none !important;
  border-left: none !important;
  border-right: none !important;
  border-bottom: 1px solid rgba(0, 0, 0, 0.42) !important;
  border-radius: 0 !important;
}
</style>
