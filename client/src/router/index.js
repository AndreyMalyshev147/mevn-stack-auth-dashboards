import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '../views/Home.vue';
import store from '../store/index';
import PostPage from '@/views/PostPage';

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('../views/Login'),
    meta: {
      requiresGuest: false
    }
  },
  {
    path: '/register',
    name: 'Register',
    component: () => import('../views/Register'),
    meta: {
      requiresGuest: false
    }
  },
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: () => import('../views/Dashboard'),
    meta: {
      requiresAuth: true,
    },
    props: true
  },
  {
    path: '/dashboard/post/:id',
    name: 'PostPage',
    component: PostPage,
    props: true,
    meta: {
      requiresAuth: true
    },
  }
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
});

router.beforeEach((to, from, next)  => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if(!store.getters.isLoggedIn) {
      next('/login');
    } else {
      next();
    }
  } else if (to.matched.some(record => record.meta.requiresGuest)) {
    if(!store.getters.isLoggedIn) {
      next('/dashboard');
    } else {
      next();
    }
  } else {
    next();
  }
});

export default router;
