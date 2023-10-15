import { useState } from "react";
import {
  Box,
  TextField,
  Button,
  CardActions,
  Typography,
  Link,
} from "@mui/material";
import * as yup from "yup";

import logo from "../../assets/logo.png";
import { useFormik } from "formik";
import { toast } from "react-toastify";
import axios from "axios";
import { red } from "@mui/material/colors";
import { useAuth } from "../../auth/Auth";

const LoginPage = () => {
  const schema = yup.object().shape({
    email: yup.string().email().required(),
    password: yup.string().min(8).required(),
  });

  const BaseUrl = import.meta.env.VITE_API_URL;
  const [status, setStatus] = useState(false);
  // const navigate = useNavigate();
  const { saveAuth, setCurrentUser } = useAuth();

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: schema,
    onSubmit: async (values) => {
      try {
        await toast.promise(
          axios
            .post(`${BaseUrl}/auth/login`, {
              email: values.email,
              password: values.password,
            })
            .then((response) => {
              if (response.status === 200) {
                console.log(response.data.token);
                const user = {
                  id: response.data.payload.id,
                  firstname: response.data.payload.firstname,
                  lastname: response.data.payload.lastname,
                  email: response.data.payload.email,
                  phone: response.data.payload.phonenumber,
                  accessToken: response.data.token,
                };
                saveAuth(user);
                setCurrentUser(user);
                formik.resetForm();
                toast.success("Login successful");
                // // localStorage.setItem("token", response.data.token);
                // navigate("/home");
              } else if (response.status === 400) {
                toast.error(response.data.message);
              }
            }),

          {
            pending: "Loading...",
            success: "Login successful",
            error: "Something went wrong. Please try again later.",
          }
        );
      } catch (error: any) {
        setStatus(true);
      }
    },
  });
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Box
          display="flex"
          flexDirection={"column"}
          minHeight={600}
          minWidth={350}
          maxWidth={350}
          maxHeight={600}
          padding={2}
          justifyContent={"center"}
          margin={"auto"}
          borderRadius={2}
          boxShadow={"rgba(0, 0, 0, 0.35) 0px 5px 10px"}
        >
          <Box alignSelf={"center"}>
            <img src={logo} alt="logo" width={150} />
          </Box>
          <Typography
            alignSelf={"center"}
            variant="h6"
            gutterBottom
            paddingBottom={1}
            paddingLeft={2}
          >
            Login
          </Typography>
          <form onSubmit={formik.handleSubmit}>
            <Box paddingBottom={3} paddingLeft={2} paddingRight={2}>
              <TextField
                label="Email Address"
                variant="outlined"
                fullWidth
                name="email"
                value={formik.values.email}
                onChange={(e) => {
                  formik.handleChange(e);
                  setStatus(false);
                }}
                error={formik.touched.email && Boolean(formik.errors.email)}
                helperText={formik.touched.email && formik.errors.email}
              />
            </Box>
            <Box paddingBottom={3} paddingLeft={2} paddingRight={2}>
              <TextField
                label="Password"
                variant="outlined"
                type="password"
                fullWidth
                name="password"
                value={formik.values.password}
                onChange={(e) => {
                  formik.handleChange(e);
                  setStatus(false);
                }}
                error={
                  formik.touched.password && Boolean(formik.errors.password)
                }
                helperText={formik.touched.password && formik.errors.password}
              />
            </Box>

            <Box paddingBottom={3} paddingLeft={2} paddingRight={2}>
              <Button
                fullWidth
                variant="contained"
                color="primary"
                size="large"
                type="submit"
              >
                Login
              </Button>
            </Box>
          </form>

          {status ? (
            <Box alignSelf={"center"}>
              <Typography color={red[800]} alignSelf={"center"}>
                Your password or email is incorrect
              </Typography>
            </Box>
          ) : null}

          <Box alignSelf={"center"} paddingTop={6}>
            <CardActions>
              <Typography variant="body2" color="text.secondary">
                Don't have an account?
              </Typography>
              <Link href="/register">
                <Button size="small">Sign Up</Button>
              </Link>
            </CardActions>
          </Box>
        </Box>
      </div>
    </div>
  );
};

export default LoginPage;
