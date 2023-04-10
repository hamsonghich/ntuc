<template>
  <div class="wrapper--100" v-if="!$device.mobile && !$device.ipad">
    <div class="wrapper--100 wrapper__image__pdf border-outline-attachment">
      <WebViewer :src="linkShowFile()" :key="linkShowFile()" />
    </div>
    <div class="description">
      <div
        @click="() => _choosePreview(attachment)"
        :class="{ wrapper__file__log: true, 'mt-10': index ? true : false }"
        v-for="(attachment, index) in listAttachments"
        :key="index"
      >
        <div class="d-flex">
          <img class="icon__file" src="@/assets/images/icon-file.png" alt="icon-file" />
          <div>
            <div class="text__file__log">
              {{ attachment.name || 'Attachment' }}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import WebViewer from '@/components/WebViewer.vue';
import { postAxios } from '@/services/callApi';
export default {
  props: {
    claimId: {
      type: String,
    },
    claimRefNo: {
      type: String,
    },
    claimGroup: {
      type: String,
    }
  },
  components: {
    WebViewer
  },
  data: () => ({
    activeAttachment: {},
    listAttachments: []
  }),
  async fetch() {
    await this.getListAttachments();
  },
  methods: {
    _choosePreview(attachment) {
      this.activeAttachment = attachment;
    },
    linkShowFile() {
      return this.activeAttachment.url || '';
    },
    async getListAttachments(){
      const res = await postAxios({
        invoke: 'System.execute',
        argc: '2',
        a0: 'API.ClaimApplied.GetAttachmentsListing',
        a1: {
          id: this.claimId,
          claim_ref_no: this.claimRefNo,
          mode: this.claimGroup,
        }
      });
      if (res.status >= 400) return;
      if (res.data.data[0].dt == 'default') {
        const xmlValue = res.data.data[0].value;
        this.listAttachments = JSON.parse(xmlValue);
        this.activeAttachment = this.listAttachments[0];
      }
    }
  },
};
</script>
<style scoped>
@import '@/assets/css/claim/previewPdf.css';
</style>
