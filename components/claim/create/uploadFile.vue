<template>
  <div class="d-flex justify-content-between claim-create_upload_file h-100" :class="{LoaderClaim: loading}">
    <div class="wrapper__content__quick__log">
      <div class="wrapper__content" v-if="loading">
        <div class="title__quick__log">{{ $t('log.understood') }} ...</div>
        <div class="question__quick__log">{{ $t('log.please_wait') }}</div>
        <div class="wap-loader">
          <div class="d-flex justify-content-center loading-spinner margin-top--45">
            <img class="Loader" src="@/assets/images/Loader.png" alt="Loader" />
          </div>
        </div>
      </div>
      <div class="wrapper__content" v-else>
        <div class="title__quick__log">{{ $t('claim.Excellent') }},</div>
        <div class="question__quick__log mb-2 mb-text-center">{{ $t('claim.upload_doc') }}</div>
        <div class="wrapper_checkbox_log__supp wrapper_checkbox_quick_log mb-4">
          <div class="first_claim_noti_content mb-text-center">
            <span class="first_claim_noti">{{ $t('claim.type_file') }}</span>
          </div>
          <div class="d-flex flex-column">
            <div v-for="(documentType, index) in listDocumentType" :key="index">
              <UploadImg
                :isTooltip="documentType.additionalnote != null"
                :textTooltip="documentType.additionalnote"
                :isLoading="listLoading[index] > 0"
                :key="reRender"
                :title="documentType.label"
                :isRequire="documentType.isrequired == '1'"
                :files="listFile[index]"
                :createon="new Date()"
                @handleUploadSuccess="file => _handleUploadFile(index, file)"
                @removeFile="indexFile => _handleRemoveFile(index, indexFile)"
              />
            </div>
          </div>
        </div>
      </div>
      <div class="quick-log-btn d-flex justify-content-between _claim_mobile_btn" v-if="!loading">
        <button
          type="button"
          :disabled="isLoadingOCR"
          @click="_backStep"
          class="btn btn__claim button__log btn_back _btn_next_claim btn_back_claim"
        >
          Back
        </button>
        <button
          type="button"
          @click="_nextStep"
          :disabled="isLoadingOCR"
          class="btn btn__claim button__log _btn_next_claim"
          :class="isLoadingOCR ? 'loading_btn' : ''"
        >
          {{ isLoadingOCR ? 'Loading' : 'Next' }}
        </button>
      </div>
    </div>
    <quoteClaim />
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import { postAxiosUpload } from '@/services/callApiUpload';
import { postAxios } from '@/services/callApi';
import UploadImg from '@/components/UploadImg/index.vue';
import quoteClaim from '../quoteClaim.vue';

