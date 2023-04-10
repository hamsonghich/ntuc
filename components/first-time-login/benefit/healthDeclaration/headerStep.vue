<template>
  <div>
    <div class="d-none d-sm-block">
      <div class="progressbar w-100 d-table">
        <div
          v-for="(step, index) in entitiesStep"
          :key="index"
          class="position-relative text-center"
          :class="{ complete: index < currentStep - 1, active: index == currentStep - 1 }"
        >
          {{ step.title }}
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    currentStep: Number,
    mobileStep: Number
  },
  data: () => ({
    entitiesStep: [
      { id: 1, title: 'Your Family History' },
      { id: 2, title: 'Your Consent' },
      { id: 3, title: 'Your Declaration' }
    ]
  }),
  methods: {}
};
</script>

<style scoped>
@import '@/assets/css/first-time-login/benefit/familyForm.css';
</style>
