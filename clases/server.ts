import express from 'express';
import { SERVER_PORT } from '../global/environment';
import socketIO from 'socket.io';
import http from 'http';
import * as socket from '../sockets/socket';

export default class Server {

    private static __instance:Server;
    public app: express.Application;
    public port: number;
    public io: socketIO.Server;
    private httpServer:http.Server;

    private constructor() {
        this.app = express();
        this.port = SERVER_PORT;
        this.httpServer = new http.Server(this.app);
        this.io =  new socketIO.Server(this.httpServer,{
            cors: {
                credentials: true,
            }
        });

        this.escucharSockets();
    }

    public static get instance(){
        return this.__instance || (this.__instance = new this());
    }

    private escucharSockets(){
        console.log("Escuchando conexiones de sockets");
        this.io.on('connection', cliente=>{
            console.log("Cliente conectado");
            
            // Mensajes
            socket.mensaje(cliente, this.io);

            // Desconectar
            socket.desconectar(cliente);
        });
    }

    start(callback: Function) {
        this.httpServer.listen(this.port, callback());
    }
}