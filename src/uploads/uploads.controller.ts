import {
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import * as AWS from 'aws-sdk';

const BUCKET_NAME = 'kimbaubereats';

@Controller('uploads')
export class UploadsController {
  @Post('')
  @UseInterceptors(FileInterceptor('file'))
  async uploadFile(@UploadedFile() file) {
    AWS.config.update({
      credentials: {
        accessKeyId: 'AKIA43LPYJBUYAG2VCF2',
        secretAccessKey: '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',
      },
    });
    try {
      const objectName = `${Date.now() + file.originalname}`;
      console.log(file);
      await new AWS.S3()
        .putObject({
          Body: file.arrayBuffer,
          Bucket: BUCKET_NAME,
          Key: objectName,
          ACL: 'public-read',
        })
        .promise();
      const url = `https://${BUCKET_NAME}.s3.amazonaws.com/${objectName}`;
      return { url };
    } catch (error) {
      return null;
    }
  }
}
