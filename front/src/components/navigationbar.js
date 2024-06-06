/* eslint-disable react/prop-types */
import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import DehazeIcon from "@material-ui/icons/Dehaze";
import { makeStyles } from "@material-ui/core/styles";
import { useHistory } from "react-router-dom";
import { useMutation, gql } from "@apollo/client";
import {
  ListItemText,
  Avatar,
  Divider,
  Toolbar,
  ListItemIcon,
  List,
  Box,
  AppBar,
  ListItem,
  IconButton,
  Button,
} from "@material-ui/core";
import { Home } from "@material-ui/icons";
import MobileeRightMenuSlider from "@material-ui/core/Drawer";

import PropTypes from "prop-types"; // Import PropTypes for prop type validation

import avatar from "../images/dish_icon.png";
import app_logo from "../images/specte-logo.png";
import { onResLogout, onCustomerLogout } from "../app/reducers/mainSlice";
import axios from "axios";
import { CUSTOMER_LOGOUT, RESTAURANT_LOGOUT } from "../graphql/mutation";

// CSS styles
const useStyles = makeStyles((theme) => ({
  sidebarContainer: {
    background: "#F9F9F9",
    height: "100%",
    width: "100%",
    minWidth: "250px",
    paddingTop: "60px",
  },
  icon: {
    display: "block",
    margin: "0.4rem auto",
    marginBottom: "3rem",
    width: theme.spacing(12),
    height: theme.spacing(12),
    borderRadius: 0,
  },
  listItemStyle: {
    color: "black",
    // Add your CSS styles for menu items here
    transition: "background-color 0.3s, color 0.3s", // Add transition effect
    "&:hover": {
      background: "#f5f5f5", // Change background color on hover
    },
  },
  toolbar: {
    display: "flex",
    justifyContent: "space-between",
    width: "100%",
  },
  logo: {
    width: 160,
    height: 82,
    marginRight: 10,
  },
  menuButton: {
    marginLeft: 10,
    transition: "color 0.3s",
  },
  menuButtonOpen: {
    color: "red", // Adjust the color for the open state
  },
  button: {
    height: 40,
    alignSelf: "center",
    marginRight: 20,
    transition: "color 0.3s",
  },
  buttonOpen: {
    color: "green", // Adjust the color for the open state
  },
}));

