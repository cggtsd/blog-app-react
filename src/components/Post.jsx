import React, { useContext, useEffect, useState } from 'react'
import { Link } from 'react-router'
import { Button, Card, CardBody, CardText } from 'reactstrap'
import { getCurrentUserDetails, isLoggedIn } from '../../auth'
import { userContext } from '../context/userContext'

const Post = ({ post = { id: -1, title: 'This is default title', content: "This is default content" } ,deletePost}) => {
    const [user, setUser] = useState(null)
    const [login, setLogin] = useState(null)
   const userContextData= useContext(userContext)
    useEffect(() => {
        setUser(getCurrentUserDetails()) 
        setLogin(isLoggedIn())
    },[])
  return (
      <Card className='border-0 shadow-sm mt-3'>
          <CardBody>
              <h1>{post.title}</h1>
              <CardText dangerouslySetInnerHTML={{__html:post.content.substring(0,10)+"...."}} >
                  
              </CardText>
              <div>
                  <Link to={`/posts/${post.postId}`} className='btn btn-secondary'>Read More</Link>
                  {
                      userContextData.user.login&&(user&&user.id===post.user.id?<Button color='danger' className='ms-2' onClick={()=>deletePost(post)}>Delete</Button>:'')
                   }
              </div>
          </CardBody> 
      </Card>
  )
}

export default Post