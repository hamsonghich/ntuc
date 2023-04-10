<template>
  <div class="notification_footer text-white bg-black px-3">
    <div class="d-flex mt-1">
      <div class="font__bold mr-2 font-700">{{ $t('footer.income_insurance_limited') }}</div>
      <div class="text-14 mt-1">{{ $t('footer.UEN') }}</div>
    </div>
    <div class="d-lg-flex d-block text-15">
      <div class="mr--10">{{ $t('footer.address') }}</div>
      <div class="d-flex flex-wrap mr-lg-2">
        <div class="d-flex align-items-center text-12 mr--10"><div class="rounded-circle circle bg-white mr--10"></div> Tel: 6788 1777</div>
        <div class="d-flex align-items-center text-12 mr--10"><div class="rounded-circle circle bg-white mr--10"></div>Fax: 6338 1500</div>
        <div class="d-flex align-items-center text-12 mr--10"><div class="rounded-circle circle bg-white mr--10"></div>Enquiries: income.com.sg/enquiry</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Footer'
};
</script>

<style scoped>
@import '@/assets/css/footer/index.css';
.circle{
  height: 10px;
  width: 10px;
}
</style>
