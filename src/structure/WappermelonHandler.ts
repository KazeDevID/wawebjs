import { readDirRecursively } from "../utils"
import { WawebjsClient } from "./WawebjsClient"
import { WawebjsModule } from "./WawebjsModule"

export interface WawebjsHandlerOptions {
  defaultDir?: string
}

export class WawebjsHandler {
  modules: Map<string, WawebjsModule>
  defaultDir?: string

  constructor (public client: WawebjsClient, options: WawebjsHandlerOptions = {}) {
    this.modules = new Map()
    this.defaultDir = options.defaultDir
  }

  get (id: string): WawebjsModule {
    return this.modules.get(id)
  }

  getAll (): WawebjsModule[] {
    return Array.from(this.modules.values())
  }

  filter (filter: (module: WawebjsModule) => boolean = () => true): WawebjsModule[] {
    return this.getAll().filter(filter)
  }

  find (filter: (module: WawebjsModule) => boolean = () => true): WawebjsModule {
    return this.getAll().find(filter)
  }

  register (module: WawebjsModule, path?: string): WawebjsModule {
    module.path = path
    module.handler = this
    module.client = this.client

    this.modules.set(module.id, module)
    return module
  }

  unregister (module: WawebjsModule): boolean {
    delete require.cache[module.path]
    return this.modules.delete(module.id)
  }

  // TO BE CLEANED
  load (module: WawebjsModule | string): WawebjsModule {
    let moduleClass

    try {
      moduleClass = (typeof module === 'string') ? require(module) : module
      if ('default' in moduleClass) { moduleClass = moduleClass.default }
    } catch { return }

    if (!(moduleClass.prototype instanceof WawebjsModule)) {
      if (typeof module === 'string') {
        delete require.cache[require.resolve(module)]
      }

      return 
    }

    const moduleObject = new moduleClass()
    const modulePath = (typeof module === 'string') ? module : undefined

    if (this.modules.has(moduleObject.id)) {
      throw new Error(`Module ${moduleObject.id} already loaded`)
    }

    return this.register(moduleObject, modulePath)
  }

  loadAll (directory: string = this.defaultDir): void {
    for (const module of readDirRecursively(directory)) {
      this.load(module)
    }
  }

  unload (module: WawebjsModule | string) {
    if (typeof module === 'string') {
      module = this.modules.get(module)
    }

    if (module) { return this.unregister(module) }
  }

  unloadAll (): void {
    for (const module of this.modules.values()) {
      this.unload(module)
    }
  }

  reload (module) {
    if (this.unload(module)) { this.load(module) }
  }

  reloadAll (): void {
    for (const module of this.modules.values()) {
      this.reload(module)
    }
  }
}
