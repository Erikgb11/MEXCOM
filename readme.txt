--Requisitos tener instalado Node.js y MySQL

--1.-Ejecutar el archivo en la careta src/satabase/mexcom.sql
--2.-Cambiar el archivo .env para cambiar la contraseña de su usuario root en MySQL
--3.-Ejecutar en la ruta de la carpeta principal npm run dev
--4.-Si se presenta un error con la base de datos del problema de authentificación ejecutar la linea comentada del archivo.sql



Explicaciones 

--La carpeta routes que contiene el archivo MEXCOM.Rutas.js define las url para acceder a las peticiones del tipo put, get, delete, etc.

--La carpeta controllers contiene las peticiones se crea una constante que contiene una función de tipo async con los parametros res de response y req de request, se declaran los parametros a recibir, los querys a la base de datos y lo que se necesite para hacer la petición
