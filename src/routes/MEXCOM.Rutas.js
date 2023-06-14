import {Router} from "express";
import { methods as apiMexcom} from "../controllers/MEXCOM.control";
const router = Router();

//Con router manejamos las rutas y las peticiones HTML
router.get("/", apiMexcom.getPuntosOferta);
router.post("/", apiMexcom.addProduct)
export default router;