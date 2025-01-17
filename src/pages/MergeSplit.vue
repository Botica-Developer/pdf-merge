<script setup lang="ts">
import { ref } from 'vue';
import { useQuasar } from 'quasar';
import usePdf from 'src/composables/usePdf';

const { notify } = useQuasar();
const { mergeHalfPages, downloadPdf } = usePdf();
const isLoading = ref(false);
const pdfFiles = ref<File[]>([]);
const dialog = ref(false);
const mergedPdfFile = ref<Uint8Array>();

// Función para fusionar los archivos PDF seleccionados
const mergePDFs = async () => {
  if (pdfFiles.value.length === 0) return; // Si no hay archivos seleccionados, salir

  isLoading.value = true; // Mostrar indicador de carga

  // Fusionar las dos primeras páginas de los archivos PDF seleccionados
  mergedPdfFile.value = await mergeHalfPages(pdfFiles.value[0], pdfFiles.value[1]);

  if (mergedPdfFile.value) downloadPdf(mergedPdfFile.value); // Descargar el PDF fusionado si existe

  setTimeout(() => {
    // dialog.value = true; // Mostrar el diálogo (comentado)
    isLoading.value = false; // Ocultar indicador de carga
  }, 1000);
};

// Función para descargar el PDF fusionado
const downloadMergedPdf = () => {
  if (!mergedPdfFile.value) return; // Si no hay PDF fusionado, salir

  downloadPdf(mergedPdfFile.value); // Descargar el PDF fusionado

  // Mostrar notificación de éxito
  notify({ message: 'PDF fusionado descargado', color: 'positive', position: 'top' });

  clearFiles(); // Limpiar los archivos seleccionados
};

// Función para limpiar los archivos seleccionados
const clearFiles = () => {
  pdfFiles.value = [];
  dialog.value = false;
};
</script>

<template>
  <q-page padding class="column">
    <section class="main">
      <div>
        <!-- Botón para limpiar la selección de archivos -->
        <q-btn flat class="q-mr-lg" v-if="pdfFiles.length > 0" color="negative" label="Limpiar selección" @click="clearFiles" />
        <!-- Botón para fusionar y descargar los archivos PDF -->
        <q-btn outline color="primary" label="Fusionar y descargar" @click="mergePDFs" :disable="pdfFiles.length === 0 || isLoading" />
      </div>
      <!-- Componente para seleccionar archivos PDF -->
      <q-file
        class="full-width"
        v-model="pdfFiles"
        multiple
        accept="application/pdf"
        label="Seleccionar archivos PDF"
        use-chips
        filled
        @add="pdfFiles = $event"
        :disable="isLoading"
      />
    </section>

    <!-- Diálogo que se muestra cuando la fusión de PDF se completa -->
    <q-dialog v-model="dialog">
      <q-card>
        <q-card-section>
          <div class="text-h6">Fusión de PDF Completa</div>
        </q-card-section>

        <q-card-actions align="right">
          <!-- Botón para cerrar el diálogo -->
          <q-btn flat label="Cerrar" color="negative" class="q-mr-sm" @click="clearFiles" v-close-popup />
          <!-- Botón para descargar el PDF fusionado -->
          <q-btn outline color="primary" label="Descargar PDF Fusionado" @click="downloadMergedPdf" />
        </q-card-actions>
      </q-card>
    </q-dialog>

    <!-- Indicador de carga -->
    <q-inner-loading :showing="isLoading" dark>
      <q-spinner-hourglass size="5rem" color="white" />
    </q-inner-loading>
  </q-page>
</template>

<style lang="scss" scoped>
.main {
  flex: 1;
  display: flex;
  justify-content: flex-start;
  align-items: flex-end;
  flex-direction: column;
  gap: 1rem;
}

.q-uploader {
  flex: 1;
  max-height: calc(100svh - 100px);
  overflow: auto;
}
</style>
