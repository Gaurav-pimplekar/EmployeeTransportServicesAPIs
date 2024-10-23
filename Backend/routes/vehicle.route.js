import express from "express";
import upload from "../utils/multer.js";
import { Vehicle } from "../module/vehicle.module.js";
import { Driver } from "../module/driver.module.js";
const router = express.Router();


router.post("/addVehicle",upload.fields([
  { name: 'insurance_copy' },
  { name: 'register_certificate_front' },
  { name: 'register_certificate_back' },
  { name: 'car_number_photo' },
]), async (req, res)=>{


  try {
    const vehicleData = {
    vehicle_number: req.body.vehicle_number,
    vehicle_category: req.body.vehicle_category,
    brand: req.body.brand,
    model_type: req.body.model_type,
    fuel_type: req.body.fuel_type,
    vehicle_ownership: req.body.vehicle_ownership,
    insurance_valid: req.body.insurance_valid,
    registration_date: req.body.registration_date,
  };
  const vehicle = await Vehicle.create(vehicleData);

  res.json({
    vehicle
  })
    
  } catch (error) {
    console.log(error);
  }
})



router.get("/getVehicles", async (req, res)=>{
  try {
    const vehicles = await Vehicle.find()

    res.json({
      vehicles
    })

  } catch (error) {
    console.log(error);
  }
})


export default router