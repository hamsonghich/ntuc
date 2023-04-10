<template>
  <div class="notification_profile_menu d-flex align-item-start">
    <div class="width-100">
      <div>
        <div
          class="notification_profile_option text-center text-14 font-500 font__medium pd-3 pt-0 active pr-0 pl-0 cursor_pointer"
          :class="isDisplay ? 'active' : 'deactive'" @click="toggleButton(true)">
          <img v-if="isDisplay" src="@/assets/Icon/bluenew.svg" alt="icon_noti_mb"
            class="circle icon_noti_mb d-flex mx-auto mb-0" />
          <img v-else src="@/assets/Icon/greynew.svg" alt="icon_noti_mb"
            class="circle icon_noti_mb d-flex mx-auto mb-0" />
          New
          <div data-v-794598a0="" class="notification_card_line width-100 mx-auto"
            :class="isDisplay ? 'd-block' : 'd-none'"></div>
        </div>
      </div>
    </div>
    <div class="width-100">
      <div>
        <div
          class="notification_profile_option text-center text-14 font-500 font__medium d-block pd-3 pt-0 pr-0 pl-0 cursor_pointer"
          :class="!isDisplay ? 'active' : 'deactive'" @click="toggleButton(false)">
          <img v-if="isDisplay" src="@/assets/Icon/greyread.svg" alt="icon_noti_mb"
            class="icon_noti_mb d-flex mx-auto" />
          <img v-else src="@/assets/Icon/blueread.svg" alt="icon_noti_mb" class="icon_noti_mb d-flex mx-auto" />
          Read
          <div data-v-794598a0="" class="notification_card_line width-100 mx-auto"
            :class="!isDisplay ? 'd-block' : 'd-none'"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
export default {
  name: 'NotificationProfileMenu',
  props: ['page'],
  computed: {
    ...mapGetters('notification', [
      'isDisplay',
      'page',
    ])
  },
  methods: {
    ...mapActions('notification', [
      'handleSetisDisplay',
      'handleSetPage',
    ]),
    toggleButton(value) {
      if (value) {
        this.handleSetisDisplay(value);
        this.handleSetPage(1)
      }
      else {
        this.handleSetisDisplay(value);
        this.handleSetPage(2)
      }
    }
  }
}

</script>

<style scoped>
@import '@/assets/css/notifications/index.css';

.active {
  color: var(--dark-blue) !important;
}

.deactive {
  color: var(--gray-540) !important;
}
</style>