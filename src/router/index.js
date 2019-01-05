import Vue from 'vue'
import Router from 'vue-router'
import goods from '../components/goods.vue'
import shops from '../components/shops.vue'
import comments from '../components/comments.vue'
Vue.use(Router);

export default new Router({
  routes: [
    {path: '/', redirect: '/goods'},
    {path: '/goods', component: goods},
    {path: '/shops', component: shops},
    {path: '/comments', component: comments}
  ],
  linkActiveClass: 'activetab'
})
