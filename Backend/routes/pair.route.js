import express from "express";
import { Driver } from "../module/driver.module.js";
import { Vehicle } from "../module/vehicle.module.js";
import Pair from "../module/pair.module.js";

const router = express.Router();

router.get("/searchFirstPair/:data", async (req, res) => {
    try {
        const regex = new RegExp(req.params.data, 'i');

        const driver = await Driver.find({ name: { $regex: regex } });
        const vehicle = await Vehicle.find({ vehicle_number: { $regex: regex } });

        if (vehicle.length === 0 && driver.length === 0) {
            return res.json({
                message: "Data not found"
            })
        }
        else if (vehicle.length == 0) {
            res.status(200).json({
                driver,
            })
        }
        else {
            res.status(200).json({
                vehicle,
            })
        }

    } catch (error) {
        console.log(error);
    }
});


router.delete("/unpair/:vehicle/:driver/:pair", async (req, res)=>{
    try {
        const {vehicle, driver, pair} = req.params;

        await Driver.findByIdAndUpdate(vehicle, {paired:false});
        await Vehicle.findByIdAndUpdate(driver, {paired:false});


        Pair.findByIdAndDelete(pair)

        res.json({
            message:"unpaired data successfully"
        })
        
    } catch (error) {
        console.log(error)
    }
})



router.get("/searchSecondPair/:firstPair/:data", async (req, res) => {
    try {
        const regex = new RegExp(req.params.data, 'i');

        if (req.params.firstPair == "vehicle") {
            const driver = await Driver.find({ name: { $regex: regex } });

            return res.json({
                driver
            })
        }
        else {
            const vehicle = await Vehicle.find({ vehicle_number: { $regex: regex } });

            return res.json({
                vehicle
            })
        }


    } catch (error) {
        console.log(error);
    }
});

router.post("/addPair/:vehicle/:driver", async (req,res)=>{
    try {
        const {vehicle, driver} = req.params;

        const pairData = await Pair.create({vehicle,driver})

        await Vehicle.findByIdAndUpdate(vehicle, {paired:true})
        await Driver.findByIdAndUpdate(driver, {paired:true})

        res.json({
            pairData
        })
        
    } catch (error) {
        console.log(error);
    }
})

router.get("/getPairs", async (req,res)=>{
    try {
        const pairs = await Pair.find({}).populate("vehicle").populate("driver");

        console.log(pairs);

        res.json({
            pairs
        })
        
    } catch (error) {
        console.log(error)
    }
})


export default router;