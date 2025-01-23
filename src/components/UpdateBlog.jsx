import React, { useContext, useEffect, useRef, useState } from 'react'
import { useNavigate, useParams } from 'react-router'
import { userContext } from '../context/userContext'
import { doUpdatePost, loadPost } from '../../services/post-service'
import { toast } from 'react-toastify'
import { Container } from 'reactstrap'
import { getCategories } from '../../services/category-service'
import { Base } from './Base'
import { Button, Card, CardBody, CardHeader, Form, FormGroup, Input, Label } from 'reactstrap'
import JoditEditor from 'jodit-react';

function UpdateBlog() {
    const { blogId } = useParams()
    const object = useContext(userContext)
    const navigate = useNavigate()
    const [post, setPost] = useState(null)
    const [categories, setCategories] = useState(null)
    const editor= useRef(null)
    useEffect(() => {
        getCategories().then(data => {
            setCategories(data)
        }).catch(error => {
            console.log(error)
        })
        // load post from the database
        loadPost(blogId).then(data => {
            console.log(data)
            setPost({ ...data, categoryId: data.category.category })
            }).catch(error => {
            console.log(error)
            toast.error('error in loading the blog !1')
        })
    }, [])

    useEffect(() => {
 console.log({...post})
        if (!post) {
            
            if (post.user.id != object.user.data.id) {
                toast.error('This is not your post !!')
                navigate("/")
           }
       }
    
    },[post])
    const fieldChange = (e) => {
        setPost({
            ...post,
            [e.target.name]:e.target.value
        })
    }

    const contentFieldChange = (newContent) => {
        setPost({...post,content:newContent})
    }
    const updatePost = (e) => {
        e.preventDefault()
        console.log(post)
        doUpdatePost({ ...post,category:{categoryId:post.categoryId} }, post.postId).then(data => {
            console.log(data)
            toast.success("Post Updated")
        }).catch(error => {
            console.log(error)
            toast.error('error in updating post !!')
        })
    }
    const updateHtml = () => {
        return (
             <div>
          <Card className='shadow-sm mt-2 border-0'>
            <CardBody>
                   <h3>Update post from here</h3>
                  <Form onSubmit={updatePost}>
                      <FormGroup>
                          <Label for='title'>Post Title</Label>
                          <Input type='text' id='title'
                              placeholder='Enter title' value={post.title} onChange={(e) => fieldChange(e)}
                              name="title" />
                      </FormGroup>
                      <FormGroup>
                          <Label for='content'>Post Content</Label>
                          {/* <Input type='textarea' id='content'
                              placeholder='Enter here' style={{height:'300px'} } /> */}
                          <JoditEditor
			               ref={editor}
                              value={post.content}
                              name="content"
                              onChange={(data)=>contentFieldChange(data)}
			              />
                      </FormGroup>
                      <FormGroup>
                      <Label for="image">Upload Post Banner</Label>
                          <Input id="image" type="file"  />
    
                     </FormGroup>
                      <FormGroup>
                          <Label for='categoryId'>Post Category</Label>
                          <Input type='select' id='categoryId' name="categoryId" value={post.categoryId}
                          onChange={(e)=>fieldChange(e)}>
                              <option disabled value={0}>--Select Category--</option>
                              {
                                 categories.length>0&& categories.map((category) => {
                                     return( <option key={category.categoryId} value={category.categoryId}>
                                          {category.categoryTitle}
                                      </option>)
                                  })
                              }
                          </Input>
                      </FormGroup>
                      <Container className='text-center'>
                          <Button color="primary" className='rounded-0'>Update Post</Button>
                          <Button color="danger" className='rounded-0 ms-2'>Reset Post</Button>
                      </Container>

                  </Form>
              </CardBody>
          </Card>
        </div>
        )
    }
  return (
      <Base>
          <Container>
              {
                  post && updateHtml()
              }
          </Container>
      </Base>
  )
}

export default UpdateBlog