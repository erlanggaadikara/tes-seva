import React, { ReactElement } from "react";
import { replaceSuffixWith } from "utils/stringUtils";
import { FileFormat } from "models/models";
import Image from "next/image";

interface WebpPictureProps {
  src: string;
  fallbackImage: ReactElement;
}

export const WebpPicture = ({
  src,
  fallbackImage,
  ...restProps
}: WebpPictureProps) => {
  // const webpUrl = encodeURI(replaceSuffixWith(src, FileFormat.Webp.toString()));
  if (!src) return fallbackImage;
  return <Image src={src} {...restProps} />;
};
