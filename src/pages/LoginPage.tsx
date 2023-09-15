import React , { useState} from "react";
import "../assets/css/loginpage.css";
import { useFormik } from "formik";
import * as yup from "yup";
import { useDispatch } from "react-redux";
import { loginInfo } from "../redux/features/useAuth/userSlice";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Alert from "@mui/material/Alert";
import { Link, useNavigate } from "react-router-dom";
import Grid from "@mui/material/Grid";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import LockIcon from "@mui/icons-material/Lock";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";

interface LogInFormValues {
  email: string;
  username: string;
  password: string;
}

const LoginPage: React.FC = () => {
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const validationSchema = yup.object({
    email: yup
      .string()
      .email("Invalid email address")
      .required("Email is required"),
    password: yup.string().required("Password is required"),
  });

  const formik = useFormik<LogInFormValues>({
    initialValues: {
      email: "",
      password: "",
      username: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      const existingUsers = JSON.parse(
        localStorage.getItem("usersData") || "[]"
      );
      const user = existingUsers.find(
        (item: any) => item.email === values.email
      );

      if (user) {
        if (user.password === values.password) {
          const loginUser = {
            email: values.email,
            name: user.username,
          };
          dispatch(loginInfo(loginUser));
          localStorage.setItem("loginuser", JSON.stringify(loginUser));
          setSnackbarOpen(true);
          setTimeout(() => {
            navigate("/dashboard");
          } , 1000)
         
        } else {
          formik.setFieldError("password", "Password does not match");
        }
      } else {
        formik.setFieldError("email", "User not found");
      }
    },
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    formik.handleChange(e);
    formik.setFieldTouched(e.target.name, true, false);
  };

  return (
    <div className="login-container">
      <div className="login-form">
        <h2 className="form-title">LOGIN</h2>
        <form onSubmit={formik.handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
            <TextField
                className={`form-input ${
                  formik.touched.email && formik.errors.email ? "error" : ""
                }`}
                fullWidth
                id="email"
                name="email"
                label="Email"
                variant="outlined"
                margin="normal"
                value={formik.values.email}
               onChange={handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.email && Boolean(formik.errors.email)}
                helperText={
                  (formik.touched.email && formik.errors.email) || " "
                }
                InputProps={{
                  startAdornment: <AccountCircleIcon />,
                }}
              />
            </Grid>
            <Grid item xs={12}>
            <TextField
                className={`form-input ${
                  formik.touched.password && formik.errors.password
                    ? "error"
                    : ""
                }`}
                fullWidth
                id="password"
                name="password"
                label="Password"
                type="password"
                variant="outlined"
                margin="normal"
                value={formik.values.password}
                onChange={handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.password && Boolean(formik.errors.password)}
                helperText={
                  (formik.touched.password && formik.errors.password) || " "
                }
                InputProps={{
                  startAdornment: <LockIcon />,
                }}
                autoComplete="on"
              />
            </Grid>
          </Grid>
          {formik.status && <Alert severity="error">{formik.status}</Alert>}
          <Button
            type="submit"
            variant="contained"
            className="login-button"
            fullWidth
          >
            Log In
          </Button>
          <div className="login-link-container">
          <Link to="/signup" className="login-link">
            Don't have an account? Sign up
          </Link>
          </div>
        </form>
        <Snackbar
          open={snackbarOpen}
          autoHideDuration={6000}
          onClose={() => setSnackbarOpen(false)}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "right",
          }}
        >
          <MuiAlert
            elevation={6}
            variant="filled"
            onClose={() => setSnackbarOpen(false)}
            severity="success"
            style={{ backgroundColor: '#134e4a' }}
          >
            Login successful!
          </MuiAlert>
        </Snackbar>
      </div>
    </div>
  );
};



export default LoginPage;
