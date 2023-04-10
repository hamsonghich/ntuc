<template>
  <div class="d-flex justify-content-between p--20">
    <div>
      <div class="font__medium text-32 text-color-ntuc-1 mt--100 ml--100">
        {{ $t('claim.Excellent') }}
      </div>
      <div class="font__medium text-20 text-color-ntuc-1 mt--40 ml--100 w--380">
        {{ $t('log.your_letter_of_guarantee_request') }}
      </div>
      <div class="font__medium text-20 text-20 mt--60 ml--100 w--380">
        <span>I have received your claim submission. Your claim ref is</span>
        <span class="text-color-ntuc-1">
          {{ log.referenceNo }}
        </span>
      </div>
      <div class="font__regular text-color-ntuc-1 text-14 ml--100 mt--30">
        <span class="font__regular text-color-ntuc-1 text-14 mr--5">
          {{ $t('log.print_a_copy') }}
        </span>
        <b-icon
          style="color: var(--NTUC-1)"
          font-scale="1.2"
          icon="printer"
          class="icon-printer cursor_pointer"
        />
      </div>
      <button @click="addMore" type="button" class="btn button--log ml--100 mt--50 text-16">
        {{ $t('claim.add_more') }}
      </button>
    </div>
    <div class="contain-img-bg d-flex flex-direction-column justify-content-center">
      <div>
        <div class="text-title-log font-500 font__regular text-32 text-center text-white">
          Your log request is underway
        </div>
        <div class="w-100 wrapper-img-log d-flex justify-content-center align-items-center">
          <div class="wrapper-img-log__child">
            <img class="w-100 h-100" src="@/assets/images/icon-protect.png" alt="image-claim" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import { mapGetters, mapActions } from 'vuex';
  export default {
    computed: {
      ...mapGetters('log', ['log'])
    },
    methods: {
      ...mapActions('log', ['changeStep']),
      addMore() {
        this.changeStep(1.1);
      }
    }
  };
</script>

<style scope>
  .contain-img-bg {
    width: 38% !important;
    height: 646px !important;
    min-width: 400px;
    background: #0087e280;
    padding-left: 63px;
    padding-right: 63px;
  }
  .text-title-log {
    margin-top: 133px;
  }
  .wrapper-img-log__child {
    min-height: 200px;
    min-width: 200px;
    max-width: 300px;
    max-height: 300px;
  }
  @media only screen and (max-width: 1440px) {
    .wrapper-img-log__child {
      max-width: 200px !important;
      max-height: 200px !important;
    }
  }

  .min_h_686 {
    min-height: 686px !important;
  }
  .w--380 {
    width: 380px;
  }
  .button--log {
    background: var(--NTUC-primary) !important;
    color: var(--white) !important;
    border-radius: 4.8px;
    padding: 8px 15px !important;
  }

</style>
