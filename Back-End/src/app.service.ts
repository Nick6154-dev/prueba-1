import { Injectable } from '@nestjs/common';
import { OpenAI as LangchainOpenAI, OpenAIEmbeddings } from '@langchain/openai';
import { PDFLoader } from 'langchain/document_loaders/fs/pdf';
import { MemoryVectorStore } from 'langchain/vectorstores/memory';
import { RetrievalQAChain } from 'langchain/chains';
import { OpenAI } from 'openai';
import { PDFDocument } from 'pdf-lib';
import fs from 'fs/promises';

import * as process from 'node:process';

@Injectable()
export class AppService {
  constructor() {}

  process_docs = async (
    files: Express.Multer.File[] | undefined,
    question: string,
  ) => {
    try {
      const openAIApiKey = process.env.OPENAI_API_KEY;
      const model = new LangchainOpenAI({ openAIApiKey: openAIApiKey });
      const responses = [];
      for (const file of files) {
        if (file.mimetype !== 'application/pdf') {
          await this.convertToPDF(file.path, file.path);
        }
        const loader = new PDFLoader(file.path, { splitPages: false });
        const doc = await loader.load();
        const vectorStore = await MemoryVectorStore.fromDocuments(
          doc,
          new OpenAIEmbeddings({ openAIApiKey: openAIApiKey }),
        );
        const vectorStoreRetriever = vectorStore.asRetriever();
        const chain = RetrievalQAChain.fromLLM(model, vectorStoreRetriever);
        const response = await chain.call({ query: question });
        responses.push(response);
      }
      return responses;
    } catch (error) {
      return `Error inesperado: ${error}`;
    }
  };

  convertToPDF = async (inputFilePath: string, outputFilePath: string) => {
    try {
      const inputData = await fs.readFile(inputFilePath);
      const pdfDoc = await PDFDocument.create();
      const page = pdfDoc.addPage();
      page.drawText(inputData.toString());
      const pdfBytes = await pdfDoc.save();
      await fs.writeFile(outputFilePath, pdfBytes);
      console.log(
        `El archivo se ha convertido a PDF y se ha guardado en: ${outputFilePath}`,
      );
    } catch (error) {
      console.error('Error al convertir el archivo a PDF:', error);
    }
  };

  openaiRequest = async (prompt: string, messageContent: string) => {
    try {
      const openAIApiKey = process.env.OPENAI_API_KEY;
      const openai = new OpenAI({
        apiKey: openAIApiKey,
      });
      const completion = await openai.chat.completions.create({
        messages: [
          {
            role: 'assistant',
            content: messageContent + prompt,
          },
        ],
        model: 'gpt-3.5-turbo',
      });
      return {
        text: completion.choices[0].message.content,
        tokens: completion.usage.total_tokens,
      };
    } catch (error) {
      return `Error inesperado: ${error}`;
    }
  };

  convert_to_binary = async (prompt: string) => {
    return await this.openaiRequest(
      prompt,
      '¿Cuál es el equivalente binario de ',
    );
  };

  count_vowels = async (prompt: string) => {
    return await this.openaiRequest(
      prompt,
      'Cuenta el numero de vocales en esta frase: ',
    );
  };
}
