import { marked } from 'marked';
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


const Home: NextPage = ({ content }: any) => {
  return (
    <article>
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
      content
    },
  }
}

export default Home
