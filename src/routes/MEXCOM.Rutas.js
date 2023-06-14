import {Router} from "express";
import { methods as apiMexcom} from "../controllers/MEXCOM.control";
const router = Router();

//Manejamos las rutas es decir para la ruta por defualt se manda la respues del send es decir esa cadena string
router.get("/", apiMexcom.getPuntosOferta);
router.post("/", apiMexcom.addProduct)
export default router;