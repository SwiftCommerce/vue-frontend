import currency from '@/currency'

export default {
  create: function (object) {
    var product = Object.create(object)

    product.attribute = function (name, def = null) {
      return (this.attributes.filter((attr) => attr.name === name)[0] || {}).value || def
    }

    Object.defineProperty(product, 'imageURL', {
      value: product.attribute('image', require('@/assets/fa-image.png')),
      writable: false
    })

    Object.defineProperty(product, 'manufacturer', {
      value: product.attribute('manufacturer'),
      writable: false
    })

    Object.defineProperty(product, 'price', {
      value: currency.formatPrice(currency.getPrice(product.prices)),
      writable: false
    })

    return product
  }
}
