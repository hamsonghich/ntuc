<template>
  <div class="stepper ml--50 d-flex flex-column">
    <div class="step__one__web">
      <div class="title__log__step font__medium text-20 mb-3">{{ $route.path === '/quick-claim' ?  $t('claim.your_claim') :$t('log.your_log')}}</div>
      <div class="wap-step">
        <div class="d-flex">
          <div class="d-flex flex-column pr-16 align-items-center">
            <div :class="{
              'rounded-circle': true,
              'py-2': true,
              'px-3': true,
              'text-white': true,
              'text__step__log font__regular text--16 d-flex justify-content-center align-items-center': true,
              'bg__primary': (step == 1.1 || step == 1.2 || step == 1.3 || step == 2 || step == 3) ? true : false,
              'bg__disabled': (step == 1.1 || step == 1.2 || step == 1.3 || step == 2 || step == 3) ? false : true,
            }">
              1
            </div>
            <div :class="{
            'line': true,
            'h-100': true,
            'bg__primary': (step == 1.1 || step == 1.2 || step == 1.3 || step == 2 || step == 3) ? true : false,
            'bg__disabled': (step == 1.1 || step == 1.2 || step == 1.3 || step == 2 || step == 3) ? false : true,
          }" />
          </div>
          <div class="ml--15">
            <div class="title__step__log text--20 mb--2 font__regular">{{ $route.path === '/quick-claim' ?  $t('claim.your_claim') :$t('log.details')}}</div>
            <p class="content__step__log  mb--28 text-14 font__regular">{{ $route.path === '/quick-claim' ? $t('claim.content_step_1') : $t('log.fill_in_log_information')}}</p>
          </div>
        </div>
        <div class="d-flex">
          <div class="d-flex flex-column pr-16 align-items-center">
            <div :class="{
              'rounded-circle': true,
              'py-2': true,
              'px-3': true,
              'text-white': true,
              'text__step__log text__step__log font__regular text--16 d-flex justify-content-center align-items-center': true,
              'bg__primary': (step == 2 || step == 3) ? true : false,
              'bg__disabled': (step == 2 || step == 3) ? false : true,
            }">
              2
            </div>
          </div>
          <div class="ml--15">
            <div class="title__step__log text-16 mb--2  font__regular">{{$t('log.complete')}}</div>
            <p class="content__step__log mb--28 text-14 font__regular">{{ $route.path === '/quick-claim' ? $t('claim.content_step_3') : $t('log.content_step_3')}}</p>
          </div>
        </div>
      </div>
    </div>
    <div class="d-none">
      <div class="title__log__step text--20 font__medium mb-3">{{ $route.path === '/quick-claim' ?  $t('claim.your_claim') :$t('log.your_log')}}</div>
      <div class="d-flex align-items-center d--none">
        <b-icon @click="_previous" class="icon__chevron__left" icon="chevron-left" />
        <div v-if="stepMobile === 1" class="d-flex wrapper__content__step">
          <div class="d-flex flex-column pr-16 align-items-center">
            <div :class="{
                'rounded-circle': true,
                'py-2': true,
                'px-3': true,
                'text-white': true,
                'text__step__log text__step__log font__regular text--16 d-flex justify-content-center align-items-center': true,
                'bg__primary': (step == 1.1 || step == 1.2 || step == 1.3 || step == 2 || step == 3) ? true : false,
                'bg__disabled': (step == 1.1 || step == 1.2 || step == 1.3 || step == 2 || step == 3) ? false : true,
              }">
              1
            </div>
          </div>
          <div class="ml--15">
            <div class="title__step__log text-16 mb--2 "> {{ $route.path === '/quick-claim' ?  $t('claim.your_claim') :$t('log.your_log')}}</div>
            <p class="content__step__log  mb--28 text-14">{{$t('log.content_step_1')}}</p>
          </div>
        </div>
        <div v-if="stepMobile === 2" class="d-flex wrapper__content__step">
          <div class="d-flex flex-column pr-16 align-items-center">
            <div :class="{
                'rounded-circle': true,
                'py-2': true,
                'px-3': true,
                'text-white': true,
                'text__step__log text__step__log font__regular text--16 d-flex justify-content-center align-items-center': true,
                'bg__primary': (step == 2 || step == 3) ? true : false,
                'bg__disabled': (step == 2 || step == 3) ? false : true,
              }">
              2
            </div>
          </div>
          <div>
            <div class="title__step__log text--20 mb--2 ">{{$t('log.details')}}</div>
            <p class="content__step__log  mb--28 text--14">{{$t('log.content_step_2')}}</p>
          </div>
        </div>
        <div v-if="stepMobile === 3" class="d-flex wrapper__content__step">
          <div class="d-flex flex-column pr-16 align-items-center">
            <div :class="{
                'rounded-circle': true,
                'py-2': true,
                'px-3': true,
                'text-white': true,
                'text__step__log text__step__log font__regular text--16 d-flex justify-content-center align-items-center': true,
                'bg__primary': (step == 3) ? true : false,
                'bg__disabled': (step == 3) ? false : true,
              }">
              3
            </div>
          </div>
          <div>
            <div class="title__step__log text--20 mb--2 ">{{$t('log.complete')}}</div>
            <p class="content__step__log  mb--28 text--16">{{$t('log.content_step_3')}}</p>
          </div>
        </div>
        <b-icon @click="_next" class="icon__chevron__left" icon="chevron-right" />
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  data: () => ({
    stepMobile: 1,
  }),
  computed: {
    ...mapGetters('log', [
      'step',
    ])
  },
  methods: {
    _previous() {
      if (this.stepMobile === 1) return;
      this.stepMobile = this.stepMobile - 1;
    },
    _next() {
      if (this.stepMobile === 3) return;
      this.stepMobile = this.stepMobile + 1;
    },
  },
  watch: {
    'step': function(newVal) {
      switch(newVal) {
        case 1.1:
        case 1.2:
        case 1.3:
        case 1.4:
        case 1: {
          this.stepMobile = 1
          break;
        }
        case 2: {
          this.stepMobile = 2
          break;
        }
        case 3: {
          this.stepMobile = 3
          break;
        }
      }
    }
  },
}
</script>

<style scoped>
@import '@/assets/css/log/stepVertical.css';
</style>
