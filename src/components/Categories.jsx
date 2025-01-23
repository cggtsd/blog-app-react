import React, { useEffect, useState } from 'react'
import { Container, Row, Col } from 'reactstrap'
import CategorySideMenu from './CategorySideMenu'
import { useParams } from 'react-router'
import Post from './Post'
import { loadPostByCategory } from '../../services/post-service'
import { deletePostData } from '../../services/post-service'
import { toast } from 'react-toastify'
const Categories = () => {
    const {categoryId }=useParams()
    const [posts, setPosts] = useState([])
    useEffect(() => {
        console.log(categoryId)
        loadPostByCategory(categoryId).then(data => {
            setPosts(data)
        }).catch(error => {
            console.log(error)
            toast.error("error in loading posts !!")
        })
    }, [categoryId])
   const deletePost = (post) => {
      deletePostData(post.postId).then(data => {
        console.log(data)
        toast.success('Post deleted Successfully')
        let newPosts = posts.filter(p => p.postId != post.postId)
        setPosts(newPosts)
      }).catch(error => {
        console.log(error)
        toast.error('error deleting post')
      })
    }
  return (
      <div>
       <Container className='mt-3'>
        <Row>
          <Col md={2} className='pt-5'>
            <CategorySideMenu/>
          </Col>
                  <Col md={10}>
            <h1>Blogs Count ({posts.length})</h1>
           {
              posts && posts.map((post, index) => {
                  return (
                      <Post key={index} post={post} deletePost={deletePost} />
                   ) 
                })          
                      }
                      {
                          posts.length<=0?<h1>No posts in this category</h1>:''
                      }
          </Col>
        </Row>
      </Container>
    </div>
  )
}

export default Categories