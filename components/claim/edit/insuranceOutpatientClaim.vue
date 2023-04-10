<template>
  <div class="">
    <div class="wrapper__content__quick__log w-100 detail-claim-containter">
      <div class="wrapper__content">
        <div class="wrapper_checkbox_log__supp wrapper_checkbox_quick_log mb-4 mt-4">
          <b-row class="body__quick__log">
            <div class="question__quick__log mb-0 d-flex align-items-center w-100">
              <div class="question__title">Claimant Details</div>
              <button
                class="btn__edit border-0 d-flex justify-content-center align-items-center"
                v-if="myClaimInfo.state === 'Pending Verification' || myClaimInfo.state ==='Pending Submission'"
                @click="editClick"
              >
                <b-icon icon="pencil-fill" color="#212529" />
              </button>
            </div>
            <b-col cols="12" lg="6">
              <b-form-group id="input-group-1" label="Ref No" label-for="input-1">
                <b-input
                  class="w-100 input-claim-cs"
                  :placeholder="'Ref No'"
                  :value="myClaimInfo.referenceno"
                  disabled
                />
              </b-form-group>
            </b-col>
            <b-col cols="12" lg="6">
              <b-form-group label="Submitted On">
                <div :class="{ 'position-relative': true }">
                  <date-picker
                    class="input__custom w-100"
                    v-model="myClaimInfo.createon"
                    name="date"
                    disabled
                    :config="options"
                  />
                  <img
                    class="icon__date__picker"
                    src="@/assets/images/icon-date-picker.png"
                    alt="icon-date-picker"
                  />
                  </div>
              </b-form-group>
            </b-col>
            <b-col class="d-flex w-100" cols="12" lg="6">
              <b-form-group
                class="mr-4 input__status"
                id="input-group-1"
                label="Status"
                label-for="input-1"
              >
                <b-input
                  class="w-100 input-claim-cs"
                  :placeholder="'Status'"
                  :value="myClaimInfo.state"
                  disabled
                />
              </b-form-group>
              <div class="d-flex align-items-center">
                <img
                  v-if="myClaimInfo.status == 'Rejected' || myClaimInfo.state == 'Rejected'"
                  width="36px"
                  height="36px"
                  src="@/assets/images/icon-uncomfortable.png"
                  alt="icon-uncomfortable"
                />
                <img
                  v-else-if="
                    myClaimInfo.status == 'Approved' ||
                    myClaimInfo.status == 'Paid' ||
                    myClaimInfo.state == 'Approved' ||
                    myClaimInfo.state == 'Paid'
                  "
                  width="36px"
                  height="36px"
                  src="@/assets/images/icon-like.png"
                  alt="icon-uncomfortable"
                />
                <img
                  v-else
                  width="36px"
                  height="36px"
                  src="@/assets/images/icon-question.png"
                  alt="icon-uncomfortable"
                />
              </div>
            </b-col>
            <b-col cols="12" lg="6">
              <b-form-group id="input-group-1" label="Employee Name" label-for="input-1">
                <b-input
                  class="w-100 input-claim-cs"
                  :placeholder="'Employee Name'"
                  :value="myClaimInfo.employee"
                  disabled
                />
              </b-form-group>
            </b-col>
            <b-col cols="12" lg="6">
              <b-form-group id="input-group-1" label="Claimant Name" label-for="input-1">
                <Autocomplete
                  :placeholder="'Please select'"
                  :value="myClaimInfo.claimant"
                  :displayAttribute="'name'"
                  :valueAttribute="'id'"
                  :optionDropdowns="listClaimsName"
                  :filter="true"
                  :isDisabled="isDisabled"
                  :isHeight50="true"
                  :isError="objError.claimant.status"
                  @changeValue="value => (this.myClaimInfo.claimant = value)"
                />
                 <b-form-invalid-feedback v-if="objError.claimant.status" class="d-block">
                    {{ objError.claimant.error }}
                  </b-form-invalid-feedback>
              </b-form-group>
            </b-col>
            <b-col cols="12" lg="6" class="d-flex col-custome">
              <b-form-group label="Invoice No" class="w-100">
                <b-input
                  class="w-100 input-claim-cs"
                  :placeholder="'Invoice no'"
                  v-model="myClaimInfo.invoiceno"
                  :disabled="isDisabled"
                  :class="{border_error: objError.invoiceno.status }"
                />
                <b-form-invalid-feedback v-if="objError.invoiceno.status" class="d-block">
                    {{ objError.invoiceno.error }}
                  </b-form-invalid-feedback>
              </b-form-group>
            </b-col>
            <b-col cols="12" lg="6">
              <b-form-group id="input-group-1" label="Claim Type" label-for="input-1">
                <Autocomplete
                  :placeholder="'Please select'"
                  :value="myClaimInfo.claimtypeid"
                  :displayAttribute="'name'"
                  :valueAttribute="'id'"
                  :optionDropdowns="listClaimType"
                  :filter="true"
                  :isDisabled="isDisabled"
                  :isHeight50="true"
                  :isError="objError.claimtypeid.status"
                  @changeValue="value => (this.myClaimInfo.claimtypeid = value)"
                />
                <b-form-invalid-feedback v-if="objError.claimtypeid.status" class="d-block">
                    {{ objError.claimtypeid.error }}
                  </b-form-invalid-feedback>
              </b-form-group>
            </b-col>
            <b-row class="mx-0 body__quick__log w-100">
              <div class="line w-100" />
              <div class="w-100 edit-claim-title col-12">{{ $t('claim.Claim_detail') }}</div>
              <b-col cols="12" lg="6" class="d-flex col-custome" v-if="objLabel.label3">
                <b-form-group
                  id="input-group-1"
                  label="Currency"
                  label-for="input-1"
                  :class="{ input__disabled: isDisabled, is_mobile_check: true }"
                >
                  <Autocomplete
                    :placeholder="'Currency'"
                    :displayAttribute="'name'"
                    :valueAttribute="'id'"
                    :value="isClaimCurrencyId ? myClaimInfo.currencyid : myClaim.currencyid"
                    :optionDropdowns="listCurrency"
                    :filter="true"
                    :isDisabled="isDisabled"
                    :isCurrency="true"
                    :isHeight50="true"
                    :isError="objError.currencyid.status"
                    @changeValue="value => getValueCurrency(value)"
                  />
                  <b-form-invalid-feedback v-if="objError.currencyid.status" class="d-block">
                    {{ objError.currencyid.error }}
                  </b-form-invalid-feedback>
                </b-form-group>
                <b-form-group
                  class="w-75 is_mobile_check"
                  id="input-group-1"
                  :label="objLabel.label3"
                  label-for="input-1"
                  v-if="objLabel.label3"
                >
                  <currency-input
                    class="w-100"
                    :value="isHandleIncurrentdAmt ? myClaimInfo.incurredamt : myClaim.incurredamt"
                    :class="{ input__custom: true, input_disabled: isDisabled, border_error: objError.incurredamt.status }"
                    :disabled="isDisabled"
                    placeholder="Please indicate"
                    :distraction-free="false"
                    :currency="null"
                    :min="0"
                    :precision="2"
                    locale="en-US"
                    @input="getIncurrendamt"
                  />
                  <b-form-invalid-feedback v-if="objError.incurredamt.status" class="d-block">
                    {{ objError.incurredamt.error }}
                  </b-form-invalid-feedback>
                </b-form-group>
              </b-col>
              <b-col cols="12" lg="6" v-if="objLabel.label6">
                <b-form-group id="input-group-1" :label="objLabel.label6" label-for="input-1">
                  <Autocomplete
                    :placeholder="'Please select'"
                    :value="myClaimInfo.combinedserviceprovidersid"
                    :displayAttribute="'name'"
                    :valueAttribute="'id'"
                    :optionDropdowns="label6DataList"
                    :filter="true"
                    :isDisabled="isDisabled"
                    :isHeight50="true"
                    :isError="objError.combinedserviceprovidersid.status"
                    @changeValue="value => getServiceProvide(value)"
                  />
                  <b-form-invalid-feedback v-if="objError.combinedserviceprovidersid.status" class="d-block">
                    {{ objError.combinedserviceprovidersid.error }}
                  </b-form-invalid-feedback>
                </b-form-group>
              </b-col>
              <b-col cols="12" lg="6" v-if="myClaimInfo.combinedserviceprovidersid == 'null' && objLabel.disableotherserviceprovider == '0'">
                <b-form-group
                  id="input-group-1"
                  label="Service Provider (Other) "
                  label-for="input-1"

                >
                  <b-input class="w-100 input-claim-cs" :placeholder="'Service Provider (Other)'" :disabled="isDisabled" v-model="myClaimInfo.serviceproviderother" />
                </b-form-group>
              </b-col>
              <b-col
                cols="12"
                lg="6"
                class="d-flex col-custome"
                v-if="objLabel.label8 && objLabel.referralletter == 'true'"
              >
                <b-form-group
                  id="input-group-1"
                  :label="objLabel.label8"
                  label-for="input-1"
                  class="w-100"
                >
                  <div class="d-flex flex-row align-items-start">
                    <Autocomplete
                      class="referral-input w-100"
                      :placeholder="'Please select'"
                      :value="myClaimInfo.referalletter"
                      :displayAttribute="'label'"
                      :valueAttribute="'id'"
                      :optionDropdowns="listReferral"
                      :filter="true"
                      :isHeight50="true"
                      :isDisabled="isDisabled"
                      @changeValue="value => (this.myClaimInfo.referalletter = value)"
                    />
                    <button class="referral-btn" v-b-modal.refferal-modal>
                      <b-icon-box-arrow-in-up-right />Referral
                    </button>
                  </div>
                </b-form-group>
              </b-col>

              <b-col cols="12" lg="6"  v-if="objLabel.label9">
                <b-form-group id="input-group-1" :label="objLabel.label9" label-for="input-1">
                  <Autocomplete
                    :placeholder="'Please select'"
                    :value="
                      isHandlePolicyclaimtypeclaimreasonid
                        ? myClaimInfo.policyclaimtypeclaimreasonid
                        : myClaim.policyclaimtypeclaimreasonid
                    "
                    :displayAttribute="'name'"
                    :valueAttribute="'id'"
                    :optionDropdowns="label9DataList"
                    :filter="true"
                    :isDisabled="isDisabled"
                    :isHeight50="true"
                    :isError="objError.policyclaimtypeclaimreasonid.status"
                    @changeValue="value => getPolicyDignois(value)"
                  />
                  <b-form-invalid-feedback v-if="objError.policyclaimtypeclaimreasonid.status" class="d-block">
                    {{ objError.policyclaimtypeclaimreasonid.error }}
                  </b-form-invalid-feedback>
                </b-form-group>
              </b-col>
              <b-col cols="12" lg="6" v-if="myClaimInfo.policyclaimtypeclaimreasonid == 'null' && objLabel.disableotherclaimreason == '0'">
                <b-form-group
                  id="input-group-1"
                  :label="objLabel.label9 + ' (Other)'"
                  label-for="input-1"
                >
                  <b-input class="w-100 input-claim-cs" :placeholder="objLabel.label9 + ' (Other)'" :disabled="isDisabled" v-model="myClaimInfo.claimreasonother" />
                </b-form-group>
              </b-col>
              <b-col cols="12" v-if="objLabel.label7 ">
                <b-form-group
                  id="input-group-1"
                  :label="objLabel.label7"
                  label-for="input-1"
                  :class="{ input__disabled: isDisabled }"
                >
                  <b-textarea
                    :value="myClaimInfo.remarkbyemployee || myClaim.remarkbyemployee"
                    :rows="3"
                    max-rows="6"
                    placeholder="State any other information relating to your claim."
                    :disabled="isDisabled"
                    @change="value => (myClaimInfo.remarkbyemployee = value)"
                  >
                  </b-textarea>
                </b-form-group>
              </b-col>
            </b-row>

            <b-row
              class="mx-0 body__quick__log w-100"
              v-if="['Paid'].includes(myClaim.state) || myClaim.remarkbyadmin != null"
            >
              <div class="line w-100" />
              <div class="w-100 edit-claim-title col-12">Payment Details</div>
              <b-col cols="12" lg="6" v-if="['Paid'].includes(myClaimInfo.state)">
                <b-form-group label="Paid Date" class="w-100">
                  <div :class="{ 'position-relative': true }">
                    <date-picker
                      class="input__custom w-100"
                      v-model="myClaimInfo.paiddate"
                      placeholder="Select Date"
                      name="date"
                      :disabled="true"
                      :config="options"
                    />
                    <img
                      class="icon__date__picker"
                      src="@/assets/images/icon-date-picker.png"
                      alt="icon-date-picker"
                    />
                  </div>
                </b-form-group>
              </b-col>
              <b-col cols="12" lg="6" v-if="['Paid'].includes(myClaimInfo.state)">
                <b-form-group label="Reimbursement Amount">
                  <currency-input
                    class="w-100"
                    v-model="myClaimInfo.reimbursementamt"
                    :class="{ input__custom: true, input_disabled: true }"
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
              <b-col cols="12" v-if="myClaimInfo.remarkbyadmin">
                <b-form-group label="Remarks by admin">
                  <b-textarea
                    :class="{ input_disabled: isDisabled }"
                    v-model="myClaimInfo.remarkbyadmin"
                    placeholder="State any other information relating to your claim."
                    :disabled="true"
                  >
                  </b-textarea>
                </b-form-group>
              </b-col>
            </b-row>

            <div class="line w-100" />
            <div>
              <div class="edit-claim-title">
                Attachments
                <b-icon @click="_openUploadFile" icon="plus-circle-fill" class="text-NTUC-3" />
              </div>
              <NonInsuranceAttachment
                v-if="isShowDropzone"
                @handleFileRemove="_handleFileRemove"
                @handleFileUpload="_handleFileUpload"
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
                    <div class="text__file__log d-flex align-items-center limit__text" @click="_handleOpenAttachment(file)">
                      {{ file.name || 'Attachment' }}
                    </div>
                    <img
                      v-show="!isDisabled"
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
        class="quick-log-btn d-flex justify-content-between pt-4"
        v-if="myClaimInfo.state === 'Pending Verification' || myClaimInfo.state ==='Pending Submission'"
      >
        <button
          type="button"
          class="btn btn__claim button__log"
          @click="_handleDelete"
        >
          {{ $t('delete') }}
        </button>
        <button
          :disabled="isDisabled"
          type="button"
          class="btn btn__claim button__log"
          @click="_editClaim"
        >
          Save
        </button>
      </div>
      <RefferalLetterModal
        idModal="refferal-modal"
        :claimantid="myClaimInfo.claimantid"
        @createSuccessReferral="_getRefferalListing"
      />
      <b-modal hide-header hide-footer v-model="showModal" size="lg" content-class='modal__none border-0' title="Overflowing Content" v-if="myAttachments[0]">
        <img :src="srcShowModal" width="100%" frameborder="0" alt="src-ShowModal"/>
      </b-modal>
    </div>
  </div>
