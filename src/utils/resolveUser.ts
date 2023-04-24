import { Contact } from 'whatsapp-web.js'
import { WawebjsClient } from '../structure/WawebjsClient'

export type ContactResolvable = Contact | string

export async function resolveContact (client: WawebjsClient, contact: ContactResolvable): Promise<Contact | void> {
  if (typeof contact === 'string') {
    try {
      contact = await client.getContactById(contact.includes('@') ? contact : contact + '@c.us')
    } catch { return }
  }

  return contact
}
