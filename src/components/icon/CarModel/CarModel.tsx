import React from "react";
import { colors } from "styles/colors";
import { IconProps } from "iconType";

export const CarModelLogo = ({
  color = colors.label,
  width = 24,
  height = 24,
}: IconProps) => {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{
        width: width,
        height: height,
      }}
    >
      <circle cx="12" cy="12" r="12" fill={color} />
      <mask
        id="path-2-outside-1_17285_86683"
        maskUnits="userSpaceOnUse"
        x="3.5"
        y="6.5"
        width="17"
        height="11"
        fill="black"
      >
        <rect fill="white" x="3.5" y="6.5" width="17" height="11" />
        <path d="M19.4894 13.2994C19.5505 12.6945 19.3456 12.092 18.9248 11.6425C18.5049 11.1931 17.9089 10.9378 17.2848 10.941C16.8682 10.941 16.4764 10.7501 16.2268 10.4255L14.6397 8.35942C14.2231 7.81816 13.5701 7.5 12.8766 7.5H7.79315C6.95912 7.5 6.19617 7.95911 5.82255 8.68562L4.77774 10.7218C4.59671 11.0802 4.50165 11.4741 4.5 11.8728V12.6549C4.50165 13.5747 5.00505 14.4245 5.82255 14.8843C5.88207 15.7179 6.5483 16.3889 7.40051 16.475C8.25355 16.5604 9.04626 16.0361 9.27936 15.2322H13.8198C14.0281 15.9805 14.7258 16.5 15.5218 16.5C16.317 16.5 17.0146 15.9805 17.2229 15.2322C18.3719 15.2411 19.3463 14.4101 19.4894 13.2994ZM7.58641 15.6617C7.09954 15.6617 6.70443 15.2775 6.70443 14.8031C6.70774 14.7612 6.70774 14.7193 6.70443 14.6783C6.76642 14.2514 7.14335 13.9348 7.58641 13.9397C8.07328 13.9397 8.46757 14.3239 8.46757 14.7983C8.46757 15.2727 8.07328 15.6577 7.58641 15.6577V15.6617ZM15.5217 15.6617C15.1646 15.6617 14.8431 15.4523 14.7067 15.1317C14.5703 14.8104 14.6455 14.4407 14.8976 14.195C15.1497 13.9493 15.5292 13.876 15.859 14.0089C16.188 14.1418 16.4029 14.4552 16.4029 14.8031C16.4029 15.0311 16.3103 15.2494 16.145 15.4104C15.9796 15.5715 15.7557 15.6617 15.5217 15.6617ZM18.6074 13.2132C18.514 13.8825 17.9246 14.3794 17.2319 14.373C17.2319 14.3126 17.1923 14.2611 17.1749 14.2015C17.1625 14.1749 17.1518 14.1475 17.1435 14.1201C17.1005 14.0259 17.0509 13.9357 16.9939 13.8495L16.9501 13.7979C16.9021 13.7335 16.8501 13.6715 16.7955 13.6127L16.712 13.5394V13.5402C16.6616 13.4935 16.6087 13.45 16.5533 13.4113L16.4516 13.3469L16.2756 13.2526L16.1656 13.2051H16.1648C16.0979 13.1801 16.0284 13.16 15.9582 13.1447C15.9243 13.1342 15.8904 13.1254 15.8565 13.1189C15.6383 13.073 15.4134 13.073 15.1952 13.1189C15.1613 13.1254 15.1274 13.1342 15.0935 13.1447C15.0233 13.16 14.9538 13.1801 14.8869 13.2051L14.777 13.2526L14.6009 13.3469L14.4992 13.4113H14.4984C14.4422 13.4492 14.3885 13.4927 14.3397 13.5402C14.3132 13.5659 14.2827 13.5877 14.2603 13.6135V13.6127C14.2033 13.6707 14.1496 13.7327 14.1016 13.7979L14.0578 13.8495C14.0008 13.9357 13.9512 14.0259 13.9082 14.1201C13.9082 14.1459 13.9082 14.1757 13.8776 14.2015C13.847 14.2272 13.8338 14.3134 13.8206 14.373H9.29259C9.27606 14.3142 9.2554 14.257 9.2306 14.2015L9.20415 14.1201C9.16116 14.0259 9.11074 13.9357 9.05453 13.8495L9.01072 13.7979H9.0099C8.96196 13.7327 8.90905 13.6707 8.85119 13.6127C8.82887 13.5869 8.79829 13.5651 8.77184 13.5394V13.5402C8.72307 13.4927 8.67017 13.4492 8.61313 13.4113L8.51146 13.3469L8.3354 13.2526L8.22546 13.2051C8.15768 13.1801 8.08824 13.16 8.01798 13.1447C7.98492 13.1342 7.95103 13.1254 7.91714 13.1189C7.80803 13.0964 7.69726 13.0851 7.5865 13.0843C7.48896 13.0843 7.39142 13.0931 7.29554 13.1101H7.20709L7.01284 13.1656L6.92027 13.1954V13.1962C6.85662 13.222 6.79462 13.2518 6.73511 13.2865L6.58963 13.3726L6.46646 13.4588V13.458C6.42183 13.4935 6.3805 13.5321 6.3433 13.574C6.32346 13.5893 6.30528 13.6062 6.2904 13.6256C6.24411 13.6731 6.20113 13.723 6.16228 13.7762C6.11682 13.835 6.07548 13.897 6.03912 13.9606C5.63243 13.6417 5.39189 13.1632 5.38197 12.655V11.8729C5.38279 11.6079 5.44644 11.3461 5.56712 11.1085L6.60781 9.07234C6.83182 8.63418 7.29141 8.35792 7.79316 8.35952H12.8766C13.2924 8.35952 13.6842 8.55042 13.9347 8.87501L15.5217 10.937H12.4352V8.23461C12.4352 7.99701 12.2385 7.80451 11.9946 7.80451C11.7508 7.80451 11.5541 7.99701 11.5541 8.23461V10.937H9.40244C9.1032 10.9337 8.79673 10.829 8.59972 10.5451C8.30827 10.1251 8.8006 8.69623 8.875 8.41352C8.93369 8.17592 8.78407 7.9375 8.54024 7.88032C8.2964 7.82394 8.05172 7.96972 7.99386 8.20732C7.855 8.74778 7.39467 10.4364 7.92451 11.098C8.27664 11.5378 8.81724 11.7956 9.38924 11.7956H17.2848C17.6584 11.798 18.0138 11.9542 18.2635 12.2257C18.5156 12.4931 18.6404 12.8515 18.6074 13.2132Z" />
      </mask>
      <path
        d="M19.4894 13.2994C19.5505 12.6945 19.3456 12.092 18.9248 11.6425C18.5049 11.1931 17.9089 10.9378 17.2848 10.941C16.8682 10.941 16.4764 10.7501 16.2268 10.4255L14.6397 8.35942C14.2231 7.81816 13.5701 7.5 12.8766 7.5H7.79315C6.95912 7.5 6.19617 7.95911 5.82255 8.68562L4.77774 10.7218C4.59671 11.0802 4.50165 11.4741 4.5 11.8728V12.6549C4.50165 13.5747 5.00505 14.4245 5.82255 14.8843C5.88207 15.7179 6.5483 16.3889 7.40051 16.475C8.25355 16.5604 9.04626 16.0361 9.27936 15.2322H13.8198C14.0281 15.9805 14.7258 16.5 15.5218 16.5C16.317 16.5 17.0146 15.9805 17.2229 15.2322C18.3719 15.2411 19.3463 14.4101 19.4894 13.2994ZM7.58641 15.6617C7.09954 15.6617 6.70443 15.2775 6.70443 14.8031C6.70774 14.7612 6.70774 14.7193 6.70443 14.6783C6.76642 14.2514 7.14335 13.9348 7.58641 13.9397C8.07328 13.9397 8.46757 14.3239 8.46757 14.7983C8.46757 15.2727 8.07328 15.6577 7.58641 15.6577V15.6617ZM15.5217 15.6617C15.1646 15.6617 14.8431 15.4523 14.7067 15.1317C14.5703 14.8104 14.6455 14.4407 14.8976 14.195C15.1497 13.9493 15.5292 13.876 15.859 14.0089C16.188 14.1418 16.4029 14.4552 16.4029 14.8031C16.4029 15.0311 16.3103 15.2494 16.145 15.4104C15.9796 15.5715 15.7557 15.6617 15.5217 15.6617ZM18.6074 13.2132C18.514 13.8825 17.9246 14.3794 17.2319 14.373C17.2319 14.3126 17.1923 14.2611 17.1749 14.2015C17.1625 14.1749 17.1518 14.1475 17.1435 14.1201C17.1005 14.0259 17.0509 13.9357 16.9939 13.8495L16.9501 13.7979C16.9021 13.7335 16.8501 13.6715 16.7955 13.6127L16.712 13.5394V13.5402C16.6616 13.4935 16.6087 13.45 16.5533 13.4113L16.4516 13.3469L16.2756 13.2526L16.1656 13.2051H16.1648C16.0979 13.1801 16.0284 13.16 15.9582 13.1447C15.9243 13.1342 15.8904 13.1254 15.8565 13.1189C15.6383 13.073 15.4134 13.073 15.1952 13.1189C15.1613 13.1254 15.1274 13.1342 15.0935 13.1447C15.0233 13.16 14.9538 13.1801 14.8869 13.2051L14.777 13.2526L14.6009 13.3469L14.4992 13.4113H14.4984C14.4422 13.4492 14.3885 13.4927 14.3397 13.5402C14.3132 13.5659 14.2827 13.5877 14.2603 13.6135V13.6127C14.2033 13.6707 14.1496 13.7327 14.1016 13.7979L14.0578 13.8495C14.0008 13.9357 13.9512 14.0259 13.9082 14.1201C13.9082 14.1459 13.9082 14.1757 13.8776 14.2015C13.847 14.2272 13.8338 14.3134 13.8206 14.373H9.29259C9.27606 14.3142 9.2554 14.257 9.2306 14.2015L9.20415 14.1201C9.16116 14.0259 9.11074 13.9357 9.05453 13.8495L9.01072 13.7979H9.0099C8.96196 13.7327 8.90905 13.6707 8.85119 13.6127C8.82887 13.5869 8.79829 13.5651 8.77184 13.5394V13.5402C8.72307 13.4927 8.67017 13.4492 8.61313 13.4113L8.51146 13.3469L8.3354 13.2526L8.22546 13.2051C8.15768 13.1801 8.08824 13.16 8.01798 13.1447C7.98492 13.1342 7.95103 13.1254 7.91714 13.1189C7.80803 13.0964 7.69726 13.0851 7.5865 13.0843C7.48896 13.0843 7.39142 13.0931 7.29554 13.1101H7.20709L7.01284 13.1656L6.92027 13.1954V13.1962C6.85662 13.222 6.79462 13.2518 6.73511 13.2865L6.58963 13.3726L6.46646 13.4588V13.458C6.42183 13.4935 6.3805 13.5321 6.3433 13.574C6.32346 13.5893 6.30528 13.6062 6.2904 13.6256C6.24411 13.6731 6.20113 13.723 6.16228 13.7762C6.11682 13.835 6.07548 13.897 6.03912 13.9606C5.63243 13.6417 5.39189 13.1632 5.38197 12.655V11.8729C5.38279 11.6079 5.44644 11.3461 5.56712 11.1085L6.60781 9.07234C6.83182 8.63418 7.29141 8.35792 7.79316 8.35952H12.8766C13.2924 8.35952 13.6842 8.55042 13.9347 8.87501L15.5217 10.937H12.4352V8.23461C12.4352 7.99701 12.2385 7.80451 11.9946 7.80451C11.7508 7.80451 11.5541 7.99701 11.5541 8.23461V10.937H9.40244C9.1032 10.9337 8.79673 10.829 8.59972 10.5451C8.30827 10.1251 8.8006 8.69623 8.875 8.41352C8.93369 8.17592 8.78407 7.9375 8.54024 7.88032C8.2964 7.82394 8.05172 7.96972 7.99386 8.20732C7.855 8.74778 7.39467 10.4364 7.92451 11.098C8.27664 11.5378 8.81724 11.7956 9.38924 11.7956H17.2848C17.6584 11.798 18.0138 11.9542 18.2635 12.2257C18.5156 12.4931 18.6404 12.8515 18.6074 13.2132Z"
        fill="white"
      />
      <path
        d="M19.4894 13.2994C19.5505 12.6945 19.3456 12.092 18.9248 11.6425C18.5049 11.1931 17.9089 10.9378 17.2848 10.941C16.8682 10.941 16.4764 10.7501 16.2268 10.4255L14.6397 8.35942C14.2231 7.81816 13.5701 7.5 12.8766 7.5H7.79315C6.95912 7.5 6.19617 7.95911 5.82255 8.68562L4.77774 10.7218C4.59671 11.0802 4.50165 11.4741 4.5 11.8728V12.6549C4.50165 13.5747 5.00505 14.4245 5.82255 14.8843C5.88207 15.7179 6.5483 16.3889 7.40051 16.475C8.25355 16.5604 9.04626 16.0361 9.27936 15.2322H13.8198C14.0281 15.9805 14.7258 16.5 15.5218 16.5C16.317 16.5 17.0146 15.9805 17.2229 15.2322C18.3719 15.2411 19.3463 14.4101 19.4894 13.2994ZM7.58641 15.6617C7.09954 15.6617 6.70443 15.2775 6.70443 14.8031C6.70774 14.7612 6.70774 14.7193 6.70443 14.6783C6.76642 14.2514 7.14335 13.9348 7.58641 13.9397C8.07328 13.9397 8.46757 14.3239 8.46757 14.7983C8.46757 15.2727 8.07328 15.6577 7.58641 15.6577V15.6617ZM15.5217 15.6617C15.1646 15.6617 14.8431 15.4523 14.7067 15.1317C14.5703 14.8104 14.6455 14.4407 14.8976 14.195C15.1497 13.9493 15.5292 13.876 15.859 14.0089C16.188 14.1418 16.4029 14.4552 16.4029 14.8031C16.4029 15.0311 16.3103 15.2494 16.145 15.4104C15.9796 15.5715 15.7557 15.6617 15.5217 15.6617ZM18.6074 13.2132C18.514 13.8825 17.9246 14.3794 17.2319 14.373C17.2319 14.3126 17.1923 14.2611 17.1749 14.2015C17.1625 14.1749 17.1518 14.1475 17.1435 14.1201C17.1005 14.0259 17.0509 13.9357 16.9939 13.8495L16.9501 13.7979C16.9021 13.7335 16.8501 13.6715 16.7955 13.6127L16.712 13.5394V13.5402C16.6616 13.4935 16.6087 13.45 16.5533 13.4113L16.4516 13.3469L16.2756 13.2526L16.1656 13.2051H16.1648C16.0979 13.1801 16.0284 13.16 15.9582 13.1447C15.9243 13.1342 15.8904 13.1254 15.8565 13.1189C15.6383 13.073 15.4134 13.073 15.1952 13.1189C15.1613 13.1254 15.1274 13.1342 15.0935 13.1447C15.0233 13.16 14.9538 13.1801 14.8869 13.2051L14.777 13.2526L14.6009 13.3469L14.4992 13.4113H14.4984C14.4422 13.4492 14.3885 13.4927 14.3397 13.5402C14.3132 13.5659 14.2827 13.5877 14.2603 13.6135V13.6127C14.2033 13.6707 14.1496 13.7327 14.1016 13.7979L14.0578 13.8495C14.0008 13.9357 13.9512 14.0259 13.9082 14.1201C13.9082 14.1459 13.9082 14.1757 13.8776 14.2015C13.847 14.2272 13.8338 14.3134 13.8206 14.373H9.29259C9.27606 14.3142 9.2554 14.257 9.2306 14.2015L9.20415 14.1201C9.16116 14.0259 9.11074 13.9357 9.05453 13.8495L9.01072 13.7979H9.0099C8.96196 13.7327 8.90905 13.6707 8.85119 13.6127C8.82887 13.5869 8.79829 13.5651 8.77184 13.5394V13.5402C8.72307 13.4927 8.67017 13.4492 8.61313 13.4113L8.51146 13.3469L8.3354 13.2526L8.22546 13.2051C8.15768 13.1801 8.08824 13.16 8.01798 13.1447C7.98492 13.1342 7.95103 13.1254 7.91714 13.1189C7.80803 13.0964 7.69726 13.0851 7.5865 13.0843C7.48896 13.0843 7.39142 13.0931 7.29554 13.1101H7.20709L7.01284 13.1656L6.92027 13.1954V13.1962C6.85662 13.222 6.79462 13.2518 6.73511 13.2865L6.58963 13.3726L6.46646 13.4588V13.458C6.42183 13.4935 6.3805 13.5321 6.3433 13.574C6.32346 13.5893 6.30528 13.6062 6.2904 13.6256C6.24411 13.6731 6.20113 13.723 6.16228 13.7762C6.11682 13.835 6.07548 13.897 6.03912 13.9606C5.63243 13.6417 5.39189 13.1632 5.38197 12.655V11.8729C5.38279 11.6079 5.44644 11.3461 5.56712 11.1085L6.60781 9.07234C6.83182 8.63418 7.29141 8.35792 7.79316 8.35952H12.8766C13.2924 8.35952 13.6842 8.55042 13.9347 8.87501L15.5217 10.937H12.4352V8.23461C12.4352 7.99701 12.2385 7.80451 11.9946 7.80451C11.7508 7.80451 11.5541 7.99701 11.5541 8.23461V10.937H9.40244C9.1032 10.9337 8.79673 10.829 8.59972 10.5451C8.30827 10.1251 8.8006 8.69623 8.875 8.41352C8.93369 8.17592 8.78407 7.9375 8.54024 7.88032C8.2964 7.82394 8.05172 7.96972 7.99386 8.20732C7.855 8.74778 7.39467 10.4364 7.92451 11.098C8.27664 11.5378 8.81724 11.7956 9.38924 11.7956H17.2848C17.6584 11.798 18.0138 11.9542 18.2635 12.2257C18.5156 12.4931 18.6404 12.8515 18.6074 13.2132Z"
        stroke="white"
        strokeWidth="0.3"
        strokeLinejoin="round"
        mask="url(#path-2-outside-1_17285_86683)"
      />
    </svg>
  );
};
