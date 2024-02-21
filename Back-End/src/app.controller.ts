import {
  Body,
  Controller,
  Post,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { AppService } from './app.service';
import { FilesInterceptor } from '@nestjs/platform-express';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Post('/upload')
  @UseInterceptors(FilesInterceptor('files', 5, { dest: './uploads/' }))
  async uploadFiles(
    @UploadedFiles() files: Express.Multer.File[],
    @Body('question') question: string,
  ) {
    if (!files || files.length === 0 || !question) {
      return { error: 'Files or question not provided' };
    }
    return await this.appService.process_docs(files, question);
  }

  @Post('/convertToBinary')
  async convertToBinary(@Body('prompt') prompt: string) {
    if (!prompt) {
      return { error: 'Prompt not provided' };
    }
    return await this.appService.convert_to_binary(prompt);
  }

  @Post('/countVowels')
  async countVowels(@Body('prompt') prompt: string) {
    if (!prompt) {
      return { error: 'Prompt not provided' };
    }
    return await this.appService.count_vowels(prompt);
  }
}
