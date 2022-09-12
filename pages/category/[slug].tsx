import { useEffect, useState } from 'react'
import { Tab } from '@headlessui/react'
import { classNames } from 'lib/utils'
import { fetchEntry, ICategory, IPost, fetchLinksToEntry } from 'lib/contentful';
import PostCard from 'components/PostCard';
import { Entry } from 'contentful';

interface CategoryProps {
  childCategories: Entry<ICategory>[]
}

export default function Category({ childCategories }: CategoryProps) {
  
  const [currentPosts, setCurrentPosts] = useState<Entry<IPost>[]>([]);
  const [currentChildCategory, setCurrentChildCategory] = useState<Entry<ICategory>>();

  async function fetchPosts(categoryId: string) {
    const { items } = await fetchLinksToEntry(categoryId, 'post');
    setCurrentPosts(items)
  }

  useEffect(() => {
    console.log('执行 useEffect');
    
    fetchPosts(childCategories[0].sys.id);
  }, [childCategories])

  async function tabChange(index: number) {
    console.log(index, '111111111', childCategories);
    await fetchPosts(childCategories[index].sys.id)
    console.log(currentPosts, 'currentPosts');
  }

  return (
    <div className="w-full px-2 sm:px-0">
      <Tab.Group onChange={tabChange}>
        <Tab.List className="w-auto max-w-md flex space-x-1 rounded-xl bg-indigo-200 p-1">
          {childCategories.map((category: Entry<ICategory>) => (
            <Tab
              key={category.sys.id}
              className={({ selected }) =>
                classNames(
                  'w-full rounded-lg py-2.5 text-sm font-medium leading-5 text-indigo-700',
                  'ring-white ring-opacity-60 ring-offset-2 ring-offset-indigo-400 focus:outline-none focus:ring-2',
                  selected ? 'bg-white shadow' : 'text-indigo-50 hover:bg-white/[0.12] hover:text-white'
                )
              }
            >
              {category.fields.name}
            </Tab>
          ))}
        </Tab.List>
        <div className="mt-6">
        {
          currentPosts.map((post: Entry<IPost>) => {
            return (
              <PostCard key={post.sys.id} post={post} />
            )
          })
        }
        </div>
      </Tab.Group>
    </div>
  )
}

export async function getServerSideProps(ctx: any) {
  const { params } = ctx;
  const { slug } = params;

  // 获取文章内容
  const categoryEntry = await fetchEntry(slug, 'category');
  const childCategories: any = categoryEntry.fields?.childCategories || []

  return {
    props: {
      childCategories
    },
  }
}