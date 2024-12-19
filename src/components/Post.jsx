import React from 'react'
import { Link } from 'react-router'
import { Button, Card, CardBody, CardText } from 'reactstrap'
const Post = ({post={title:'This is default title',content:"This is default content"}}) => {
  return (
      <Card className='border-0 shadow-sm mt-3'>
          <CardBody>
              <h1>{post.title}</h1>
              <CardText dangerouslySetInnerHTML={{__html:post.content.substring(0,10)+"...."}} >
                  
              </CardText>
              <div>
                  <Link to={`/posts/${post.postId}`} className='btn btn-secondary'>Read More</Link>
              </div>
          </CardBody> 
      </Card>
  )
}

export default Post