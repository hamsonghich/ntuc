<template>
  <div>
    <div class="session__input border--none">
      <div :class="{ text__title__log: true, 'd-flex': true, 'fs--16': isFS16, 'font__medium': isFontMedium }">
        {{ title }}
        <div class="upload_img_tool_tip">
          <b-icon v-if="isTooltip" icon="info-circle" :id="`${index}`" />
          <b-tooltip custom-class="my-tooltip-inpatient" :target="`${index}`" triggers="hover">
            <div v-html="textTooltip"></div>
          </b-tooltip>

          <img v-if="isRequire" src="@/assets/images/star_require.png" alt="first_claim_img" />
        </div>
      </div>
      <div
        class="wap-update d-flex flex-wrap position-relative wrapper-tooltip"
        :class="isInfoTooltip ? 'align-items-start' : 'align-items-end'"
      >
        <div class="d-flex flex-column img-tooltip tooltipInfoMobile" v-if="isInfoTooltip">
          <div class="d-flex flex-row align-items-center" style="gap: 8px;height: 75px;">
            <img src="@/assets/Icon/infoGradient.svg" alt="first_claim_img" class="icon_noti_mb" />
            <div class="d-flex flex-column">
              <div class="info-title">Info</div>
              <div class="referral-subtitle">Only 1 Referral Letter is required.</div>
            </div>
          </div>
        </div>
        <div :class="{ 'box-update': true, 'cursor_pointer': true,'bg--gray': isBgGray, upload__disabled: isCheckSubmit }">
          <div class="position-relative">
            <div :class="{ dropdown__log: true }">
              <dropzone
                @vdropzone-complete="_handleUploadSuccess"
                id="foo"
                ref="el"
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

        <div class="description-body mt-4">
          <div class="d-flex flex-column img-tooltip tooltipInfoPc" v-if="isInfoTooltip">
            <div class="d-flex flex-row align-items-center" style="gap: 8px;height: 75px;">
              <img
                src="@/assets/Icon/infoGradient.svg"
                alt="first_claim_img"
                class="icon_noti_mb"
              />
              <div class="d-flex flex-column">
                <div class="info-title">Info</div>
                <div class="referral-subtitle">Only 1 Referral Letter is required.</div>
              </div>
            </div>
          </div>
          <div
            class="description"
            :style="isInfoTooltip ? 'max-height: 90px;' : 'max-height: 150px;'"
          >
            <b-spinner
              v-if="isLoading"
              variant="primary"
              label="Spinning"
              class="custom-spinner"
            ></b-spinner>
            <div
              :class="{ wrapper__file__log: true, 'mt-10': index ? true : false }"
              v-for="(file, i) in files"
              :key="i"
            >
              <div class="d-flex justify-content-between">
                <div class="d-flex">
                  <img class="icon__file" src="@/assets/images/icon-file.png" alt="icon-file" />
                  <div @click="_openUrl(file)">
                    <div class="text__file__log limit__text text-NTUC 2">
                      {{ file.name || 'Attachment' }}
                    </div>
                    <div class="text__date__file__log">
                      {{ _formatTime(createon) }}
                    </div>
                  </div>
                </div>
                <div :class="{ upload__disabled: isCheckSubmit }">
                  <img
                    @click="_removeFile(i)"
                    class="icon__close__round__light"
                    src="@/assets/images/Close_round_light.png"
                    alt="input-affix"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="pt-4 claim_noti" v-if="isShowNoti">
          <span class="first_claim_noti">{{ $t('claim.upload_size') }}</span>
        </div>
      </div>
    </div>
    <b-modal
      hide-header
      hide-footer
      v-model="showModal"
      size="lg"
      content-class="modal__none border-0"
      title="Overflowing Content"
    >
      <img :src="srcShowModal" width="100%" frameborder="0" alt="srcShowModal" />
    </b-modal>
  </div>
</template>

<script>
import Dropzone from 'nuxt-dropzone';

export default {
  name: 'UploadComponent',
  components: {
    Dropzone
  },
  props: {
    title: String,
    files: Array,
    isCheckSubmit: {
      type: Boolean,
      required: false,
      default: false
    },
    isTooltip: {
      type: Boolean,
      default: false
    },
    isInfoTooltip: {
      type: Boolean,
      default: false
    },
    textTooltip: {
      type: String,
      default: ''
    },
    isRequire: {
      type: Boolean,
      default: false
    },
    isLoading: {
      type: Boolean,
      default: false
    },
    isFS16: {
      type: Boolean,
      default: false
    },
    isBgGray: {
      type: Boolean,
      default: false
    },
    createon: {
      type: Date,
      required: false,
      default: new Date()
    },
    index: {
      type: Number,
      required: false,
      default: 0
    },
    isShowNoti: {
      type: Boolean,
      default: false
    },
    isDisable: {
      type: Boolean,
      default: false
    },
    isFontMedium: {
      type: Boolean,
      default: false
    }
  },

  data() {
    return {
      optionDropzone: {
        url: '/',
        acceptedFiles: '.jpeg,.jpg,.png,.gif,.pdf'
      },
      srcShowModal: '',
      showModal: false
    };
  },
  methods: {
    _handleUploadSuccess(file) {
      if(file.accepted) this.$emit('handleUploadSuccess', file, this.index);
    },
    _removeFile(i) {
      this.$emit('removeFile', i, this.index);
    },
    _formatTime(time) {
      return time ? this.$dayjs(time).format('DD MMM YYYY') : '';
    },
    _openUrl(file) {
      if (file.url) {
        if (file.name.slice(file.name.length - 3, file.name.length) === 'pdf') {
          window.open(process.env.IMAGE_URL + file.url);
        } else {
          this.srcShowModal = process.env.IMAGE_URL + file.url;
          this.showModal = true;
        }
      }
    }
  }
};
</script>
<style>
@media screen and (max-width: 440px) {
  .my-tooltip-inpatient .tooltip-inner {
    max-width: 300px !important;
  }
}
</style>
<style scoped>
@import '@/assets/css/fileUpload/index.css';

::v-deep .dropdown__log .dropzone .dz-message {
  margin: 0;
}

::v-deep .dropdown__log .vue-dropzone {
  background: #ECEFF1;
  height: 150px;
  width: 150px;
  border: 1px dashed var(--NTUC-3);
  position: relative;
  border-radius: 10px;
  padding: 20px 15px;
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
</style>
