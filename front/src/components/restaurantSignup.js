import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import NavigationBar from "./navigationbar.js";
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  useQuery,
  useMutation,
  useLazyQuery,
  gql,
} from "@apollo/client";
import axios from "axios";
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
import { useForm, Controller } from "react-hook-form";
import { onResSignup } from "../app/reducers/mainSlice";
import { isValidEmail } from "../utility.js";
import { RESTAURANT_SIGNUP } from "../graphql/mutation.js";

import VisibilityIcon from "@material-ui/icons/Visibility";
import VisibilityOffIcon from "@material-ui/icons/VisibilityOff";

import { InputAdornment, IconButton } from "@material-ui/core";
const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(12),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    boxShadow: "1px 0px 4px 4px rgba(0, 0, 0, 0.25)",
    borderRadius: "16px",
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

export default function ResSignup() {
  const mainReducer = useSelector((state) => state.mainReducer);
  const { resProfile, token } = mainReducer;
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  // const [lastName, setLastName] = useState("");
  const [password, setPassword] = useState("");
  const [streetAddress, setStreetAddress] = useState(
    resProfile?.streetAddress || ""
  );
  const [city, setCity] = useState(resProfile?.city || "");
  const [state, setState] = useState(resProfile?.state || "");
  const [country, setCountry] = useState(resProfile?.country || "Canada");
  const [methodForOrder, setMethodForOrder] = useState(
    resProfile?.methodForOrder || "email"
  );
  const [zipcode, setZipcode] = useState(resProfile?.zipcode || "");
  const [showPassword, setShowPassword] = useState(false); // State to manage password visibility
  const [termsAccepted, setTermsAccepted] = useState(false);

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const countries = [
    {
      value: "united states",
      label: "United States",
    },
    {
      value: "india",
      label: "India",
    },
    {
      value: "Canada",
      label: "Canada",
    },
    {
      value: "united kingdom",
      label: "United Kingdom",
    },
    {
      value: "australia",
      label: "Australia",
    },
    {
      value: "germany",
      label: "Germany",
    },
    {
      value: "france",
      label: "France",
    },
    {
      value: "japan",
      label: "Japan",
    },
    {
      value: "china",
      label: "China",
    },
    {
      value: "brazil",
      label: "Brazil",
    },
    {
      value: "south korea",
      label: "South Korea",
    },
    {
      value: "russia",
      label: "Russia",
    },
    {
      value: "italy",
      label: "Italy",
    },
    {
      value: "mexico",
      label: "Mexico",
    },
    {
      value: "south africa",
      label: "South Africa",
    },
    {
      value: "spain",
      label: "Spain",
    },
    {
      value: "netherlands",
      label: "Netherlands",
    },
    {
      value: "sweden",
      label: "Sweden",
    },
    {
      value: "switzerland",
      label: "Switzerland",
    },
    {
      value: "norway",
      label: "Norway",
    },
    {
      value: "new zealand",
      label: "New Zealand",
    },
    {
      value: "singapore",
      label: "Singapore",
    },
    {
      value: "belgium",
      label: "Belgium",
    },
    {
      value: "austria",
      label: "Austria",
    },
    {
      value: "ireland",
      label: "Ireland",
    },
    {
      value: "denmark",
      label: "Denmark",
    },
    {
      value: "finland",
      label: "Finland",
    },
    {
      value: "poland",
      label: "Poland",
    },
    {
      value: "czech republic",
      label: "Czech Republic",
    },
    {
      value: "portugal",
      label: "Portugal",
    },
    {
      value: "Morocco",
      label: "Morocco",
    },
  ];

  const methodForOrderOption = [
    {
      value: "text",
      label: "Text",
    },
    {
      value: "email",
      label: "Email",
    },
    {
      value: "both",
      label: "Both",
    },
  ];

  useEffect(() => {}, []);
  const dispatch = useDispatch();
  const classes = useStyles();
  const { register, handleSubmit, control } = useForm();
  const history = useHistory();
  const url = "/signup/restaurant";
  // const RESTAURANT_SIGNUP = gql`
  // mutation restaurantSignup(
  //   $email: String!,
  //   $password: String!,
  //   $name: String!,
  //   $street_address: String,
  //   $apt_number: String,
  //   $city: String!,
  //   $state: String,
  //   $country: String!,
  //   $zipcode: Int!,
  // ) {
  //   restaurantSignup(restaurantSignupInput: {
  //     email: $email,
  //     password: $password,
  //     name: $name,
  //     street_address: $street_address,
  //     apt_number: $apt_number
  //     city: $city,
  //     state: $state,
  //     country: $country,
  //     zipcode: $zipcode,
  //   })
  // }`;

  const [restaurantSignup] = useMutation(RESTAURANT_SIGNUP, {
    onCompleted(res) {
      console.log("da", res);
      dispatch(onResSignup());
      history.push("/login");
    },
    onError(e) {
      alert(JSON.parse(JSON.stringify(e))?.message);
      console.log("--dfd", JSON.parse(JSON.stringify(e)));
    },
  });

  const restaurantSignupApi = async () => {
    if (!validateInputs()) {
      return;
    }
    const body = {
      email,
      password,
      name,
      street_address: streetAddress,
      city,
      methodForOrder,
      commission,
      state,
      zipcode: zipcode,
      country,
    };
    console.log("body", body);
    try {
      restaurantSignup({
        variables: { ...body },
      });
    } catch (err) {
      console.log(err);
    }
  };
  const onClickSubmit = (data) => {
    console.log("calling");
    restaurantSignupApi();
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
    if (!name) {
      alert("Needs firstName");
      return false;
    }
    if (!city) {
      alert("Needs lastName");
      return false;
    }
    if (!password) {
      alert("Needs password");
      return false;
    }
    if (!country) {
      alert("Needs country");
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
            Merchant Signup
          </Typography>
          <form
            className={classes.form}
            noValidate
            onSubmit={handleSubmit(onClickSubmit, onError)}
          >
            <TextField
              variant="outlined"
              margin="normal"
              // , { required: true }
              inputRef={{ ...register("email") }}
              // required
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
              // , { required: true }
              inputRef={{ ...register("name") }}
              // required
              fullWidth
              name="name"
              label="Merchant name"
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <TextField
              variant="outlined"
              margin="normal"
              // , { required: true }
              inputRef={{ ...register("streetAddress") }}
              // required
              fullWidth
              name="streetAddress"
              label="streetAddress"
              type="text"
              id="streetAddress"
              value={streetAddress}
              onChange={(e) => setStreetAddress(e.target.value)}
            />
            <TextField
              variant="outlined"
              margin="normal"
              // , { required: true }
              inputRef={{ ...register("city") }}
              // required
              fullWidth
              name="city"
              label="city"
              type="text"
              id="city"
              value={city}
              onChange={(e) => setCity(e.target.value)}
            />
            <TextField
              variant="outlined"
              margin="normal"
              // , { required: true }
              inputRef={{ ...register("zipcode") }}
              // required
              fullWidth
              name="zipcode"
              label="zipcode"
              type="text"
              id="zipcode"
              value={zipcode}
              onChange={(e) => setZipcode(e.target.value)}
            />
            <TextField
              variant="outlined"
              margin="normal"
              // , { required: true }
              inputRef={{ ...register("state") }}
              // required
              fullWidth
              name="state"
              label="state"
              type="text"
              id="state"
              value={state}
              onChange={(e) => setState(e.target.value)}
            />
            <TextField
              id="country"
              select
              label="country"
              value={country}
              onChange={(e) => setCountry(e.target.value)}
            >
              {countries.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </TextField>

            <TextField
              id="outlined-methodForOrder"
              select
              label="methodForOrder"
              value={methodForOrder}
              onChange={(e) => setMethodForOrder(e.target.value)}
              //   helperText="Please select your currency"
            >
              {methodForOrderOption.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </TextField>

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
                    href="/terms-and-conditions-res"
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
              Sign up
            </Button>
          </form>
        </div>
      </Container>
    </>
  );
}
