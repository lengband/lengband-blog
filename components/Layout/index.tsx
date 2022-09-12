import { ReactNode } from 'react'
import { Entry } from "contentful";
import { ICategory } from 'lib/contentful';
import Header from './Header'

interface LayoutProps {
  categories: Entry<ICategory>[]
  children: ReactNode
}

export default function Layout({ children, categories }: LayoutProps) {
  return (
    <>
      <div className="min-h-full">
        <Header categories={categories} />
        <main className="container mx-auto max-w-7xl py-6 sm:px-6 lg:px-8">
          { children }
        </main>
      </div>
    </>
  )
}
