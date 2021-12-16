import { getToken } from "utils/api";

const ms = 1000;
export const isLoginTimeExpired = (time: number, lastLoginTime: number) => {
  const expiresIn = getToken()?.expiresIn;
  return (
    !expiresIn ||
    lastLoginTime === -1 ||
    time - lastLoginTime > Number(expiresIn) * ms
  );
};
