<template>
  <div class="nonInsuranceClaim">
    <div class="wrapper__content__quick__log w-100 detail-claim-containter">
      <div class="wrapper__content">
        <div class="wrapper_checkbox_log__supp wrapper_checkbox_quick_log mb-4 mt-4">
          <b-row class="body__quick__log">
            <div class="question__quick__log mb-0 d-flex align-items-center w-100">
              <div class="question__title" style="color: #000">Claimant Details</div>
              <button
                v-if="!['Rejected', 'Approved', 'Paid', 'HR Approval'].includes(myClaimInfo.state)"
                class="btn__edit border-0 d-flex justify-content-center align-items-center"
                @click="_handleDisabledForm"
              >
                <b-icon icon="pencil-fill" color="#212529" />
              </button>
            </div>
            <b-col cols="12" lg="6">
              <b-form-group label="Ref No">
                <b-input
                  class="w-100 input-claim-cs"
                  :placeholder="'Ref No'"
                  :value="myClaimInfo.referenceno"
                  disabled
                />
              </b-form-group>
            </b-col>
            <b-col class="d-flex w-100" cols="12" lg="6">
              <b-form-group class="mr-4 input__status" label="Status">
                <b-input
                  v-if="myClaimInfo.state == 'Rejected'"
                  class="w-100 input-claim-cs status-rejected"
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
                  class="w-100 input-claim-cs status-approved"
                  :placeholder="'Status'"
                  :value="myClaimInfo.state"
                  disabled
                />
                <b-input
                  v-else
                  class="w-100 input-claim-cs status-default"
                  :placeholder="'Status'"
                  :value="myClaimInfo.state"
                  disabled
                />
              </b-form-group>
              <div class="d-flex align-items-center">
                <img
                  v-if="myClaimInfo.state == 'Rejected'"
                  width="36px"
                  height="36px"
                  src="@/assets/images/icon-uncomfortable.png"
                  alt="icon-uncomfortable"
                />
                <img
                  v-else-if="
                    myClaimInfo.state == 'Approved' ||
                    myClaimInfo.state == 'Paid' ||
                    myClaimInfo.state == 'HR Approval'
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
              <b-form-group label="Employee Name">
                <b-input
                  class="w-100 input-claim-cs"
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
                  :value="myClaimInfo.claimantid"
                  :displayAttribute="'name'"
                  :valueAttribute="'id'"
                  :optionDropdowns="listClaimMate"
                  :filter="true"
                  :isDisabled="isDisabledForm"
                  :isHeight50="true"
                  @changeValue="value => _changeAutocompleteClaimForm(value, 'claimantid')"
                />
              </b-form-group>
            </b-col>
            <b-col cols="12" lg="6">
              <b-form-group label="Incurred Date">
                <div :class="{ 'position-relative': true }">
                  <date-picker
                    class="input__custom w-100"
                    v-model="myClaimInfo.incurreddate"
                    placeholder="Select Date"
                    name="date"
                    :disabled="isDisabledForm"
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
            <b-col cols="12" lg="6">
              <b-form-group label="Claim Type">
                <Autocomplete
                  :placeholder="'Please select'"
                  :value="myClaimInfo.claimtypeid"
                  :displayAttribute="'claimtypename'"
                  :valueAttribute="'claimtype'"
                  :optionDropdowns="listEligibleClaimType"
                  :filter="true"
                  :isDisabled="isDisabledForm"
                  :isHeight50="true"
                  @changeValue="value => _changeAutocompleteClaimForm(value, 'claimtypeid')"
                />
              </b-form-group>
              <div
                class="d-flex flex-row"
                v-if="objLabel.cpfpayable == '1' || objLabel.taxable == '1'"
              >
                <div class="checkbox-label">Your claim category is liable for</div>
                <b-form-checkbox disabled v-if="objLabel.cpfpayable == '1'" :checked="true"
                  >CPF</b-form-checkbox
                >
                <b-form-checkbox disabled v-if="objLabel.taxable == '1'" :checked="true"
                  >TAX</b-form-checkbox
                >
              </div>
            </b-col>
            <b-row class="mx-0 body__quick__log" v-if="parseInt(myClaimInfo.claimtypeid)" :key="reRenderKey">
              <div class="line w-100" />
              <div class="w-100 edit-claim-title">{{ $t('claim.Claim_detail') }}</div>
              <b-col cols="12" lg="6" class="d-flex col-custome">
                <b-form-group label="Currency" class="w-100">
                  <Autocomplete
                    :placeholder="'Currency'"
                    :displayAttribute="'name'"
                    :valueAttribute="'id'"
                    :value="myClaimInfo.currencyid"
                    :optionDropdowns="listCurrency"
                    :filter="true"
                    :isDisabled="isDisabledForm"
                    :isCurrency="true"
                    :isHeight50="true"
                    @changeValue="value => _changeAutocompleteClaimForm(value, 'currencyid')"
                  />
                </b-form-group>
                <b-form-group :label="objLabel.label2" class="w-100">
                  <currency-input
                    class="w-100"
                    v-model="myClaimInfo.incurredamt"
                    :class="{ input__custom: true, input_disabled: isDisabledForm }"
                    :disabled="isDisabledForm"
                    placeholder="Please indicate"
                    :distraction-free="false"
                    :currency="null"
                    :min="0"
                    :max="null"
                    :precision="{ min: 0, max: 2 }"
                    locale="en-US"
                  />
                </b-form-group>
              </b-col>
              <b-col cols="12" lg="6">
                <b-form-group :label="objLabel.label1">
                  <Autocomplete
                    :placeholder="'Please select'"
                    :value="myClaimInfo.combinedserviceprovidersid"
                    :displayAttribute="'name'"
                    :valueAttribute="'id'"
                    :optionDropdowns="label1DataList"
                    :filter="true"
                    :isDisabled="isDisabledForm"
                    :isHeight50="true"
                    @changeValue="
                      value => _changeAutocompleteClaimForm(value, 'combinedserviceprovidersid')
                    "
                  />
                </b-form-group>
              </b-col>
              <b-col cols="12" v-if="objLabel.disableotherserviceprovider == 'false' && myClaimInfo.combinedserviceprovidersid == 'null'">
                <b-form-group :label="objLabel.label1 + ' (Other)'">
                  <b-input
                    class="w-100 input-claim-cs"
                    :placeholder="objLabel.label1 + ' (Other)'"
                    v-model="myClaimInfo.serviceproviderother"
                    :disabled="isDisabledForm"
                  />
                </b-form-group>
              </b-col>
              <b-col cols="12" lg="6" class="d-flex col-custome" v-if="objLabel.referalletter == 'true'">
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
                      :isHeight50="true"
                      :isDisabled="isDisabledForm"
                      @changeValue="value => _changeAutocompleteClaimForm(value, 'referalletter')"
                    />
                    <button :disabled="isDisabledForm" class="referral-btn ml-1" v-b-modal.refferal-modal>
                      <b-icon-box-arrow-in-up-right />Referral
                    </button>
                  </div>
                </b-form-group>
              </b-col>
              <b-col cols="12" lg="6">
                <b-form-group :label="objLabel.label3">
                  <Autocomplete
                    :placeholder="'Please select'"
                    :displayAttribute="'name'"
                    :valueAttribute="'id'"
                    :optionDropdowns="label3DataList"
                    :value="myClaimInfo.claimreasonid"
                    :filter="true"
                    :isDisabled="isDisabledForm"
                    :isHeight50="true"
                    @changeValue="value => _changeAutocompleteClaimForm(value, 'claimreasonid')"
                  />
                </b-form-group>
              </b-col>
              <b-col cols="12" :lg="objLabel.referalletter == 'true' ? 12 : 6" v-if="objLabel.disableotherclaimreason == 'false'&& myClaimInfo.claimreasonid == 'null'">
                <b-form-group :label="objLabel.label3 + ' (Other)'">
                  <b-input
                    class="w-100 input-claim-cs"
                    :placeholder="objLabel.label3 + ' (Other)'"
                    v-model="myClaimInfo.claimreasonother"
                    :disabled="isDisabledForm"
                  />
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

            <div class="line w-100" />
            <div>
              <div @click="isShowDropzone = !isShowDropzone" class="edit-claim-title" :style="isDisabledForm ? {'pointer-events': 'none'} : {}">
                Attachments
                <b-icon icon="plus-circle-fill" style="color: var(--NTUC-3)" />
              </div>

              <div :style="isDisabledForm ? {'pointer-events': 'none'} : {}">
                <div class="box-update mt-4" v-if="isShowDropzone">
                  <div class="position-relative">
                    <div class="dropdown__log">
                      <dropzone
                        @vdropzone-file-added="_handleUploadSuccess"
                        :options="optionDropzone"
                        :destroyDropzone="true"
                      >
                        <div class="d-flex justify-content-center">
                          <img class="icon__upload" src="@/assets/images/upload.png" alt="upload" />
                        </div>
                        <div class="content__upload__log">
                          {{ $t('upload.click_or_drag_file_to_this_area_to_upload') }}
                        </div>
                      </dropzone>
                    </div>
                  </div>
                </div>

                <div class="pt-4 claim_noti" v-if="isShowDropzone">
                  <span class="first_claim_noti">{{ $t('claim.upload_size') }}</span>
                </div>
              </div>

              <div
                :class="{ wrapper__file__log: true, 'mt-10': index ? true : false }"
                v-for="(attachment, index) in listAttachment"
                :key="index"
              >
                <div class="d-flex">
                  <a :href="formatURL(attachment)" target="_blank" class="d-flex">
                    <img class="icon__file" src="@/assets/images/icon-file.png" alt="icon-file" />
                    <div>
                      <div class="text__file__log limit__text">
                        {{ attachment.name || 'Attachment' }}
                      </div>
                    </div>
                  </a>
                  <img v-if="!['Rejected', 'Approved', 'Paid', 'HR Approval'].includes(myClaimInfo.state)"
                    :style="isDisabledForm ? {'pointer-events': 'none'} : {}"
                    class="icon__close__round__light"
                    src="@/assets/images/Close_round_light.png"
                    alt="input-affix"
                    @click="_handleRemoveFile(index)"
                  />
                </div>
              </div>

            </div>
          </b-row>
        </div>
      </div>

      <!-- Button Group -->
      <div class="quick-log-btn d-flex justify-content-end pt-4">
        <button
          type="button"
          class="btn btn__claim button__log"
          :class="
            ['Rejected', 'Approved', 'Paid', 'HR Approval'].includes(myClaimInfo.state)
              ? 'btn_disabled'
              : ''
          "
          @click="_handleSubmit"
        >
          Save
        </button>
      </div>

      <!-- RefferalLetter Dialog -->
      <RefferalLetterModal
        idModal="refferal-modal"
        :claimantid = "myClaimInfo.claimantid"
        @createSuccessReferral="_createSuccessReferral"
        :key="referralKey"
      />
    </div>
  </div>
