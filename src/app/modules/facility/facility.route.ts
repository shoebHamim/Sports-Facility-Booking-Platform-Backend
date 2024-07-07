import { auth } from './../../middlewares/auth';
import { Router } from "express";
import { facilityControllers } from "./facility.controller";
import { validateRequest } from "../../middlewares/validateRequest";
import { facilityValidationSchemas } from "./facility.validation";


const router=Router()

router.post('/',auth(['admin']),validateRequest(facilityValidationSchemas.createFacility),facilityControllers.createFacility)
router.put('/:id',auth(['admin']),validateRequest(facilityValidationSchemas.updateFacility),facilityControllers.updateFacility)
router.delete('/:id',auth(['admin']),facilityControllers.deleteFacility)
router.get('/',facilityControllers.getAllFacility)


export const facilityRoute=router;