<template>
  <div>
    <div class="wrapper__content__quick__log w-100 detail-claim-containter">
      <div class="wrapper__content">
        <div class="wrapper_checkbox_log__supp wrapper_checkbox_quick_log mb-4 mt-4">
          <b-row class="body__quick__log">
            <div class="question__quick__log mb-0 d-flex align-items-center w-100">
              <div class="font__medium text-24 font-400" style="color: #000000">Inpatient Benefits</div>
              <button
                class="btn__edit border-0 d-flex justify-content-center align-items-center"
                v-if="
                myClaimInfo.status == 'Pending Verification' ||
                myClaimInfo.state_name_ind_field == 'Pending Verification' ||
                myClaimInfo.status == 'Pending Submission' ||
                myClaimInfo.state_name_ind_field == 'Pending Submission'"
                @click="editClick"
              >
                <b-icon icon="pencil-fill" color="#212529"/>
              </button>
            </div>
            <b-col cols="12" lg="6">
              <b-form-group id="input-group-1" label="Reference No" label-for="input-1" label-class="text-NTUC-28 text-12 font-400 font__medium">
                <b-input
                  class="w-100 input-claim-cs"
                  :placeholder="'Ref No'"
                  :value="myClaimInfo.referenceno"
                  disabled
                />
              </b-form-group>
            </b-col>
            <b-col class="d-flex w-100" cols="12" lg="6">
              <b-form-group
                class="mr-4 input__status"
                id="input-group-1"
                label="Status"
                label-class="text-NTUC-28 text-12 font-400 font__medium" 
                label-for="input-1"
              >
                <b-input
                  class="w-100 input-claim-cs"
                  :style="{
                    color: (myClaimInfo.status == 'Rejected' ||
                      myClaimInfo.state_name_ind_field == 'Rejected')
                      ? '#EF7979'
                      : (myClaimInfo.status == 'Approved' ||
                      myClaimInfo.status == 'Paid' ||
                      myClaimInfo.state_name_ind_field == 'Approved' ||
                      myClaimInfo.state_name_ind_field == 'Paid')
                      ? '#00AC41'
                      : '#F7A604'
                  }"
                  :placeholder="'Status'"
                  :value="myClaimInfo.state_name_ind_field"
                  disabled
                />
              </b-form-group>
              <div class="d-flex align-items-center">
                <img
                  v-if="
                    myClaimInfo.status == 'Rejected' ||
                    myClaimInfo.state_name_ind_field == 'Rejected'
                  "
                  width="36px"
                  height="36px"
                  src="@/assets/images/icon-uncomfortable.png"
                  alt="icon-uncomfortable"
                />
                <img
                  v-else-if="
                    myClaimInfo.status == 'Approved' ||
                    myClaimInfo.status == 'Paid' ||
                    myClaimInfo.state_name_ind_field == 'Approved' ||
                    myClaimInfo.state_name_ind_field == 'Paid'
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
              <DatetimePicker :label="'Submitted On'" v-model="myClaimInfo.createon" :disabled="true"
                :options="optionsAdmin" />
            </b-col>
            <div class="line w-100" />
            <div class="question__title col-12 font-500 text-20 d-flex align-items-center text-NTUC-1 font__medium">Claimant Details</div>
            <b-col cols="12" lg="6">
              <b-form-group id="input-group-1" label="Employee Name" label-for="input-1"
                label-class="text-NTUC-28 text-12 font-400 font__medium">
                <b-input class="w-100 input-claim-cs" :placeholder="'Employee Name'"
                  :value="myClaimInfo.employee_name_ind_field" disabled />
              </b-form-group>
              <DatetimePicker :label="(objLabel && objLabel.label1)" v-model="myClaimInfo.admissiondate" :disabled="true"
                :placeholder="'Select Date'" :options="optionsAdmin" />
            </b-col>
            <b-col v-if="myClaimInfo.policyclaimtype" cols="12" lg="6">
              <b-form-group id="input-group-1" label="Claimant Name" label-for="input-1"
                label-class="text-NTUC-28 text-12 font-400 font__medium">
                <Autocomplete :placeholder="'Please select'" :value="myClaimInfo.employeedpdt" :displayAttribute="'name'"
                  :valueAttribute="'id'" :optionDropdowns="listClaimsName" :filter="true" :isDisabled="true"
                  :isHeight50="true" @changeValue="
                    value => {
                      this.getList(
                        'PolicyClaimApplied.LoadInitialData',
                        {
                          emp: this.myClaimInfo.employee,
                          empdpdt: value
                        },
                        'LoadInitialData'
                      );
                      this.myClaimInfo.claimantid = value;
                    }
                  "
                />
              </b-form-group>
            </b-col>
            <b-col v-if="myClaimInfo.log" cols="12" lg="6">
              <b-form-group
                class="input__status"
                id="input-group-1"
                :label="$t('claim.letter_of_guarantee')"
                label-for="input-1"
              >
                <b-input
                  class="w-100 input-claim-cs"
                  :placeholder="'Status'"
                  :value="myClaimInfo.log_name_ind_field"
                  disabled
                />
              </b-form-group>
            </b-col>
            <div class="line w-100" />
            <div class="w-100 edit-claim-title col-12 font-500 text-20 d-flex align-items-center text-NTUC-1 font__medium">{{ $t('claim.Claim_detail') }}</div>
            <b-col cols="12" lg="6">
              <b-form-group :class="{ input__error: objError.invoiceno.status }" id="input-group-1" label="Invoice No"
                label-for="input-1" label-class="text-NTUC-28 text-12 font-400 font__medium">
                <b-input class="w-100 input-claim-cs" :placeholder="'Invoice No'" v-model="myClaimInfo.invoiceno"
                  :disabled="isDisabled" />
                <b-form-invalid-feedback v-if="objError.invoiceno.status" class="d-block">
                  {{ objError.invoiceno.error }}
                </b-form-invalid-feedback>
              </b-form-group>
            </b-col>
            <b-col cols="12" lg="6">
            </b-col>
            <b-col cols="12" lg="6">
              <b-form-group id="input-group-1" :label="$t('claim.insurance_policy')" label-for="input-1"
                label-class="text-NTUC-28 text-12 font-400 font__medium">
                <Autocomplete :placeholder="'Please select'" :value="myClaimInfo.policytype" :displayAttribute="'name'"
                  :valueAttribute="'id'" :optionDropdowns="listPolicy" :filter="true" :isDisabled="isDisabled"
                  :isHeight50="true" :isRequired="objError.policytype.status" @changeValue="
                    value => {
                      this.myClaimInfo.policytype = value;
                    }
                  " />
                <b-form-invalid-feedback v-if="objError.policytype.status" class="d-block">
                    {{ objError.policytype.error }}
                  </b-form-invalid-feedback>
              </b-form-group>
            </b-col>
            <b-col cols="12" lg="6">
              <b-form-group id="input-group-1" :label="$t('claim.Claim_Type')" label-for="input-1"
                label-class="text-NTUC-28 text-12 font-400 font__medium">
                <Autocomplete :placeholder="'Please select'" :value="myClaimInfo.policyclaimtype"
                  :displayAttribute="'name'" :valueAttribute="'id'" :optionDropdowns="listClaimType" :filter="true"
                  :isDisabled="isDisabled" :isHeight50="true" :isRequired="objError.policyclaimtype.status" @changeValue="
                    value => {
                      this.myClaimInfo.policyclaimtype = value;
                      this._getRelatedListing(value);
                    }
                  " />
                <b-form-invalid-feedback v-if="objError.policyclaimtype.status" class="d-block">
                  {{ objError.policyclaimtype.error }}
                </b-form-invalid-feedback>
              </b-form-group>
            </b-col>
            <template v-if="objLabel">
              <b-col cols="12" lg="6">
                <b-form-group id="input-group-1" :label="objLabel.label9" label-for="input-1"
                  label-class="text-NTUC-28 text-12 font-400 font__medium">
                  <multiselect v-model="policyclaimtypeclaimreasonValue" :options="listPolicyclaimtypeclaimreason"
                    :multiple="false" :disabled="isDisabled" group-values="data" group-label="groups" :group-select="true"
                    :placeholder="$t('please_select')" track-by="id" label="name"
                    :class="{ 'input__error_autocomplete': objError.policyclaimtypeclaimreason.status }"
                    @input="value => (this.myClaimInfo.policyclaimtypeclaimreason = value ? value.id : null)">
                    <span slot="noResult">{{ $t('No_data') }}</span>
                  </multiselect>
                  <b-form-invalid-feedback v-if="objError.policyclaimtypeclaimreason.status" class="d-block">
                    {{ objError.policyclaimtypeclaimreason.error }}
                  </b-form-invalid-feedback>
                </b-form-group>
              </b-col>
              <b-col cols="12" lg="6">
              </b-col>
              <b-col cols="12" lg="6">
                <b-form-group id="input-group-1" :label="$t('claim.admission_type')" label-for="input-1"
                  label-class="text-NTUC-28 text-12 font-400 font__medium">
                  <Autocomplete :placeholder="'Please select'" :value="myClaimInfo.admissiontype"
                    :displayAttribute="'name'" :valueAttribute="'id'" :optionDropdowns="listAdmissionType" :filter="true"
                    :isDisabled="true" :isHeight50="true" @changeValue="
                      value => {
                        this.myClaimInfo.admissiontype = value;
                      }
                    " />
                </b-form-group>
              </b-col>
              <b-col v-if="myClaimInfo.admissiontype == '513'" cols="12" lg="6">
                <DatetimePicker :label="(objLabel && objLabel.label2)" v-model="myClaimInfo.dischargedate"
                  :disabled="isDisabled" :placeholder="'Select Date'" :options="options"
                  :isRequiredDate="objError.dischargedate.status" />
                <b-form-invalid-feedback v-if="objError.dischargedate.status" class="d-block">
                  {{ objError.dischargedate.error }}
                </b-form-invalid-feedback>
              </b-col>
              <b-col cols="12" lg="6">
                <b-form-group id="input-group-1" :label="objLabel.label4" label-for="input-1"
                  label-class="text-NTUC-28 text-12 font-400 font__medium">
                  <Autocomplete
                    :placeholder="'Please select'"
                    :value="myClaimInfo.hospital"
                    :displayAttribute="'name'"
                    :valueAttribute="'id'"
                    :optionDropdowns="listHospital"
                    :filter="true"
                    :isDisabled="isDisabled"
                    :isHeight50="true"
                    :isRequired="objError.hospital.status"
                    @changeValue="
                      value => {
                        this.myClaimInfo.hospital = value;
                        this.fieldhospitalOther = value == 'other' ? true : false;
                      }
                    " />
                  <b-form-invalid-feedback v-if="objError.hospital.status" class="d-block">
                    {{ objError.hospital.error }}
                  </b-form-invalid-feedback>
                </b-form-group>
              </b-col>
              <b-col cols="12" lg="6" v-if="fieldhospitalOther">
                <b-form-group :class="{ input__error: objError.hospitalother.status }" id="input-group-1"
                  :label="objLabel.label4 + ' (Other)'" label-for="input-1"
                  label-class="text-NTUC-28 text-12 font-400 font__medium">
                  <b-input class="w-100 input-claim-cs" v-model="myClaimInfo.hospitalother"
                    :placeholder="objLabel.label4 + ' (Other)'" :disabled="isDisabled" />
                  <b-form-invalid-feedback v-if="objError.hospitalother.status" class="d-block">
                    {{ objError.hospitalother.error }}
                  </b-form-invalid-feedback>
                </b-form-group>
              </b-col>

              <b-col cols="12" lg="6" v-if="listReferenceClaim && listReferenceClaim[0]">
                <b-form-group id="input-group-1" :label="$t('claim.reference_claim')" label-for="input-1"
                  label-class="text-NTUC-28 text-12 font-400 font__medium">
                  <Autocomplete :placeholder="'Please select'" :value="myClaimInfo.parent"
                    :displayAttribute="'referenceno'" :valueAttribute="'id'" :optionDropdowns="listReferenceClaim"
                    :filter="true" :isHeight50="true" :isDisabled="isDisabled"
                    @changeValue="value => (this.myClaimInfo.parent = value)" />
                </b-form-group>
              </b-col>
              <b-col cols="12" lg="6">
                <b-form-group id="input-group-1" :label="objLabel.label5" label-for="input-1"
                  label-class="text-NTUC-28 text-12 font-400 font__medium">
                  <Autocomplete :placeholder="'Please select'" :value="myClaimInfo.hospitaltype"
                    :displayAttribute="'name'" :valueAttribute="'id'" :optionDropdowns="listHospitalType" :filter="true"
                    :isHeight50="true" :isDisabled="true"
                    @changeValue="value => (this.myClaimInfo.hospitaltype = value)" />
                </b-form-group>
              </b-col>
              <b-col cols="12" lg="6">
                <b-form-group id="input-group-1" label="Currency" label-for="input-1" class=""
                  label-class="text-NTUC-28 text-12 font-400 font__medium">
                  <Autocomplete :placeholder="'Currency'" :displayAttribute="'name'" :valueAttribute="'id'"
                    :value="myClaimInfo.currency" :optionDropdowns="listCurrency" :filter="true" :isDisabled="isDisabled"
                    :isCurrency="true" :isHeight50="true" :isRequired="objError.currency.status" @changeValue="
                      value => {
                        this.myClaimInfo.currency = value;
                      }
                    " />
                  <b-form-invalid-feedback v-if="objError.currency.status" class="d-block">
                    {{ objError.currency.error }}
                  </b-form-invalid-feedback>
                </b-form-group>
              </b-col>
              <b-col cols="12" lg="6">

                <b-form-group id="input-group-1" :label="objLabel.label3" label-for="input-1" class=""
                  label-class="text-NTUC-28 text-12 font-400 font__medium">
                  <div :class="{ input__disabled: isDisabled, input__error: objError.incurredamt.status }">
                    <currency-input v-model="myClaimInfo.incurredamt" :distraction-free="false" :currency="null" :min="0"
                      :max="null" :class="{ input__custom: true, 'w-100': true }" :precision="{ min: 2, max: 2 }"
                      :placeholder="''" locale="en-US" />
                  </div>
                  <b-form-invalid-feedback v-if="objError.incurredamt.status" class="d-block">
                    {{ objError.incurredamt.error }}
                  </b-form-invalid-feedback>
                </b-form-group>
              </b-col>
              <b-col cols="12" lg="6" class="d-flex col-custome">
                <b-form-group id="input-group-1" :label="objLabel.label8" label-for="input-1" class="w-100"
                  label-class="text-NTUC-28 text-12 font-400 font__medium">
                  <div class="d-flex flex-row align-items-start">
                    <Autocomplete class="referral-input w-100 mr--5" :placeholder="'Please select'"
                      :value="myClaimInfo.referalletter" :displayAttribute="'label'" :valueAttribute="'id'"
                      :optionDropdowns="listReferral" :filter="true" :isHeight50="true" :isDisabled="isDisabled"
                      @changeValue="value => (this.myClaimInfo.referalletter = value)" />
                    <button :disabled="isDisabled" class="referral-btn" v-b-modal.refferal-modal>
                      <b-icon-box-arrow-in-up-right />{{$t('claim.Add_New')}}
                    </button>
                  </div>
                </b-form-group>
              </b-col>
              <b-col cols="12" lg="6"
                v-if="this.claimDynamicTem && this.myClaimInfo.policyclaimtypeclaimreason == 'null' && this.claimDynamicTem.disableotherclaimreason != '1'">
                <b-form-group :class="{ input__error: objError.policyclaimtypeclaimreasonother.status }" id="input-group-1"
                  :label="objLabel.label9 + ' (Other)'" label-for="input-1">
                  <b-input class="w-100 input-claim-cs" v-model="myClaimInfo.policyclaimreasonother"
                    :placeholder="objLabel.label9 + ' (Other)'" :disabled="isDisabled" />
                  <b-form-invalid-feedback v-if="objError.policyclaimtypeclaimreasonother.status" class="d-block">
                    {{ objError.policyclaimtypeclaimreasonother.error }}
                  </b-form-invalid-feedback>
                </b-form-group>
              </b-col>
              <b-col cols="12">
                <b-form-group id="input-group-1" label="Remarks" label-for="input-1" label-class="text-12 font-400 font__medium">
                  <b-textarea
                    :rows="3"
                    max-rows="6"
                    v-model="myClaimInfo.remark"
                    :disabled="isDisabled"
                    placeholder="Provide any additional remarks">
                  </b-textarea>
                </b-form-group>
              </b-col>
              <div
                v-if="
                  myClaimInfo.status == 'Paid' ||
                  myClaimInfo.state_name_ind_field == 'Paid'"
                class="line w-100"
              />
              <div
                class="w-100 question__quick__log"
                v-if="
                  myClaimInfo.status == 'Paid' ||
                  myClaimInfo.state_name_ind_field == 'Paid'"
              >
                Payment Details
              </div>
              <b-col
                cols="12"
                v-if="(myClaimInfo.status == 'Paid' ||
                  myClaimInfo.state_name_ind_field == 'Paid') && myClaimInfo.adminremark"
              >
                <b-form-group id="input-group-1" label="Remarks by admin" label-for="input-1">
                  <b-textarea
                    :rows="3"
                    max-rows="6"
                    v-model="myClaimInfo.adminremark"
                    :disabled="true"
                    placeholder=""
                  >
                  </b-textarea>
                </b-form-group>
              </b-col>
            </template>
          </b-row>

          <b-row class="body__quick__log w-100" v-if="myClaimInfo.state_name_ind_field == 'Paid' && (reimbursementDetail.paiddate || reimbursementDetail.batchpayableamt != null)">
            <div class="line w-100" />
            <div class="w-100 edit-claim-title col-12">Payment Details</div>
            <b-col cols="12" lg="6" v-if="reimbursementDetail.paiddate">
              <DatetimePicker
                label="Paid Date"
                :value="_formatTimePaidDate(reimbursementDetail.paiddate)"
                :disabled="true"
                :placeholder="'Select Date'"
                :options="options"
              />
            </b-col>
            <b-col cols="12" lg="6" v-if="reimbursementDetail.batchpayableamt != null">
              <b-form-group label="Batch Payable Amount">
                <currency-input
                  class="w-100"
                  :value="reimbursementDetail.batchpayableamt"
                  :class="{ input__custom: true, input_disabled: true }"
                  :disabled="true"
                  placeholder="Please indicate"
                  :distraction-free="false"
                  :currency="null"
                  :min="0"
                  :max="null"
                  :precision="{ min: 2, max: 2 }"
                  locale="en-US"
                />
              </b-form-group>
            </b-col>
          </b-row>

          <b-row class="body__quick__log w-100" v-if="myClaimInfo.state_name_ind_field == 'Paid'">
            <div class="line w-100" />
            <div class="w-100 edit-claim-title col-12">Reimbursement Details</div>
            <b-col cols="12" lg="6" v-if="reimbursementDetail.cashamttoemployer">
              <b-form-group label="Employer">
                <b-input
                  class="w-100 input-claim-cs"
                  placeholder="Employer receives"
                  :value="reimbursementDetail.cashamttoemployer"
                  disabled
                />
              </b-form-group>
            </b-col>
            <b-col cols="12" lg="6" v-if="reimbursementDetail.cashamttoemployer"/>
            <b-col cols="12" lg="6" v-if="reimbursementDetail.shieldplanamt">
              <b-form-group label="Central Shield Plan (CSP)">
                <b-input
                  class="w-100 input-claim-cs"
                  placeholder="Central Shield Plan (CSP)"
                  :value="reimbursementDetail.shieldplanamt"
                  disabled
                />
              </b-form-group>
            </b-col>
            <b-col cols="12" lg="6" v-if="reimbursementDetail.medisaveamt">
              <b-form-group label="Central Provident Fund (CPF)">
                <b-input
                  class="w-100 input-claim-cs"
                  placeholder="Central Provident Fund (CPF)"
                  :value="reimbursementDetail.medisaveamt"
                  disabled
                />
              </b-form-group>
            </b-col>
            <b-col cols="12" lg="6" v-if="reimbursementDetail.cashamt">
              <b-form-group label="Reimbursement">
                <b-input
                  class="w-100 input-claim-cs"
                  placeholder="Reimbursement"
                  :value="reimbursementDetail.cashamt"
                  disabled
                />
              </b-form-group>
            </b-col>
            <b-col cols="12" lg="6" v-if="reimbursementDetail.hospamt">
              <b-form-group label="Hospital">
                <b-input
                  class="w-100 input-claim-cs"
                  placeholder="Hospital"
                  :value="reimbursementDetail.hospamt"
                  disabled
                />
              </b-form-group>
            </b-col>
            <b-col cols="12" lg="6" v-if="reimbursementDetail.batchpayableamt">
              <b-form-group label="Total Reimbursement Amount">
                <b-input
                  class="w-100 input-claim-cs"
                  placeholder="Total Reimbursement Amount"
                  :value="reimbursementDetail.batchpayableamt"
                  disabled
                />
              </b-form-group>
            </b-col>
            <b-col cols="12" lg="6" v-if="reimbursementDetail.notpayableamt">
              <b-form-group label="Not Payable Amount">
                <b-input
                  class="w-100 input-claim-cs"
                  placeholder="Not Payable Amount"
                  :value="reimbursementDetail.notpayableamt"
                  disabled
                />
              </b-form-group>
            </b-col>
            <b-col cols="12" v-if="reimbursementDetail.remark">
              <b-form-group label="Additional Remarks by Admin">
                <b-input
                  class="w-100 input-claim-cs"
                  placeholder="Additional Remarks by Admin"
                  :value="reimbursementDetail.remark"
                  disabled
                />
              </b-form-group>
            </b-col>
          </b-row>

          <b-row class="body__quick__log w-100">
            <div class="line w-100" />
            <div style="padding: 0 15px;">
              <div
                @click="isShowDropzone = true"
                class="font__medium text-24 text-NTUC-1 d-flex font-500 align-items-center"
                :class="{'edit-claim-title': true, upload__disabled: isDisabled ? true : false}"
              >
                Attachments
                <b-icon icon="plus-circle-fill" style="color: var(--NTUC-3)" />
              </div>

              <div :style="isDisabled ? {'pointer-events': 'none'} : { 'cursor': 'pointer' }">
                <div v-if="isShowDropzone" class="question__log__one--one question__claim__one--one mb-0">{{$t('claim.upload_your_document/s_here')}}</div>
                <div v-if="isShowDropzone" class="note__claim__two">{{$t('claim.note_one')}}</div>
                <div v-for="(item, index) in listAttachment" :key="index">
                  <UploadImg
                    v-if="isShowDropzone"
                    :index="index"
                    :title="item.label"
                    :files="files[index]"
                    :isTooltip="item.additionalnote ? true : false"
                    :textTooltip="item.additionalnote"
                    :isRequire="item.isrequired == '1' ? true : false"
                    :isFS16="true"
                    :isBgGray="true"
                    :isCheckSubmit="isDisabled"
                    @handleUploadSuccess="handleUploadSuccess"
                    @removeFile="removeFile"
                    :isShowNoti="false"
                    :key="reRenderKey"
                  />
                </div>
              </div>
              <div v-if="!isShowDropzone">
                <div
                  :class="{ wrapper__file__log: true, 'mt-10': index ? true : false }"
                  v-for="(file, index) in viewAttachments"
                  :key="index"
                >
                  <div class="d-flex cursor_pointer" @click="_handleOpenAttachment(file)">
                    <b-icon class="mr-2" icon="file-pdf-fill" width="50px" height="50px" v-if="file.name.slice(file.name.length -3,file.name.length) ==='pdf'"/>
                    <img class="mr-2" width="50px" height="50px" :src="file.url" alt="icon-file"  v-else/>
                    <div class="d-flex align-items-center">
                      <div class="text__file__log limit__text">
                        {{ file.name }}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </b-row>
        </div>
      </div>
      <div v-if="
        myClaimInfo.status == 'Pending Verification' ||
        myClaimInfo.state_name_ind_field == 'Pending Verification' ||
        myClaimInfo.status == 'Pending Submission' ||
        myClaimInfo.state_name_ind_field == 'Pending Submission'"
        class="quick-log-btn d-flex justify-content-between pt-4"
      >
        <button type="button" class="btn btn__claim button__log" @click="_handleDelete">
          {{ $t('delete') }}
        </button>
        <button :disabled="isDisabled" type="button" class="btn btn__claim button__log" @click="_handleSubmit">
          Save
        </button>
      </div>
      <RefferalLetterModal
        idModal="refferal-modal"
        :claimantid = "createClaimStepInfor.claimantName"
        @createSuccessReferral="_createSuccessReferral"
        :key="referralKey"
      />
      <b-modal hide-header hide-footer v-model="showModal" size="lg" content-class='modal__none border-0' title="Overflowing Content" v-if="myAttachments[0]">
        <img :src="srcShowModal" width="100%" frameborder="0" alt="src_ShowModal"/>
      </b-modal>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import Dropzone from 'nuxt-dropzone';
