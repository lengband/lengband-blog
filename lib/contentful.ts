import { createClient, EntryCollection } from "contentful";

export type Tag = {
  fields: { name: string; slug: string };
  sys: { id: string };
};

export type Category = {
  fields: { title: string; slug: string };
  sys: { id: string };
};

type Image = { fields: { file: { fileName: string; url: string; } } };

interface Post {
  slug: string;
  title: string;
  categories: Category[]
  tags: Tag[];
  thumbnail?: Image;
  content?: string;
}


export const client = createClient({
  space: 'pi9scs8p64vg',
  accessToken: 'zidaOu0ZpnAY2UD6c0XlEPf96ZEMdcxY-G0VSrm-tCw',
  // proxy: {
  //   host: "127.0.0.1",
  //   port: 7890,
  // },
});

export type Posts = {
  items: { fields: Post }[];
  total: number;
};

export type Categories = {
  items: {
    sys: any; fields: any }[];
  total: number;
};

export async function fetchEntries(
  content_type: string,
  limit: number
): Promise<Posts> {
  const entries: Posts = await client.getEntries({
    content_type,
    limit,
  });

  return entries;
  // if (entries.items) return entries.items;
}

export async function fetchEntry(id: string) {
  const entry: Posts = await client.getEntries({
    content_type: "post",
    "fields.slug[match]": id,
    limit: 1,
  });
  return entry;
}