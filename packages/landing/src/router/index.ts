import { createRouter, createWebHashHistory } from 'vue-router';

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
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});
export default router;
