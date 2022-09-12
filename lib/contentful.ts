import { createClient, EntryCollection, Asset, Entry, CreateClientParams } from "contentful";

export interface ITag {
  name: string;
  slug: string;
};

export interface ICategory {
  name: string;
  slug: string;
  childCategories: ICategory[];
};

export interface IPost {
  title: string;
  description: string;
  slug: string;
  categories: ICategory[]
  tags: ITag[];
  thumbnail?: Asset;
  content?: string;
}

const clientOpts: CreateClientParams = {
  space: 'pi9scs8p64vg',
  accessToken: 'zidaOu0ZpnAY2UD6c0XlEPf96ZEMdcxY-G0VSrm-tCw',
}
if (process.env.NODE_ENV !== "production") {
  clientOpts.proxy = {
    host: "127.0.0.1",
    port: 7890,
  }
}

export const client = createClient(clientOpts);


export async function fetchEntries(content_type: 'tag', limit: number): Promise<EntryCollection<ITag>>
export async function fetchEntries(content_type: 'category', limit: number): Promise<EntryCollection<ICategory>>
export async function fetchEntries(content_type: 'post', limit: number): Promise<EntryCollection<IPost>>
export async function fetchEntries(content_type: string, limit: number) {
  return await client.getEntries({
    content_type,
    limit,
  });
}

export async function fetchEntry(id: string, contentType: 'category'): Promise<Entry<ICategory>>
export async function fetchEntry(id: string, contentType: 'post'): Promise<Entry<IPost>>
export async function fetchEntry(id: string, contentType: string) {
  const entries = await client.getEntries({
    content_type: contentType,
    "fields.slug[match]": id,
    limit: 1,
  });
  return entries.items[0]
}

export async function fetchLinksToEntry(entryId: string, contentType: 'category'): Promise<EntryCollection<ICategory>>
export async function fetchLinksToEntry(entryId: string, contentType: 'post'): Promise<EntryCollection<IPost>>
export async function fetchLinksToEntry(entryId: string, contentType: string) {
  return await client.getEntries({
    content_type: contentType,
    links_to_entry: entryId, // tag demo2tag
    include: 10,
    order: '-sys.createdAt',
  });
}