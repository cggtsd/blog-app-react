import React, { useState,useEffect} from 'react'
import { loadAllPosts } from '../../services/post-service'
import { Row, Col, Container,Pagination, PaginationItem, PaginationLink } from 'reactstrap'
import Post from './Post'
import { toast } from 'react-toastify'
const NewFeed = () => {
   const [postContent,setPostContent]= useState({
       content: [],
       totalPages: '',
       totalElements: '',
       pageSize: '',
       lastPage: false,
       pageNumber:''
   })
    
    useEffect(() => {
        // loadAllPosts().then(data => {
        //     console.log(data)
        //     setPostContent(data)
        // }).catch(error => {
        //     console.log(error)
        // })
        changePage(0)
    }, [])
    const changePage = (pageNumber=0,pageSize=5) => {
        if (pageNumber > postContent.pageNumber && postContent.lastPage) {
            return
        }
        if (pageNumber < postContent.pageNumber && postContent.pageNumber===0) {
            return
        }
        loadAllPosts(pageNumber, pageSize).then(data => {
            console.log(data)
            setPostContent(data)
            window.scroll(0,0)
        }).catch(error => {
            console.log(error)
            toast.error("Error in loading posts !!")
        })
    }
  return (
      <div className='container-fluid'>
          <Row>
              <Col md={{
                  size: 10,
                  offset:1
              }}>
                  
                  <h1>Blogs Count ({postContent?.totalElements})</h1>
                  {
                      postContent.content.map(post => (
                          <Post post={post} key={post.postId} />
                      )) 
                  }
                  <Container className='mt-3 '>
                      <Pagination size='lg'>
                          <PaginationItem disabled={postContent.pageNumber === 0}
                              onClick={() => changePage(postContent.pageNumber - 1)}>
                              <PaginationLink previous>
                                  Previous
                              </PaginationLink>
                          </PaginationItem>
                          {
                              [...Array(postContent.totalPages)].map((item, index) => (
                                  <PaginationItem key={index} active={index === postContent.pageNumber}
                                  onClick={()=>changePage(index)}>
                                <PaginationLink>
                                   {index+1}
                                 </PaginationLink>
                              </PaginationItem>
                              ))
                          }

                          <PaginationItem disabled={postContent.lastPage}
                          onClick={()=>changePage(postContent.pageNumber+1)}>
                              <PaginationLink next>
                                  Next
                              </PaginationLink>
                          </PaginationItem>
                      </Pagination>
                  </Container>
              </Col>
          </Row>   
      </div>
  )
}

export default NewFeed