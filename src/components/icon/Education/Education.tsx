import React from "react";
import { IconProps } from "iconType";
import { colors } from "styles/colors";

export const Education = ({ color = colors.placeholder }: IconProps) => {
  return (
    <svg
      width="24"
      height="20"
      viewBox="0 0 24 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M4.49947 7.68186L1.18627 6.15279C1.16471 6.14154 1.14221 6.13123 1.11971 6.11811C1.0344 6.06842 0.959397 6.00092 0.900336 5.92217C0.750336 5.72154 0.710023 5.45342 0.794397 5.21717C0.81971 5.14779 0.856272 5.08217 0.900336 5.02217C0.959397 4.94342 1.0344 4.87592 1.11971 4.82529C1.14221 4.81217 1.16471 4.80279 1.18627 4.7906L10.9363 0.290605C10.9953 0.267167 11.0094 0.25873 11.0722 0.24373C11.1435 0.225918 11.2128 0.222168 11.286 0.222168C11.3103 0.224981 11.3347 0.227793 11.3581 0.229668C11.421 0.241856 11.4369 0.242793 11.4978 0.263419C11.5203 0.271857 11.5419 0.282169 11.5644 0.290606L21.3144 4.79061L21.3256 4.79623C21.3416 4.80467 21.3575 4.81217 21.3725 4.82061C21.3753 4.82248 21.3772 4.82342 21.381 4.82529C21.4663 4.87592 21.5413 4.94342 21.6003 5.02217C21.6444 5.08217 21.681 5.14779 21.7063 5.21717L21.7119 5.23498C21.7138 5.23967 21.7147 5.24529 21.7175 5.25092C21.7185 5.25842 21.7213 5.26498 21.7231 5.27248C21.7391 5.33061 21.7485 5.39154 21.7494 5.45248C21.7494 5.45904 21.7503 5.46467 21.7503 5.47217V15.407C21.8441 15.4398 21.936 15.4801 22.025 15.526C22.4431 15.7398 22.7891 16.0857 23.0038 16.5038C23.1134 16.7185 23.1884 16.9492 23.225 17.1873C23.2597 17.4132 23.2597 17.6448 23.225 17.8698C23.1913 18.0901 23.1247 18.3048 23.0281 18.5045C22.9109 18.7482 22.7488 18.9704 22.5528 19.157C22.3559 19.3445 22.1263 19.4954 21.8759 19.6014C21.5994 19.7186 21.3003 19.7786 21.0003 19.7786C20.7003 19.7786 20.4013 19.7186 20.1247 19.6014C19.8744 19.4954 19.6447 19.3445 19.4478 19.157C19.2519 18.9704 19.0897 18.7482 18.9725 18.5045C18.876 18.3048 18.8094 18.0901 18.7756 17.8698C18.741 17.6448 18.741 17.4132 18.7756 17.1873C18.8122 16.9492 18.8872 16.7185 18.9969 16.5038C19.2116 16.0857 19.5575 15.7398 19.9756 15.526C20.0647 15.4801 20.1566 15.4398 20.2503 15.407V6.64409L18.0106 7.67722C18.0444 9.46128 18.0003 11.2453 18.0003 13.0285V13.036C18.0003 13.0519 18.0003 13.0697 17.9994 13.0866C17.9975 13.1822 17.9891 13.2779 17.9741 13.3726C17.9572 13.4851 17.931 13.5957 17.8981 13.7044C17.69 14.386 17.1913 14.9335 16.6222 15.3432C15.9697 15.8147 15.2122 16.1297 14.4435 16.351C13.7694 16.546 13.0757 16.666 12.3781 16.7288C11.6291 16.7963 10.8716 16.7963 10.1225 16.7288C9.61627 16.6838 9.11191 16.6069 8.61597 16.4954C8.24753 16.411 7.88285 16.3088 7.52659 16.1822C7.31659 16.1072 7.1094 16.0238 6.90597 15.931C6.75222 15.8616 6.59942 15.7847 6.45036 15.7032C6.32286 15.6347 6.19816 15.5597 6.07723 15.48C5.51755 15.1153 5.00661 14.6344 4.72348 14.0203C4.60348 13.7625 4.52848 13.485 4.50692 13.201C4.50224 13.141 4.49849 13.081 4.50036 13.02C4.45349 11.2406 4.49286 9.46131 4.49942 7.68195L4.49947 7.68186ZM20.9808 16.7783C20.8692 16.783 20.7595 16.8083 20.6601 16.8608C20.4708 16.9574 20.3273 17.1346 20.2739 17.3408C20.2504 17.4336 20.2448 17.5302 20.2561 17.6249C20.2664 17.6971 20.2861 17.7693 20.3161 17.8358C20.3536 17.9183 20.4061 17.9943 20.4698 18.059C20.5345 18.1227 20.6095 18.1752 20.6929 18.2127C20.7829 18.253 20.8814 18.2755 20.9808 18.2783C21.0811 18.2812 21.1814 18.2633 21.2751 18.2268C21.3586 18.193 21.4373 18.1443 21.5048 18.0833C21.5714 18.0233 21.6276 17.9493 21.6689 17.8696C21.7026 17.804 21.7261 17.7336 21.7383 17.6615C21.7936 17.3521 21.6454 17.0343 21.3736 16.8777C21.2761 16.8224 21.1701 16.7905 21.0586 16.7812C21.0323 16.7793 21.007 16.7783 20.9808 16.7783L20.9808 16.7783ZM16.4949 8.37738L11.5646 10.6527C11.5055 10.6771 11.4915 10.6846 11.4287 10.7005C11.3124 10.7296 11.1887 10.7296 11.0724 10.7005C11.0096 10.6846 10.9955 10.6771 10.9365 10.6527L6.02126 8.38395C6.03345 9.93176 6.00063 11.4804 6.00063 13.0284V13.0294C6.00251 13.0622 6.00251 13.0941 6.00626 13.1269C6.01188 13.1597 6.01751 13.1934 6.02501 13.2253C6.08501 13.4494 6.22376 13.6434 6.3822 13.8084C6.67752 14.1141 7.05346 14.3409 7.43501 14.5228C7.59438 14.5997 7.75846 14.6672 7.92439 14.73C8.33784 14.8847 8.76439 14.9991 9.19659 15.0844C9.73097 15.1894 10.2738 15.2494 10.8175 15.271C11.4306 15.2935 12.0456 15.2681 12.6541 15.1903C13.1575 15.1247 13.6563 15.0235 14.1428 14.8763C14.3238 14.821 14.5038 14.76 14.68 14.6897C14.8103 14.6391 14.9397 14.5838 15.0663 14.5228C15.4375 14.3456 15.8022 14.1263 16.0947 13.8328C16.2485 13.6772 16.3882 13.4963 16.4575 13.2863C16.4763 13.2281 16.4903 13.1681 16.4969 13.1072C16.4988 13.0847 16.4997 13.0613 16.5006 13.0378C16.4594 11.4853 16.4838 9.93104 16.495 8.37752L16.4949 8.37738ZM3.29011 5.47218L11.2504 9.14634L19.2108 5.47218L11.2504 1.79802C8.59723 3.02334 5.94331 4.24674 3.29011 5.47218Z"
        fill={color}
      />
    </svg>
  );
};
