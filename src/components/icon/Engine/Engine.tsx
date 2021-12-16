import React from "react";
import { colors } from "styles/colors";
import { IconProps } from "iconType";

export const Engine = ({
  color = colors.label,
  width = 26,
  height = 24,
}: IconProps) => {
  return (
    <svg
      width="26"
      height="24"
      viewBox="0 0 26 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{
        width: width,
        height: height,
      }}
    >
      <path
        d="M23.3512 8.32582H21.4801C21.1437 8.32582 20.8708 8.60272 20.8708 8.94639V10.3358H19.8249V8.41812C19.8249 8.07544 19.5531 7.79755 19.2157 7.79755H16.504V6.472C16.504 6.1303 16.2322 5.85143 15.8948 5.85143H13.0972V4.24114H15.4002C15.7366 4.24114 16.0095 3.96326 16.0095 3.62057C16.0095 3.27788 15.7376 3 15.4002 3L7.13006 3.00098C6.79362 3.00098 6.52081 3.27789 6.52081 3.62155C6.52081 3.96326 6.79362 4.24212 7.13006 4.24212H9.52557V5.85242H7.13006C6.79362 5.85242 6.52081 6.1303 6.52081 6.47299V7.79853H4.30846C3.97202 7.79853 3.6992 8.07544 3.6992 8.4191V12.3417L2.21851 12.3397V8.42091C2.21851 8.07822 1.94569 7.80034 1.60925 7.80034C1.27282 7.80034 1 8.07822 1 8.42091V17.6214C1 17.9641 1.27185 18.2419 1.60925 18.2419C1.94569 18.2419 2.21851 17.9641 2.21851 17.6214V13.5799H3.70016V17.6224C3.70016 17.9651 3.97202 18.2429 4.30942 18.2429H9.99897L12.034 20.7732C12.1496 20.9175 12.3222 21 12.5054 21H19.2166C19.553 21 19.8258 20.7221 19.8258 20.3794L19.8249 17.3827H20.8708V18.9763C20.8708 19.318 21.1436 19.5968 21.4801 19.5968H23.3512C23.6028 19.5968 23.8293 19.4387 23.919 19.1982C26.3299 12.7874 23.9701 8.78615 23.8679 8.61925C23.757 8.43662 23.5613 8.32565 23.3512 8.32565L23.3512 8.32582ZM10.7431 4.24114H11.8797V5.85143H10.7431V4.24114ZM22.927 18.3568H22.0893V16.7632C22.0893 16.4205 21.8174 16.1426 21.48 16.1426H19.2166C18.8801 16.1426 18.6073 16.4195 18.6073 16.7632V19.76L12.7934 19.759L10.7584 17.2287C10.6427 17.0854 10.4702 17.0019 10.287 17.0019H4.9185V9.03667H7.12989C7.46633 9.03667 7.73914 8.75976 7.73914 8.4171V7.09156H15.2882V8.4171C15.2882 8.75979 15.5601 9.03667 15.8965 9.03667H18.6081V10.9553C18.6081 11.298 18.8809 11.5759 19.2174 11.5759H20.8725V13.7458C20.8725 14.0885 21.1453 14.3664 21.4818 14.3664C21.8182 14.3664 22.091 14.0895 22.091 13.7458L22.0891 10.9552V9.56582H22.9827C23.4184 10.5104 24.5588 13.6789 22.9268 18.3568L22.927 18.3568Z"
        fill={color}
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M15.4 2.99999C15.7374 2.99999 16.0093 3.27787 16.0093 3.62056C16.0093 3.96324 15.7365 4.24113 15.4 4.24113H13.097V5.85142H15.8946C16.232 5.85142 16.5038 6.13029 16.5038 6.47199V7.79754H19.2155C19.5529 7.79754 19.8247 8.07542 19.8247 8.41811V10.3357H20.8707V8.94638C20.8707 8.60271 21.1435 8.32581 21.4799 8.32581H23.3501C23.3502 8.32581 23.3501 8.32581 23.3501 8.32581C23.3504 8.32581 23.3516 8.32564 23.3518 8.32564C23.4249 8.32575 23.4963 8.33927 23.5629 8.36457C23.6875 8.41189 23.7955 8.50039 23.8677 8.61923C23.9699 8.78614 26.3297 12.7874 23.9188 19.1982C23.8291 19.4387 23.6026 19.5968 23.351 19.5968H21.4799C21.1434 19.5968 20.8706 19.318 20.8706 18.9762V17.3826H19.8247L19.8257 20.3794C19.8257 20.7221 19.5528 21 19.2164 21H12.5052C12.322 21 12.1494 20.9175 12.0338 20.7732L9.99878 18.2429H4.30922C3.97182 18.2429 3.69997 17.965 3.69997 17.6224V13.5799H2.21831V17.6214C2.21831 17.964 1.9455 18.2419 1.60906 18.2419C1.27166 18.2419 0.999805 17.964 0.999805 17.6214V8.4209C0.999805 8.07821 1.27262 7.80033 1.60906 7.80033C1.9455 7.80033 2.21831 8.07821 2.21831 8.4209V12.3397L3.69901 12.3416V8.41909C3.69901 8.07543 3.97182 7.79852 4.30826 7.79852H6.52061V6.47297C6.52061 6.13029 6.79343 5.8524 7.12986 5.8524H9.52538V4.24211H7.12986C6.79343 4.24211 6.52061 3.96325 6.52061 3.62154C6.52061 3.27787 6.79343 3.00097 7.12986 3.00097L15.4 2.99999ZM7.12986 2.80097L15.4 2.79999C15.8515 2.79999 16.2093 3.17111 16.2093 3.62056C16.2093 4.07021 15.8504 4.44113 15.4 4.44113H13.297V5.65142H15.8946C16.3463 5.65142 16.7038 6.02373 16.7038 6.47199V7.59754H19.2155C19.667 7.59754 20.0247 7.96866 20.0247 8.41811V10.1357H20.6707V8.94638C20.6707 8.49553 21.0298 8.12581 21.4799 8.12581H23.1066L23.351 8.12564C23.6322 8.12564 23.8921 8.27409 24.0387 8.51546C24.1662 8.72419 26.5427 12.7891 24.106 19.2686C23.9875 19.5858 23.6873 19.7968 23.351 19.7968H21.4799C21.0293 19.7968 20.6706 19.4247 20.6706 18.9762V17.5826H20.0248L20.0257 20.3794C20.0257 20.829 19.6667 21.2 19.2164 21.2H12.5052C12.2614 21.2 12.0315 21.09 11.8779 20.8985M11.8779 20.8985L9.90297 18.4429H4.30922C3.85771 18.4429 3.49997 18.0718 3.49997 17.6224V13.7799H2.41831V17.6214C2.41831 18.071 2.05941 18.4419 1.60906 18.4419C1.15754 18.4419 0.799805 18.0708 0.799805 17.6214V8.4209C0.799805 7.97124 1.15871 7.60033 1.60906 7.60033C2.05941 7.60033 2.41831 7.97124 2.41831 8.4209V12.1399L3.49901 12.1414V8.41909C3.49901 7.96825 3.85812 7.59852 4.30826 7.59852H6.32061V6.47297C6.32061 6.02332 6.67952 5.6524 7.12986 5.6524H9.32538V4.44211H7.12986C6.67931 4.44211 6.32061 4.07001 6.32061 3.62154C6.32061 3.1707 6.67973 2.80098 7.12986 2.80097C7.12987 2.80097 7.12986 2.80097 7.12986 2.80097M22.9266 18.3568C22.929 18.3498 22.9316 18.3425 22.934 18.3355C24.5552 13.6693 23.4176 10.509 22.9825 9.5658H22.0889L22.0908 13.7458C22.0908 14.0895 21.818 14.3664 21.4816 14.3664C21.1451 14.3664 20.8723 14.0885 20.8723 13.7458V11.5758H19.2172C18.8807 11.5758 18.6079 11.298 18.6079 10.9553V9.03666H15.8963C15.5599 9.03666 15.288 8.75978 15.288 8.41709V7.09154H7.73895V8.41709C7.73895 8.75975 7.46613 9.03666 7.12969 9.03666H4.9183V17.0019H10.2868C10.47 17.0019 10.6425 17.0854 10.7582 17.2287L12.7932 19.759L18.6071 19.7599V16.7632C18.6071 16.4195 18.8799 16.1426 19.2164 16.1426H21.4798C21.8172 16.1426 22.0891 16.4205 22.0891 16.7632V18.3568H22.9266ZM22.2891 18.1568V16.7632C22.2891 16.3137 21.9313 15.9426 21.4798 15.9426H19.2164C18.7662 15.9426 18.4071 16.3123 18.4071 16.7632V19.5599L12.889 19.559L10.914 17.1034C10.761 16.9137 10.5313 16.8019 10.2868 16.8019H5.1183V9.23666H7.12969C7.57963 9.23666 7.93895 8.86715 7.93895 8.41709V7.29154H15.088V8.41709C15.088 8.86675 15.446 9.23666 15.8963 9.23666H18.4079V10.9553C18.4079 11.4049 18.7668 11.7758 19.2172 11.7758H20.6723V13.7458C20.6723 14.1955 21.0312 14.5664 21.4816 14.5664C21.9317 14.5664 22.2908 14.1967 22.2908 13.7458L22.2889 9.7658H22.853C23.2995 10.7931 24.2664 13.7913 22.784 18.1568H22.2891ZM11.6795 4.44113H10.9429V5.65142H11.6795V4.44113ZM10.7429 4.24113V5.85142H11.8795V4.24113H10.7429Z"
        fill={color}
      />
    </svg>
  );
};
