import firebase from "firebase";
import router from "next/router";
import { useCallback } from "react";
import Cookie from "universal-cookie";
import { unSubMeta } from "./useUserChanged";

const cookie = new Cookie();

export const useLogout = () => {
  const logout = async () => {
    if (unSubMeta) {
      unSubMeta();
    }
    await firebase.auth().signOut();
    cookie.remove("token");
  };

  return { logout };
};
