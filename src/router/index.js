import Vue from 'vue'
import Router from 'vue-router'

import HelloWorld from '@/components/HelloWorld'
import Category from '@/components/product/Category'
import Shipping from '@/components/order/Shipping'
import Order from '@/components/order/Order'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld
    },
    {
      path: '/categories/:category',
      name: 'Category',
      component: Category
    },
    {
      path: '/shipping',
      name: 'Shipping',
      component: Shipping
    },
    {
      path: '/order',
      name: 'Order',
      component: Order
    }
  ]
})
