<template>
  <div class="layouts">
    <Nuxt class="page_body"/>
  </div>
</template>
<script>
import MobileAccess from '@/components/mobileAccess/index.vue';
export default {
  components: {
    MobileAccess
  }
};
</script>
<style scoped>
.layouts {
  display: flex;
  justify-content: space-between;
  height: 100%;
  min-height: 100vh;
}
.page_body {
  flex: 1;
}
</style>
