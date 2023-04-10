<template>
  <div class="d-flex justify-content-between wrapper__mobile__step h-100">
    <div
      :class="{
        'wrapper__content__log__one--one': true,
        'wrapper__content__two--one': createStep == 2.1 ? true : false
      }"
    >
      <div :class="{ 'wrapper__content__one--one': true }">
        <div v-if="createStep == 2.1">
          <div class="title__log title__log__one text-40">
            {{ $t('claim.Excellent') }}
          </div>
          <div class="question__log__one--one question__claim__one--one mb-0">
            {{ $t('claim.upload_doc') }}
          </div>
          <div class="first_claim_noti_content mb-text-center">
            <span class="first_claim_noti">{{ $t('claim.type_file') }}</span>
          </div>
          <div class="wrapper_upload">
            <div v-for="(item, index) in inpatientbenefit" :key="index">
              <UploadImg
                :index="index"
                :title="item.label"
                :files="files[index]"
                :isTooltip="item.additionalnote ? true : false"
                :textTooltip="item.additionalnote"
                :isRequire="item.isrequired == '1' ? true : false"
                :isFS16="true"
                :isBgGray="true"
                :isCheckSubmit="isLoading"
                @handleUploadSuccess="handleUploadSuccess"
                @removeFile="removeFile"
                :key="reRenderKey"
              />
            </div>
          </div>
        </div>
      </div>
      <div class="wrapper__button__filter__one--one d-flex justify-content-between">
        <button
          :disabled="isLoading"
          type="button"
          @click="_back"
          class="btn btn__claim button__log btn_back _btn_next_claim btn_back_claim"
        >
          {{ $t('back') }}
        </button>
        <button
          :disabled="isLoading"
          type="button"
          @click="_next"
          class="btn btn__claim button__log d-flex align-items-center justify-content-center _btn_next_claim"
        >
          {{ isLoading ? $t('loading') : $t('next') }}
        </button>
      </div>
    </div>
    <quoteClaim v-if="createStep == 2.1" />
  </div>
</template>

