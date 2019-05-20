import Vue from 'vue'
import Router from 'vue-router'

// in development-env not use lazy-loading, because lazy-loading too many pages will cause webpack hot update too slow. so only in production use lazy-loading;
// detail: https://panjiachen.github.io/vue-element-admin-site/#/lazy-loading

Vue.use(Router)

/* Layout */
import Layout from '../views/layout/Layout'

/**
* hidden: true                   if `hidden:true` will not show in the sidebar(default is false)
* alwaysShow: true               if set true, will always show the root menu, whatever its child routes length
*                                if not set alwaysShow, only more than one route under the children
*                                it will becomes nested mode, otherwise not show the root menu
* redirect: noredirect           if `redirect:noredirect` will no redirect in the breadcrumb
* name:'router-name'             the name is used by <keep-alive> (must set!!!)
* meta : {
    title: 'title'               the name show in submenu and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar,
  }
**/
export const constantRouterMap = [

  {
    path: '/',
    component: Layout,
    redirect: '/user/manage',
    name: 'Dashboard',
    hidden: true,
    children: [{
      path: 'dashboard',
      component: () => import('@/views/dashboard/index')
    }]
  },
  {
    path: '/user',
    component: Layout,
    redirect: '/manage',
    name: 'Nested',
    meta: {
      title: '用户管理',
      icon: 'nested'
    },
    children: [
      {
        path: 'manage',
        component: () => import('@/views/user/index'), // Parent router-view
        name: 'Menu1',
        meta: { title: '用户信息管理' }
      }
    ]
  },

  {
    path: '/game',
    component: Layout,
    redirect: '/game/edit',
    name: 'Nested',
    meta: {
      title: '游戏产品管理',
      icon: 'nested'
    },
    children: [
      {
        path: 'add',
        component: () => import('@/views/game/add'), // Parent router-view
        name: 'Menu1',
        meta: { title: '游戏上新' }
      },
      {
        path: 'edit',
        component: () => import('@/views/game/index'),
        meta: { title: '游戏管理' }
      }
    ]
  },

  {
    path: '/order',
    component: Layout,
    redirect: '/order/list',
    name: 'Nested',
    meta: {
      title: '订单管理',
      icon: 'nested'
    },
    children: [
      {
        path: 'list',
        component: () => import('@/views/nested/menu1/index'), // Parent router-view
        name: 'Menu1',
        meta: { title: '订单管理' }
      }
    ]
  },
  {
    path: '/msg',
    component: Layout,
    redirect: '/msg/list',
    name: 'Nested',
    meta: {
      title: '留言查看',
      icon: 'nested'
    },
    children: [
      {
        path: 'list',
        component: () => import('@/views/nested/menu2/index'), // Parent router-view
        name: 'Menu1',
        meta: { title: '留言查看' }
      }
      // {
      //   path: 'menu1',
      //   component: () => import('@/views/nested/menu1/index'), // Parent router-view
      //   name: 'Menu1',
      //   meta: { title: '评论管理' }
      // }
    ]
  },
  { path: '/404', component: () => import('@/views/404'), hidden: true },
  { path: '*', redirect: '/404', hidden: true }
]

export default new Router({
  mode: 'history', // 后端支持可开
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRouterMap
})
