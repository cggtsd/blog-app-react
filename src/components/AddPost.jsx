import React, { useEffect, useState,useRef } from 'react'
import { Base } from './Base'
import { Button, Card, CardBody, CardHeader,Container,Form, FormGroup, Input, Label } from 'reactstrap'
import { getCategories } from '../../services/category-service'
import JoditEditor from 'jodit-react';
import { data } from 'react-router';
import { getCurrentUserDetails } from '../../auth';
import { createPost as doCreatePost } from '../../services/post-service';
import { toast } from 'react-toastify';
import {uploadPostImage} from '../../services/post-service'
export const AddPost = () => {
    const [categories, setCategories] = useState([])
    const editor = useRef(null)
    const [post,setPost] =useState({
        title: '',
        content: '',
        categoryId:0
    })
    const [user, setUser] = useState(undefined)
    const [image,setImage]=useState(null)
   useEffect(() => {
        setUser(getCurrentUserDetails())
        getCategories().then(data => {
            console.log(data)
            setCategories(data)
            console.log(categories)
         }).catch(error => {
            console.log(error)
        })
    }, [])
    
    const fieldChange = (e) => {
        setPost({...post,[e.target.name]:e.target.value})
    }

    const contentFieldChange = (data) => {
        // console.log(data)
        setPost({...post,content:data})
    }

    const createPost = (e) => {
        e.preventDefault()
        if (post.title.trim() === ''){
            toast.error('Post title cannot be blank !!')
            return
         }
        if (post.content.trim() === ''){
            toast.error('Post content cannot be blank !!')
            return
         }
        if (post.categoryId === ''){
            toast.error('Seleect some category !!')
            return
         }
        //submit post to server
        post['userId']=user.id
        doCreatePost(post).then(data => {
            console.log(data)
            uploadPostImage(image, data.postId).then(data => {
                toast.success("Image uploaded successfully !!")
            }).catch(error => {
                console.log(error)
                toast.error("Image uploading failed !!")
            })
            toast.success("Post added successfully !!")
            setPost({
               title: '',
               content: '',
               categoryId:0
            })
        }).catch(error => {
            console.log(error)
            toast.error("Post cannot be added due to some error on server !!")
        })

    }

    const handleFileChange = (e) => {
        console.log(e.target.files[0])
        setImage(e.target.files[0])
    }
  return (
    
      <div>
          <Card className='shadow-sm mt-2 border-0'>
            <CardBody>
                   <h3>What is going in your mind ?</h3>
                  <Form onSubmit={createPost}>
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
                          <Input id="image" type="file" onChange={handleFileChange } />
    
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
                          <Button color="primary" className='rounded-0'>Create Post</Button>
                          <Button color="danger" className='rounded-0 ms-2'>Reset Post</Button>
                      </Container>

                  </Form>
              </CardBody>
          </Card>
        </div>
     
  )
}
