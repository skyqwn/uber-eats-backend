import {
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { PutObjectCommand, S3Client } from '@aws-sdk/client-s3';

const returnCurrentDate = () => {
  const date = new Date();
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const hour = date.getHours();
  const minutes = date.getMinutes();
  return `${year}년${month}월${day}일${hour}시${minutes}분`;
};

@Controller('uploads')
export class UploadsController {
  @Post('')
  @UseInterceptors(FileInterceptor('file'))
  async uploadFile(@UploadedFile() file: Express.Multer.File) {
    console.log(file);
    const s3Config = new S3Client({
      region: process.env.AWS_S3_REGION,
      credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
      },
    });

    const objectName = `${returnCurrentDate() + file.originalname}`;
    const input = {
      Body: file.buffer,
      Bucket: process.env.AWS_BUCKET_NAME,
      Key: objectName,
    };
    await s3Config.send(new PutObjectCommand(input));
    const url = `https://${process.env.AWS_BUCKET_NAME}.s3.amazonaws.com/${objectName}`;
    return { url };
  }
}
