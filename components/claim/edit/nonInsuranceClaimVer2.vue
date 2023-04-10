<template>
  <div class="nonInsuranceClaim">
    <div class="wrapper__content__quick__log w-100 detail-claim-containter">
      <div class="wrapper__content">
        <div class="wrapper_checkbox_log__supp wrapper_checkbox_quick_log mb-4 mt-4">
          <b-row>
            <div class="question__quick__log mb-0 d-flex align-items-center w-100 mb-3">
              <div class="question__title text-24 font-400 text-black">{{$t('claim.Flexible_Benefits')}}</div>
              <button
                v-if="!stateArray.includes(myClaimInfo.state)"
                class="btn__edit border-0 d-flex justify-content-center align-items-center"
                @click="_handleDisabledForm"
              >
                <b-icon icon="pencil-fill" color="#212529" />
              </button>
            </div>
            <b-row class="w-100 mr-0 ml-0">
              <b-col cols="12" lg="6">
                <b-form-group label="Reference No">
                  <b-input
                    class="w-100 input-claim-cs input_custom"
                    :placeholder="'Ref No'"
                    :value="myClaimInfo.referenceno"
                    disabled
                  />
                </b-form-group>
              </b-col>
              <b-col class="d-flex w-100" cols="12" lg="6">
                <b-form-group class="mr-4 input__status" label="Label">
                  <b-input
                    v-if="myClaimInfo.state == 'Rejected'"
                    class="w-100 input-claim-cs status-rejected input_custom"
                    :placeholder="'Status'"
                    :value="myClaimInfo.state"
                    disabled
                  />
                  <b-input
                    v-else-if="
                      myClaimInfo.state == 'Approved' ||
                      myClaimInfo.state == 'Paid' ||
                      myClaimInfo.state == 'HR Approval'
                    "
                    class="w-100 input-claim-cs status-approved input_custom"
                    :placeholder="'Status'"
                    :value="myClaimInfo.state"
                    disabled
                  />
                  <b-input
                    v-else
                    class="w-100 input-claim-cs status-default input_custom"
                    :placeholder="'Status'"
                    :value="myClaimInfo.state"
                    disabled
                  />
                </b-form-group>
                <div class="d-flex align-items-center mt-2">
                  <img
                    v-if="myClaimInfo.state == 'Rejected'"
                    width="40px"
                    height="41px"
                    src="@/assets/images/icon-uncomfortable.png"
                    alt="icon-uncomfortable"
                  />
                  <img
                    v-else-if="
                      myClaimInfo.state == 'Approved' ||
                      myClaimInfo.state == 'Paid' ||
                      myClaimInfo.state == 'HR Approval'
                    "
                    width="40px"
                    height="40px"
                    src="@/assets/images/icon-like.png"
                    alt="icon-uncomfortable"
                  />
                  <img
                    v-else
                    width="40px"
                    height="40px"
                    src="@/assets/images/icon-question.png"
                    alt="icon-uncomfortable"
                  />
                </div>
              </b-col>
              <b-col cols="12" lg="6" class="mt-1">
                <div class="text_label text-12 font-400 font__regular text-black">{{$t('claim.Submitted_On')}}</div>
                <DatetimePicker
                  :placeholder="'Submitted On'"
                  :style="''"
                  :options="options"
                  :showStar="true"
                  :isFontBold="true"
                  v-model="myClaimInfo.createon"
                  disabled
                />
              </b-col>
            </b-row>
            <div class="line w-100 mt-3 mb-2"></div>
            <b-row class="w-100 ml-0 mr-0 pt-0">
              <b-col cols="12" lg="12">
                <div class="claimant_title text-20 font-500 font__medium text-NTUC-1 mt-2 mb-2">{{$t('claim.Claimant_Details')}}</div>
              </b-col>
              <b-col cols="12" lg="6">
                <b-form-group label="Employee Name">
                  <b-input
                    class="w-100 input-claim-cs input_custom"
                    :placeholder="'Employee Name'"
                    :value="myClaimInfo.employee"
                    disabled
                  />
                </b-form-group>
              </b-col>
              <b-col cols="12" lg="6">
                <b-form-group label="Claimant Name">
                  <Autocomplete
                    :placeholder="'Please select'"
                    :class="{'is-invalid': objError.claimant.status}"
                    :value="myClaimInfo.claimantid"
                    :displayAttribute="'name'"
                    :valueAttribute="'id'"
                    :optionDropdowns="listClaimMate"
                    :filter="true"
                    :isDisabled="isDisabledForm"
                    :isHeight50="false"
                    @changeValue="value => _changeAutocompleteClaimForm(value, 'claimantid')"
                  />
                  <b-form-invalid-feedback v-if="objError.claimant.status" class="d-block">
                    {{objError.claimant.error}}
                  </b-form-invalid-feedback>
                </b-form-group>
              </b-col>
              <b-col cols="12" lg="6" class="d-flex col-custome">
                <div class="w-100">
                  <div class="text_label text-12 font-400 font__regular text-black">{{$t('log.incurred_date')}}</div>
                  <b-form-group class="w-100">
                    <DatetimePicker
                      :placeholder="'Date of Birth'"
                      :style="''"
                      :options="options"
                      :showStar="true"
                      :isFontBold="true"
                      v-model="myClaimInfo.incurreddate"
                      :disabled="isDisabledForm"
                      :class="{'is-invalid': objError.incurreddate.status}"
                    />
                    <b-form-invalid-feedback v-if="objError.incurreddate.status" class="d-block">
                      {{objError.incurreddate.error}}
                    </b-form-invalid-feedback>
                  </b-form-group>
                </div>
              </b-col>
              <b-col cols="12" lg="6">
                <b-form-group label="Claim Type">
                  <Autocomplete
                    :placeholder="'Please select'"
                    :class="{'is-invalid': objError.claimtype.status}"
                    :value="myClaimInfo.claimtypeid"
                    :displayAttribute="'claimtypename'"
                    :valueAttribute="'claimtype'"
                    :optionDropdowns="listEligibleClaimType"
                    :filter="true"
                    :isDisabled="isDisabledForm"
                    :isHeight50="false"
                    @changeValue="value => _changeAutocompleteClaimForm(value, 'claimtypeid')"
                  />
                  <b-form-invalid-feedback v-if="objError.claimtype.status" class="d-block">
                    {{objError.claimtype.error}}
                  </b-form-invalid-feedback>
                </b-form-group>
                <div
                  class="d-flex flex-row"
                  v-if="objLabel.cpfpayable == '1' || objLabel.taxable == '1'"
                >
                  <div class="checkbox-label">Your claim category is liable for&ensp;</div>
                  <b-form-checkbox class="mr-2" disabled v-if="objLabel.cpfpayable == '1'" :checked="true"
                    >CPF</b-form-checkbox
                  >
                  <b-form-checkbox disabled v-if="objLabel.taxable == '1'" :checked="true"
                    >TAX</b-form-checkbox
                  >
                </div>
              </b-col>
            </b-row>
            <b-row
              class="mx-0"
              v-if="parseInt(myClaimInfo.claimtypeid)"
              :key="reRenderKey"
            >
              <div class="line w-100 mb-2" />
              <b-col cols="12" lg="12">
                <div class="claimant_title text-20 font-500 font__medium text-NTUC-1 mt-2 mb-2">{{$t('claim.Claimant_Details')}}</div>
              </b-col>
              <b-row class="w-100 ml-0 mr-0">
                <b-col cols="12" lg="6">
                  <b-form-group label="Invoice No" class="w-100">
                    <b-input
                      class="w-100 input-claim-cs input_custom"
                      :class="{'is-invalid': objError.invoiceno.status}"
                      :placeholder="'Invoice no'"
                      v-model="myClaimInfo.invoiceno"
                      :disabled="isDisabledForm"
                    />
                    <b-form-invalid-feedback v-if="objError.invoiceno.status" class="d-block">
                      {{objError.invoiceno.error}}
                    </b-form-invalid-feedback>
                  </b-form-group>
                </b-col>
              </b-row>
              <b-col cols="12" lg="6" class="d-flex col-custome">
                <b-form-group label="Currency" class="w-100">
                  <Autocomplete
                    :placeholder="'Currency'"
                    :class="{'is-invalid': objError.currency.status}"
                    :displayAttribute="'name'"
                    :valueAttribute="'id'"
                    :value="myClaimInfo.currencyid"
                    :optionDropdowns="listCurrency"
                    :filter="true"
                    :isDisabled="isDisabledForm"
                    :isCurrency="true"
                    :isHeight50="false"
                    @changeValue="value => _changeAutocompleteClaimForm(value, 'currencyid')"
                  />
                  <b-form-invalid-feedback v-if="objError.currency.status" class="d-block">
                    {{objError.currency.error}}
                  </b-form-invalid-feedback>
                </b-form-group>
              </b-col>
              <b-col cols="12" lg="6" class="d-flex col-custome">
                <b-form-group :label="objLabel.label2" class="w-100">
                  <currency-input
                    class="w-100 input-claim-cs input_custom"
                    v-model="myClaimInfo.incurredamt"
                    :class="{input_disabled: isDisabledForm, 'is-invalid': objError.incurredamt.status }"
                    :disabled="isDisabledForm"
                    placeholder="Please indicate"
                    :distraction-free="false"
                    :currency="null"
                    :min="0"
                    :max="null"
                    :precision="2"
                    locale="en-US"
                  />
                  <b-form-invalid-feedback v-if="objError.incurredamt.status" class="d-block">
                    {{objError.incurredamt.error}}
                  </b-form-invalid-feedback>
                </b-form-group>
              </b-col>
              <b-col cols="12" lg="6">
                <b-form-group :label="objLabel.label1">
                  <Autocomplete
                    :placeholder="'Please select'"
                    :class="{'is-invalid': objError.combinedserviceproviders.status }"
                    :value="myClaimInfo.combinedserviceprovidersid"
                    :displayAttribute="'name'"
                    :valueAttribute="'id'"
                    :optionDropdowns="label1DataList"
                    :filter="true"
                    :isDisabled="isDisabledForm"
                    :isHeight50="false"
                    @changeValue="
                      value => _changeAutocompleteClaimForm(value, 'combinedserviceprovidersid')
                    "
                  />
                  <b-form-invalid-feedback v-if="objError.combinedserviceproviders.status" class="d-block">
                    {{objError.combinedserviceproviders.error}}
                  </b-form-invalid-feedback>
                </b-form-group>
              </b-col>
              <b-col
                cols="12"
                v-if="
                  objLabel.disableotherserviceprovider == 'false' &&
                  myClaimInfo.combinedserviceprovidersid == 'null'
                "
              >
                <b-form-group :label="objLabel.label1 + ' (Others)'">
                  <b-input
                    class="w-100 input-claim-cs input_custom"
                    :class="{'is-invalid': objError.serviceproviderother.status }"
                    :placeholder="objLabel.label1 + ' (Others)'"
                    v-model="myClaimInfo.serviceproviderother"
                    :disabled="isDisabledForm"
                  />
                  <b-form-invalid-feedback v-if="objError.serviceproviderother.status" class="d-block">
                    {{objError.serviceproviderother.error}}
                  </b-form-invalid-feedback>
                </b-form-group>
              </b-col>
              <b-col
                cols="12"
                lg="6"
                class="d-flex col-custome"
                v-if="objLabel.referalletter == 'true'"
              >
                <b-form-group :label="objLabel.label6" class="w-100">
                  <div class="d-flex flex-row align-items-start">
                    <Autocomplete
                      class="referral-input w-100"
                      :key="referralKey"
                      :value="myClaimInfo.referalletter"
                      :placeholder="'Please select'"
                      :displayAttribute="'label'"
                      :valueAttribute="'id'"
                      :optionDropdowns="listReferral"
                      :filter="true"
                      :isHeight50="false"
                      :isDisabled="isDisabledForm"
                      @changeValue="value => _changeAutocompleteClaimForm(value, 'referalletter')"
                    />
                    <button
                      :disabled="isDisabledForm"
                      class="referral-btn ml-1"
                      v-b-modal.refferal-modal
                    >
                      <b-icon-box-arrow-in-up-right />Referral
                    </button>
                  </div>
                </b-form-group>
              </b-col>
              <b-col cols="12" lg="6">
                <b-form-group :label="objLabel.label3">
                  <Autocomplete
                    :placeholder="'Please select'"
                    :class="{'is-invalid': objError.claimreason.status }"
                    :displayAttribute="'name'"
                    :valueAttribute="'id'"
                    :optionDropdowns="label3DataList"
                    :value="myClaimInfo.claimreasonid"
                    :filter="true"
                    :isDisabled="isDisabledForm"
                    :isHeight50="false"
                    @changeValue="value => _changeAutocompleteClaimForm(value, 'claimreasonid')"
                  />
                  <b-form-invalid-feedback v-if="objError.claimreason.status" class="d-block">
                    {{objError.claimreason.error}}
                  </b-form-invalid-feedback>
                </b-form-group>
              </b-col>
              <b-col
                cols="12"
                :lg="objLabel.referalletter == 'true' ? 12 : 6"
                v-if="
                  objLabel.disableotherclaimreason == 'false' && myClaimInfo.claimreasonid == 'null'
                "
              >
                <b-form-group :label="objLabel.label3 + ' (Others)'">
                  <b-input
                    class="w-100 input-claim-cs input_custom"
                    :class="{'is-invalid': objError.claimreasonother.status }"
                    :placeholder="objLabel.label3 + ' (Others)'"
                    v-model="myClaimInfo.claimreasonother"
                    :disabled="isDisabledForm"
                  />
                  <b-form-invalid-feedback v-if="objError.claimreasonother.status" class="d-block">
                    {{objError.claimreasonother.error}}
                  </b-form-invalid-feedback>
                </b-form-group>
              </b-col>
              <b-col cols="12">
                <b-form-group :label="objLabel.label5">
                  <b-textarea
                    :class="{ input_disabled: isDisabledForm }"
                    v-model="myClaimInfo.remarkbyemployee"
                    placeholder="State any other information relating to your claim."
                    :disabled="isDisabledForm"
                  >
                  </b-textarea>
                </b-form-group>
              </b-col>
            </b-row>

            <b-row class="mx-0 w-100" :key="reRenderKey" v-if="['Paid'].includes(myClaimInfo.state) || myClaimInfo.remarkbyadmin != null">
              <div class="line w-100" />
              <div class="w-100 edit-claim-title col-12 claimant_title text-20 font-500 font__medium text-NTUC-1 mt-2 mb-2">{{$t('claim.Payment_Details')}}</div>
              <b-col cols="12" lg="6" v-if="['Paid'].includes(myClaimInfo.state)">
                <b-form-group label="Paid Date" class="w-100">
                  <DatetimePicker
                    :placeholder="'Select Date'"
                    :style="''"
                    :options="options"
                    :showStar="true"
                    :isFontBold="true"
                    v-model="myClaimInfo.paiddate"
                    :disabled="true"
                  />
                </b-form-group>
              </b-col>
              <b-col cols="12" lg="6" v-if="['Paid'].includes(myClaimInfo.state)">
                <b-form-group label="Reimbursement Amount">
                  <currency-input
                    class="w-100 input-claim-cs input_custom"
                    v-model="myClaimInfo.reimbursementamt"
                    :class="{input_disabled: true }"
                    :disabled="true"
                    placeholder="Please indicate"
                    :distraction-free="false"
                    :currency="null"
                    :min="0"
                    :max="null"
                    :precision="2"
                    locale="en-US"
                  />
                </b-form-group>
              </b-col>
              <b-col cols="12" v-if="myClaimInfo.remarkbyadmin != null">
                <b-form-group label="Remarks by admin">
                  <b-textarea
                    :class="{ input_disabled: isDisabledForm }"
                    v-model="myClaimInfo.remarkbyadmin"
                    placeholder="State any other information relating to your claim."
                    :disabled="true"
                  >
                  </b-textarea>
                </b-form-group>
              </b-col>
            </b-row>

            <div class="line w-100" />
            <div class="col-12">
              <div
                :class="{ upload__disabled: isDisabledForm }"
                @click="handleToggleAttachment"
                class="edit-claim-title"
              >
                Attachments
                <b-icon icon="plus-circle-fill" style="color: var(--NTUC-3)" />
              </div>
              <NonInsuranceAttachment
                :isDisable="stateArray.includes(myClaimInfo.state) || isDisabledForm"
                v-if="isShowDropzone"
                @handleFileRemove="_handleFileRemove"
                @handleFileUpload="_handleFileUpload"
                @handleTotalSize="_handleTotalSize"
                @handleDocumentType="_handleDocumentType"
              />
              <div v-else>
                <div
                  :class="{ wrapper__file__log: true, 'mt-10': index ? true : false }"
                  v-for="(file, index) in myAttachments"
                  :key="index"
                >
                  <div class="d-flex cursor_pointer">
                    <b-icon class="mr-2" icon="file-pdf-fill" width="50px" height="50px" v-if="file.name.slice(file.name.length -3,file.name.length) ==='pdf'"/>
                    <img class="mr-2" width="50px" height="50px" :src="file.url" alt="icon-file"  v-else/>
                    <div class="text__file__log d-flex align-items-center limit__text" @click.prevent="_handleOpenAttachment(file)">
                      {{ file.name || 'Attachment' }}
                    </div>
                    <img
                      v-show="!isDisabledForm"
                      @click="_handleFileRemoveOutside(file)"
                      class="icon__close__round__light"
                      src="@/assets/images/Close_round_light.png"
                      alt="input-affix"
                    />
                  </div>
                </div>
              </div>
            </div>
          </b-row>
        </div>
      </div>

      <!-- Button Group -->
      <div
        v-if="!stateArray.includes(myClaimInfo.state)"
        class="quick-log-btn d-flex justify-content-between pt-4"
        :class="{
          'justify-content-end': stateArray.includes(myClaimInfo.state)
        }"
      >
        <button
          @click="_handleDelete"
          type="button"
          class="btn btn__claim button__log"
        >
          {{ $t('delete') }}
        </button>

        <button
          :disabled="isDisabledForm"
          type="button"
          class="btn btn__claim button__log"
          :class="stateArray.includes(myClaimInfo.state) ? 'btn_disabled' : ''"
          @click="_handleSubmit"
        >
          Save
        </button>
      </div>

      <!-- RefferalLetter Dialog -->
      <RefferalLetterModal
        idModal="refferal-modal"
        :claimantid="myClaimInfo.claimantid"
        @createSuccessReferral="_createSuccessReferral"
        :key="referralKey"
      />
    </div>
    <b-modal hide-header hide-footer v-model="showModal" size="lg" content-class='modal__none border-0' title="Overflowing Content" v-if="myAttachments[0]">
      <img :src="srcShowModal" width="100%" frameborder="0" alt="src_show_modal"/>
    </b-modal>
  </div>
