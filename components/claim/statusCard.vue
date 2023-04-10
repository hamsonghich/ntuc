<template>
  <v-card elevation="0" class="status-item" :class="`${status} ${!!isHightlight ? 'highlight' : ''}`">
    <div class="pd-14">
      <div class="d-flex align-items-center">
        <img alt="image" v-if="status === 'PENDING SUBMISSION'" class="icon_img mr-2" src="@/assets/images/pending_icon.png" />
        <img alt="image" v-if="status === 'APPROVED'" class="icon_img mr-2" src="@/assets/images/approve_icon.png" />
        <img alt="image" v-if="status === 'PAID'" class="icon_img mr-2" src="@/assets/images/paid_icon.png" />
        <img alt="image" v-if="status === 'PENDING INSURER'" class="icon_img mr-2" src="@/assets/images/umbrella_logo.png" />
        <img alt="image" v-if="status === 'PROCESSING'" class="icon_img mr-2" src="@/assets/images/process_icon.png" />
        <img alt="image" v-if="status === 'REJECTED'" class="icon_img mr-2" src="@/assets/images/reject_icon.png" />
        <img alt="image" v-if="status === 'REQ FOR INFO'" class="icon_img mr-2" src="@/assets/images/req_icon.png" />
        <img alt="image" v-if="status === 'SUBMITTED'" class="icon_img mr-2" src="@/assets/images/submit_icon.png" />
        <img alt="image" v-if="status === 'HR VERIFICATION'" class="icon_img mr-2" src="@/assets/images/HR Verification.png" />
        <img alt="image" v-if="status === 'HR APPROVAL'" class="icon_img mr-2" src="@/assets/images/HR approval.png" />
        <div v-if="number || number == 0" class="item-number">{{ Number(number) }}</div>
        <div v-else class="item-number"></div>
      </div>
      <p v-if="price || price == 0" class="item-content">
        <span class="mr-1">$</span><span>{{_formatMoneyClaim(price)}}</span>
      </p>
      <p v-else class="item-content"><span class="mr-1"></span><span></span></p>
      <div class="card_chip" :style="{'background-color': chipBackgroundColor, 'color': getColor}">
        <span class="text-status">{{ status }}</span>
      </div>
    </div>
  </v-card>
</template>
<script>
import { formatMoneyClaim } from '../../utils/functions/formatMoney';

export default {
  data: () => ({}),
  props: {
    isHightlight: {
      type: Boolean,
      default: () => false,
    },
    status: {
      type: String,
    },
    number: {
      type: [Number, String],
      default: 0,
    },
    price: {
      type: [Number, String],
      default: 0,
    }
  },
  computed: {
    getColor() {
      if (this.status.toUpperCase() === 'SUBMITTED' 
        || this.status.toUpperCase() === 'HR APPROVAL' 
        || this.status.toUpperCase() === 'HR VERIFICATION' 
        || this.status.toUpperCase() === 'HR APPROVAL'
        || this.status.toUpperCase() === 'PENDING SUBMISSION') {
        return '#3f3f3f3'
      } else return '#ffff'
    },
    chipBackgroundColor() {
      switch (this.status.toUpperCase()) {
        case 'HR APPROVAL':
          return '#FFCA28'
        case 'HR VERIFICATION':
          return '#FFCA28'
        case 'SUBMITTED':
          return '#FFE0B2'
        case 'PROCESSING':
          return '#EF6C00'
        case 'REQ FOR INFO':
          return '#448AFF'
        case 'APPROVED':
          return '#2E7D32'
        case 'REJECTED':
          return '#C62828'
        case 'PENDING INSURER':
          return '#9CCC65'
        case 'PAID':
          return '#424242'
        case 'HR APPROVAL':
          return '#ffca28'
        case 'PENDING SUBMISSION':
          return '#ffffcc'
      }
    }
  },
  methods: {
    _formatMoneyClaim(n) {
      return formatMoneyClaim(n);
    },
  }
}
</script>
<style scoped>
@import '@/assets/css/claim/statusCard.css';
</style>
