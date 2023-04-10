<template>
  <div class="benefit__cart" :key="resetKey">
    <b-col cols="12" md="12" class="d-flex justify-content-end mt--10">
      <div class="font__bold text-black text-20 mb-0" >{{$t('benefit.Total_Deduction_From_Payroll')}}
        <strong class="text-20 text-NTUC-13 font__bold">
          {{totalUtilisedPrice}}
        </strong>
      </div>
    </b-col>
    <b-col cols="12" md="12" class="d-flex justify-content-end mt--0">
      <div class="font__medium text-NTUC-6 text-18 mb-5" >{{$t('benefit.total_on_hold_price')}}
        <strong class="text-20 font__medium">
          {{totalOnHoldPrice}}
        </strong>
      </div>
    </b-col>
    <b-card-group deck>
      <b-card v-for="(item, index) in listBenefit" :key="'index_'+index">
        <CartItem
          v-if="listCheckShowDelay[index].isCheckShowDelay"
          :isLoading="isLoading"
          :index="index"
          :isListBenefit="isListBenefit"
          :listBenefit="listBenefit"
          :listCheckBoxSave="listCheckBoxSave"
          :listCheckBoxSubSave="listCheckBoxSubSave"
          :listProperties="listProperties"
          :listOnChangeRelationship="listOnChangeRelationship"
          :textClientHeight="listTextClientHeight[index].clientHeight"
          :productdisplayorder="productdisplayorder"
          @_changeListCheckBox="_changeListCheckBox"
          @_changeListCheckBoxSub="_changeListCheckBoxSub"
          @_changeListProperties="_changeListProperties"
          @_changeListBenefit="_changeListBenefit"
          @_changeProductdisplayorder="_changeProductdisplayorder"
          @_changeProductdisplayorderSelectedParent="_changeProductdisplayorderSelectedParent"
          @_changeProductdisplayorderSelectedChildren="_changeProductdisplayorderSelectedChildren"
          @_changeListOnChangeRelationship="_changeListOnChangeRelationship"
          @_changeListTextClientHeight="_changeListTextClientHeight"
          @_changeListCheckShowDelay="_changeListCheckShowDelay"
        />
      </b-card>
    </b-card-group>
    <Loading
      :isLoading="isLoading"
    />
    <b-modal
      v-model="modalCheckThreeWork"
      content-class="border-0"
      title-class="text-white"
      header-class="bg-NTUC-3"
      :title="$t('dashboard.information')"
      :no-close-on-backdrop="true"
      centered
      size="md"
    >
      <div class="text-24 text-NTUC-6">
        <div>Got it.</div>
        <br />
        <div class="text-16 text-gray--800">
          Thank you for your submission. Your form has been successfully submitted. 
          <br />
          <br />
          You will receive an email within 3 work days with the breakdown of the costs.
          <br />
        </div>
      </div>
      <template #modal-footer>
        <div class="w-100">
          <b-button variant="primary" class="float-right bg-NTUC-3" @click="_goToDashboard">
            {{ $t('btn.ok') }}
          </b-button>
        </div>
      </template>
    </b-modal>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import CartItem from '~/components/first-time-login/benefit/cartItem.vue';
import Loading from '~/components/modal/loading.vue';
import { formatMoney } from '@/utils/functions/formatMoney';

