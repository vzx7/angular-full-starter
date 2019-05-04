import { Apollo } from 'apollo-angular';
import { Observable } from 'rxjs';

import { Injectable } from '@angular/core';

import { MULTIPLE_UPLOAD, SINGLE_UPLOAD, UPLOADS } from './upload.gql';
import { catchError, map } from 'rxjs/operators';
import { handleError } from 'core/utils/handle-error';
import { IFile } from './interfaces/i.file';
import { IQueryFiles } from './interfaces/i.query.files';

@Injectable()
export class FileUploadService {
  constructor(private readonly apollo: Apollo) { }

  /**
   * Upload one file.
   * @param file File.
   * @return Observable<IFile>
   */
  public upload(file: File): Observable<IFile> {
    return this.apollo
      .mutate({
        mutation: SINGLE_UPLOAD,
        variables: {
          file
        }
        /* Use, if you has data from QueryAll.
                update: (proxy: DataProxy, mutationResult: FetchResult<any>) => {
                  const data: any = proxy.readQuery({ query: UPLOADS });
                  const {
                    data: { singleUpload: newUpload }
                  } = mutationResult;
                  data.uploads.push(newUpload);
                  proxy.writeQuery({ query: UPLOADS, data });
                } */
      }).pipe(
        map(({ data }: any) => data.singleUpload),
        catchError(handleError)
      );
  }

  /**
   * Upload one file.
   * @param files FileList.
   * @return Observable<IFile[]>
   */
  public multipleUpload(files: FileList | File[]): Observable<IFile[]> {
    return this.apollo
      .mutate({
        mutation: MULTIPLE_UPLOAD,
        variables: {
          text: '123',
          files
        },
        /*  Use, if you has data from QueryAll.
               update: (proxy: DataProxy, mutationResult: FetchResult<any>) => {
                  const data: any = proxy.readQuery({ query: UPLOADS });
                  const {
                    data: { multipleUpload: newUploads }
                  } = mutationResult;
                  data.uploads = data.uploads.concat(newUploads);
                  proxy.writeQuery({ query: UPLOADS, data });
                } */
      }).pipe(
        map(({ data }: any) => data.multipleUpload),
        catchError(handleError)
      );
  }

  /**
   * Get all files.
   * @return Observable<IFile[]>.
   */
  public queryAll(): Observable<IFile[]> {
    return this.apollo.watchQuery<IQueryFiles>({ query: UPLOADS })
      .valueChanges.pipe(map((res) => {
        return res.data.uploads;
      }));
  }
}
