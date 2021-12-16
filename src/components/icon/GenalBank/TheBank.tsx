import React from "react";
import { IconProps } from "iconType";
import { colors } from "styles/colors";

export const TheBank = ({
  width = 36,
  height = 36,
  color = colors.primary1,
}: IconProps) => {
  return (
    <svg
      width="36"
      height="36"
      viewBox="0 0 36 36"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{ width, height }}
    >
      <path
        d="M1.60752 35.4167H34.3918C34.9585 35.4167 35.4163 34.9588 35.4163 34.3921V30.294C35.4163 29.7273 34.9585 29.2695 34.3918 29.2695H31.3183V14.926H34.3918C34.9585 14.926 35.4163 14.4682 35.4163 13.9015V9.80335C35.4163 9.41595 35.197 9.06056 34.8497 8.88766L18.4575 0.691399C18.1694 0.547325 17.83 0.547325 17.5418 0.691399L1.14968 8.88766C0.80231 9.06056 0.583008 9.41595 0.583008 9.80335V13.9015C0.583008 14.4682 1.04084 14.926 1.60752 14.926H4.68105V29.2695H1.60752C1.04084 29.2695 0.583008 29.7273 0.583008 30.294V34.3921C0.583008 34.9588 1.04084 35.4167 1.60752 35.4167ZM2.63203 12.8769V10.4373L17.9997 2.75329L33.3673 10.4373V12.8769H2.63203ZM29.2693 14.926V29.2695H27.2203V14.926H29.2693ZM25.1712 14.926V29.2695H21.0732V14.926H25.1712ZM19.0242 14.926V29.2695H16.9752V14.926H19.0242ZM14.9261 14.926V29.2695H10.8281V14.926H14.9261ZM8.77909 14.926V29.2695H6.73007V14.926H8.77909ZM2.63203 31.3185H33.3673V33.3676H2.63203V31.3185Z"
        fill={color}
      />
    </svg>
  );
};
