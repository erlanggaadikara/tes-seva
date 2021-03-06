import React from "react";
import { IconProps } from "components/icon/iconType";

export const GooglePlayLogo = ({ width = 24, height = 32 }: IconProps) => {
  return (
    <svg
      width="24"
      height="32"
      viewBox="0 0 24 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{ width, height }}
    >
      <g filter="url(#filter0_ii)">
        <path
          d="M0.481271 0.489966C0.178788 0.869962 -4.44105e-07 1.4597 -4.44105e-07 2.22339V29.509C-4.44105e-07 30.274 0.178788 30.8625 0.481271 31.2425L0.55819 31.3313L13.4361 16.0463V15.8662V15.6861L0.55819 0.399903L0.481271 0.489966Z"
          fill="url(#paint0_linear)"
        />
        <path
          d="M17.7265 21.1428L13.4346 16.0463V15.8662V15.6861L17.7275 10.5908L17.8242 10.6562L22.9103 14.0859C24.3624 15.0655 24.3624 16.6681 22.9103 17.6489L17.8242 21.0787L17.7265 21.1428Z"
          fill="url(#paint1_linear)"
        />
        <g filter="url(#filter1_i)">
          <path
            d="M17.8259 21.0776L13.4352 15.8662L0.481446 31.2425C0.959598 31.8446 1.75063 31.9186 2.64144 31.319L17.8259 21.0776Z"
            fill="url(#paint2_linear)"
          />
        </g>
        <path
          d="M17.8259 10.6548L2.64144 0.414635C1.75063 -0.186204 0.959598 -0.110945 0.481446 0.491128L13.4362 15.8674L17.8259 10.6548Z"
          fill="url(#paint3_linear)"
        />
      </g>
      <defs>
        <filter
          id="filter0_ii"
          x="0"
          y="0"
          width="23.9994"
          height="31.7332"
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="BackgroundImageFix"
            result="shape"
          />
          <feColorMatrix
            in="SourceAlpha"
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            result="hardAlpha"
          />
          <feOffset dy="-0.209167" />
          <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1" />
          <feColorMatrix
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.12 0"
          />
          <feBlend mode="normal" in2="shape" result="effect1_innerShadow" />
          <feColorMatrix
            in="SourceAlpha"
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            result="hardAlpha"
          />
          <feOffset dy="0.209167" />
          <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1" />
          <feColorMatrix
            type="matrix"
            values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.25 0"
          />
          <feBlend
            mode="normal"
            in2="effect1_innerShadow"
            result="effect2_innerShadow"
          />
        </filter>
        <filter
          id="filter1_i"
          x="0.481445"
          y="15.8662"
          width="17.3444"
          height="15.8669"
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="BackgroundImageFix"
            result="shape"
          />
          <feColorMatrix
            in="SourceAlpha"
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            result="hardAlpha"
          />
          <feOffset dy="-0.209167" />
          <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1" />
          <feColorMatrix
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.08 0"
          />
          <feBlend mode="normal" in2="shape" result="effect1_innerShadow" />
        </filter>
        <linearGradient
          id="paint0_linear"
          x1="12.2945"
          y1="1.93469"
          x2="-8.11"
          y2="19.1259"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#00A0FF" />
          <stop offset="0.0066" stopColor="#00A1FF" />
          <stop offset="0.2601" stopColor="#00BEFF" />
          <stop offset="0.5122" stopColor="#00D2FF" />
          <stop offset="0.7604" stopColor="#00DFFF" />
          <stop offset="1" stopColor="#00E3FF" />
        </linearGradient>
        <linearGradient
          id="paint1_linear"
          x1="24.8005"
          y1="15.8662"
          x2="-0.350114"
          y2="15.8662"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#FFE000" />
          <stop offset="0.4087" stopColor="#FFBD00" />
          <stop offset="0.7754" stopColor="#FFA500" />
          <stop offset="1" stopColor="#FF9C00" />
        </linearGradient>
        <linearGradient
          id="paint2_linear"
          x1="15.4415"
          y1="18.6963"
          x2="-12.2297"
          y2="42.0097"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#FF3A44" />
          <stop offset="1" stopColor="#C31162" />
        </linearGradient>
        <linearGradient
          id="paint3_linear"
          x1="-2.781"
          y1="-8.59203"
          x2="9.57494"
          y2="1.81805"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#32A071" />
          <stop offset="0.0685" stopColor="#2DA771" />
          <stop offset="0.4762" stopColor="#15CF74" />
          <stop offset="0.8009" stopColor="#06E775" />
          <stop offset="1" stopColor="#00F076" />
        </linearGradient>
      </defs>
    </svg>
  );
};
