import { PDFDocument } from 'pdf-lib';

const mergePdfs = async (files: File[]) => {
  // Create a new PDFDocument
  const mergedPdf = await PDFDocument.create();

  // Get the files from the input
  if (files.length === 0) throw new Error('No files provided');

  // Loop over each file
  for (const file of files) {
    const arrayBuffer = await file.arrayBuffer();
    const pdf = await PDFDocument.load(arrayBuffer);

    // Copy all pages from the existing PDFs into the new one
    const pages = await mergedPdf.copyPages(pdf, pdf.getPageIndices());
    pages.forEach((page) => mergedPdf.addPage(page));
  }

  // Save the merged PDF
  return await mergedPdf.save();
};

const mergeHalfPages = async (pdf1: File, pdf2: File) => {
  // Load the existing PDFs
  const pdfDoc1 = await PDFDocument.load(await pdf1.arrayBuffer());
  const pdfDoc2 = await PDFDocument.load(await pdf2.arrayBuffer());

  // Create a new PDF document
  const newPdfDoc = await PDFDocument.create();

  const pageCount = Math.max(pdfDoc1.getPageCount(), pdfDoc2.getPageCount());

  for (let i = 0; i < pageCount; i++) {
    // This example assumes each PDF has the same number of pages
    // You might need to adjust if they differ
    const page1 = pdfDoc1.getPages()[i] || pdfDoc1.getPages()[0]; // Fallback to first page if undefined
    const page2 = pdfDoc2.getPages()[i] || pdfDoc2.getPages()[0]; // Fallback to first page if undefined

    // Create a new page in the new PDF
    const newPage = newPdfDoc.addPage([page1.getWidth(), page1.getHeight()]);

    // Copy and position the first half of page1 onto the new page
    const copiedPage1 = await newPdfDoc.embedPage(page1);
    newPage.drawPage(copiedPage1);

    // Copy and position the second half of page2 onto the new page
    const copiedPage2 = await newPdfDoc.embedPage(page2);
    newPage.drawPage(copiedPage2, {
      x: 0,
      y: (page1.getHeight() / 2) * -1,
    });
  }

  // Save the new PDF to a file
  return await newPdfDoc.save();
};

const downloadPdf = (data: Uint8Array) => {
  const blob = new Blob([data], { type: 'application/pdf' });

  const currentDate = new Date().toISOString().split('T')[0].replace(/-/g, '_');
  const filename = `merged_${currentDate}.pdf`;

  const downloadUrl = window.URL.createObjectURL(blob);

  const link = document.createElement('a');
  link.href = downloadUrl;
  link.setAttribute('download', filename);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
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
