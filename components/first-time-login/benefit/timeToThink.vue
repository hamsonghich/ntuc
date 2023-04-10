<template>
    <b-modal
      v-model="modalTimeToThinkShow"
      content-class="border-0"
      title-class="text-white"
      header-class="bg-NTUC-3"
      :title="$t('dashboard.information')"
      @hide="modalTimeToThinkShow = false"
      centered
    >
      <div class="text-14 text-gray--800">
        <div class="text-24 text-NTUC-6">{{ $t('dashboard.got_it') }}</div>
        <br />
        <div class="text-gray--800 text-16">
          {{ $t('benefit.I_understand') }}{{ $t('benefit.dont_worry') }}
        </div>
        <div class="text-gray--800 text-16 mt--20 mb--20" v-html="$t('benefit.take_your_time_come_back')"></div>
        <div
          class="text-gray--800 text-16 mt--20 mb--20"
          v-html="$t('benefit.take_care')"
        ></div>
        <div
          class="text-gray--800 text-16 mt--20 mb--20"
          v-html="$t('benefit.back_to_login')"
        ></div>
        <div
          class="text-gray--800 text-16 mt--20 mb--20"
          v-html="$t('benefit.thank_you')"
        ></div>
        <div class="text-gray--800 text-16 mt--20 mb--20" v-html="$t('benefit.see_you_soon')"></div>
      </div>
      <template #modal-footer>
        <div class="w-150">
          <b-button class="bg-NTUC-3" @click="goToLogin">
            {{ $t('btn.ok') }}
          </b-button>
        </div>
      </template>
    </b-modal>
  </template>
    
    <script>
    export default {
      props: ['modalTimeToThinkShow'],
      computed: {
        _modalShow: {
          get: function () {
            return this.modalTimeToThinkShow;
          },
          set: function (value) {
            this.$emit('handleModalShow', value);
          }
        }
      },
      methods: {
        goToLogin() {
          this.modalTimeToThinkShow = false;
          localStorage.clear();
          this.$router.push({ name: 'login' });
        }
      }
    };
    </script>