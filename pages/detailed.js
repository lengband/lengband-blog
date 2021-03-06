import React, { useEffect } from 'react'
import Head from 'next/head'
import moment from 'moment'
import {
  Row, Col, Affix, Icon, Breadcrumb,
} from 'antd'
import _ from 'lodash'
import marked from 'marked'
import hljs from 'highlight.js'
import 'highlight.js/styles/monokai-sublime.css'
import { api } from '../config/api'
import { useRequest } from '../utils/request'

import Tocify from '../components/tocify.tsx'
import Header from '../components/Header'
import Author from '../components/Author'
import Advert from '../components/Advert'
import Footer from '../components/Footer'
import '../static/style/pages/detailed.css'

export default function Detailed(props) {
  const tocify = new Tocify()
  const renderer = new marked.Renderer()
  renderer.heading = (text, level) => {
    const anchor = tocify.add(text, level);
    return `<a id="${anchor}" href="#${anchor}" class="anchor-fix"><h${level}>${text}</h${level}></a>\n`;
  }
  marked.setOptions({
    renderer,
    gfm: true, // 启动类似Github样式的Markdown
    pedantic: false, // 只解析符合Markdown定义的，不修正Markdown的错误
    sanitize: false, // 原始输出，忽略HTML标签
    tables: true, // 支持Github形式的表格，必须打开gfm选项
    break: false, // 支持Github换行符，必须打开gfm选项
    smartLists: true, // 优化列表输出，这个填写ture之后，你的样式会好看很多
    highlight(code) {
      return hljs.highlightAuto(code).value
    },
  })

  const { response: postDetail, request: fetchPostDetail } = useRequest({
    url: api.getPostById(_.get(props, 'url.query.id')).url,
  });

  useEffect(() => {
    fetchPostDetail()
  }, [])

  const postDetailData = postDetail ? postDetail.data : {}

  const html = marked(postDetailData.content || '')

  console.log(postDetail, 'postDetail');

  return (
    <>
      <Head>
        <title>博客详细页</title>
      </Head>
      <Header />
      <Row className="comm-main" type="flex" justify="center">
        <Col className="comm-left" xs={24} sm={24} md={16} lg={18} xl={14}>
          <div>
            <div className="bread-div">
              <Breadcrumb>
                <Breadcrumb.Item><a href="/">首页</a></Breadcrumb.Item>
                <Breadcrumb.Item>视频列表</Breadcrumb.Item>
                <Breadcrumb.Item>xxxx</Breadcrumb.Item>
              </Breadcrumb>
            </div>
            <div>
              <div className="detailed-title">
                { postDetailData.name }
              </div>
              <div className="list-icon center">
                <span>
                  <Icon type="calendar" />
                  {` ${moment(postDetailData.createAt).format()}`}
                </span>
                <span>
                  <Icon type="folder" />
                  {` ${postDetailData.type}`}
                </span>
                <span>
                  <Icon type="fire" />
                  {` ${postDetailData.view_count}人`}
                </span>
              </div>
              <div className="detailed-content" dangerouslySetInnerHTML={{ __html: html }} />
            </div>
          </div>
        </Col>
        <Col className="comm-right" xs={0} sm={0} md={7} lg={5} xl={4}>
          <Author />
          <Advert />
          <Affix offsetTop={5}>
            <div className="detailed-nav comm-box">
              <div className="nav-title">文章目录</div>
              <div className="toc-list">
                {tocify && tocify.render()}
              </div>
            </div>
          </Affix>
        </Col>
      </Row>
      <Footer />
    </>
  )
}
