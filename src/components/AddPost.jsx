import React, { useEffect, useState } from 'react'
import { Base } from './Base'
import { Button, Card, CardBody, CardHeader,Container,Form, FormGroup, Input, Label } from 'reactstrap'
import { getCategories } from '../../services/category-service'

export const AddPost = () => {
    const [categories, setCategories] = useState([])
    useEffect(() => {
        getCategories().then(data => {
            console.log(data)
            setCategories(data)
         }).catch(error => {
            console.log(error)
        })
    },[])
  return (
    
      <div>
          <Card className='shadow-sm mt-2 border-0'>
              <CardHeader>
                  <h3>What is going in your mind ?</h3>
              </CardHeader>
              <CardBody>
                  <Form>
                      <FormGroup>
                          <Label for='title'>Post Title</Label>
                          <Input type='text' id='title'
                          placeholder='Enter title'/>
                      </FormGroup>
                      <FormGroup>
                          <Label for='content'>Post Content</Label>
                          <Input type='textarea' id='content'
                              placeholder='Enter here' style={{height:'300px'} } />
                      </FormGroup>
                      <FormGroup>
                          <Label for='category'>Post Category</Label>
                          <Input type='select' id='category'>
                              <option value={0}>--Select Category--</option>
                              {
                                 categories.length>0&& categories.map((category) => {
                                      <option key={category.categoryId} value={category.categoryId}>
                                          {category.categoryTitle}
                                      </option>
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
