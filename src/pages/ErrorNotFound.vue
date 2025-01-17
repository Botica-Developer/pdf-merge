<template>
  <!-- Contenedor principal a pantalla completa con fondo azul, texto blanco y centrado -->
  <div class="fullscreen bg-blue text-white text-center q-pa-md flex flex-center">
    <div>
      <!-- Texto grande para el código de error 404 -->
      <div style="font-size: 30vh">404</div>

      <!-- Mensaje de error con opacidad reducida -->
      <div class="text-h2" style="opacity: 0.4">Oops. Nothing here...</div>

      <!-- Botón para regresar a la página principal -->
      <q-btn class="q-mt-xl" color="white" text-color="blue" unelevated to="/" label="Go Home" no-caps />
    </div>
  </div>
</template>

<script setup lang="ts"></script>
