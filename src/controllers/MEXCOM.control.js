import { getConnection } from "../database/database"

//Controlador de prueba peticion de puntos de oferta 
//Le asignamos el tipo async a la funcion para determinar que la conexion es independiente del programa
const getPuntosOferta= async(req, res) => {
    try {
        //Con await lo que haces es decir que espere hasta que se realizen estos procesos 
        const connection = await getConnection();
        const resutl = await connection.query("SELECT * FROM puntosdeoferta")
        res.json(resutl);   
    } catch (error) {
        res.status(500);
        res.send(error.message)
    }    
};

//Metodo para insertar un producto
const addProduct = async (req, res) => {
    try {        
        const { nombre, edad } = req.body;        
        
        console.log(nombre);
        console.log(edad);

        const connection = await getConnection();
        res.json("Parametro recibido");
        
        
    } catch (error) {
        res.status(500);
        res.send(error.message)
    }
};

export const methods = {
    getPuntosOferta,
    addProduct
};