<template>
  <b-modal
    ref="my-modal"
    :id="idModal"
    size="lg"
    title="New Referral Letter"
    :cancel-disabled="true"
    :ok-disabled="true"
    hide-footer
  >
    <div class="referral-modal">
      <div class="referral-modal-title">Claimant Detail</div>
      <b-row class="m-0 p-0 claimCreate_step-7-groupField">
        <b-col class="pl-0 p--md-0 claimCreate_step-7--item" sm="12" md="12" lg="6" xl="6">
          <b-form-group>
            <div class="label__log">
              Employee Name <span class="label__alert__isured">(*)</span>
            </div>
            <b-input
              class="w-100 input-claim-cs input_custom h--50"
              :placeholder="'Employee Name'"
              :value="empName"
              disabled
            />
          </b-form-group>
        </b-col>
        <b-col class="pr-0 p--md-0 claimCreate_step-7--item" sm="12" md="12" lg="6" xl="6">
          <b-form-group>
            <div class="label__log">
              Claimant Name <span class="label__alert__isured">(*)</span>
            </div>
            <b-input
              class="w-100 input-claim-cs input_custom h--50 "
              :placeholder="'Employee Name'"
              :value="getClaimantName"
              disabled
            />
          </b-form-group>
        </b-col>
      </b-row>
    </div>
    <div>
      <div class="referral-modal-title">Referral Details</div>
      <b-row class="m-0 p-0 claimCreate_step-7-groupField">
        <b-col class="pl-0 p--md-0 claimCreate_step-7--item" sm="12" md="12" lg="6" xl="6">
          <b-form-group>
            <div class="label__log">
              Clinic/ Hospital <span class="label__alert__isured">(*)</span>
            </div>
            <b-input
              class="w-100 input-claim-cs input_custom h--50"
              :placeholder="'Clinic/ Hospital'"
              v-model="referralForm.hospital"
            />
            <b-form-invalid-feedback v-if="isSubmitForm && !referralForm.hospital" class="d-block"
              >Please enter Clinic/Hospital.</b-form-invalid-feedback
            >
          </b-form-group>
        </b-col>
        <b-col class="pr-0 p--md-0 claimCreate_step-7--item" sm="12" md="12" lg="6" xl="6">
          <b-form-group>
            <div class="label__log">Diagnosis<span class="label__alert__isured">(*)</span></div>
            <b-input
              class="w-100 input-claim-cs input_custom h--50"
              :placeholder="'Diagnosis'"
              v-model="referralForm.diagnosis"
            />
            <b-form-invalid-feedback v-if="isSubmitForm && !referralForm.diagnosis" class="d-block"
              >Please enter Diagnosis.</b-form-invalid-feedback
            >
          </b-form-group>
        </b-col>
      </b-row>
      <b-row class="m-0 p-0 claimCreate_step-7-groupField">
        <b-col class="pl-0 p--md-0 claimCreate_step-7--item" sm="12" md="12" lg="6" xl="6">
          <b-form-group id="input-group-1" label-for="input-1">
            <div class="label__log">Referral Date<span class="label__alert__isured">(*)</span></div>
            <DateTimePicker
              class="w-100 h-date-50px"
              v-model="referralForm.incurredDate"
              placeholder="Select Date"
              name="date"
              :options="options"
            >
            </DateTimePicker>
            <b-form-invalid-feedback
              v-if="isSubmitForm && !referralForm.incurredDate"
              class="d-block"
              >Please enter Referral Date.</b-form-invalid-feedback
            >
          </b-form-group>
        </b-col>
        <b-col class="pr-0 p--md-0 claimCreate_step-7--item" sm="12" md="12" lg="6" xl="6">
          <b-form-group>
            <div class="label__log">Referral By<span class="label__alert__isured">(*)</span></div>
            <b-input
              class="w-100 input-claim-cs input_custom h--50"
              :placeholder="'Referral By'"
              v-model="referralForm.referralBy"
            />
            <b-form-invalid-feedback v-if="isSubmitForm && !referralForm.referralBy" class="d-block"
              >Please enter Referred By.</b-form-invalid-feedback
            >
          </b-form-group>
        </b-col>
      </b-row>
    </div>
    <div>
      <b-row class="m-0 p-0 claimCreate_step-7-groupField">
        <b-col class="p-0 referral-modal--item">
          <UploadImg
            :title="'Referral Letter'"
            :isInfoTooltip="true"
            :files="referralFiles"
            :createon="new Date()"
            @handleUploadSuccess="_handleReferralFiles"
            @removeFile="_removeReferralFiles"
          />
          <b-form-invalid-feedback v-if="uploadError.status" class="d-block">{{
            uploadError.error
          }}</b-form-invalid-feedback>
        </b-col>
      </b-row>
    </div>
    <div class="d-flex flex-row justify-content-end align-items-center mt-4 button-gr">
      <button class="referral-submit button-it" @click="_submitRefferal" :disabled="isUploading">
        Submit
      </button>
    </div>
  </b-modal>
