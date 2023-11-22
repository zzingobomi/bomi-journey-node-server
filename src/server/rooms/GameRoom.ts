import { Client, Room } from "@colyseus/core";
import { GameRoomState } from "./schema/GameRoomState";

export class GameRoom extends Room<GameRoomState> {
  autoDispose: boolean = false;

  onCreate(options: any) {
    console.log("GameRoom created!", options);

    const roomState = new GameRoomState();
    this.setState(roomState);
  }

  onJoin(client: Client, options: any) {
    console.log("onJoin: ", client.sessionId);
  }

  onLeave(client: Client, consented: boolean) {}

  onDispose() {
    console.log("room", this.roomId, "disposing...");
  }
}
