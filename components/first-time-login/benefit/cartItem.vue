<template>
  <div class="h-100">
    <div ref="textDescription" class="contain-desc" :style="textClientHeight ? `height: ${textClientHeight}px` : ''">
      <div class="text-16 text-gray--800">
        {{
          productdisplayorder[index].benefitInformation &&
          productdisplayorder[index].benefitInformation.description
        }}
      </div>
    </div>
    <div class="mt--10 bg-white wrapper__cart justify-content-between" :style="`height: calc(100% - ${textClientHeight}px)`">
      <div class="cart__custom">
        <div class="d-flex align-items-center justify-content-between">
          <div class="d-flex align-items-center">
            <div class="text-20 font__bold text-NTUC-19">{{ productdisplayorder[index].name }}</div>
          </div>
          <div v-if="isListBenefit" class="text-20 text-NTUC-13 font__bold">
            {{relationship && price}}
          </div>
        </div>
        <b-row>
          <b-col cols="12" :lg="(productdisplayorder[index].nameRadioBedded && productdisplayorder[index].nameRadioBedded.gstproducttype == 'true') ? 6 : 12">
            <div v-if="isListBenefit" class="text-14 text-NTUC-16 mt--16">
              {{ $t('benefit.Your_Company’s_Core_Plan') }}
            </div>
          </b-col>
          <b-col cols="12" lg="6">
            <div v-if="productdisplayorder[index].nameRadioBedded && productdisplayorder[index].nameRadioBedded.gstproducttype == 'true'" class="text-14 text-NTUC-16 mt--16 text-lg-right">
              {{ $t('benefit.gst-price') }}
            </div>
          </b-col>
        </b-row>
        <b-row style="margin: 14px 43px 0 43px">
          <b-col cols="12" md="6">
            <b-form-group
              :id="`${index}-1`"
              :label="$t('benefit.Benefit_Plan')"
              label-for="example-input-1"
              class="input-group-form mb--20 text-gray--700 text-12"
            >
              <b-form-input
                class="text-14 text-NTUC-6 form__input--NTUC-7 cut-text"
                id="Benefit_Plan"
                :disabled="true"
                :placeholder="''"
                :value="
                  productdisplayorder[index].nameRadioBedded &&
                  productdisplayorder[index].nameRadioBedded.name
                "
              />
            </b-form-group>
            <b-tooltip
              v-if="productdisplayorder[index].nameRadioBedded && productdisplayorder[index].nameRadioBedded.name"
              :target="`${index}-1`"
              triggers="hover"
            >
              <div
                v-html="productdisplayorder[index].nameRadioBedded &&
                productdisplayorder[index].nameRadioBedded.name"
              />
            </b-tooltip>
          </b-col>
          <b-col cols="12" md="6">
            <b-form-group
              :id="`${index}-2`"
              :label="$t('benefit.Coverage')"
              label-for="example-input-1"
              class="input-group-form mb--20 text-gray--700 text-12"
            >
              <b-form-input
                class="text-14 text-NTUC-6 form__input--NTUC-7 text--capitalize cut-text"
                id="Coverage"
                :disabled="true"
                :placeholder="''"
                :value="coverage"
              />
            </b-form-group>
            <b-tooltip
              v-if="coverage"
              :target="`${index}-2`"
              triggers="hover"
            >
              <div v-html="coverage" />
            </b-tooltip>
          </b-col>
        </b-row>
        <b-collapse v-if="isListBenefit" v-model="productdisplayorder[index].isShowDetail">
          <div class="border--gray" />
          <b-row>
            <b-col cols="12" md="12">
              <div class="text-16 text-gray--900 font__medium">
                {{ $t('benefit.Personalise_this_plan') }}
              </div>
            </b-col>
            <b-col v-if="isCheckUnderwriting" cols="12" md="12">
              <div class="text-12 font__regular text-NTUC-15">
                {{ $t('benefit.Medical_Underwriting_may_be_required') }}
              </div>
            </b-col>
          </b-row>
          <b-row class="mt--20">
            <b-col cols="12" md="6">
              <b-form-group label="" v-slot="{ ariaDescribedby }">
                <b-form-checkbox-group
                  id="checkbox-group-2"
                  v-model="selected"
                  :aria-describedby="ariaDescribedby"
                  name="flavour-2"
                  class="d-flex"
                  style="flex-direction: column"
                  :disabled="!isListBenefit"
                >
                  <b-form-checkbox
                    v-for="( checkbox, chkbxIdx ) in selectParent"
                    :key="'chkbxIdx_' + chkbxIdx"
                    class="text-16 mb-8 font__regular text--capitalize"
                    :value="checkbox"
                    :disabled="checkbox && checkbox.iscompulsory"
                  >
                    {{ checkbox && checkbox.name }}
                    <b-form-group
                      v-if="
                        selected.find(
                          select => select.key == 'children' && checkbox.key == 'children'
                        ) &&
                        selectionListing.perdependant &&
                        listDependant[0]
                      "
                      class="m-0 ml--30"
                      label=""
                      v-slot="{ ariaDescribedby }"
                    >
                      <b-form-checkbox-group
                        id="checkbox-group-2"
                        v-model="selectedSub"
                        :aria-describedby="ariaDescribedby"
                        name="flavour-2"
                        class="d-flex"
                        style="flex-direction: column"
                      >
                        <b-form-checkbox
                          v-for="( checkboxSub, chksubIdx ) in listDependant"
                          :key="'chksubIdx_' + chksubIdx"
                          class="text-16 mb-8 font__regular"
                          :value="checkboxSub"
                          :disabled="checkboxSub && checkboxSub.iscompulsory"
                        >
                          {{ checkboxSub && checkboxSub.name }}
                        </b-form-checkbox>
                      </b-form-checkbox-group>
                    </b-form-group>
                  </b-form-checkbox>
                </b-form-checkbox-group>
              </b-form-group>
            </b-col>
            <b-col cols="12" md="6">
              <b-form-group class="m-0" v-slot="{ ariaDescribedby }">
                <b-form-radio-group
                  v-model="productdisplayorder[index].nameRadioBedded"
                  class="d-flex"
                  style="flex-direction: column"
                  :aria-describedby="ariaDescribedby"
                  :disabled="!isListBenefit"
                >
                  <b-form-radio
                    v-for="( option, optionIdx ) in listBenefit[index]"
                    :key="'optionIdx_' + optionIdx"
                    class="text-16 mb-8 font__regular"
                    @change="() => refresh++"
                    :value="option"
                  >
                    {{ option && option.name }}
                  </b-form-radio>
                </b-form-radio-group>
              </b-form-group>
            </b-col>
          </b-row>
        </b-collapse>
      </div>
      <div v-if="isListBenefit">
        <div
          v-if="!productdisplayorder[index].isShowDetail"
          @click="
            productdisplayorder[index].isShowDetail = !productdisplayorder[index].isShowDetail
          "
          class="d-flex align-items-center justify-content-center mt--20 bg-NTUC-9 arrow-right-short"
        >
          <div class="text-14 text-NTUC-3 more__detail">{{ $t('benefit.View_Details') }}</div>
          <b-icon class="text-NTUC-3 icon--plus" icon="arrow-right-short"></b-icon>
        </div>
        <div
          v-else
          @click="
            productdisplayorder[index].isShowDetail = !productdisplayorder[index].isShowDetail
          "
          class="d-flex align-items-center justify-content-center mt--20 bg-NTUC-3 arrow-up-short"
        >
          <div class="text-14 text-white more__detail">{{ $t('benefit.Collapse_Details') }}</div>
          <b-icon class="text-white icon--plus" icon="arrow-up-short"></b-icon>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import { formatMoney } from '@/utils/functions/formatMoney';

