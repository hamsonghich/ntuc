<template>
  <div class="menu pd-top-menu">
    <div v-for="(item, index) in menu" :key="index">
      <div class="desktop__dropdown">
        <div @click="handleChangePage(item.href)" class="color-text_menu cursor_pointer text-14 py--6">
          {{ item.text }}
        </div>
      </div>
    </div>
    <div class="desktop__dropdown">
      <div @click="handleClickLogout" class="color-text_menu cursor_pointer text-14 py--6">
        <img src="@/assets/logo/On_button_light.svg" alt="" class="mr--10">
        {{ $t('login.log_out') }}
      </div>
    </div>
    <div class="desktop__dropdown">
      <div @click="handleChangePage('/my-profile/employee-info')" class="color-text_menu cursor_pointer text-14 py--6">
        <img src="@/assets/logo/Horizontal_switch.svg" alt="" class="mr--10">
        {{ $t('login.Go_to_HR_Portal') }}
      </div>
    </div>
  </div>
</template>
<script>
import { postAxios } from '~/services/callApi';
import { mapGetters, mapActions } from 'vuex';
import { handleListCallApi } from '~/utils/functions/handleListCallApi';
import { EXCEPTION } from '~/utils/constants/statusResponse';
export default {
  name: 'HeaderTopMenu',
  data() {
    return {
      promtEmployee: '',
      LogOut: false,
      accessBasedListMenuBarOptions: [],
      menu: [
        {
          text: 'My Profile',
          href: '/my-profile',
          usingMaterial: false
        },
        {
          text: 'My Notifications',
          href: '/notifications',
          usingMaterial: false
        },
        {
          text: 'My Claims',
          href: '/claim',
          usingMaterial: false
        },
        {
          text: 'My LOGs',
          href: '/log',
          usingMaterial: false
        },
      ]
    };
  },
  methods: {
    ...mapActions('employee', ['changeEcardId', 'handleIsBenefit']),
    handleChangePage(link) {
      //There was a previous request to ONLY allow dependents to route to the
      //E-card on the My Profile page. This is no longer required as of 16th Oct by Andrea. 
      //if (localStorage.getItem('isemployee') === 'false') {
      //  this.$router.push('/ecard-dependent');
      //} else {
      this.handleIsBenefit(false)
      this.$router.push(link);
      //}
    },
    async handleClickLogout() {
      await postAxios({
        invoke: 'System.execute',
        argc: '2',
        a0: 'User.logout'
      });
      this.clearLocal();
      this.$router.push({ name: 'login' });
    },
    clearLocal() {
      let userName = localStorage.getItem('userName');
      let passWord = localStorage.getItem('token_pw');
      const isClickSaveAsDraft = localStorage.getItem('isClickSaveAsDraft');

      localStorage.clear();
      localStorage.setItem('isClickSaveAsDraft', isClickSaveAsDraft);
      if (userName !== null && userName !== undefined) {
        localStorage.setItem('userName', userName);
        localStorage.getItem('token_pw', passWord);
      }
    },
  }
};
</script>
<style scoped>
.nb_btn_menu {
  background: var(--MMB-2) !important;
}

.color-text_menu {
  color: var(--text-color-default);
}

.color-text_time {
  color: var(--gray-scale-700);
}

.menu {
  padding: 12px;
}

.btn {
  padding-left: 48px;
  height: 34px;
}

@media screen and (min-width: 1200px) {
  .desktop__dropdown {
    display: block;
    min-width: 158px;
  }

  .mobile__dropdown {
    display: none;
  }
}

@media screen and (max-width: 1199px) {
  .desktop__dropdown {
    display: none;
  }

  .mobile__dropdown {
    display: block;
  }
}
</style>