</template>

<script>
import Dropzone from 'nuxt-dropzone';
import { mapGetters, mapActions } from 'vuex';
import { postAxios } from '@/services/callApi';
import { postAxiosUpload } from '@/services/callApiUpload';
import RefferalLetterModal from '@/components/claim/create/refferalLetterModal.vue';
import NonInsuranceAttachment from '@/components/claim/edit/nonInsuranceAttachment.vue';

export default {
  components: {
    RefferalLetterModal,
    Dropzone,
    NonInsuranceAttachment
  },
  props: ['handleSetAlert'],
  data: () => ({
    showModal: false,
    srcShowModal:"",
    selected: 1,
    options: {
      format: 'DD-MM-YYYY',
      useCurrent: false,
    },
    isDisabledForm: true,
    objLabel: {},
    label1DataList: [],
    label3DataList: [],
    reRenderKey: 1,
    myClaimInfo: {},
    optionDropzone: {
      url: '/',
      acceptedFiles: '.jpeg,.jpg,.png,.gif,.pdf'
    },
    isShowDropzone: false,
    referralKey: 1,
    listRemoveAttachment: [],
    listUploadAttachment: [],
    listDocumentType: [],
    totalSize: 0,
    stateArray: [
      'Submitted',
      'Processing',
      'Req for Info',
      'Approved',
      'Rejected',
      'Paid',
      'Pending',
      'HR Approval',
      'Pending HR Approval',
      'HR Verification',
      'Pending Insurer'
    ],
    objError: {
      check: false,
      claimant: {error: 'Please enter Claimant Name.', status: false},
      incurreddate: {error: 'Please enter Incurred Date.', status: false},
      invoiceno: {error: 'Please enter Invoice No.', status: false},
      claimtype: {error: 'Please enter Claim Type.', status: false},
      currency: {error: 'Please enter Currency.', status: false},
      incurredamt: {error: 'Please enter Incurred Amount.', status: false},
      combinedserviceproviders: {error: 'Please select Service Provider.', status: false},
      serviceproviderother: {error: 'Please enter Service Provider Others.', status: false},
      claimreason: {error: 'Please enter Claim Reason', status: false},
      claimreasonother: {error: 'Please enter Claim Reason Others', status: false},
      isFormError: false
    },
  }),
  computed: {
    ...mapGetters('claim', [
      'listCurrency',
      'listReferral',
      'listEligibleClaimType',
      'listClaimMate',
      'myClaim',
      'myAttachments'
    ]),
    empId: () => localStorage.getItem('empid'),
    getClaimantName() {
      const claimmate = this.listClaimMate.find(e => e.id == this.myClaimInfo.claimantid);
      if (claimmate) return claimmate.name;
      return '';
    }
  },
  async fetch() {
    this.mappingDataMyClaim({ ...this.myClaim });
    this.initTotalSize([...this.myAttachments]);
    await this._getClaimsNameListing();
    await this._getRefferalListing();
    if(this.myClaimInfo.incurreddate){
      await this._getEligibleClaimType();
      await this._getCurrencyListing();
    }
    setTimeout(() => {
      this.handleSetLoading(false)
    },1000)
  },
  methods: {
    ...mapActions('claim', [
      'setListClaimMate',
      'handleListCurrency',
      'handleListReferral',
      'handleListEligibleClaimType',
      'setMyClaimEdit',
      'setMyAttachments',
      'deleteClaim',
      'handleMyAttachments',
      'handleSetLoading'
    ]),
    ...mapActions('upload', ['getNewUUID']),
    _handleDisabledForm() {
      this.isDisabledForm = !this.isDisabledForm;
      if(this.isDisabledForm){
        window.scrollTo({
          top: 0,
          behavior: 'smooth'
        });
      }
      else {
        window.scrollTo({
          top: 500,
          behavior: 'smooth'
        });
      }
    },
    async _getRelatedListing(id) {
      try {
        const res = await postAxios({
          invoke: 'System.execute',
          argc: '2',
          a0: 'ClaimType.getRelatedListing',
          a1: { id: id }
        });
        this._handleObjLabel(res);
        this._handleLabel1DataList(res);
        this._handleLabel3DataList(res);
      } catch (error) {
        console.log('_getRelatedListing', error);
      }
    },
    _handleObjLabel(res) {
      const xmlArrRes = res.data.data[0];
      let obj = {};
      if (xmlArrRes.dt != 'exception') {
        const colNames = xmlArrRes.colNames;
        const rows = xmlArrRes.rows[0] ?? [];
        colNames.forEach((ele, index) => {
          obj[ele] = rows[index];
        });
      }
      this.objError = {
        ...this.objError,
        invoiceno: {error: 'Please enter Invoice No.', status: false},
        claimtype: {error: 'Please enter Claim Type.', status: false},
        currency: {error: 'Please enter Currency.', status: false},
        incurredamt: {error: `Please enter ${obj.label2}`, status: false},
        combinedserviceproviders: {error: `Please enter ${obj.label1}`, status: false},
        serviceproviderother: {error: `Please enter ${obj.label1} Others`, status: false},
        claimreason: {error: `Please enter ${obj.label3}`, status: false},
        claimreasonother: {error: `Please enter ${obj.label3} Others`, status: false},
      }
      this.objLabel = obj;
    },
    _handleLabel1DataList(res) {
      const xmlArrRes = res.data.data[1];
      this.label1DataList = [{ id: 'null', name: 'Others' },...this.formatData(xmlArrRes)];
    },
    formatData(xmlArrRes){
      const dataList = [];
      if (xmlArrRes) {
        const colNames = xmlArrRes.colNames;
        const rows = xmlArrRes.rows ?? [];
        rows.forEach((element, index) => {
          let obj = {};
          colNames.forEach((ele, i) => {
            obj[ele] = element[i];
          });
          dataList.push(obj);
        });
      }
      return dataList;
    },
    _handleLabel3DataList(res) {
      const xmlArrRes = res.data.data[2];
      this.label3DataList = [{ id: 'null', name: 'Others' },...this.formatData(xmlArrRes)];
    },
    async _getEligibleClaimType() {
      try {
        await this.handleListEligibleClaimType({
          invoke: 'System.execute',
          argc: '2',
          a0: 'Claim.Apply.GetEligibleClaimType',
          a1: {
            employee: this.empId,
            employeedpdt: parseInt(this.myClaimInfo.claimantid)
              ? this.myClaimInfo.claimantid
              : null,
            incurreddate: this.$dayjs(this.myClaimInfo.incurreddate).format('YYYY-MM-DD'),
            accessfrom: 'web'
          }
        });
      } catch (error) {
        console.log('_getEligibleClaimType', error);
      }
    },
    async _getClaimsNameListing() {
      try {
        await this.setListClaimMate({
          invoke: 'System.execute',
          argc: '2',
          a0: 'Employee.getClaimateList',
          a1: {
            Emp: localStorage.getItem('empid')
          }
        });
      } catch (error) {
        console.log('_getClaimsNameListing', error);
      }
    },
    async _getCurrencyListing() {
      try {
        await this.handleListCurrency({
          invoke: 'System.execute',
          argc: '2',
          a0: 'InsuranceClaim.GetCurrencyListing',
          a1: {
            incurreddate: this.$dayjs(this.myClaimInfo.incurreddate).format('YYYY-MM-DD')
          }
        });
      } catch (error) {
        console.log('_getCurrencyListing', object);
      }
    },
    async _getRefferalListing() {
      try {
        await this.handleListReferral({
          invoke: 'System.execute',
          argc: '2',
          a0: 'EmployeeReferalLetter.Get',
          a1: {
            employee: this.empId,
            employeedpdt: parseInt(this.myClaimInfo.claimantid) ? this.myClaimInfo.claimantid : null
          }
        });
      } catch (error) {
        console.log('_getRefferalListing', error);
      }
    },
    async _createSuccessReferral() {
      await this._getRefferalListing();
      this.referralKey += 1;
    },
    async _changeAutocompleteClaimForm(value, field) {
      try {
        if (
          !this.listEligibleClaimType.length ||
          !this.listCurrency.length ||
          !this.listReferral.length ||
          !this.listClaimMate.length ||
          !this.label1DataList.length ||
          !this.label3DataList.length
        )
          return;
        this.myClaimInfo[field] = value;

        if (field == 'claimantid') {
          await this._getEligibleClaimType();
          await this._getRefferalListing();
          this.myClaimInfo.claimtypeid = null;
        }
      } catch (error) {
        console.log('_changeAutocompleteClaimForm', error);
      }
    },
    _formatTime(time) {
      return time ? this.$dayjs(time).format('DD MMM YYYY') : '';
    },
    _formatSubmitPayment() {
      try {
        let myClaimInfo = { ...this.myClaimInfo };
        for (const property in this.myClaimInfo) {
          if (this.myClaimInfo[property] == 'null') myClaimInfo[property] = null;
        }

        let incurreddate;
        if (myClaimInfo.incurreddate instanceof Date) {
          incurreddate = this.$dayjs(myClaimInfo.incurreddate).format('YYYY-MM-DD');
        } else {
          incurreddate = (myClaimInfo.incurreddate ?? '').split('-').reverse().join('-');
        }

        return {
          params: {
            invoiceno: myClaimInfo.invoiceno,
            employee: this.empId,
            employeedpdt: myClaimInfo.claimantid,
            currency: myClaimInfo.currencyid,
            incurredamt: myClaimInfo.incurredamt.toString(),
            referalletter: parseInt(myClaimInfo.referalletter)
              ? myClaimInfo.referalletter
              : null,
            incurreddate: incurreddate,
            serviceproviderother: myClaimInfo.serviceproviderother,
            combinedserviceproviders: myClaimInfo.combinedserviceprovidersid,
            claimreasonother: myClaimInfo.claimreasonother,
            remarkbyemployee: myClaimInfo.remarkbyemployee,
            claimtype: myClaimInfo.claimtypeid,
            claimreason: myClaimInfo.claimreasonid
          },
          referenceno: myClaimInfo.referenceno,
          claimgroup: myClaimInfo.claimgroup,
          mode: '1'
        };
      } catch (error) {
        console.log('_formatSubmitPayment', error);
      }
    },
    _formatAfterSubmit() {
      const myClaimInfo = { ...this.myClaimInfo };
      for (const property in myClaimInfo) {
        if (myClaimInfo[property] == null) {
          if (['claimreasonother', 'serviceproviderother', 'remarkbyemployee'].includes(property))
            continue;
          else this.myClaimInfo[property] = 'null';
        }
      }
    },
    async _handleSubmit() {
      try {
        window.scrollTo({ top: 0, behavior: 'smooth' });
        this.handleValidateForm();
        if(this.objError.isFormError ) return;
        if (this.totalSize == 0) {
          this.handleSetAlert({
            isShow: true,
            typeAlert: 'warning',
            textAlert:
              'You have not uploaded any attachment. The attachment is required to substantiate your claim.'
          });
          return;
        } else if (this.totalSize > 10 * 1024 * 1024) {
          this.handleSetAlert({
            isShow: true,
            typeAlert: 'warning',
            textAlert:
              'Your attachment exceeds the file limit of 10MB. Please re-size and upload again.'
          });
          return;
        }
        this.isDisabledForm = true;
        await this._handlePreSubmit();
        const a1 = this._formatSubmitPayment();
        const _payment = {
          invoke: 'System.execute',
          argc: '2',
          a0: 'API.ClaimApplied.SubmissionByReferenceNo',
          a1: a1
        };
        const res = await postAxios(_payment);

        let value = res.data.data[0].value;
        const dt = res.data.data[0].dt;
        if (dt != 'exception') {
          this.handleSetAlert({
            isShow: true,
            typeAlert: 'success',
            textAlert: 'Claim re-submitted successfully.'
          });
          value = JSON.parse(value);
          let listAttachment = [];
          value.claim_attachments.forEach(e => {
            listAttachment.push({
              name: e.name,
              url: this.formatLinkAttachment(e.url),
              deleteUrl: this.formatLinkAttachment(e.deleteUrl),
              attachmenttype: e.attachment_type_name
            });
          });
          this.setMyAttachments(listAttachment);
          this.listAttachment = listAttachment;

          await this.handleMyAttachments({
            invoke: 'System.execute',
            argc: '2',
            a0: 'API.ClaimApplied.GetClaims',
            a1: {
              id: this.$route.params.id,
              mode: '0'
            }
          });
        } else {
          this.handleSetAlert({
            isShow: true,
            typeAlert: 'error',
            textAlert: value
          });
        }
        this._formatAfterSubmit();
      } catch (error) {
        console.log('_handleSubmit', error);
      }
    },
    async _handlePreSubmit() {
      try {
        //delete file
        await this._deleteAttachment();
        //upload file
        const addedFile = await this._uploadAttachment();
        if (!addedFile.length) return;

        //pre submit
        let incurreddate;
        if (this.myClaimInfo.incurreddate instanceof Date) {
          incurreddate = this.$dayjs(this.myClaimInfo.incurreddate).format('YYYY-MM-DD');
        } else {
          incurreddate = (this.myClaimInfo.incurreddate || '').split('-').reverse().join('-');
        }

        const res = await postAxios({
          invoke: 'System.execute',
          argc: '2',
          a0: 'API.ClaimApplied.PreSubmission',
          a1: {
            id: this.myClaimInfo.claimappliedid,
            employee: this.empId,
            employeedpdt: this.myClaimInfo.claimantid,
            claimgroup: this.myClaimInfo.claimgroup,
            incurreddate: incurreddate,
            files: addedFile
          }
        });

        if (res.data.data[0].dt == 'default') {
          const xmlValue = res.data.data[0].value;
          const value = JSON.parse(xmlValue);
          this.myClaimInfo.referenceno = value.referenceNo;
        }
      } catch (error) {
        console.log('_handlePreSubmit', error);
      }
    },
    async _deleteAttachment() {
      for await (const attachment of this.listRemoveAttachment) {
        if (attachment.deleteUrl) {
          await postAxios(
            {
            "invoke": "System.execute",
            "argc": "2",
            "a0": "API.Module.DeleteAttachment",
            "a1": {
              "record_id": attachment.id,
              "mode": 0
            }
          });
        }
      }
    },
    async _uploadAttachment() {
      const addedFile = [];
      for await (const listAttachment of this.listUploadAttachment) {
        const documentType =
          this.listDocumentType[this.listUploadAttachment.indexOf(listAttachment)];
        for await (const attachment of listAttachment) {
          if (!attachment.deleteUrl) {
            const formData = new FormData();
            const resNewUUID = await this.getNewUUID();
            const newUUIDFile = `${resNewUUID}-${attachment.name}`;
            formData.append('file', attachment, newUUIDFile);
            const resAttachment = await postAxiosUpload(formData);
            if (resAttachment.status == 200) {
              const fileUpload = resAttachment.data.files[0];
              addedFile.push({
                hospitaltype: documentType.hospitaltype,
                attachmenttype: documentType.name,
                name: fileUpload.name
              });
            }
          }
        }
        return addedFile;
      }
    },
    mappingDataMyClaim(claim) {
      try {
        const combinedserviceprovidersid = parseInt(claim.combinedserviceprovidersid)
          ? claim.combinedserviceprovidersid
          : 'null';
        const claimreasonid = parseInt(claim.claimreasonid) ? claim.claimreasonid : 'null';
        const claimantid = parseInt(claim.claimantid) ? claim.claimantid : 'null';
        this.myClaimInfo = {
          ...claim,
          incurreddate: claim.incurreddate ? new Date(claim.incurreddate) : null,
          createon: claim.createon ? new Date(claim.createon) : null,
          paiddate: claim.paiddate ? new Date(claim.paiddate) : null,
          incurredamt: parseFloat(claim.incurredamt),
          combinedserviceprovidersid: combinedserviceprovidersid,
          claimreasonid: claimreasonid,
          claimantid: claimantid
        };
      } catch (error) {
        console.log('mappingDataMyClaim', error);
      }
    },
    initTotalSize(myAttachments) {
      try {
        this.totalSize = myAttachments.reduce((total, attachment) => total + attachment.size, 0);
      } catch (error) {
        console.log('initTotalSize', error);
      }
    },
    _handleFileRemoveOutside(file) {
      this.listRemoveAttachment.push(file);
      this.setMyAttachments(this.myAttachments.filter((attachment, index) => attachment != file));
    },
    _handleFileRemove(file) {
      this.listRemoveAttachment = [...file];
    },
    _handleFileUpload(listFile) {
      this.listUploadAttachment = [...listFile];
    },
    _handleTotalSize(files) {
      this.initTotalSize(files);
    },
    _handleDocumentType(listDocumentType) {
      this.listDocumentType = [...listDocumentType];
    },
    handleToggleAttachment() {
      this.isShowDropzone = !this.isShowDropzone;
    },
    formatLinkAttachment(url) {
      return process.env.IMAGE_URL + url;
    },
    async _handleDelete() {
      try {
        this.isDisabledForm = true;
        const resDelete = await this.deleteClaim({
          invoke: 'System.execute',
          argc: '2',
          a0: 'API.ClaimApplied.Delete',
          a1: {
            id: this.$route.params.id,
            mode: '0'
          }
        });

        if (resDelete) {
          this.handleSetAlert({
            isShow: true,
            typeAlert: 'success',
            textAlert: 'Claim delete successfully.'
          });
          setTimeout(() => {
            this.$router.push({ name: 'claim-claim-list' });
          }, 2000);
        } else {
          this.handleSetAlert({
            isShow: true,
            typeAlert: 'error',
            textAlert: 'Invalid claim. Please contact admin.'
          });
        }
      } catch (error) {
        this.handleSetAlert({
          isShow: true,
          typeAlert: 'error',
          textAlert: 'Invalid claim. Please contact admin.'
        });
      }
      window.scrollTo({ top: 0, behavior: 'smooth' });
    },
    _handleOpenAttachment(file) {
      if(file.name.slice(file.name.length -3,file.name.length) ==='pdf'){
        window.open(file.url);
      } else {
        this.srcShowModal = item.url
        this.showModal = true;
      }
    },
    validateForm(){
      try {
        if(this.objError.check){

          this.objError.claimant.status = !this.myClaimInfo.claimantid
          this.objError.incurreddate.status = !this.myClaimInfo.incurreddate
          this.objError.invoiceno.status = !this.myClaimInfo.invoiceno
          this.objError.claimtype.status = !this.myClaimInfo.claimtypeid
          this.objError.currency.status = !this.myClaimInfo.currencyid
          this.objError.incurredamt.status = !this.myClaimInfo.incurredamt
          this.objError.combinedserviceproviders.status = !this.myClaimInfo.combinedserviceprovidersid
          this.objError.claimreason.status = !this.myClaimInfo.claimreasonid


          if (this.myClaimInfo.combinedserviceprovidersid == 'null') {
            this.objError.serviceproviderother.status = !this.myClaimInfo.serviceproviderother
          } else this.objError.serviceproviderother.status = false


          if (this.myClaimInfo.claimreasonid == 'null') {
            this.objError.claimreasonother.status = !this.myClaimInfo.claimreasonother
          } else this.objError.claimreasonother.status = false

          this.objError.isFormError =
            this.objError.claimant.status ||
            this.objError.incurreddate.status ||
            this.objError.invoiceno.status ||
            this.objError.claimtype.status ||
            this.objError.currency.status ||
            this.objError.incurredamt.status ||
            this.objError.combinedserviceproviders.status ||
            this.objError.claimreason.status ||
            this.objError.serviceproviderother.status ||
            this.objError.claimreasonother.status
        }
        return;
      } catch (error) {
        console.log('validateForm', error);
      }
    },
    handleValidateForm(){
      this.objError.check = true;
      this.validateForm();
      if(this.objError.isFormError ){
        window.scrollTo({ top: 0, behavior: 'smooth' });
        this.handleSetAlert({
          isShow: true,
          typeAlert: 'warning',
          textAlert: "Please fill in the missing fields"
        });
      }
    },
  },
  watch: {
    async 'myClaimInfo.claimtypeid'(newVal, oldVal) {
      await this._getRelatedListing(newVal);
      const initialClaimtypeid = parseInt(this.myClaim.claimtypeid)
        ? this.myClaim.claimtypeid
        : 'null';
      if (newVal == initialClaimtypeid) return;

      let currency = null;
      if(this.listCurrency.length) {
        currency = this.listCurrency.find(e => e.name == "SGD")
        if(currency) currency = currency.id;
        else currency = this.listCurrency.first().id;
      }
      this.myClaimInfo = {
        ...this.myClaimInfo,
        claimreasonid: null,
        currencyid: currency,
        referalletter: null,
        combinedserviceprovidersid: null,
        serviceproviderother: null,
        claimreasonother: null,
        incurredamt: null,
        remarkbyemployee: null
      };
    },
    async 'myClaimInfo.claimreasonid'(newVal, oldVal) {
      console.log('claimreasonid',newVal)
    },
    isDisabledForm(value){
      if(value) this.isShowDropzone = false;
    },
    myClaimInfo: {
      handler: function (newVal, oldVal) {
        if(newVal){
          this.validateForm();
        }
      },
      deep: true
    },
  }
};
</script>

