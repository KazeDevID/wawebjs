import { Message } from "whatsapp-web.js";
import { Command } from "../command/Command";
import { NotImplementedError } from "../error/NotImplementedError";
import { WawebjsModule } from "../WawebjsModule";

export class Inhibitor extends WawebjsModule {
  execute (message: Message, command: Command): boolean | Promise<boolean> { throw new NotImplementedError() }
}