import { postAxios } from '@/services/callApi';
import { postAxiosUpload } from '@/services/callApiUpload';
import { handleListCallApi } from '@/utils/functions/handleListCallApi';
import { _handleFormatTime } from '@/utils/functions/formatTime';
import RefferalLetterModal from '@/components/claim/create/refferalLetterModal.vue';
import DatetimePicker from '@/components/datetimePicker/index.vue';
export default {
  components: {
    RefferalLetterModal,
    DatetimePicker,
    Dropzone,
  },
  props: ['handleSetAlert'],
  data: () => ({
    showModal: false,
    listRemoveAttachment:[],
    srcShowModal:"",
    isDisabled: true,
    optionsAdmin: {
      format: 'DD MMM YYYY',
      useCurrent: false,
      maxDate: new Date(),
      icons: {
        date: ''
      }
    },
    myClaimInfo: {
      employee: '',
      employeedpdt: '',
      currency: '',
      incurredamt: null,
      referalletter: '',
      invoiceno: '',
      log: '',
      admissiondate: new Date(),
      policyclaimtype: '',
      parent: '',
      admissiontype: '',
      policyclaimreasonother: '',
      policyserviceproviderother: '',
      policyclaimtypeclaimreason: '',
      policyclaimtypeclaimreasonother: '',
      dischargedate: '',
      hospital: '',
      hospitaltype: '',
      hospitalother: '',
      policytype: '',
      employeeremark: '',
      claimantid: '',
    },
    myClaimInfoDefault: {
      currency: '',
      incurredamt: null,
      referalletter: '',
      admissiondate: new Date(),
      policyclaimtype: '',
      parent: '',
      admissiontype: '',
      policyclaimreasonother: '',
      policyserviceproviderother: '',
      policyclaimtypeclaimreason: '',
      policyclaimtypeclaimreasonother: '',
      dischargedate: '',
      hospital: '',
      hospitaltype: '',
      hospitalother: '',
      employeeremark: '',
      claimantid: '',
    },
    listClaimsName: [],
    listClaimType: [],
    objLabel: null,
    listHospital: [],
    listHospitalType: [],
    listServiceProvider: [],
    listClaimReason: [],
    listCurrency: [],
    listAttachment: [],
    fieldhospitalOther: false,
    claimReasonOther: false,
    serviceProviderOther: false,
    claimDynamicTem: null,
    referralKey: 1, // re-render component when update referralKey
    isShowDropzone: false,
    optionDropzone: {
      url: '/',
      acceptedFiles: '.jpeg,.jpg,.png,.gif,.pdf',
    },
    isCheckHollow: true,
    files: [],
    viewAttachments: [],
    reRenderKey: 1,
    listPolicyclaimtypeclaimreason: [],
    policyclaimtypeclaimreasonValue: null,
    listReferenceClaim: [],
    objError: {
      check: false,
      policytype: { error: 'Please enter Insurance Policy.', status: false },
      invoiceno: { error: 'Please enter Invoice No.', status: false },
      policyclaimtype: { error: 'Please enter Claim Type.', status: false },
      policyclaimtypeclaimreason: { error: 'Please enter Claim Reason.', status: false },
      policyclaimtypeclaimreasonother: {
        error: 'Please enter Claim Reason (Other).',
        status: false
      },
      dischargedate: { error: 'Please enter Discharge Date.', status: false },
      currency: { error: 'Please enter Currency.', status: false },
      incurredamt: { error: 'Please enter Incurred Amount.', status: false },
      hospital: { error: 'Please enter Hospital.', status: false },
      hospitalother: { error: 'Please enter Hospital (Other).', status: false },
      referenceClaim: { error: 'Please enter Hospital (Other).', status: false },
      isFormError: false
    },
  }),
  watch: {
    'myClaimInfo.policytype': function (newVal) {
      if (!newVal) {
        this.myClaimInfo = {
          ...this.myClaimInfo,
          ...this.myClaimInfoDefault,
        };
      }
    },
    'listClaimType': function (newVal) {
      this._handleServiceProvider(newVal);
    },
    'myClaimInfo.policyclaimtype': function (newVal) {
      if (!newVal) {
        this.myClaimInfo = {
          ...this.myClaimInfo,
          ...this.myClaimInfoDefault,
        };
        this.myClaimInfo.currency =
          this.listCurrency.find(item => item.name.toUpperCase() === 'SGD') &&
          this.listCurrency.find(item => item.name === 'SGD').id;
      }
    },
    'myClaimInfo.hospital': function (newVal) {
      if (newVal) {
        this.myClaimInfo.hospitaltype =
          this.listHospital.find((item => item.id == newVal)) &&
          this.listHospital.find((item => item.id == newVal)).hosptype;
      } else {
        this.myClaimInfo.hospitaltype = '';
      }
    },
    propertyCheckPrePostSubClaimType: async function (newValue) {
      try {
        if (
          newValue.policytype &&
          newValue.policyclaimtype &&
          newValue.admissiondate &&
          newValue.policyclaimtypeclaimreason &&
          newValue.employeedpdt
        ) {
          const resCheckPrePostSubClaimType = await this.checkPrePostSubClaimType({
            invoke: 'System.execute',
            argc: '2',
            a0: 'PolicyClaimApplied.CheckPrePostSubClaimType',
            a1: {
              employee: localStorage.getItem('empid'),
              employeedpdt: newValue.employeedpdt == 'null' ? '' : newValue.employeedpdt,
              policytype: newValue.policytype,
              policyclaimtype: newValue.policyclaimtype,
              policyclaimtypeclaimreason: newValue.policyclaimtypeclaimreason == 'null' ? '' : newValue.policyclaimtypeclaimreason,
              date: this._formatTimeCallApi(newValue.admissiondate)
            }
          });

          this._resCheckPrePostSubClaimType(resCheckPrePostSubClaimType);
        }

        if (
          newValue.policytype &&
          newValue.policyclaimtype &&
          newValue.admissiondate
        ) {
          await this.getPolicyClaimReason({
            "invoke": "System.execute",
            "argc": "2",
            "a0": "PolicyClaimReason.getListing",
            "a1": {
              employee: localStorage.getItem('empid'),
              employeedpdt: newValue.employeedpdt == 'null' ? '' : newValue.employeedpdt,
              policytype: newValue.policytype,
              policyclaimtype: newValue.policyclaimtype,
              date: this._formatTimeCallApi(newValue.admissiondate),
              disableotherclaimreason: true,
            }
          });
        }
      } catch (error) {
        console.log('propertyCheckPrePostSubClaimType ' + error);
      }
    },
    propertyHollow: function () {
      this.checkHollow('policytype');
      this.checkHollow('invoiceno');
      this.checkHollow('policyclaimtype');
      this.checkHollow('policyclaimtypeclaimreason');
      this.checkHollow('policyclaimtypeclaimreasonother');
      this.checkHollow('dischargedate');
      this.checkHollow('currency');
      this.checkHollow('incurredamt');
      this.checkHollow('hospital');
      this.checkHollow('hospitalother');
      this.checkHollow('referenceClaim');
    },
    'listPolicyClaimReason': function(newValue) {
      let isCheckValue = false;
      let listPolicyclaimtypeclaimreasonTem = [];

      newValue.map(item => {
        const policyclaimtypeclaimreason = listPolicyclaimtypeclaimreasonTem.find(
          policyclaimtypeclaimreasonItem => policyclaimtypeclaimreasonItem.groups == item.label && item.name != 'Others'
        );
        if (policyclaimtypeclaimreason) {
          policyclaimtypeclaimreason.data.push(item);
        } else {
          if (item.label == localStorage.getItem('empName')) {
            listPolicyclaimtypeclaimreasonTem.unshift({
              groups: item.label,
              data: [item],
            });
          } else {
            listPolicyclaimtypeclaimreasonTem.push({
              groups: item.label ? item.label : 'Others',
              data: [item],
            })
          }
        }

        if (item.id == this.myClaimInfo.policyclaimtypeclaimreason) {
          this.policyclaimtypeclaimreasonValue = item;
          isCheckValue = true;
        }
      });

      if (this.myClaimInfo.policyclaimtypeclaimreason == 'null' || this.myClaimInfo.policyclaimtypeclaimreason == '') {
        this.policyclaimtypeclaimreasonValue = {
          id: 'null',
          name: 'Others',
        }
      } else if (!isCheckValue) {
        this.policyclaimtypeclaimreasonValue = null;
      }

      this.listPolicyclaimtypeclaimreason = listPolicyclaimtypeclaimreasonTem;
    },
  },
  computed: {
    ...mapGetters('claim', [
      'listReferral',
      'myAttachments',
      'listAdmissionType',
      'listPolicyClaimReason',
      'createClaimStepInfor',
      'attachmentType',
      'reimbursementDetail',
      'myClaim'
    ]),
    options() {
      return {
        format: 'DD MMM YYYY',
        useCurrent: false,
        minDate: new Date(new Date(`${this._formatTime(this.myClaimInfo.admissiondate || new Date())} 00:00:00`)),
        maxDate: new Date(new Date(`${this._formatTime(new Date())} 23:59:59`)),
        icons: {
          date: ''
        }
      }
    },
    ...mapGetters('log', [
      'listPolicy',
    ]),
    propertyHollow() {
      return {
        employee: this.myClaimInfo.employee,
        employeedpdt: this.myClaimInfo.employeedpdt,
        currency: this.myClaimInfo.currency,
        incurredamt: this.myClaimInfo.incurredamt,
        referalletter: this.myClaimInfo.referalletter,
        invoiceno: this.myClaimInfo.invoiceno,
        admissiondate: this.myClaimInfo.admissiondate,
        policyclaimtype: this.myClaimInfo.policyclaimtype,
        admissiontype: this.myClaimInfo.admissiontype,
        policyserviceproviderother: this.myClaimInfo.policyserviceproviderother,
        policyclaimtypeclaimreason: this.myClaimInfo.policyclaimtypeclaimreason,
        policyclaimreasonother: this.myClaimInfo.policyclaimreasonother,
        dischargedate: this.myClaimInfo.dischargedate,
        hospital: this.myClaimInfo.hospital,
        hospitaltype: this.myClaimInfo.hospitaltype,
        policytype: this.myClaimInfo.policytype,
      };
    },
    getClaimantName() {
      const claimmate = this.listClaimsName.find(e => e.id == this.myClaimInfo.claimantid);
      if (claimmate) return claimmate.name;
      return '';
    },
    propertyCheckPrePostSubClaimType() {
      return {
        policytype: this.myClaimInfo.policytype,
        policyclaimtype: this.myClaimInfo.policyclaimtype,
        policyclaimtypeclaimreason: this.myClaimInfo.policyclaimtypeclaimreason,
        employeedpdt: this.myClaimInfo.employeedpdt,
        admissiondate: this.myClaimInfo.admissiondate
      };
    },
  },
  methods: {
    ...mapActions('claim', [
      'handleListReferral',
      'getListAdmissionType',
      'checkPrePostSubClaimType',
      'getPolicyClaimReason',
      'getMyClaim',
      'getAttachmentType',
      'detailClaim',
      'ocrProcess',
      'preSubmission',
      'deleteClaim',
      'handleSetLoading'
    ]),
    ...mapActions('log', [
      'getListPolicy',
    ]),
    ...mapActions('upload', [
      'getNewUUID',
      'uploadFile',
      'setListFileClaim',
      'deleteFile',
    ]),
    ...mapActions('notification', ['getBroker']),
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
    },
    checkHollow(key) {
      if (this.myClaimInfo[`${key}`]) {
        this.objError[`${key}`].status = false;
      }
    },
    _resCheckPrePostSubClaimType (resCheckPrePostSubClaimType) {
      let listReferenceClaimTem = [];

      if (resCheckPrePostSubClaimType && resCheckPrePostSubClaimType.preh[0]) {
        listReferenceClaimTem = [...resCheckPrePostSubClaimType.preh];
        this.myClaimInfo.admissiontype = '514';
      } else if (resCheckPrePostSubClaimType && resCheckPrePostSubClaimType.posth[0]) {
        listReferenceClaimTem = [...resCheckPrePostSubClaimType.posth];
        this.myClaimInfo.admissiontype = '515';
      } else {
        this.myClaimInfo.admissiontype = '513';
      }

      this.listReferenceClaim = listReferenceClaimTem;
    },
    _handleServiceProvider (newVal) {
      if (this.myClaimInfo.policyclaimtype) {
        this.claimDynamicTem = newVal.find(item => item.id == this.myClaimInfo.policyclaimtype);
        if (this.claimDynamicTem && this.claimDynamicTem.disableotherserviceprovider != '1') {
          this.listServiceProvider = [
            { id: 'null', name: 'Others'},
            ...this.listServiceProvider.filter(item => item.policyclaimtype == this.myClaimInfo.policyclaimtype)
          ];
        } else {
          this.listServiceProvider = this.listServiceProvider.filter(item => item.policyclaimtype == this.myClaimInfo.policyclaimtype);
        }
      }
    },
    _formatTimeCallApi(time) {
      return this.$dayjs(time).format('YYYY-MM-DD');
    },
    _formatTimePaidDate(time) {
      let b = time.split(/\D/);
      const formatdate = b.reverse().join('-');
      console.log(this.$dayjs(new Date(formatdate)))
      return this.$dayjs(new Date(formatdate)).format('DD MMM YYYY');
    },
    async _createSuccessReferral() {
      this.$bvToast.show('refferal-toast');
      await this._getRefferalListing();
      if(this.listReferral.at(-1)) this.myClaimInfo.referalletter = this.listReferral.at(-1).id;
      this.referralKey += 1;
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
                "mode": 2
              }
            });
          }
        }
      },
    async _handleDelete() {
      try {
        this.isDisabled = true;
        const resDelete = await this.deleteClaim({
          "invoke": "System.execute",
          "argc": "2",
          "a0": "API.ClaimApplied.Delete",
          "a1": {
            "id": this.$route.params.id,
            "mode": "2"
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
          }, 2000)
        } else {
          this.handleSetAlert({
            isShow: true,
            typeAlert: 'error',
            textAlert: 'Invalid claim. Please contact admin.',
          });
        }
      } catch (error) {
        this.handleSetAlert({
          isShow: true,
          typeAlert: 'error',
          textAlert: 'Invalid claim. Please contact admin.',
        });
      }
      window.scrollTo({ top: 0, behavior: 'smooth' });
    },
    async _handleSubmit() {
      this.handleValidateForm();
      if (this.objError.isFormError) {
        window.scrollTo({ top: 0, behavior: 'smooth' });
        return;
      }
      this.isDisabled = true;
      let check = this.listAttachment.find((el,idx)=>{
        return el.isrequired=='1' && !this.files[idx].length
      })
      if (check) {
        this.handleSetAlert({
          isShow: true,
          typeAlert: 'warning',
          textAlert: this.$t('claim.warning_file_empty'),
        });
        window.scrollTo({ top: 0, behavior: 'smooth' });
        return;
      }
      await this._handlePreSubmit();
      if (this.$dayjs(this.myClaimInfo.dischargedate).isBefore(this.$dayjs(this.myClaimInfo.admissiondate))) {
        this.handleSetAlert({
          isShow: true,
          typeAlert: 'error',
          textAlert: this.$t('claim.error_admin_date')
        });
        window.scrollTo({ top: 0, behavior: 'smooth' });
        return;
      }
      const a1 = this._formatSubmitPayment();
      const _payment = {
        invoke: 'System.execute',
        argc: '2',
        a0: 'API.ClaimApplied.SubmissionByReferenceNo',
        a1: a1
      };
      const res = await postAxios(_payment);
      const dt = res.data.data[0].dt;
      window.scrollTo({ top: 0, behavior: 'smooth' });
      if (dt != 'exception') {
        this.handleSetAlert({
          isShow: true,
          typeAlert: 'success',
          textAlert: 'Claim re-submitted successfully.'
        });
        setTimeout(() => {
          this.$router.push({ name: 'claim-claim-list' });
        }, 2000)
      } else {
        const resBroker = await this.getBroker({
          "invoke": "System.execute",
          "argc": "2",
          "a0": "API.Broker.Get"
        });
        this.handleSetAlert({
          isShow: true,
          typeAlert: 'error',
          textAlert: this.$t('claim.edit_error', { supEmail: resBroker.email, numberPhone: resBroker.contactnumber }),
        });
      }
    },
    async _handlePreSubmit() {
      let listFiles = [];
      this._deleteAttachment();
      for (let [i, fileParent] of this.files.entries()) {
        for (let file of fileParent) {
          if (!file.deleteUrl) {
            const upfile = await this._handleUpfile(file, this.listAttachment[i]);
            listFiles.push(upfile);
          }
        }
      }

      await this.preSubmission({
        "invoke": "System.execute",
        "argc": "2",
        "a0": "API.ClaimApplied.PreSubmission",
        "a1": {
          "id": this.$route.params.id,
          "employee": localStorage.getItem('empid'),
          "employeedpdt": null,
          "incurreddate": this._formatTimeCallApi(new Date),
          "claimgroup": "4",
          "files": listFiles,
        }
      });
    },
    async _handleUpfile (file, value) {
      const resNewUUID = await this.getNewUUID();
      const newUUIDFile = `${resNewUUID}-${file.name}`;

      if (file.name) {
        const dataFile = new FormData;
        dataFile.append('file', file, `${newUUIDFile}`);

        await this.uploadFile(dataFile);

        // if (value.name == 'FinalSummarisedHospitalBill') {
        //   await this.ocrProcess({
        //     "invoke": "System.execute",
        //     "argc": "2",
        //     "a0": "API.OCR.Process",
        //     "a1": {
        //       "image_name": newUUIDFile,
        //       "attachment_type": value.name,
        //       "mode": "2",
        //     }
        //   });
        // }
      }
      return {
        "hospitaltype": value.hospitaltype,
        "attachmenttype": value.name,
        "name": newUUIDFile,
      };
    },
    _formatSubmitPayment() {
      const myClaimInfo = { ...this.myClaimInfo };
      for (const property in myClaimInfo) {
        if (!myClaimInfo[property] || myClaimInfo[property] == 'null') this.myClaimInfo[property] = '';
        else this.myClaimInfo[property] = `${this.myClaimInfo[property]}`
      }

      return {
        mode: '1',
        params: {
          employee: this.myClaimInfo.employee,
          employeedpdt: this.myClaimInfo.employeedpdt,
          currency: this.myClaimInfo.currency,
          incurredamt: this.myClaimInfo.incurredamt,
          referalletter: this.myClaimInfo.referalletter,
          invoiceno: this.myClaimInfo.invoiceno,
          log: this.myClaimInfo.log && this.myClaimInfo.log != 'null' ? this.myClaimInfo.log : '',
          admissiondate: this._formatTimeCallApi(this.myClaimInfo.admissiondate),
          policyclaimtype: this.myClaimInfo.policyclaimtype,
          policyserviceproviderother: this.myClaimInfo.policyserviceproviderother,
          policyclaimtypeclaimreason: this.myClaimInfo.policyclaimtypeclaimreason == 'null' ? '' : this.myClaimInfo.policyclaimtypeclaimreason,
          policyclaimtypeclaimreasonother: this.myClaimInfo.policyclaimreasonother,
          dischargedate: this.myClaimInfo.dischargedate ? this._formatTimeCallApi(this.myClaimInfo.dischargedate) : '',
          hospital: this.myClaimInfo.hospital,
          hospitaltype: this.myClaimInfo.hospitaltype,
          hospitalother: this.myClaimInfo.hospitalother,
          policytype: this.myClaimInfo.policytype,
          employeeremark: this.myClaimInfo.remark,
          parent: this.myClaimInfo.parent,
          admissiontype: this.myClaimInfo.admissiontype,
        },
        referenceno: this.myClaimInfo.referenceno,
        claimgroup: '4',
      };
    },
    async getClaimInfor() {
      let myClaimInfoTem = {};
      const res = await postAxios({
        invoke: 'System.execute',
        argc: '2',
        a0: 'PolicyClaimApplied.getClaimDetail',
        a1: {
          claimappliedid: this.$route.params.id,
          attachments: '1'
        }
      });
      if (res) this.handleSetLoading(false)
      const xmlArrRes = res.data.data[0];
      for await (let [i, el] of xmlArrRes.colNames.entries()) {
        myClaimInfoTem[el] = xmlArrRes.rows[0][i];
      }
      await this.getList(
        'PolicyClaimApplied.LoadInitialData',
        {
          emp: myClaimInfoTem.employee,
          empdpdt: myClaimInfoTem.employeedpdt
        },
        'LoadInitialData'
      );
      await this.getListPolicy({
        invoke: 'System.execute',
        argc: '2',
        a0: 'PolicyClaimApplied.GetEligiblePolicyTypeWeb',
        a1: {
          empid: localStorage.getItem('empid'),
          empdpdt: myClaimInfoTem.employeedpdt == '0' ? '' : myClaimInfoTem.employeedpdt,
          admissiondate: this._formatTimeCallApi(myClaimInfoTem.incurreddate),
          log: !myClaimInfoTem.log ? '' : myClaimInfoTem.log,
          isListPolicyClaim: true,
        }
      });
      await this.getList(
        'PolicyClaimApplied.GetEligibleClaimType',
        {
          employee: myClaimInfoTem.employee,
          employeedpdt: myClaimInfoTem.employeedpdt == '0' ? '' : myClaimInfoTem.employeedpdt,
          date: this.$dayjs(this._formatTime(_handleFormatTime(myClaimInfoTem.admissiondate, '-'))).format('YYYY-MM-DD'),
          log: myClaimInfoTem.log && myClaimInfoTem.log != 'null' ? myClaimInfoTem.log : '',
          policytype: myClaimInfoTem.policytype
        },
        'ClaimType'
      );
      await this.getPolicyClaimReason({
        "invoke": "System.execute",
        "argc": "2",
        "a0": "PolicyClaimReason.getListing",
        "a1": {
          employee: localStorage.getItem('empid'),
          employeedpdt: myClaimInfoTem.employeedpdt == '0' ? '' : myClaimInfoTem.employeedpdt,
          policytype: myClaimInfoTem.policytype,
          policyclaimtype: myClaimInfoTem.policyclaimtype,
          date: this._formatTimeCallApi(_handleFormatTime(myClaimInfoTem.admissiondate, '-')),
          disableotherclaimreason:
            this.listClaimType.find(item => item.id == myClaimInfoTem.policyclaimtype) &&
            this.listClaimType.find(item => item.id == myClaimInfoTem.policyclaimtype).disableotherclaimreason != '1' ? true : false,
        }
      });
      this.myClaimInfo = {
        ...this.myClaimInfo,
        ...myClaimInfoTem,
      }
      this._handleServiceProvider(this.listClaimType);
      this.myClaimInfo.createon = this._formatTime(_handleFormatTime(this.myClaimInfo.createon, '-'));
      this.myClaimInfo.admissiondate = this._formatTime(_handleFormatTime(this.myClaimInfo.admissiondate, '-'));
      this.myClaimInfo.dischargedate = this._formatTime(_handleFormatTime(this.myClaimInfo.dischargedate, '-'));
      this.myClaimInfo.employeedpdt = this.myClaimInfo.employeedpdt != '0' ? this.myClaimInfo.employeedpdt : 'null';
      this.myClaimInfo.policyclaimtypeclaimreason = !this.myClaimInfo.policyclaimtypeclaimreason ? 'null' : this.myClaimInfo.policyclaimtypeclaimreason;
      this._getRelatedListing(this.myClaimInfo.policyclaimtype);
    },
    _formatTime(time) {
      return time ? this.$dayjs(time).format('DD MMM YYYY') : '';
    },
    _getRelatedListing(id) {
      if (id) {
        this.objLabel = this.listClaimType.find(el => el.id == id).fieldslabel;
        this.claimDynamicTem = this.listClaimType.find(item => item.id == id);
      } else {
        this.objLabel = null;
      }
    },
    async _getRefferalListing() {
      await this.handleListReferral({
        invoke: 'System.execute',
        argc: '2',
        a0: 'EmployeeReferalLetter.Get',
        a1: {
          employee: localStorage.getItem('empid'),
          employeedpdt: ''
        }
      });
    },
    _addAttachment() {
      this.$refs.uploadFile.click();
    },
    async uploadImage(e) {
      const files = e.target.files;
      files.forEach(async file => {
        const formData = new FormData();
        formData.append('file', file);
        const res = await postAxiosUpload(formData);
        if (res.status == 200) {
          const fileUpload = res.data.files[0];
          this.listAttachment.push(fileUpload.name);
        }
      });
    },
    _handleRemoveFile(index) {
      this.listAttachment.splice(index, 1);
    },
    mappingDataMyAttachment(attachments) {
      attachments.forEach(e => this.viewAttachments.push(e));
    },
    handleUploadSuccess(file, index) {
      if (file.size <= 10000000) {
        const listFile = new Array(...this.files[index]);
        listFile.push(file);
        this.files[index] = listFile;
      } else {
        this.handleSetAlert({
          isShow: true,
          typeAlert: 'warning',
          textAlert: this.$t('claim.error_upload_file_max_size'),
        });
      }
      this.reRenderKey += 1;
    },
    validateForm() {
      try {
        if (this.objError.check) {
          this.objError.policytype.status = !this.myClaimInfo.policytype;
          this.objError.invoiceno.status = !this.myClaimInfo.invoiceno;
          this.objError.policyclaimtype.status = !this.myClaimInfo.policyclaimtype;
          this.objError.incurredamt.status = !this.myClaimInfo.incurredamt;
          this.objError.policyclaimtypeclaimreason.status =
            !this.myClaimInfo.policyclaimtypeclaimreason;
          this.objError.currency.status = !this.myClaimInfo.currency;
          this.objError.hospital.status = !this.myClaimInfo.hospital;
          this.objError.referenceClaim.status = this.listReferenceClaim[0]
            ? !this.myClaimInfo.parent
            : false;

          if (this.myClaimInfo.admissiontype == '513') {
            this.objError.dischargedate.status = !this.myClaimInfo.dischargedate;
          }
          if (this.myClaimInfo.policyclaimtypeclaimreason == 'null') {
            this.objError.policyclaimtypeclaimreasonother.status =
              !this.myClaimInfo.policyclaimtypeclaimreasonother;
          } else this.objError.policyclaimtypeclaimreasonother.status = false;

          if (this.myClaimInfo.hospital == '21') {
            this.objError.hospitalother.status = !this.myClaimInfo.hospitalother;
          } else this.objError.hospitalother.status = false;

          this.objError.isFormError =
            this.objError.policytype.status ||
            this.objError.invoiceno.status ||
            this.objError.policyclaimtype.status ||
            this.objError.policyclaimtypeclaimreason.status ||
            this.objError.policyclaimtypeclaimreasonother.status ||
            this.objError.dischargedate.status ||
            this.objError.currency.status ||
            this.objError.incurredamt.status ||
            this.objError.hospital.status ||
            this.objError.hospitalother.status ||
            this.objError.referenceClaim.status;
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
    async removeFile(index, i) {
      try {
        if (this.files[i][index] && this.files[i][index].deleteUrl) {
          this.listRemoveAttachment.push(this.files[i][index]);
        }

        this.files[i].splice(index, 1);
        this.reRenderKey += 1;
      } catch (error) {
        console.log('removeFile ' + error);
      }
    },
    async getList(a0, a1, list) {
      try {
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
            this.listClaimType = [...JSON.parse(res.data.data[0].value)];
            break;
          }
          case 'ClaimName': {
            this.listClaimsName = [
              { id: 'null', name: 'Self' },
              ...JSON.parse(res.data.data[0].value).employeeDependantInfo.dependantDetails,
            ];
            break;
          }
          case 'Currency': {
            this.listCurrency = handleListCallApi(
              [...res.data.data[0].colNames],
              [...res.data.data[0].rows]
            );
            break;
          }
          case 'LoadInitialData': {
            this.listHospital = handleListCallApi(
              [...res.data.data[0].colNames],
              [...res.data.data[0].rows]
            );
            this.listHospitalType = handleListCallApi(
              [...res.data.data[1].colNames],
              [...res.data.data[1].rows]
            );
            this.listClaimReason = [...JSON.parse(res.data.data[5].value)];
            this.listServiceProvider = handleListCallApi(
              [...res.data.data[4].colNames],
              [...res.data.data[4].rows]
            );
            this.listCurrency = handleListCallApi(
              [...res.data.data[7].colNames],
              [...res.data.data[7].rows]
            );
            break;
          }
        }
      } catch (error) {
        console.log('getList ' + error);
      }
    },
    _handleOpenAttachment(file) {
      if(file.name.slice(file.name.length -3,file.name.length) ==='pdf'){
        window.open(file.url);
      } else {
        this.srcShowModal = file.url
        this.showModal = true;
      }
    },
  },
  async fetch() {
    await this._getRefferalListing();
    await this.getListAdmissionType({
      invoke: 'System.execute',
      argc: '2',
      a0: 'API.List.Select',
      a1: {
        ListGroup: '17'
      }
    });
    await this.getList('API.Autocomplete.Select', { module: '5' }, 'Currency');
    await this.getList(
      "API.getEmployeeADpdt.info",
      {
        isClaim: true,
      },
      'ClaimName'
    );
    await this.getClaimInfor();
    await this.getMyClaim({
      "invoke": "System.execute",
      "argc": "2",
      "a0": "API.ClaimApplied.GetClaims",
      "a1": {
        "id": this.$route.params.id,
        "mode": "2"
      }
    });
    await this.getAttachmentType({
      "invoke": "System.execute",
      "argc": "2",
      "a0": "API.AttachmentType.GetSetting",
      "a1": {
        "claimgroup": "4",
      }
    });
    const resDetailClaim = await this.detailClaim({
      "invoke": "System.execute",
      "argc": "2",
      "a0": "API.ClaimApplied.GetClaims",
      "a1": {
        "id": this.$route.params.id,
        "mode": "2"
      }
    });
    if (this.attachmentType && this.attachmentType.inpatientbenefit) {
      this.listAttachment = [
        ...this.attachmentType.inpatientbenefit.general,
        ...this.attachmentType.inpatientbenefit.private,
        ...this.attachmentType.inpatientbenefit.rehabilitative,
        ...this.attachmentType.inpatientbenefit.restructured,
      ];
      this.listAttachment.map((item) => {
        const attachments = resDetailClaim[0].attachments.filter(attachment => attachment.attachmenttype == item.name)
        if (
          item && item.name && attachments[0]
        ) {
          this.files.push([
            ...attachments,
          ]);
        } else {
          this.files.push([]);
        }
      })
    }
    this.mappingDataMyAttachment([...this.myAttachments]);
  },
};
</script>

<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>
<style scoped>
@import '@/assets/css/inputCustom/inputCustom.css';
@import '@/assets/css/quick-log/stepContent.css';
@import '@/assets/css/claim/create/firstClaim.css';
@import '@/assets/css/claim/create/firstDetailClaim.css';
@import '@/assets/css/selectCustom/selectCustom.css';
@import '@/assets/css/claim/create/sameRecept.css';
@import '@/assets/css/claim/edit/bodyClaim.css';
@import '@/assets/css/fileUpload/index.css';
@import '@/assets/css/claim/stepOne.css';

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
<style>
.modal__none{
  background: none;
}
</style>
