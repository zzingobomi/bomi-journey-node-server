import { Schema, type } from "@colyseus/schema";

export class Player extends Schema {
  @type("number") public id: number = 0;
  @type("number") public x: number = 0;
  @type("number") public y: number = 0;
  @type("number") public z: number = 0;
}