</template>

<script>
  import { mapGetters, mapActions } from 'vuex';
  import { postAxios } from '@/services/callApi';
  import { handleListCallApi } from '@/utils/functions/handleListCallApi';
  import { postAxiosUpload } from '@/services/callApiUpload';
  import NonInsuranceAttachment from '@/components/claim/edit/nonInsuranceAttachment.vue';
  import RefferalLetterModal from '@/components/claim/create/refferalLetterModal.vue';

  export default {
    components: {
      RefferalLetterModal,
      NonInsuranceAttachment
    },
    props: ['myClaim', 'handleSetAlert'],
    data: () => ({
      showModal: false,
      srcShowModal:"",
      isHandlePolicyclaimtypeclaimreasonid: false,
      isHandleIncurrentdAmt: false,
      isClaimCurrencyId: false,
      selected: 1,
      options: {
        format: 'DD-MM-YYYY',
        useCurrent: false
      },
      isShowDropzone: false,
      isDisabled: true,
      isChangeValue: true,
      myClaimInfo: {
        currencyid: null
      },
      logTem: {
        state: '',
        estimatedcostofsurgery: '',
        referenceno: '',
        files: [{}, {}]
      },
      objError: {
      check: false,
      claimant: { error: 'Please enter Claimant Name.', status: false },
      incurreddate: { error: 'Please enter Admission Date.', status: false },
      invoiceno: { error: 'Please enter Invoice No.', status: false },
      claimtypeid: { error: 'Please enter Claim Type.', status: false },
      currencyid: { error: 'Please enter Currency.', status: false },
      incurredamt: { error: 'Please enter Incurred Amount.', status: false },
      combinedserviceprovidersid : { error: 'Please enter Service Provider.', status: false },
      policyclaimtypeclaimreasonid : { error: 'Please select Diagnosis (Pls select from list).', status: false },

      isFormError: false
    },
      objLabel: {},
      label8DataList: [],
      listClaimType: [],
      listClaimsName: [],
      listHospital: [],
      label6DataList: [],
      label9DataList: [],
      listFile: [],
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
        'Pending Submission',
        'HR Verification',
        'Pending Insurer'
      ],
      listRemoveAttachment: [],
      listUploadAttachment: [],
      listDocumentType: []
    }),
    computed: {
      ...mapGetters('claim', ['listReferral', 'myAttachments','listCurrency']),
      empId: () => localStorage.getItem('empid')
    },
    mounted() {
      this.myClaimInfo.incurredamt = this.myClaim.incurredamt;
      this.myClaimInfo.policyclaimtypeclaimreasonid = this.myClaim.policyclaimtypeclaimreasonid;
      this.myClaimInfo.currencyid = this.myClaim.currencyid;

    },
    async fetch() {
      await this.getListFile();
      await this.getList('API.CS.GetClaimTypesList', { claimgroup: 2 }, 'ClaimType');
      await this.getList(
        'Employee.getClaimateList',
        { Emp: localStorage.getItem('empid') },
        'ClaimName'
      );
      await this.getList('API.Autocomplete.Select', { module: '5' }, 'Currency');
      await this.getList('API.Autocomplete.Select', { module: '13' }, 'Hospital');
      await this._getRefferalListing();
      await this.handleListCurrency({
        invoke: 'System.execute',
        argc: '2',
        a0: 'InsuranceClaim.GetCurrencyListing',
        a1: {
          incurreddate: this.myClaim.incurreddate
        }
      });
      if (this.myClaim) this.handleSetLoading(false)
      this.myClaimInfo.policyclaimtypeclaimreasonid == null ? this.myClaimInfo.policyclaimtypeclaimreasonid = 'null' : this.myClaimInfo.policyclaimtypeclaimreasonid
  },
    methods: {
      ...mapActions('claim', [
        'handleListReferral',
        'setFileAttachment',
        'deleteClaim',
        'handleListCurrency',
        'setMyAttachments',
        'handleMyAttachments',
        'handleSetLoading'
      ]),
      ...mapActions('upload', ['getNewUUID']),
      validateForm() {
      try {
        if (this.objError.check) {
          this.objError.claimant.status = !this.myClaimInfo.claimant;
          this.objError.invoiceno.status = !this.myClaimInfo.invoiceno;
          this.objError.claimtypeid.status = !this.myClaimInfo.claimtypeid;
          this.objError.currencyid.status = this.isClaimCurrencyId ? !this.myClaimInfo.currencyid : !this.myClaim.currencyid;
          this.objError.incurredamt.status = this.isHandleIncurrentdAmt ? !this.myClaimInfo.incurredamt : !this.myClaim.incurredamt;
          this.objError.policyclaimtypeclaimreasonid.status    = this.isHandlePolicyclaimtypeclaimreasonid ?  !this.myClaimInfo.policyclaimtypeclaimreasonid : !this.myClaim.policyclaimtypeclaimreasonid
          this.objError.combinedserviceprovidersid.status = !this.myClaimInfo.combinedserviceprovidersid

          this.objError.isFormError =
            this.objError.claimant.status ||
            this.objError.invoiceno.status ||
            this.objError.claimtypeid.status ||
            this.objError.currencyid.status ||
            this.objError.combinedserviceprovidersid.status ||
            this.objError.policyclaimtypeclaimreasonid.status
        }
        return;
      } catch (error) {
        console.log('validateForm', error);
      }
    },
    handleValidateForm() {
      this.objError.check = true;
      this.validateForm();
    },
      getPolicyDignois(val) {
        this.isHandlePolicyclaimtypeclaimreasonid = true;
        if (this.isHandlePolicyclaimtypeclaimreasonid) {
          this.myClaimInfo.policyclaimtypeclaimreasonid = val;
        }
        if (val == 'null') {
          this.myClaimInfo.claimreasonother = ''
        }
      },
      getServiceProvide(val) {
        this.myClaimInfo.combinedserviceprovidersid = val
        if (val == 'null') {
          this.myClaimInfo.serviceproviderother = ''
        }
      },
      getValueCurrency(val) {
        this.isClaimCurrencyId = true;
        if(val == this.myClaimInfo.currencyid){
          return
        }
        this.myClaimInfo.currencyid = val;
      },
      getIncurrendamt(val) {
        this.isHandleIncurrentdAmt = true;
        if (this.isHandleIncurrentdAmt) {
          this.myClaimInfo.incurredamt = val;
        }
      },
      async _handleDelete() {
        try {
          this.isDisabled = true;
          const resDelete = await this.deleteClaim({
            invoke: 'System.execute',
            argc: '2',
            a0: 'API.ClaimApplied.Delete',
            a1: {
              id: this.$route.params.id,
              mode: '1'
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
      _addAttachment() {
        this.$refs.uploadFile.click();
      },
      _handleFileRemove(file) {
        this.listRemoveAttachment = [...file];
      },
      _handleFileUpload(listFile) {
        this.listUploadAttachment = [...listFile];
      },
      _handleDocumentType(listDocumentType) {
        this.listDocumentType = [...listDocumentType];
      },
      _openUploadFile() {
        if (this.isDisabled) return;
        this.isShowDropzone = !this.isShowDropzone;
      },
      async getListFile() {
        const reponseFile = await postAxios({
          invoke: 'System.execute',
          argc: '2',
          a0: 'InsuranceClaim.getClaimDetail',
          a1: {
            claimappliedid: this.$route.params.id,
            attachments: '1'
          }
        });
        const xmlArrAttachments = reponseFile.data.data[1];
        this.listFile = JSON.parse(xmlArrAttachments.value);
      },
      async uploadImage(e) {
        const files = e.target.files;
        files.forEach(async file => {
          const formData = new FormData();
          formData.append('file', file);
          const res = await postAxiosUpload(formData);
          if (res.status == 200) {
            const fileUpload = res.data.files[0];
            this.listFile.push(fileUpload);
          }
        });
      },
      async _editClaim() {
        this.handleValidateForm();
      if (this.objError.isFormError) {
        window.scrollTo({ top: 0, behavior: 'smooth' });
        return;
      }
        this.isDisabled = true;
        let incurreddate;
        if(this.myClaimInfo.incurreddate instanceof Date) {
          incurreddate = this.$dayjs(this.myClaimInfo.incurreddate).format('YYYY-MM-DD')
        } else {
          incurreddate = this.myClaimInfo.incurreddate ? this.myClaimInfo.incurreddate.split('-').reverse().join('-') : this.myClaimInfo.incurreddate
        }
        await this._handlePreSubmit();
        const res = await postAxios({
          invoke: 'System.execute',
          argc: '2',
          a0: 'API.ClaimApplied.SubmissionByReferenceNo',
          a1: {
            mode: '1',
            params: {
              employee: this.myClaimInfo.employeeid,
              employeedpdt: this.myClaimInfo.claimantid,
              combinedserviceproviders: this.myClaimInfo.combinedserviceprovidersid == 'null' ? null : this.myClaimInfo.combinedserviceprovidersid,
              currency: this.myClaimInfo.currencyid || this.myClaim.currencyid,
              incurredamt: this.myClaimInfo.incurredamt,
              referalletter: this.myClaimInfo.referalletter,
              invoiceno: this.myClaimInfo.invoiceno,
              incurreddate: incurreddate,
              hasreceipt: this.myClaimInfo.hasreceipt,
              serviceproviderother:  this.objLabel.disableotherserviceprovider == '1' ? '' : this.myClaimInfo.serviceproviderother ,
              claimreasonother: this.myClaimInfo.claimreasonother,
              remarkbyemployee: this.myClaimInfo.remarkbyemployee,
              policyclaimtype: this.myClaimInfo.claimtypeid,
              policyclaimtypeclaimreason: this.myClaimInfo.policyclaimtypeclaimreasonid == 'null' ? null : this.myClaimInfo.policyclaimtypeclaimreasonid  || this.myClaim.policyclaimtypeclaimreasonid
            },
            referenceno: this.myClaimInfo.referenceno,
            claimgroup: '2'
          }
        });
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
              mode: '1'
            }
          });
        } else {
          const responseError = await postAxios({
              invoke: 'System.execute',
              argc: '2',
              a0: 'API.Broker.Get'
            });
            const messageErrorValue = JSON.parse(responseError.data.data[0].value);
            this.handleSetAlert({
              isShow: true,
              typeAlert: 'error',
              textAlert: `Your LOG could not be submitted at this time. Please contact <a style="color: #000000" href="tel: ${messageErrorValue.contactnumber}">${messageErrorValue.contactnumber}</a> or email us at <a style="color: #000000" href="mailto: ${messageErrorValue.email}">${messageErrorValue.email}</a> if you require urgent assistance. `
            });
        }
      },
      async _getRelatedListing(id) {
        const res = await postAxios({
          invoke: 'System.execute',
          argc: '2',
          a0: 'InsuranceClaimType.getRelatedListing',
          a1: { id: id }
        });
        this._handleObjLabel(res);
        this._handleLabel6DataList(res);
        this._handleLabel8DataList(res);
        this._handleLabel9DataList(res);
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
        this.objLabel = obj;
        setTimeout(()=>{
          this.myClaimInfo.currencyid = '3';
        },200)
      },
      _handleLabel6DataList(res) {
        const xmlArrRes = res.data.data[1];
        this.label6DataList = [];
        if (this.objLabel.disableotherserviceprovider == '0') {
          const data  = handleListCallApi([...xmlArrRes.colNames], [...xmlArrRes.rows]);
          this.label6DataList = [...data,{ id: 'null', name: 'Other' }];
        } else if (xmlArrRes) {
          const data  = handleListCallApi([...xmlArrRes.colNames], [...xmlArrRes.rows]);
          this.label6DataList = [...data]
        }
      },
      _handleLabel8DataList(res) {
        const xmlArrRes = res.data.data[3];
        this.label8DataList = [];
        if (xmlArrRes) {
          this.label8DataList = handleListCallApi([...xmlArrRes.colNames], [...xmlArrRes.rows]);
        }
      },
      _handleLabel9DataList(res) {
        const xmlArrRes = res.data.data[2];
        this.label9DataList = [];
        if (this.objLabel.disableotherclaimreason == '0') {
          const data = handleListCallApi([...xmlArrRes.colNames], [...xmlArrRes.rows]);
          this.label9DataList = [...data, {id: 'null', name: "Other" }]
        } else if (xmlArrRes) {
          this.label9DataList = handleListCallApi([...xmlArrRes.colNames], [...xmlArrRes.rows]);
        }
      },
      _handleRemoveFile(index) {
        this.listFile.splice(index, 1);
      },
      async handleClaimTpe(val) {
        await postAxios({
          invoke: 'System.execute',
          argc: '2',
          a0: 'InsuranceClaimType.getListing',
          a1: {
            employee: this.empId,
            employeedpdt: '',
            incurreddate: this.createClaimStepInfor.dateCreate,
            accessfrom: 'web'
          }
        });
      },
      mappingDataMyClaim(claim) {
        this.myClaimInfo = {
          ...claim
        };
      },
      async _getRefferalListing() {
        try {
          await this.handleListReferral({
            invoke: 'System.execute',
            argc: '2',
            a0: 'EmployeeReferalLetter.Get',
            a1: {
              employee: this.empId,
              employeedpdt: parseInt(this.myClaimInfo.claimant) ? this.myClaimInfo.claimant : null
            }
          });
        } catch (error) {
          console.log('_getRefferalListing', error);
        }
      },
      async getList(a0, a1, list) {
        let res = await postAxios({
          invoke: 'System.execute',
          argc: '2',
          a0: a0,
          a1: {
            ...a1
          }
        });
        switch (list) {
          case 'ClaimType': {
            this.listClaimType = handleListCallApi(
              [...res.data.data[0].colNames],
              [...res.data.data[0].rows]
            );
            break;
          }
          case 'ClaimName': {
            this.listClaimsName = [
              ...handleListCallApi([...res.data.data[0].colNames], [...res.data.data[0].rows]),
              { id: '0', name: 'Self' }
            ];
            break;
          }
          case 'Hospital': {
            this.listHospital = handleListCallApi(
              [...res.data.data[0].colNames],
              [...res.data.data[0].rows]
            );
            break;
          }
        }
      },
      _formatTime(time) {
        return time ? this.$dayjs(time).format('DD MMM YYYY') : '';
      },
      async _changeAutocompleteClaimForm(value, field) {
        try {
          if (!this.listCurrency.length) return;

          this.myClaimInfo[field] = value;
        } catch (error) {
          console.log('_changeAutocompleteClaimForm', error);
        }
      },
      async _handlePreSubmit() {
        try {
          //delete file
          await this._deleteAttachment();
          //upload file
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
                    hospitaltype: documentType.hospitaltype || '',
                    attachmenttype: documentType.name,
                    name: fileUpload.name
                  });
                }
              }
            }
          }
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
              employeedpdt: this.myClaimInfo.claimant,
              claimgroup: 2,
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
                "mode": 1
              }
            });
          }
        }
      },
      _handleOpenAttachment(file) {
        if(file.name.slice(file.name.length -3,file.name.length) ==='pdf'){
          window.open(file.url);
        } else {
          this.srcShowModal = item.url
          this.showModal = true;
        }
      },
      _handleFileRemoveOutside(file){
        this.listRemoveAttachment.push(file);
        this.setMyAttachments(this.myAttachments.filter((attachment, index) => attachment != file));
      },
      formatLinkAttachment(url) {
        return process.env.IMAGE_URL + url;
      },
      editClick(){
        this.isDisabled = !this.isDisabled
        if(this.isDisabled){
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
      }
    },
    watch: {
      myClaim: function () {
        this.myClaimInfo = JSON.parse(JSON.stringify(this.myClaim));
        this.myClaimInfo.combinedserviceprovidersid == null ? this.myClaimInfo.combinedserviceprovidersid = 'null' : this.myClaimInfo.combinedserviceprovidersid
        this.myClaimInfo.createon = new Date(this.myClaimInfo.createon)
        this.myClaimInfo.incurreddate = new Date(this.myClaimInfo.incurreddate);
        this.myClaimInfo.paiddate = new Date(this.myClaimInfo.paiddate);
        this.myClaimInfo.incurredamt = parseInt(this.myClaimInfo.incurredamt);
        this.myClaimInfo.reimbursementamt = parseFloat(this.myClaim.reimbursementamt);
      },
      'myClaimInfo.claimant'() {
        if (this.isChangeValue) return;
        this.myClaimInfo.claimtypeid = '';
      },
      'myClaimInfo.claimtypeid'(newVal, oldVal) {
        this._getRelatedListing(newVal);
        this.isChangeValue = this.isChangeValue ? false : this.isChangeValue;
        this.myClaimInfo.incurredamt = null;
        this.myClaimInfo.referalletter = '';
        this.myClaimInfo.policyclaimtypeclaimreasonid = '';
        this.myClaimInfo.remarkbyemployee = '';
      },
      isDisabled(value) {
        if (value) this.isShowDropzone = false;
      }
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
  .is_mobile_check {
    width: 100% !important;
  }

  .input-claim-cs {
    height: 50px;
  }
  .border_error{
    border-color: red;
  }
</style>
<style>
.modal__none{
  background: none;
}
</style>
