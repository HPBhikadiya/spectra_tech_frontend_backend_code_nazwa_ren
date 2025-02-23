import React, {useState, useEffect} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import {makeStyles, withStyles } from '@material-ui/core/styles';
import {
    Typography,
    Box,
    Grid,
    Hidden,
    Card,
    CardActions,
    CardActionArea,
    CardContent,
} from '@material-ui/core';
import {
    ApolloClient,
    InMemoryCache,
    ApolloProvider,
    useQuery,
    useMutation,
    useLazyQuery,
    gql
  } from "@apollo/client";
import Button from '@material-ui/core/Button';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import { orange, teal } from '@material-ui/core/colors';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Navigationbar from './navigationbar';
import Dish1 from "../images/dish1.jpeg";
import { getResMenu, updateResProfile } from '../app/reducers/mainSlice';
import AddEditDishDialog from './AddEditDishDialog';
import { POST_DISH, UPDATE_DISH } from '../graphql/mutation';

// CSS styles
const useStyles = makeStyles(theme=>({
    mainContainer: {
        height: '100%'
    },
    cardContainer: {
        width: '95vw',
        margin: '1rem auto'
    },
    container : {
        flexDirection: 'column !important',
        marginTop: '4rem',
        paddingTop: '2rem'
    },
    menuItem: {
        background: 'transparent',
        '&:hover': {
            background: '#e5f2fd !important'
        },
        '&:active': {
            color: '#2c5cc5 !important',
            background: '#e5f2fd !important'
        }
    },
    bullet: {
        paddingRight: '1rem',
        fontSize: '24px'
    },
    circle: {
        height: '10px',
        width: '10px',
        display: 'inline-block',
        borderRadius: '50%'
    },
    button: {
        margin: theme.spacing(1),
    },
    formControl: {
        margin: theme.spacing(1),
        marginLeft: '-1px',
        minWidth: '100%',
    },
    selectEmpty: {
        marginTop: theme.spacing(2),
    },
    ticketsHeader: {
        color: 'black',
        marginLeft: '3rem',
        [theme.breakpoints.down("md")]: {
            marginLeft: '1rem',
        }
    }
}));

const ColorButton = withStyles((theme) => ({
    root: {
        color: 'white',
        backgroundColor: teal[500],
        '&:hover': {
            backgroundColor: teal[700],
        },
    },
}))(Button);

const ColorButton2 = withStyles((theme) => ({
    root: {
        color: 'white',
        backgroundColor: orange[500],
        '&:hover': {
            backgroundColor: orange[700],
        },
    },
}))(Button);

