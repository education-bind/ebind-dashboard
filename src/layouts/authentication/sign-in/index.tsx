/**
=========================================================
* Material Dashboard 2 PRO React TS - v1.0.1
=========================================================

* Product Page: https://www.creative-tim.com/product/material-dashboard-2-pro-react-ts
* Copyright 2022 Creative Tim (https://www.creative-tim.com)

Coded by www.creative-tim.com

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { zodResolver } from "@hookform/resolvers/zod";
import { object, string, TypeOf } from "zod";
import useAuth from "../../../hooks/useAuth";

// react-router-dom components
import { Link } from "react-router-dom";

// Material Dashboard 2 PRO React TS components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDInput from "components/MDInput";
import MDButton from "components/MDButton";

// Authentication layout components
import IllustrationLayout from "layouts/authentication/components/IllustrationLayout";

// Material Dashboard 2 React Components
import MDAlert from "components/MDAlert";

// Image
import bgImage from "assets/images/illustrations/illustration-reset.svg";

const createSessionSchema = object({
  email: string().nonempty({
    message: "true",
  }),
  password: string().nonempty({
    message: "true",
  }),
});

type CreateSessionInput = TypeOf<typeof createSessionSchema>;

function Illustration(): JSX.Element {
  const navigate = useNavigate();
  const { auth, tokenExpired, setTokenExpired, setAuth } = useAuth();
  const [loginError, setLoginError] = useState<any>(null);
  const [emailError, setEmailError] = useState<boolean>(false);
  const [passwordError, setPasswordError] = useState<boolean>(false);

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<CreateSessionInput>({
    resolver: zodResolver(createSessionSchema),
  });

  useEffect(() => {
    if (!tokenExpired) {
      if (auth?.user) {
        navigate("/analytics/home");
      }
    }
  }, []);

  useEffect(() => {
    errors.email?.message ? setEmailError(true) : setEmailError(false);
    errors.password?.message ? setPasswordError(true) : setPasswordError(false);
    loginError ? setTimeout(() => setLoginError(null), 6000) : null;
  }, [errors, loginError]);

  async function onSubmit(values: CreateSessionInput) {
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_PUBLIC_SERVER_ENDPOINT}/v1/edu/auth/login`,
        values
      );
      setAuth({ user: response.data.data.user });
      setTokenExpired(false);
      localStorage.setItem("user", JSON.stringify(response.data.data.user));
      navigate("/analytics/home");
    } catch (e: any) {
      setLoginError(e.response.data.message);
    }
  }

  return (
    <IllustrationLayout
      title="Sign In"
      description="Enter your email and password to sign in Admin Panel"
      illustration={bgImage}
    >
      {loginError ? (
        <MDAlert color="error" dismissible>
          {loginError}
        </MDAlert>
      ) : null}
      <MDBox component="form" role="form">
        <MDBox mb={2}>
          <MDInput type="email" label="Email" {...register("email")} fullWidth error={emailError} />
        </MDBox>
        <MDBox mb={2}>
          <MDInput
            type="password"
            label="Password"
            {...register("password")}
            fullWidth
            error={passwordError}
          />
        </MDBox>
        <MDBox mt={4} mb={1}>
          <MDButton
            variant="gradient"
            color="info"
            size="large"
            onClick={handleSubmit(onSubmit)}
            fullWidth
          >
            sign in
          </MDButton>
        </MDBox>
        <MDBox mt={3} textAlign="center">
          <MDTypography variant="button" color="text">
            Forgot your password?{" "}
            <MDTypography
              component={Link}
              to="/authentication/reset-password"
              variant="button"
              color="info"
              fontWeight="medium"
              textGradient
            >
              Reset
            </MDTypography>
          </MDTypography>
        </MDBox>
      </MDBox>
    </IllustrationLayout>
  );
}

export default Illustration;
