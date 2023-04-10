<template>
  <div class="fullwidth">
    <div class="wrapper">
      <div class="inner" style="background: #F6F8F9;">
          <alert-success
            :alert="alertConfig.textAlert"
            :isShow="alertConfig.isShow"
            :type="alertConfig.typeAlert"
            @handleCloseAlert="_handleCloseAlert"
          />
        <div class="container__log d-flex">
          <SidebarMoreClaim/>
          <div class="cart__log">
            <div>
              <img
                @click="$router.push({ name: 'login' })"
                class="icon__close__dark icon__mobile cursor--pointer"
                src="@/assets/images/icon-close-dark.png"
                alt="icon-close-dark"
              />
            </div>
            <FlexClaimStepOne v-if="moreClaimStep == 1"/>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import FlexClaimStepOne from '~/components/claim/create/flexClaimStepOne.vue';
import FirstDetailClaim from '~/components/claim/create/firstDetailClaim.vue';
import SidebarMoreClaim from '~/components/claim/create/sidebarMoreClaim.vue';

export default {
  components: {
    FirstDetailClaim,
    SidebarMoreClaim,
    FlexClaimStepOne,
  },
  data: () => ({}),
  created(){
    this._closeAlertConfig();
  },
  computed: {
    ...mapGetters('claim', ['createStep', 'moreClaimStep']),
    ...mapGetters('alert', ['alertConfig'])
  },
  methods: {
    ...mapActions('claim', ['setMoreClaimStep', 'setCreateClaimError']),
    ...mapActions('alert', ['_changeAlertConfig']),
     _handleCloseAlert() {
      this.setCreateClaimError([]);
      this._closeAlertConfig();
    },
    _closeAlertConfig(){
      this._changeAlertConfig({
        isShow: false,
        typeAlert: 'success',
        textAlert: ''
      });
    }
  },
  destroyed() {
    this._closeAlertConfig();
  }
};
</script>

<style>
@import '@/assets/css/claim/controlClaim.css';
@import '@/assets/css/claim/log.css';
@import '@/assets/css/inputCustom/inputCustom.css';
@import '@/assets/css/claim/stepOneLog.css';
</style>
