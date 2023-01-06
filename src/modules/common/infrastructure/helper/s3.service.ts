import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { S3 } from 'aws-sdk';
@Injectable()
export class MediaService {
  private readonly region;
  private readonly accessKeyId;
  private readonly secretAccessKey;
  private readonly publicBucketName;
 private readonly imageUrl;
  constructor(
    //private readonly mediaRepository: BaseRepository<T>,
    private readonly configService: ConfigService,
  ) {
    this.region = this.configService.get('AWS_REGION');
    this.accessKeyId = this.configService.get('AWS_ACCESS_KEY_ID');
    this.secretAccessKey = this.configService.get('AWS_SECRET_ACCESS_KEY');
    this.publicBucketName = this.configService.get('AWS_PUBLIC_BUCKET_NAME');
    this.imageUrl=this.configService.get('AWS_URL');
  }
  private getS3() {
    return new S3({
      region: this.region,
      accessKeyId: this.accessKeyId,
      secretAccessKey: this.secretAccessKey,
    });
  }
  getLinkMedia(key) {
    const s3 = this.getS3();
    return s3.getSignedUrl('getObject', {
      Key: key,
      Bucket: this.publicBucketName,
    });
  }

  async updateACL(media_id) {
    //const media = await this.mediaRepository.findById(media_id);
    const s3 = this.getS3();
    s3.putObjectAcl(
      {
        Bucket: this.publicBucketName,
        Key: media_id.key,
        ACL: 'public-read',
      },
      // eslint-disable-next-line @typescript-eslint/no-empty-function
      (err, data) => {},
    );
    return (
      s3.endpoint.protocol +
      '//' +
      this.publicBucketName +
      '.' +
      s3.endpoint.hostname +
      '/' +
      media_id.key
    );
  }



  async deleteFileS3(mediaName) {
    const s3 = this.getS3();
    const params = {
      Bucket: this.publicBucketName,
      Key: mediaName.key,
    };
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    //return s3.send(new DeleteObjectCommand(deleteParams))
    s3.deleteObject(params, (err, data) => {});
    await mediaName.remove();
    return true;
  }

   async uploadS3( file, key ) {
    const s3 = this.getS3();
    const params = {
      Bucket: this.publicBucketName,
      Key: key,
      Body: file.buffer,
      ContentType:  file.mimetype,
      // ACL: 'public-read', // comment if private file
    };
    return new Promise((resolve, reject) => {
      s3.upload(params, (err, data) => {
        if (err) {
          reject(err.message);
        }
        resolve(data);
      });
    });
  }

 

 
}