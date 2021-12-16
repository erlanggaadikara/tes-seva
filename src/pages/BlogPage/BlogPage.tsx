import React, { useRef, useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import styled from 'styled-components'
import { transparent } from 'styles/colors'
import { MaxWidthStyle } from 'styles/MaxWidthStyle'
import { ResetStyle } from 'styles/ResetStyle'
import { PageHeaderSeva } from 'pages/component/PageHeaderSeva/PageHeaderSeva'
import { BlogContent } from './components/BlogContent'
import { Breadcrumb } from './components/Breadcrumb'
import { BlogPopularList } from './components/BlogPopularList'
import { Line } from 'components/Line/Line'
import { colors } from 'styles/colors'
import { BlogRelatedList } from './components/BlogRelatedList'
import axios from 'axios'
import { Params, DataBlogType } from 'types/types'

export default function BlogPage() {
  const { id } = useParams<Params>()
  const [data, setData] = useState<DataBlogType>()
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const contentRef = useRef<any>(null)
  const [contentWidth, setContentWidth] = useState('0')

  useEffect(() => {
    setContentWidth(contentRef.current?.offsetWidth)
    const fetchData = async () => {
      try {
        const res = await axios.get('http://localhost:5000/blogs/' + id)
        console.log('res.data', res.data)
        setData(res.data)
      } catch (e) {
        console.log(e)
      }
    }
    fetchData()
  }, [])

  return (
    <div>
      <MaxWidthStyle />
      <ResetStyle />
      <PageHeaderSeva />
      <BreadcrumbWrapper>
        <Breadcrumb />
      </BreadcrumbWrapper>
      <Container>
        <RowContainer>
          {data && (
            <div ref={contentRef}>
              <BlogContent dataBlog={data} />
            </div>
          )}
          {data && <BlogPopularList popularBlogList={data.popularLists} />}
        </RowContainer>
        <Line width={'100%'} height={'1px'} background={colors.line} />
        {data && (
          <BlogRelatedList
            contentWidth={contentWidth}
            relatedBlogList={data.relatedLists}
          />
        )}
      </Container>
    </div>
  )
}

const BreadcrumbWrapper = styled.div`
  display: flex;
  align-items: center;
  height: 50px;
  background-color: ${transparent('placeholder', 0.5)};
`

const Container = styled.div`
  padding: 30px 7px 0px;
  max-width: 1000px;
  margin-left: auto;
  margin-right: auto;

  @media (max-width: 580px) {
    margin-left: 10px;
    margin-right: 10px;
  }
`

const RowContainer = styled.div`
  display: flex;
  flex-direction: row;
`
