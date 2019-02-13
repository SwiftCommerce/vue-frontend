import Vue from 'vue';
import Router from 'vue-router';

import HelloWorld from '@/components/HelloWorld';
import SignIn from '@/components/auth/SignIn';
import Category from '@/components/product/Category';
import Product from '@/components/product/Product';
import Cart from '@/components/product/Cart';
import Shipping from '@/components/order/Shipping';
import Order from '@/components/order/Order';
import OrderHistory from '@/components/order/OrderHistory';
import OrderSuccess from '@/components/order/OrderSuccess';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld
    },
    {
      path: 'sign-in',
      name: 'SignIn',
      component: SignIn
    },
    {
      path: '/categories/:category',
      name: 'Category',
      component: Category
    },
    {
      path: '/products/:product',
      name: 'Product',
      component: Product
    },
    {
      path: '/cart',
      name: 'Cart',
      component: Cart
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
    },
    {
      path: '/order-success',
      name: 'OrderSuccess',
      component: OrderSuccess
    },
    {
      path: '/order-history',
      name: 'OrderHistory',
      component: OrderHistory
    }
  ]
});
