import { getConnection } from "../database/database"





//Manejo de peticiones de acuerdo al orden de acceso se pueden presentar las siguientes peticiones para el backend

/*  
    Usuarios 
        -Verificación de usuario (POST)
        -Creación de usuario (POST)
        -Despliegue informacion de usuario (GET)
        -Modificacion de usuarios (PUT ó PATCH) 
        -Creacion punto de oferta (POST)
        -Despliegue informacion de punto de venta (GET)
        -Insertar productos o servicios en punto de oferta (POST)
        -Modificacion productos o servicios en punto de oferta (PUT ó PATCH)
        -Despliegue informacion de productos o servicios (GET)
        -Eliminacion de prodcutos (DELETE)
        -Eliminacion de punto de oferta (DELETE)
        -Eliminación de usuario (DELETE)

        

    Usuarios sin registrar
        -Obtener los geoJSON de los grupos comerciales de la localidad elegida(GET)
        -Obtener la información del grupo comercial seleccionado(nombre, numero ofertantes) (GET)
        -Obtener los ofertantes por grupo comercial (GET)
        -Obtener la información de un ofertante que se eligio (GET)
        -Obtener la informacion de la calificacion y comentarios de ese ofertante (GET)
        -Escribir un nuevo comentario (POST)
        -Puntuar un comentario(PUT)
*/



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