const Navigationbar = (props) => {
  const { showCart = false, onCartClick = () => {} } = props;
  const classes = useStyles();
  const mainReducer = useSelector((state) => state.mainReducer);
  useEffect(() => {}, []);
  const history = useHistory();
  const dispatch = useDispatch();
  const { userType, token } = mainReducer;

  const [state, setState] = useState({ right: false });

  const toggleSlider = (slider, open) => () => {
    setState({ ...state, [slider]: open });
  };

  // const CUSTOMER_LOGOUT = gql`
  //   mutation customerLogout($email: String!) {
  //     customerLogout(logoutInput: { email: $email })
  //   }
  // `;

  // const RESTAURANT_LOGOUT = gql`
  //   mutation restaurantLogout($email: String!) {
  //     restaurantLogout(logoutInput: { email: $email })
  //   }
  // `;

  const [customerLogout] = useMutation(CUSTOMER_LOGOUT, {
    onCompleted(res) {
      dispatch(onCustomerLogout());
      setTimeout(() => history.push("/login"), 10);
    },
    onError(e) {
      alert(JSON.parse(JSON.stringify(e))?.message);
      console.log("--dfd", JSON.parse(JSON.stringify(e)));
    },
  });

  const [restaurantLogout] = useMutation(RESTAURANT_LOGOUT, {
    onCompleted(res) {
      dispatch(onResLogout());
      setTimeout(() => history.push("/login"), 10);
    },
    onError(e) {
      alert(JSON.parse(JSON.stringify(e))?.message);
      console.log("--dfd", JSON.parse(JSON.stringify(e)));
    },
  });

  const logoutApi = async () => {
    const { resProfile, token, customerProfile } = mainReducer;
    const headers = {
      Authorization: token,
      "x-access-token": token,
    };
    const body = {
      email: userType === 1 ? customerProfile?.email : resProfile?.email,
      token,
    };
    try {
      userType == "1"
        ? customerLogout({
            variables: { ...body },
          })
        : restaurantLogout({
            variables: { ...body },
          });
    } catch (err) {
      console.log(err);
    }
  };

  const afterResLoginItems = [
    {
      itemText: "Merchant Profile",
      itemPath: "/res_profile",
    },
    {
      itemIcon: <Home />,
      itemText: "Dashboard",
      itemPath: "/",
    },
    {
      itemText: "Merchant Menu",
      itemPath: "/restaurant/menu",
    },
    {
      itemText: "Orders",
      itemPath: "/restaurant_orders",
    },
  ];

  const afterCustomerLoginItems = [
    {
      itemIcon: <Home />,
      itemText: "Merchants",
      itemPath: "/customer",
    },

    {
      itemText: "Profile",
      itemPath: "/customer_profile",
    },
    {
      itemText: "Orders",
      itemPath: "/customer_orders",
    },
  ];

  const beforeLogin = [
    {
      itemIcon: <Home />,
      itemText: "Dashboard",
      itemPath: "/",
    },

    {
      itemText: "Merchant Signup",
      itemPath: "/res_signup",
    },
  ];

  const menuItems = token
    ? userType === 1
      ? afterCustomerLoginItems
      : afterResLoginItems
    : beforeLogin;

  const sidebarList = (slider) => (
    <Box
      component="div"
      className={classes.sidebarContainer}
      onClick={toggleSlider(slider, false)}
    >
      <Avatar className={classes.icon} src={avatar} alt="" />
      <Divider />
      <List>
        {menuItems.map((listItem, key) => (
          <ListItem button key={key} component={Link} to={listItem.itemPath}>
            {/* <ListItemIcon className={classes.listItemStyle}>{listItem.itemIcon}</ListItemIcon> */}
            <ListItemText
              className={classes.listItemStyle}
              primary={listItem.itemText}
            />
          </ListItem>
        ))}
      </List>
      {token && (
        <Button
          // type="submit"
          fullWidth
          // variant="outlined
          color="black"
          className={classes.submit}
          onClick={() => logoutApi()}
          style={{ width: 100 }}
        >
          Logout
        </Button>
      )}
    </Box>
  );
  return (
    <>
      <Box component="nav">
        <AppBar position="fixed" style={{ background: "white" }}>
          <Toolbar
            style={{
              display: "flex",
              justifyContent: "space-between",
              width: "100%",
            }}
          >
            <div style={{ display: "flex", alignItems: "center" }}>
              <IconButton
                onClick={toggleSlider("left", true)}
                style={{ marginLeft: 10 }}
              >
                <DehazeIcon style={{ color: "black" }} />
              </IconButton>
              <MobileeRightMenuSlider
                open={state.left}
                onClose={toggleSlider("left", false)}
                anchor="left"
              >
                {sidebarList("left")}
              </MobileeRightMenuSlider>
              <img
                src={app_logo}
                width={160}
                height={71}
                alt=""
                color={"red"}
                style={{ width: 160, height: 71, marginRight: 10 }}
              />
            </div>
            <div>
              {showCart && (
                <Button
                  variant="outlined"
                  color="black"
                  onClick={() => onCartClick()}
                  style={{
                    width: 100,
                    height: 40,
                    alignSelf: "center",
                    marginRight: 20,
                  }}
                >
                  Cart
                </Button>
              )}

              {!token && (
                <>
                  <Button
                    variant="outlined"
                    color="primary"
                    component={Link}
                    to="/customer_signup"
                    style={{ height: 40, alignSelf: "center", marginRight: 20 }}
                  >
                    Customer Signup
                  </Button>
                </>
              )}
              {!token && (
                <>
                  <Button
                    variant="outlined"
                    color="primary"
                    component={Link}
                    to="/login"
                    style={{ height: 40, alignSelf: "center", marginRight: 20 }}
                  >
                    Login
                  </Button>
                </>
              )}
            </div>
          </Toolbar>
        </AppBar>
      </Box>
    </>
  );
};

export default Navigationbar;
