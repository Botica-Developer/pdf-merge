import { PDFDocument } from 'pdf-lib';

/**
 * Fusiona múltiples archivos PDF en un solo documento PDF.
 *
 * @param {File[]} files - Una matriz de objetos File que representan los archivos PDF a fusionar.
 * @returns {Promise<Uint8Array>} Una promesa que se resuelve con un Uint8Array que contiene los datos del PDF fusionado.
 * @throws {Error} Si no se proporcionan archivos.
 */
const mergePdfs = async (files: File[]) => {
  // Crear un nuevo PDFDocument
  const mergedPdf = await PDFDocument.create();

  // Obtener los archivos de la entrada
  if (files.length === 0) throw new Error('No se proporcionaron archivos');

  // Iterar sobre cada archivo
  for (const file of files) {
    const arrayBuffer = await file.arrayBuffer();
    const pdf = await PDFDocument.load(arrayBuffer);

    // Copiar todas las páginas de los PDFs existentes en el nuevo
    const pages = await mergedPdf.copyPages(pdf, pdf.getPageIndices());
    pages.forEach((page) => mergedPdf.addPage(page));
  }

  // Guardar el PDF fusionado
  return await mergedPdf.save();
};

/**
 * Fusiona dos archivos PDF, combinando la mitad superior de las páginas del primer PDF
 * con la mitad inferior de las páginas del segundo PDF.
 *
 * @param pdf1 - El primer archivo PDF.
 * @param pdf2 - El segundo archivo PDF.
 * @returns Una promesa que se resuelve con el nuevo archivo PDF fusionado en formato ArrayBuffer.
 *
 * @remarks
 * - Si uno de los PDFs tiene menos páginas que el otro, se reutilizará la primera página del PDF
 *   con menos páginas para completar las páginas faltantes.
 * - La mitad superior de cada página del primer PDF se combinará con la mitad inferior de la
 *   página correspondiente del segundo PDF.
 * - El tamaño de las nuevas páginas será igual al tamaño de las páginas del primer PDF.
 */
const mergeHalfPages = async (pdf1: File, pdf2: File) => {
  // Cargar los PDFs existentes
  const pdfDoc1 = await PDFDocument.load(await pdf1.arrayBuffer());
  const pdfDoc2 = await PDFDocument.load(await pdf2.arrayBuffer());

  // Crear un nuevo documento PDF
  const newPdfDoc = await PDFDocument.create();

  // Obtener el número máximo de páginas entre los dos PDFs
  const pageCount = Math.max(pdfDoc1.getPageCount(), pdfDoc2.getPageCount());

  // Iterar sobre cada página
  for (let i = 0; i < pageCount; i++) {
    // Obtener la página correspondiente de cada PDF, o la primera página si no existe
    const page1 = pdfDoc1.getPages()[i] || pdfDoc1.getPages()[0];
    const page2 = pdfDoc2.getPages()[i] || pdfDoc2.getPages()[0];

    // Crear una nueva página en el nuevo PDF con el tamaño de la primera página
    const newPage = newPdfDoc.addPage([page1.getWidth(), page1.getHeight()]);

    // Copiar y posicionar la primera mitad de la página1 en la nueva página
    const copiedPage1 = await newPdfDoc.embedPage(page1);
    newPage.drawPage(copiedPage1);

    // Copiar y posicionar la segunda mitad de la página2 en la nueva página
    const copiedPage2 = await newPdfDoc.embedPage(page2);
    newPage.drawPage(copiedPage2, {
      x: 0,
      y: (page1.getHeight() / 2) * -1, // Posicionar en la mitad inferior
    });
  }

  // Guardar el nuevo PDF
  return await newPdfDoc.save();
};

/**
 * Descarga un archivo PDF a partir de un Uint8Array.
 *
 * @param {Uint8Array} data - Los datos del PDF en formato Uint8Array.
 */
const downloadPdf = (data: Uint8Array) => {
  // Crear un Blob a partir de los datos del PDF
  const blob = new Blob([data], { type: 'application/pdf' });

  // Obtener la fecha actual en formato YYYY_MM_DD
  const currentDate = new Date().toISOString().split('T')[0].replace(/-/g, '_');
  const filename = `merged_${currentDate}.pdf`;

  // Crear una URL de descarga para el Blob
  const downloadUrl = window.URL.createObjectURL(blob);

  // Crear un enlace temporal para iniciar la descarga
  const link = document.createElement('a');
  link.href = downloadUrl;
  link.setAttribute('download', filename);
  document.body.appendChild(link);
  link.click();

  // Eliminar el enlace temporal del DOM
  document.body.removeChild(link);

  // Revocar la URL de descarga para liberar memoria
  window.URL.revokeObjectURL(downloadUrl);
};

export const usePdf = () => {
  return {
    mergePdfs,
    downloadPdf,
    mergeHalfPages,
  };
};

export default usePdf;
