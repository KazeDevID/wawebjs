import { NotImplementedError } from "../error/NotImplementedError";
import { ModuleOptions, WawebjsModule } from "../WawebjsModule";

interface ListenerOptions extends ModuleOptions {
  event: string
}

export class Listener extends WawebjsModule {
  event: string

  constructor (options: ListenerOptions) {
    super(options)
    this.event = options.event
  }

  execute (...args: any[]): any { throw new NotImplementedError() }
}
