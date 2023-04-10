<template>
  <div>
    <div class="f-title d-flex align-items-center text-NTUC-6 text-20 font__medium">
      {{ $t('benefit.personal_data') }}
    </div>
    <div
      class="policy-container text-justify font-400 text-16 font__regular line-height-20 text-black"
    >
      {{ $t('benefit.HDFormStep2.I_cannot') }} <br />
      <br />
      {{ $t('benefit.HDFormStep2.I_confirm') }}<br />
      {{ $t('benefit.HDFormStep2.confirm-a') }} <br />
      {{ $t('benefit.HDFormStep2.confirm-b') }} <br />
      {{ $t('benefit.HDFormStep2.I_authorise') }}
      <ul>
        <li>{{ $t('benefit.HDFormStep2.authorise-a') }}</li>
        <li>{{ $t('benefit.HDFormStep2.authorise-b') }}</li>
      </ul>
      <br />
      {{ $t('benefit.HDFormStep2.For_the_purpose') }}
      <ul class="purpose-contain pl-4">
        <li>
          {{ $t('benefit.HDFormStep2.purpose-a') }}
        </li>
        <li>
          {{ $t('benefit.HDFormStep2.purpose-b') }}
        </li>
        <li>
          {{ $t('benefit.HDFormStep2.purpose-c') }}
        </li>
      </ul>
      {{ $t('benefit.HDFormStep2.confirm_authorised') }}
      <br />
      {{ $t('benefit.HDFormStep2.I_agree') }}<br />
      <br />
      {{ $t('benefit.HDFormStep2.I_declare') }}<br />
      <br />
      {{ $t('benefit.HDFormStep2.I_can_confirm') }}<br />
      <br />
      {{ $t('benefit.HDFormStep2.I_acknowledge') }}<br />
      <br />
      <p class="font-700">
        {{ $t('benefit.HDFormStep2.agree_that_if') }}
      </p>
    </div>
    <div class="font__regular text-16 font-500">
      <b-form-checkbox @change="handleConfirm(isConfirm)" v-model="isConfirm">
        {{ $t('benefit.confirm') }}
      </b-form-checkbox>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isConfirm: false
    };
  },
  methods: {
    handleConfirm(value) {
      this.$emit('handleConfirm', value);
    }
  }
};
</script>