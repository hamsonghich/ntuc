<template>
  <div>
    <div class="notificationInfo d-flex" @click="readNotification(template)">
      <div class="notification-card-ct d-flex flex-row justify-contents-center align-items-center py--10">
        <b-card style="background: transparent;" class="border-0 flex-1 w-100 mr--10" body-class="notification_card_body d-flex">
          <b-card-text class="notification_date text-16 align-items-center d-flex mt-0 min-width-date mb-0">{{
            template.createon
          }}</b-card-text>
          <div>
            <b-card-title :class="(template.isRead == 'true') ? 'text-NTUC-2' : ''" class="notification_card_title text-NTUC-1 text-16 font__medium">{{ template.name }}</b-card-title>
            <div class="notification_card_content text-12" v-html="handleMessageNoti(template.message)"></div>
          </div>
        </b-card>
      </div>
      <span :class="(template.isRead == 'true') ? 'check_pink text-32' : 'check_gray text-32'"
          class="d-flex ml-auto bg-white pl--40 align-items-center"> <b-icon-check-circle-fill class="icon_noti_mb d-flex f_size box-shadow" /></span>
    </div>
    <div class="notification_card_line gray-line"></div>
  </div>
</template>
<script>
import { mapActions } from 'vuex'
export default {
  name: 'NotificationCard',
  props: {
    template: {
      type: Object,
      default() {
        return {
          createon: '',
          emailrecipient: '',
          emailsender: '',
          id: '',
          isRead: "false",
          message: '',
          name: '',
          onTime: ''
        }
      }
    }
  },
  methods: {
    ...mapActions('notification', ['handleSetCurrentTemplate', 'handleUpdateStatusNotification']),
    readNotification(notification) {
      this.handleSetCurrentTemplate(notification)
      this.handleUpdateStatusNotification(notification.id)
      this.$router.push({ name: 'notifications-id', params: { id: notification.id } });
    },
    handleMessageNoti(message) {
      const x = message.split('<br', 3).join('<br').length;
      const y = message.split('<br', 4).join('<br').length;
      const splitStr = message.slice(x, y);
      if (splitStr.length > 100) return message.slice(0, x)
      else return message.slice(0, y)
    },
  },
}
</script>

<style scoped>
@import '@/assets/css/notifications/index.css';
</style>
