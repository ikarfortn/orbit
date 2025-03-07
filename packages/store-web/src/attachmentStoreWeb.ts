import { AttachmentID, AttachmentMIMEType } from "@withorbit/core";
import { AttachmentStore, encodeDataURL } from "@withorbit/store-shared";
import Dexie from "dexie";

/*
This is a simplistic implementation of AttachmentStore for web clients. It stores attachment data in IndexedDB. The downside of this approach is that attachments are displayed using base64 URLs, which are of course quite inefficient. It would be better to use a service worker and CacheStorage, but that would be dramatically more complex. This will do for now.
 */
export class AttachmentStoreWeb implements AttachmentStore {
  private readonly _db: Dexie;
  private readonly _table: Dexie.Table<AttachmentStoreTableRow, AttachmentID>;

  constructor(name: string, indexedDB: IDBFactory = window.indexedDB) {
    this._db = new Dexie(name, { indexedDB });
    this._db.version(1).stores({
      attachments: "&id",
    });
    this._table = this._db.table("attachments");
  }

  async storeAttachment(
    contents: Uint8Array,
    id: AttachmentID,
    type: AttachmentMIMEType,
  ): Promise<void> {
    await this._table.put({
      id,
      data: contents,
      type,
    });
  }

  async getURLForStoredAttachment(id: AttachmentID): Promise<string | null> {
    const row = await this._table.get(id);
    if (row) {
      return encodeDataURL(row.data, row.type);
    } else {
      return null;
    }
  }

  async getAttachmentContents(id: AttachmentID): Promise<Uint8Array> {
    const row = await this._table.get(id);
    if (row) {
      return row.data;
    } else {
      throw new Error(`Missing attachment ${id}`);
    }
  }
}

interface AttachmentStoreTableRow {
  id: AttachmentID;
  data: Uint8Array;
  type: AttachmentMIMEType;
}
