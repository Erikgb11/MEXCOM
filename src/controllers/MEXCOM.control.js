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
        const resutl = await connection.query("SELECT nombrePuntoDeOferta, descripcion FROM puntosdeoferta")
        res.json(resutl);   
    } catch (error) {
        res.status(500);
        res.send(error.message)
    }    
};

//Metodo para insertar un producto
const addProduct = async (req, res) => {
  let connection;
  try {
    const {
      idPuntoDeOferta,
      nombreProducto,
      descripcion,
      precio
    } = req.body;

    connection = await getConnection();
    await connection.beginTransaction();

    const insertOfertanteQuery = `
    INSERT INTO productos (
        idPuntoDeOferta,
        nombreProducto,
        descripcion,
        precio
      )
      VALUES (?, ?, ?, ?)
    `;

    await connection.query(insertOfertanteQuery, [
      idPuntoDeOferta,
      nombreProducto,
      descripcion,
      precio
    ]);

    await connection.commit();

    res.json({ message: "Producto registrado exitosamente" });
  } catch (error) {
    if (connection) {
      await connection.rollback();
    }
    res.status(500).json({ error: error.message });
  } 
};
//mostrar ofertadores
const getOfertadores = async (req, res) => {
    try {
      const connection = await getConnection();
      const result = await connection.query("SELECT tipoOfertador,nombreOfertante,fechaNacimiento,usuario,correoElectronico,informacionContacto FROM ofertadores");
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
      const result = await connection.query("SELECT comentario,puntuacionPositiva,puntuacionNegativa FROM comentarios");
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
        "SELECT * FROM ofertadores WHERE correoElectronico = ? AND contrasena = ?",
        //con el campo contraseña tengo errores al hacer la consulta, por lo que para probar que funcionaba use usuario
        //"SELECT * FROM ofertadores WHERE correoElectronico = ? AND usuario = ?",
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
          contrasena,
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
    }
  };
  //Eliminar productos
  const delProductos = async (req, res) => {
    try {
      const { idProducto } = req.body;
      const connection = await getConnection();
      await connection.query("DELETE FROM productos WHERE idProducto = ?", [
        idProducto
      ]);
      res.json({ message: "Producto eliminado exitosamente" });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };

  //Eliminar puntos de oferta
  const delPDO = async (req, res) => {
    try {
      const { idPuntoDeOferta } = req.body;
      const connection = await getConnection();
      await connection.query("DELETE FROM puntosdeoferta WHERE idPuntoDeOferta = ?", [
        idPuntoDeOferta
      ]);
      res.json({ message: "Punto de oferta eliminado exitosamente" });
      console.log(idPuntoDeOferta)
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };

  //Eliminar ofertadores
  const delOfertadores = async (req, res) => {
    try {
      const { idOfertador } = await req.body;
      const connection = await getConnection();
      await connection.query("DELETE FROM ofertadores WHERE idOfertador = ?", [
        idOfertador
      ]);
      res.json({ message: "Ofertador eliminado exitosamente" });
      console.log(idOfertador)
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };

//insertar servicio
const insServicio = async (req, res) => {
  let connection;
  try {
    const {
      idPuntoDeOferta,
      nombreServicio,
      descripcion,
      precioAproximadoMin,
      precioAproximadoMax
    } = req.body;

    connection = await getConnection();
    await connection.beginTransaction();

    const insertOfertanteQuery = `
      INSERT INTO servicios (
        idPuntoDeOferta,
        nombreServicio,
        descripcion,
        precioAproximadoMin,
        precioAproximadoMax
      )
      VALUES (?, ?, ?, ?, ?)
    `;

    await connection.query(insertOfertanteQuery, [
      idPuntoDeOferta,
      nombreServicio,
      descripcion,
      precioAproximadoMin,
      precioAproximadoMax
    ]);

    await connection.commit();

    res.json({ message: "Servicio registrado exitosamente" });
  } catch (error) {
    if (connection) {
      await connection.rollback();
    }
    res.status(500).json({ error: error.message });
  }
};

//Modificacion de ofertador
const updateOfertador = async (req, res) => {
  let connection;
  try {
    const {
      idOfertador,
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

    const updateOfertadorQuery = `
      UPDATE ofertadores SET
        idFoto = ?,
        tipoOfertador = ?,
        nombreOfertante = ?,
        fechaNacimiento = ?,
        usuario = ?,
        contrasena = ?,
        correoElectronico = ?,
        informacionContacto = ?
      WHERE
        idOfertador = ?
    `;

    await connection.query(updateOfertadorQuery, [
      idFoto,
      tipoOfertador,
      nombreOfertante,
      fechaNacimiento,
      usuario,
      contraseña,
      correoElectronico,
      informacionContacto,
      idOfertador,
    ]);

    await connection.commit();

    res.json({ message: "Ofertador actualizado exitosamente" });
  } catch (error) {
    if (connection) {
      await connection.rollback();
    }
    res.status(500).json({ error: error.message });
  }
};

//Modificacion de productos
const updateProducts = async (req, res) => {
  let connection;
  try {
    const {
      idProducto,
      idPuntoDeOferta,
      nombreProducto,
      descripcion,
      precio
    } = req.body;

    connection = await getConnection();
    await connection.beginTransaction();

    const updateOfertadorQuery = `
      UPDATE productos SET
        idPuntoDeOferta = ?,
        nombreProducto = ?,
        descripcion = ?,
        precio = ?
      WHERE
        idProducto = ?
    `;

    await connection.query(updateOfertadorQuery, [
      idPuntoDeOferta,
      nombreProducto,
      descripcion,
      precio,
      idProducto
    ]);

    await connection.commit();

    res.json({ message: "Producto actualizado exitosamente" });
  } catch (error) {
    if (connection) {
      await connection.rollback();
    }
    res.status(500).json({ error: error.message });
  }
};
//Modificacion de servicios
const updateServs = async (req, res) => {
  let connection;
  try {
    const {
      idServicio,
      idPuntoDeOferta,
      nombreServicio,
      descripcion,
      precioAproximadoMax,
      precioAproximadoMin
    } = req.body;

    connection = await getConnection();
    await connection.beginTransaction();

    const updateOfertadorQuery = `
      UPDATE servicios SET
        idPuntoDeOferta = ?,
        nombreServicio = ?,
        descripcion = ?,
        precioAproximadoMax = ?,
        precioAproximadoMin = ?
      WHERE
        idServicio = ?
    `;

    await connection.query(updateOfertadorQuery, [
      idPuntoDeOferta,
      nombreServicio,
      descripcion,
      precioAproximadoMax,
      precioAproximadoMin,
      idServicio
    ]);

    await connection.commit();

    res.json({ message: "Servicio actualizado exitosamente" });
  } catch (error) {
    if (connection) {
      await connection.rollback();
    }
    res.status(500).json({ error: error.message });
  }
};

//Mostrar Productos con respecto al punto de oferta
const showProducts = async (req, res) => {
  try {
    const { idPuntoDeOferta } = req.body;
    const connection = await getConnection();
    const result = await connection.query(
      "SELECT nombreProducto,descripcion,precio FROM productos WHERE idPuntoDeOferta = ?",
      [idPuntoDeOferta]
    );
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

//Mostrar Servicioss con respecto al punto de oferta
const showServs = async (req, res) => {
  try {
    const { idPuntoDeOferta } = req.body;
    const connection = await getConnection();
    const result = await connection.query(
      "SELECT nombreServicio,descripcion,precioAproximadoMin,precioAproximadoMax FROM servicios WHERE idPuntoDeOferta = ?",
      [idPuntoDeOferta]
    );
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

//obtener GeoJSON
const getGeojson = async (req, res) => {
  try {
    const { idColonia } = req.body;
    const connection = await getConnection();
    const result = await connection.query(
      "SELECT geoJSON FROM regiones WHERE idColonia = ?",
      [idColonia]
    );
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

//obtener informacion grupo comercial
const infoGrupCom = async (req, res) => {
  try {
    const { idRegion } = req.body;
    const connection = await getConnection();
    const result = await connection.query(
      "SELECT COUNT(p.idRegion) AS Total, r.nombreRegion FROM puntosdeoferta p JOIN regiones r ON p.idRegion = r.idRegion WHERE p.idRegion = ? GROUP BY r.nombreRegion;",
      [idRegion]
    );
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

//insertar comentario
const newComent = async (req, res) => {
  let connection;
  try {
    const {
      idReview,
      idFoto,
      comentario,
      puntuacionPositiva,
      puntuacionNegativa
    } = req.body;

    connection = await getConnection();
    await connection.beginTransaction();

    // Verificar si el idReview existe en la tabla review
    const reviewExistsQuery = "SELECT idReview FROM review WHERE idReview = ?";
    const reviewExists = await connection.query(reviewExistsQuery, [idReview]);

    if (reviewExists.length === 0) {
      // El idReview no existe, retornar un error
      throw new Error("El idReview especificado no existe");
    }

    const insertComentarioQuery = `
      INSERT INTO comentarios (
        idReview,
        idFoto,
        comentario,
        puntuacionPositiva,
        puntuacionNegativa
      )
      VALUES (?, ?, ?, ?, ?)
    `;

    await connection.query(insertComentarioQuery, [
      idReview,
      idFoto,
      comentario,
      puntuacionPositiva,
      puntuacionNegativa
    ]);

    await connection.commit();

    res.json({ message: "Comentario registrado exitosamente" });
  } catch (error) {
    if (connection) {
      await connection.rollback();
    }
    res.status(500).json({ error: error.message });
  }
};

export const methods = {
    getPuntosOferta,
    addProduct,
    getOfertadores,
    getComentarios,
    verUsuario,
    crearOfertante,
    crearPuntoOferta,
    delProductos,
    delPDO,
    delOfertadores,
    insServicio,
    updateOfertador,
    updateProducts,
    updateServs,
    showProducts,
    showServs,
    getGeojson,
    infoGrupCom,
    newComent
};

/*Anotaciones:
-se cambio el parametro contraseña por contrasena en la base de datos tanto para ofertantes 
como para administradores
-se cambio el parametro descripción por descripcion para servicios y productos
-se cambiaron en servicios los parametros precioAproximado(Maximo) y precioAproximado(Minimo)
por precioAproximadoMax y precioAproximadoMin ya que al usar () daba errores
-se cambio la tabla regiónes por el tema del acento, ahora se llama regiones, tambien se
cambio una columna que contenia acento
*/
