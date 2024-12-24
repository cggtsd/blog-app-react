import React, { useEffect, useState } from 'react'
import { useParams,Link } from 'react-router'
import { toast } from 'react-toastify'
import { createComment, loadPost } from '../../services/post-service'
import { Base } from './Base'
import { Container,Row,Col, Card, CardBody, CardText, Input ,Button} from 'reactstrap'
import { BASE_URL } from '../../services/helper'
import { isLoggedIn } from '../../auth'

function PostPage() {
    const { postId } = useParams()
    const [post, setPost] = useState(null)
   const [comment,setComment]= useState({
        content:''
    })
    useEffect(() => {
        loadPost(postId).then(data => {
            console.log(data)
            setPost(data)
        }).catch(error => {
            console.log(error)
            toast.error("Error in loading post !1")
        })
    }, [])
    const printDate = (numbers)=>{
        return new Date(numbers).toLocaleDateString()
    }
    const submitPost = (e) => {
        if (!isLoggedIn()) {
            toast.error("Need to login first !1")
        }
        if (comment.content.trim() === ""){
            return
        }
        createComment(comment, post.postId).then(data => {
            console.log(data)
            toast.success("Comment added...")
            setPost({
                ...post,
               comments:[...post.comments,data] 
            })
            setComment({
                content:''
            })
        }).catch(error => {
            console.log(error)
            toast.error("Error in adding comment...")
        })
    }
  return (
      <Base>
         <Container className='mt-4 border-0 shadow'>
              <Link to="/">Home</Link> /{post && (<Link to="">{post.title}</Link>)} 
              <Row>
                  <Col md={{ size: 12 }}>
                      <Card className='mt-3 ps-2 shadow-sm'>
                          {
                              (post) && (
                                  <CardBody>
                                      <CardText>
                                          Posted By <b>{post.user.name}</b> on <b>{printDate(post.addedDate) }</b>
                                      </CardText>
                                      <CardText>
                                          <span className='text-muted'>{post.category.categoryTitle}</span>
                                      </CardText>
                                      <div className='divider' style={{
                                          width: '100%',
                                          height: '1px',
                                          backgroundColor:'#e2e2e2'
                                      }}></div>
                                      <CardText className='mt-3'>
                                          <h1>{post.title}</h1>
                                      </CardText>
                                      <div className='image-container mt-3' style={{maxWidth:'40%'}}>
                                          <img className='image-fluid' src={ `${BASE_URL}/post/image/${post.imageName}`} />
                                      </div>
                                      <CardText className='mt-3' dangerouslySetInnerHTML={{__html:post.content}}></CardText>
                                  </CardBody>
                              )
                          }
                      </Card>
                  </Col>
              </Row>
              <Row className='my-4'>
                  <Col onMouseDown={{
                      size: 9,
                      offset:1
                  }}>
                      <h3>Comments ({post ? post.comments.length : 0})</h3>
                      {
                          post && post.comments.map((c, index) => (
                              <Card className='mt-2 border-0' key={index}>
                                  <CardBody>
                                      {c.content}
                                  </CardBody>
                             </Card> 
                          )
                       )
                      }
                      {
                          <Card>
                              <CardBody>
                                  <Input type="textarea"
                                      placeholder='Enter content here'
                                      value={comment.content}
                                      onChange={(e)=>setComment({content:e.target.value})}
                                  />
                                  <Button onClick={submitPost } className="mt-2" color="primary">Submit</Button>
                              </CardBody>
                          </Card>
                          
                      }
                  </Col>
              </Row>
          </Container>
      </Base> 
  )
}

export default PostPage