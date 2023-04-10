<template>
  <div class="wrapper-block__alert">
    <div v-if="isShow" :class="{
      block__alert: true,
      block__alert__error: type === 'error' ? true : false,
      block__alert__warning: type === 'warning' ? true : false,
      block__alert__info: type === 'info' ? true : false
    }">
      <div class="block__icon__tick">
        <div class="text-16">
          <div v-html="alert" />
        </div>
      </div>
      <div>
        <b-icon @click="handleCloseAlert" class="icon__close__alert" icon="x-lg"/>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {}
  },
  props: {
    alert: String,
    isShow: Boolean,
    type: {
      type: String,
      required: true,
      default: 'success'
    }
  },
  methods: {
    handleCloseAlert() {
      this.$emit('handleCloseAlert');
    }
  }
}
</script>

<style scoped>
@import '@/assets/css/alertSuccess/index.css';
</style>