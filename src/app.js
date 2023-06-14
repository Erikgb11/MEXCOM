import express  from "express";
import  morgan  from "morgan";
import MEXCOMrutas from "./routes/MEXCOM.Rutas";
//Expres nos ayuda a manejar rutas como get, put, delete
const app = express();

//Settings 
app.set("port", 9000);

//Middleware
//Es una petición intermedia entre la peticion y la respuesta en este caso usamos el dev mode para la compilación cada que se haga una modificación 
app.use(morgan("dev"));
//Middleware para que pueda recibir json
app.use(express.json());


//Implementamos las rutas de peticion REST por defualt 
app.use("/api", MEXCOMrutas);

export default app;
