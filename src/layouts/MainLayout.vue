<script setup lang="ts">
import { ref } from 'vue';

const tabs = ['merge', 'split'];

const tab = ref<string>('merge');
</script>

<template>
  <q-layout view="hHh lpR fFf">
    <q-header elevated class="bg-primary text-white" height-hint="98">
      <q-toolbar class="text-white">
        <q-space />

        <q-tabs v-model="tab">
          <q-route-tab v-for="t in tabs" :key="t" :name="t" :label="t" :to="{ name: t }" />
        </q-tabs>
      </q-toolbar>
    </q-header>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>
