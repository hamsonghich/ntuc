<template>
  <div class="bg-NTUC-7 pt--30 pb--30 margin-auto d-flex align-items-center justify-content-center h-100">
    <div>
      <h1 class="text-48 text-NTUC-1 text-center">{{ $t('benefit.Wonderful') }}</h1>
      <h2 class="text-center mt--20">{{ $t('benefit.Please_let') }}</h2>
      <div class="mt--20">
        <b-button
          @click="_handleRouteByMyself"
          class="text-16 font__regular mt--5 btn__primary button__hover"
        >
          {{ $t('benefit.I_would_like_to_increase_coverage_for_Myself') }}
        </b-button>
        <b-button @click='handleRouteByDependents' class="text-16 button__hover font__regular mt--5 btn__primary ml-2 w-auto">
          {{ $t('benefit.I_Dependents') }}
        </b-button>
      </div>
    </div>
    <NoDependent :modalShow="modalShow" @handleModalShow="handleModalShow" @_handleRouteByMyself="_handleRouteByMyself" />
    <Loading
      :isLoading="isLoading" @handleIsLoading ="_handleIsLoading"
    />
    <b-modal
      v-model="modalShowEnrolmentdisclaimer"
      content-class="border-0"
      title-class="text-white"
      header-class="bg-NTUC-3"
      :title="$t('dashboard.Important_Notes_please_read')"
      size="xl"
      centered
    >
      <div class="text-20 text-gray--800 line-height-15">{{ $t('benefit.create.question') }}</div>
      <ol class="mt-3">
        <li>
          <div class="text-20 text-gray--800 line-height-15 my-2">
            {{ $t('benefit.create.question-1') }}
          </div>
        </li>
        <li>
          <div class="text-20 text-gray--800 line-height-15 my-2">
            {{ $t('benefit.create.question-2') }}
          </div>
        </li>
        <li>
          <div class="text-20 text-gray--800 line-height-15 my-2">
            {{ $t('benefit.create.question-3') }}
          </div>
        </li>
        <li>
          <div class="text-20 text-gray--800 line-height-15 my-2">
            {{ $t('benefit.create.question-4') }}
          </div>
        </li>
        <li>
          <div class="text-20 text-gray--800 line-height-15 my-2">
            {{ $t('benefit.create.question-5') }}
          </div>
        </li>
        <li>
          <div class="text-20 text-gray--800 line-height-15 my-2">
            {{ $t('benefit.create.question-6') }}
          </div>
        </li>
        <li>
          <div class="text-20 text-gray--800 line-height-15 my-2">
            {{ $t('benefit.create.question-7') }}
          </div>
        </li>
      </ol>
      <template #modal-footer>
        <div class="w-100">
          <b-button variant="primary" class="float-right bg-NTUC-3" @click="_redirect">
            {{ $t('btn.ok') }}
          </b-button>
        </div>
      </template>
    </b-modal>
  </div>
</template>

<script>
import { mapActions } from 'vuex';
import NoDependent from '../employee-verification/modal/noDependent.vue';
import Loading from '~/components/modal/loading.vue';

export default {
    data() {
      return {
        modalShow:false,
        isLoading:false,
        modalShowEnrolmentdisclaimer:false
      }
    },
    components: {
      NoDependent,
      Loading
    },
    methods: {
        ...mapActions("benefit", ["getListDependent"]),
        async handleRouteByDependents() {
            this.isLoading=true;
            let isError = false;
            let _employee_id = localStorage.getItem("staffid")
            try {
                const listDependent = await this.getListDependent({
                  invoke: "System.execute",
                  argc: "2",
                  a0: "API.FPG.EmployeeDpdt.GetInfo",
                  a1: {
                      employee_id: _employee_id
                  }
              });
              this.isLoading=false;
              if (!listDependent || !listDependent.length) {
                  this.modalShow = true;
              }
              else {
                  this.$router.push({ name: "first-time-login-benefit-create" });
              }
            }
            catch (error) {
              this.isLoading=false
              isError = true
              if(isError) {
                this.modalShow=true
              }
              return
            }
        },
        _handleRouteByMyself() {
          this.modalShowEnrolmentdisclaimer = true
        },
        handleModalShow() {
          this.isLoading=true;
        },
        _handleIsLoading() {
          this.modalShow=true
        },
        _redirect() {
          this.$router.push({ name: 'first-time-login-benefit-list-benefit' });
        }
    },
};

</script>

<style scoped>
@import '@/assets/css/button/index.css';
.button__hover:hover{
  background: var(--NTUC-1) !important;
  border: 1px solid var(--NTUC-1-light) !important;
  box-shadow: 0 0 0 0.2rem var(--NTUC-1-light) !important;
}
</style>
