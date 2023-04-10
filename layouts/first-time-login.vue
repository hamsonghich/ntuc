<template>
  <div class="layouts">
    <TheHeader/>
    <Nuxt class="page_body"/>
    <TheFooter/>
  </div>
</template>

<script>
import TheHeader from '../components/header/index.vue';
import TheFooter from '../components/footer/index.vue';
import MobileAccess from '@/components/mobileAccess/index.vue';
export default {
  components: {
    TheHeader,
    TheFooter,
    MobileAccess
  },
}
</script>
<style scoped>
.layouts {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100%;
  min-height: 100vh;
}
.page_body {
  flex: 1;
}
</style>

