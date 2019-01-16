import locales from '@/currency/locales'

export default {
  currentCountryCode: function () {
    let locale = navigator.language

    if (locale.includes('-')) {
      return locale.split('-').pop()
    } else if (locale.includes('_')) {
      return locale.split('_').pop()
    } else {
      return locale
    }
  },
  currenctCurrency: function () {
    let countryCode = this.currentCountryCode()
    return locales[countryCode]
  }
}
