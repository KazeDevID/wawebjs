export class WawebjsError extends Error {
  constructor (public name: string, message?: string) {
    super(message)
  }
}
