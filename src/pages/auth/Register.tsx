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

const Register = () => {
  const schema = yup.object().shape({
    firstname: yup.string().required(),
    lastname: yup.string().required(),
    email: yup.string().email().required(),
    phonenumber: yup.string().required(),
    password: yup.string().min(8).required(),
    confirmpassword: yup.string().min(8).required(),
  });

  const initialValues = {
    firstname: "",
    lastname: "",
    email: "",
    phonenumber: "",
    password: "",
    confirmpassword: "",
  };

  const BaseUrl = import.meta.env.VITE_API_URL;

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: schema,
    onSubmit: async (values) => {
      try {
        await toast.promise(
          axios
            .post(`${BaseUrl}/auth/register`, {
              firstname: values.firstname,
              lastname: values.lastname,
              email: values.email,
              credentials: values.password,
              phonenumber: values.phonenumber,
            })
            .then((response) => {
              if (response.status === 200) {
                formik.resetForm();
              } else if (response.status === 400) {
                toast.error(response.data.message);
              }
            }),

          {
            pending: "Loading...",
            success: "Registration successful. Please login to continue.",
            error: "Something went wrong. Please try again later.",
          }
        );
      } catch (error: any) {
        toast.error(error.response.data.message);
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
          minHeight={400}
          minWidth={600}
          maxWidth={350}
          maxHeight={600}
          paddingLeft={10}
          paddingRight={10}
          paddingTop={5}
          paddingBottom={5}
          justifyContent={"center"}
          margin={"auto"}
          borderRadius={2}
          boxShadow={"rgba(0, 0, 0, 0.35) 0px 5px 10px"}
        >
          <Box alignSelf={"center"}>
            <img src={logo} alt="logo" width={150} />
          </Box>
          <Typography
            variant="h6"
            gutterBottom
            paddingBottom={1}
            paddingRight={2}
          >
            Register
          </Typography>
          <form onSubmit={formik.handleSubmit}>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <div style={{ flex: 1, paddingRight: 30, paddingBottom: 30 }}>
                <TextField
                  label="First Name"
                  variant="outlined"
                  fullWidth
                  name="firstname"
                  value={formik.values.firstname}
                  onChange={formik.handleChange}
                  error={
                    formik.touched.firstname && Boolean(formik.errors.firstname)
                  }
                  helperText={
                    formik.touched.firstname && formik.errors.firstname
                  }
                />
              </div>
              <div style={{ flex: 1, paddingLeft: 5 }}>
                <TextField
                  label="Last Name"
                  variant="outlined"
                  fullWidth
                  name="lastname"
                  value={formik.values.lastname}
                  onChange={formik.handleChange}
                  error={
                    formik.touched.lastname && Boolean(formik.errors.lastname)
                  }
                  helperText={formik.touched.lastname && formik.errors.lastname}
                />
              </div>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <div style={{ flex: 1, paddingBottom: 30 }}>
                <TextField
                  label="Email Address"
                  variant="outlined"
                  fullWidth
                  name="email"
                  value={formik.values.email}
                  onChange={formik.handleChange}
                  error={formik.touched.email && Boolean(formik.errors.email)}
                  helperText={formik.touched.email && formik.errors.email}
                />
              </div>
              <div style={{ flex: 1, paddingLeft: 30, paddingBottom: 30 }}>
                <TextField
                  label="Phone Number"
                  variant="outlined"
                  fullWidth
                  name="phonenumber"
                  value={formik.values.phonenumber}
                  onChange={formik.handleChange}
                  error={
                    formik.touched.phonenumber &&
                    Boolean(formik.errors.phonenumber)
                  }
                  helperText={
                    formik.touched.phonenumber && formik.errors.phonenumber
                  }
                />
              </div>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <div style={{ flex: 1, paddingRight: 30, paddingBottom: 30 }}>
                <TextField
                  label="Password"
                  variant="outlined"
                  type="password"
                  fullWidth
                  name="password"
                  value={formik.values.password}
                  onChange={formik.handleChange}
                  error={
                    formik.touched.password && Boolean(formik.errors.password)
                  }
                  helperText={formik.touched.password && formik.errors.password}
                />
              </div>
              <div style={{ flex: 1, paddingLeft: 5 }}>
                <TextField
                  label="Confirm Password"
                  variant="outlined"
                  type="password"
                  fullWidth
                  name="confirmpassword"
                  value={formik.values.confirmpassword}
                  onChange={formik.handleChange}
                  error={
                    formik.touched.confirmpassword &&
                    Boolean(formik.errors.confirmpassword)
                  }
                  helperText={
                    formik.touched.confirmpassword &&
                    formik.errors.confirmpassword
                  }
                />
              </div>
            </div>

            <Box paddingBottom={3} paddingRight={2}>
              <Button
                variant="contained"
                color="primary"
                size="large"
                type="submit"
              >
                Register
              </Button>
            </Box>
          </form>

          <Box alignSelf={"center"} paddingTop={6}>
            <CardActions>
              <Typography variant="body2" color="text.secondary">
                Already have an account?
              </Typography>
              <Link href="/login">
                <Button size="small">Login</Button>
              </Link>
            </CardActions>
          </Box>
        </Box>
      </div>
    </div>
  );
};

export default Register;
