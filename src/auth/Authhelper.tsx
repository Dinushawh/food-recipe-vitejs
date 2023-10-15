import { authModel } from "./_models";

const AUTH_LOCAL_STORAGE_KEY = "kt-auth-react-v2";

const getAuth = (): authModel | undefined => {
  if (!localStorage) {
    return;
  }

  const isValue = localStorage.getItem(AUTH_LOCAL_STORAGE_KEY);
  if (!isValue) {
    return;
  }

  try {
    const auth: authModel = JSON.parse(isValue || "") as authModel;
    if (auth) {
      return auth;
    }
  } catch (error) {
    console.error("Authentication error while getting", error);
  }
};

const setAuth = (auth: authModel) => {
  if (!localStorage) {
    return;
  }

  try {
    localStorage.setItem(AUTH_LOCAL_STORAGE_KEY, JSON.stringify(auth));
  } catch (error) {
    console.error("Authentication error whiile setup", error);
  }
};

const removeAuth = () => {
  if (!localStorage) {
    return;
  }

  try {
    localStorage.removeItem(AUTH_LOCAL_STORAGE_KEY);
  } catch (error) {
    console.error("Authentication error while removing", error);
  }
};

export const Authhelper = {
  getAuth,
  setAuth,
  removeAuth,
};
