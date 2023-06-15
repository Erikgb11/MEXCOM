import {Router} from "express";
import { methods as apiMexcom} from "../controllers/MEXCOM.control";
const router = Router();

//Con router manejamos las rutas y las peticiones HTML
router.get("/", apiMexcom.getPuntosOferta);
router.post("/", apiMexcom.addProduct);
router.get("/ofertadores", apiMexcom.getOfertadores); // Nueva ruta para getOfertadores
router.get("/comentarios", apiMexcom.getComentarios); // Nueva ruta para getOfertadores
router.post("/ver-usuario", apiMexcom.verUsuario); // Nueva ruta para verUsuario
router.post("/crear-ofertante", apiMexcom.crearOfertante); // Nueva ruta para crearOfertante
router.post("/crear-pdo", apiMexcom.crearPuntoOferta); // Nueva ruta para crearPuntoDeOferta
router.delete("/del-pts", apiMexcom.delProductos); // Ruta para eliminar productos
router.delete("/del-pdo", apiMexcom.delPDO); // Ruta para eliminar puntos de ofertas
router.delete("/del-ofers", apiMexcom.delOfertadores); // Ruta para eliminar puntos de ofertas
export default router;