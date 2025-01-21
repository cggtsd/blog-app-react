import React, { useEffect, useState } from 'react'
import { Base } from '../Base'
import { AddPost } from '../AddPost'
import { Container } from 'reactstrap'
import NewFeed from '../NewFeed'
import { getCurrentUserDetails } from '../../../auth'
import { loadPostUserWise } from '../../../services/post-service'
import { toast } from 'react-toastify'
import Post from '../Post'
export const Dashboard = () => {
  const [user, setUser] = useState({})
  const [posts, setPosts] = useState([])
  useEffect(() => {
    console.log(getCurrentUserDetails())
    setUser(getCurrentUserDetails())

   user.id&& loadPostData()
  }, [user.id])
  
  function loadPostData() {
     console.log(getCurrentUserDetails().id)
    loadPostUserWise(user.id).then(data => {
      console.log(data)
      setPosts(data)
    }).catch(error=> {
  console.log(error)
  toast.error('error in loading posts')
  });
  
  }
  return (
    <Base>
      <Container>
        <AddPost />
        <h1 className='my-3'>Post Count : ({posts.length})</h1> 
        {
          posts.map((post,index) => {
            return <Post post={post} key={index} />
          })
        }
      </Container>
    </Base>
  )
}
