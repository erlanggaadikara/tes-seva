import { generateNumberRange } from "utils/numberUtils/numberUtils";

export const million = 100 * 10000;
export const generateDpPercentageRange = () => {
  return mapArrayToStringAndContact(generateNumberRange(0.1, 0.5, 0.05), ``);
};
const mapArrayToStringAndContact = (
  initArray: number[],
  contactItem: string
) => {
  const mapStringArray = initArray.map((item) => item.toString());
  return contactItem ? mapStringArray.concat(contactItem) : mapStringArray;
};
