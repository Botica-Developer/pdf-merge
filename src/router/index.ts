import { route } from 'quasar/wrappers';
import { createMemoryHistory, createRouter, createWebHashHistory, createWebHistory } from 'vue-router';

import routes from './routes';

/**
 * Exporta la configuración de rutas para la aplicación.
 *
 * @param {Object} context - El contexto de la aplicación, que puede incluir `store` y `ssrContext`.
 * @returns {Router} - La instancia del enrutador configurado.
 *
 * La función determina el tipo de historial a utilizar basado en el entorno:
 * - Si `process.env.SERVER` está definido, se utiliza `createMemoryHistory`.
 * - Si `process.env.VUE_ROUTER_MODE` es 'history', se utiliza `createWebHistory`.
 * - En cualquier otro caso, se utiliza `createWebHashHistory`.
 *
 * La configuración del enrutador incluye:
 * - `scrollBehavior`: Define el comportamiento del desplazamiento, que siempre vuelve al inicio de la página.
 * - `routes`: Las rutas de la aplicación (deben estar definidas en otro lugar).
 * - `history`: El historial creado basado en el modo de enrutador y la base de la ruta (`process.env.VUE_ROUTER_BASE`).
 *
 * Nota: No modificar esta configuración directamente. En su lugar, hacer cambios en `quasar.conf.js`:
 * - `quasar.conf.js -> build -> vueRouterMode`
 * - `quasar.conf.js -> build -> publicPath`
 */
export default route(function (/* { store, ssrContext } */) {
  const createHistory = process.env.SERVER
    ? createMemoryHistory
    : process.env.VUE_ROUTER_MODE === 'history'
    ? createWebHistory
    : createWebHashHistory;

  const Router = createRouter({
    scrollBehavior: () => ({ left: 0, top: 0 }),
    routes,

    history: createHistory(process.env.VUE_ROUTER_BASE),
  });

  return Router;
});
