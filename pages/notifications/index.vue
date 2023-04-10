<template>
  <div class="notification_layout ml--2 d-flex flex-start flex-column max-width-100">
    <div class="container__log">
      <div class="notification_body flex-row justify-content-center align-items-start p-0">
        <div class="p-0 notification_menu">
        </div>
        <div class="notification_list_card px-3 py-2 d-flex flex-column align-items-start align-self-stretch">
          <div class="w-100">
            <div class="accordion">
              <HeaderTitle class="mb--20 font-500" title="My Notifications" />
              <div class="header_description text-16 color-gray-scale">{{ $t('description') }}</div>
              <NotificationProfileMenu :page="page" />
              <div v-if="page == 1">
                <NotificationCard :template="element" v-for="(element, index) in templates1" :key="index" />
              </div>
              <div v-if="page == 2">
                <NotificationCard :template="element" v-for="(element, index) in templates2" :key="index" />
              </div>
            </div>
          </div>
          <paginate class="notification_pagination mt--30" v-model="curPage"
            :page-count="this.page == 1 ? totalPage1 : totalPage2" :page-range="paginateDefault.pageRange"
            :prev-text="paginateDefault.prevText" :next-text="paginateDefault.nextText" :margin-pages="1"
            :container-class="paginateDefault.containerClass" :page-class="'notification_pagination_item'">
          </paginate>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { mapGetters, mapActions } from 'vuex'
import HeaderTitle from '~/components/headerTitle/index.vue'
import NotificationCard from '~/components/notifications/notificationCard/index.vue'
import NotificationProfileMenu from '~/components/notifications/profileMenu/index.vue'
import { PAGINATE } from '~/utils/constants/paginate.js'

export default {
  name: 'NotificationTemplatesRead',
  components: {
    HeaderTitle,
    NotificationCard,
    NotificationProfileMenu,
  },
  data() {
    return {
      perPage: 6,
      curPage: 1,
      paginateDefault: PAGINATE,
      array1: [],
      array2: [],
    }
  },
  computed: {
    ...mapGetters('notification', ['entitiesTemplate', 'page']),
    templates1: function () {
      let start = (this.curPage - 1) * this.perPage;
      let end = this.curPage * this.perPage;
      return this.entitiesTemplate.filter(e => e.isRead == "false").slice(start, end);

    },
    totalPage1: function () {
      return Math.ceil(this.entitiesTemplate.filter(e => e.isRead == "false").length / this.perPage);
    },
    templates2: function () {
      let start = (this.curPage - 1) * this.perPage;
      let end = this.curPage * this.perPage;
      return this.entitiesTemplate.filter(e => e.isRead == "true").slice(start, end);

    },
    totalPage2: function () {
      return Math.ceil(this.entitiesTemplate.filter(e => e.isRead == "true").length / this.perPage);
    }
  },
  async created() {
    await this.handleFetchAllEntitiesTemplate();
  },
  methods: {
    ...mapActions('notification', ['handleFetchAllEntitiesTemplate']),
  },
  watch: {
    entitiesTemplate(newVal, oldVal) {
      this.curPage = 1
    },
  }
}
</script>

<style scoped>
@import '@/assets/css/notifications/index.css';
</style>
