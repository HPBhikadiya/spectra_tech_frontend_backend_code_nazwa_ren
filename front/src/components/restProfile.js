import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import Navigationbar from "./navigationbar.js";
// import { Redirect, Router} from 'react-router-dom';
import { useHistory } from "react-router-dom";
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
import {
  onResLogin,
  onCustomerLogin,
  updateResProfile,
} from "../app/reducers/mainSlice";

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
  console.log("resProfile", resProfile);
  const [name, setName] = useState(resProfile && (resProfile?.name || ""));
  const [phone, setPhone] = useState(resProfile?.phone_number || "");
  const [description, setDescription] = useState(resProfile?.description || "");
  const [discount, setDiscount] = useState(resProfile?.discount || 0);
  const [commission, setCommission] = useState(resProfile?.commission || 10);

  const [streetAddress, setStreetAddress] = useState(
    resProfile?.address?.street_address || ""
  );
  const [aptNumber, setAptNumber] = useState(
    resProfile?.address?.apt_number || ""
  );
  const [city, setCity] = useState(resProfile?.address?.city || "san jose");
  const [state, setState] = useState(
    resProfile?.address?.state || "california"
  );
  const [country, setCountry] = useState(
    resProfile?.address?.country || "united states"
  );
  const [notificationMode, setNotificationMode] = useState(
    resProfile?.notificationMode || "EMAIL"
  );
  const [zipcode, setZipcode] = useState(
    resProfile?.address?.zipcode || "95111"
  );
  const [timingOpen, setTimingOpen] = useState(resProfile?.timing_open || "");
  const [timingClose, setTimingClose] = useState(
    resProfile?.timing_close || ""
  );
  const [deliveryOptions, setDeliveryOptions] = useState(
    resProfile?.delivery_option
  );
  const [imageFile, setImageFile] = useState(null);
  const [imageUrl, setImageUrl] = useState(resProfile?.image || "");

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

  const notificationModeOption = [
    {
      value: "TEXT",
      label: "Text",
    },
    {
      value: "EMAIL",
      label: "Email",
    },
    {
      value: "BOTH",
      label: "Both",
    },
  ];

  const deliveryOptionList = [
    {
      value: 2,
      label: "Take out",
    },
    {
      value: 3,
      label: "Dine-in",
    },
  ];

  useEffect(() => {}, []);
  const dispatch = useDispatch();
  const classes = useStyles();
  const { register, handleSubmit, control } = useForm();
  const history = useHistory();
  console.log("token==", token);
  const url = "/restaurants/profile";
  const handleImageFileChange = async (event) => {
    const file = event.target.files[0];
    if (file) {
      const formData = new FormData();
      formData.append("file", file);

      try {
        const response = await axios.post("/upload_image", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });

        const imageUrl = response.data.imageUrl;
        setImageUrl(imageUrl);
        setImageFile(file);
      } catch (error) {
        console.error("Error uploading file:", error);
      }
    }
  };
  const updateProfileApi = async () => {
    if (!validateInputs()) {
      return false;
    }

    const body = {
      res_id: resProfile?._id,
      name,
      // address_id: resProfile?.address?.address_id,
      delivery_option: "1",
      phone_number: phone,
      description: description || `${name} is a good restaurant`,
      timing_open: timingOpen,
      timing_close: timingClose,
      street_address: streetAddress,
      apt_number: aptNumber,
      city: city,
      state: state,
      country: country,
      notificationMode,
      commission,
      zipcode: zipcode,
      isAddressUpdated: true,
      restaurant_image: imageUrl,
      discount,
    };
    console.log("test here" + body);
    const headers = {
      "x-access-token": token,
    };
    console.log("body", body);
    try {
      const res = await axios.put(url, body, { headers });
      console.log("response", res);
      dispatch(updateResProfile(res.data));
      setTimeout(() => history.push("/"), 500);
    } catch (err) {
      console.log(err);
    }
  };

  const validateInputs = () => {
    if (!name) {
      alert("Needs name");
      return false;
    }
    // if (!isValidEmail(email)) {
    //   alert("Invalid Email");
    //   return false
    // }
    if (!city) {
      alert("Needs city");
      return false;
    }
    if (!country) {
      alert("Needs country");
      return false;
    }
    return true;
  };
  const onClickSubmit = (data) => {
    console.log("calling");
    updateProfileApi();
  };
  const onError = (errors, e) => {
    console.log("errors", errors, "e", e);
  };
  return (
    <>
      <Navigationbar />
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Restaurant Profile
          </Typography>
          <form
            className={classes.form}
            noValidate
            onSubmit={handleSubmit(onClickSubmit, onError)}
          >
            <input
              type="file"
              accept="image/*"
              onChange={handleImageFileChange}
            />
            <TextField
              variant="outlined"
              margin="normal"
              inputRef={{ ...register("name") }}
              fullWidth
              id="name"
              label="name"
              name="name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              autoFocus
              inputProps={{ className: classes.textInput }}
            />
            <TextField
              variant="outlined"
              margin="normal"
              // , { required: true }
              inputRef={{ ...register("phone") }}
              // required
              fullWidth
              name="phone"
              label="phone"
              type="tel"
              id="phone"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
            <TextField
              variant="outlined"
              margin="normal"
              inputRef={{ ...register("description") }}
              fullWidth
              id="description"
              label="description"
              name="description"
              type="text"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              autoFocus
              inputProps={{ className: classes.textInput }}
            />
            <TextField
              variant="outlined"
              margin="normal"
              inputRef={{ ...register("discount") }}
              fullWidth
              id="discount"
              label="discount"
              name="discount"
              type="number"
              value={discount}
              onChange={(e) => {
                if (e.target.value >= 0 && e.target.value <= 100) {
                  setDiscount(e.target.value);
                }
              }}
              autoFocus
              inputProps={{
                className: classes.textInput,
                min: 0,
                max: 100,
                step: 1,
                pattern: "\\d*",
                onKeyDown: (e) => {
                  if (e.key === "." || e.key === "-") {
                    e.preventDefault();
                  }
                },
              }}
            />

            <TextField
              variant="outlined"
              margin="normal"
              inputRef={{ ...register("commission") }}
              fullWidth
              id="commission"
              label="commission"
              name="commission"
              type="number"
              value={commission}
              onChange={(e) => {
                if (e.target.value >= 0 && e.target.value <= 100) {
                  setCommission(e.target.value);
                }
              }}
              autoFocus
              inputProps={{
                className: classes.textInput,
                min: 0,
                max: 100,
                step: 1,
                pattern: "\\d*",
                onKeyDown: (e) => {
                  if (e.key === "." || e.key === "-") {
                    e.preventDefault();
                  }
                },
              }}
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
            {/* <TextField
              variant="outlined"
              margin="normal"
              // , { required: true }
              inputRef={{...register('country')}}
              // required
              fullWidth
              name="country"
              label="country"
              type="text"
              id="country"
              value={country}
              onChange={e => setCountry(e.target.value)}
            /> */}
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
              inputRef={{ ...register("timingOpen") }}
              // required
              fullWidth
              name="timingOpen"
              label="timingOpen"
              type="text"
              id="timingOpen"
              value={timingOpen}
              onChange={(e) => setTimingOpen(e.target.value)}
            />
            <TextField
              variant="outlined"
              margin="normal"
              // , { required: true }
              inputRef={{ ...register("timingClose") }}
              // required
              fullWidth
              name="timingClose"
              label="timingClose"
              type="text"
              id="timingClose"
              value={timingClose}
              onChange={(e) => setTimingClose(e.target.value)}
            />
            <TextField
              id="outlined-select-currency"
              select
              label="country"
              value={country}
              onChange={(e) => setCountry(e.target.value)}
              //   helperText="Please select your currency"
            >
              {countries.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </TextField>
            <TextField
              id="outlined-notificationMode"
              select
              label="notificationMode"
              value={notificationMode}
              onChange={(e) => setNotificationMode(e.target.value)}
              //   helperText="Please select your currency"
            >
              {notificationModeOption.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </TextField>
            {/*<TextField
            id="outlined-select-currency"
            select
            label="Options"
            value={deliveryOptions}
            onChange={e => setDeliveryOptions(e.target.value)}
          //   helperText="Please select your currency"
          >
            {deliveryOptionList.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </TextField>*/}
            {/* <FormControl component="fieldset">
              <RadioGroup
                  // aria-label="gender"
                  name="controlled-radio-buttons-group"
                  defaultValue={"1"}
                  value={userType}
                  onChange={e => setUserType(e.target.value)}
              >
                  <FormControlLabel value="1" control={<Radio />} label="customer" />
                  <FormControlLabel value="2" control={<Radio />} label="restaurant" />
              </RadioGroup>
              </FormControl> */}
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
              // onSubmit={() => onClickSubmit()}
            >
              Update Profile
            </Button>
            {/* <Grid container>
              <Grid item>
                <Link href="#" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid> */}
          </form>
        </div>
      </Container>
    </>
  );
}
