import {Router} from "express";
import { methods as apiMexcom} from "../controllers/MEXCOM.control";
const router = Router();

//Con router manejamos las rutas y las peticiones HTML
router.get("/puntosdeoferta", apiMexcom.getPuntosOferta);
router.post("/addproducto", apiMexcom.addProduct);//Nueva ruta para añadir productos
router.get("/ofertadores", apiMexcom.getOfertadores); // Nueva ruta para getOfertadores
router.get("/comentarios", apiMexcom.getComentarios); // Nueva ruta para getOfertadores
router.post("/ver-usuario", apiMexcom.verUsuario); // Nueva ruta para verUsuario
router.post("/crear-ofertante", apiMexcom.crearOfertante); // Nueva ruta para crearOfertante
router.post("/crear-pdo", apiMexcom.crearPuntoOferta); // Nueva ruta para crearPuntoDeOferta
router.delete("/del-pts", apiMexcom.delProductos); // Ruta para eliminar productos
router.delete("/del-pdo", apiMexcom.delPDO); // Ruta para eliminar puntos de ofertas
router.delete("/del-ofers", apiMexcom.delOfertadores); // Ruta para eliminar ofertantes
router.post("/ins-serv", apiMexcom.insServicio); // Nueva ruta para crear servicios
router.put("/upd-ofer", apiMexcom.updateOfertador);//Actualizar ofertador
router.put("/upd-prod", apiMexcom.updateProducts);//Actualizar producto
router.put("/upd-serv", apiMexcom.updateServs);//Actualizar servicio
router.post("/showProducts", apiMexcom.showProducts);//Mostrar productos respecto a los puntos de oferta
router.post("/showServs", apiMexcom.showServs);//Mostrar servicios respecto a los puntos de oferta
router.post("/geojson", apiMexcom.getGeojson);//Mostrar geojson con respecto a su colonia
router.post("/grupCom", apiMexcom.infoGrupCom);//Mostrar geojson con respecto a su colonia
router.post("/newcoment", apiMexcom.newComent); // Nueva ruta para nuevo comentario
export default router;