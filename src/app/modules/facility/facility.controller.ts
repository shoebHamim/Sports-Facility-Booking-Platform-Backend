import { ObjectId } from "mongoose";
import { catchAsync } from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { facilityServices } from "./facility.service";


const createFacility=catchAsync(async(req,res)=>{
  const data=await facilityServices.createFacilityIntoDB(req.body)
  sendResponse(res, {
    data: data,
    message: "Facility added successfully",
    statusCode: 200,
    success: true,
  });
})
const updateFacility=catchAsync(async(req,res)=>{
  const data=await facilityServices.updateFacilityIntoDB(req.params.id ,req.body)
  if(!data){
    sendResponse(res, {
      data: [],
      message: "No facility found to update",
      statusCode: 404,
      success: false,
    });

  }else{
    sendResponse(res, {
      data: data,
      message: "Facility updated successfully",
      statusCode: 200,
      success: true,
    });
  }
})
const deleteFacility=catchAsync(async(req,res)=>{
  const data=await facilityServices.updateFacilityIntoDB(req.params.id ,{isDeleted:true})
  if(!data){
    sendResponse(res, {
      data: [],
      message: "No facility found to delete",
      statusCode: 404,
      success: false,
    });
  }else{
    sendResponse(res, {
      data: data,
      message: "Facility deleted successfully",
      statusCode: 200,
      success: true,
    });
  }
})
const getAllFacility=catchAsync(async(req,res)=>{
  const data=await facilityServices.getAllFacilityFromDB()

  if(!data.length){
    return sendResponse(res, {
      data: [],
      message: "No facility found",
      statusCode: 404,
      success: false,
    });
  }else{
    sendResponse(res, {
      data: data,
      message: "Facilities retrieved successfully",
      statusCode: 200,
      success: true,
    });
  }
})


export const facilityControllers={
  createFacility,
  updateFacility,
  deleteFacility,
  getAllFacility
}