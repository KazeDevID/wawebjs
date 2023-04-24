import { WawebjsError } from "./WawebjsError";

export class NotImplementedError extends WawebjsError {
  constructor (message?: string) {
    super('NotImplementedError', message)
  }
}
