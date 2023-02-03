import firebase from "firebase";
import { FormEvent, useCallback, useState } from "react";

export const useFirebaseAuth = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [isLogin, setIsLogin] = useState<boolean>(true);

  //  useCallbackを使うことで、再レンダリングされても関数が再生成されないようにする
  const onChangeEmail = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setEmail(e.target.value);
    },
    []
  );
  const pwCHange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  }, []);
  const resetInput = useCallback(() => {
    setEmail("");
    setPassword("");
  }, []);

  // 第二引数にisLoginを指定することで、isLoginが変更された時だけ関数が再生成される。
  const toggleMode = useCallback(() => {
    setIsLogin(!isLogin);
  }, [isLogin]);

  const authUser = useCallback(
    async (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      if (isLogin) {
        try {
          // ユーザーをログインする
          await firebase.auth().signInWithEmailAndPassword(email, password);
        } catch (error: any) {
          alert(error.message);
        }
        resetInput();
      } else {
        try {
          // ユーザーを作成する
          await firebase.auth().createUserWithEmailAndPassword(email, password);
        } catch (error: any) {
          alert(error.message);
        }
        resetInput();
      }
    },
    [email, password, isLogin]
  );

  return {
    email,
    password,
    isLogin,
    onChangeEmail,
    pwCHange,
    toggleMode,
    authUser,
  };
};
