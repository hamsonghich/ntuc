<template>
  <div>
    <input v-model="url" placeholder="Input Url" />
    <WebViewer :src="url" :key="url" />
  </div>
</template>

<script>
import WebViewer from '@/components/WebViewer.vue';
export default {
  components: {
    WebViewer
  },
  data: () => ({
    url: ''
  })
};
</script>
