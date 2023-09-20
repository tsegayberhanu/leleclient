import Vue from 'vue'
import VueRouter from 'vue-router'
import auth from "./auth"

import index from '../components/Application/index'
import settings from "../components/settings/setting"
import home from "../views/home"
import specficpost from "../components/AppPost/specficPost"
import user from "../views/post/user"
import notfound from "../views/ErrorPages/notFound"
import searchResult from "../components/searchResult"
import coverPhoto from "../components/user/coverPhoto"

import posts from '../components/user/posts'
import photos from '../components/user/photos'
import friends from '../components/user/friends'
import about from '../components/user/about'

import YourFriends from '../components/you/YourFriends'
import YourPhotos from '../components/you/YourPhotos'
import YourBio from '../components/you/YourBio'

import adminDashboard from '../views/Dashboard/adminDashboard'

Vue.use(VueRouter)

const routeSet = new Set()
routeSet
  .add('index')
  .add('signup')
  .add('signin')
  .add('forgotpassword')
  .add('resendconfirmation')
const routes = [
  {
    path: '/auth',
    name: 'index',
    component: index
  },

  {
    path: '/cover',
    name: 'cover',
    component: coverPhoto
  },

  {
    path: '/post/:postId',
    name: 'post',
    component: specficpost,
    props: true,
    meta: {
      auth: true
    }
  },
  {
    path: '/friends',
    name: 'YourFriends',
    component: YourFriends,
    props: true,
    meta: {
      auth: true
    }
  },
  {
    path: '/photos',
    name: 'YourPhotos',
    component: YourPhotos,
    props: true,
    meta: {
      auth: true
    }
  },
  {
    path: '/about',
    name: 'YourBio',
    component: YourBio,
    props: true,
    meta: {
      auth: true
    }
  },

  {
    path: '/:username',
    name: 'user',
    component: user,
    props: true,
    meta: {
      auth: true
    },
    children: [
      {
        path: 'posts',
        name: 'posts',
        component: posts,
        props: true
      },
      {
        path: 'about',
        name: 'about',
        component: about,
      },
      {
        path: 'friends',
        name: 'friends',
        component: friends,
        props: true
      },
      {
        path: 'photos',
        name: 'photos',
        component: photos,
        props: true
      }
    ]
  },
  {
    path: '/',
    name: 'home',
    component: home,
    meta: {
      auth: true
    }
  },
  {
    path: '/search',
    name: 'searchResult',
    component: searchResult,
    props: route => ({ query: route.query.search }),
    meta: {
      auth: true
    }
  },
  {
    path: '/settings',
    name: 'settings',
    component: settings,
    meta: {
      auth: true
    }
  },
  {
    path: '/drpsycho',
    name: 'adminDashboard',
    component: adminDashboard
  },
  ...auth,
  {
    path: "*",
    name: "notFound",
    component: notfound
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  if (to.matched.some(s => s.meta.auth) && !localStorage.getItem('currentUser')) {
    next({ name: 'index' })
  }
  else {
    if (routeSet.has(to.name) && localStorage.getItem('currentUser')) {
      next(false)
    } else {
      next()
    }
  }
})

export default router