const RestaurantMenu = () => {
    const mainReducer = useSelector((state) => state.mainReducer);
    const { resProfile, token } = mainReducer;
    const resMenu = resProfile?.dishes;
    // console.log("=====resMenu", resMenu);
    const res_id  = resProfile?._id;
    console.log("resProfile", resProfile);
    const classes = useStyles();
    const [dish, setDish] = useState();
    const [open, setOpen] = React.useState(false);
    const [isEdit, setIsEdit] = React.useState(false);
    const [imageFile, setImageFile] = useState(null);
    useEffect(() => {
        getResDishes();
    }, [])
    const dispatch = useDispatch()
    const history = useHistory();
    // console.log("token==", token);
    const getResDishes = () => {
        // const url =  `/restaurants/${res_id}/dishes`;
        // console.log("======url", url);
        // const headers = { 
        //     'x-access-token': token,
        // };
        // try {
        //     const res = await axios.get(url, {headers });
        //     console.log("response",res);
            // await dispatch(getResMenu(res.data?.data))
            // setTimeout(() => history.push("/"), 2000);
            
        // }catch(err){
        //     console.log(err)
        // }

    }

    const deleteResDish = async (res_menu_id) => {
        const url =  `/restaurants/${res_id}/dish/${res_menu_id}`;
        console.log("======url", url);
        const headers = { 
            'x-access-token': token,
        };
        try {
            const res = await axios.delete(url, {headers });
            console.log("response",res);
            await dispatch(updateResProfile(res.data?.data))
            // setTimeout(() => history.push("/"), 2000);
            
        }catch(err){
            console.log(err)
        }

    }



    const handleClickOpen = (edit) => {
        setOpen(true);
        setIsEdit(edit);
    };

    const handleClose = () => {
        setOpen(false);
        handleClear();
    };

    const handleClear = () => {
        setDish({});
    };

    const handleEdit = (dish) => {
        setDish(dish);
        // setIsEdit(true);
        handleClickOpen(true);
    }

//     const POST_DISH = gql`
//     mutation postDish(
//         $dish_name: String!
//         $dish_image: String
//         $dish_price: Float!
//         $description: String
//         $main_ingredient: String
//         $dish_category: String!
//         $food_type: Int!
//         $res_id: ID!
//     ) {
//         postDish(dish: {
//             dish_name: $dish_name dish_image: $dish_image dish_price: $dish_price description: $description main_ingredient: $main_ingredient
//             dish_category: $dish_category food_type: $food_type res_id: $res_id
//     }) { 
//         address {street_address apt_number city state country zipcode}
//         _id name email password delivery_option phone_number description timing_open timing_close token
//         dishes {
//           _id, description, dish_name, dish_image, dish_price, description, main_ingredient, dish_category,food_type, res_id
//         }
//     }}
// `;
const [postDish] = useMutation(POST_DISH, {
    onCompleted(res) {
        console.log("da", res);
        dispatch(updateResProfile(res.postDish))
    },
    onError(e) {
        console.log("--dfd", e);
    }
});

const addDishToMenu = async (dish) => {
    const { dish_name, dish_price = 5, description = "Nice restaurant",dish_image, main_ingredient = "", dish_category = "desserts", food_type = 1 } = dish;
    try {
        console.log("dish:", JSON.stringify(dish));        
        postDish({
            variables: {
                dish_name: dish_name,
                dish_image: dish_image, // Pass imageFile here
                dish_price: dish_price,
                description: description,
                main_ingredient: main_ingredient,
                dish_category: dish_category,
                food_type,
                res_id,
            }
        });
    } catch (err) {
        console.log(err);
        alert(err);
    }
}

//     const UPDATE_DISH = gql`
//     mutation updateDish(
//         $_id: ID!
//         $dish_name: String!
//         $dish_image: String
//         $dish_price: Float!
//         $description: String
//         $main_ingredient: String
//         $dish_category: String!
//         $food_type: Int!
//         $res_id: ID!
//     ) {
//         updateDish(dish: {
//             _id: $_id dish_name: $dish_name dish_image: $dish_image dish_price: $dish_price description: $description main_ingredient: $main_ingredient
//             dish_category: $dish_category food_type: $food_type res_id: $res_id
//     }) { 
//         address {street_address apt_number city state country zipcode}
//         _id name email password delivery_option phone_number description timing_open timing_close token
//         dishes {
//           _id, description, dish_name, dish_image, dish_price, description, main_ingredient, dish_category,food_type, res_id
//         }
//     }}
// `;
const [updateDish] = useMutation(UPDATE_DISH, {
    onCompleted(res) {
        console.log("da", res);
        dispatch(updateResProfile(res.updateDish))
    },
    onError(e) {
        console.log("--dfd", e);
    }
});

const editDishToMenu = async (dish) => {
    const { _id, dish_name, dish_price = 5, description = "Nice restaurant",dish_image, main_ingredient = "", dish_category = "desserts", food_type = 1 } = dish;
    try {
        updateDish({
            variables: {
                _id: _id,
                dish_name: dish_name,
                dish_image: dish_image, // Pass imageFile here
                dish_price: dish_price,
                description: description,
                main_ingredient: main_ingredient,
                dish_category: dish_category,
                food_type,
                res_id,
            }
        });
    } catch (err) {
        console.log(err);
        alert(err);
    }
}

    const handleCreate = async (edit, dish) => {
        if (!edit) {
            addDishToMenu(dish);
        } else{
            editDishToMenu(dish);
        }
         handleClose();
     }

    return (
        <Box component='div' className={classes.mainContainer}>
            <Navigationbar />
            <Grid container className={classes.container} justify="center">
                <div style={{display: 'flex', justifyContent: 'space-between'}}>
                    <Typography gutterBottom variant='h5' className={classes.ticketsHeader}>
                        All Dishes
                    </Typography>
                    <ColorButton2
                        variant="contained"
                        color="primary"
                        style={{marginRight: '3rem'}}
                        onClick={() => handleClickOpen(false)}
                        className={classes.button}
                    >
                        Add Dishes
                    </ColorButton2>
                </div>
                {/* {console.log("============ResMenu", resMenu)} */}
                { resMenu && resMenu.length > 0  && resMenu.map((dish) => {
                    return (
                        <Grid item xs={12} sm={12} md={12} key={0}>
                    <Card className={classes.cardContainer}>
                        {/* <Hidden mdDown> */}
                            <CardActionArea disableRipple style={{display: 'flex', justifyContent: 'start'}}>
                                <CardContent style={{width: '150px', backgroundColor: 'white'}}>
                                    <img src={dish.dish_image} alt="Avatar" style={{ width: '100px', backgroundColor: 'pink', height: '100px', textAlign: 'left'}} />
                                 </CardContent>
                                <CardContent>
                                    <Typography gutterBottom variant='h6' id={dish.id}>
                                        {dish.dish_name}
                                    </Typography>
                                    <Typography variant='body2' style={{color: '#6f7c87', padding: '0 0 10px 0'}} component='p'>
                                        {dish.description}
                                    </Typography>
                                    <Typography variant='body2' component='p'>
                                        <div className={classes.circle} style={{backgroundColor: 'black'}}></div>
                                        <span style={{marginLeft: '1rem'}}>$ {dish.dish_price} </span>
                                    </Typography>
                                </CardContent>
                                <CardActions>
                                <div style={{marginRight: '2rem'}}>
                                <ColorButton onClick={function() {handleEdit(dish)}} variant="contained" startIcon={<EditIcon />} color="primary" className={classes.button}>
                                    Edit
                                </ColorButton>
                                    <Button
                                        variant="contained"
                                        color="secondary"
                                        className={classes.button}
                                        onClick={function() {deleteResDish(dish._id)}}
                                        startIcon={<DeleteIcon />}
                                    >
                                        Delete
                                    </Button>
                                </div>
                                </CardActions>
                            </CardActionArea>
                    </Card>
                </Grid>)})}
                <div>
                <AddEditDishDialog open={open}
                    isEdit={isEdit}
                    handleCreate={handleCreate}
                    handleClose={handleClose}
                    // dishImage={dishImage}
                    dish={isEdit ? dish : {}}
                    restaurantId={res_id}
                    // dishImage={""}
                    // dishName={""}
                    // dishDescription={""}
                    // dishType={"1"}
                    // dishName={dishName}
                    // dishType={dishType}
                    // dishDescription={dishDescription}
                />
            </div>
            </Grid>
        </Box>
    )
}

export default RestaurantMenu;
