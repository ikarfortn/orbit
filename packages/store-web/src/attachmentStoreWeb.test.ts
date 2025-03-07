import { AttachmentID, AttachmentMIMEType } from "@withorbit/core";
// @ts-ignore Looks like there is no @types for this library
import FDBFactory from "fake-indexeddb/lib/FDBFactory";
import { AttachmentStoreWeb } from "./attachmentStoreWeb";

let store: AttachmentStoreWeb;
beforeEach(async () => {
  store = new AttachmentStoreWeb("test", new FDBFactory());
});

test("non-existent ID URL resolves to null", async () => {
  expect(await store.getURLForStoredAttachment("x" as AttachmentID)).toBeNull();
});

test("after downloading URL resolves", async () => {
  const testContents = Uint8Array.from([1, 2, 3]);
  const testID = "x" as AttachmentID;
  await store.storeAttachment(testContents, testID, AttachmentMIMEType.PNG);

  const url = await store.getURLForStoredAttachment(testID);
  expect(url).toMatchInlineSnapshot(`"data:image/png;base64,AQID"`);

  const contents = await store.getAttachmentContents(testID);
  expect(contents).toEqual(testContents);
});
