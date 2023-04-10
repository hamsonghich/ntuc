<template>
  <div class="layouts bg-NTUC-7">
    <TheHeader />
    <div class="d-flex h-auto container page_body bg-NTUC-7 pb--30 pt--30">
      <SidebarMenu />
      <Nuxt />
    </div>
    <TheFooter />
  </div>
</template>

<script>
import SidebarMenu from '../components/sidebarMenu/index.vue';
import TheHeader from '../components/header/index.vue';
import TheFooter from '../components/footer/index.vue';
import MobileAccess from '@/components/mobileAccess/index.vue';
export default {
  components: {
    TheHeader,
    TheFooter,
    MobileAccess,
    SidebarMenu
  },
};
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

