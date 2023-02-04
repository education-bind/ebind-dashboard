import React, { useEffect } from "react";
import { useLocation, Navigate, Outlet } from "react-router-dom";
import useAuth from "../../hooks/useAuth";

export default () => {
  const loggedInUser = localStorage.getItem("user");
  const foundUser = JSON.parse(loggedInUser);
  const { setAuth } = useAuth();
  const location = useLocation();

  useEffect(() => {
    if (loggedInUser) {
      setAuth({ user: foundUser });
    }
  }, []);

  return foundUser ? (
    <Outlet />
  ) : (
    <Navigate to="/authentication/sign-in" state={{ from: location }} replace />
  );
};
