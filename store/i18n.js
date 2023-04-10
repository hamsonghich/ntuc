export const state = () => ({
  locales: ['en', 'vi'],
  locale: 'en',
});

export const getters = {
  locales: _state => _state.locales,
  locale: _state => _state.locale
}


export const mutations = {
  SET_LANG(_state, locale) {
    if (_state.locales.includes(locale)) {
      _state.locale = locale;
    }
  },
};


export const actions = {

  async handleLang({ commit }, locale) {
    commit('SET_LANG', locale);
    this.$router.push({ path: `${this.$router.currentRoute.path}?lang=${locale}` });
  },
}
