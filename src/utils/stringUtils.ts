export const DOT = ".";
export const COMMA = ",";

export const filterNonLetterOrSpaceCharacters = (input: string) => {
  const notLetterOrSpace = new RegExp(/[^a-zA-Z ]+/g);
  return input.replace(notLetterOrSpace, "");
};

export const filterNonDigitCharacters = (input: string) => {
  const nonDigits = new RegExp(/[^\d]+/g);
  return input.replace(nonDigits, "");
};

const capitalizeSingleWord = (str: string) => {
  return (
    str.charAt(0).toUpperCase() +
    str.substring(1, str.length).toLocaleLowerCase()
  );
};
const capitalize = (str: string, character: " " | "/" | "-") => {
  const arr = str.split(character);
  return arr
    .map((item) => {
      return capitalizeSingleWord(item);
    })
    .join(character);
};
export const capitalizeWords = (str: string) => {
  const arr = str.split(" ");
  return arr
    .map((item) => {
      const array1 = item.split("/");
      return array1
        .map((item) => {
          return capitalize(item, "-");
        })
        .join("/");
    })
    .join(" ");
};

export const addSeparator = (
  value: string,
  separator = DOT,
  length = 3
): string => {
  const tmp = value.replace(separator, "");
  const reg = new RegExp("\\B(?=(\\d{" + length + "})+(?!\\d))", "g");
  return tmp.replace(reg, separator);
};

export const isAmountValid = (value: string): boolean => {
  return /(^[1-9](\d{6,8})$)/.test(value);
};

export const isZipCodeValid = (value: string): boolean => {
  return /(^[1-9](\d{4})$)/.test(value);
};

export const isEmailValid = (value: string): boolean => {
  return /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+")){1,64}@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,})){1,255}$/.test(
    value
  );
};

export const maskPhoneNumber = (value: string): string => {
  const firstThreeCharacters = value.substr(0, 3);
  const lastFourCharacters = value.substr(value.length - 4);
  return `${firstThreeCharacters}****${lastFourCharacters}`;
};

export const replaceSuffixWith = (value: string, newSuffix: string): string => {
  return value
    .toString()
    .replace(
      /\.[^.]+$/,
      newSuffix.indexOf(DOT) !== -1 ? newSuffix : `${DOT}${newSuffix}`
    );
};
export const toNumber = (inputString: undefined | string) => {
  if (inputString) {
    return Number(inputString);
  } else return null;
};

export const prefixWithZero = (originalNumber: number | string) => {
  return `0${originalNumber}`.slice(-2);
};

export const convertSlashesInStringToVerticalLines = (
  originalString: string
) => {
  return originalString.replace(/\//g, "|");
};
