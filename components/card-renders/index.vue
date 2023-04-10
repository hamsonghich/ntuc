<template>
  <div class="mt-2 mb-4">
    <magic-grid :maxCols='3' :maxColWidth="354" :gap="10">
      <div class="card card-custom" v-for="(item, index) in cardRenders" :key="index">
        <img class="img-first-row w-100" :src="handleImage(item.banner_image)" alt="" />
        <div class="card-body descrip-text">
          <h4 class="descrip-name font__medium text-24 font-500">{{ item.name }}</h4>
          <div class="mb--20">
            <span class="text-gray--900 text-color-default">{{ item.description }} </span>
          </div>
          <div v-if="handleAttachment(item.attachments[0]).length > 0">
            <div class="span-title mt-2 mb-2" v-for="(child, indexchild) in item.attachments" :key="indexchild">
              <a
                class="text-info-400"
                :href="`${handleAttachment(
                  item.attachments.length > 0 ? child.attachment : ''
                )}`"
                target="blank"
                >{{ item.attachments.length > 0 ? child.name : '' }} </a
              >
            </div>
          </div>
          <div class="d-flex justify-content-end container-button position-absolute">
            <button
              v-if="item.url.length"
              type="button"
              class="btn button__log text-16 btn-form-builder text-white"
            >
              <a class="text-info-400 text-white" :href="item.url" target="blank">{{
                $t('online-resources.Visit')
              }}</a>
            </button>
          </div>
        </div>
      </div>
    </magic-grid>
  </div>
</template>

<script>
export default {
  props: ['cardRenders'],
  data() {
    return {
      slide: 0
    };
  },
  methods: {
    handleImage(image) {
      if (!image) {
        return 'No image found';
      } else {
        return `${process.env.IMAGE_URL}` + image;
      }
    },
    handleAttachment(attachment) {
      if (!attachment) {
        return '';
      } else {
        return `${process.env.IMAGE_URL}` + attachment;
      }
    }
  }
};
</script>

<style scoped>
@import '@/assets/css/card-readers/index.css';
</style>