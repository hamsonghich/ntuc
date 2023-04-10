<template>
  <b-modal
    v-model="isShowModal"
    title="Mobile devices not supported"
    header-class="information-dialog-header bg-NTUC-3 text-white"
    content-class="content-class"
    body-class="body-class"
    top
    size="lg"
    :hide-footer="true"
    :hide-header-close="true"
    :no-close-on-backdrop="true"
  >
    <div class="text-gray--800 text-20 font__regular line-height-16">
      For a better experience, access this site via a desktop, laptop or tablet/iPad instead of a mobile device.
    </div>
  </b-modal>
</template>
<script>
export default {
  computed: {
    isShowModal(){
      return this.$device.isMobile || false;
    }
  }
};
</script>
<style>
div:has(.content-class) {
  max-width: none;
  margin: 0;
  width: 100%;
}
</style>