export default {
  components: {
    UploadImg,
    quoteClaim
  },
  data: () => ({
    listDocumentType: [],
    listFile: [],
    listFileUpload: [],
    listLoading: [],
    reRender: 1,
    totalSize: 0,
    maxSize: 10 * 1024 * 1024, //10mb,
    isLoadingOCR: false,
    uuid: null,
    loading: false
  }),
  computed: {
    ...mapGetters('claim', ['createClaimStepInfor']),
    empId: () => localStorage.getItem('empid')
  },
  created() {
    this._setStepList(2);
    this.setOutpaitentClaimObject({});
    this.setListClaimCreated([]);
    this._changeAlertConfig({
      isShow: false,
      typeAlert: 'warning',
      textAlert: ''
    });
  },
  async fetch() {
    this._changeAlertConfig({
      isShow: false,
      typeAlert: 'success',
      textAlert: ''
    });
    this.loading = true;
    await this._initUploadFile();
    this.loading = false;
  },
  mounted() {
    this.getUUID();
    const createClaimStepInfor = { ...this.createClaimStepInfor };
    if (createClaimStepInfor.localFile) {
      this.listFile = [...createClaimStepInfor.localFile];
    }
  },
  watch: {},
  methods: {
    ...mapActions('claim', [
      '_setStepList',
      'setCreateStepClaimInfor',
      'setCreateClaimStep',
      'setOutpaitentClaimObject',
      'setListClaimCreated'
    ]),
    ...mapActions('upload', ['getNewUUID']),
    ...mapActions('alert', ['_changeAlertConfig']),
    async getUUID() {
      this.uuid = await this.getNewUUID();
    },
    async _initUploadFile() {
      const res = await postAxios({
        invoke: 'System.execute',
        argc: '2',
        a0: 'API.AttachmentType.GetSetting',
        a1: { claimgroup: this.createClaimStepInfor.claimgroup }
      });
      if (res.data.data[0].dt == 'default') {
        const value = JSON.parse(res.data.data[0].value);
        switch (this.createClaimStepInfor.claimgroup) {
          case 1:
            this.listDocumentType = value.flexbenefit;
            break;
          case 2:
            this.listDocumentType = value.outpatientbenefit;
            break;
          case 4:
            this.listDocumentType = value.inpatientbenefit;
            break;
        }

        if (this.listFile.length) {
          this.listDocumentType.forEach(e => {
            this.listLoading.push(0);
          });
        } else {
          this.listDocumentType.forEach(e => {
            this.listFile.push([]);
            this.listFileUpload.push([]);
            this.listLoading.push(0);
          });
        }
      }
    },
    async _nextStep() {
      if (this._checkLoading()) return;
      this._handleSizeFile();
      const isInvoice = [];
      this.listFile.forEach((files, index) => {
        if (this.listDocumentType[index].name == 'Invoice') {
          files.forEach(file => {
            isInvoice.push(file.name);
          });
        }
      });
      if (isInvoice.length === 0) {
        this._changeAlertConfig({
          isShow: true,
          typeAlert: 'warning',
          textAlert:
            'You have not uploaded any attachment. The attachment is required to substantiate your claim.'
        });
        return window.scrollTo({ top: 0, behavior: 'smooth' });
      }
      let isEmpty = this.totalSize == 0;
      let isLimit = this.totalSize > this.maxSize;

      if (isEmpty) {
        window.scrollTo({ top: 0, behavior: 'smooth' });
        this._changeAlertConfig({
          isShow: true,
          typeAlert: 'warning',
          textAlert:
            'You have not uploaded any attachment. The attachment is required to substantiate your claim.'
        });
      } else if (isLimit) {
        window.scrollTo({ top: 0, behavior: 'smooth' });
        this._changeAlertConfig({
          isShow: true,
          typeAlert: 'warning',
          textAlert:
            'Your attachment exceeds the file limit of 10MB. Please re-size and upload again'
        });
      } else {
        this._changeAlertConfig({
          isShow: false,
          typeAlert: 'success',
          textAlert: ''
        });

        this.isLoadingOCR = true;
        await this._handleFilePreSubmission();
        if(!this.createClaimStepInfor.filePreSubmissArr) {
          this.isLoadingOCR = false;
          this._changeAlertConfig({
            isShow: true,
            typeAlert: 'error',
            textAlert:
              'Your attachment upload error. Please upload again'
          });
          return;
        }

        if (this.createClaimStepInfor.claimgroup == 1) {
          await this._handleOcrFlexClaim();
          await this._handlePreSubmission();
          this.isLoadingOCR = false;
          this.setCreateClaimStep(1.5);
          this._setStepList(3);
        } else if (this.createClaimStepInfor.claimgroup == 2) {
          await this._handleOcrOutpaitentClaim();
          await this._handlePreSubmission();
          this.isLoadingOCR = false;
          this.setCreateClaimStep(7.1);
          this._setStepList(3);
        }
      }
    },
    _backStep() {
      this.setCreateClaimStep(4);
    },
    async _handleFilePreSubmission() {
      try {
        const filePreSubmissArr = [];
        for (let [i, fileParent] of this.listFile.entries()) {
          for (let file of fileParent) {
            const upfile = await this._handleUpfile(file, this.listDocumentType[i]);
            filePreSubmissArr.push(upfile);
          }
        }
        this.setCreateStepClaimInfor({
          ...this.createClaimStepInfor,
          filePreSubmissArr: filePreSubmissArr
        });
      } catch (error) {
        console.log('_handleFilePreSubmission', error);
      }
    },
    async _handlePreSubmission() {
      try {
        const listFileClaims = this.createClaimStepInfor.filePreSubmissArr.flat().map(e => e.name);
        const res = await postAxios({
          invoke: 'System.execute',
          argc: '2',
          a0: 'API.ClaimApplied.PreSubmission',
          a1: {
            employee: this.empId,
            employeedpdt:
              this.createClaimStepInfor.claimantName == 'null'
                ? null
                : this.createClaimStepInfor.claimantName,
            claimgroup: this.createClaimStepInfor.claimgroup,
            incurreddate: this.createClaimStepInfor.incurreddate,
            files: this.createClaimStepInfor.filePreSubmissArr
          }
        });
        if (res.status >= 400) return;
        if (res.data.data[0].dt == 'default') {
          const xmlValue = res.data.data[0].value;
          const value = JSON.parse(xmlValue);
          this.setCreateStepClaimInfor({
            ...this.createClaimStepInfor,
            localFile: [...this.listFile],
            listFileClaims: listFileClaims,
            parentreferenceno: value.referenceNo,
            parentclaimid: value.id
          });
        }
      } catch (error) {
        console.log('_handlePreSubmission', error);
      }
    },
    _handleSizeFile() {
      const arrFiles = this.listFile.flat();
      let totalSize = 0;
      arrFiles.forEach(file => {
        totalSize += file.size;
      });
      this.totalSize = totalSize;
    },
    async _handleUploadFile(index, file) {
      this._changeAlertConfig({
        isShow: false,
        typeAlert: 'warning',
        textAlert: ''
      });
      const listFile = this.listFile[index];
      this.listFile[index] = [...listFile, file];
      this.reRender += 1;
    },
    _handleRemoveFile(index, indexFile) {
      //copy array because error vuex;
      const listFile = new Array(...this.listFile[index]);
      listFile.splice(indexFile, 1);
      this.listFile[index] = listFile;
      this.reRender += 1;
    },
    _checkLoading() {
      if (this.listLoading.includes(0)) return false;
      return true;
    },
    async _handleUpfile(file, documentType) {
      const resNewUUID = await this.getNewUUID();
      const newUUIDFile = `${resNewUUID}-${file.name}`;

      const dataFile = new FormData();
      dataFile.append('file', file, newUUIDFile);
      await postAxiosUpload(dataFile);

      return {
        hospitaltype: documentType.hospitaltype,
        attachmenttype: documentType.name,
        name: newUUIDFile
      };
    },

    async _handleOcrFlexClaim() {
      try {
        const filePreSubmissArr = [];
        this.createClaimStepInfor.filePreSubmissArr.forEach((file, index) => {
          if (file.attachmenttype == 'Invoice') {
            filePreSubmissArr.push(file.name);
          }
        });
        const res = await postAxios({
          invoke: 'System.execute',
          argc: '2',
          a0: 'API.OCR.Process',
          a1: {
            image_name: filePreSubmissArr,
            attachment_type: 'Invoice',
            mode: '0'
          }
        });
        const xmlValue = res.data.data[0].value;
        const data = JSON.parse(xmlValue).data;
        if (data) {
          this.setCreateStepClaimInfor({
            ...this.createClaimStepInfor,
            incurredamt: parseFloat(JSON.parse(data).incurred_amount) ?? 0,
            combinedserviceproviders: JSON.parse(data).service_provider ?? null
          });
        }
      } catch (error) {}
    },
    async _handleOcrOutpaitentClaim() {
      try {
        const filePreSubmiss = [];
        this.createClaimStepInfor.filePreSubmissArr.forEach((file, index) => {
          if (file.attachmenttype == 'Invoice') {
            filePreSubmiss.push(file.name);
          }
        });
        const res = await postAxios({
          invoke: 'System.execute',
          argc: '2',
          a0: 'API.OCR.Process',
          a1: {
            image_name: filePreSubmiss,
            attachment_type: 'Invoice',
            mode: '1'
          }
        });
        const val = JSON.parse(res.data.data[0].value);
        const value = JSON.parse(val.data);
        if (res.data.data[0].dt === 'default') {
          if (value) {
            this.setCreateStepClaimInfor({
              ...this.createClaimStepInfor,
              incurredamt: value.incurred_amount,
              combinedserviceproviders: value.service_provider
            });
          }
        }
      } catch (error) {}
    }
  }
};
</script>

