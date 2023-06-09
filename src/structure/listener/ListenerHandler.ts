import { WawebjsHandler } from "../WawebjsHandler";
import { Listener } from "./Listener";

export class ListenerHandler extends WawebjsHandler {
  register (module: Listener, path?: string) {
    module.execute = module.execute.bind(module)
    this.client.on(module.event, module.execute)
    return super.register(module, path)
  }

  unregister (module: Listener) {
    this.client.removeListener(module.event, module.execute)
    return super.unregister(module)
  }
}
