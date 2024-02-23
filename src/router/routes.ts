import { RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', name: 'redirect', redirect: { name: 'merge' } },
      { path: 'merge', name: 'merge', component: () => import('pages/IndexPage.vue') },
      { path: 'split', name: 'split', component: () => import('pages/MergeSplit.vue') },
    ],
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue'),
  },
];

export default routes;