<style scoped>
@import '@/assets/css/quick-log/stepContent.css';
@import '@/assets/css/claim/create/firstClaim.css';
::v-deep .text__title__log {
  font-family: Ubuntu-regular, Tahoma, sans-serif;
  font-weight: 400;
}

.loading_btn {
  pointer-events: none;
}

::v-deep .vue-dropzone.dropzone.dz-clickable {
  display: flex;
}

::v-deep .dropdown__log .dropzone .dz-message {
  margin: auto;
}

@media (max-width: 1600px) {
  .wrapper_checkbox_log__supp {
    margin-bottom: 50px !important;
  }
}

@media (max-width: 991px) {
  ::v-deep .wap-update {
    align-items: flex-start !important;
  }

  ::v-deep .box-update {
    max-width: 100% !important;
    width: 100% !important;
  }

  ::v-deep .description {
    max-width: 100% !important;
    padding-left: 0px !important;
  }

  ::v-deep .custom-spinner {
    top: 135px !important;
    right: 50% !important;
  }
  @import '@/assets/css/inputCustom/inputCustom.css';
  @import '@/assets/css/claim/create/firstClaim.css';
  @import '@/assets/css/claim/create/fourthClaim.css';
  @import '@/assets/css/claim/stepOneLog.css';
}
@media only screen and (max-width: 768px) {
  .create__claim .claim-create_upload_file ::v-deep .vue-dropzone.dropzone.dz-clickable {
    width: 100% !important;
    max-width: 150px;
  }
}
</style>
