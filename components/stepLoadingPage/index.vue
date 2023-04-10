<template>
  <div>
    <b-modal
      id="modal-tall"
      class="model"
      :hide-header="true"
      content-class="contenLoading"
      :hide-footer="true"
      v-model="show"
      centered
    >
      <div class="d-flex justify-content-center mb-3">
        <b-spinner style="width: 3rem; height: 3rem" label="Loading..."></b-spinner>
      </div>
    </b-modal>
  </div>
</template>

<script>
  export default {
    props: {
      show: {
        type: Boolean,
        default: true
      }
    }
  };
</script>

<style>
  .contenLoading {
    background: none !important;
    border: none !important;
  }
  @media screen and (max-width: 768px) {
  .modal-dialog-centered {
    align-items: center !important;
    position: relative;
    top: 30px;
  }
  }
</style>
