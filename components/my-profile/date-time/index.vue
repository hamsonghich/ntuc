<template>
  <div>
    <div class="form-personal bg-white">
      <div class="personal_info_text text-18 font-500 text-NTUC-1 font__medium">
        {{ $t('profile.date_time') }}
      </div>
      <div class="form-container">
        <div class="table__date">
            <div class="d-flex table__date__time">
              <div class="text-16 font-500 font__medium text-gray--900 w__35">{{$t('profile.date_time_login')}}</div>
              <div class="text-16 font-500 font__medium text-gray--900 w__65">{{$t('profile.title')}}</div>
            </div>
            <div v-for="(item, index) in dateTimePagination" :key="index" class="d-flex table__date__time">
              <div class="text-16 font-400 font__regular text-gray--900 w__35">{{item.time}}</div>
              <div class="text-16 font-400 font__regular text-gray--900 w__65">{{item.title}}</div>
            </div>
            <paginate
              class="datetime_pagination d-flex justify-content-end mt-3"
              v-model="curPage"
              :page-count="totalPage"
              :page-range="paginateDefault.pageRange"
              :prev-text="paginateDefault.prevText"
              :next-text="paginateDefault.nextText"
              :margin-pages="1"
              :container-class="paginateDefault.containerClass"
              :page-class="'notification_pagination_item'"
            >
            </paginate>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import { PAGINATE } from '~/utils/constants/paginate.js';
  export default {
    props: [
      'dateTime'
    ],
    data() {
      return {
        perPage: 10,
        curPage: 1,
        paginateDefault: PAGINATE
      }
    },
    computed: {
      totalPage: function () {
        return Math.ceil(this.dateTime.length / this.perPage);
      },
      dateTimePagination: function () {
        let start = (this.curPage - 1) * this.perPage;
        let end = this.curPage * this.perPage;
        return this.dateTime.slice(start, end);
      }
    },
  };
</script>

<style scoped>
  @import '@/assets/css/my-profile/index.css';
</style>

