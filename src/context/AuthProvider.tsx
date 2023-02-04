import { ReactNode, createContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext<any>({});

AuthContext.displayName = "AuthContextContext";

export const AuthProvider = ({ children }: { children: ReactNode }): JSX.Element => {
  const navigate = useNavigate();
  const [auth, setAuth] = useState({});
  const [tokenExpired, setTokenExpired] = useState(false);
  const [apiError, setApiError] = useState<any>();

  useEffect((): any => {
    if (apiError) {
      console.log(apiError);
      if (apiError.response.status === 401) {
        setAuth({});
        localStorage.clear();
        setTokenExpired(true);
        return navigate("/authentication/sign-in");
      }
      console.log(apiError);
    }
  }, [apiError]);

  return (
    <AuthContext.Provider
      value={{ auth, setAuth, tokenExpired, setTokenExpired, apiError, setApiError }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