<style scoped>
@import '@/assets/css/quick-log/stepContent.css';
@import '@/assets/css/claim/create/firstClaim.css';
@import '@/assets/css/claim/create/firstDetailClaim.css';
@import '@/assets/css/selectCustom/selectCustom.css';
@import '@/assets/css/claim/create/sameRecept.css';
@import '@/assets/css/claim/edit/bodyClaim.css';
@import '@/assets/css/fileUpload/index.css';
@import '@/assets/css/my-profile/index.css';

.form-control.is-invalid {
  background-image: none;
}

input.is-invalid:focus{
  box-shadow: 0 0 0 0.2rem rgb(220 53 69 / 25%) !important;
}

input.is-invalid {
  border: 1px solid #dc3545 !important;
  border-radius: 5px !important;
}

/* :deep(input) {
  border: 1px solid #cde !important;
  border-radius: 3px !important;
} */
.is-invalid:has(input):deep(input){
  border: 1px solid #dc3545 !important;
  border-radius: 5px !important;
}

.is-invalid:has(input):deep(input):focus{
  box-shadow: 0 0 0 0.2rem rgb(220 53 69 / 25%) !important;
}

.input-claim-cs {
  height: 40px;
}

.claimant_title {
  letter-spacing: 0.5px;
}

.btn_disabled {
  background: rgb(168, 175, 181);
  pointer-events: none;
}

.btn__claim {
  padding: 9px 66px;
  background: var(--NTUC-3);
  color: #fff;
  border-radius: 4.8px;
}

::v-deep .dropdown__log .dropzone .dz-message {
  margin: 0;
}
::v-deep .dropdown__log .vue-dropzone {
  background: transparent;
  height: 150px;
  width: 150px;
  border: 1px dashed var(--NTUC-3);
  position: relative;
  border-radius: 10px;
  padding: 20px 15px;
}

input {
  margin: 0;
}
::v-deep .bg--gray .dropdown__log .vue-dropzone {
  background-color: #f6f8f9;
}

::v-deep .dropdown__log .dropzone .dz-preview {
  display: none;
}

::v-deep .dropdown__log .dropzone.dz-started .dz-message {
  display: block;
}

.btn__claim:disabled {
  padding: 9px 66px;
  background: #a8afb5;
  color: #fff;
  cursor: not-allowed;
}
</style>
<style>
.modal__none{
  background: none;
}
</style>
