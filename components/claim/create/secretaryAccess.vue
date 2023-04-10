<template>
  <div class="d-flex justify-content-between h-100">
    <div class="wrapper__content__quick__log">
      <div class="wrapper__content">
        <div class="title__quick__log">{{ 'Thank you' }},</div>
        <div class="question__quick__log">{{ 'Will you be claiming as proxy today?' }}</div>
        <div class="wrapper_checkbox_log__supp wrapper_checkbox_quick_log">
          <b-form-group class="ui check_box_claim" label-class="re">
            <b-form-radio
              size="lg"
              v-for="(item, index) in listType"
              :key="index"
              :value="item.id"
              class="mb-2"
              v-model="claimTypeHR"
            >
              {{ item.name }}
            </b-form-radio>
          </b-form-group>
        </div>
      </div>
      <div class="quick-log-btn">
        <button type="button" @click="_nextStep" class="btn btn__claim button__log _btn_next_claim">
          Next
        </button>
      </div>
    </div>
    <quoteClaim />
  </div>
</template>

<script>
  import { mapGetters, mapActions } from 'vuex';
  import quoteClaim from '../quoteClaim.vue';

  export default {
    components: {
      quoteClaim
    },
    data: () => ({
      claimTypeHR: '',
      listType: [
        {
          id: 1,
          name: 'No, I am claiming for myself'
        },
        {
          id: 2,
          name: 'Yes, I will be claiming for others'
        }
      ]
    }),
    methods: {
      ...mapActions('claim', [
        'setCreateClaimStep',
        'setCreateStepClaimInfor',
        'setEntitiesClaim',
        'setEntityActiveClaim',
        '_setStepList'
      ]),
      _nextStep() {
        if(!this.claimTypeHR) return;
        if (this.claimTypeHR == 1) {
          return this.setCreateClaimStep(2);
        }
        return this.setCreateClaimStep('1.1.2');
      },
    },
    computed: {
      ...mapGetters('claim', ['createStep', 'createClaimStepInfor'])
    }
  };
</script>

<style scoped>
  @import '@/assets/css/inputCustom/inputCustom.css';
  @import '@/assets/css/claim/create/firstClaim.css';
  @import '@/assets/css/quick-log/stepContent.css';

  .checkbox-claim >>> .custom-checkbox {
    padding: 0;
  }

  .checkbox-claim >>> .custom-control-label {
    font-family: Ubuntu-Light, Tahoma, sans-serif;
    font-style: normal;
    font-weight: 300;
    font-size: 20px;
    line-height: 150%;
    color: var(--NTUC-8);
  }
  .check_box_claim {
    margin-left: 6px;
  }
</style>
