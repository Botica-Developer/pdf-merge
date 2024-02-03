import { PDFDocument } from 'pdf-lib';

export const usePdf = () => {
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

  return {
    mergePdfs,
    downloadPdf,
  };
};

export default usePdf;
