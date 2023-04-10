<template>
  <div class="w-100 d-flex">
    <div class="d-flex flex-column justify-content-center align-items-flex-start confirm_container">
      <div class="pl--86">
        <div class="content ">
          <div class="text-NTUC-3 text-56">{{ $t('confirm.nice') }}</div>
          <div class="text-18 text-gray--800 mt--30">
            {{ $t('confirm.your_coverage_shall_commence') }}
          </div>
          <div class="text-18 text-gray--800 mt--20">
            {{ $t('confirm.if_you_have_any_further_questions') }}
          </div>
        </div>
        <div>
          <button
            class="btn__log_out text-16 bg-NTUC-3 border-0 text-white rounded"
            @click="$router.push({ name: 'login' })"
          >
            {{ $t('confirm.log_me_out') }}
          </button>
        </div>
      </div>
    </div>
    <div class="bg__img"></div>
  </div>
</template>

<script>
export default {
  layout: 'first-time-login',
};
</script>

<style scoped>
@import '@/assets/css/first-time-login/confirm/index.css';
</style>