export default {
  props: {
    isLoading: {
      type: Boolean,
      required: false
    },
    index: {
      type: Number,
      required: false
    },
    isListBenefit: {
      type: Boolean,
      required: false
    },
    listBenefit: {
      type: Array,
      required: false
    },
    listCheckBoxSave: {
      type: Array,
      required: false
    },
    listCheckBoxSubSave: {
      type: Array,
      required: false
    },
    listProperties: {
      type: Array,
      required: false
    },
    productdisplayorder: {
      type: Array,
      required: false
    },
    textClientHeight: {
      type: Number,
      required: false
    },
  },
  async fetch() {
    await this._onChangeSelectionListing(this.index);
    this.listCheckBoxSave[this.index] && await this._handleBoxSave(this.listCheckBoxSave[this.index]);
    this.listCheckBoxSubSave[this.index] && this._handleBoxSubSave(this.listCheckBoxSubSave[this.index]);
    this.selectedParent[0] && this._handleSelectParent(this.selectedParent);
    this.selectedChildren[0] && this._handleSelectChildren(this.selectedChildren);
  },
  mounted() {
    const _this = this;

      setTimeout(() => {
        let isCheckIndex = _this.index % 2 ? true : false;
        _this.$emit('_changeListTextClientHeight', _this.$refs.textDescription.clientHeight, _this.index, isCheckIndex);
      }, 1000)
  },
  data: () => ({
    refresh: 1,
    selected: [],
    selectedSub: [],
    selectParent: [],
    selectionListing: {},
    relationship: {},
    isCheckUnderwriting: false,
    listDependant: []
  }),
  computed: {
    ...mapGetters('benefit', [
      'listCompulsory',
    ]),
    coverage: function () {
      let result = '';
      this.selected.map((item, i) => {
        result = result + item.key + `${i + 1 == this.selected.length ? '' : ', '}`;
      });
      return result;
    },
    'parent': function() {
      return this.productdisplayorder[this.index] && this.productdisplayorder[this.index].parent;
    },
    'selectedParent': function() {
      return this.productdisplayorder[this.index] && this.productdisplayorder[this.index].selectedParent;
    },
    'selectedChildren': function() {
      return this.productdisplayorder[this.index] && this.productdisplayorder[this.index].selectedChildren;
    },
    'price': function() {
      return this._formatMoney(this.relationship.price || 0);
    },
    'checkBoxSave': function() {
      return this.listCheckBoxSave[this.index];
    },
    'checkBoxSubSave': function() {
      return this.listCheckBoxSubSave[this.index];
    },
  },
  methods: {
    ...mapActions('benefit', [
      'onChangeSelectionListing',
      'onChangeRelationship',
      'setListCompulsory',
    ]),
    _formatMoney(price) {
      return formatMoney(price);
    },
    async _onChangeSelectionListing(indexItem, isDraft) {
      try {
        if (
          this.productdisplayorder[indexItem].nameRadioBedded &&
          this.productdisplayorder[indexItem].nameRadioBedded.optval
        ) {
          const resOnChangeSelectionListing = await this.onChangeSelectionListing({
            invoke: 'System.execute',
            argc: '2',
            a0: 'API.Flex.OnChangeSelectionListing',
            a1: {
              employee: localStorage.getItem('empid'),
              type: this.listProperties[this.index].type,
              optval: this.productdisplayorder[indexItem].nameRadioBedded.optval
            }
          });

          if (!resOnChangeSelectionListing) {
            this._handleResetData();
            return;
          }

          this.selectionListing = resOnChangeSelectionListing;

          if (this.selectionListing) {
            this._handleSelectionListing(indexItem, isDraft);
            this._handleDependancy();
            this._handleDependant();
          }
        } else {
          this._handleResetData();
        }
      } catch (error) {
        console.log('_onChangeSelectionListing: ', error);
      }
    },
    _handleSelectionListing( indexItem, isDraft ) {
      let selectedTem = [];
      Object.values(this.selectionListing).forEach((e, i) => {
        if (e && e.displayorder) {
          e.key = Object.keys(this.selectionListing)[i];
          e.name =
            Object.keys(this.selectionListing)[i] == 'employee'
              ? this.$t('Myself')
              : `${this.$t('my')} ${Object.keys(this.selectionListing)[i]}`;
        }
        if (e && e.isdefault) {
          selectedTem.push(e);
        }
      });
      this.selected = isDraft ? this.selected : selectedTem;
      this.$emit('_changeListCheckBox', this.selected, indexItem);

      this.selectParent = Object.values(this.selectionListing)
        .filter(item => {
          if (item && item.displayorder && item.eligible) {
            return true;
          }
        })
        .sort((a, b) => a.displayorder - b.displayorder);
    },
    _handleDependant() {
      let listDependantTem = [];
      if (
        this.selectionListing &&
        this.selectionListing.children &&
        this.selectionListing.perdependant &&
        this.selectionListing.children.dependant
      ) {
        for (let dependantObject of this.selectionListing.children.dependant) {
          for (let dependant of Object.values(dependantObject)) {
            listDependantTem.push({
              ...dependant,
              dependantId: Object.keys(dependantObject)[0],
              iscompulsory: false,
            });
          }
        }
      }
      this.listDependant = listDependantTem;
    },
    _handleResetData() {
      this.selected = [];
      this.selectedSub = [];
      this.selectParent = [];
      this.listDependant = [];
    },
    _handleDependancy() {
      if (this.selectionListing.dependancy) {
        this._handleForDependancy(this.selectionListing.dependancy.flexinsurance, 'flexinsurance');
        this._handleForDependancy(this.selectionListing.dependancy.flexnoninsurance, 'flexnoninsurance');
        this._handleForDependancy(this.selectionListing.dependancy.flexothersbenefit, 'flexothersbenefit');
      }
    },
    _handleForDependancy(dependancys, key) {
      if (dependancys) {
        for (let dependancy of Object.keys(dependancys)) {
          //if (
          // this.selectionListing.dependancy[`${key}`][`${dependancy}`] &&
          //  this.selectionListing.dependancy[`${key}`][`${dependancy}`][0] &&
          //  !this.selectionListing.dependancy[`${key}`][`${dependancy}`][0].followparentrelationship
          //) continue;
          //if ((dependancy.includes('GTL') || dependancy.includes('GPA'))) continue;

          let indexProductdisplayorder = this.productdisplayorder.findIndex(
            item => item.name == dependancy
          );
          this.selectionListing.dependancy[`${key}`][`${dependancy}`] &&
            this.$emit(
              '_changeListBenefit',
              this.selectionListing.dependancy[`${key}`][`${dependancy}`],
              indexProductdisplayorder
            );
          this.$emit(
            '_changeProductdisplayorder',
            this.selectionListing.dependancy[`${key}`][`${dependancy}`].find(
              item => this.isLoading && localStorage.getItem('isClickSaveAsDraft') == localStorage.getItem('empid')
                ? item.optval == this.productdisplayorder[indexProductdisplayorder].nameRadioBedded.optval
                : item.isdefault == '1' || item.isdefault == 'true' 
            ),
            indexProductdisplayorder,
            'nameRadioBedded',
            this.index,
            this.selected,
            this.selectedSub,
          );

          const listCompulsoryTem = JSON.parse(JSON.stringify(this.listCompulsory));
          listCompulsoryTem[this.index].iscompulsory = this.selectionListing.children && this.selectionListing.children.iscompulsory;
          this.setListCompulsory(listCompulsoryTem);
        }
      }
    },
    _handleSelectParent(newValue) {
      this.selectParent.map(itemSelectParent => {
        const newValueTem = newValue.find(item => item.relationship == itemSelectParent.relationship);
        if (newValueTem) {
          itemSelectParent.iscompulsory = newValueTem.iscompulsory;
        } else {
          this.selected = this.selected.filter(el => el.relationship !== itemSelectParent.relationship)
          itemSelectParent.iscompulsory = true;
        }
      });
    },
    _handleSelectChildren(newValue) {
      let selectedChildrenTem = [];
      this.listDependant.map(itemSelectChildren => {
        const newValueTem = newValue.find(item => item.id == itemSelectChildren.id);
        if (newValueTem) {
          itemSelectChildren.iscompulsory = newValueTem.iscompulsory;
          selectedChildrenTem.push(itemSelectChildren);
        } else {
          itemSelectChildren.iscompulsory = true;
        }
      });
      this.selectedSub = selectedChildrenTem;
      this.$emit('_changeListCheckBoxSub', this.selectedSub, this.index);
    },
    async _handleOnChangeRelationship(listRelationship, listemployeedpdt) {
      let relationship = [];
      let employeedpdt = [];
      listRelationship.map(item => {
        relationship.push(item.relationship);
      });
      listemployeedpdt.map(item => {
        employeedpdt.push(item.dependantId);
      });

      if (!this.productdisplayorder[this.index].nameRadioBedded) return;

      const resOnChangeRelationship = await this.onChangeRelationship({
        invoke: 'System.execute',
        argc: '2',
        a0: 'API.Flex.OnChangeRelationship',
        a1: {
          employee: localStorage.getItem('empid'),
          type: this.listProperties[this.index].type,
          optval: this.productdisplayorder[this.index].nameRadioBedded.optval,
          relationship,
          employeedpdt,
        }
      });

      if (resOnChangeRelationship) {
        this.$emit('_changeListOnChangeRelationship', resOnChangeRelationship, this.index);
        this.$emit(
          '_changeListProperties',
          resOnChangeRelationship.relationship,
          this.index,
          'priceid'
        );
        this.relationship = resOnChangeRelationship;
        if (resOnChangeRelationship.underwriting) {
          this.isCheckUnderwriting = Object.values(resOnChangeRelationship.underwriting).find(
            item => item && typeof item == 'boolean'
          )
            ? true
            : false;
        } else {
          this.isCheckUnderwriting = false;
        }
      } else {
        setTimeout(()=>{
          this.relationship.flex_utilised_price ="0.00"
          this.relationship.price = "0.00"
          this.$emit('_changeListOnChangeRelationship', this.relationship, this.index);
        },200)
      }
    },
    async _handleBoxSave(newValue) {
      let isCheckChangeValue = false;
      let newValueTem = newValue;
      let selectedTem = this.selected;
      if (selectedTem.length > newValueTem.length) {
        newValueTem = this.selected;
        selectedTem = newValue;
      }
      for (let value of newValueTem) {
        if (!selectedTem.find(select => select.relationship == value.relationship)) {
          isCheckChangeValue = true;
        }
      }
      if (newValue[0] && isCheckChangeValue) {
        this.selected = newValue;
        await this._onChangeSelectionListing(this.index, true);
      }
    },
    _handleBoxSubSave(newValue) {
      if (newValue[0]) {
        this.selectedSub = newValue;
      }
    }
  },
  watch: {
    refresh: async function () {
      await this._onChangeSelectionListing(this.index);
      if (this.parent || this.parent == 0) {
        this._handleSelectParent(this.selectedParent);
      }

      this.$emit(
        '_changeListProperties',
        this.productdisplayorder[this.index].nameRadioBedded.optval,
        this.index,
        'optval'
      );
    },
    selected: async function (newValue) {
      for (let [
        indexProductdisplayorderItem,
        productdisplayorderItem
      ] of this.productdisplayorder.entries()) {
        if (productdisplayorderItem.parent == this.index) {
          this.$emit(
            '_changeProductdisplayorderSelectedParent',
            newValue,
            indexProductdisplayorderItem
          );
        }
      }
      if (!newValue.find(select => select.key == 'children')) {
        this.selectedSub = [];
      } else {
        this.selectedSub = this.listDependant;
        if (this.parent != null) {
          this.selectedChildren[0] && this._handleSelectChildren(this.selectedChildren);
        } else {
          this.selectedSub = this.listDependant;
        }
      }
      this.$emit('_changeListCheckBox', newValue, this.index);
      if (this.isLoading && this.index == 0) {
        setTimeout(async () => {
          await this._handleOnChangeRelationship(newValue, this.selectedSub);
        }, 1000)
      } else {
        await this._handleOnChangeRelationship(newValue, this.selectedSub);
      }
    },
    selectedSub: async function (newValue) {
      for (let [
        indexProductdisplayorderItem,
        productdisplayorderItem
      ] of this.productdisplayorder.entries()) {
        if (productdisplayorderItem.parent == this.index) {
          this.$emit(
            '_changeProductdisplayorderSelectedChildren',
            newValue,
            indexProductdisplayorderItem
          );
        }
      }
      const listCheckBoxSubSaveId = [];
      this.$emit('_changeListCheckBoxSub', newValue, this.index);
      newValue.forEach(item => {
        listCheckBoxSubSaveId.push(item.dependantId);
      });
      listCheckBoxSubSaveId[0] &&
        this.$emit('_changeListProperties', listCheckBoxSubSaveId, this.index, 'dependant');
      if (this.isLoading && this.index == 0) {
        setTimeout(async () => {
          await this._handleOnChangeRelationship(this.selected, newValue);
        }, 1000)
      } else {
        await this._handleOnChangeRelationship(this.selected, newValue);
      }
    },
    checkBoxSave: async function (newValue) {
      await this._handleBoxSave(newValue);
    },
    checkBoxSubSave: function (newValue) {
      this._handleBoxSubSave(newValue);
    },
    selectedParent: async function (newValue) {
      await this._onChangeSelectionListing(this.index);
      this._handleSelectParent(newValue);
      if(!newValue.length){
        this.listDependant = [];
      }
    },
    selectedChildren: async function (newValue) {
      this._handleSelectChildren(newValue);
    },
    selectParent: async function (newValue) {
      if (!newValue[0]) {
        this.$emit('_changeListCheckShowDelay', false, this.index);
      }
    }
  }
};
</script>

<style scoped>
@import '@/assets/css/first-time-login/benefit/cartBenefit.css';
@import '@/assets/css/inputCustom/inputCustom.css';

.arrow-right-short {
  padding: 22px 0;
}

.arrow-up-short {
  padding: 22px 24px;
}
</style>
