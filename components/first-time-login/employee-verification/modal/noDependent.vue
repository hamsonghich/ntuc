<template>
  <b-modal
    v-model="_modalShow"
    content-class="border-0"
    title-class="text-white"
    header-class="bg-NTUC-3"
    :title="$t('dashboard.information')"
    @hide="_modalShow = false"
    centered
    :no-close-on-backdrop="true"
  >
    <div class="text-14 text-gray--800">
      <div class="text-24 text-NTUC-6">{{ $t('dashboard.got_it') }}</div>
      <br />
      <div class="text-gray--800 text-16">
        {{ $t('benefit.i_understand_that_you_would') }}
      </div>
      <div class="text-gray--800 text-16 mt--20 mb--20" v-html="$t('benefit.no_dependent')"></div>
      <div
        class="text-gray--800 text-16 mt--20 mb--20"
        v-html="$t('benefit.your_dependent_details_not_updated')"
      ></div>
      <div
        class="text-gray--800 text-16 mt--20 mb--20"
        v-html="$t('benefit.if_you_want_continue')"
      ></div>
      <div
        class="text-gray--800 text-16 mt--20 mb--20"
        v-html="$t('benefit.once_you_have_updated_your_details')"
      ></div>
      <div class="text-gray--800 text-16 mt--20 mb--20" v-html="$t('benefit.see_you_soon')"></div>
    </div>
    <template #modal-footer>
      <div class="w-150">
        <b-button class="bg-NTUC-1" @click="goToLogin">
          {{ $t('benefit.update_first') }}
        </b-button>
        <b-button class="bg-NTUC-3" @click="goToBenefits">
          {{ $t('btn.Proceed') }}
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
      },
      goToBenefits() {
        this.modalShow=false;
        this.$emit('_handleRouteByMyself')
        //this.$router.push({name:'benefit-list-benefit'})
      }

    }
  };
  </script>