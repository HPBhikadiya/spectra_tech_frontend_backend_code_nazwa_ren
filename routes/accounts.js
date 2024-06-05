


import e from "express";
import Customers from "../Models/customers.js";
const router = e.Router();

router.get('/accounts',
    async (req, res) => {
    try {
        console.log("test :");
        const c = await Customers.find();
        console.log("test :",c);
        return res.status(200).json(c);
    } catch(error) {
        console.log(error);
        return res.status(500).json(error);
    }
});


export default router;