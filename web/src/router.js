import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router);

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      redirect: '/admin/project_manage'
      // name: 'home',
      // component: resolve => require(['@/views/Home'], resolve)
    },
    {
      path: '/admin',
      name: 'admin',
      component: () => import('./views/Admin.vue'),
      children: [
        {
          path: 'project_manage',
          name: 'ProjectManage',
          component: () => import('./components/admin/project/ProjectManage.vue')
        },
        {
          path: 'compinfo_manage',
          name: 'CompinfoManage',
          component: () => import('./components/admin/compinfo/CompinfoManage.vue')
        },
        {
          path: 'echart_theme_manage',
          name: 'EchartThemeManage',
          component: () => import('./components/admin/echartTheme/EchartThemeManage.vue')
        }
      ],
    },
    {
      path: '/designer',
      name: 'Designer',
      component: () => import('./views/Designer.vue')
    }
  ]
});

router.beforeEach((to, from, next) => {

  if (to.meta.title) {
    document.title = to.meta.title
  }

  next();
});


export default router
