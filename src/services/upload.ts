import { API } from "utils/api";
import endpoints from "helpers/endpoints";
import { AxiosRequestConfig } from "axios";
import { DocumentFileNameKey, DocumentType } from "utils/imageUtils";

enum UploadDataKey {
  File = "file",
  FileKey = "fileKey",
  FileType = "fileType",
}

export const buildFileUploadData = (
  file: File,
  fileKey: DocumentFileNameKey,
  fileType: DocumentType
) => {
  const formData = new FormData();
  formData.append(UploadDataKey.File, file);
  formData.append(UploadDataKey.FileKey, fileKey);
  formData.append(UploadDataKey.FileType, fileType);
  return formData;
};

export const uploadImageFile = ({ data, ...restProps }: AxiosRequestConfig) => {
  return API.post(endpoints.uploadFile, data, {
    headers: { "Content-Type": "multipart/form-data" },
    ...restProps,
  });
};
