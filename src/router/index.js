import Vue from 'vue'
import VueRouter from 'vue-router'
import {
  Dialog
} from 'vant'
import store from '@/store/index.js'

Vue.use(VueRouter)


const routes = [{
    path: '/login',
    name: 'login',
    component: () => import('@/views/login'),
    meta: {
      requiresAuth: false
    } //添加额外的自定义数据
  },
  {
    path: '/',
    component: () => import('../views/layout/index.vue'),
    children: [{
        path: '', //默认子路由
        name: 'home',
        component: () => import('../views/home/index.vue'),
        meta: {
          requiresAuth: false
        }
      },
      {
        path: '/qa',
        name: 'qa',
        component: () => import('../views/qa/index.vue'),
        meta: {
          requiresAuth: false
        }
      },
      {
        path: '/video',
        name: 'video',
        component: () => import('../views/video/index.vue'),
        meta: {
          requiresAuth: false
        }
      },
      {
        path: '/my',
        name: 'my',
        component: () => import('../views/my/index.vue'),
        meta: {
          requiresAuth: false
        }
      },


    ]
  },
  {
    path: '/search',
    name: 'search',
    component: () => import('../views/search/index.vue'),
    meta: {
      requiresAuth: false
    }
  },
  {
    path: '/article/:articleId',
    name: 'article',
    component: () => import('../views/article/index.vue'),
    //路由动态参数映射到组件props中
    props: true,
    meta: {
      requiresAuth: false
    }
  },
  {
    path: '/user/profile',
    name: 'user-profile',
    component: () => import('../views/user-profile/index.vue'),
    meta: {
      requiresAuth: false
    }
  },
  {
    path: '/user/chat',
    name: 'user-chat',
    component: () => import('../views/user-chat/index.vue'),
    meta: {
      requiresAuth: true
    }
  },
]

const router = new VueRouter({
  routes
})


router.beforeEach((to, from, next) => {
  if (to.meta.requiresAuth) {
    if (store.state.user) {
      return next()
    }

    
    Dialog.confirm({
        title: '访问提示',
        message: '该功能需要登录才能访问，确认登录吗？',
      })
      .then(() => {
        router.replace({
          name: 'login',
          query: {
            redirect: router.currentRoute.fullPath
          }
        })
      })
      .catch(() => {
        next(false)
      });
  } else {
    next()
  }
})

export default router