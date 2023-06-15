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
//mostrar ofertadores
const getOfertadores = async (req, res) => {
    try {
      const connection = await getConnection();
      const result = await connection.query("SELECT * FROM ofertadores");
      res.json(result);
    } catch (error) {
      res.status(500);
      res.send(error.message);
    }
};
//mostrar comentarios
const getComentarios = async (req, res) => {
    try {
      const connection = await getConnection();
      const result = await connection.query("SELECT * FROM comentarios");
      res.json(result);
    } catch (error) {
      res.status(500);
      res.send(error.message);
    }
  };

  //verificacion de usuario (login)
  const verUsuario = async (req, res) => {
    try {
      const { email, contraseña } = req.body;
      const connection = await getConnection();
      const result = await connection.query(
        //"SELECT * FROM ofertadores WHERE correoElectronico = ? AND contraseña = ?",
        //con el campo contraseña tengo errores al hacer la consulta, por lo que para probar que funcionaba use usuario
        "SELECT * FROM ofertadores WHERE correoElectronico = ? AND usuario = ?",
        [email, contraseña]
      );
      if (result.length > 0) {
        res.json({ message: "Usuario válido" });
      } else {
        res.status(401).json({ error: "Credenciales inválidas" });
      }
    } catch (error) {
      res.status(500);
      res.send(error.message);
    }
  };

  //Creacion de usuario (ofertante)
  const crearOfertante = async (req, res) => {
    let connection;
    try {
      const {
        idFoto,
        tipoOfertador,
        nombreOfertante,
        fechaNacimiento,
        usuario,
        contraseña,
        correoElectronico,
        informacionContacto,
      } = req.body;
  
      connection = await getConnection();
      await connection.beginTransaction();
  
      const insertOfertanteQuery = `
        INSERT INTO ofertadores (
          idFoto,
          tipoOfertador,
          nombreOfertante,
          fechaNacimiento,
          usuario,
          contraseña,
          correoElectronico,
          informacionContacto
        )
        VALUES (?, ?, ?, ?, ?, ?, ?, ?)
      `;
  
      await connection.query(insertOfertanteQuery, [
        idFoto,
        tipoOfertador,
        nombreOfertante,
        fechaNacimiento,
        usuario,
        contraseña,
        correoElectronico,
        informacionContacto,
      ]);
  
      await connection.commit();
  
      res.json({ message: "Ofertante creado exitosamente" });
    } catch (error) {
      if (connection) {
        await connection.rollback();
      }
      res.status(500).json({ error: error.message });
    } finally {
      if (connection) {
        connection.release();
      }
    }
  };

  //Creacion de usuario (ofertante)
  const crearPuntoOferta = async (req, res) => {
    let connection;
    try {
      const {
        idRegion,
        idOfertador,
        idFoto,
        nombrePuntoDeOferta,
        descripcion
      } = req.body;
  
      connection = await getConnection();
      await connection.beginTransaction();
  
      const insertOfertanteQuery = `
        INSERT INTO puntosdeoferta (
            idRegion,
            idOfertador,
            idFoto,
            nombrePuntoDeOferta,
            descripcion
        )
        VALUES (?, ?, ?, ?, ?)
      `;
  
      await connection.query(insertOfertanteQuery, [
        idRegion,
        idOfertador,
        idFoto,
        nombrePuntoDeOferta,
        descripcion,
      ]);
  
      await connection.commit();
  
      res.json({ message: "Punto de Oferta registrado exitosamente" });
    } catch (error) {
      if (connection) {
        await connection.rollback();
      }
      res.status(500).json({ error: error.message });
    } finally {
      if (connection) {
        connection.release();
      }
    }
  };
  
export const methods = {
    getPuntosOferta,
    addProduct,
    getOfertadores,
    getComentarios,
    verUsuario,
    crearOfertante,
    crearPuntoOferta
};