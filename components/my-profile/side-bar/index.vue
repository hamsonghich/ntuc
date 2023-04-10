<template>
  <div class="block-content pt--40">
    <div class="block-header ml--50">
      <div @click="$router.push({name: 'dashboard'})" class="d-flex align-items-center cursor_pointer ml-2 back_btn">
        <img src="@/assets/images/chevron_left.svg" alt="arrow-left" />
        <div class="text-14 text-white font-500 ml-2">{{ $t('profile.back') }}</div>
      </div>
      <div class="seting-text text-12 font-400 cursor_pointer mt--30">{{ $t('profile.Settings') }}</div>
      <div class="role-block">
        <div class="role-item mb--40">
          <img src="@/assets/images/Vector.svg"/>
          <span class="ml-4 text-14 font-500">{{ $t('profile.My_Profile') }}</span>
        </div>
        <div 
          class="role-item cursor_pointer mb--40"
          @click="_clickItem(0)"
        >
          <img src="@/assets/images/contacts.svg"/>
          <span
            class="text-14 font-500 font__medium ml-3"
            :class="itemSelected == 0 ? 'text-NTUC-18' : 'text-NTUC-7'"
          >
           {{$t('profile.My_Personal_Info')}}
          </span>
        </div>
        <div 
          class="role-item cursor_pointer mb--40"
          @click="_clickItem(1)"
        >
          <img src="@/assets/images/badge.svg"/>
          <span
            class="text-14 font-500 font__medium ml-3"
            :class="itemSelected == 1 ? 'text-NTUC-18' : 'text-NTUC-7'"
          >
            {{$t('profile.My_Employment_Info')}}
          </span>
        </div>
        <div 
          class="role-item cursor_pointer mb--40"
          @click="_clickItem(2)"
        >
          <img src="@/assets/images/bank.svg"/>
          <span
            class="text-14 font-500 font__medium ml-3"
            :class="itemSelected == 2 ? 'text-NTUC-18' : 'text-NTUC-7'"
          >
            {{$t('profile.My_Bank_Info')}}
          </span>
        </div>
        <div 
          class="role-item cursor_pointer mb--40"
          @click="_clickItem(3)"
        >
          <img src="@/assets/images/dvr.svg"/>
          <span
            class="text-14 font-500 font__medium ml-3"
            :class="itemSelected == 3 ? 'text-NTUC-18' : 'text-NTUC-7'"
          >
            {{$t('profile.Login_Date_Time')}}
          </span>
        </div>
      </div>
    </div>
    <div class="line-white"></div>
  </div>
</template>

<script>
  export default {
    props: ['itemSelected'],
    data() {
      return {};
    },
    methods: {
      _clickItem(index) {
        this.$emit('_clickItemRole', index);
      }
    }
  };
</script>

<style scoped>
  @import '@/assets/css/my-profile/side-bar.css';
</style>
