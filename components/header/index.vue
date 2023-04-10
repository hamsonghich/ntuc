<template>
  <div class="d-flex flex-column mb-header">
    <b-navbar class="navbar-top flex-row flex-nowrap" toggleable="sm" variant="white">
      <b-navbar-brand class="m-0 cursor_pointer" @click="goToDashboard()">
        <img src="@/assets/logo/logo.png" alt="logo" class="logo" />
      </b-navbar-brand>
      <b-collapse id="nav-collapse" class="" is-nav>
        <b-navbar-nav class="
                ml-auto
                mr-0
                flex-row
                row
                flex-nowrap
                align-items-center
                justify-content-end
              ">
          <div class="cursor_pointer mr--43" @click="handleClickNotification()">
            <img src="@/assets/logo/notification.svg" alt="noti" />
          </div>
          <div class="bg-NTUC-4 br--10 p--10 mr--20">
            <img src="@/assets/logo/user.svg" alt="user" />
          </div>
        </b-navbar-nav>
        <b-dropdown no-caret menu-class="mt-3 p-0 position-absolute mr--23" class="
                  d-flex
                  align-items-center
                  justify-content-center
                  navbar-btn_p
                  navbar-btn
                  rounded
                  bg-white
                ">
          <template #button-content class="">
            {{ nameEmploy }}
            <img src="@/assets/logo/arrow-down.svg" alt="noti" class="ml--20" />
          </template>
          <HeaderTopMenu @handleHideDropdown="handleHideDropdown()" />
        </b-dropdown>
      </b-collapse>
    </b-navbar>
    <div class="d-sm-block d-md-block d-lg-none d-xl-none">
      <div class="d-flex select2-container py-3 mx-auto" style="overflow-x: auto;background-color: #F6F8F9;">
        <div class="d-flex mx-sm-auto">
          <div v-for="(item, index) in menu" :key="index">
            <div>
              <button  @click="handleChangePage(item.href)" class="round font-500 text-10 text-NTUC-9 ml--25" :class= "item.className" >{{ item.text }}</button>
            </div>
          </div>
          <div>
            <button class="round font-500 text-10 text-NTUC-9 ml--25 round2" @click="handleClickLogout">{{ $t('login.log_out') }}</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { postAxios } from '~/services/callApi';
import { mapGetters, mapActions } from 'vuex';
import HeaderTopMenu from '~/components/header/topMenu/index.vue';
export default {
  components: {
    HeaderTopMenu,
  },
  data() {
    return {
      nameEmploy: localStorage.getItem('empName'),
      menu: [
        {
          text: 'Dashboard',
          href: '/dashboard',
          className: 'round1',
        },
        {
          text: 'Claim',
          href: '/claim',
          className: 'round2',
        },
        {
          text: 'Clinic Resource',
          href: '/clinic_resource',
          className: 'round3',
        },
        {
          text: 'Telemed',
          href: '/telemed',
          className: 'round1',
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
    handleClickNotification() {
      if (!window.location.href.includes('first-time-login/dashboard')) {
        this.$router.push('/notifications');
      }
    },
    goToDashboard() {
      if (!window.location.href.includes('first-time-login/dashboard')) {
        this.$router.push('/dashboard');
      }
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
@import '@/assets/css/header/index.css';

::v-deep .dropdown-toggle {
  color: #fff;
  background: var(--NTUC-20) !important;
  border-color: transparent !important;
}

::v-deep .btn {
  padding-left: 0px;
  padding-right: 0px;
}

::v-deep .dropdown-menu {
  left: unset;
  margin-right: 60px;
}
.round {
  padding: 0px 10px 10px;
  border: none;
  width: 80px;
  height: 80px;
  border-radius: 50px;
  line-height: 116%;
  letter-spacing: 0.2em;
}
.round1 {
  background: linear-gradient(0deg, rgba(255, 255, 255, 0.2), rgba(255, 255, 255, 0.2)), linear-gradient(133.39deg, #FF7600 36.72%, rgba(255, 118, 0, 0) 97.57%);
  box-shadow: -3px -4px 12px rgba(0, 0, 0, 0.25);
}

.round2 {
  background: linear-gradient(0deg, rgba(255, 255, 255, 0.2), rgba(255, 255, 255, 0.2)), linear-gradient(133.39deg, #0087E2 36.72%, rgba(0, 135, 226, 0) 97.57%);
  box-shadow: -3px -4px 12px rgba(0, 0, 0, 0.25);
}

.round3 {
  background: linear-gradient(0deg, rgba(255, 255, 255, 0.2), rgba(255, 255, 255, 0.2)), linear-gradient(133.39deg, #6C6F70 36.72%, rgba(108, 111, 112, 0) 97.57%);
  box-shadow: -3px -4px 12px rgba(0, 0, 0, 0.25);
}
</style>
