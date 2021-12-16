import React, { useCallback, useEffect, useState } from "react";
import { videoInput } from "const/const";
import { Select } from "components/form/Select/Select";
import { DownOutlined } from "components/icon/DownOutlined/DownOutlined";
import { FormControlValue, Option } from "types/types";
import styled from "styled-components";
import { CameraType } from "models/models";
import { isIphone, screenSize } from "utils/window";
import { useTranslation } from "react-i18next";

interface CameraSelectProps {
  onSelected?: (value: string | null) => void;
}
export const CameraSelect = ({ onSelected }: CameraSelectProps) => {
  const [selectedDevice, setSelectedDevice] = useState<FormControlValue>("");
  const [options, setOptions] = useState<Option<FormControlValue>[]>([]);

  const { t } = useTranslation();

  const handleDevices = useCallback(
    (mediaDevices) => {
      if (!mediaDevices) {
        onSelected && onSelected(null);
        return;
      }

      const devices = mediaDevices
        .filter((item: MediaDeviceInfo) => item.kind === videoInput)
        .sort((lhs: MediaDeviceInfo, rhs: MediaDeviceInfo) => {
          const lhsValue = isBackCamera(lhs.label);
          const rhsValue = isBackCamera(rhs.label);
          if (lhsValue === rhsValue) {
            return 0;
          } else {
            // back camera will put in front of the list
            return lhsValue ? -1 : 1;
          }
        });

      if (!devices || devices.length < 1) {
        onSelected && onSelected(null);
        return;
      }

      createOptions(devices);
    },
    [setOptions]
  );

  const isBackCamera = (value: string) =>
    value.toLowerCase().includes(CameraType.BackEN) ||
    value.toLowerCase().includes(CameraType.BackBAHASA);

  const formatCameraLabelsSkipIOS = (
    acc: Option<FormControlValue>[],
    next: MediaDeviceInfo
  ) => {
    if (isIphone) {
      acc.push({ label: next.label, value: next.deviceId });
      return acc;
    }
    const label: string = !next.label
      ? t("camera.camera")
      : isBackCamera(next.label)
      ? t("camera.backCamera")
      : t("camera.frontCamera");
    const countedCamera = acc.filter((camera) =>
      camera.label.startsWith(label)
    ).length;
    acc.push({ label: `${label} ${countedCamera + 1}`, value: next.deviceId });
    return acc;
  };

  const createOptions = (devices: MediaDeviceInfo[]) => {
    const options: Option<FormControlValue>[] = devices.reduce(
      formatCameraLabelsSkipIOS,
      []
    );
    if (options.length > 0) {
      const backCameras = options.filter((item) => isBackCamera(item.label));
      // we presume the second back camera has better quality.
      const defaultItem =
        backCameras.length > 1
          ? backCameras[1]
          : backCameras[0] ?? options[options.length - 1];
      onSelected && onSelected(defaultItem.value?.toString() ?? null);
      setSelectedDevice(defaultItem.value?.toString() ?? "");
    } else {
      onSelected && onSelected(null);
    }
    setOptions(options);
  };

  useEffect(() => {
    navigator.mediaDevices
      .enumerateDevices()
      .then(handleDevices)
      .catch(() => onSelected && onSelected(null));
  }, [handleDevices]);

  const onChoose = (optionValue: FormControlValue) => {
    setSelectedDevice(optionValue);
    onSelected && onSelected(optionValue as string);
  };

  return (
    <StyledSelectWrapper>
      {options && options.length > 1 && (
        <Select
          value={selectedDevice}
          options={options}
          onChoose={onChoose}
          suffixIcon={DownOutlined}
          floatDropdown={true}
        />
      )}
    </StyledSelectWrapper>
  );
};

const StyledSelectWrapper = styled.div`
  width: 100%;
  height: 56px;
  @media (max-width: ${screenSize.mobileS}) {
    height: 40px;
  }
`;
