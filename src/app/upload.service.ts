import { Injectable } from '@angular/core';
import * as AWS from 'aws-sdk/global';
import * as S3 from 'aws-sdk/clients/s3'
import { environment } from "../environments/environment.prod"

@Injectable({
  providedIn: 'root'
})
export class UploadService {

  constructor() { }

  uploadFile(file: any, cb: ((err: Error, data: S3.ManagedUpload.SendData) => void) | undefined) {
    const contentType = file.type;
    const bucket = new S3(
          {
              accessKeyId: environment.aws_access_key,
              secretAccessKey: environment.aws_secret_key,
              region: 'ap-south-1'
          }
      );
      const params = {
          Bucket: 'smrge-app-profiles',
          Key: "media/" + file.name,
          Body: file,
          ACL: 'public-read',
          ContentType: contentType
      };
      bucket.upload(params, cb);
//for upload progress
/*bucket.upload(params).on('httpUploadProgress', function (evt) {
          console.log(evt.loaded + ' of ' + evt.total + ' Bytes');
      }).send(function (err, data) {
          if (err) {
              console.log('There was an error uploading your file: ', err);
              return false;
          }
          console.log('Successfully uploaded file.', data);
          return true;
      });*/
}
}
