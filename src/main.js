// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import VueResource from 'vue-resource'
Vue.use(VueResource);
Vue.config.productionTip = false
import { Toast } from 'mint-ui';
import { Tabbar, TabItem } from 'mint-ui';
Vue.component(Tabbar.name, Tabbar);
Vue.component(TabItem.name, TabItem);
/* eslint-disable no-new */
import { link } from 'fs';
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
