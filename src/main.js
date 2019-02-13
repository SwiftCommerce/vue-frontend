// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import App from './App';
import FontAwesome from './font-awesome';
import router from './router';
import store from './state';
import api from './api';

window.$ = require('jquery');
require('popper.js');
require('bootstrap');

Vue.config.productionTip = false;

Vue.component('font-awesome', FontAwesome);

/* eslint-disable no-new */
new Vue({
  el: '#app',
  api,
  store,
  router,
  components: { App },
  template: '<App/>'
});
