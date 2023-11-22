import { createServer } from "http";
import express from "express";
import cors from "cors";
import { Server, matchMaker } from "colyseus";
import { monitor } from "@colyseus/monitor";
import { WebSocketTransport } from "@colyseus/ws-transport";
import { GameRoom } from "./rooms/GameRoom";

class NodeServer {
  constructor() {
    this.init();
  }

  async init() {
    const port = 3000;
    const app = express();
    app.use(cors());

    // create colyseus server
    const gameServer = new Server({
      transport: new WebSocketTransport({
        server: createServer(app),
      }),
    });

    gameServer.define("gameRoom", GameRoom);

    // on localhost, simulate bad latency
    // if (process.env.NODE_ENV !== "production") {
    //   Logger.info("[gameserver] Simulating 500ms of latency.");
    //   gameServer.simulateLatency(234);
    // }

    gameServer.listen(port).then(() => {
      matchMaker.createRoom("gameRoom", {});
    });

    // start monitor
    app.use("/colyseus", monitor());

    app.use(express.static("public"));

    // start webserver
    app.get("/hello", (req, res) => {
      res.send("Hello!!");
    });
  }
}

new NodeServer();
