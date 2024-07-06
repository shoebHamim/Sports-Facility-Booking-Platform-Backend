import { ObjectId } from "mongoose";
import { TFacility } from "./facility.interface";
import { Facility } from "./facility.model";


const createFacilityIntoDB=async(facilityData:TFacility)=>{
  const result=await Facility.create(facilityData)
  return result
}
const updateFacilityIntoDB=async(id:string,updatedFacilityData:Partial<TFacility>)=>{
  const result=await Facility.findByIdAndUpdate(id,updatedFacilityData,{new:true})
  return result
}
const getAllFacilityFromDB=async()=>{
  return await Facility.find({isDeleted:false})
}



export const facilityServices={
  createFacilityIntoDB,
  updateFacilityIntoDB,
  getAllFacilityFromDB
}