</template>

<script>
import Dropzone from 'nuxt-dropzone';
import { mapGetters, mapActions } from 'vuex';
import { postAxios, getAxios } from '@/services/callApi';
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
    selected: 1,
    options: {
      format: 'DD-MM-YYYY',
      useCurrent: false,
      maxDate: new Date()
    },
    isDisabledForm: false,
    objLabel: {},
    label1DataList: [],
    label3DataList: [],
    reRenderKey: 1,
    myClaimInfo: {},
    optionDropzone: {
      url: '/',
      acceptedFiles: '.jpeg,.jpg,.png,.gif,.pdf',
    },
    isShowDropzone: false,
    referralKey: 1,
    listAttachment: [],
    listRemoveAttachment: []
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
    this.mappingDataMyAttachment([...this.myAttachments]);
    await this._getClaimsNameListing();
    await this._getEligibleClaimType();
    await this._getCurrencyListing();
    await this._getRefferalListing();
  },
  methods: {
    ...mapActions('claim', [
      'setListClaimMate',
      'handleListCurrency',
      'handleListReferral',
      'handleListEligibleClaimType',
      'setMyClaimEdit'
    ]),
    _handleDisabledForm() {
      this.isDisabledForm = !this.isDisabledForm;
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
      this.objLabel = obj;
    },
    _handleLabel1DataList(res) {
      const xmlArrRes = res.data.data[1];
      this.label1DataList = [];
      if (this.objLabel.disableotherserviceprovider == 'false') {
        this.label1DataList = [{ id: 'null', name: 'Other' }];
      } else if (xmlArrRes) {
        const colNames = xmlArrRes.colNames;
        const rows = xmlArrRes.rows ?? [];
        rows.forEach((element, index) => {
          let obj = {};
          colNames.forEach((ele, i) => {
            obj[ele] = element[i];
          });
          this.label1DataList.push(obj);
        });
      }
    },
    _handleLabel3DataList(res) {
      const xmlArrRes = res.data.data[2];
      this.label3DataList = [];
      if (this.objLabel.disableotherclaimreason == 'false') {
        this.label3DataList = [{ id: 'null', name: 'Other' }];
      } else if (xmlArrRes) {
        const colNames = xmlArrRes.colNames;
        const rows = xmlArrRes.rows ?? [];
        rows.forEach((element, index) => {
          let obj = {};
          colNames.forEach((ele, i) => {
            obj[ele] = element[i];
          });
          this.label3DataList.push(obj);
        });
      }
    },
    async _getEligibleClaimType() {
      try {
        await this.handleListEligibleClaimType({
          invoke: 'System.execute',
          argc: '2',
          a0: 'Claim.Apply.GetEligibleClaimType',
          a1: {
            employee: this.empId,
            employeedpdt: parseInt(this.myClaimInfo.claimantid) ? this.myClaimInfo.claimantid : null,
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
    async _createSuccessReferral(){
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
          !this.label1DataList ||
          !this.label3DataList
        ) return;

        if (['claimreasonid', 'combinedserviceprovidersid'].includes(field)) {
          this.myClaimInfo[field] = value == null ? 'null' : value;
        } else {
          this.myClaimInfo[field] = value;
        }

        if(field == 'claimantid'){
          await this._getEligibleClaimType();
          await this._getRefferalListing();
          this.myClaimInfo = {
            ...this.myClaimInfo,
            claimreasonid: 'null',
            currencyid: null,
            claimtypeid: null,
            referalletter: null,
            combinedserviceprovidersid: 'null',
            serviceproviderother: null,
            claimreasonother: null,
            incurredamt: null,
            remarkbyemployee: null
          }
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
        const myClaimInfo = { ...this.myClaimInfo };
        for (const property in myClaimInfo) {
          if (myClaimInfo[property] == 'null') this.myClaimInfo[property] = null;
        }

        let incurreddate;
        if (this.myClaimInfo.incurreddate instanceof Date) {
          incurreddate = this.$dayjs(this.myClaimInfo.incurreddate).format('YYYY-MM-DD');
        } else {
          incurreddate = (this.myClaimInfo.incurreddate ?? '').split('-').reverse().join('-');
        }

        return {
          params: {
            invoiceno: this.myClaimInfo.invoiceno ?? this.myClaimInfo.claimappliedid,
            employee: this.empId,
            employeedpdt: this.myClaimInfo.claimantid,
            currency: this.myClaimInfo.currencyid,
            incurredamt: this.myClaimInfo.incurredamt,
            referalletter: parseInt(this.myClaimInfo.referalletter)
              ? this.myClaimInfo.referalletter
              : null,
            incurreddate: incurreddate,
            serviceproviderother: this.myClaimInfo.serviceproviderother,
            combinedserviceproviders: this.myClaimInfo.combinedserviceprovidersid,
            claimreasonother: this.myClaimInfo.claimreasonother,
            remarkbyemployee: this.myClaimInfo.remarkbyemployee,
            claimtype: this.myClaimInfo.claimtypeid,
            claimreason: this.myClaimInfo.claimreasonid
          },
          referenceno: this.myClaimInfo.referenceno,
          claimgroup: this.myClaimInfo.claimgroup,
          mode: '1'
        };
      } catch (error) {
        console.log('_formatSubmitPayment', error);
      }
    },
    _formatAfterSubmit() {
      const myClaimInfo = { ...this.myClaimInfo };
      for (const property in myClaimInfo) {
        if (myClaimInfo[property] == null){
          if(['claimreasonother', 'serviceproviderother', 'remarkbyemployee'].includes(property)) continue;
          else this.myClaimInfo[property] = 'null';
        }
      }
    },
    async _handleSubmit() {
      try {
        window.scrollTo({ top: 0, behavior: 'smooth' });
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
          let listAttachment = []
          value.claim_attachments.forEach(e => {
            listAttachment.push({
              name: e.name,
              url: this.formatLinkAttachment(e.url),
              deleteUrl: this.formatLinkAttachment(e.deleteUrl)
            })
          });
          this.listAttachment = listAttachment;
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
        this._deleteAttachment();
        //upload file
        const addedFile = [];
        for await (const attachment of this.listAttachment) {
          if(!attachment.deleteUrl){
            const formData = new FormData();
            formData.append('file', attachment);
            const resp = await postAxiosUpload(formData);
            if (resp.status == 200) {
              const fileUpload = resp.data.files[0];
              addedFile.push({
                hospitaltype: null,
                attachmenttype: 'Invoice',
                name: fileUpload.name
              });
            }
          }
        }
        if(!addedFile.length) return;

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
          this.myClaimInfo.invoiceno = value.id;
        }
      } catch (error) {
        console.log('_handlePreSubmit', error);
      }
    },
    async _deleteAttachment(){
      for await (const attachment of this.listRemoveAttachment) {
        if(attachment.deleteUrl){
          await getAxios(attachment.deleteUrl);
        }
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
          incurreddate: new Date(claim.incurreddate),
          incurredamt: parseInt(claim.incurredamt),
          combinedserviceprovidersid: combinedserviceprovidersid,
          claimreasonid: claimreasonid,
          claimantid: claimantid
        };
      } catch (error) {
        console.log('mappingDataMyClaim', error);
      }
    },
    mappingDataMyAttachment(attachments) {
      attachments.forEach(attachment => {
        const file = {
          name: attachment.name,
          url: this.formatLinkAttachment(attachment.url),
          deleteUrl: this.formatLinkAttachment(attachment.deleteUrl),
        };
        this.listAttachment.push(file);
      });
    },
    formatLinkAttachment(url) {
      return process.env.IMAGE_URL + url;
    },
    _handleUploadSuccess(file) {
      this.listAttachment.push(file);
    },
    _handleRemoveFile(index) {
      this.listRemoveAttachment.push(this.listAttachment[index])
      this.listAttachment.splice(index, 1);
    },
    formatURL(attachment){
      return attachment.url || URL.createObjectURL(attachment)
    }
  },
  watch: {
    async 'myClaimInfo.claimtypeid'(newVal, oldVal) {
      await this._getRelatedListing(newVal);
      const initialClaimtypeid = parseInt(this.myClaim.claimtypeid) ? this.myClaim.claimtypeid : 'null';
      if(newVal == initialClaimtypeid) return;
      this.myClaimInfo = {
        ...this.myClaimInfo,
        claimreasonid: 'null',
        currencyid: null,
        referalletter: null,
        combinedserviceprovidersid: 'null',
        serviceproviderother: null,
        claimreasonother: null,
        incurredamt: null,
        remarkbyemployee: null
      }
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

::v-deep .bg--gray .dropdown__log .vue-dropzone {
  background-color: #F6F8F9;
}

::v-deep .dropdown__log .dropzone .dz-preview {
  display: none;
}

::v-deep .dropdown__log .dropzone.dz-started .dz-message {
  display: block;
}
</style>
