import { boot } from 'quasar/wrappers';
import axios, { AxiosInstance } from 'axios';

/**
 * Declara tipos personalizados para Vue 3 Runtime Core
 * @module @vue/runtime-core
 *
 * @description
 * Extiende la interfaz ComponentCustomProperties de Vue para incluir
 * instancias de Axios como propiedades personalizadas globales.
 *
 * Las propiedades agregadas son:
 * @property {AxiosInstance} $axios - Instancia principal de Axios
 * @property {AxiosInstance} $api - Instancia secundaria de Axios para la API
 */
declare module '@vue/runtime-core' {
  interface ComponentCustomProperties {
    $axios: AxiosInstance;
    $api: AxiosInstance;
  }
}

const api = axios.create({ baseURL: 'https://api.example.com' });

/**
 * Configura el cliente HTTP Axios y la instancia de API para la aplicación Vue
 *
 * @param param0 Objeto de configuración del boot de Quasar que contiene la instancia de la aplicación Vue
 * @param param0.app Instancia de la aplicación Vue
 *
 * @remarks
 * Esta función de arranque registra dos propiedades globales en la aplicación:
 * - `$axios`: La instancia de Axios para realizar peticiones HTTP
 * - `$api`: La instancia configurada de la API
 */
export default boot(({ app }) => {
  app.config.globalProperties.$axios = axios;

  app.config.globalProperties.$api = api;
});

export { api };
