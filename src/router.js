import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router);

const router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'home',
      component: resolve => require(['@/views/Home'], resolve)
    },
    {
      path: '/admin',
      name: 'admin',
      children: [
        {
          path: 'page_info_manage',
          name: 'page_info_manage',
          component: () => import('./components/admin/PageInfoManage.vue')
        },
        {
          path: 'project_manage',
          name: 'ProjectManage',
          component: () => import('./components/admin/project/ProjectManage.vue')
        },
        {
          path: 'about',
          name: 'about',
          component: () => import('./views/About.vue')
        }
      ],
      component: () => import('./views/Admin.vue')
    },
    {
      path: '/designer',
      name: 'Designer',
      component: () => import('./views/Designer.vue')
    }
  ]
});

router.beforeEach((to, from, next) => {


  next();
});


export default router
