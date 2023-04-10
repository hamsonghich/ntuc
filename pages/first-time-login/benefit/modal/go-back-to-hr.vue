<template>
    <b-modal
      v-model="modalShow"
      content-class="border-0"
      title-class="text-white"
      header-class="bg-NTUC-3"
      :title="$t('dashboard.information')"
      :no-close-on-backdrop="true"
      centered
    >
      <div class="text-14 text-gray--800" v-html="$t('benefit.go_to_back_hr')">
      </div>
      <template #modal-footer>
        <div class="w-100">
          <b-button variant="primary" class="float-right bg-NTUC-3" @click="$router.push({name:'first-time-login-benefit'})">
            {{ $t('btn.ok') }}
          </b-button>
        </div>
      </template>
    </b-modal>
</template>

<script>
export default {
  layout: 'first-time-login',
  props:['isShowModal'],
  computed: {
    modalShow: {
      get: function () {
        return this.isShowModal;
      },
      set: function (value) {
        this.$emit('_handleIsShowModal', value);
      }
    }
  },
}
</script>