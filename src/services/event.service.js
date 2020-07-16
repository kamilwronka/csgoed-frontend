import { EventEmitter } from "fbemitter";

export const EMITTER_EVENTS = {
  SYNC_AUTH_DATA: "SYNC_AUTH_DATA",
};

export const emitter = new EventEmitter();
