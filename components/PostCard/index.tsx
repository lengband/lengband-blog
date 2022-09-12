import { ReactNode } from 'react'
import { Entry } from "contentful";
import Link from 'next/link'
import Image from 'next/image'
import { IPost } from 'lib/contentful';
import { defaultThumbnail } from 'lib/const'

interface LayoutProps {
  post: Entry<IPost>
}

export default function PostCard({ post }: LayoutProps) {
const imgSrc = `https:${post.fields.thumbnail?.fields.file.url}` || defaultThumbnail;

  return (
    <Link href={`/post/${post.fields.slug}`} key={post.sys.id}>
      <div key={post.sys.id} className="flex border mb-6 border-gray-400 rounded p-5 hover:border-indigo-400 cursor-pointer hover:text-indigo-400 transition duration-100 ease-in-out">
        <Image src={imgSrc} alt={post.fields.thumbnail?.fields.title} width={125} height={70} />
        <div className="ml-4">
          <h2>{ post.fields.title }</h2>
          <p className='mt-1 text-gray-500 text-sm'>{ post.fields.description }</p>
        </div>
      </div>
    </Link>
  )
}
