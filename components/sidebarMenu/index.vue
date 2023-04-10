<template>
  <div
    class="sidebar align-items-start flex-column mr-3 d-none d-lg-block"
    :style="`max-width:${!collapsed ? '256px' : '134px'}`"
  >
    <div class="sidebar--header">
      <div class="d-flex justify-content-end">
        <img
          src="@/assets/Icon/collapse.svg"
          alt="collapse"
          class="mr--10 cursor_pointer text-NTUC-3"
          @click="collapsed = !collapsed"
        />
      </div>
      <img src="@/assets/logo/amplify-logo.svg" alt="logo" v-if="!collapsed" />
      <img src="@/assets/logo/amplify-collapsed.svg" alt="collapse" v-else />
    </div>
    <div class="sidebar--menu w-100 mb--25">
      <div v-for="(item, index) in menu" :key="index">
        <div class="mt--20 mb--20 pl--45 menu--header text-12">{{ item.label }}</div>
        <div
          class="d-flex align-items-center menu-item-lv1 cursor_pointer text-gray--700"
          v-for="(el, idx) in item.child"
          :key="idx"
          @click="clickItemMenu(el.href)"
        >
          <div
            class="item--active bg-NTUC-3 h-100"
            :class="`${routerName.includes(el.href) || el.href == routerName ? 'd-block' : ''}`"
            v-show="el.href == routerName"
          />
          <span
            :id="`${el.label}-tooltip`"
            class="material-symbols-outlined mr--20 mt-1"
            width="24px"
            height="24px"
            :class="`${
              routerName.includes(el.href) || el.href == routerName
                ? 'ml--45 text-NTUC-3'
                : 'ml--50'
            }`"
            v-if="el.usingMaterial"
            >{{ el.icon }}</span
          >
          <b-icon
            :id="`${el.label}-tooltip`"
            :icon="el.icon"
            width="24px"
            height="24px"
            class="mr--20 mt-1"
            :class="`${
              routerName.includes(el.href) || el.href == routerName
                ? 'ml--45 text-NTUC-3'
                : 'ml--50'
            }`"
            v-else
          />
          <b-tooltip v-if="collapsed" :target="`${el.label}-tooltip`" triggers="hover">
            {{ el.label }}
          </b-tooltip>
          <div
            class="text-14 text-nowrap"
            :class="`${routerName.includes(el.href) || el.href == routerName ? 'text-NTUC-3 font__bold font-700' : 'font__medium font-500'}`"
            v-if="!collapsed"
          >
            {{ el.label }}
          </div>
        </div>
      </div>
    </div>
    <div class="my-auto w-100">
      <div class="menu--line m-auto"></div>
      <div class="menu--footer mt--40">
        <div
          class="d-flex align-items-center cursor_pointer text-gray--700"
          @click="clickItemMenu('login')"
        >
          <img
            src="@/assets/Icon/logout.svg"
            alt="logout"
            width="24px"
            height="24px"
            class="mr--20 ml--50"
            id="logout-tooltip"
          />
          <b-tooltip v-if="collapsed" target="logout-tooltip" triggers="hover">
            {{ $t('login.log_out') }}
          </b-tooltip>
          <div class="text-14 text-nowrap font__bold" v-if="!collapsed">
            {{ $t('login.log_out') }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      collapsed: false,
      menu: [
        {
          label: 'General',
          child: [
            {
              label: 'Dashboard',
              href: 'dashboard',
              icon: 'grid-fill',
              usingMaterial: false
            },
            {
              label: 'My Notifications',
              href: 'notifications',
              icon: 'bell',
              usingMaterial: false
            },
            {
              label: 'My Enrolment',
              href: 'myenrolment',
              icon: 'lightning-charge',
              usingMaterial: false
            },
            {
              label: 'My Claims',
              href: 'claim',
              icon: 'bookmark-dash',
              usingMaterial: false
            },
            {
              label: 'My Wallets',
              href: 'wallets',
              icon: 'credit-card',
              usingMaterial: false
            },
            {
              label: 'My LOG Requests',
              href: 'log',
              icon: 'bookmark-dash',
              usingMaterial: false
            },

            {
              label: 'Telemed',
              href: 'telemed',
              icon: 'shield-check',
              usingMaterial: false
            },
            {
              label: 'My Clinics',
              href: 'clinic',
              icon: 'emergency',
              usingMaterial: true
            }
          ]
        },
        {
          label: 'Tools',
          child: [
            {
              label: 'My Profile',
              href: 'my-profile',
              icon: 'person-fill',
              usingMaterial: false
            },
            {
              label: 'Health Declaration',
              href: '/',
              icon: 'inbox',
              usingMaterial: true
            },
            {
              label: 'Resources',
              href: 'online-resources',
              icon: 'journal',
              usingMaterial: false
            }
          ]
        }
      ]
    };
  },
  computed: {
    routerName() {
      return this.$route.name;
    }
  },
  methods: {
    clickItemMenu(name) {
      this.$router.push({ name });
    }
  }
};
</script>

<style scoped>
.sidebar {
  width: 100%;
  max-width: 256px;
  transition: 0.5s;
  background: var(--NTUC-9);
  padding: 14px 0px;
  box-shadow: 0px 1px 8px rgba(0, 0, 0, 0.12), 0px 3px 4px rgba(0, 0, 0, 0.14),
    0px 3px 3px -2px rgba(0, 0, 0, 0.2);
  overflow-x: hidden;
  overflow-y: auto;
}
.menu-item-lv1 {
  height: 60px;
  padding: 15px 0;
}
.menu-item-lv1:hover {
  background: var(--NTUC-21);
}
.item--active {
  width: 5px;
  background: var(--NTUC-3);
  border-radius: 5px 0px 0px 5px;
  transform: rotate(-180deg);
}
.menu--header {
  color: #bebebe;
}
.menu--line {
  width: 100%;
  max-width: 176px;
  height: 1px;
  background: #f2f2f2;
}
</style>
