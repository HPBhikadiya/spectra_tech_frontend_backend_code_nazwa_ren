/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-filename-extension */
import * as React from "react";
import {
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Button,
  Typography,
  IconButton,
  Box,
} from "@material-ui/core";
import Dish1 from "../images/dish1.jpeg";
import Dish2 from "../images/dish2.jpeg";
import Dish3 from "../images/dish3.jpeg";
import Dish4 from "../images/dish4.jpeg";
import { random } from "../utility";

const imgList = [Dish1, Dish2, Dish3, Dish4];

export default function MediaCard(props) {
  const { res, onResClick = () => {}, addResToFavourites = () => {} } = props;
  return (
    <Card sx={{ maxWidth: 345 }} onClick={() => onResClick(res)}>
      <Box
        sx={{
          position: "relative",
        }}
      >
        {res.discount && res.discount > 0 ? (
          <Typography
            style={{
              position: "absolute",
              backgroundColor: "red",
              padding: "3px 10px",
            }}
          >
            {res.discount} %OFF
          </Typography>
        ) : (
          ""
        )}

        <CardMedia
          component="img"
          height="140"
          image={
            res.restaurant_image ||
            "https://www.spectradiscount.ca/static/media/bagr.fbf22931.jpeg"
          }
          alt="green iguana"
        />
      </Box>
      <CardContent>
        <Typography
          gutterBottom
          variant="h5"
          component="div"
          className="resName"
        >
          {res?.name || "subway"}
        </Typography>
        <Typography
          variant="body2"
          color="textSecondary"
          style={{ maxLines: 2, lineHeight: 2 }}
        >
          {res.description || "A nice restaurant"}
        </Typography>
      </CardContent>
    </Card>
  );
}
