<script setup lang="ts">
import { ref } from 'vue';

// Definimos las pestañas disponibles
const tabs = ['merge', 'split'];

// Creamos una referencia reactiva para la pestaña seleccionada
const tab = ref<string>('merge');
</script>

<template>
  <q-layout view="hHh lpR fFf">
    <!-- Encabezado de la aplicación -->
    <q-header elevated class="bg-primary text-white" height-hint="98">
      <q-toolbar class="text-white">
        <q-space />

        <!-- Componente de pestañas -->
        <q-tabs v-model="tab">
          <!-- Generamos las pestañas dinámicamente -->
          <q-route-tab v-for="t in tabs" :key="t" :name="t" :label="t" :to="{ name: t }" />
        </q-tabs>
      </q-toolbar>
    </q-header>

    <!-- Contenedor de la página -->
    <q-page-container>
      <!-- Vista del enrutador -->
      <router-view />
    </q-page-container>
  </q-layout>
</template>
