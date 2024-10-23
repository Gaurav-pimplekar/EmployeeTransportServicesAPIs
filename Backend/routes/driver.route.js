import express from "express";
import { Driver } from "../module/driver.module.js";
import upload from "../utils/multer.js";
import { Vehicle } from "../module/vehicle.module.js";

const router = express.Router();

router.post("/addDriver", upload.fields([{ name: "license_back_photo" }, { name: "license_front_photo" }, { name: "id_proof_front_photo" }, { name: "id_proof_back_photo" }, { name: "pcc_document" }]), async (req, res) => {
    try {

        const driverData = req.body;

        console.log(req.body.name);

        await Driver.create(driverData);

        res.json({
            message: "driver added successfully"
        })

    } catch (error) {
        console.log(error);
    }
})

router.get("/getDrivers", async (req, res) => {
    try {
        const drivers = await Driver.find({});

        res.json({
            drivers
        })
    } catch (error) {
        console.log(error);
    }
})

export default router;