<script setup lang="ts">
import { useQuasar } from 'quasar';
import usePdf from 'src/composables/usePdf';
import { ref } from 'vue';

const { notify } = useQuasar();
const { mergePdfs, downloadPdf } = usePdf();
const isLoading = ref(false);
const pdfFiles = ref<File[]>([]);
const dialog = ref(false);
const mergedPdfFile = ref<Uint8Array>();

const mergePDFs = async () => {
  if (pdfFiles.value.length === 0) return;

  isLoading.value = true;

  mergedPdfFile.value = await mergePdfs(pdfFiles.value);

  setTimeout(() => {
    dialog.value = true;
    isLoading.value = false;
  }, 1000);
};

const downloadMergedPdf = () => {
  if (!mergedPdfFile.value) return;

  downloadPdf(mergedPdfFile.value);

  notify({ message: 'Merged PDF downloaded', color: 'positive', position: 'top' });

  clearFiles();
};

const clearFiles = () => {
  pdfFiles.value = [];
  dialog.value = false;
};
</script>

<template>
  <q-page padding class="column">
    <q-header elevated ref="mainHeader">
      <q-toolbar>
        <q-toolbar-title> PDF Merger </q-toolbar-title>

        <q-btn flat class="q-mr-lg" v-if="pdfFiles.length > 0" color="negative" label="Clear selection" @click="clearFiles" />
        <q-btn outline color="white" label="Merge" @click="mergePDFs" :disable="pdfFiles.length === 0 || isLoading" />
      </q-toolbar>
    </q-header>
    <section class="main">
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

    <q-dialog v-model="dialog">
      <q-card>
        <q-card-section>
          <div class="text-h6">PDF Merge Complete</div>
        </q-card-section>

        <q-card-actions align="right">
          <q-btn flat label="Close" color="negative" class="q-mr-sm" @click="clearFiles" v-close-popup />
          <q-btn outline color="primary" label="Download Merged PDF" @click="downloadMergedPdf" />
        </q-card-actions>
      </q-card>
    </q-dialog>

    <q-inner-loading :showing="isLoading" dark>
      <q-spinner-hourglass size="5rem" color="white" />
    </q-inner-loading>
  </q-page>
</template>

<style lang="scss" scoped>
.main {
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: flex-start;
}

.q-uploader {
  flex: 1;
  max-height: calc(100svh - 100px);
  overflow: auto;
}
</style>
