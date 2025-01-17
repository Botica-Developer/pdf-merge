# Proyecto Vue con Quasar

Este proyecto utiliza [Vue.js](https://vuejs.org/) como framework principal y [Quasar Framework](https://quasar.dev/) para la interfaz de usuario.

## Requisitos previos

Asegúrate de tener instalado lo siguiente en tu máquina:

- [Node.js](https://nodejs.org/) (versión LTS recomendada)
- [Quasar CLI](https://quasar.dev/start/quasar-cli) (puedes instalarlo con `npm install -g @quasar/cli`)

## Instalación

1. Clona este repositorio:

   ```bash
   git clone https://github.com/usuario/mi-proyecto.git
   cd mi-proyecto
   ```

2. Instala las dependencias:
   ```bash
   npm install
   # o utiliza
   yarn install
   ```

## Iniciar el proyecto

Para iniciar el proyecto en modo desarrollo, ejecuta:

```bash
quasar dev
```

Esto abrirá la aplicación en tu navegador.

## Compilar para producción

Para compilar el proyecto para producción, utiliza:

```bash
quasar build
```

Los archivos compilados estarán en la carpeta `dist`.

## Estructura del Proyecto

El proyecto se compone de las siguientes carpetas y archivos principales:

- **src/**: Contiene el código fuente principal.
- **public/**: Recursos estáticos y archivo index.html.
- **dist/**: Carpeta donde se generan los archivos de producción.
- **quasar.conf.js**: Archivo de configuración de Quasar.

## Personalización

Puedes personalizar los temas, íconos y configuraciones desde el archivo `quasar.conf.js`.

## Documentación

- [Documentación de Vue.js](https://vuejs.org/guide/introduction.html)
- [Documentación de Quasar](https://quasar.dev/)
