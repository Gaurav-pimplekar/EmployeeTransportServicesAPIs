import express from "express";
import { Employee } from "../module/employee.module.js";

const router = express.Router();

router.post("/addEmployee", async (req, res)=>{
  try {
    const {name, phone_number, gender, email, shift_time, pickup_location, drop_location} = req.body;

    await Employee.create({name, phone_number, gender, email, shift_time, pickup_location, drop_location})

    res.status(200).json({
      message:"employee created successfully"
    })
    
  } catch (error) {
    console.log(error);
  }
})

router.get("/getEmployees", async (req, res)=>{
  try {
    const employees = await Employee.find({});

    console.log(employees);
    res.json({
      employees
    })
    
  } catch (error) {
    console.log(error)
  }
})

router.patch("/addEmployeeToBlockList",async (req, res)=>{
  try {
    const {id} = req.body;

    const employee =await  Employee.findByIdAndUpdate(id, {black_list:true});

    res.status(200).json({
      message:"employee blocked successfully",
      employee
    })

  } catch (error) {
    console.log(error);
  }
})

router.patch("/updateEmployee",async (req, res)=>{
  try {
    const {email, name, phone_number, gender, shift_time, id} = req.body;

    const employee =await  Employee.findByIdAndUpdate(id, {email, name, phone_number, gender, shift_time, id});

    res.status(200).json({
      message:"employee updated successfully",
      employee
    })

  } catch (error) {
    console.log(error);
  }
})


export default router;