import styled from "styled-components";
import { colors } from "styles/colors";
import { LinkLabelSmallSemiBold } from "components/typography/LinkLabelSmallSemiBold";

export const FormLabel = styled(LinkLabelSmallSemiBold)`
  color: ${colors.label};
  margin-top: 32px;
`;
