<template>
  <b-modal
    v-model="_modalShow"
    content-class="border-0"
    title-class="text-white"
    header-class="bg-NTUC-3"
    :title="$t('dashboard.information')"
    @hide="_modalShow = false"
    centered
  >
    <div class="text-14 text-gray--800">
      <div class="text-24 text-NTUC-6">{{$t('dashboard.got_it')}}</div>
      <br />
      <div class="text-gray--800 text-16">
        {{$t('dashboard.i_understand_that_you_would')}}
      </div>
      <div class="text-gray--800 text-16 mt--20 mb--20" v-html="$t('dashboard.please_proceed_to_update')">
      </div>
      <div class="text-gray--800 text-16 mt--20 mb--20">
        {{$t('dashboard.as_your_details_has_not_been_updated')}}
      </div>
      <div class="text-gray--800 text-16 mt--20 mb--20" v-html="$t('dashboard.once_you_have_updated_your_details')">
      </div>
      <div class="text-gray--800 text-16 mt--20 mb--20">
        {{$t('dashboard.see_you_soon')}}
      </div>
    </div>
    <template #modal-footer>
      <div class="w-100">
        <b-button variant="primary" class="float-right bg-NTUC-3" @click="goToLogin()">
          {{ $t('btn.ok') }}
        </b-button>
      </div>
    </template>
  </b-modal>
</template>

<script>
export default {
  props: ['modalShow'],
  computed: {
    _modalShow: {
      get: function () {
        return this.modalShow;
      },
      set: function (value) {
        this.$emit('handleModalShow', value);
      }
    }
  },
  methods: {
    goToLogin() {
      this._modalShow = false;
      localStorage.clear();
      this.$router.push({ name: 'login' });
    }
  }
};
</script>