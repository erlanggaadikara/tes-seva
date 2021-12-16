import { Area, Point } from "react-easy-crop/types";
import { fromImage } from "imtool";
import { ImageType } from "models/models";
import { suffixJpeg } from "const/const";
import { getClientWidth } from "./componentUtils";

export enum DocumentType {
  KTP = "KTP",
}

export enum DocumentFileNameKey {
  Self = "self",
}

export enum FrameType {
  Capture = "Capture",
  Preview = "Preview",
  Crop = "Crop",
}

export const frameRatios = {
  [DocumentType.KTP]: {
    [FrameType.Capture]: 203 / 328,
    [FrameType.Crop]: 203 / 328,
    [FrameType.Preview]: 203 / 328,
  },
};

export const frameMargins = {
  [DocumentType.KTP]: {
    [FrameType.Capture]: [0, 16],
    [FrameType.Crop]: [0, 16],
    [FrameType.Preview]: [0, 16],
  },
};

export const getFrameSize = (
  docTypeKey: DocumentType,
  frameType: FrameType
) => {
  const verticalMargin = frameMargins[docTypeKey][frameType][0];
  const horizontalMargin = frameMargins[docTypeKey][frameType][1];
  const width = getClientWidth() - horizontalMargin * 2;
  return {
    width,
    height: Math.floor(frameRatios[docTypeKey][frameType] * width),
    verticalMargin,
    horizontalMargin,
  };
};

export const getImageBase64ByFile = (
  file: File,
  callback: (value: string | ArrayBuffer | null) => void
) => {
  const reader = new FileReader();
  reader.readAsDataURL(file);
  reader.onload = () => {
    if (!!reader.result) {
      callback(reader.result);
    } else {
      callback(null);
    }
  };
  reader.onerror = () => {
    callback(null);
  };
};

export const getCroppedImg = async (
  imageSrc: string,
  pixelCrop: Area,
  rotation = 0,
  location: Point
): Promise<File> => {
  const { x, y, width, height } = pixelCrop;
  let tool = await fromImage(imageSrc);
  let realX = x;
  let realY = y;
  if (rotation != 0) {
    tool = await tool.rotateDeg(rotation);
    if ((rotation / 90) % 2 == 1) {
      realY = (tool.height - height) / 2 - location.y;
      realX = (tool.width - width) / 2 - location.x;
    }
  }
  if (width > tool.width && height > tool.height) {
    tool = await tool.scale(width, height);
    realX = 0;
    realY = 0;
  }
  const blob = await tool
    .crop(realX, realY, width, height)
    .quality(1)
    .toFile(ImageType.JPEG);
  const file = new File([blob], Date.now().toString().concat(suffixJpeg), {
    type: ImageType.JPEG,
  });
  return Promise.resolve(file);
};

export const createBlobByBase64 = async (imageSrc: string) => {
  const tool = await fromImage(imageSrc);
  const blob = await tool.quality(1).toFile(ImageType.JPEG);
  const file = new File([blob], Date.now().toString().concat(suffixJpeg), {
    type: ImageType.JPEG,
  });
  return Promise.resolve(file);
};
