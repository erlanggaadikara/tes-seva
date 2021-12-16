import React from "react";
import { colors } from "styles/colors";
import styled from "styled-components";
import { H0LargeBold } from "components/typography/H0LargeBold";
import { Time } from "types/types";

interface TimerProps {
  countDownTime: Time;
}

export const Timer = ({ countDownTime }: TimerProps) => {
  return (
    <TimerWrapper>
      <TimerBox>
        <H0LargeBold>
          {`${countDownTime.hours}:${countDownTime.minutes}:${countDownTime.seconds}`}
        </H0LargeBold>
      </TimerBox>
    </TimerWrapper>
  );
};
const TimerBox = styled.div`
  color: ${colors.primary1};
  border-radius: 12px;
  width: 235px;
  background: ${colors.white};
  height: 68px;
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
`;
const TimerWrapper = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 252px;
  height: 84px;
  background: ${colors.primaryLight1};
  border-radius: 12px;
`;
