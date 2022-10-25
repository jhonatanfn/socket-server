import Server from "./clases/server";
import router from "./routes/router";
import bodyParser from "body-parser";
import cors from 'cors';

// Instancia del servidor
const server = new Server();
//Bodyparser
server.app.use(bodyParser.urlencoded({ extended: true }));
server.app.use(bodyParser.json());
//Cors
server.app.use(cors({ origin: true, credentials: true }));
// Rutas
server.app.use('/', router);
//Iniciar servidor
server.start(() => {
    console.log(`Servidor corriendo en el puerto: ${server.port}`);
})