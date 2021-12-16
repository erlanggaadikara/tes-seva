import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useTranslation } from "react-i18next";
import { colors } from "styles/colors";
import { LinkLabelLargeSemiBold } from "components/typography/LinkLabelLargeSemiBold";
import { OptionCarDesignCarousel } from "./OptionCarDesignCarousel/OptionCarDesignCarousel";

interface OptionCar {
  mainBanner: string[];
  exterior: string[];
  interior: string[];
}

interface GaleryProps {
  carModelImages: string[];
}

export const Galery = (props: GaleryProps) => {
  const { t } = useTranslation();
  const [optionList, setOptionList] = useState<OptionCar>({
    mainBanner: [""],
    exterior: [""],
    interior: [""],
  });
  const [optionDesign, setOptionDesign] = useState<string>("exterior");
  const [optionColor, setOptionColor] = useState<string>("#EDEADF");
  const [listColor, setListColor] = useState<string[]>(["#fffff"]);
  const [currentList, setCurrentList] = useState<string[]>([""]);

  const [currentImage, setCurrentImage] = useState<string>("");

  const GroupingImage = () => {
    const mainBanner = props.carModelImages.filter((item) =>
      item.toLowerCase().includes("main")
    );

    const exterior = props.carModelImages.filter((item) =>
      item.toLowerCase().includes("eks")
    );

    const interior = props.carModelImages.filter((item) =>
      item.toLowerCase().includes("int")
    );
    !currentImage && setCurrentImage(mainBanner[0]);
    setOptionList({ mainBanner, exterior, interior });
    setCurrentList([mainBanner[0], ...exterior]);
    setListColor(["#fffff"]);
  };

  const onChangeOptionDesign = (option: string) => {
    if (option === "exterior") {
      setCurrentList([optionList.mainBanner[0], ...optionList.exterior]);
      setCurrentImage(optionList.mainBanner[0]);
    } else {
      setCurrentList([...optionList.interior]);
      setCurrentImage(optionList.interior[0]);
    }
    setOptionDesign(option);
  };

  const onChangeOptionColor = (option: string) => {
    setOptionColor(option);
  };

  const OptionColor = () => {
    if (currentImage.toLowerCase().includes("main")) {
      return (
        <>
          <StyledDesignOptionWrapper>
            {listColor.map((item, index) => (
              <StyledColorOption
                key={index}
                color={item}
                isSelect={optionColor === item}
                onClick={() => onChangeOptionColor(item)}
              />
            ))}
          </StyledDesignOptionWrapper>
          <StyledColorOptionText>
            <StyledTitle>Super White II</StyledTitle>
          </StyledColorOptionText>
        </>
      );
    }
  };

  useEffect(() => {
    GroupingImage();
  }, [props.carModelImages]);

  if (optionList.mainBanner.length == 0) return <></>;

  return (
    <StyledContainer>
      <StyledTitle>{t("galeryCarVariant.title")}</StyledTitle>
      <StyledWrapper>
        <StyledShowSelected>
          <StyledDesignOptionWrapper>
            <StyledDesignOption
              isSelect={optionDesign === "exterior"}
              onClick={() => onChangeOptionDesign("exterior")}
            >
              {t("galeryCarVariant.exterior")}
            </StyledDesignOption>
            <StyledDesignOption
              isSelect={optionDesign === "interior"}
              onClick={() => onChangeOptionDesign("interior")}
            >
              {t("galeryCarVariant.interior")}
            </StyledDesignOption>
          </StyledDesignOptionWrapper>
          <StyledSelectedImage>
            <StyledImage src={currentImage} />
          </StyledSelectedImage>
          {OptionColor()}
        </StyledShowSelected>
        <OptionCarDesignCarousel
          options={currentList}
          onSelectedOption={(item) => setCurrentImage(item)}
        />
      </StyledWrapper>
    </StyledContainer>
  );
};

interface DesignOptionProps {
  isSelect: boolean;
  onClick?: () => void;
}

interface ColorOptionProps {
  color: string;
  isSelect: boolean;
  onClick?: () => void;
}

const StyledContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 20px 30px;
  width: 100%;
`;
const StyledWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  @media (max-width: 769px) {
    flex-direction: column;
    justify-content: center;
  }
`;

const StyledShowSelected = styled.div`
  width: 60%;
  @media (max-width: 769px) {
    width: 100%;
  }
`;

const StyledTitle = styled(LinkLabelLargeSemiBold)`
  color: ${colors.primary1};
  margin: 10px 0;
`;

const StyledColorOptionText = styled.div`
  @media (max-width: 769px) {
    text-align: center;
  }
  width: 100%;
  margin: 10px 0;
`;

const StyledDesignOptionWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  width: 100%;
  @media (max-width: 769px) {
    justify-content: center;
  }
`;

const StyledDesignOption = styled.div<DesignOptionProps>`
  background: ${({ isSelect }) =>
    isSelect ? "rgba(0, 35, 115, 0.1)" : colors.white};
  border: 1.5px solid ${({ isSelect }) => (isSelect ? "#002373" : "#E4E9F1")};
  box-sizing: border-box;
  border-radius: 12px;
  width: 120px;
  height: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 14px;
  margin: 5px;
  @media (max-width: 768px) {
    width: 50%;
  }
  cursor: pointer;
`;

const StyledSelectedImage = styled.div`
  padding: 30px 0;
`;

const StyledImage = styled.img`
  width: 100%;
  height: auto;
`;

const StyledColorOption = styled.div<ColorOptionProps>`
  background: ${({ color }) => color};
  border: 2px solid ${({ isSelect }) => (isSelect ? "#002373" : "#E4E9F1")};
  border-radius: 50%;
  box-sizing: border-box;
  width: 40px;
  margin: 0 5px;
  height: 40px;
`;
