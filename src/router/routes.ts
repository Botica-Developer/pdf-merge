import { RouteRecordRaw } from 'vue-router';

// Definición de las rutas de la aplicación
const routes: RouteRecordRaw[] = [
  {
    path: '/', // Ruta principal
    component: () => import('layouts/MainLayout.vue'), // Componente de layout principal
    children: [
      { path: '', name: 'redirect', redirect: { name: 'merge' } }, // Redirección a la ruta 'merge'
      { path: 'merge', name: 'merge', component: () => import('pages/IndexPage.vue') }, // Ruta para la página de fusión
    ],
  },
  {
    path: '/:catchAll(.*)*', // Ruta para manejar cualquier ruta no definida (404)
    component: () => import('pages/ErrorNotFound.vue'), // Componente para la página de error 404
  },
];

export default routes;
