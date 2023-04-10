<template>
  <div></div>
</template>

<script>
import { postAxios } from '~/services/callApi';
export default {
  data() {
    return {
      events: ['click', 'mousemove', 'mousedown', 'scroll', 'keypress', 'load'],
      warningTimer: null,
      logoutTimer: null,
      warningZone: false
    };
  },
  mounted() {
    this.events.forEach(function (event) {
      window.addEventListener(
        event,
        () => {
          this.resetTimer();
        },
        false
      );
    }, this);

    this.setTimers();
  },
  destroyed() {
    this.events.forEach(function (event) {
      window.removeEventListener(event, this.resetTimer());
    }, this);
    this.resetTimer();
  },
  methods: {
    setTimers() {
      this.warningTimer = setTimeout(() => this.handleClickLogout(), 10 * 60000);
    },
    async handleClickLogout() {
      await postAxios({
        invoke: 'System.execute',
        argc: '2',
        a0: 'User.logout'
      });
      this.clearLocal();
      this.$router.push({ name: 'inactive' });
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
    resetTimer() {
      clearTimeout(this.warningTimer);
      this.setTimers();
    }
  }
};
</script>