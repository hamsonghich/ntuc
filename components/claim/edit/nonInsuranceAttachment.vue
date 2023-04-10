<template>
  <div>
    <div v-for="(documentType, index) in listDocumentType" :key="index">
      <UploadImg
        :isCheckSubmit="isDisable"
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
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import { postAxios } from '@/services/callApi';
import RefferalLetterModal from '@/components/claim/create/refferalLetterModal.vue';
import Dropzone from 'nuxt-dropzone';
import UploadImg from '@/components/UploadImg/index.vue';
export default {
  components: {
    RefferalLetterModal,
    Dropzone,
    UploadImg
  },
  props: {
    isDisable: {
      type: Boolean,
      default: false,
    },
  },
  data(){
    return {
      listDocumentType: [],
      listFile: [],
      listFileRemove: [],
      reRender: 1,
    }
  },
  computed: {
    ...mapGetters('claim', ['myAttachments']),
  },
  async fetch() {
    await this._initUploadFile();
  },
  methods: {
    ...mapActions('claim', ['setMyAttachments']),
    async _initUploadFile() {
      const res = await postAxios({
        invoke: 'System.execute',
        argc: '2',
        a0: 'API.AttachmentType.GetSetting',
        a1: { claimgroup: this.$route.query.group }
      });
      if (res.data.data[0].dt == 'default') {
        const value = JSON.parse(res.data.data[0].value);
        switch (this.$route.query.group.toString()) {
          case '1':
            this.listDocumentType = value.flexbenefit;
            break;
          case '2':
            this.listDocumentType = value.outpatientbenefit;
            break;
          case '4':
            this.listDocumentType = value.inpatientbenefit;
            break;
        }
        this.listDocumentType.forEach(documentType => {
          const attachments = this.myAttachments.filter(attachment => attachment.attachmenttype == documentType.name)
          this.listFile.push(attachments);
        });
      }
    },
    _handleUploadFile(index, file) {
      const listFile = this.listFile[index];
      this.listFile[index] = [...listFile, file];
      this.$emit('handleFileUpload', this.listFile);
      this._handleTotalSize();
      this.setMyAttachments([...this.myAttachments, file]);
      this.reRender += 1;
    },
    _handleRemoveFile(index, indexFile) {
      const fileRemove = this.listFile[index][indexFile]
      //update file remove array
      this.listFileRemove.push(fileRemove);

      //copy array because error vuex;
      const listFile = new Array(...this.listFile[index]);
      listFile.splice(indexFile, 1);

      //assign value
      this.listFile[index] = listFile;
      this.$emit('handleFileUpload', this.listFile);
      this._handleTotalSize();

      this.setMyAttachments(this.myAttachments.filter((attachment) => attachment != fileRemove));

      this.reRender += 1;
    },
    _handleTotalSize() {
      const files = this.listFile.flat();
      this.$emit('handleTotalSize', files)
    },
  },
  watch: {
    listFileRemove(newVal, oldVal) {
      this.$emit('handleFileRemove', newVal)
    },
    listDocumentType(newVal, oldVal) {
      this.$emit('handleDocumentType', newVal)
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