</template>

<script>
import { mapGetters } from 'vuex';
import { postAxiosUpload } from '@/services/callApiUpload';
import { postAxios } from '@/services/callApi';
import UploadImg from '@/components/UploadImg/index.vue';
export default {
  components: { UploadImg },
  props: ['idModal', 'claimantid'],
  data: () => ({
    options: {
      format: 'DD-MM-YYYY',
      useCurrent: true,
      maxDate: new Date()
    },
    referralFiles: [],
    referralForm: {
      files: []
    },
    isUploading: false,
    isSubmitForm: false
  }),
  computed: {
    ...mapGetters('claim', ['createClaimStepInfor', 'listClaimMate']),
    empName: () => localStorage.getItem('empName'),
    empId: () => localStorage.getItem('empid'),
    uploadError() {
      if (this.isSubmitForm) {
        if (this.referralFiles.length == 0) {
          return { error: `Please click on 'Choose File' button to attach file.`, status: true };
        } else if (this.referralFiles[0].size > 10 * 1024 * 1024) {
          return {
            error:
              'Your attachment exceeds the file limit of 10MB. Please re-size and upload again',
            status: true
          };
        }
      }
      return { error: '', status: false };
    },
    getClaimantName() {
      const claimmate = this.listClaimMate.find(e => e.id == this.claimantid);
      if (claimmate) return claimmate.name;
      return 'My Self';
    }
  },
  created() {
    this.$forceUpdate();
    // if (this.$dayjs) {
    //   this.options.minDate = new Date(this.$dayjs().subtract(3, 'month'));
    // }
  },
  methods: {
    _iconDatePickerClick() {
      this.$refs.datePickerRef.dp.toggle();
    },
    async _handleReferralFiles(file) {
      if (this.referralFiles.length > 0) return;
      this.isUploading = true;
      const formData = new FormData();
      formData.append('file', file);
      const res = await postAxiosUpload(formData);
      const curFile = res.data.files[0];
      if (res.status == 200) {
        this.isUploading = false;
        this.referralFiles = [...this.referralFiles, file];
        this.referralForm.files.push(curFile.name);
      }
    },
    _removeReferralFiles(index) {
      this.referralFiles.splice(index, 1);
      this.referralForm.files.splice(index, 1);
    },
    async _submitRefferal() {
      try {
        this.isSubmitForm = true;
        if (
          !this.referralForm.incurredDate ||
          !this.referralForm.referralBy ||
          !this.referralForm.hospital ||
          !this.referralForm.diagnosis ||
          this.uploadError.status
        )
          return;
        const formatDate = this.referralForm.incurredDate.split('-').reverse().join('-');

        const res = await postAxios({
          invoke: 'System.execute',
          argc: '2',
          a0: 'EmployeeReferalLetter.createFromWeb',
          a1: {
            fields: [
              'employee',
              'employeedpdt',
              'referraldate',
              'referredby',
              'name',
              'description',
              'files'
            ],
            values: [
              this.empId,
              parseInt(this.claimantid) ? this.claimantid : null,
              formatDate,
              this.referralForm.referralBy,
              this.referralForm.hospital,
              this.referralForm.diagnosis,
              this.referralForm.files
            ]
          }
        });

        if (res.status == 200) {
          const dt = res.data.data[0].dt;
          if (dt == 'default') {
            this.$refs['my-modal'].hide();
            await this.$emit('createSuccessReferral');
          }
        }
      } catch (error) {
        console.log('_submitRefferal', error);
      }
    }
  }
};
</script>

<style scoped>
@import '@/assets/css/claim/create/sameRecept.css';

::v-deep .close {
  font-size: 35px;
}
::v-deep .text__title__log {
  font-family: Ubuntu-Medium, Tahoma, sans-serif;
  font-style: normal;
  font-weight: 500;
  font-size: 20px;
  line-height: 120%;
  color: var(--NTUC-1);
  margin-bottom: 16px;
}

@media only screen and (max-width: 991px) {
  .p--md-0 {
    padding: 0 !important;
  }
}

@media only screen and (max-width: 1150px) {
  ::v-deep .description-body {
    max-width: calc(100% - 155px);
    padding-left: 24px;
  }
  ::v-deep .box-update {
    max-width: 150px;
  }
}

.label__log {
  font-family: Ubuntu-Regular, Tahoma, sans-serif;
  font-style: normal;
  font-weight: 400;
  font-size: 12px;
  line-height: 120%;
  color: var(--gray-scale-700);
}
.label__alert__isured {
  color: #dc3545;
}

@media (min-width: 992px) {
  ::v-deep .modal-lg,
  .modal-xl {
    max-width: 900px;
  }
}
</style>
