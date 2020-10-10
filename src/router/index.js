import { createRouter, createWebHistory } from 'vue-router'
import Reader from '../views/Reader.vue'

const routes = [
  {
    path: '/',
    name: 'Reader',
    component: Reader
  },
  {
    path: '/upkeep',
    name: 'Upkeep',
    redirect: "/upkeep-hickey",
    component: () => import(/* webpackChunkName: "upkeep" */ '../views/Upkeep.vue'),
    children: [
      {
        path: '/upkeep-hickey',
        name: 'Upkeep-Hickey',
        component: () => import(/* webpackChunkName: "upkeep-hickey" */ '../views/upkeep/Hickey.vue'),
      }
    ]
  },
  {
    path: '/admin',
    name: 'Admin',
    redirect: "/admin-member",
    component: () => import(/* webpackChunkName: "admin" */ '../views/Admin.vue'),
    children: [
      {
        path: '/admin-member',
        name: 'Admin-Member',
        component: () => import(/* webpackChunkName: "admin-member" */ '../views/admin/Member.vue'),
      },
      {
        path: '/admin-manage',
        name: 'Admin-Manage',
        component: () => import(/* webpackChunkName: "admin-manage" */ '../views/admin/Manage.vue'),
      },
      {
        path: '/admin-setting',
        name: 'Admin-Setting',
        component: () => import(/* webpackChunkName: "admin-setting" */ '../views/admin/Setting.vue'),
      }
    ]
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import(/* webpackChunkName: "login" */ '../views/Login.vue')
  }
]

routes.push(
  {
    path: "/*",
    name: "404",
    component: () => import(/* webpackChunkName: "error" */ "../views/Login.vue")
  },
  {
    path: "/error/:code",
    name: "Error",
    component: () => import(/* webpackChunkName: "error" */ "../views/Login.vue")
  }
)

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
