import { WawebjsClient } from "./WawebjsClient";
import { WawebjsHandler } from "./WawebjsHandler";

export interface ModuleOptions {
  id: string
  category?: string
}

export class WawebjsModule {
  client: WawebjsClient
  handler: WawebjsHandler
  path: string

  id: string
  category: string

  constructor (options: ModuleOptions) {
    this.id = options.id
    this.category = options.category || 'default'
  }

  unload () {
    return this.handler.unload(this.id)
  }

  reload () {
    return this.handler.reload(this.id)
  }
}
