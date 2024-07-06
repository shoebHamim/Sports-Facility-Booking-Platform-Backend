import { Router } from "express";
import { facilityControllers } from "./facility.controller";
import { validateRequest } from "../../middlewares/validateRequest";
import { facilityValidationSchemas } from "./facility.validation";


const router=Router()

router.post('/',validateRequest(facilityValidationSchemas.createFacility),facilityControllers.createFacility)
router.put('/:id',validateRequest(facilityValidationSchemas.updateFacility),facilityControllers.updateFacility)
router.delete('/:id',facilityControllers.deleteFacility)
router.get('/',facilityControllers.getAllFacility)


export const facilityRoute=router;