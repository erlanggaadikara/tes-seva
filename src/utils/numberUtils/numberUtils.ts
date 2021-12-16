import { LanguageCode } from "models/models";
import {
  comma,
  hundred,
  jt,
  million,
  point,
  Rp,
  ten,
  thousand,
} from "const/const";
import { addSeparator, COMMA, DOT } from "utils/stringUtils";

export enum RoundingStrategy {
  Round,
  Ceil,
  Floor,
}

export const formatPriceNumber = (price: number) => {
  return Math.round(price / million);
};

export const formatNumberByDivisor = (
  length: number,
  divisor = thousand,
  digits = hundred,
  roundStrategy = RoundingStrategy.Round
) => {
  if (roundStrategy === RoundingStrategy.Round) {
    return Math.round((length / divisor) * digits) / digits;
  }
  if (roundStrategy === RoundingStrategy.Ceil) {
    return Math.ceil((length / divisor) * digits) / digits;
  }
  return Math.floor((length / divisor) * digits) / digits;
};

//  DecimalPoint: if LanguageCode is "id" use COMMA, if LanguageCode is "en"
//  use  DOT
const replaceDecimalPointByLocalization = (
  num: number,
  languageId: LanguageCode
) =>
  languageId === LanguageCode.id ? num.toString().replace(DOT, COMMA) : num;

//  PriceSeparator: if LanguageCode is "id" use DOT, if LanguageCode is "en"
//  use  COMMA
export const replacePriceSeparatorByLocalization = (
  num: number | string,
  languageId: LanguageCode
) => {
  const separator = languageId === LanguageCode.en ? COMMA : DOT;
  return addSeparator(num.toString(), separator);
};

export const formatNumberByLocalization = (
  value: number,
  languageId: LanguageCode,
  divisor = thousand,
  digits = hundred,
  roundStrategy = RoundingStrategy.Round
) => {
  const num = formatNumberByDivisor(value, divisor, digits, roundStrategy);
  return replaceDecimalPointByLocalization(num, languageId);
};
export const transformToJtWithTwoDecimal = (
  value: number,
  languageId: LanguageCode
) => {
  const num = formatNumberByDivisor(
    value,
    million,
    hundred,
    RoundingStrategy.Round
  );
  const valueInJt = replaceDecimalPointByLocalization(num, languageId);
  return `${Rp} ${valueInJt} ${jt}`;
};

export const transformToJtWithTargetDecimal = (
  value: number,
  languageId: LanguageCode,
  digits = ten,
  showRP = true
) => {
  const num = formatNumberByDivisor(
    value,
    million,
    digits,
    RoundingStrategy.Round
  );
  const valueInJt = replaceDecimalPointByLocalization(num, languageId);
  return showRP ? `${Rp} ${valueInJt} ${jt}` : `${valueInJt} ${jt}`;
};

export const generateNumberRange = (
  start: number,
  stop: number,
  step: number
) =>
  Array.from(
    { length: (stop - start) / step + 1 },
    (_, i) => Math.round((start + i * step) * 100) / 100
  );

export const transformToJtByTargetDigits = (
  value: number,
  languageId: LanguageCode,
  digits: number
) => {
  const num = formatNumberByDivisor(
    value,
    million,
    Math.pow(ten, digits),
    RoundingStrategy.Round
  );
  const format = num.toString();
  const pointIndex = format.indexOf(point);
  const digitsWidthDecimalPoint = Math.max(pointIndex, digits + 1);
  const result =
    format.length - 1 >= digitsWidthDecimalPoint
      ? format.substr(0, digitsWidthDecimalPoint)
      : format;
  const handlePoint = result.endsWith(point)
    ? result.substr(0, result.length - 1)
    : result;
  const valueInJt =
    languageId === LanguageCode.id
      ? handlePoint.replace(point, comma)
      : handlePoint;
  return `${Rp} ${valueInJt} ${jt}`;
};
