import { createRouter, createWebHashHistory } from 'vue-router';
import { useAuth } from '@/store/useAuth';

const routes = [
  { path: '/', redirect: '/home' },
  {
    path: '/home',
    name: 'home',
    component: () => import('../views/HomePage.vue'),
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('../views/Login.vue'),
  },
  {
    path: '/personal',
    name: 'personal',
    component: () => import('../views/Personal.vue'),
  },
  {
    path: '/subscribe',
    name: 'subscribe',
    component: () => import('../views/Subscription.vue'),
  },
];

const whileList = ['login', 'home', 'subscribe'];

const beforeEnter = (to: any, _: any, next: any) => {
  const store = useAuth();
  if (whileList.includes(to.name)) {
    next();
  }
  if (!store.accessToken) {
    next({ name: 'login' });
  } else {
    next();
  }
};

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

router.beforeEach(beforeEnter);

export default router;
