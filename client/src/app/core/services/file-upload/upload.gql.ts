import gql from 'graphql-tag';

export const UPLOADS = gql`
  query uploads {
    uploads {
      id
      fileId
      filename
    }
  }
`;

export const SINGLE_UPLOAD = gql`
  mutation singleUpload($file: Upload!) {
    singleUpload(file: $file) {
      id
      fileId
      filename
    }
  }
`;

export const MULTIPLE_UPLOAD = gql`
  mutation multipleUpload($text: String, $files: [Upload!]!) {
    multipleUpload(text: $text, files: $files) {
      id
      fileId
      filename
    }
  }
`;
