export default function ({ isHMR, app, store, route, error }) {
  const defaultLocale = app.i18n.fallbackLocale;

  if (isHMR) return

  const locale = route.query.lang || defaultLocale

  if (!store.getters['i18n/locales'].includes(locale)) {
    return error({ message: 'This page could not be found.', statusCode: 404 })
  }
  store.commit('i18n/SET_LANG', locale)
  app.i18n.locale = store.getters['i18n/locale']
}