<script>
  import { mapGetters, mapActions } from 'vuex';
  import selectCustom from '~/components/selectCustom/selectCustom.vue';
  import datePicker from 'vue-bootstrap-datetimepicker';
  import ChooseLog from '~/components/claim/chooseLog.vue';
  import UploadImg from '~/components/UploadImg';
  import { PAGINATE } from '~/utils/constants/paginate.js';
  import quoteClaim from './quoteClaim.vue';

  import 'bootstrap/dist/css/bootstrap.css';
  import 'pc-bootstrap4-datetimepicker/build/css/bootstrap-datetimepicker.css';

  export default {
    components: {
      selectCustom,
      datePicker,
      ChooseLog,
      UploadImg,
      quoteClaim
    },
    data: () => ({
      options: {
        format: 'DD MMM YYYY',
        useCurrent: false
      },
      paginateDefault: PAGINATE,
      files: [],
      isCheckFileEmpty: false,
      isLoading: false,
      inpatientbenefit: [],
      reRenderKey: 1
    }),
    watch: {
      dataClaims: function (newValue) {
        if (newValue && newValue.rows) {
          this.paginateDefault.pageCount = Math.ceil(newValue.rows.length / PAGINATE.pageRange);
        }
      }
    },
    computed: {
      ...mapGetters('claim', [
        'createStep',
        'chooseLog',
        'attachmentType',
        'createClaimStepInfor',
        'listFileInpatient',
        'outClaimSelected',
        'refrNoOutpaitent'
      ]),
      ...mapGetters('log', ['dataClaims', 'listClaims', 'isCancelLog'])
    },
    methods: {
      ...mapActions('claim', [
        'setCreateClaimStep',
        'handleChooseLog',
        '_setStepList',
        'preSubmission',
        'getAttachmentType',
        'setCreateStepClaimInfor',
        'ocrProcess',
        'handleListFileInpatient',
        'setValueRefNoOutpaitent'
      ]),
      ...mapActions('log', ['handleCurrentPage', 'changeIsCancelLog']),
      ...mapActions('notification', ['getBroker']),
      ...mapActions('upload', ['getNewUUID', 'uploadFile', 'setListFileClaim']),
      ...mapActions('alert', ['_changeAlertConfig']),
      _handlePagination: function (_currentPage) {
        this.handleCurrentPage(_currentPage);
        window.scrollTo({ top: 0, behavior: 'smooth' });
      },
      _handleColeAlert() {
        this.alert.isShow = false;
        this.changeIsCancelLog(1);
      },
      _back() {
        if (Object.keys(this.outClaimSelected).length !== 0) {
          this.setCreateClaimStep(1);
          return;
        }
        this.handleListFileInpatient(this.files);
        if (this.createStep) {
          this._setStepList(1);
          this.setCreateClaimStep(4);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        } else {
          this.setCreateClaimStep(2.1);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }
      },
      _formatTimeCallApi(time) {
        return this.$dayjs(time).format('YYYY-MM-DD');
      },
      async _next() {
        try {
          if (this.createStep) {
            let check = this.inpatientbenefit.find((el, idx) => {
              return el.isrequired == '1' && !this.files[idx].length;
            });
            if (check) {
              this._changeAlertConfig({
                isShow: true,
                typeAlert: 'warning',
                textAlert: this.$t('claim.warning_file_empty')
              });
              window.scrollTo({ top: 0, behavior: 'smooth' });
              return;
            }

            this.isLoading = true;
            let listFiles = [];
            let listNameFiles = [];

            for (let [i, fileParent] of this.files.entries()) {
              for (let file of fileParent) {
                const upfile = await this._handleUpfile(file, this.inpatientbenefit[i]);
                listFiles.push(upfile);
                listNameFiles.push(upfile.name);
              }
            }
            this.handleListFileInpatient({ files: this.files });
            this.setListFileClaim(listNameFiles);

            const resPreSubmission = await this.preSubmission({
              invoke: 'System.execute',
              argc: '2',
              a0: 'API.ClaimApplied.PreSubmission',
              a1: {
                employee: localStorage.getItem('empid'),
                employeedpdt: null,
                incurreddate: this._formatTimeCallApi(new Date()),
                claimgroup: '4',
                referenceno: this.refrNoOutpaitent.referenceNo,
                files: listFiles
              }
            });
            this._changeAlertConfig({
              isShow: false,
              typeAlert: 'warning',
              textAlert: ''
            });
            this.setCreateStepClaimInfor({
              ...this.createClaimStepInfor,
              referenceno: resPreSubmission.referenceNo,
              claimid: resPreSubmission.id
            });
            this._setStepList(3);
            this.setCreateClaimStep(3.1);
            this.isLoading = false;
          } else {
            this.setCreateClaimStep(2.1);
          }
        } catch (error) {
          this.isLoading = false;
          console.log('_next ' + error);
        }
      },
      async _handleUpfile(file, value) {
        const resNewUUID = await this.getNewUUID();
        const newUUIDFile = `${resNewUUID}-${file.name}`;

        if (file.name) {
          const dataFile = new FormData();
          dataFile.append('file', file, `${newUUIDFile}`);

          await this.uploadFile(dataFile);

          if (value.name == 'FinalSummarisedHospitalBill') {
            const resOcrProcess = await this.ocrProcess({
              invoke: 'System.execute',
              argc: '2',
              a0: 'API.OCR.Process',
              a1: {
                image_name: newUUIDFile,
                attachment_type: value.name,
                mode: '2'
              }
            });

            this.setCreateStepClaimInfor({
              ...this.createClaimStepInfor,
              ...JSON.parse(resOcrProcess?.data)
            });
          }
        }
        return {
          hospitaltype: value.hospitaltype,
          attachmenttype: value.name,
          name: newUUIDFile
        };
      },
      handleUploadSuccess(file, index) {
        if (file.size <= 10000000) {
          const listFile = new Array(...this.files[index]);
          listFile.push(file);
          this.files[index] = listFile;
        } else {
          this._changeAlertConfig({
            isShow: true,
            typeAlert: 'warning',
            textAlert: this.$t('claim.error_upload_file_max_size')
          });
        }
        this.reRenderKey += 1;
      },
      removeFile(index, i) {
        this.files[i].splice(index, 1);
        this.reRenderKey += 1;
      }
    },
    created() {
      this.setCreateClaimStep(2.1);
      this._changeAlertConfig({
        isShow: false,
        typeAlert: 'warning',
        textAlert: ""
      });
    },
    mounted() {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    },
    destroyed() {
      this.handleCurrentPage([]);
      this.setValueRefNoOutpaitent({})
    },
    async fetch() {
      await this.getAttachmentType({
        invoke: 'System.execute',
        argc: '2',
        a0: 'API.AttachmentType.GetSetting',
        a1: {
          claimgroup: '4'
        }
      });

      if (this.attachmentType && this.attachmentType.inpatientbenefit) {
        this.inpatientbenefit = [
          ...this.attachmentType.inpatientbenefit.general,
          ...this.attachmentType.inpatientbenefit.private,
          ...this.attachmentType.inpatientbenefit.rehabilitative,
          ...this.attachmentType.inpatientbenefit.restructured
        ];
        const files = { ...this.listFileInpatient };
        if (!files.files) {
          this.inpatientbenefit.map(() => {
            this.files.push([]);
          });
        } else {
          this.files = [...files.files];
        }
      }
    }
  };
</script>

<style scoped>
  @import '@/assets/css/inputCustom/inputCustom.css';
  @import '@/assets/css/claim/stepOneLog.css';
  @import '@/assets/css/claim/stepOne.css';
  .btn_outpaitent {
    justify-content: flex-end !important;
  }
  
  @media (max-width: 768px) {
    .button__log {
      margin-bottom: 16px;
    }
  }
</style>
