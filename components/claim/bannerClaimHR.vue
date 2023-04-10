<template>
  <div class="wrapper__banner__claim">
    <div class="card-wrapper">
      <img
        class="background-image mb-5"
        src="@/assets/images/image-claim.png" alt="image-claim"
      >
      <div class = "card-center">
        <status-card
          class="card_SUBMITTED"
          :isHightlight="pendingsubmission.isHighlight"
          status="SUBMITTED"
          :number="listStatus.find(item => item.name == 'Submitted') && listStatus.find(item => item.name == 'Submitted').count"
          :price="listStatus.find(item => item.name == 'Submitted') && listStatus.find(item => item.name == 'Submitted').amount"
        />
        <status-card
          class="card_PROCESSING"
          :isHightlight="processing.isHighlight"
          status="PROCESSING"
          :number="listStatus.find(item => item.name == 'Processing') && listStatus.find(item => item.name == 'Processing').count"
          :price="listStatus.find(item => item.name == 'Processing') && listStatus.find(item => item.name == 'Processing').amount"
        />
        <status-card
          class="card_APPROVED"
          :isHightlight="approved.isHighlight"
          status="APPROVED"
          :number="listStatus.find(item => item.name == 'Approved') && listStatus.find(item => item.name == 'Approved').count"
          :price="listStatus.find(item => item.name == 'Approved') && listStatus.find(item => item.name == 'Approved').amount"
        />
        <status-card
          class="card_PAID"
          :isHightlight="paid.isHighlight"
          status="PAID"
          :number="listStatus.find(item => item.name == 'Paid') && listStatus.find(item => item.name == 'Paid').count"
          :price="listStatus.find(item => item.name == 'Paid') && listStatus.find(item => item.name == 'Paid').amount"
        />
        <status-card
          class="card_REJECTED"
          :isHightlight="rejected.isHighlight"
          status="REJECTED"
          :number="listStatus.find(item => item.name == 'Rejected') && listStatus.find(item => item.name == 'Rejected').count"
          :price="listStatus.find(item => item.name == 'Rejected') && listStatus.find(item => item.name == 'Rejected').amount"
        />
        <status-card
          class="card_REQ"
          :isHightlight="reqforInfo.isHighlight"
          status="REQ FOR INFO"
          :number="listStatus.find(item => item.name == 'Req for Info') && listStatus.find(item => item.name == 'Req for Info').count"
          :price="listStatus.find(item => item.name == 'Req for Info') && listStatus.find(item => item.name == 'Req for Info').amount"
        />
        <img class="vector-6" src="@/assets/images/Vector 6.png" alt="vector-6" />
        <img class="arrow_1" src="@/assets/images/Arrow_icon.png" alt="arrow_1" />
        <img class="arrow_2" src="@/assets/images/Arrow_icon.png" alt="arrow_2" />
        <img class="vector-13" src="@/assets/images/vector_13.png" alt="vector-13" />
        <img class="arrow_btm_left" src="@/assets/images/arrow_btm.png" alt="arrow_btm_left" />
        <img class="arrow_btm_right" src="@/assets/images/arrow_btm.png" alt="arrow_btm_right" />
        <img class="vector_7" src="@/assets/images/Vector_7.png" alt="vector_7" />
        <img class="vector_9_top" src="@/assets/images/Vector_9.png" alt="vector_9_top" />
        <img class="vector_9_bottom" src="@/assets/images/Vector_9.png" alt="vector_9_bottom" />
        <img class="arrow_3" src="@/assets/images/Arrow_icon.png" alt="arrow_3" />
        <img class="arrow_4" src="@/assets/images/Arrow_icon.png" alt="arrow_4" />
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import statusCard from '~/components/claim/statusCard.vue';

export default {
  components: {
    statusCard,
  },
  data: () => ({
    approved: {
      isHighlight: false,
    },
    submitted: {
      isHighlight: false
    },
    processing: {
      isHighlight: false
    },
    reqforInfo: {
      isHighlight: false
    },
    rejected: {
      isHighlight: false
    },
    paid: {
      isHighlight: false
    },
    converted: {
      isHighlight: false
    },
    pendingInsurer: {
      isHighlight: false
    },
    HrApproval: {
      isHighlight: false
    },
    HrVerification: {
      isHighlight: false
    },
    pendingsubmission: {
      isHighlight: false
    },
  }),
  computed: {
    ...mapGetters('claim', [
      'listStatus',
    ])
  }
}
</script>

<style scoped>
@import '@/assets/css/claim/bannerClaim.css';
</style>