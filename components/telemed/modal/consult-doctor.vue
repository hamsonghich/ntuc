<template>
  <b-modal
    v-model="showDialog"
    header-bg-variant="primary"
    header-class="modal-header bg-MMB-2"
    title-class="modal-title title"
    footer-class="modal-footer footer"
    centered
    button-size="sm"
    :no-close-on-backdrop="true"
  >
    <template #modal-header="{ close }">
      <h5 id="modal-footer-sm___BV_modal_title_" class="modal-title text-20">
        {{
          tab == 1
            ? 'Please note'
            : tab == 2
            ? 'Information - Routing to Third Party Website'
            : 'Unable to access HeyAlly'
        }}
      </h5>
      <button type="button" aria-label="Close" class="close" @click="close()">
        <b-icon icon="x-lg" class="setIcon" />
      </button>
    </template>
    <div v-if="tab == 1">
      <div class="line-height-15">
        You will be accessing HeyAlly for {{ dependants.name ? dependants.name : 'Myself' }}
      </div>
      <div class="line-height-15 my-4">Would you like to continue?</div>
    </div>
    <div v-if="tab == 2">
      <div class="line-height-15">{{ thirdpartyredirectprompt }}</div>
    </div>
    <div v-else>
      <div class="my-2 line-height-15">{{ check }}</div>
    </div>
    <template #modal-footer>
      <b-button size="sm" class="confirmBut text-white bg-primary" @click="_confirm"> Ok </b-button>
    </template>
  </b-modal>
</template>

<script>
import { mapActions } from 'vuex';

export default {
  props: ['showDialog', 'close', 'dependants', 'checkDependent'],
  data() {
    return {
      tab: 1,
      check: '',
      thirdpartyredirectprompt: localStorage.getItem('thirdpartyredirectprompt')
    };
  },
  methods: {
    ...mapActions('telemed', ['_getLink']),
    async _confirm() {
      if (this.tab == 1) {
        this.tab = 2;
      } else if (this.tab == 2) {
        const res = await this._getLink({
          invoke: 'System.execute',
          argc: '2',
          a0: 'API.HeyAlly.getLink',
          a1: {
            empid: this.checkDependent ? localStorage.getItem('empid') : '',
            dependentid: this.checkDependent ? this.dependants.id : localStorage.getItem('empid')
          }
        });
        if (!res[0]) {
          this.tab = 3
          this.check = res[1];
        } else {
          this.close();
          window.open(res[1], '_blank').focus();
        }
      } else {
        this.close();
      }
    }
  }
};
</script>

<style scoped>
.modal-title {
  color: #fcfdff;
}
.setIcon {
  height: 16px;
  width: 16px;
}
.confirmBut {
  color: var(--color-white);
  padding: 7px 13px;
}
</style>