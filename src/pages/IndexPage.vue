<script setup lang="ts">
import { ref } from 'vue';
import { useQuasar } from 'quasar';
import usePdf from 'src/composables/usePdf';

const { notify } = useQuasar();
const { mergePdfs, downloadPdf } = usePdf();
const isLoading = ref(false);
const pdfFiles = ref<File[]>([]);
const dialog = ref(false);
const mergedPdfFile = ref<Uint8Array>();

// Función para fusionar los archivos PDF seleccionados
const mergePDFs = async () => {
  if (pdfFiles.value.length === 0) return; // Si no hay archivos seleccionados, salir de la función

  isLoading.value = true; // Mostrar el indicador de carga

  // Fusionar los archivos PDF y almacenar el resultado
  mergedPdfFile.value = await mergePdfs(pdfFiles.value);

  // Si la fusión fue exitosa, descargar el archivo PDF fusionado
  if (mergedPdfFile.value) downloadPdf(mergedPdfFile.value);

  // Ocultar el indicador de carga después de un segundo
  setTimeout(() => {
    // dialog.value = true; // Mostrar el diálogo (comentado)
    isLoading.value = false;
  }, 1000);
};

// Función para descargar el archivo PDF fusionado
const downloadMergedPdf = () => {
  if (!mergedPdfFile.value) return; // Si no hay archivo fusionado, salir de la función

  downloadPdf(mergedPdfFile.value); // Descargar el archivo PDF fusionado

  // Mostrar notificación de éxito
  notify({ message: 'PDF fusionado descargado', color: 'positive', position: 'top' });

  clearFiles(); // Limpiar la selección de archivos
};

// Función para limpiar la selección de archivos y cerrar el diálogo
const clearFiles = () => {
  pdfFiles.value = []; // Limpiar la lista de archivos seleccionados
  dialog.value = false; // Cerrar el diálogo
};
</script>

<template>
  <q-page padding class="column">
    <section class="main">
      <div>
        <!-- Botón para limpiar la selección de archivos -->
        <q-btn flat class="q-mr-lg" v-if="pdfFiles.length > 0" color="negative" label="Clear selection" @click="clearFiles" />
        <!-- Botón para fusionar y descargar los archivos PDF seleccionados -->
        <q-btn outline color="primary" label="Merge and download" @click="mergePDFs" :disable="pdfFiles.length === 0 || isLoading" />
      </div>
      <!-- Componente para seleccionar archivos PDF -->
      <q-file
        class="full-width"
        v-model="pdfFiles"
        multiple
        accept="application/pdf"
        label="Select PDF files"
        use-chips
        filled
        @add="pdfFiles = $event"
        :disable="isLoading"
      />
    </section>

    <!-- Diálogo que se muestra cuando la fusión de PDFs se completa -->
    <q-dialog v-model="dialog">
      <q-card>
        <q-card-section>
          <div class="text-h6">PDF Merge Complete</div>
        </q-card-section>

        <q-card-actions align="right">
          <!-- Botón para cerrar el diálogo -->
          <q-btn flat label="Close" color="negative" class="q-mr-sm" @click="clearFiles" v-close-popup />
          <!-- Botón para descargar el archivo PDF fusionado -->
          <q-btn outline color="primary" label="Download Merged PDF" @click="downloadMergedPdf" />
        </q-card-actions>
      </q-card>
    </q-dialog>

    <!-- Indicador de carga que se muestra mientras se fusionan los archivos PDF -->
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
