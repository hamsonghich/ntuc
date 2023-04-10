<template>
  <div class="header_title font__medium text-24 d-flex align-items-center">{{ title }}</div>
</template>
<script>
export default {
  name: 'HeaderTitle',
  props: {
    title: {
      type: String,
      required: true
    }
  }
}
</script>
<style scoped>
@import '@/assets/css/headerTitle/index.css';
</style>>


