import pdf from 'pdf-parse';

type PDFParseResult = {
  text: string;
  numpages: number;
  info: object;
};

export const extractTextFromPDF = async (buffer: Buffer): Promise<string> => {
  const data = (await pdf(buffer)) as PDFParseResult;
  return data.text;
};
