import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import { Grid, Box, Typography } from "@material-ui/core";
import Res1 from "../images/bagr.jpeg";

// CSS styles
const useStyles = makeStyles((theme) => ({
  container: {
    position: "relative",
    height: "100vh",
    backgroundImage: `url(${Res1})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    color: "#fff", // White text color
    textAlign: "center",
    padding: "20px",
  },
  overlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0, 0, 0, 0.5)", // Dark overlay
  },
  content: {
    position: "relative",
    zIndex: 1,
  },
  title: {
    fontSize: "3rem",
    fontWeight: "bold",
    marginBottom: "20px",
  },
  subtitle: {
    fontSize: "1.5rem",
  },
}));

const Dashboard = () => {
  const mainReducer = useSelector((state) => state.mainReducer);
  useEffect(() => {}, []);
  const classes = useStyles();

  return (
    <Box component="div" className={classes.container}>
      <div className={classes.overlay}></div>
      <div className={classes.content}>
        <Typography variant="h1" className={classes.title}>
          Discount Dining for Dine-In and Takeout
        </Typography>
        <Typography variant="h5" className={classes.subtitle}>
          No coupons. No hassle. No nonsense. Just show up and get discounts on
          regular menu items for ages 35 and under!
        </Typography>
      </div>
    </Box>
  );
};

export default Dashboard;
