import { Apollo } from 'apollo-angular';
import { DataProxy } from 'apollo-cache';
import { ApolloQueryResult } from 'apollo-client';
import { FetchResult } from 'apollo-link';
import { Observable } from 'rxjs';

import { Injectable } from '@angular/core';

import { MULTIPLE_UPLOAD, SINGLE_UPLOAD, UPLOADS } from './upload.gql';
import { map } from 'rxjs/operators';

@Injectable()
export class FileUploadService {
  constructor(private readonly apollo: Apollo) {}

  public upload(files: FileList): Observable<FetchResult> {
    if (files.length > 1) {
      const fileArray = Array.from(files);

      return this.multipleUpload(fileArray);
    }

    return this.apollo
      .mutate({
        mutation: SINGLE_UPLOAD,
        variables: {
          file: files[0]
        },
        update: (proxy: DataProxy, mutationResult: FetchResult<any>) => {
          const data: any = proxy.readQuery({ query: UPLOADS });
          const {
            data: { singleUpload: newUpload }
          } = mutationResult;
          data.uploads.push(newUpload);
          proxy.writeQuery({ query: UPLOADS, data });
        }
      }).pipe(
      map((res) => {
        return res;
      }));
  }

  public multipleUpload(files: FileList | File[]): Observable<FetchResult> {
    return this.apollo
      .mutate({
        mutation: MULTIPLE_UPLOAD,
        variables: {
          text: '123',
          files
        },
        update: (proxy: DataProxy, mutationResult: FetchResult<any>) => {
          const data: any = proxy.readQuery({ query: UPLOADS });
          const {
            data: { multipleUpload: newUploads }
          } = mutationResult;
          data.uploads = data.uploads.concat(newUploads);
          proxy.writeQuery({ query: UPLOADS, data });
        }
      }).pipe(
        map((res) => {
          return res;
        }));
  }

  public queryAll(): Observable<ApolloQueryResult<any>> {
    return this.apollo.watchQuery({ query: UPLOADS }).valueChanges;
  }
}
