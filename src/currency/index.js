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
  },

  getPrice: function (prices) {
    let currency = this.currenctCurrency().toLowerCase()
    let validPrices = prices.filter(function (price) {
      let activeFrom = new Date(price.activeFrom)
      let activeTo = new Date(price.activeTo)
      let now = new Date()

      return price.active && price.currency.toLowerCase() === currency && activeFrom < now && activeTo > now
    })

    return validPrices.sort(function (first, second) { return new Date(first.activeFrom) >= new Date(second.activeFrom) }).pop()
  },
  formatPrice: function (price) {
    let string = price.cents.toString()

    let locale = window.navigator.language
    let symbol = price.cents.toLocaleString(locale, { style: 'currency', currency: price.currency }).replace(/(\d*[.,]*)+/g, '')

    let roundedString = string.slice(0, string.length - 2) + '.' + string.slice(string.length - 2)
    return symbol + roundedString
  }
}