export default {
  props: {
    isListBenefit: {
      type: Boolean,
      required: false
    },
    goToHDF:{
      type: Boolean,
      required: false
    }
  },
  components: {
    CartItem,
    Loading,
  },
  async fetch() {
    await this._handleGetData();
  },
  data: () => ({
    isLoading: false,
    totalUtilisedPrice: '',
    totalOnHoldPrice: '',
    productdisplayorder: [],
    listBenefit: [],
    listCheckBox: [],
    listCheckBoxSub: [],
    listCheckBoxSave: [],
    listCheckBoxSubSave: [],
    listProperties: [],
    listOnChangeRelationship: [],
    listCheckShowDelay: [],
    listTextClientHeight: [],
    listGstBenefit: [],
    resetKey: 0,
    modalCheckThreeWork: false,
  }),
  computed: {
    ...mapGetters('benefit', [
      'showDetailAll',
      'isClickSaveAsDraft',
      'isClickConfirm',
      'selectionListing',
      'isReset',
      'listCompulsory',
    ]),
  },
  methods: {
    ...mapActions('benefit', [
      'getSelectionListing',
      'getFlexAllocationInfo',
      'getBenefitInformation',
      '_isClickSaveAsDraft',
      'webTemporarySave',
      'webLoadSave',
      '_selectionListing',
      '_isClickConfirm',
      'submitSelection',
      '_isClickSaveAsDraftSuccess',
      '_isClickConfirmSuccess',
      '_isCheckHDF',
      '_isReset',
      '_showDetailAll',
      'setListCompulsory',
    ]),
    ...mapActions('login', ['fetchGetRelatedLoginInfo']),
    ...mapActions('alert', ['_changeAlertConfig']),
    delayedShow (checkShowDelay, idx) {
      let delay = 1000 * idx;
      setTimeout(() => {
        checkShowDelay.isCheckShowDelay = true;
        if (idx == (this.listCheckShowDelay.length - 1)) {
          this.isLoading = false;
          this._showDetailAll(true);
        }
      }, delay)
      if (idx == (this.listCheckShowDelay.length - 1)) {
        setTimeout(() => {
          this._showDetailAll(false);
        }, delay + 2000)
         setTimeout(() => {
          this._showDetailAll(true);
        }, delay + 4000)
      }
    },
    _goToDashboard() {
      this.modalCheckThreeWork = false
      this.$router.push({name: 'first-time-login-dashboard'});
    },
    _changeListCheckShowDelay(value, index) {
      this.listCheckShowDelay[index].isCheckShowDelay = value;
    },
    _handelTotalUtilisedPrice(value) {
      let result = '';
      let totalOnHoldPrice = '';
        if(value===undefined || value===null) {
          result = 0
          totalOnHoldPrice= 0
        } else {
          for (let onChangeRelationship of value) {
            if (onChangeRelationship.flex_utilised_price && Number(onChangeRelationship.flex_utilised_price)) {
              result = Number(result) + Number(onChangeRelationship.flex_utilised_price);
            }
            if (onChangeRelationship.flex_pending_price && Number(onChangeRelationship.flex_pending_price)) {
              totalOnHoldPrice = Number(totalOnHoldPrice) + Number(onChangeRelationship.flex_pending_price);
            }
          }
        }
      this.totalUtilisedPrice = this._formatMoney(result);
      this.totalOnHoldPrice = this._formatMoney(totalOnHoldPrice);
    },
    _changeListTextClientHeight(value, index, isCheckIndex) {
      if (isCheckIndex) {
        if (this.listTextClientHeight[index - 1].clientHeight > value) {
          this.listTextClientHeight[index].clientHeight = this.listTextClientHeight[index - 1].clientHeight;
        } else {
          this.listTextClientHeight[index - 1].clientHeight = value;
          this.listTextClientHeight[index].clientHeight = value;
        }
      } else {
        this.listTextClientHeight[index].clientHeight = value;
      }
    },
    _formatMoney(price) {
      return formatMoney(price);
    },
    _changeListCheckBox(value, index) {
      this.listCheckBox[index] = value;
    },
    _changeListOnChangeRelationship(value, index) {
      this.listOnChangeRelationship[index] = value;
      this._handelTotalUtilisedPrice(this.listOnChangeRelationship);
    },
    _changeListCheckBoxSub(value, index) {
      this.listCheckBoxSub[index] = value;
    },
    _changeListProperties(value, index, key) {
      if (this.listProperties[index] && this.listProperties[index][`${key}`]) {
        this.listProperties[index][`${key}`] = value;
      }
    },
    async _changeListBenefit(value, index) {
      try {
        value.forEach(element => {
          this.listBenefit[index].forEach(e => {
            if(element.optval == e.optval) element.gstproducttype = e.gstproducttype
          })
        })
        this.listBenefit[index] = value;
      } catch (error) {
        this.listBenefit[index] = value;
      }
    },
    _changeProductdisplayorderSelectedParent(value, index) {
      if( index == -1 || value === undefined){
        return
      }
      this.productdisplayorder[index].selectedParent = value;
    },
    _changeProductdisplayorderSelectedChildren(value, index) {
      if( index == -1 || value === undefined){
        return
      }
      this.productdisplayorder[index].selectedChildren = value;
    },
    _changeProductdisplayorder(value, index, key, indexParent, selectedParent, selectedChildren) {
      if( index == -1  || value === undefined){
        return
      }

      this.productdisplayorder[index][`${key}`] = value;
      this.productdisplayorder[index].parent = indexParent;
      this.productdisplayorder[index].selectedParent = selectedParent;
      this.productdisplayorder[index].selectedChildren = selectedChildren;
    },
    _handleResGetSelectionListing(resGetSelectionListing, resGetBenefitInformation) {
      let listBenefitTem = [];
      let listCheckBoxTem = [];
      let productdisplayorderTem = [];
      let selectionListingTem = [];
      let listOnChangeRelationshipTem = [];
      let listCheckShowDelayTem = [];
      let listTextClientHeightTem = [];
      let listCompulsoryTem = [];
      let getBenefitInformationTem = [
        ...resGetBenefitInformation.result.flexinsurance,
        ...resGetBenefitInformation.result.flexnoninsurance,
        ...resGetBenefitInformation.result.flexothersbenefit,
      ];
      for (let name of resGetSelectionListing.productdisplayorder) {
        if (
          (name.includes('Spouse') || name.includes('Children') || name.includes('Child')) &&
          !this.isListBenefit
        ) continue;

        const findFlexinsurance = Object.keys(resGetSelectionListing.flexinsurance).find(flexinsurance => flexinsurance == name);
        const findFlexnoninsurance = Object.keys(resGetSelectionListing.flexnoninsurance).find(flexnoninsurance => flexnoninsurance == name);
        const findFlexothersbenefit = Object.keys(resGetSelectionListing.flexothersbenefit).find(flexothersbenefit => flexothersbenefit == name);
        let productdisplayorderItem = {
          name,
          isShowDetail: false,
          nameRadioBedded: {},
          benefitInformation: getBenefitInformationTem.find(benefit => benefit.name == name),
          parent: null,
          selectedParent: [],
          selectedChildren: [],
        }
        let selectionListingItem = {
          optval: "",
          priceid: {},
          dependant: [],
          relationship: "",
          type: "",
        }

        if (findFlexinsurance) {
          let listBenefitTemFlexinsurance = [];
          resGetSelectionListing.flexinsurance[`${name}`].forEach(listFlexinsurance => {
            listBenefitTemFlexinsurance.push(...listFlexinsurance);
            listFlexinsurance.map(flexinsurance => {
              if (flexinsurance.isdefault == 'true') {
                productdisplayorderItem.nameRadioBedded = flexinsurance;
                selectionListingItem.optval = flexinsurance.optval;
              }
            })
          });
          listBenefitTem.push(listBenefitTemFlexinsurance);
          selectionListingItem.type = 'flexinsurance';
        } else if (findFlexnoninsurance) {
          let listBenefitTemFlexnoninsurance = [];
          resGetSelectionListing.flexnoninsurance[`${name}`].forEach(listFlexnoninsurance => {
            listBenefitTemFlexnoninsurance.push(...listFlexnoninsurance);
            listFlexnoninsurance.map(flexnoninsurance => {
              if (flexnoninsurance.isdefault == 'true') {
                productdisplayorderItem.nameRadioBedded = flexnoninsurance;
                selectionListingItem.optval = flexnoninsurance.optval;
              }
            })
          });
          listBenefitTem.push(listBenefitTemFlexnoninsurance);
          selectionListingItem.type = 'flexnoninsurance';
        } else if (findFlexothersbenefit) {
          let listBenefitTemFlexothersbenefit = [];
          resGetSelectionListing.flexothersbenefit[`${name}`].forEach(listFlexothersbenefit => {
            listBenefitTemFlexothersbenefit.push(...listFlexothersbenefit);
            listFlexothersbenefit.map(flexothersbenefit => {
              if (flexothersbenefit.isdefault == 'true') {
                productdisplayorderItem.nameRadioBedded = flexothersbenefit;
                selectionListingItem.optval = flexothersbenefit.optval;
              }
            })
          });
          listBenefitTem.push(listBenefitTemFlexothersbenefit);
          selectionListingItem.type = 'flexothersbenefit';
        }

        if (findFlexinsurance || findFlexnoninsurance || findFlexothersbenefit) {
          listCheckBoxTem.push([]);
          listOnChangeRelationshipTem.push([]);
          listCheckShowDelayTem.push({
            isCheckShowDelay: false,
          });
          listTextClientHeightTem.push({
            clientHeight: 0,
          });
          productdisplayorderTem.push(productdisplayorderItem);
          selectionListingTem.push(selectionListingItem);
          listCompulsoryTem.push({
            iscompulsory: false,
          })
        }
      }

      this.listCheckShowDelay = listCheckShowDelayTem;
      this.listTextClientHeight = listTextClientHeightTem;
      this.setListCompulsory(listCompulsoryTem);

      return {
        listBenefitTem,
        listCheckBoxTem,
        productdisplayorderTem,
        selectionListingTem,
        listOnChangeRelationshipTem,
        getBenefitInformationTem,
      }
    },
    async _handleWebLoadSave() {
      const resGetFlexAllocationInfo = await this.getFlexAllocationInfo({
        "invoke": "System.execute",
        "argc": "2",
        "a0": "API.Flex.GetFlexAllocationInfo",
        "a1": {
          "employee": localStorage.getItem('empid'),
        }
      });
      const resWebLoadSave = await this.webLoadSave({
        "invoke": "System.execute",
        "argc": "2",
        "a0": "API.Flex.WebLoadSave",
        "a1": {
          "employee": localStorage.getItem('empid'),
          "flexperiod": resGetFlexAllocationInfo.data.properties.flexperiod,
        }
      });
      if (JSON.parse(resWebLoadSave.data.properties)) {
        this.listCheckBoxSave = JSON.parse(resWebLoadSave.data.properties).listCheckBox;
        this.listCheckBoxSubSave = JSON.parse(resWebLoadSave.data.properties).listCheckBoxSub;

        for(let [indexBenefits, benefits] of this.listBenefit.entries()) {
          for(let benefit of benefits) {
            if (JSON.parse(resWebLoadSave.data.properties).listOptval[indexBenefits] == benefit.optval) {
              this.productdisplayorder[indexBenefits].nameRadioBedded = benefit;
            }
          }
        }
      }
    },
    async _handleGetData() {
      try {
        this.isLoading = true;
        const resGetFlexAllocationInfo = await this.getFlexAllocationInfo({
          "invoke": "System.execute",
          "argc": "2",
          "a0": "API.Flex.GetFlexAllocationInfo",
          "a1": {
            "employee": localStorage.getItem('empid'),
          }
        });
        const resGetSelectionListing = await this.getSelectionListing({
          "invoke": "System.execute",
          "argc": "2",
          "a0": "API.Flex.GetSelectionListing",
          "a1": {
            "employee": localStorage.getItem('empid'),
            "flexperiod": resGetFlexAllocationInfo.data.properties.flexperiod,
          }
        });
        const resGetBenefitInformation = await this.getBenefitInformation({
          "invoke": "System.execute",
          "argc": "2",
          "a0": "API.Flex.GetBenefitInformation",
          "a1": {
            "employee": localStorage.getItem('empid'),
          }
        });

        this.isLoading = false;
        const data = this._handleResGetSelectionListing(resGetSelectionListing, resGetBenefitInformation);

        this.productdisplayorder = data.productdisplayorderTem;
        this.listBenefit = data.listBenefitTem;
        this.listProperties = data.selectionListingTem;
        this.listOnChangeRelationship = data.listOnChangeRelationshipTem;
        this._selectionListing(resGetSelectionListing);
        this.listCheckShowDelay.forEach((checkShowDelay, index) => {
          this.delayedShow(checkShowDelay, index);
        })

        if (localStorage.getItem('isClickSaveAsDraft') != localStorage.getItem('empid')) {
          this.listCheckBox = JSON.parse(JSON.stringify(data.listCheckBoxTem));
          this.listCheckBoxSub = JSON.parse(JSON.stringify(data.listCheckBoxTem));
          localStorage.removeItem('isClickSaveAsDraft');
          this._handelTotalUtilisedPrice()
        } else {
          this._handelTotalUtilisedPrice();
          await this._handleWebLoadSave();
        }

        
      } catch (error) {
        this.isLoading = false;
        console.log('fetch: ', error);
      }
    },
    async _submitSelection(){
      this.isLoading = true;
      const isCheckCompulsory = this.listCompulsory.find((item, i) => {
        if (item?.iscompulsory && !this.listProperties[i].dependant[0]) return item;
      })
      if (isCheckCompulsory) {
        this._changeAlertConfig({
          isShow: true,
          typeAlert: 'warning',
          textAlert: this.$t('benefit.warning_compulsory'),
        });
        this._isClickConfirmSuccess(false);
        this.isLoading = false;
        return;
      }
      const resSubmitSelection = await this.submitSelection({
        "invoke": "System.execute",
        "argc": "2",
        "a0": "API.Flex.SubmitSelection",
        "a1": {
            "employee": localStorage.getItem('empid'),
            "properties": {
              "flexselection": this.selectionListing.flexselection,
              "flexinsurance": this.listProperties.filter(item => item.type == 'flexinsurance'),
              "flexnoninsurance": this.listProperties.filter(item => item.type == 'flexnoninsurance'),
              "flexothersbenefit": this.listProperties.filter(item => item.type == 'flexothersbenefit'),
            },
          }
      });
      if(typeof resSubmitSelection !== 'string'){
        if (!this.$route.params.isCheckThreeWork) {
          if (resSubmitSelection && resSubmitSelection.data.data.showhdform) {
            localStorage.setItem('isShowFlagHDF', true)
            this._isCheckHDF(true);
            this.$router.push({ name: 'first-time-login-benefit-health-declaration', params: { healthDeclarationStep: 2 } });
          } else if (resSubmitSelection && !resSubmitSelection.data.data.showhdform) {
            localStorage.setItem('isShowFlagHDF', false)
            this.$router.push({
              name: 'first-time-login-dashboard',
            });
          }
          await this.fetchGetRelatedLoginInfo({
            invoke: 'System.execute',
            argc: '2',
            a0: 'User.getRelatedLoginInfo',
            a1: {
              empid: localStorage.getItem('userid')
            }
          });
        }
      } else {
        this._changeAlertConfig({
          isShow: true,
          typeAlert: 'error',
          textAlert: String(resSubmitSelection).replaceAll('null:null:null:null:', ''),
        });
      }
      this.isLoading = false;
    },
  },
  watch: {
    'goToHDF': function(){
      if(this.goToHDF){
        this._submitSelection()
      }
    },
    'showDetailAll': function (newValue) {
      this.productdisplayorder.map(item => {
        item.isShowDetail = newValue;
      })
    },
    'isClickSaveAsDraft': async function (newValue) {
      try {
        if (newValue) {
          const optvalTem = [];

          for (let product of this.productdisplayorder) {
            optvalTem.push(product.nameRadioBedded ? product.nameRadioBedded.optval : '');
          }

          const properties = JSON.stringify({
            'listCheckBox': this.listCheckBox,
            'listCheckBoxSub': this.listCheckBoxSub,
            'listOptval': optvalTem,
          });

          localStorage.setItem('isClickSaveAsDraft', localStorage.getItem('empid'));
          const resGetFlexAllocationInfo = await this.getFlexAllocationInfo({
            "invoke": "System.execute",
            "argc": "2",
            "a0": "API.Flex.GetFlexAllocationInfo",
            "a1": {
              "employee": localStorage.getItem('empid'),
            }
          });
          this.webTemporarySave({
            "invoke": "System.execute",
            "argc": "2",
            "a0": "API.Flex.WebTemporarySave",
            "a1": {
              "employee": localStorage.getItem('empid'),
              "flexperiod": resGetFlexAllocationInfo.data.properties.flexperiod,
              "properties": properties,
            }
          });

          this._isClickSaveAsDraft(false);
          this._isClickSaveAsDraftSuccess(true);
        }
      } catch (error) {
        console.log('isClickSaveAsDraft: ', error);
      }
    },
    'isClickConfirm': async function (newValue) {
      try {
        if (newValue) {
          this._isClickConfirm(false);
          await this._submitSelection();
          if (this.$route.params.isCheckThreeWork) {
            this.modalCheckThreeWork = true;
          } else {
            this._isClickConfirmSuccess(false);
          }
        }
      } catch (error) {
        console.log('isClickConfirm: ', error);
      }
    },
    'isReset': async function (newValue) {
      if (newValue) {
        this.resetKey += 1;
        this._isReset(false);
        await this._handleGetData();
      }
    },
  },
  destroyed() {
    this._showDetailAll(false);
  },
}
</script>

<style scoped>
@import '@/assets/css/checkboxOrange';
@import '@/assets/css/first-time-login/benefit/cartBenefit.css';
@import '@/assets/css/inputCustom/inputCustom.css';
</style>
