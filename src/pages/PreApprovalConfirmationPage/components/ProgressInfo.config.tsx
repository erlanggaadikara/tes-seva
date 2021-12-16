import React from "react";
import { colors } from "styles/colors";
import { CheckedCircleOutlined } from "components/icon/CheckedCircleOutlined/CheckedCircleOutlined";
import { CircleWithDotOutlined } from "components/icon/CircleWithDotOutlined/CircleWithDotOutlined";
interface Config {
  text: string;
  icon: JSX.Element;
  withProgressLine: boolean;
}

export const ProgressConfig: Config[] = [
  {
    text: "preApprovalProgress.confirm.next.preApproved",
    icon: (
      <CheckedCircleOutlined
        color={colors.secondaryText}
        strokeColor={colors.white}
      />
    ),
    withProgressLine: true,
  },
  {
    text: "preApprovalProgress.confirm.next.download",
    icon: <CircleWithDotOutlined />,
    withProgressLine: true,
  },
  {
    text: "preApprovalProgress.confirm.next.fillApp",
    icon: <CircleWithDotOutlined />,
    withProgressLine: true,
  },
  {
    text: "preApprovalProgress.confirm.next.upload",
    icon: <CircleWithDotOutlined />,
    withProgressLine: true,
  },
  {
    text: "preApprovalProgress.confirm.next.track",
    icon: <CircleWithDotOutlined />,
    withProgressLine: false,
  },
];
