import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import NavigationBar from "./navigationbar.js";
import axios from "axios";
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  useQuery,
  useMutation,
  useLazyQuery,
  gql,
} from "@apollo/client";
import {
  Avatar,
  CssBaseline,
  Button,
  Container,
  FormControl,
  FormLabel,
  FormControlLabel,
  makeStyles,
  Link,
  Grid,
  Checkbox,
  Typography,
  TextField,
  Radio,
  RadioGroup,
  MenuItem,
} from "@material-ui/core";

import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import VisibilityIcon from "@material-ui/icons/Visibility";
import VisibilityOffIcon from "@material-ui/icons/VisibilityOff";
import { useForm, Controller } from "react-hook-form";
import {
  onResLogin,
  onCustomerLogin,
  updateResProfile,
  onCustomerSignup,
} from "../app/reducers/mainSlice";
import { isValidEmail } from "../utility.js";
import { CUSTOMER_SIGNUP } from "../graphql/mutation.js";
import { InputAdornment, IconButton } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(12),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    boxShadow: "1px 0px 4px 4px rgba(0, 0, 0, 0.25)",
    padding: theme.spacing(8),
    background: theme.palette.background.paper,
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.success.main,
  },
  form: {
    width: "111%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
    background: "#167544", // Enclosed color code in quotes
    borderRadius: "22px",
    textTransform: "uppercase",
    fontWeight: "bold",
    "&:hover": {
      background: "#5DC28E",
    },
  },

  textInput: {
    borderColor: theme.palette.success.light,

    "& input": {
      padding: "12px",
    },
  },
}));

export default function ResProfile() {
  const mainReducer = useSelector((state) => state.mainReducer);
  const { resProfile, token } = mainReducer;
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false); // State to manage password visibility
  const [termsAccepted, setTermsAccepted] = useState(false);

  useEffect(() => {}, []);
  const dispatch = useDispatch();
  const classes = useStyles();
  const { register, handleSubmit, control } = useForm();
  const history = useHistory();
  const url = "/signup/customer";

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const [customerSignup] = useMutation(CUSTOMER_SIGNUP, {
    onCompleted(res) {
      console.log("da", res);
      // dispatch(onCustomerSignup())
      history.push("/login");
    },
    onError(e) {
      alert(JSON.parse(JSON.stringify(e))?.message);
      console.log("--dfd", JSON.parse(JSON.stringify(e)));
    },
  });

  const customerSignupApi = async () => {
    if (!validateInputs()) {
      return;
    }
    const body = {
      email,
      password,
      first_name: firstName,
      last_name: lastName,
    };
    console.log("body", body);
    try {
      customerSignup({
        variables: { ...body },
      });
    } catch (err) {
      console.log(err);
    }
  };
  const onClickSubmit = (data) => {
    console.log("calling");
    customerSignupApi();
  };
  const onError = (errors, e) => {
    console.log("errors", errors, "e", e);
  };

  const validateInputs = () => {
    if (!email) {
      alert("Needs Email");
      return false;
    }
    if (!isValidEmail(email)) {
      alert("Invalid Email");
      return false;
    }
    if (!firstName) {
      alert("Needs firstName");
      return false;
    }
    if (!lastName) {
      alert("Needs lastName");
      return false;
    }
    if (!password) {
      alert("Needs password");
      return false;
    }
    if (!termsAccepted) {
      alert("You must accept the terms and conditions to sign up");
      return false;
    }
    return true;
  };

  return (
    <>
      <NavigationBar />
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Customer
          </Typography>
          <form
            className={classes.form}
            noValidate
            onSubmit={handleSubmit(onClickSubmit, onError)}
          >
            <TextField
              variant="outlined"
              margin="normal"
              inputRef={{ ...register("email") }}
              fullWidth
              id="email"
              label="email"
              name="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              autoFocus
              inputProps={{ className: classes.textInput }}
            />
            <TextField
              variant="outlined"
              margin="normal"
              inputRef={{ ...register("password") }}
              fullWidth
              name="password"
              label="password"
              type={showPassword ? "text" : "password"} // Change type based on showPassword state
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              InputProps={{
                // Add InputProps to include the eye icon
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                    >
                      {showPassword ? (
                        <VisibilityIcon />
                      ) : (
                        <VisibilityOffIcon />
                      )}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
            <TextField
              variant="outlined"
              margin="normal"
              inputRef={{ ...register("firstName") }}
              fullWidth
              name="firstName"
              label="firstName"
              type="text"
              id="firstName"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />
            <TextField
              variant="outlined"
              margin="normal"
              inputRef={{ ...register("lastName") }}
              fullWidth
              name="lastName"
              label="lastName"
              type="text"
              id="lastName"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={termsAccepted}
                  onChange={(e) => setTermsAccepted(e.target.checked)}
                  name="terms"
                  color="primary"
                />
              }
              label={
                <Typography variant="body2">
                  I agree to the{" "}
                  <Link
                    href="/terms-and-conditions-cus"
                    target="_blank"
                    rel="noopener"
                  >
                    terms and conditions
                  </Link>{" "}
                  and{" "}
                  <Link href="/PrivacyNotice" target="_blank" rel="noopener">
                    privacy notice
                  </Link>
                </Typography>
              }
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              Signup
            </Button>
          </form>
        </div>
      </Container>
    </>
  );
}
