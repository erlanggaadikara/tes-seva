import { logoutModalId } from "const/const";
import { LocalStorageKey, SessionStorageKey } from "models/models";

export const showLogoutModal = () => {
  const logoutDom = document.getElementById(logoutModalId);
  if (logoutDom) {
    logoutDom.style.display = "flex";
  }
};

export const hideLogout = () => {
  const logoutDom = document.getElementById(logoutModalId);
  if (logoutDom) {
    logoutDom.style.display = "none";
  }
};

export const removeInformationWhenLogout = () => {
  localStorage.removeItem(LocalStorageKey.Token);
  localStorage.removeItem(LocalStorageKey.CustomerId);
  sessionStorage.removeItem(SessionStorageKey.CustomerId);
};
