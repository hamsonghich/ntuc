<template>
  <div>
    <div class="f-title d-flex align-items-center text-NTUC-6 text-20 font__medium">
      {{ $t('benefit.personal_data') }}
    </div>
    <div class="text-16 font-400 policy-container text-justify line-height-20 text-black">
      <p>{{ $t('benefit.HDFormStep3.paragraph-1') }}</p>
      <br />
      <p>{{ $t('benefit.HDFormStep3.paragraph-2') }}</p>
      <ul>
        <li>
          {{ $t('benefit.HDFormStep3.paragraph-3') }}
        </li>
        <li>{{ $t('benefit.HDFormStep3.paragraph-4') }}</li>
      </ul>
      {{ $t('benefit.HDFormStep3.paragraph-5') }} <br />
      <br />
      {{ $t('benefit.HDFormStep3.paragraph-6') }}
    </div>
  </div>
</template>

<script>
export default {};
</script>