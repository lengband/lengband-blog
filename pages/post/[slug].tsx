import { marked } from 'marked';
import dayjs from 'dayjs'
import type { NextPage } from 'next'
import Image from 'next/image'
import { fetchEntry } from 'lib/contentful';
import hljs from 'highlight.js'
import 'highlight.js/styles/atom-one-dark.css'

const renderer = new marked.Renderer();
marked.setOptions({
  renderer,  // 这个是必须填写的
  gfm: true,  // 启动类似Github样式的Markdown,
  pedantic: false,  // 只解析符合Markdown定义的，不修正Markdown的错误
  sanitize: false,  // 原始输出，忽略HTML标签
  breaks: false,  // 支持Github换行符，必须打开gfm选项
  smartLists: true,  // 优化列表输出
  smartypants: false,
  // 高亮显示规则 ，这里使用highlight.js来完成
  highlight: function (code) {
    return hljs.highlightAuto(code).value;
  }
})


const Home: NextPage = ({ content, postEntry }: any) => {
  
  return (
    <article>
      <h1>
        <div>{postEntry.fields.title}</div>
        <div className="my-4 flex items-center text-sm text-gray-500">
          <svg className="mr-1.5 h-5 w-5 flex-shrink-0 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
            <path fill-rule="evenodd" d="M5.75 2a.75.75 0 01.75.75V4h7V2.75a.75.75 0 011.5 0V4h.25A2.75 2.75 0 0118 6.75v8.5A2.75 2.75 0 0115.25 18H4.75A2.75 2.75 0 012 15.25v-8.5A2.75 2.75 0 014.75 4H5V2.75A.75.75 0 015.75 2zm-1 5.5c-.69 0-1.25.56-1.25 1.25v6.5c0 .69.56 1.25 1.25 1.25h10.5c.69 0 1.25-.56 1.25-1.25v-6.5c0-.69-.56-1.25-1.25-1.25H4.75z" clip-rule="evenodd" />
          </svg>
          { dayjs(postEntry.sys.createdAt).format('DD/MM/YYYY') }
        </div>
      </h1>
      <div>

      
      </div>
      <div dangerouslySetInnerHTML={{
        __html: content
      }} />
    </article>
  )
}

export async function getServerSideProps(ctx: any) {
  const { params } = ctx;
  const { slug } = params;

  // 获取文章内容
  const postEntry = await fetchEntry(slug, 'post');
  const fieldContent: any = postEntry.fields?.content
  const content = marked(fieldContent)

  return {
    props: {
      content,
      postEntry
    },
  }
}

export default Home
